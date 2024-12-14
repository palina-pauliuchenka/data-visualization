import React from 'react';
import { useSharedState } from '../SharedStateProvider';

export default function FoldableFilter() {
    const { foldableFilter, setFoldableFilter } = useSharedState();

    const handleFilterChange = (event) => {
        setFoldableFilter(event.target.value);
    };

    return (
        <div className="p-4">
            <h3 className="font-bold mb-2">Filter by Foldability</h3>
            <div>
                <label className="flex items-center mb-2">
                    <input
                        type="radio"
                        value="Default"
                        checked={foldableFilter === 'Default'}
                        onChange={handleFilterChange}
                        className="mr-2"
                    />
                    All Phones
                </label>
                <label className="flex items-center mb-2">
                    <input
                        type="radio"
                        value="Yes"
                        checked={foldableFilter === 'Yes'}
                        onChange={handleFilterChange}
                        className="mr-2"
                    />
                    Foldable
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        value="No"
                        checked={foldableFilter === 'No'}
                        onChange={handleFilterChange}
                        className="mr-2"
                    />
                    Non-Foldable
                </label>
            </div>
        </div>
    );
}
