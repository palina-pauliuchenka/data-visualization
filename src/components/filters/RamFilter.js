import React from 'react';
import { useSharedState } from '../SharedStateProvider';

export default function RamFilter() {
    const { ramFilter, setRamFilter } = useSharedState();

    const ramOptions = [0, 2, 3, 4, 6, 8, 12, 16]; // RAM options

    const handleRamChange = (event) => {
        setRamFilter(parseInt(event.target.value)); // Update shared state
    };

    const formatRamLabel = (value) => {
        if (value === 0) return 'All';
        return `${value} GB`;
    };

    return (
        <div className="p-4">
            <h3 className="font-bold mb-2">Filter by RAM</h3>
            <input
                type="range"
                min="0"
                max="7"
                step="1"
                value={ramOptions.indexOf(ramFilter)}
                onChange={(event) => handleRamChange({ target: { value: ramOptions[event.target.value] } })}
                className="w-full"
            />
            <div className="text-sm text-gray-500">
                Selected: {ramFilter === 0 ? 'All Phones' : formatRamLabel(ramFilter)}
            </div>
            <div className="flex justify-between text-xs mt-2">
                {ramOptions.map((option, index) => (
                    <span key={index}>{formatRamLabel(option)}</span>
                ))}
            </div>
        </div>
    );
}
