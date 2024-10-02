import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <ul className="nav-links">
                    <li><Link to="/home">Hem</Link></li>
                    <li><Link to="/create">Skapa dokument</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;