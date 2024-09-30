import React from 'react';


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <ul className="nav-links">
                    <li><a href="/home">Hem</a></li>
                    <li><a href="/create">Skapa dokument</a></li>


                </ul>
            </div>
        </nav>
    );
};

export default Navbar;