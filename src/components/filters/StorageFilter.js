import React from 'react';
import { useSharedState } from '../SharedStateProvider';

export default function StorageFilter() {
    const { storageFilter, setStorageFilter } = useSharedState();

    const storageOptions = [0, 32, 64, 128, 256, 512, 1000]; 

    const handleStorageChange = (event) => {
        setStorageFilter(parseInt(event.target.value)); 
    };

    const formatStorageLabel = (value) => {
        if (value === 0) return 'All';
        if (value === 1000) return '1 TB';
        return `${value} GB`;
    };

    return (
        <div>
            <div className={"flex justify-between items-center"}>
                <label>Storage:</label>
                <div className="text-sm text-gray-500">
                    {storageFilter === 0 ? 'All Phones' : formatStorageLabel(storageFilter)}
                </div>
            </div>
            <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={storageOptions.indexOf(storageFilter)}
                onChange={(event) => handleStorageChange({target: {value: storageOptions[event.target.value]}})}
                className="w-full"
            />
        </div>
    );
}
