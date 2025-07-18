import type { ApplyResult, PathStep } from "../types";
import { ensureAllFonts } from "./fonts";
import { extractLastNumber } from "./extract";
import { findTextByPath } from "./find";

export async function updateTextContent(instance: InstanceNode | GroupNode, path: PathStep[], value: string, predicate: (text: string) => boolean ): Promise<ApplyResult> {
    const node = findTextByPath(instance, path, predicate);
    if (!node) {
        console.warn('[updateTextContent] ❌ No se pudo encontrar el nodo', path);
        return { ok: false, prev: null };
    }

    const prev = extractLastNumber(node.characters);

    const fontsOk = await ensureAllFonts(node);
    if (!fontsOk) {
        console.warn('[updateTextContent] ❌ No se pudo cargar las fuentes para el nodo', node.name);
        return { ok: false, prev };
    }

    node.characters = value;
    return { ok: true, prev };
} 