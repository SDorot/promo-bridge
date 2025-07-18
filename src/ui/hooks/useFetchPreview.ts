import { useEffect, useState } from "preact/hooks";
import type { RecordItem } from "../../shared/types";
import type { FilterRequest, OperationStatus } from "../types/types";

export function useFetchPreview(deps: FilterRequest) {
    const { sheetId, medium, category, startDate, endDate } = deps;

    const [record, setRecord] = useState<RecordItem[] | null>(null);
    const [status, setStatus] = useState<OperationStatus>('idle');

    const fetchPreview = async () => {
        setStatus('fetching');
        try {
            const res = await fetch("http://localhost:4321/api/v1/sheets/preview", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ sheetId, medium, category, startDate, endDate, }),
            });

            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

            const json = await res.json() as RecordItem[];
            setRecord(json);
        } catch (err) {
            console.error("Error al consultar:", err);
            setRecord([]);
        } finally {
            setStatus('idle');
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (sheetId && category && startDate && endDate) {
                fetchPreview();
            } else {
                setRecord([]);
            }
        }, 1000); 
        return () => clearTimeout(timeout);
    }, [sheetId, medium, category, startDate, endDate]);

    return { record, status, setStatus, setRecord };
}