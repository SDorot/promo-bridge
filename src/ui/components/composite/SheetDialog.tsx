import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

export type SheetDialogType =
| 'top'
| 'bottom'
| 'left'
| 'right';

export interface SheetDialogProps {
    type: SheetDialogType;
    open: boolean;
    children: ComponentChildren;
    onClose: () => void;
}

export function SheetDialog({
    type,
    open = false,
    children,
    onClose = () => {},
}: SheetDialogProps) {

    const [visible, setVisible] = useState(open);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) setVisible(true);
    }, [open]);

    const handleTransitionEnd = () => {
        if (!open) setVisible(false);
    };

    if (!visible) return null;

    const backdropCls =
    'fixed inset-0 bg-gray-600 transition-opacity duration-300 ' +
    (open ? 'opacity-60' : 'opacity-0 pointer-events-none');

    const panelCls =
    'fixed w-full bg-white h-full max-h-[100%] flex flex-col transform transition-transform ' +
    'duration-500 ease-out bg-white shadow-lg ';

    const position =
        type === 'bottom'
            ? open ? 'left-0 right-0 bottom-0 translate-y-0'
                : 'left-0 right-0 bottom-0 translate-y-full'
        : type === 'top'
            ? open ? 'left-0 right-0 top-0 translate-y-0'
                : 'left-0 right-0 top-0 -translate-y-full'
        : type === 'left'
            ? open ? 'top-0 bottom-0 left-0 w-3/4 max-w-sm translate-x-0'
                : 'top-0 bottom-0 left-0 w-3/4 max-w-sm -translate-x-full'
        : type === 'right'
            ? open ? 'top-0 bottom-0 right-0 w-3/4 max-w-sm translate-x-0'
                : 'top-0 bottom-0 right-0 w-3/4 max-w-sm translate-x-full'
        : '';

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
            <div className={`${backdropCls}`} onClick={onClose}></div>
            <div 
                ref={panelRef} 
                className={`${panelCls} ${position}`}
                onTransitionEnd={handleTransitionEnd}
                onClick={(e) => e.stopPropagation()}
            >
                <div class="p-6 flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}