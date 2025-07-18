export async function ensureAllFonts(text: TextNode): Promise<boolean> {
    try {
        const segments = text.getStyledTextSegments(['fontName']);
        const fonts = new Set<string>();

        for (const seg of segments) {
            const font = seg.fontName as FontName;
            const key = `${font.family}||${font.style}`;
            if (!fonts.has(key)) {
                fonts.add(key);
                await figma.loadFontAsync(font);
            }
        }

        return true;
    } catch (err) {
        console.warn("⚠️ No se pudo cargar alguna fuente:", err);
        return false;
    }
}