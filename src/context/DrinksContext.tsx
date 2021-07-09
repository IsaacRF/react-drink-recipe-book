import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import useDebounce from '../hooks/useDebounce';
import { Drink } from '../types/Drink';
import { Search } from '../types/Search';

export interface DrinksProviderProps {
}

interface DrinksContextState {
    search: Search;
    setSearch: (search: Search) => void;
    drinks: Drink[];
    isLoading: boolean;
}

export const DrinksContext = createContext<DrinksContextState>({
    search: {
        ingredient: '',
        category: ''
    },
    setSearch: () => {},
    drinks: [],
    isLoading: false
});

function getSearchUrl(search: Search) {
    const urlBase = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
    const params = [];
    if (search.ingredient) params.push(`i=${search.ingredient}`);
    if (search.category) params.push(`c=${search.category}`);

    return (urlBase + '?' + params.join('&'));
}

async function fetchDrinks(url: string): Promise<Drink[]> {
    return fetch(url)
        .then((response) => response.json())
        .then((drinks) => drinks.drinks)
        .catch((error) => {
            console.error(error);
            return [];
        });
}

const DrinksProvider: React.FC<DrinksProviderProps> = ({children}) => {
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [search, setSearch] = useState<Search>({
        ingredient: '',
        category: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (search.category || search.ingredient) {
            setIsLoading(true);
            fetchDrinks(getSearchUrl(search)).then(drinks => {
                setDrinks(drinks);
                setIsLoading(false);
            });
        }
        else {
            setDrinks([]);
        }
    }, [debouncedSearch]);

    return (
        <DrinksContext.Provider
            value ={{
                search,
                setSearch,
                drinks: drinks,
                isLoading
            }}
        >
            {children}
        </DrinksContext.Provider>
    );
};

export default DrinksProvider;