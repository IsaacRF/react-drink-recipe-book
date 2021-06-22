import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoriesProvider from './context/CategoriesContext';

function App() {
    return (
        <CategoriesProvider>
            <Header />

            <div className="container mt-5">
                <div className="row">
                    <SearchBar />
                </div>
            </div>
        </CategoriesProvider>
    );
}

export default App;
