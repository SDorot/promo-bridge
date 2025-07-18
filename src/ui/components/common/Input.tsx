import { useMemo } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

export type InputType = 
| "text" 
| "number" 
| "password" 
| "email" 
| "tel" 
| "url"; 

export type InputValue =
| string 
| number;

export interface InputProps {
    id?: string;
    icon?: JSX.Element;
    type?: InputType;
    value?: InputValue;
    placeholder?: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    required?: boolean;
    withClass?: string;
    warnInvalid?: boolean;
    validator?: (value: string) => boolean;
    onChange?: (value: InputValue) => void;
}

export function InputField({
    id,
    icon,
    type = "text",
    value = "",
    placeholder,
    min,
    max,
    disabled = false,
    required = false,
    withClass = "",
    validator,
    warnInvalid = false,
    onChange = () => {},
}: InputProps) {

    const isEmpty = value?.toString().trim().length === 0;
    const isValid = validator ? validator(value.toString()) : true;

    const baseInput =
        'block w-full bg-white text-xs text-gray-900 placeholder:text-gray-400 ' +
        'focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ' +
        'disabled:opacity-50 disabled:cursor-not-allowed relative no-scrollbar white-space-nowrap text-ellipsis ' +
        (icon ? 'pl-3 pr-7 py-2' : 'pl-3 pr-3 py-2') +
        ' rounded-md border border-gray-300 shadow-sm';

    const wrapperClass = icon
        ? 'relative flex items-center shadow-sm rounded-md bg-white text-xs ' +
        'outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 ' +
        'focus-within:-outline-offset-2 focus-within:outline-green-600'
        : '';

    const handleInput = (e: Event) => {
        const val = (e.target as HTMLInputElement).value;
        onChange(type === 'number' ? Number(val) : val);
    };

    const borderClass = useMemo(() => {
        if (warnInvalid && isEmpty && required) return 'border-yellow-400 focus:ring-yellow-400 focus:border-yellow-400';
        if (!isValid) return 'border-red-500 focus:ring-red-500 focus:border-red-500';
        return 'border-gray-300 focus:ring-green-500 focus:border-green-500';
    }, [value]);

    return (
        <div class={icon ? `${wrapperClass} ${withClass}` : ''}>
            <input
                aria-label={"1ylfTEKArbr1HoILmg27eUWeARMQV63nmLCHvfZo_gPY"}
                id={id}
                type={type}
                name={id}
                value={value}
                onInput={handleInput}
                placeholder={placeholder}
                min={min}
                max={max}
                disabled={disabled}
                autoCorrect={"off"}
                spellcheck={false}
                maxLength={max}
                minLength={min}
                required={required}
                class={icon ? baseInput : `${baseInput} ${withClass} ${borderClass}`}
            />
            {icon && <div class="absolute pr-3 right-0 z-10 border-none my-auto">{icon}</div>}
        </div>
    );
}