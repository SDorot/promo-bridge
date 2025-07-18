import type { JSX } from "preact/jsx-runtime";
import { ErrorIcon } from "../icons/ErrorIcon";
import { SuccessIcon } from "../icons/SuccessIcon";
import { WarningIcon } from "../icons/WarningIcon";
import { AccordionItem } from "./AccordionItem";
import { InstancePanel } from "../composite/InstancePanel";
import { useState } from "preact/hooks";
import { formatVariantName } from "../../utils/formats";
import type { VariantLog } from "../../../shared/types";

export type ResultStatus = 
| 'info'
| 'success'
| 'error'
| 'warning';

const variantStyles: Record<ResultStatus, string> = {
    info: 'text-green-500 bg-green-200',
    success: 'text-green-500 bg-green-200',
    error: 'text-red-500 bg-red-200',
    warning: 'text-orange-500 bg-orange-200',
};

const variantHover: Record<ResultStatus, string> = {
    info: 'bg-green-200',
    success: 'bg-green-200',
    error: 'bg-red-200', 
    warning: 'bg-orange-200',
};

const iconMap: Record<ResultStatus, JSX.Element> = {
    info: <SuccessIcon/>,
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
};

export function VariantAccordion({
    variants,
}: { variants: VariantLog[] }) {

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className={`rounded-xl border border-gray-200 divide-gray-200 overflow-hidden overflow-y-scroll grow shrink scrollbar-thin`} data-accordion="collapse" >
            {variants.map((variant, i) => {
                const isOpen = openIndex === i;
                const status = variant.valid ? "success" : "error";
                    
                return (
                    <AccordionItem 
                        key={i} 
                        open={isOpen}
                        onToggle={() => setOpenIndex(isOpen ? null : i)}
                        withClass={`${isOpen ? `${variantStyles[status]} text-stone-900` : 'text-gray-700 '} group`}
                        title={
                            <div className={`flex items-center gap-3`}>
                                <span class={`inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-lg group-hover:${variantHover[status]} ${variantStyles[variant.valid ? "success" : "error"]}`}>
                                    {iconMap[variant.valid ? "success" : "error"]}
                                </span>
                                <span class="font-medium text-xs font-sans">
                                    {formatVariantName(variant.name)}
                                </span>
                            </div>
                        }
                    >
                        {variant.instances.length > 0 && (
                            <div class="flex flex-col gap-4">
                                {variant.instances.map((inst, j) => (
                                    <InstancePanel
                                        key={j}
                                        icon={inst.applyTemplate ? <SuccessIcon /> : <WarningIcon />}
                                        status={inst.applyTemplate}
                                        type={inst.type}
                                        template={inst.templatePrice ?? ""}
                                        priceOld={inst.priceBefore ?? ""}
                                        priceNew={inst.priceAfter ?? ""}
                                    />
                                ))}
                            </div>
                        )}
                    </AccordionItem>
                );
            })}
        </div>
    );
};