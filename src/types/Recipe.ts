export interface Recipe {
    idDrink: number;
    isAlcoholic: boolean;
    strCategory: string;
    strDrink: string;
    strDrinkThumb: string;
    strGlass: string;
    strInstructions: string;
    ingredients: {
        name: string;
        measure: string;
    }[];
}