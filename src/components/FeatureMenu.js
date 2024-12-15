import React from 'react';
import FoldableFilter from './filters/FoldableFilter';
import StorageFilter from './filters/StorageFilter';
import RamFilter from './filters/RamFilter';
import YearFilter from './filters/YearFilter';
import PriceFilter from './filters/PriceFilter';
import WeightFilter from './filters/WeightFilter'; // Import new component
import DisplayFilter from './filters/DisplayFilter'; // Import new component
import { useSharedState } from './SharedStateProvider';

export default function FeatureMenu() {
    const { columns } = useSharedState();

    const displayMapping = {
        Foldable: 'Foldable',
        phone_model: 'Model',
        price: 'Cost',
        currency: 'Currency',
        storage: 'Storage',
        ram: 'RAM',
        Launch: 'Launch Date',
        Dimensions: 'Dimensions',
        Weight: 'Weight',
        Display_Type: 'Display Type',
        Display_Size: 'Display Size',
        Display_Resolution: 'Display Resolution',
        OS: 'OS',
        NFC: 'NFC',
        BATTERY: 'Battery',
        Features_Sensors: 'Feature Sensors',
        Colors: 'Colors',
        Video: 'Video',
        Chipset: 'Chipset',
        CPU: 'CPU',
        GPU: 'GPU',
        Year: 'Year',
        price_range: 'Price Range',
    };

    const capitalizeLabel = (label) => {
        return label.charAt(0).toUpperCase() + label.slice(1);
    };

    const filteredFeatures = Object.keys(displayMapping)
        .filter((col) => columns.includes(col))
        .map((col) => ({
            key: col,
            label: capitalizeLabel(displayMapping[col]),
        }));

    return (
        <aside className="p-4 border-r-2 w-64">
            <h3 className="font-bold mb-4">Features</h3>
            <FoldableFilter />
            <StorageFilter />
            <RamFilter />
            <YearFilter />
            <PriceFilter />
            <WeightFilter />
            <DisplayFilter /> 
            <ul className="mt-4 flex flex-col gap-2">
                {filteredFeatures.length > 0 ? (
                    filteredFeatures.map((feature) => (
                        <li key={feature.key} className="text-sm font-medium">
                            {feature.label}
                        </li>
                    ))
                ) : (
                    <li>No features available</li>
                )}
            </ul>
        </aside>
    );
}
