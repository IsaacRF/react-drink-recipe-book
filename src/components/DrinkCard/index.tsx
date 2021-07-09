import React, { useState } from 'react';
import { Drink } from '../../types/Drink';
import './styles.scss';
import Spinner from '../Spinner';
import { useEffect } from 'react';
import { Recipe } from '../../types/Recipe';

export interface DrinkCompProps {
    drink: Drink;
}

const DrinkCard: React.FC<DrinkCompProps> = ({drink}) => {
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`;

    const [isSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recipe, setRecipe] = useState<Recipe>();

    function toggleSelected() {
        setIsSelected(!isSelected);
    }

    function fetchRecipe() {
        return fetch(apiUrl)
            .then((response) => response.json())
            .then((drinks) => {
                const recipe: Recipe = {
                    idDrink: drinks.drinks[0].idDrink,
                    isAlcoholic: drinks.drinks[0].strAlcoholic === 'Alcoholic',
                    strCategory: drinks.drinks[0].strCategory,
                    strDrink: drinks.drinks[0].strDrink,
                    strDrinkThumb: drinks.drinks[0].strDrinkThumb,
                    strGlass: drinks.drinks[0].strGlass,
                    strInstructions: drinks.drinks[0].strInstructions,
                    ingredients: [
                        drinks.drinks[0].strIngredient1,
                        drinks.drinks[0].strIngredient2,
                        drinks.drinks[0].strIngredient3,
                        drinks.drinks[0].strIngredient4,
                        drinks.drinks[0].strIngredient5,
                        drinks.drinks[0].strIngredient6,
                        drinks.drinks[0].strIngredient7,
                        drinks.drinks[0].strIngredient8,
                        drinks.drinks[0].strIngredient9,
                        drinks.drinks[0].strIngredient10,
                        drinks.drinks[0].strIngredient11,
                        drinks.drinks[0].strIngredient12,
                        drinks.drinks[0].strIngredient13,
                        drinks.drinks[0].strIngredient14,
                        drinks.drinks[0].strIngredient15,
                    ],
                    measures: [
                        drinks.drinks[0].strMeasure1,
                        drinks.drinks[0].strMeasure2,
                        drinks.drinks[0].strMeasure3,
                        drinks.drinks[0].strMeasure4,
                        drinks.drinks[0].strMeasure5,
                        drinks.drinks[0].strMeasure6,
                        drinks.drinks[0].strMeasure7,
                        drinks.drinks[0].strMeasure8,
                        drinks.drinks[0].strMeasure9,
                        drinks.drinks[0].strMeasure10,
                        drinks.drinks[0].strMeasure11,
                        drinks.drinks[0].strMeasure12,
                        drinks.drinks[0].strMeasure13,
                        drinks.drinks[0].strMeasure14,
                        drinks.drinks[0].strMeasure15,
                    ]
                };
                return recipe;
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    // Load details when card is selected
    useEffect(() => {
        if (isSelected && !recipe) {
            setIsLoading(true);
            fetchRecipe().then(recipe => {
                setIsLoading(false);
                setRecipe(recipe);
                console.log(recipe);
            });
        }
    }, [isSelected]);

    return (
        <div className={`card-background ${isSelected ? 'active' : 'col-md-4 mb-3'}`} onClick={() => toggleSelected()}>
            <div className={ `card-container ${isSelected ? 'selected' : ''}` } >
                <div className="card">
                    <div className="card-front">
                        <h2 className="card-header">{drink.strDrink}</h2>
                        <img className="card-img-top" src={drink.strDrinkThumb} alt={`${drink.strDrink} image`} />
                        <div className="card-body"></div>
                    </div>
                    <div className="card-back">
                        {(isSelected && isLoading) ? (
                            <Spinner />
                        ) : (
                            <>
                                <h1>{recipe?.strDrink}</h1>
                                <p>{recipe?.strCategory}</p>
                                <p>{recipe?.isAlcoholic ? '💧' : '🚫'}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrinkCard;