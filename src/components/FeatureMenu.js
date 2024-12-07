import React from 'react';
import { useSharedState } from './SharedStateProvider';

export default function FeatureMenu() {
    const { columns } = useSharedState(); // Access shared state for columns

    // Map CSV headers to display names
    const displayMapping = {
        phone_model: 'Model',
        price: 'Cost',
    };

    // Filter and map columns to only show the required features
    const filteredFeatures = columns
        .filter((col) => ['phone_model', 'price'].includes(col.toLowerCase()))
        .map((col) => displayMapping[col] || col);

    return (
        <nav className="p-4">
            <ul className="flex flex-col gap-4">
                {filteredFeatures.map((feature, index) => (
                    <li key={index} className="text-sm font-medium">
                        {feature}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
