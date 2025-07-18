import type { JSX } from "preact/jsx-runtime";
import { Label } from "../common/Label";

export type InstancePanel = {
    icon: JSX.Element;
    type: string;
    status: boolean;
    template: string;
    priceOld: string;
    priceNew: string;
    withClass?: string;
}

export function InstancePanel({
    icon,
    type,
    status,
    template,
    priceOld,
    priceNew,
    withClass = '',
}: InstancePanel) {
    const styleIcon = status 
        ? 'text-green-500 bg-green-200'
        : 'text-orange-500 bg-orange-200';

    return (
        <div className={`flex flex-row flex-nowrap gap-x-2.5 w-full ${withClass}`}>
            <div className={`flex-1 flex flex-col gap-y-2`}>
                <div className={`flex flex-row gap-x-2 items-center flex-1`}>
                    <Label withClass="text-xs w-full text-left text-gray-700 text-bold whitespace-nowrap flex-1">
                        { type && type.length ? `${type.toUpperCase()}` : 'AUSENTE' }
                    </Label>
                    <Label withClass="text-xs w-full text-left text-gray-400 text-bold whitespace-nowrap flex-1">
                        { template && template.length ? `${template}` : 'SIN EFECTO' }
                    </Label>
                </div>
                <div className={`flex flex-row gap-x-2 items-center flex-1`}>
                    <div className={`flex gap-y-2 flex-1 flex-nowrap`}>
                        <Label withClass="text-xs w-full text-left text-stone-500 text-bold flex-1">
                            OLD: 
                        </Label>
                        <p className={`text-xs w-full text-left text-stone-400 text-semibold whitespace-nowrap text-ellipsis flex-1`}>
                            { priceOld && priceOld.length > 0 && priceOld !== '-' ? `${priceOld}` : 'Omitido' }
                        </p>
                    </div>
                    <div className={`flex gap-y-2 flex-1 flex-wrap`}>
                        <Label withClass="text-xs w-full text-left text-stone-500 text-bold flex-1">
                            NEW:
                        </Label>
                        <p className={`text-xs w-full text-left text-stone-400 text-semibold whitespace-nowrap flex-1`}>
                            { priceNew && priceNew.length > 0 && priceNew !== '-' ? `${priceNew}` : 'Omitido' }
                        </p>
                    </div>
                </div>
            </div>

            <span class={`inline-flex items-center top-0 justify-center shrink-0 w-6 h-6 rounded-lg ${styleIcon}`}>
                {icon}
            </span> 
        </div>
    );
};