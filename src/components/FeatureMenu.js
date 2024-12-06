import React from 'react';
import { useSharedState } from './SharedStateProvider';

function FeatureMenu() {
    const { columns } = useSharedState();

    return (
        <div className="p-4">
            <nav>
                <ul className="flex flex-col gap-4">
                    {columns.length > 0 ? (
                        columns.map((column, index) => (
                            <li key={index}>{column}</li>
                        ))
                    ) : (
                        <li>No features available</li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default FeatureMenu;