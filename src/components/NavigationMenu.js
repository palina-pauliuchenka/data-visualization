'use client';

import React from 'react';
import { useSharedState } from './SharedStateProvider';
import FileUpload from './FileUpload';

function NavigationMenu() {
    const {
        brands,
        checkedBrands,
        setCheckedBrands,
        allSelected,
        setAllSelected,
    } = useSharedState();

    const brandStyles = [
        'border-red-500 bg-red-100',
        'border-green-500 bg-green-100',
        'border-blue-500 bg-blue-100',
        'border-orange-500 bg-orange-100',
        'border-yellow-500 bg-yellow-100',
    ];

    // Handle "All Brands" click
    const handleAllBrandsClick = () => {
        setAllSelected(true);
        setCheckedBrands({}); // Deselect all individual brands
    };

    // Handle individual brand click
    const handleBrandClick = (brand) => {
        setAllSelected(false);
        setCheckedBrands((prev) => ({
            ...prev,
            [brand]: !prev[brand], // Toggle the checked state of the clicked brand
        }));
    };

    return (
        <nav className="flex items-center p-4 shadow-lg">
            <h2 className="flex-grow-0 whitespace-nowrap mr-4 font-bold">
                CS450 - Group 7
            </h2>
            <div className="flex items-center justify-between w-full">
                <ul className="flex flex-wrap">
                    <li className="mr-4 flex items-center">
                        <span
                            className={`cursor-pointer text-sm font-medium ${
                                allSelected
                                    ? 'border border-purple-500 bg-purple-100 rounded px-2'
                                    : 'text-black'
                            }`}
                            onClick={handleAllBrandsClick}
                        >
                            All Brands
                        </span>
                    </li>
                    {brands.length > 0 ? (
                        brands.slice(0, 5).map((brand, index) => (
                            <li className="mr-4 flex items-center" key={index}>
                                <span
                                    className={`cursor-pointer text-sm font-medium ${
                                        checkedBrands[brand]
                                            ? `${brandStyles[index]} border px-2 rounded`
                                            : 'text-black'
                                    }`}
                                    onClick={() => handleBrandClick(brand)}
                                >
                                    {brand.charAt(0).toUpperCase() +
                                        brand.slice(1)}
                                </span>
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
