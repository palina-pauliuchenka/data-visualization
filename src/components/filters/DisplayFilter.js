import React from 'react';
import ReactSlider from 'react-slider';
import { useSharedState } from '../SharedStateProvider';

export default function DisplayFilter() {
    const { displayFilter, setDisplayFilter } = useSharedState();

    const handleDisplayChange = (values) => {
        setDisplayFilter(values); // Update shared state with the new range
    };

    return (
        <div>
            <div className={"flex justify-between items-center"}>
                <label>Display Size</label>
                <div className="text-sm text-gray-500">
                    Range: {displayFilter[0]}" - {displayFilter[1]}"
                </div>
            </div>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                value={displayFilter}
                min={4.5}
                max={12.5}
                step={0.1} // Increment by 0.1 inches
                onChange={handleDisplayChange}
                renderThumb={(props, state) => (
                    <div {...props} className="bg-blue-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        {state.valueNow}"
                    </div>
                )}
                renderTrack={(props, state) => (
                    <div {...props} className={`slider-track ${state.index === 0 ? 'bg-gray-300' : 'bg-blue-500'}`} />
                )}
            />
            <div className="flex justify-between text-xs mt-2">
                {[4.5, 6.0, 8.0, 10.0, 12.5].map((size) => (
                    <span key={size}>{size}"</span>
                ))}
            </div>
        </div>
    );
}
