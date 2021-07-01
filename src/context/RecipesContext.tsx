import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { Recipe } from '../types/Recipe';
import { Search } from '../types/Search';

export interface RecipesProviderProps {
}

interface RecipesContextState {
    search: Search;
    setSearch: (search: Search) => void;
    isLoading: boolean;
}

export const RecipesContext = createContext<RecipesContextState>({
    search: {
        ingredient: '',
        category: ''
    },
    setSearch: () => {},
    isLoading: false
});

function getSearchUrl(search: Search) {
    const urlBase = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
    const params = [];
    if (search.ingredient) params.push(`i=${search.ingredient}`);
    if (search.category) params.push(`c=${search.category}`);

    return (urlBase + '?' + params.join('&'));
}

const RecipesProvider: React.FC<RecipesProviderProps> = ({children}) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<Search>({
        ingredient: '',
        category: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (search.category || search.ingredient) {
            const getRecipes = async () => {
                setIsLoading(true);

                fetch(getSearchUrl(search))
                    .then((response) => response.json())
                    .then((recipes) => {
                        setRecipes(recipes.drinks);
                        setIsLoading(false);
                    })
                    .catch((error) => console.error(error));
            };
            getRecipes();
        }
        else {
            setRecipes([]);
        }
    }, [search]);

    return (
        <RecipesContext.Provider
            value ={{
                search,
                setSearch,
                isLoading
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
};

export default RecipesProvider;