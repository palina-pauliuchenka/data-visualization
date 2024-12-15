import React from 'react';
import ReactSlider from 'react-slider';
import { useSharedState } from '../SharedStateProvider';

export default function BatteryFilter() {
    const { batteryFilter, setBatteryFilter } = useSharedState();

    const handleBatteryChange = (values) => {
        setBatteryFilter(values); // Update shared state with the new range
    };

    return (
        <div className="p-4">
            <h3 className="font-bold mb-2">Filter by Battery Capacity</h3>
            <div className="text-sm text-gray-500 mb-2">
                Selected Range: {batteryFilter[0]} mAh - {batteryFilter[1]} mAh
            </div>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                value={batteryFilter}
                min={0}
                max={11000}
                step={1000} // Increment by 1000 mAh
                onChange={handleBatteryChange}
                renderThumb={(props, state) => (
                    <div {...props} className="bg-blue-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        {state.valueNow} mAh
                    </div>
                )}
                renderTrack={(props, state) => (
                    <div {...props} className={`slider-track ${state.index === 0 ? 'bg-gray-300' : 'bg-blue-500'}`} />
                )}
            />
            <div className="flex justify-between text-xs mt-2">
                {[0, 3000, 6000, 9000, 11000].map((capacity) => (
                    <span key={capacity}>{capacity} mAh</span>
                ))}
            </div>
        </div>
    );
}
