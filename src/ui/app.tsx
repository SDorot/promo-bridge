import { useEffect, useState } from 'preact/hooks'
import { SheetIcon } from './components/icons/SheetIcon';
import { Label } from './components/common/Label';
import { Button } from './components/common/Button';
import { InputField } from './components/common/Input';
import { usePluginData } from './hooks/usePluginData';
import { usePluginBridge } from './hooks/usePluginBridge';
import { CalendarIcon } from './components/icons/CalendarIcon';
import { SheetDialog } from './components/composite/SheetDialog';
import { VariantAccordion } from './components/layout/VariantAccordion';
import { Summary } from './components/common/Summary';
import FlagSelector from './components/composite/FlagSelector';
import { FlagSheetMap, type FlagSheetKey, type SummaryInst, type SummaryVars, type VariantLog } from '../shared/types';
import { useFetchPreview } from './hooks/useFetchPreview';
import { RetailABC } from './components/icons/Retail_ABC';
import { RetailXYZ } from './components/icons/Retail_XYZ';


export function App() {

    const [sheetId, setSheetId] = usePluginData<string>('sheetId', '');
    const [medium, setMedium] = useState<string | null>(null);
    const [category, setCategory] = usePluginData<string>('category', '');
    const [flag, setFlag] = useState<FlagSheetKey>('flag-retail-abc');
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [showSheetDialog, setShowSheetDialog] = useState(false);
    
    const { record, status, setStatus, setRecord } = useFetchPreview({ sheetId, medium, category, startDate, endDate });  
    const { send, on } = usePluginBridge();

    const [variantLogs, setVariantLogs] = useState<VariantLog[]>([]);
    const [variantSkipped, setVariantSkipped] = useState<string[]>([]);
    const [summaryVars, setSummaryVars] = useState<SummaryVars | null>(null);
    const [summaryInst, setSummaryInst] = useState<SummaryInst | null>(null);


    const handleLoad = () => {
        if (!record || record.length === 0) return;
        setStatus('processing');
        send('debug-data', { data: record }, flag);
    };

    const handleDone = () => {
        send('done');
    };

    const handleRetry = () => {
        setVariantLogs([]);
        setVariantSkipped([]);
        setSummaryVars(null);
        setSummaryInst(null);
        setShowSheetDialog(false);
    };

    useEffect(() => {
        return on('debug-promos-done', (payload) => {
            setVariantLogs(payload.variants);
            setVariantSkipped(payload.skipped);
            setSummaryVars(payload.summary.vars);
            setSummaryInst(payload.summary.inst);

            setShowSheetDialog(true);
            setRecord([]);
            setStartDate(null);
            setEndDate(null);
            setStatus('idle');
            console.log(`⚠ Omitidos: ${variantSkipped.length}`);
        });
    }, [on]);

    return (
        <div className="relative h-full w-full mx-auto max-w-2xl px-6 pt-6">
            <div className={"flex items-center justify-center"}>
                <SheetIcon className="w-8 h-8" />
                <Label withClass="text-base ml-1.5">
                    Promo Bridge
                </Label>
            </div>
            <div className="flex flex-col justify-center items-center gap-y-2">
                <div className={"flex flex-col gap-y-1.5 pt-5 w-full"}>
                    <Label htmlFor='sheetId' withClass='text-xs'>
                        Flag
                    </Label>
                    <FlagSelector
                        selected={flag}
                        onChange={(f) => {
                            setFlag(f);
                            setSheetId(FlagSheetMap[f]);
                        }}
                        icons={{
                            "flag-retail-abc": <RetailABC withClass="w-3/6 h-min py-1.5" />,
                            "flag-retail-xyz": <RetailXYZ withClass="w-3/6 h-min py-1.5" />,
                        }}
                    />
                    <Label htmlFor='half' withClass='text-xs mt-1'>
                        Medium
                    </Label>
                    <InputField 
                        id="half"
                        type="text"
                        value={medium || ''}
                        placeholder="Medium"
                        required={true}
                        withClass="w-full"
                        onChange={(val) => setMedium(val.toString())}
                    />
                </div>
                <div className={"flex flex-col gap-y-2.5 w-full mb-2.5"}>
                    <Label htmlFor='category' withClass='text-xs'>
                        Category
                    </Label>
                    <InputField 
                        id="category"
                        type="text"
                        value={category}
                        placeholder="Category"
                        required
                        withClass="w-full"
                        warnInvalid
                        validator={(val) => {
                            if (val.trim() === '') return true; 
                            return val.trim().length >= 5;
                        }}
                        onChange={(val) => setCategory(val.toString())}
                    />
                    <div className="grid grid-cols-2 gap-x-3">
                        <InputField 
                            icon={<CalendarIcon withClass=" h-3 w-3 fill-gray-700 group-hover:fill-green-700 group-focus:fill-green-700"/>}
                            id="startDate"
                            type="text"
                            value={startDate ?? ''}
                            placeholder="Start date"
                            max={10}
                            required
                            withClass="w-full group"
                            warnInvalid
                            validator={(val) => {
                                if (val.trim() === '') return true;
                                return /^\d{2}\/\d{2}\/\d{4}$/.test(val.trim());
                            }}
                            onChange={(val) => setStartDate(val.toString())}
                        />
                        <InputField 
                            icon={<CalendarIcon withClass="w-3 h-3 fill-gray-700 group-hover:fill-green-700 group-focus:fill-green-700"/>}
                            id="endDate"
                            type="text"
                            value={endDate ?? ''}
                            placeholder="End date"
                            required
                            max={10}
                            withClass="w-full group"
                            warnInvalid
                            validator={(val) => {
                                if (val.trim() === '') return true;
                                return /^\d{2}\/\d{2}\/\d{4}$/.test(val.trim());
                            }}
                            onChange={(val) => setEndDate(val.toString())}
                        />
                    </div>
                </div>
                <div className={"grid grid-cols-1 grid-rows-2 gap-y-3 w-full"}>
                    <div class="pt-3 border-t border-gray-200 w-full row-start-1">
                        { status === 'idle' && record !== null && startDate && endDate && (
                            <Label withClass="text-xs text-center">
                                {record.length} matches were found.
                            </Label>
                        )}
                    </div>
                    <Button
                        variant="primary"
                        disabled={
                            status === 'fetching' || 
                            status === 'processing' ||
                            !record ||
                            record.length === 0 
                        } 
                        onClick={handleLoad}
                        className="w-full row-start-2 text-center"
                    >
                        {{
                            idle: 'Load data',
                            fetching: 'Consulting…',
                            processing: 'Processing…'
                        }[status]}
                    </Button>
                </div>
            </div>
            { showSheetDialog && (
                <SheetDialog
                    type="bottom"
                    open={showSheetDialog}
                    onClose={() => setShowSheetDialog(false)}
                >
                    <div className={"flex flex-col gap-y-3.5 w-full h-full overflow-hidden bg-white"}>
                        <Label withClass="text-sm text-left w-full text-gray-800">
                            Resumen de resultados
                        </Label>

                        <div className={"grid grid-cols-3 gap-x-3"}>
                            <Summary 
                                label="Total Promos" 
                                value={summaryVars ? summaryVars.total.toString() : "0"}
                                color="purple"
                            />
                            <Summary 
                                label="Updated Promos"
                                value={summaryVars ? summaryVars.updated.toString() : "0"}
                                color="blue"
                            />
                            <Summary 
                                label="Updated Instances"
                                value={summaryInst ? summaryInst?.applied.toString() : "0"}
                                color="orange"
                            />
                        </div>
                        
                        <VariantAccordion variants={variantLogs} />

                        <div className={"grid grid-cols-2 gap-x-4 w-full"}>
                            <Button variant="cancel" className='col-span-1' onClick={handleRetry}>
                                Retry
                            </Button>
                            <Button variant="primary" className='col-span-1' onClick={handleDone}>
                                Done
                            </Button>
                        </div>
                    </div>
                </SheetDialog> 
            )}
        </div>
    );
}
