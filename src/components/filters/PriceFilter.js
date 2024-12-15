import React from 'react';
import ReactSlider from 'react-slider';
import { useSharedState } from '../SharedStateProvider';
import './styles/Price.css';

export default function PriceFilter() {
    const { priceFilter, setPriceFilter } = useSharedState();

    const handlePriceChange = (values) => {
        setPriceFilter(values); // Update shared state with the new range
    };

    return (
        <div className="price-filter">
            <label className="filter-title">Price:</label>
            <div className="price-value">
                ${priceFilter[0].toFixed(2)} - ${priceFilter[1].toFixed(2)}
            </div>
            <ReactSlider
                className="price-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                value={priceFilter}
                min={0}
                max={2500}
                step={50} // Increment by $50
                onChange={handlePriceChange}
                renderThumb={(props, state) => (
                    <div
                        {...props}
                        className="slider-thumb"
                        title={`$${state.valueNow}`}
                    />
                )}
                renderTrack={(props) => (
                    <div {...props} className="slider-track" />
                )}
            />
            <div className="price-labels">
                {[0, 500, 1000, 1500, 2000, 2500].map((price) => (
                    <span key={price} className="price-label">
                        ${price}
                    </span>
                ))}
            </div>
        </div>
    );
}
