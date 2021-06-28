import React, { useContext } from 'react';
import { CategoriesContext } from '../../context/CategoriesContext';
import './styles.scss';

export interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
    const { categories } = useContext(CategoriesContext);
    console.log(categories);

    return (
        <form className="col-12">
            <fieldset className="text-center">
                <legend>Busca bebidas por Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="search"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por ingrediente" />
                </div>

                <div className="col-md-4">
                    <select
                        name="category"
                        className="form-control">

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