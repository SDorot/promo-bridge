import type React from "preact/compat";
import { FlagSheetMap, type FlagSheetKey } from "../../../shared/types";

interface FlagSelectorProps {
    selected: FlagSheetKey;
    onChange: (flag: FlagSheetKey) => void;
    icons: Record<FlagSheetKey, React.ReactNode>;
}

export default function FlagSelector({ 
    selected, 
    onChange, 
    icons 
}: FlagSelectorProps) {
  return (
        <ul className="grid w-full gap-3 grid-cols-2 grid-rows-1">
            {Object.keys(FlagSheetMap).map((key) => {
                const k = key as FlagSheetKey;
                return (
                <li key={k} className={"flex justify-center"}>
                    <input
                        type="radio"
                        id={k}
                        name="flagRetail"
                        value={k}
                        checked={selected === k}
                        onChange={() => onChange(k)}
                        className="hidden peer"
                        required
                    />
                    <label
                        htmlFor={k}
                        className="inline-flex items-center justify-between w-full p-1 bg-white border rounded-lg cursor-pointer
                            text-gray-500 border-gray-200 hover:text-gray-600 hover:bg-gray-100
                            peer-checked:text-green-600 peer-checked:border-green-600
                            filter grayscale peer-checked:filter-none flex-1"
                    >
                        <div className="flex justify-center items-center gap-2 w-full h-full">
                            {icons[k]}
                        </div>
                    </label>
                </li>
                );
            })}
        </ul>
    );    
}
