import React, { PropTypes, useState } from 'react';
import './SearchBar.css'

const SearchBar = ( {addSearchTerm}) => {
    const [searchTerm, setSearchTerm] = useState('');
    console.log("Searchterm: " +searchTerm)
    addSearchTerm(searchTerm);
        return (
            <form>
            
            <input label="Search" class="searchbar" type ="text" placeholder="Search..." value={searchTerm} onChange={ e => setSearchTerm(e.target.value) } />
            </form>
        );
}        



export default SearchBar;