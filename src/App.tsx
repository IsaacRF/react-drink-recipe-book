import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
    return (
        <>
            <Header />

            <div className="container mt-5">
                <div className="row">
                    <SearchBar />
                </div>
            </div>
        </>
    );
}

export default App;
