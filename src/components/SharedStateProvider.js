import React, { createContext, useContext, useState } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
    const [brands, setBrands] = useState([]);
    const [columns, setColumns] = useState([]);
    const [phones, setPhones] = useState([]);

    return (
        <SharedStateContext.Provider value={{ brands, setBrands, columns, setColumns, phones, setPhones }}>
            {children}
        </SharedStateContext.Provider>
    );

};

export const useSharedState = () => useContext(SharedStateContext);
