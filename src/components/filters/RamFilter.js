import React from 'react';
import { useSharedState } from '../SharedStateProvider';

export default function RamFilter() {
    const { ramFilter, setRamFilter } = useSharedState();

    const ramOptions = [0, 2, 3, 4, 6, 8, 12, 16]; 

    const handleRamChange = (event) => {
        setRamFilter(parseInt(event.target.value)); 
    };

    const formatRamLabel = (value) => {
        if (value === 0) return 'All';
        return `${value} GB`;
    };

    return (
        <div>
            <div className={"flex justify-between items-center"}>
                <label>Filter by RAM</label>
                <div className="text-sm text-gray-500">
                    {ramFilter === 0 ? 'All Phones' : formatRamLabel(ramFilter)}
                </div>
            </div>
            <input
                type="range"
                min="0"
                max="7"
                step="1"
                value={ramOptions.indexOf(ramFilter)}
                onChange={(event) => handleRamChange({target: {value: ramOptions[event.target.value]}})}
                className="w-full"
            />
        </div>
    );
}
