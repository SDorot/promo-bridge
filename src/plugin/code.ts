import type { MessageMap, MessagePlugin } from "../shared/types";
import { debugPromotions } from "./methods";

figma.showUI(__html__, {
    title: "Promo Bridge",
    width: 320,
    height: 450,
}); 

figma.ui.onmessage = async (msg: MessagePlugin) => {
    const { type, payload, flag } = msg;

    if (type === 'cancel') {
        figma.closePlugin();
        return;
    }

    if (type === 'done') {
        figma.closePlugin();
        return;
    }

    if (type === 'debug-data' && flag) {
        const { data } = payload as MessageMap['debug-data'];
        console.log('🧪 Flag:', flag);
        console.log('🧪 Carga:', payload);
        console.log('🧪 Datos de depuración:', data);
        await debugPromotions(data, flag);
        return;
    }

    if (type === 'get-storage') {
        const { title } = payload as MessageMap['get-storage'];
        const value = await figma.clientStorage.getAsync(title);  
        figma.ui.postMessage({ type: `storage:${title}`, payload: value });
    }

    if (type === 'set-storage') {
        const { title, value } = payload as MessageMap['set-storage'];
        await figma.clientStorage.setAsync(title, value);
    }

};
