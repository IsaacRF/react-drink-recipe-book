import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import useDebounce from '../hooks/useDebounce';
import { Recipe } from '../types/Recipe';
import { Search } from '../types/Search';

export interface RecipesProviderProps {
}

interface RecipesContextState {
    search: Search;
    setSearch: (search: Search) => void;
    recipes: Recipe[];
    isLoading: boolean;
}

export const RecipesContext = createContext<RecipesContextState>({
    search: {
        ingredient: '',
        category: ''
    },
    setSearch: () => {},
    recipes: [],
    isLoading: false
});

function getSearchUrl(search: Search) {
    const urlBase = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
    const params = [];
    if (search.ingredient) params.push(`i=${search.ingredient}`);
    if (search.category) params.push(`c=${search.category}`);

    return (urlBase + '?' + params.join('&'));
}

async function getDrinks(url: string): Promise<Recipe[]> {
    return fetch(url)
        .then((response) => response.json())
        .then((recipes) => recipes.drinks)
        .catch((error) => {
            console.error(error);
            return [];
        });
}

const RecipesProvider: React.FC<RecipesProviderProps> = ({children}) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<Search>({
        ingredient: '',
        category: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (search.category || search.ingredient) {
            const getRecipes = async () => {
                setIsLoading(true);
                getDrinks(getSearchUrl(search)).then(drinks => {
                    setRecipes(drinks);
                    setIsLoading(false);
                });
            };
            getRecipes();
        }
        else {
            setRecipes([]);
        }
    }, [debouncedSearch]);

    return (
        <RecipesContext.Provider
            value ={{
                search,
                setSearch,
                recipes,
                isLoading
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
};

export default RecipesProvider;