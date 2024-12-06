import React, { createContext, useContext, useState } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
    const [brands, setBrands] = useState([]);
    const [columns, setColumns] = useState([]);

    return (
        <SharedStateContext.Provider value={{ brands, setBrands, columns, setColumns }}>
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => useContext(SharedStateContext);
