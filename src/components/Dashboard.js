import React from 'react';
import { useSharedState } from './SharedStateProvider';

import BarChart from "./visuals/BarChart";
import PieChart from "./visuals/PieChart";
import ScatterPlot from "./visuals/ScatterPlot";

export default function Dashboard() {
    const { filteredPhones } = useSharedState(); // Access filtered phones

    console.log("Raw Data:", filteredPhones);
    const data = filteredPhones.map((phone) => ({
        model: phone.model,
        price: parseFloat(phone.price), // Ensure price is numeric
        brand: phone.brand.trim().charAt(0).toUpperCase() + phone.brand.trim().slice(1).toLowerCase(), // Normalize brand
    }));
    console.log("Normalized Data:", data);


    return (


        <>
            {/*<h2 className="font-bold mb-4">Dashboard</h2>*/}

            <div className={"flex flex-col gap-8 h-full w-full"}>
                <div className="flex flex-row gap-8 w-full h-1/2">
                    <div className={"bg-neutral-200 flex-1 flex justify-center items-center h-full w-1/2 px-8 py-1"}>
                        <BarChart/>
                    </div>
                    <div className={"bg-neutral-200 flex-1 flex justify-center items-center h-full w-1/2 px-8 py-1"}>
                        <PieChart/>
                    </div>
                </div>
                <div className={"bg-neutral-200 px-8 py-1 h-1/2"}>
                    <ScatterPlot/>
                </div>
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
