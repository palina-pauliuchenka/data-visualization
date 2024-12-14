import React from 'react';
import { useSharedState } from '../SharedStateProvider';

export default function StorageFilter() {
    const { storageFilter, setStorageFilter } = useSharedState();

    const storageOptions = [0, 32, 64, 128, 256, 512, 1000]; // Storage options

    const handleStorageChange = (event) => {
        setStorageFilter(parseInt(event.target.value)); // Update shared state
    };

    const formatStorageLabel = (value) => {
        if (value === 0) return 'All';
        if (value === 1000) return '1 TB';
        return `${value} GB`;
    };

    return (
        <div className="p-4">
            <h3 className="font-bold mb-2">Filter by Storage</h3>
            <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={storageOptions.indexOf(storageFilter)}
                onChange={(event) => handleStorageChange({ target: { value: storageOptions[event.target.value] } })}
                className="w-full"
            />
            <div className="text-sm text-gray-500">
                Selected: {storageFilter === 0 ? 'All Phones' : formatStorageLabel(storageFilter)}
            </div>
            <div className="flex justify-between text-xs mt-2">
                {storageOptions.map((option, index) => (
                    <span key={index}>{formatStorageLabel(option)}</span>
                ))}
            </div>
        </div>
    );
}
