import React from 'react';
import { useSharedState } from '../SharedStateProvider';
import './styles/Chipset.css'; // Updated Chipset.css file

export default function ChipsetFilter() {
    const { chipsetFilter, setChipsetFilter } = useSharedState();

    const chipsets = ['All Chipsets', 'Unisoc', 'Qualcomm', 'Mediatek', 'JLQ', 'Google', 'Exynos', 'Apple'];

    const handleChipsetChange = (event) => {
        setChipsetFilter(event.target.value);
    };

    return (
        <div className="chipset-filter">
            <label className="filter-title">Chipset:</label>
            <select
                value={chipsetFilter}
                onChange={handleChipsetChange}
                className="chipset-dropdown"
            >
                {chipsets.map((chipset) => (
                    <option key={chipset} value={chipset}>
                        {chipset}
                    </option>
                ))}
            </select>
        </div>
    );
}
