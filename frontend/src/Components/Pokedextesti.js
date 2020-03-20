import React from 'react';
import "./Home.css"
import oakdexPokedex from 'oakdex-pokedex';
import Pokedex from './Pokedex';
import Pokemon from './Pokemon'
//oakdexPokedex = require('oakdex-pokedex');




export default function(props) {
    
    const darkPokemon = oakdexPokedex.allPokemon({type: 'Dark'});
   // console.log(darkPokemon.map(monni => monni.names.en));

    const pokemonElements = darkPokemon.map(
        pokeData => {
          return <Pokemon 
            key={pokeData.national_id} 
            id={pokeData.national_id}
            type={pokeData.names.en}
            
          >
          {pokeData.types}</Pokemon>
        }
    )

    return (
        <React.Fragment>
        <div>
          
        <div className = "trades">
            {pokemonElements}
        </div>
        
        
        </div>

        <div>
       
        
        </div>
      
        </React.Fragment>
    );
}
