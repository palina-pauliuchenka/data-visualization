import React, { createContext, useContext, useState, useEffect } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
    const [brands, setBrands] = useState([]);
    const [columns, setColumns] = useState([]);
    const [phones, setPhones] = useState([]);
    const [checkedBrands, setCheckedBrands] = useState({});
    const [allSelected, setAllSelected] = useState(true);
    const [filteredPhones, setFilteredPhones] = useState([]);
    const [foldableFilter, setFoldableFilter] = useState('Default'); // New state for foldability filter

    // Update filtered phones based on selected filters
    useEffect(() => {
        console.log('Foldable Filter:', foldableFilter); // Debugging log
        console.log('Checked Brands:', checkedBrands); // Debugging log

        let filtered = phones;

        // Filter by brand
        if (!allSelected && Object.keys(checkedBrands).length > 0) {
            filtered = filtered.filter((phone) => checkedBrands[phone.brand]);
        }

        // Filter by foldability
        if (foldableFilter === 'Yes') {
            filtered = filtered.filter((phone) => phone.foldable === '1'); // Ensure foldable is a string
        } else if (foldableFilter === 'No') {
            filtered = filtered.filter((phone) => phone.foldable === '0'); // Ensure foldable is a string
        }

        console.log('Filtered Phones:', filtered); // Debugging log
        setFilteredPhones(filtered);
    }, [phones, checkedBrands, allSelected, foldableFilter]);

    return (
        <SharedStateContext.Provider
            value={{
                brands,
                setBrands,
                columns,
                setColumns,
                phones,
                setPhones,
                checkedBrands,
                setCheckedBrands,
                allSelected,
                setAllSelected,
                filteredPhones,
                foldableFilter,
                setFoldableFilter,
            }}
        >
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => useContext(SharedStateContext);
