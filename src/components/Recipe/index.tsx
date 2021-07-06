import React, { useState } from 'react';
import { Recipe } from '../../types/Recipe';
import './styles.scss';

export interface RecipeCompProps {
    recipe: Recipe;
}

const RecipeComp: React.FC<RecipeCompProps> = ({recipe}) => {
    const [selected, setSelected] = useState(false);

    function toggleSelected() {
        setSelected(!selected);
    }

    return (
        <div className={`card-background ${selected ? 'active' : 'col-md-4 mb-3'}`} onClick={() => toggleSelected()}>
            <div className={ `card-container ${selected ? 'selected' : ''}` } >
                <div className="card">
                    <div className="card-front">
                        <h2 className="card-header">{recipe.strDrink}</h2>
                        <img className="card-img-top" src={recipe.strDrinkThumb} alt={`${recipe.strDrink} image`} />
                        <div className="card-body"></div>
                    </div>
                    <div className="card-back">
                        <h1>{recipe.strDrink}</h1>
                        <p>Lorem ipsum</p>
                        <p>Dolor sit amet</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeComp;