import React from 'react';

import FileUpload from "./FileUpload";

function NavigationMenu({ brands = [] }) {  // Default value for brands
    return (
        <>
            <nav className={"flex items-center justify-between p-4 shadow-lg"}>
                <h2 className={""}>CS450 - Group 7</h2>

                <div className={"flex items-center justify-between w-full"}>
                    <ul>
                        {brands.length > 0 ? (
                            brands.map((brand, index) => <li key={index}>{brand}</li>)
                        ) : (
                            <li></li>
                        )}
                    </ul>

                    <FileUpload/>
                </div>
            </nav>
        </>
    );
}

export default NavigationMenu;
