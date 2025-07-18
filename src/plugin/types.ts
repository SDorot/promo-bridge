import type { FlagRetail, RecordItem, VariantLog } from "../shared/types";

// 🔎  Finders
export interface FinderByFlag {
    findInstances(variant: ComponentNode): InstanceNode[];
    findTexts(variant: ComponentNode): InstanceNode;
}

export interface FlagStrategy {
    readonly flag: FlagRetail;
    findInstancePromos(variant: ComponentNode): InstanceNode[];
    findInstanceBrand(variant: ComponentNode): InstanceNode;

    applyBrandTexts(context: ApplyContext): Promise<void>;
    applyVariantInstances(context: ApplyContext): Promise<void>;
}


// 🧠  Rules 
export interface RulesResolver<T> {
    detect(value: string): T | null;
}

export interface Rule<T> {
    test: (value: string) => boolean;
    resolve: (value: number) => T;
}


// 🧾  Application Context
export interface ApplyContext {
    flag: FlagRetail;
    records: RecordItem;
    variant: ComponentNode;
    vLog: VariantLog;
    instances?: InstanceNode[];
}

export interface ApplyResult {
    ok: boolean;
    prev: string | null;   
}


// ⛵  Navigator Config
export type PathStep = {
    type: "group" | "text";
    index?: number;
}

export type FlatPathMap<T extends string> = {
  [key in T]: PathStep[];
};