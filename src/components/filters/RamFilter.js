import React from 'react';
import { useSharedState } from '../SharedStateProvider';
import './styles/Ram.css';

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
        <div className="ram-filter">
            <label className="filter-title">Filter by RAM:</label>
            <div className="ram-value">
                {ramFilter === 0 ? 'All Phones' : formatRamLabel(ramFilter)}
            </div>
            <input
                type="range"
                min="0"
                max="7"
                step="1"
                value={ramOptions.indexOf(ramFilter)}
                onChange={(event) =>
                    handleRamChange({ target: { value: ramOptions[event.target.value] } })
                }
                className="ram-slider"
            />
            <div className="ram-labels">
                {ramOptions.map((option, index) => (
                    <span key={option} className="ram-label">
                        {formatRamLabel(option)}
                    </span>
                ))}
            </div>
        </div>
    );
}
