import React, { ChangeEvent, useContext, useState } from 'react';
import { CategoriesContext } from '../../context/CategoriesContext';
import './styles.scss';
import { Search } from '../../types/Search';
import { RecipesContext } from '../../context/RecipesContext';

export interface SearchBarProps {}

/**
 * Search drinks component with multiple search fields
 * @returns <form>
 */
const SearchBar: React.FC<SearchBarProps> = () => {
    const { categories } = useContext(CategoriesContext);
    const { search, setSearch } = useContext(RecipesContext);

    function onSearchChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form className="col-12">
            <fieldset className="text-center">
                <legend>Busca bebidas por Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="ingredient"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por ingrediente"
                        onChange={onSearchChange} />
                </div>

                <div className="col-md-4">
                    <select
                        name="category"
                        className="form-control"
                        onChange={onSearchChange}>

                        <option value="">-- Seleccionar categoría --</option>
                        {categories.map(category => (
                            <option
                                key={category.strCategory}
                                value={category.strCategory}>

                                {category.strCategory}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block"
                        value="Buscar bebidas" />
                </div>
            </div>
        </form>
    );
};

export default SearchBar;