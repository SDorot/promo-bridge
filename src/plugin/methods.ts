import type { FlagRetail, RecordItem, VariantLog } from "../shared/types";
import { getStrategy } from "./strategy";
import { logConsole, logSummary, logVariant } from "./helpers/logs";
import { getVariantMeta, groupByCategory, parseVariantName } from "./helpers/variant";
import { findComponentChildren, findComponentSetByFlag } from "./helpers/find";

export async function debugPromotions(
    records: RecordItem[], 
    flag: FlagRetail
) {
    const strategy = getStrategy(flag);

    const promosSet = findComponentSetByFlag(flag);
    if (!promosSet) {
        figma.notify("❌ No se encontró el elemento.");
        return;
    }

    const grouped = groupByCategory(records);
    const valCats = new Set(Object.keys(grouped));

    const allComps = findComponentChildren(promosSet as ComponentSetNode);
    const components = allComps.filter((c) => {
        const parsed = parseVariantName(c.name);
        const type = parsed.type ? parsed.type.toLowerCase() : ''; 
        const catName = (parsed.category || '').toLowerCase();  
        return type === 'text' && valCats.has(catName);
    });

    const vLogs: VariantLog[] = [];
    const skippedVariants: string[] = [];

    console.log(`📦 Variants found: ${components.length}`);

    for (const variant of components) {
        try { 
            const { category, index } = getVariantMeta(variant);
            const record = grouped[category] && grouped[category][index];
            
            const vLog: VariantLog = { 
                name: variant.name, 
                position: index,
                valid: false, 
                instances: [] 
            };

            if (!record) {
                skippedVariants.push(variant.name + ' (sin record)');
                vLogs.push(vLog);
                continue;
            }

            await strategy.applyBrandTexts({ flag, records: record, variant, vLog });

            await strategy.applyVariantInstances({ flag, records: record, variant, vLog });

            vLogs.push(vLog);
        } catch (err) {
            console.error('❌ Error in variant', variant.name, err);
            skippedVariants.push(variant.name + ' (unexpected error)');
        }
    } 

    console.log('📑 Variants');
    vLogs.forEach(logVariant);

    const { vars, inst } = logSummary(vLogs);

    logConsole(vars, inst);

    // ✅ Notificación Figma
    figma.notify(`
        🧾 ${vars.total} variants:
        ✅ ${vars.updated} changes,
        ❌ ${vars.skipped} omissions
    `);

    // 🚀 Enviar a UI 
    figma.ui.postMessage({ 
        type: "debug-promos-done", 
        payload: { 
            variants: vLogs, 
            skipped: skippedVariants,
            summary: {
                vars,
                inst,
            },
        } 
    });
}