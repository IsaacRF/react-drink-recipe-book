import React from 'react';
import './styles.scss';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => (
    <header>
        <h1>🍸 The Drink Recipebook</h1>
    </header>
);

export default Header;