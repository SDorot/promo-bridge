// 🌱  Flags
export type FlagRetail = 
| "flag-retail-abc"
| "flag-retail-xyz";  


// 🍃  Flags Id's 
export const FlagSheetMap: Record<FlagRetail, string> = {
    "flag-retail-abc": "132BwehbS_QGL-viPlA8dKjGv6i7i9a8I4PhOUGf_v6Q",
    "flag-retail-xyz": "flag-retail-xyz-id", 
} as const;

export type FlagSheetKey = keyof typeof FlagSheetMap;

export type FlagSheetId = typeof FlagSheetMap[FlagSheetKey];


// 🟣  Plugin
export type MessageMap = {
    "get-storage"   : { title: string };
    "set-storage"   : { title: string; value: unknown };
    "debug-data"    : { data: RecordItem[] };
    "load"          : { data: Record<string, unknown> }; 
    "cancel"        : {};  
    "done"          : {};
};

export type MessageType = keyof MessageMap;

export type MessagePlugin<T extends MessageType = MessageType> = { 
    type: T;
    payload: MessageMap[T];
    flag?: FlagRetail;
};


// 📦  Records
export type RecordItem = {
    category: string;
    brands: string;
    desc: string;
    p_regular: string;
    p_promo: string;
    p_card: string;
};


// 📊  Types Prices
export const PriceInstanceType = [
    "Promo", 
    "Card",
    "Regular"
] as const;

export type PriceInstanceKey = 0 | 1 | 2;

export type PriceInstanceLabel = typeof PriceInstanceType[PriceInstanceKey];


// 🧾  Logging
export interface InstanceLog {
    type: PriceInstanceLabel;
    applyTemplate: boolean;
    templatePrice: string | null;
    priceBefore: string | null;
    priceAfter: string | null;
}

export interface VariantLog {
    name: string;
    position: number;
    valid: boolean; 
    instances: InstanceLog[];
}


// 🟢  Debugging
export type SummaryVars = {
    total: number;
    updated: number;
    skipped: number;
};

export type SummaryInst = {
    total: number;
    applied: number;
    omitted: number;
};
