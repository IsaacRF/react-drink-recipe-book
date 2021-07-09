import React from 'react';
import { useContext } from 'react';
import { DrinksContext } from '../../context/DrinksContext';
import DrinkCard from '../DrinkCard';
import Spinner from '../Spinner';

export interface DrinksListProps {}

const DrinksList: React.FC<DrinksListProps> = () => {
    const { drinks, isLoading } = useContext(DrinksContext);

    return (
        <>
            {isLoading && <Spinner />}

            {!isLoading && drinks.length > 0 && (
                <div className="row mt-5">
                    {drinks.map(drink => (
                        <DrinkCard key={drink.idDrink} drink={drink} />
                    ))}
                </div>
            )}
        </>
    );
};

export default DrinksList;
