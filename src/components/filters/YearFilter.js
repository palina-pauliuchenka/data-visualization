import React from 'react';
import ReactSlider from 'react-slider';
import { useSharedState } from '../SharedStateProvider';

export default function YearFilter() {
    const { yearFilter, setYearFilter } = useSharedState();
    const minYear = 2017;
    const maxYear = 2024;

    const handleYearChange = (values) => {
        setYearFilter(values);
    };

    return (
        <div>
            <div className={"flex justify-between items-center"}>
                <label>Release Year</label>
                <div className="text-sm text-gray-500">
                    Range: {yearFilter[0]} - {yearFilter[1]}
                </div>
            </div>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                value={yearFilter}
                min={minYear}
                max={maxYear}
                step={1}
                onChange={handleYearChange}
                renderThumb={(props, state) => (
                    <div {...props}
                         className="bg-blue-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        {state.valueNow}
                    </div>
                )}
                renderTrack={(props, state) => (
                    <div {...props} className={`slider-track ${state.index === 0 ? 'bg-gray-300' : 'bg-blue-500'}`}/>
                )}
            />
            <div className="flex justify-between text-xs mt-2">
                {[2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map((year) => (
                    <span key={year}>{year}</span>
                ))}
            </div>
        </div>
    );
}
