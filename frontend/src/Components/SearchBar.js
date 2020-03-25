import React, { PropTypes, useState } from 'react';


const SearchBar = ( {addSearchTerm}) => {
    const [searchTerm, setSearchTerm] = useState('');
    console.log("Searchterm: " +searchTerm)
    addSearchTerm(searchTerm);
        return (
            <form>
            <label>Search</label>
            <input type ="text" value={searchTerm} onChange={ e => setSearchTerm(e.target.value) } />
            </form>
        );
}        



export default SearchBar;