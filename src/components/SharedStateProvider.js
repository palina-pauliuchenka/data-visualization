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
    const [storageFilter, setStorageFilter] = useState(0); // New state for storage

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

        setFilteredPhones(filtered);
    }, [phones, checkedBrands, allSelected, foldableFilter, storageFilter]);

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
            }}
        >
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => useContext(SharedStateContext);
