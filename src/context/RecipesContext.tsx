import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { Recipe } from '../types/Recipe';
import { Search } from '../types/Search';

export interface RecipesProviderProps {
}

interface RecipesContextState {
    search: Search,
    setSearch: (search: Search) => void;
}

export const RecipesContext = createContext<RecipesContextState>({
    search: {
        ingredient: '',
        category: ''
    },
    setSearch: () => {}
});

const RecipesProvider: React.FC<RecipesProviderProps> = ({children}) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<Search>({
        ingredient: '',
        category: ''
    });

    return (
        <RecipesContext.Provider
            value ={{
                search,
                setSearch
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
}

export default RecipesProvider;