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
    const [yearFilter, setYearFilter] = useState([2017, 2024]);
    const [priceFilter, setPriceFilter] = useState([0, 2500]);
    const [weightFilter, setWeightFilter] = useState([0, 630]);
    const [displayFilter, setDisplayFilter] = useState([4.5, 12.5]);
    const [batteryFilter, setBatteryFilter] = useState([0, 11000]);
    const [chipsetFilter, setChipsetFilter] = useState('All Chipsets');

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

        // Filter by price range
        if (priceFilter.length === 2) {
            const [minPrice, maxPrice] = priceFilter;
            filtered = filtered.filter((phone) => {
                const price = parseFloat(phone.price);
                return price >= minPrice && price <= maxPrice;
            });
        }

        // Filter by weight range
        if (weightFilter.length === 2) {
            const [minWeight, maxWeight] = weightFilter;
            filtered = filtered.filter((phone) => {
                const weight = parseFloat(phone.weight);
                return weight >= minWeight && weight <= maxWeight;
            });
        }

        // Filter by battery capacity
        if (batteryFilter.length === 2) {
            const [minBattery, maxBattery] = batteryFilter;
            filtered = filtered.filter((phone) => {
                const battery = parseInt(phone.battery);
                return battery >= minBattery && battery <= maxBattery;
            });
        }

        // Filter by chipset
        if (chipsetFilter !== 'All Chipsets') {
            filtered = filtered.filter((phone) => phone.chipset === chipsetFilter);
        }

        setFilteredPhones(filtered);
    }, [
        phones,
        checkedBrands,
        allSelected,
        foldableFilter,
        storageFilter,
        ramFilter,
        yearFilter,
        priceFilter,
        weightFilter,
        displayFilter,
        batteryFilter,
        chipsetFilter,
    ]);

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
                priceFilter,
                setPriceFilter,
                weightFilter,
                setWeightFilter,
                displayFilter,
                setDisplayFilter,
                batteryFilter,
                setBatteryFilter,
                chipsetFilter,
                setChipsetFilter,
            }}
        >
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => useContext(SharedStateContext);
