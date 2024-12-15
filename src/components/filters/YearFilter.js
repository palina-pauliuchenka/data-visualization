import React from 'react';
import ReactSlider from 'react-slider';
import { useSharedState } from '../SharedStateProvider';
import './styles/Year.css';

export default function YearFilter() {
    const { yearFilter, setYearFilter } = useSharedState();
    const minYear = 2017;
    const maxYear = 2024;

    const handleYearChange = (values) => {
        setYearFilter(values);
    };

    return (
        <div className="year-filter">
            <label className="filter-title">Release Year:</label>
            <div className="year-value">
                Range: {yearFilter[0]} - {yearFilter[1]}
            </div>
            <ReactSlider
                className="year-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                value={yearFilter}
                min={minYear}
                max={maxYear}
                step={1}
                onChange={handleYearChange}
                renderThumb={(props) => (
                    <div {...props} className="slider-thumb" />
                )}
                renderTrack={(props) => (
                    <div {...props} className="slider-track" />
                )}
            />
            <div className="year-labels">
                {[2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map((year) => (
                    <span key={year} className="year-label">
                        {year}
                    </span>
                ))}
            </div>
        </div>
    );
}
