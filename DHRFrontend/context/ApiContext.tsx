"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import { USE_MOCK_API } from '../services/api/apiClient';

interface ApiContextType {
    isMockMode: boolean;
    apiUrl: string;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const value = {
        isMockMode: USE_MOCK_API,
        apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiContextType => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};
