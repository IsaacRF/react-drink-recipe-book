import React, { createContext, useState } from 'react';

export interface CategoriesProviderProps {

}

interface CategoriesContextState {
    categories: string[],
    setCategories: (categories: string[]) => void;
}

export const CategoriesContext = createContext<CategoriesContextState>({
    categories: [],
    setCategories: () => {}
});

const CategoriesProvider: React.FC<CategoriesProviderProps> = ({children}) => {
    const [categories, setCategories] = useState<string[]>([]);

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                setCategories
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;