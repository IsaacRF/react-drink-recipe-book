import React from 'react';
import Header from './components/Header';
import DrinksList from './components/DrinksList';
import SearchBar from './components/SearchBar';
import CategoriesProvider from './context/CategoriesContext';
import DrinksProvider from './context/DrinksContext';

function App() {
    return (
        <CategoriesProvider>
            <DrinksProvider>
                <Header />

                <div className="container mt-5">
                    <div className="row">
                        <SearchBar />
                    </div>

                    <DrinksList></DrinksList>
                </div>
            </DrinksProvider>
        </CategoriesProvider>
    );
}

export default App;
