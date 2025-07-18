import type { FlagRetail } from "../../shared/types";

export const COMPONENT_SET_BY_FLAG: Record<FlagRetail, RegExp> = {
    "flag-retail-abc": /promotions/i,
    "flag-retail-xyz": /mechanics/i,
};

export const INSTANCE_REGEX_BY_FLAG: Record<FlagRetail, RegExp> = {
    "flag-retail-abc": /^ABC PROM/i,
    "flag-retail-xyz": /^XYZ PROM/i,
};

export const TEXT_BRAND_REGEX_BY_FLAG: Record<FlagRetail, RegExp> = {
    "flag-retail-abc": /^ABC-Text/i,
    "flag-retail-xyz": /^XYZ-Text/i,
};

export const GROUP_INDEX_BY_FLAG: Record<FlagRetail, number> = {
    "flag-retail-abc": 0,
    "flag-retail-xyz": 1,
}