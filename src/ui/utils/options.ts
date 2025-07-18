export type Option =
| string
| number
| Record<string, unknown>;

export function isEmpty(opt: Option | null | undefined): boolean {
    return opt === null ||
        opt === undefined ||
        (typeof opt === "string" && opt.trim() === "");
}

export function sanitizeOptions<T extends Option>(options: T[]): T[] {
    return options.filter((o) => !isEmpty(o));
}

export function filterOptions<T extends Option>(
    options: T[],
    query: string
): T[] {
    const list = sanitizeOptions(options);
    if (!query) return list;

    const q = query.toLowerCase();
    return list.filter((o) => String(o).toLowerCase().includes(q));
}

