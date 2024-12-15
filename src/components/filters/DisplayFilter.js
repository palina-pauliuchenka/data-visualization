import React from 'react';
import ReactSlider from 'react-slider';
import { useSharedState } from '../SharedStateProvider';
import './styles/Display.css';

export default function DisplayFilter() {
    const { displayFilter, setDisplayFilter } = useSharedState();

    const handleDisplayChange = (values) => {
        setDisplayFilter(values); // Update shared state with the new range
    };

    return (
        <div className="display-filter">
            <label className="filter-title">Display Size:</label>
            <div className="display-value">
                {displayFilter[0]}" - {displayFilter[1]}"
            </div>
            <ReactSlider
                className="display-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                value={displayFilter}
                min={4.5}
                max={12.5}
                step={0.1} // Increment by 0.1 inches
                onChange={handleDisplayChange}
                renderThumb={(props) => (
                    <div {...props} className="slider-thumb" />
                )}
                renderTrack={(props) => (
                    <div {...props} className="slider-track" />
                )}
            />
            <div className="display-labels">
                {[4.5, 6.0, 8.0, 10.0, 12.5].map((size) => (
                    <span key={size} className="display-label">
                        {size}"
                    </span>
                ))}
            </div>
        </div>
    );
}
