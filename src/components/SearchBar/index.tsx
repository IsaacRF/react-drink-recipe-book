import React from 'react';
import './styles.scss';

export interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => (
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

export default SearchBar;