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
                    ingredients: []
                };

                for (let i = 1; i <= 15; i++) {
                    const ingredient: string = drinks.drinks[0][`strIngredient${i}`];
                    const measure: string = drinks.drinks[0][`strMeasure${i}`];

                    if (ingredient != null) {
                        recipe.ingredients.push({
                            name: ingredient,
                            measure: measure
                        });
                    }
                }

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
                                <h2>
                                    {recipe?.strCategory}
                                    {recipe?.isAlcoholic ? '💧' : '🚫'}
                                </h2>
                                <h3>Ingredients</h3>
                                <ul>
                                    { recipe?.ingredients.map((ingredient) => (
                                        <li key={ingredient.name}>{ingredient.name} - {ingredient.measure}</li>
                                    ))}
                                </ul>
                                <h3>Recipe</h3>
                                <p>{recipe?.strInstructions}</p>
                                <img className="card-img-top" src={recipe?.strDrinkThumb} alt={`${recipe?.strDrink} image`} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrinkCard;