import React from 'react';
import oakdexPokedex from 'oakdex-pokedex';
import "./TradeItem.css"

export default function(props) {
    //console.log("Moro pokemonista url: " +'../assets/img/pokemon_icons/pokemon_icon_' +props.id +'_00.png')
    //Pitää muuttaa eka kirjain isoka ja muut pieneks muuten menee särki :()
    console.log("Tradeitem props.pokemon: " +props.pokemon)
    const pokemon = oakdexPokedex.findPokemon(props.pokemon);
    console.log("TradeItem pokemon: " +pokemon.national_id)
    
    return (
        <div className={`pokemon card`} >
            <img className="card-img" 
            src= {'/img/pokemon_icons/pokemon_icon_' +pokemon.national_id +'_00.png'}
            alt=''
            onError={ (e) => {e.target.onerror=null; e.target.src='/img/pokemon_icons/pokemon_icon_000.png'}}
            ></img>
            <li>{props.pokemon}</li>
            <li>{props.username}</li>
            
            </div>
    );
}

