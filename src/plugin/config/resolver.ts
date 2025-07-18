import type { Rule, RulesResolver } from "../types";
import type { TemplatePrice } from "./rules";
import { extractDecimal } from "../helpers/extract";

export const PriceResolver: RulesResolver<TemplatePrice> = {
    detect(text: string): TemplatePrice {
        const norm = text.trim().toLowerCase();
        const numStr = extractDecimal(norm);
        if (!numStr) return '-';

        const num = parseFloat(numStr);

        const rules: Rule<TemplatePrice>[] = [
            { test: (s) => /2x/.test(s),                    resolve: (n) => (n < 100 ? "2x00" : "2x000") },
            { test: (s) => /desde.*2x/.test(s),             resolve: (n) => (n < 100 ? "Desde2x00" : "Desde2x000") },
            { test: (s) => /\bdesde/.test(s),               resolve: (n) => (n < 10 ? "Desde0" : n < 100 ? "Desde00" : "Desde000") },
            { test: (s) => /c\/u/.test(s),                  resolve: (n) => (n < 10 ? "0cu" : n < 100 ? "00cu" : "000cu") },
            { test: () => true,                             resolve: (n) => (n < 10 ? "0cu" : n < 100 ? "00cu" : "000cu") },
        ];

        for (const rule of rules) {
            if (rule.test(norm)) return rule.resolve(num);
        }

        return '-';
    }
};