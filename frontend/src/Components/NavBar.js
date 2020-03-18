import React from "react";
import {Link} from "react-router-dom";

import "./NavBar.css"

export default function NavBar(props) {
    return (
        <div className="nav-bar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Pokemonlist">Search</Link>
                </li>
                <li>
                    <Link to="/Card">Card</Link>
                </li>
                <li>
                    <Link to="/Testi">Testi</Link>
                </li>
                <li>
                    <Link to="/Pokedex">Pokedex</Link>
                </li>
            </ul>
        </div>
    );
} 