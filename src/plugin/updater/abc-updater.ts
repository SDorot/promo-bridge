import type { ApplyResult } from "../types";
import type { TemplatePrice } from "../config/rules";
import { extractDecimal } from "../helpers/extract";
import { updateTextContent } from "../helpers/update";
import type { PriceInstanceKey } from "../../shared/types";
import { RETAIL_ABC_CORE_PATH } from "../config/navigator";

// 🛑  Format 
function formatInkaRegular(template: string, price: string): string {
    if (/^desde/i.test(template) && /2x/.test(template)) return `Before: From 2x S/${price}`;
    if (/^desde/i.test(template)) return `Before: From S/${price}`;
    if (/^2x/.test(template)) return `Before: 2x S/${price}`;
    return `Before: S/${price} c/u`;
}

// 🧾  Apply
async function applyABCRegular(inst: InstanceNode, tmpl: TemplatePrice, dec: string): Promise<ApplyResult> {
    const path = RETAIL_ABC_CORE_PATH.Regular[tmpl as keyof typeof RETAIL_ABC_CORE_PATH.Regular];
    return await updateTextContent( inst, path, formatInkaRegular(tmpl!, dec), (s) => !!extractDecimal(s) );
}

async function applyABCCard(inst: InstanceNode, tmpl: TemplatePrice, dec: string): Promise<ApplyResult> {
    const path = RETAIL_ABC_CORE_PATH.Card[tmpl as keyof typeof RETAIL_ABC_CORE_PATH.Card];
    return await updateTextContent( inst, path, dec, (s) => !!extractDecimal(s) );
}

async function applyABCPromo(inst: InstanceNode, tmpl: TemplatePrice, dec: string): Promise<ApplyResult> {
    const path = RETAIL_ABC_CORE_PATH.Promo[tmpl as keyof typeof RETAIL_ABC_CORE_PATH.Promo];
    return await updateTextContent( inst, path, dec, (s) => !!extractDecimal(s) );
}

// 🔍  Selector
export async function selectABCInstance(
    instance: InstanceNode,
    idx: PriceInstanceKey,
    price: string,
    tmplPrim: TemplatePrice,
): Promise<ApplyResult> {
    const dec = extractDecimal(price);
    if (!dec) return { ok: false, prev: null };
    if (!tmplPrim) return { ok: false, prev: null };

    switch (idx) {
        case 0: return await applyABCPromo(instance, tmplPrim, dec);
        case 1: return await applyABCCard(instance, tmplPrim, dec);
        case 2: return await applyABCRegular(instance, tmplPrim, dec);
        default: return { ok: false, prev: null };
    }
}