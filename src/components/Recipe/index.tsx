import React from 'react';
import { Recipe } from '../../types/Recipe';
import './styles.scss';

export interface RecipeCompProps {
    recipe: Recipe;
}

const RecipeComp: React.FC<RecipeCompProps> = ({recipe}) => {
    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{recipe.strDrink}</h2>
                <img className="card-img-top" src={recipe.strDrinkThumb} alt={`${recipe.strDrink} image`} />
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block">
                            View Recipe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeComp;