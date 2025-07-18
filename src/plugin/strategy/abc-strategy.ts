import { GROUP_INDEX_BY_FLAG, INSTANCE_REGEX_BY_FLAG, TEXT_BRAND_REGEX_BY_FLAG } from "../config/regex";
import { PriceInstanceType, type FlagRetail, type PriceInstanceKey } from "../../shared/types";
import { BRAND_CORE_PATH } from "../config/navigator";
import { PriceResolver } from "../config/resolver";
import { extractDecimal } from "../helpers/extract";
import { findGroupByIndex } from "../helpers/find";
import { updateTextContent } from "../helpers/update";
import { selectABCInstance } from "../updater/abc-updater";
import type { ApplyContext, FlagStrategy } from "../types";

export class ABCStrategy implements FlagStrategy {
    constructor(
        public readonly flag: FlagRetail = "flag-retail-abc"
    ) {}

    findInstanceBrand(variant: ComponentNode): InstanceNode {
        return variant.findOne(
            (n) => n.type === "INSTANCE" &&
            TEXT_BRAND_REGEX_BY_FLAG[this.flag].test(n.name) && 
            n.visible === true
        ) as InstanceNode;
    }

    findInstancePromos(variant: ComponentNode): InstanceNode[] {
        const group = findGroupByIndex(
            variant,
            GROUP_INDEX_BY_FLAG[this.flag],
            ["txt", "oh"]
        );
        if (!group) return [];

        return group.findAll(
            (n) => n.type === "INSTANCE" && 
            INSTANCE_REGEX_BY_FLAG[this.flag].test(n.name)
        ) as InstanceNode[];
    }

    async applyBrandTexts(context: ApplyContext): Promise<void> {
        const instance = this.findInstanceBrand(context.variant);
        if (!instance) return;

        const { brands, desc } = context.records; 
        if (!brands || !desc) return;

        const brandPaths = BRAND_CORE_PATH[this.flag];
        if (!brandPaths) return;

        const resBrand = await updateTextContent(
            instance, 
            brandPaths.Brand, 
            brands, 
            (s) => s.trim().toLowerCase().includes("brand")
        );

        const resDesc = await updateTextContent(
            instance, 
            brandPaths.Description, 
            desc, 
            (s) => s.trim().toLowerCase().includes("descriptionn")
        );

        console.log(`🧩 Marca aplicada: "${brands}" →`, resBrand);
        console.log(`🧩 Descripción aplicada: "${desc}" →`, resDesc);
    }

    async applyVariantInstances(context: ApplyContext): Promise<void> {
        const { records, vLog } = context;
        const instances = this.findInstancePromos(context.variant);
        const prices = [records.p_promo, records.p_card, records.p_regular];
    
        for (const [idx, inst] of instances.entries()) {
            const price = prices[idx];
            const label = PriceInstanceType[idx];
    
            if (!price || price === "-") {
                inst.visible = false;
                vLog.instances.push({
                    type: label,
                    applyTemplate: false,
                    templatePrice: null,
                    priceBefore: null,
                    priceAfter: null
                });
                continue;
            }
    
            const templatePrecio = PriceResolver.detect(price);
    
            if (!templatePrecio) {
                vLog.instances.push({ 
                    type: label,
                    applyTemplate: false,
                    templatePrice: null,
                    priceBefore: price,
                    priceAfter: null
                }); 
                continue;
            }
    
            // 7️⃣  Aplicar plantilla
            try {
                inst.setProperties({ Precio: templatePrecio });
    
                const { ok, prev } = await selectABCInstance(
                    inst, 
                    idx as PriceInstanceKey, 
                    price, 
                    templatePrecio
                );
    
                vLog.instances.push({ 
                    type: label,
                    applyTemplate: ok, 
                    templatePrice: templatePrecio, 
                    priceBefore: prev,
                    priceAfter: ok ? extractDecimal(price) : null 
                });
    
                if (ok) vLog.valid = true;
            } catch (err) {
                console.warn(`❌ Error aplicando template "${templatePrecio}" en ${inst.name}:`, err);
    
                vLog.instances.push({
                    type: label,
                    applyTemplate: false,
                    templatePrice: templatePrecio,
                    priceBefore: price,
                    priceAfter: null
                });
            }
        }
    
        return;
    }
}