import React from 'react';
import { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';
import RecipeComp from '../Recipe';

export interface RecipesListProps {}

const RecipesList: React.FC<RecipesListProps> = () => {
    const { recipes } = useContext(RecipesContext);

    return (
        <>
            {recipes.length > 0 && (
                <div className="row mt-5">
                    {recipes.map(recipe => (
                        <RecipeComp key={recipe.idDrink} recipe={recipe} />
                    ))}
                </div>
            )}
        </>
    );
};

export default RecipesList;
