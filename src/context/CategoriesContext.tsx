import React, { createContext, useEffect, useState } from 'react';
import { Category } from '../types/Category';

export interface CategoriesProviderProps {

}

interface CategoriesContextState {
    categories: Category[],
    setCategories: (categories: Category[]) => void;
}

export const CategoriesContext = createContext<CategoriesContextState>({
    categories: [],
    setCategories: () => {}
});

const CategoriesProvider: React.FC<CategoriesProviderProps> = ({children}) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
            .then((response) => response.json())
            .then((categories) => setCategories(categories.drinks))
            .catch((error) => console.error(error));
    }, []);

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