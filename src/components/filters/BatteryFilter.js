import React from 'react';
import ReactSlider from 'react-slider';
import { useSharedState } from '../SharedStateProvider';
import './styles/Battery.css';

export default function BatteryFilter() {
    const { batteryFilter, setBatteryFilter } = useSharedState();

    const handleBatteryChange = (values) => {
        setBatteryFilter(values); // Update shared state with the new range
    };

    return (
        <div className="battery-filter">
            <label className="filter-title">Battery Capacity:</label>
            <div className="battery-value">
                {batteryFilter[0]} mAh - {batteryFilter[1]} mAh
            </div>
            <ReactSlider
                className="battery-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                value={batteryFilter}
                min={0}
                max={11000}
                step={1000} // Increment by 1000 mAh
                onChange={handleBatteryChange}
                renderThumb={(props) => (
                    <div {...props} className="slider-thumb" />
                )}
                renderTrack={(props) => (
                    <div {...props} className="slider-track" />
                )}
            />
        </div>
    );
}
