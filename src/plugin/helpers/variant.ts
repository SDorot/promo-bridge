import type { RecordItem } from "../../shared/types";

export function parseVariantName(name: string) {
    const parts = name.split(',').map((s) => s.trim());
    const out: Record<string, string> = {};
    for (const part of parts) {
        const [key, value] = part.split('=');
        if (key && value) out[key.toLowerCase()] = value.trim();
    }
    return out;
}

export function getVariantMeta(variant: ComponentNode) {
    const p = parseVariantName(variant.name);
    return {
        category: (p.category || "").toLowerCase(), 
        index: parseInt(p.index || "-1", 10) - 1,
    };
}

export function groupByCategory(records: RecordItem[]): Record<string, RecordItem[]> {
    const res = records.reduce((acc, r) => {
        const key = r.category.toLowerCase();
        (acc[key] || (acc[key] = [])).push(r);
        return acc;
    } , {} as Record<string, RecordItem[]>);
    return res;
}