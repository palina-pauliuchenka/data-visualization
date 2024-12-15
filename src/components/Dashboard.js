import React from 'react';
import { useSharedState } from './SharedStateProvider';

import BarChart from "./visuals/BarChart";
import PieChart from "./visuals/PieChart";
import ScatterPlot from "./visuals/ScatterPlot";

export default function Dashboard() {
    const { filteredPhones } = useSharedState(); // Access filtered phones

    return (
        <>
            <h2 className="font-bold mb-4">Dashboard</h2>

            <div className={"flex flex-col gap-8 h-full"}>
                <div className="flex flex-row gap-8 w-full h-1/2">
                    <BarChart />
                    <PieChart />
                </div>
                <ScatterPlot />
            </div>
            {/*<div className="phone-list">*/}
            {/*    {filteredPhones.length > 0 ? (*/}
            {/*        <ul className="space-y-2">*/}
            {/*            {filteredPhones.map((phone, index) => (*/}
            {/*                <li key={index} className="p-2 border-b">*/}
            {/*                    <span className="font-medium">*/}
            {/*                        {phone.model}*/}
            {/*                    </span>{' '}*/}
            {/*                    - <span>{phone.brand}</span> -{' '}*/}
            {/*                    <span>{phone.price}</span>*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    ) : (*/}
            {/*        <p>No phones available</p>*/}
            {/*    )}*/}
            {/*</div>*/}
        </>
    );
}
