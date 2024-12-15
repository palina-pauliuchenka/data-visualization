import React from 'react';
import ReactSlider from 'react-slider';
import { useSharedState } from '../SharedStateProvider';
import './styles/Weight.css';

export default function WeightFilter() {
    const { weightFilter, setWeightFilter } = useSharedState();

    const handleWeightChange = (values) => {
        setWeightFilter(values); // Update shared state with the new range
    };

    return (
        <div className="weight-filter">
            <label className="filter-title">Weight:</label>
            <div className="weight-value">
                {weightFilter[0]}g - {weightFilter[1]}g
            </div>
            <ReactSlider
                className="weight-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                value={weightFilter}
                min={0}
                max={630}
                step={10} // Increment by 10 grams
                onChange={handleWeightChange}
                renderThumb={(props, state) => (
                    <div
                        {...props}
                        className="slider-thumb"
                        title={`${state.valueNow}g`}
                    />
                )}
                renderTrack={(props) => (
                    <div {...props} className="slider-track" />
                )}
            />
            <div className="weight-labels">
                {[0, 150, 300, 450, 600].map((weight) => (
                    <span key={weight} className="weight-label">
                        {weight}g
                    </span>
                ))}
            </div>
        </div>
    );
}
