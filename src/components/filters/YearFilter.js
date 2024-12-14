import React from 'react';
import { useSharedState } from '../SharedStateProvider';

export default function YearFilter() {
    const { yearFilter, setYearFilter } = useSharedState();
    const minYear = 2017;
    const maxYear = 2024;

    const handleYearChange = (event) => {
        const { name, value } = event.target;
        if (name === 'min') {
            setYearFilter([Math.min(parseInt(value), yearFilter[1]), yearFilter[1]]);
        } else {
            setYearFilter([yearFilter[0], Math.max(parseInt(value), yearFilter[0])]);
        }
    };

    return (
        <div className="p-4">
            <h3 className="font-bold mb-2">Filter by Year</h3>
            <div className="text-sm text-gray-500 mb-2">
                Selected Range: {yearFilter[0]} - {yearFilter[1]}
            </div>
            <div className="flex items-center gap-4">
                <input
                    type="range"
                    name="min"
                    min={minYear}
                    max={maxYear}
                    value={yearFilter[0]}
                    onChange={handleYearChange}
                    className="w-full"
                />
                <input
                    type="range"
                    name="max"
                    min={minYear}
                    max={maxYear}
                    value={yearFilter[1]}
                    onChange={handleYearChange}
                    className="w-full"
                />
            </div>
            <div className="flex justify-between text-xs mt-2">
                {[2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map((year) => (
                    <span key={year}>{year}</span>
                ))}
            </div>
        </div>
    );
}
