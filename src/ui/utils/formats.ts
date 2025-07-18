export function formatVariantName(name: string): string {
    const categoryMatch = name.match(/category\s*=\s*([^,]+)/i);
    const indexMatch = name.match(/index\s*=\s*(\d+)/i);

    const categoria = categoryMatch ? categoryMatch[1].trim() : "Unknown";
    const promo = indexMatch ? indexMatch[1].padStart(2, "0") : "--";

    return `PM${promo} · ${categoria}`;
}
