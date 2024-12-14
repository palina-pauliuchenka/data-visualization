import React from 'react';
import ReactSlider from 'react-slider';
import { useSharedState } from '../SharedStateProvider';

export default function PriceFilter() {
    const { priceFilter, setPriceFilter } = useSharedState();

    const handlePriceChange = (values) => {
        setPriceFilter(values); // Update shared state with the new range
    };

    return (
        <div className="p-4">
            <h3 className="font-bold mb-2">Filter by Price</h3>
            <div className="text-sm text-gray-500 mb-2">
                Selected Range: ${priceFilter[0].toFixed(2)} - ${priceFilter[1].toFixed(2)}
            </div>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                value={priceFilter}
                min={0}
                max={2500}
                step={50} // Increment by $50
                onChange={handlePriceChange}
                renderThumb={(props, state) => (
                    <div {...props} className="bg-blue-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        ${state.valueNow}
                    </div>
                )}
                renderTrack={(props, state) => (
                    <div {...props} className={`slider-track ${state.index === 0 ? 'bg-gray-300' : 'bg-blue-500'}`} />
                )}
            />
            <div className="flex justify-between text-xs mt-2">
                {[0, 500, 1000, 1500, 2000, 2500].map((price) => (
                    <span key={price}>${price}</span>
                ))}
            </div>
        </div>
    );
}
