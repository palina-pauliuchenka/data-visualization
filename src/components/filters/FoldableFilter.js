import React from 'react';
import { useSharedState } from '../SharedStateProvider';
import './styles/Foldable.css';

export default function FoldableFilter() {
    const { foldableFilter, setFoldableFilter } = useSharedState();

    const handleFilterChange = (event) => {
        setFoldableFilter(event.target.value);
    };

    return (
        <div className="foldable-filter">
            <label className="filter-title">Foldable:</label>
            <div className="radio-group">
                <label className="radio-label">
                    <input
                        type="radio"
                        value="Default"
                        checked={foldableFilter === 'Default'}
                        onChange={handleFilterChange}
                        className="hidden-radio"
                    />
                    <span className="custom-radio"></span>
                    Either
                </label>
                <label className="radio-label">
                    <input
                        type="radio"
                        value="Yes"
                        checked={foldableFilter === 'Yes'}
                        onChange={handleFilterChange}
                        className="hidden-radio"
                    />
                    <span className="custom-radio"></span>
                    Yes
                </label>
                <label className="radio-label">
                    <input
                        type="radio"
                        value="No"
                        checked={foldableFilter === 'No'}
                        onChange={handleFilterChange}
                        className="hidden-radio"
                    />
                    <span className="custom-radio"></span>
                    No
                </label>
            </div>
        </div>
    );
}
