import React from 'react';
import { useSharedState } from '../SharedStateProvider';

export default function ChipsetFilter() {
    const { chipsetFilter, setChipsetFilter } = useSharedState();

    const chipsets = ['All Chipsets', 'Unisoc', 'Qualcomm', 'Mediatek', 'JLQ', 'Google', 'Exynos', 'Apple'];

    const handleChipsetChange = (event) => {
        setChipsetFilter(event.target.value); // Update shared state
    };

    return (
        <div>
            <label>Chipset:</label>
            <select
                value={chipsetFilter}
                onChange={handleChipsetChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
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
