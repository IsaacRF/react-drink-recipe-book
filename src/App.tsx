import React from 'react';
import Header from './components/Header';
import RecipesList from './components/RecipesList';
import SearchBar from './components/SearchBar';
import CategoriesProvider from './context/CategoriesContext';
import RecipesProvider from './context/RecipesContext';

function App() {
    return (
        <CategoriesProvider>
            <RecipesProvider>
                <Header />

                <div className="container mt-5">
                    <div className="row">
                        <SearchBar />
                    </div>

                    <RecipesList></RecipesList>
                </div>
            </RecipesProvider>
        </CategoriesProvider>
    );
}

export default App;
