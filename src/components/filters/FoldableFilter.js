import React from 'react';
import { useSharedState } from '../SharedStateProvider';

export default function FoldableFilter() {
    const { foldableFilter, setFoldableFilter } = useSharedState();

    const handleFilterChange = (event) => {
        setFoldableFilter(event.target.value);
    };

    return (
        <div className="">
            <label className="">Foldable:</label>
            <div className={"flex items-center gap-4"}>
                <label className="flex items-center">
                    <input
                        type="radio"
                        value="Default"
                        checked={foldableFilter === 'Default'}
                        onChange={handleFilterChange}
                        className="mr-2"
                    />
                    Either
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        value="Yes"
                        checked={foldableFilter === 'Yes'}
                        onChange={handleFilterChange}
                        className="mr-2"
                    />
                    Yes
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        value="No"
                        checked={foldableFilter === 'No'}
                        onChange={handleFilterChange}
                        className="mr-2"
                    />
                    No
                </label>
            </div>
        </div>
    );
}
