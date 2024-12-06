import React, { useState } from 'react';
import FileUpload from './FileUpload';

function NavigationMenu({ brands = [] }) { // Default value for brands
    const [brandList, setBrandList] = useState(brands);

    return (
        <>
            <nav className={"flex items-center p-4 shadow-lg"}>
                <h2 className={"flex-grow-0 whitespace-nowrap mr-4"}>CS450 - Group 7</h2>

                <div className={"flex items-center justify-between w-full"}>
                    <ul>
                        {brandList.length > 0 ? (
                            brandList.map((brand, index) => (
                                <li className={"inline mr-3"} key={index}>
                                    {brand}
                                </li>
                            ))
                        ) : (
                            <li>No brands available</li>
                        )}
                    </ul>

                    {/* Pass setBrandList as a prop */}
                    <FileUpload setBrands={setBrandList}/>
                </div>
            </nav>

        </>
    );
}

export default NavigationMenu;
