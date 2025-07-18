import type { ComponentChildren, VNode } from "preact";

export interface AccordionItemProps {
    title: VNode;
    open?: boolean;
    children: ComponentChildren;
    withClass?: string;
    onToggle?: () => void;
}

export function AccordionItem({
    title,
    open = false,
    children,
    withClass = '', 
    onToggle = () => {},
}: AccordionItemProps) {
    return (
        <div className={`border-b border-gray-200`}>
            <button
                className={`w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-gray-800 ${withClass}`}
                onClick={onToggle}
            >
                {title}
                <span class="ml-2">{open ? "−" : "+"}</span>
            </button>
            <div
                class={`transition-all duration-300 ease-in-out overflow-hidden ${
                    open ? "max-h-[999px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                {children && !(Array.isArray(children) && children.length === 0) && (
                    <div class="px-4 pb-4 pt-2">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};