import type { ComponentChildren } from "preact";

export interface HeadingProps {
    id?: string;
    htmlFor?: string;
    children: ComponentChildren;
    withClass?: string;
}

const baseStyle = 'block rounded-lg font-medium text-gray-900 bg-transparent';

export function Label({ 
    id,
    children, 
    htmlFor,
    withClass = '',
}: HeadingProps) {
    return (
        <label 
            id={id}
            htmlFor={htmlFor}
            className={`${baseStyle} ${withClass}`}
        >
            {children}
        </label>
    );
}
