import React from 'react';
import FoldableFilter from './filters/FoldableFilter';
import StorageFilter from './filters/StorageFilter';
import RamFilter from './filters/RamFilter';
import YearFilter from './filters/YearFilter';
import PriceFilter from './filters/PriceFilter';
import WeightFilter from './filters/WeightFilter';
import DisplayFilter from './filters/DisplayFilter';
import BatteryFilter from './filters/BatteryFilter';
import ChipsetFilter from './filters/ChipsetFilter';

export default function FeatureMenu() {
    return (
        <>
            <h3 className="font-bold mb-4">Features</h3>
            <div className={"flex flex-col gap-8 text-sm"}>
                <FoldableFilter />
                <ChipsetFilter />
                <StorageFilter />
                <RamFilter />
                <YearFilter />
                <PriceFilter />
                <WeightFilter />
                <DisplayFilter />
                <BatteryFilter />
            </div>

        </>
    );
}
