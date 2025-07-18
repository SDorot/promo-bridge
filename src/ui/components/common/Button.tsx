import type { ComponentChildren } from "preact";

export type ButtonVariant = 
| 'primary' 
| 'secondary' 
| 'danger' 
| 'link' 
| 'cancel'; 

export type ButtonType = 
| 'button' 
| 'submit' 
| 'reset';

export interface ButtonProps {
    id?: string;
    children: ComponentChildren;
    onClick?: () => void;
    variant?: ButtonVariant;  
    type?: ButtonType;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}

const baseStyle = 'focus:outline-none focus:ring-1 font-medium rounded-lg text-xs px-4 py-2 rounded-lg inline-flex items-center justify-center transition duration-150 ease-in-out';

const variantStyles: Record<ButtonVariant, string> = {
    primary: "text-white bg-green-700 hover:bg-green-800 focus:ring-green-300",
    secondary: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300",
    danger: "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300",
    link: "bg-transparent text-blue-600 hover:text-blue-700 hover:underline",
    cancel: "text-gray-900 bg-white border border-gray-200 hover:bg-stone-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-green-700",
};

export function Button({
    id,
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    loading = false,
    disabled = false,
    className,
}: ButtonProps) {
    const style = `${variantStyles[variant]} ${disabled || loading ? "cursor-not-allowed" : ""}`;

    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${style} ${className} disabled:opacity-90 disabled:bg-gray-400 disabled:hover:bg-gray-500 disabled:text-white`}
        >
            {children} 
        </button>
    );
}