// 📦  Regex Decimal
const regexDec: RegExp = /\d{1,3}\.\d{1,3}\b/;
const regexSubDec: RegExp = /(\d+)([.,](\d+))?/;

export function extractDecimal(str: string): string | null {
    const match = str.match(regexDec);
    if (!match) return null;

    const sub = match[0].match(regexSubDec);
    if (!sub) return null;

    const integerPart = sub[1];
    const decimalPart = sub[3] || '';

    const paddedDecimal = decimalPart.padEnd(2, '0').slice(0, 2);
    return `${integerPart}.${paddedDecimal}`;
}

// 📦  Regex Integer
const regexInt: RegExp = /\d{1,3}\b/;

export function extractInteger(str: string): string | null {
    const match = str.match(regexInt);
    return match ? match[0] : null;
}

// 📦  Regex Last Number
export function extractLastNumber(str: string): string | null {
    const match = str.match(/(?:\d{1,3}(?:\.\d{1,3})?)(?!.*\d)/);
    return match ? match[0] : null;
}
