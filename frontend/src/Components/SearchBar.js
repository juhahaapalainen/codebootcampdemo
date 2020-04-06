import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = ( {addSearchTerm}) => {
    //const [searchTerm, setSearchTerm] = useState('');
    //console.log("Searchterm: " +searchTerm)
    //addSearchTerm(searchTerm);

        return (
          
            
            <input label="Search" className="searchbar" 
            type ="text" 
            placeholder="Search..." 
            onChange={ e => addSearchTerm(e.target.value) } />
            
        );
}        



export default SearchBar;