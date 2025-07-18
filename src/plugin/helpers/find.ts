import { COMPONENT_SET_BY_FLAG } from "../config/regex";
import type { FlagRetail } from "../../shared/types";
import type { PathStep } from "../types";

// ♻️  COMPONENT SETS
export function findComponentSetByFlag(flag: FlagRetail): ComponentSetNode | null {
    const pattern = COMPONENT_SET_BY_FLAG[flag];
    const node = figma.currentPage.findOne((node) =>
        node.type === "COMPONENT_SET" && 
        pattern.test(node.name)
    ) as ComponentSetNode | null;
    return node;
}

// ♻️  COMPONENTS
export function findComponentChildren(set: ComponentSetNode): ComponentNode[] {
    const nodes = set.children.filter((n) => 
        n.type === "COMPONENT"
    ) as ComponentNode[];
    return nodes;
}

// ♻️  GROUPS
export function findGroupByIndex(variant: ComponentNode | InstanceNode | GroupNode, index: number, values?: string[]): GroupNode | null {
    const children = "children" in variant ? (variant.children as SceneNode[]) : [];
    const groups = children.filter((n) =>
        n.type === "GROUP" &&
        (!values || values.includes(n.name.trim().toLowerCase()))
    ) as GroupNode[];

    const group = groups[index];
    
    if (!group) {
        console.warn(`[findGroupByIndex] ❌ No group found at index ${index}. Total available: ${groups.length}`);
        return null;
    }

    console.log(`[findGroupByIndex] 🎋 Group found: ${group.name}`);
    return group;
}

// ♻️  TEXTS
export function findTextByPredicate(node: InstanceNode | GroupNode, predicate: (text: string) => boolean): TextNode | null {
    if (!('children' in node)) {                       
        console.warn('[findDirectTextByPredicate] ⚠ Nodo sin hijos');
        return null;
    }

    for (const child of node.children as SceneNode[]) {
        if (child.type === 'TEXT') {
            const textNode = child as TextNode;
            if (predicate(textNode.characters) || predicate(textNode.name)) {
                return textNode;
            }
        }
    }

    return null;
}


export function findTextByPath(instance: InstanceNode | GroupNode, path: PathStep[], predicate?: (text: string) => boolean): TextNode | null {
    let current: SceneNode = instance;

    for (let i = 0; i < path.length; i++) {
        const step = path[i];
        if (step.type === "group") {
            const next = findGroupByIndex(current, step.index!);
            if (!next) return null;
            current = next;
        } else if (step.type === "text") {
            return findTextByPredicate(current, predicate || (() => true));
        }
    }

    return null;
}
