import React from 'react';
import { useSharedState } from '../SharedStateProvider';
import './styles/Storage.css';

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
        <div className="storage-filter">
            <label className="filter-title">Storage:</label>
            <div className="storage-value">
                {storageFilter === 0 ? 'All Phones' : formatStorageLabel(storageFilter)}
            </div>
            <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={storageOptions.indexOf(storageFilter)}
                onChange={(event) => handleStorageChange({ target: { value: storageOptions[event.target.value] } })}
                className="storage-slider"
            />
            <div className="storage-labels">
                {storageOptions.map((option, index) => (
                    <span key={option} className="storage-label">
                        {formatStorageLabel(option)}
                    </span>
                ))}
            </div>
        </div>
    );
}
