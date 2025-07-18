import { useState, useEffect } from 'preact/hooks';
import { usePluginBridge } from './usePluginBridge';

export function usePluginData<T>(key: string, fallback: T) {
    const [value, setValue] = useState<T>(fallback);
    const { send, on } = usePluginBridge();

    useEffect(() => {
        send('get-storage', {title: key});
    }, [key]);

    useEffect(() => {
        return on(`storage:${key}`, (val: T) => {
            setValue(val);
        });
    }, [key]);

    const update = (v: T) => {
        setValue(v);
        send('set-storage', { title: key, value: v });
    };

    return [value, update] as const;
}
