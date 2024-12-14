import React, { createContext, useContext, useState, useEffect } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
    const [brands, setBrands] = useState([]);
    const [columns, setColumns] = useState([]);
    const [phones, setPhones] = useState([]);
    const [checkedBrands, setCheckedBrands] = useState({});
    const [allSelected, setAllSelected] = useState(true);
    const [filteredPhones, setFilteredPhones] = useState([]);
    const [foldableFilter, setFoldableFilter] = useState('Default');
    const [storageFilter, setStorageFilter] = useState(0);
    const [ramFilter, setRamFilter] = useState(0);
    const [yearFilter, setYearFilter] = useState([2017, 2024]); // New state for year range

    // Update filtered phones based on selected filters
    useEffect(() => {
        let filtered = phones;

        // Filter by brand
        if (!allSelected && Object.keys(checkedBrands).length > 0) {
            filtered = filtered.filter((phone) => checkedBrands[phone.brand]);
        }

        // Filter by foldability
        if (foldableFilter === 'Yes') {
            filtered = filtered.filter((phone) => phone.foldable === '1');
        } else if (foldableFilter === 'No') {
            filtered = filtered.filter((phone) => phone.foldable === '0');
        }

        // Filter by storage
        if (storageFilter > 0) {
            filtered = filtered.filter((phone) => parseInt(phone.storage) === storageFilter);
        }

        // Filter by RAM
        if (ramFilter > 0) {
            filtered = filtered.filter((phone) => parseInt(phone.ram) === ramFilter);
        }

        // Filter by year range
        if (yearFilter.length === 2) {
            const [minYear, maxYear] = yearFilter;
            filtered = filtered.filter((phone) => {
                const year = parseInt(phone.year);
                return year >= minYear && year <= maxYear;
            });
        }

        setFilteredPhones(filtered);
    }, [phones, checkedBrands, allSelected, foldableFilter, storageFilter, ramFilter, yearFilter]);

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
                storageFilter,
                setStorageFilter,
                ramFilter,
                setRamFilter,
                yearFilter,
                setYearFilter,
            }}
        >
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => useContext(SharedStateContext);
