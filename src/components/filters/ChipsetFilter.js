import React from 'react';
import { useSharedState } from '../SharedStateProvider';

export default function ChipsetFilter() {
    const { chipsetFilter, setChipsetFilter } = useSharedState();

    const chipsets = ['All Chipsets', 'Unisoc', 'Qualcomm', 'Mediatek', 'JLQ', 'Google', 'Exynos', 'Apple'];

    const handleChipsetChange = (event) => {
        setChipsetFilter(event.target.value); // Update shared state
    };

    return (
        <div className="p-4">
            <h3 className="font-bold mb-2">Filter by Chipset</h3>
            <select
                value={chipsetFilter}
                onChange={handleChipsetChange}
                className="w-full p-2 border border-gray-300 rounded"
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
