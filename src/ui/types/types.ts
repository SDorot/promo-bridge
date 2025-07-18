// 🌱  Request Format
export type FilterRequest = {
    sheetId: string | null;
    medium: string | null;
    category: string | null;
    startDate: string | null;
    endDate: string | null;
};


// 📮  Operation Status
export type OperationStatus =
| 'idle'
| 'fetching'
| 'processing';