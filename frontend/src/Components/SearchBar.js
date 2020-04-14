import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ addSearchTerm }) => {

    return (


        <input label="Search" className="searchbar"
            type="text"
            placeholder="Search..."
            onChange={e => addSearchTerm(e.target.value)} />

    );
}

export default SearchBar;