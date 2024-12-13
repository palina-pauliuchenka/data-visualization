import React from 'react';
import { useSharedState } from './SharedStateProvider';

export default function FeatureMenu() {
    const { columns } = useSharedState(); // Access shared state for columns

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
        Year: 'Year', // This will only be shown if it's in the uploaded file
        price_range: 'Price Range',
    };

    const capitalizeLabel = (label) => {
        return label.charAt(0).toUpperCase() + label.slice(1); // Capitalize the first letter
    };

    // Filter the columns that exist in the displayMapping, preserving order
    const filteredFeatures = Object.keys(displayMapping) // Get the keys from displayMapping
        .filter((col) => columns.includes(col)) // Filter based on columns that exist
        .map((col) => ({
            key: col, // Unique key for the column
            label: capitalizeLabel(displayMapping[col]), // Capitalize label
        }));

    return (
        <aside className="p-4 pt-8 pr-16 w-fit border-r-2">
            <ul className="flex flex-col gap-4">
                {filteredFeatures.length > 0 ? (
                    filteredFeatures.map((feature) => (
                        <li key={feature.key} className="text-sm font-medium">
                            {feature.label}
                        </li>
                    ))
                ) : (
                    <li>No features available</li> // Fallback if no filters match
                )}
            </ul>
        </aside>
    );
}
