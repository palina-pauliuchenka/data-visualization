import React from 'react';
import { useSharedState } from './SharedStateProvider';
import FileUpload from "./FileUpload";

function NavigationMenu() {
    const { brands } = useSharedState();

    return (
        <nav className="flex items-center p-4 shadow-lg">
            <h2 className={"flex-grow-0 whitespace-nowrap mr-4 font-bold"}>CS450 - Group 7</h2>
            <div className="flex items-center justify-between w-full">
                <ul>
                    {brands.length > 0 ? (
                        brands.map((brand, index) => (
                            <li className="inline mr-2" key={index}>
                                {brand}
                            </li>
                        ))
                    ) : (
                        <li>No brands available</li>
                    )}
                </ul>

                <FileUpload />
            </div>
        </nav>
    );
}

export default NavigationMenu;



// import React, { useState } from 'react';
// import FileUpload from './FileUpload';
//
// function NavigationMenu({ brands = [] }) {
//     const [brandList, setBrandList] = useState(brands);
//
//     return (
//         <>
//             <nav className={"flex items-center p-4 shadow-lg"}>
//                 <h2 className={"flex-grow-0 whitespace-nowrap mr-4 font-bold"}>CS450 - Group 7</h2>
//
//                 <div className={"flex items-center justify-between w-full"}>
//                     <ul>
//                         {brandList.length > 0 ? (
//                             brandList.map((brand, index) => (
//                                 <li className={"inline mr-3"} key={index}>
//                                     {brand}
//                                 </li>
//                             ))
//                         ) : (
//                             <li className={"text-red-500 italic"}>No brands available. Please upload the file or ensure file structure is correct.</li>
//                         )}
//                     </ul>
//
//                     <FileUpload setBrands={setBrandList}/>
//                 </div>
//             </nav>
//
//         </>
//     );
// }
//
// export default NavigationMenu;
