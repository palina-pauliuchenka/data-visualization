import React, { createContext, useContext, useState, useEffect } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
    const [brands, setBrands] = useState([]);
    const [columns, setColumns] = useState([]);
    const [phones, setPhones] = useState([]);
    const [checkedBrands, setCheckedBrands] = useState({});
    const [allSelected, setAllSelected] = useState(true);
    const [filteredPhones, setFilteredPhones] = useState([]);

    // Update filtered phones based on selected brands
    useEffect(() => {
        if (allSelected || Object.keys(checkedBrands).length === 0) {
            setFilteredPhones(phones); // Show all phones
        } else {
            setFilteredPhones(
                phones.filter((phone) => checkedBrands[phone.brand])
            );
        }
    }, [phones, checkedBrands, allSelected]);

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
            }}
        >
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => useContext(SharedStateContext);
