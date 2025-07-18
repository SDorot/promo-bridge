import type { TemplatePrice } from "./rules";
import type { FlatPathMap } from "../types";
import type { FlagRetail } from "../../shared/types";

type PriceList = Exclude<TemplatePrice, null>;

type RetaildABCCorePath = {
    Promo:   FlatPathMap<Partial<PriceList>>;
    Card:    FlatPathMap<PriceList>;
    Regular: FlatPathMap<PriceList>;
};

type SectionBrand = 
| "Brand"
| "Description";

type BrandCorePath = Partial<Record<FlagRetail, FlatPathMap<SectionBrand>>>;

export const BRAND_CORE_PATH: BrandCorePath = {
    "flag-retail-abc": {
        "Brand":          [ { type: "text" } ],
        "Description":    [ { type: "text" } ],     
    },
    "flag-retail-xyz": {
        "Brand":          [ { type: "text" } ],
        "Description":    [ { type: "text" } ],
    },
}

export const RETAIL_ABC_CORE_PATH: RetaildABCCorePath = {
    Promo: {
        "0cu":            [ { type: "text" } ],
        "00cu":           [ { type: "text" } ],
        "000cu":          [ { type: "text" } ],
        "2x00":           [ { type: "text" } ],
        "2x000":          [ { type: "text" } ],
        "Desde0":         [ { type: "text" } ],
        "Desde00":        [ { type: "text" } ],
        "Desde000":       [ { type: "text" } ],
        "Desde2x00":      [ { type: "text" } ],
        "Desde2x000":     [ { type: "text" } ],
        "menos":          [ { type: "text" } ],
        "pagamenos":      [ { type: "text" } ],
        "-":              [],
    },
    Card: {
        "0cu":            [ { type: "group", index: 0 }, { type: "text" } ],
        "00cu":           [ { type: "group", index: 0 }, { type: "text" } ],
        "000cu":          [ { type: "group", index: 0 }, { type: "text" } ],
        "2x00":           [ { type: "group", index: 0 }, { type: "text" } ],
        "2x000":          [ { type: "group", index: 0 }, { type: "text" } ],
        "Desde0":         [ { type: "group", index: 0 }, { type: "text" } ],
        "Desde00":        [ { type: "group", index: 0 }, { type: "text" } ],
        "Desde000":       [ { type: "group", index: 0 }, { type: "text" } ],
        "Desde2x00":      [ { type: "group", index: 0 }, { type: "text" } ],
        "Desde2x000":     [ { type: "group", index: 0 }, { type: "text" } ],
        "menos":          [ { type: "text" } ],
        "pagamenos":      [ { type: "text" } ],
        "-":              [],
    },
    Regular: {
        "0cu":            [ { type: "text" } ],
        "00cu":           [ { type: "text" } ],
        "000cu":          [ { type: "text" } ],
        "2x00":           [ { type: "text" } ],
        "2x000":          [ { type: "text" } ],
        "Desde0":         [ { type: "text" } ],
        "Desde00":        [ { type: "text" } ],
        "Desde000":       [ { type: "text" } ],
        "Desde2x00":      [ { type: "text" } ],
        "Desde2x000":     [ { type: "text" } ],
        "menos":          [ { type: "text" } ],
        "pagamenos":      [ { type: "text" } ],
        "-":              [],
    },
}