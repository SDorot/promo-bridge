import { useCallback } from 'preact/hooks';

export function usePluginBridge() {
    const send = useCallback(<T = any>(type: string, payload?: T, flag?: string) => {
        parent.postMessage({ pluginMessage: { type, payload, flag } }, '*');
    }, []);

    const on = useCallback(<T = any>(
        type: string,
        callback: (payload: T) => void
    ) => {
        function handleMessage(event: MessageEvent) {
            const msg = event.data.pluginMessage;
            if (msg?.type === type) {
                callback(msg.payload);
            }
        }
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return { send, on };
}
