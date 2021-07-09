import React, { ChangeEvent, useContext } from 'react';
import { CategoriesContext } from '../../context/CategoriesContext';
import './styles.scss';
import { DrinksContext } from '../../context/DrinksContext';

export interface SearchBarProps {}

/**
 * Search drinks component with multiple search fields
 * @returns <form>
 */
const SearchBar: React.FC<SearchBarProps> = () => {
    const { categories } = useContext(CategoriesContext);
    const { search, setSearch } = useContext(DrinksContext);

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
                <div className="col-md-5">
                    <input
                        name="ingredient"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por ingrediente"
                        onChange={onSearchChange} />
                </div>

                <div className="col-md-5">
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
            </div>
        </form>
    );
};

export default SearchBar;