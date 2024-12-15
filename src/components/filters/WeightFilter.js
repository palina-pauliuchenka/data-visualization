import React from 'react';
import ReactSlider from 'react-slider';
import { useSharedState } from '../SharedStateProvider';

export default function WeightFilter() {
    const { weightFilter, setWeightFilter } = useSharedState();

    const handleWeightChange = (values) => {
        setWeightFilter(values); // Update shared state with the new range
    };

    return (
        <div className="p-4">
            <h3 className="font-bold mb-2">Filter by Weight</h3>
            <div className="text-sm text-gray-500 mb-2">
                Selected Range: {weightFilter[0]}g - {weightFilter[1]}g
            </div>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                value={weightFilter}
                min={40}
                max={630}
                step={10} // Increment by 10 grams
                onChange={handleWeightChange}
                renderThumb={(props, state) => (
                    <div {...props} className="bg-blue-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        {state.valueNow}g
                    </div>
                )}
                renderTrack={(props, state) => (
                    <div {...props} className={`slider-track ${state.index === 0 ? 'bg-gray-300' : 'bg-blue-500'}`} />
                )}
            />
            <div className="flex justify-between text-xs mt-2">
                {[40, 150, 300, 450, 650].map((weight) => (
                    <span key={weight}>{weight}g</span>
                ))}
            </div>
        </div>
    );
}
