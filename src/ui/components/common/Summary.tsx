export const COLOR_MAP = {
    orange: ['bg-orange-50','bg-orange-100','text-orange-600'],
    amber: ['bg-amber-50', 'bg-amber-100', 'text-amber-600'],
    purple: ['bg-purple-50', 'bg-purple-100', 'text-purple-600'],
    cyan: ['bg-cyan-50', 'bg-cyan-100', 'text-cyan-600'],
    blue : ['bg-blue-50',  'bg-blue-100',  'text-blue-600'],
    gray : ['bg-gray-50',  'bg-gray-100',  'text-gray-600'],
} as const;

export type ColorOptions = keyof typeof COLOR_MAP; 

export interface SummaryProps {
    label: string;
    value: string;
    color?: ColorOptions;
    withClass?: string;
}

export function Summary({
    label = 'Label',
    value = '0',
    color = 'gray',
    withClass = '',
}: SummaryProps) {

    const [bg50, bg100, txt] = COLOR_MAP[color];

    return (
        <dl className={`col-span-1 ${bg50} rounded-lg flex flex-col items-center justify-center p-3 ${withClass}`}>
            <dt className={`w-8 h-8 rounded-full ${bg100} ${txt} text-sm font-medium flex items-center justify-center mb-1`}>
                {value}
            </dt>
            <dd className={`${txt} text-xs font-medium text-center`}>
                {label}
            </dd>
        </dl>
    );
}