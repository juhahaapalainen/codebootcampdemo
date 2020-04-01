import React from 'react';
import oakdexPokedex from 'oakdex-pokedex';
import "./TradeItem.css"
import PropTypes from 'prop-types'


export default function TradeItem(props) {
   
    if(props.pokemon !== undefined && props.username !== undefined) {

        const pokemon = oakdexPokedex.findPokemon(props.pokemon);
       
        if(pokemon !== null ) {

            var poke_id = pokemon.national_id;
            
            if(pokemon.national_id < 100 && pokemon.national_id >= 10) {
                poke_id = ('0' +poke_id).slice(-3);
            }
            if (pokemon.national_id < 10) {

                poke_id = ('00' +poke_id).slice(-3);
            }
        }
        else {
            poke_id = '000'
        }
    }
 

    return (
        <React.Fragment>
        <div className={`tradeItem`} >
        <ul>
            <li>
                <div className="img-container">
                <img className="card-img" 
                src= {'/img/pokemon_icons/pokemon_icon_' +poke_id +'_00.png'}
                alt=''
                onError={ (e) => {e.target.onerror=null; e.target.src='/img/pokemon_icons/pokemon_icon_000.png'}}
                >

                </img>
                <button className="btn" onClick={event => props.onDelete()}>X </button>
                </div>
            </li>
            <li>{props.pokemon}</li>
            
            <li>{props.info}</li>
            <li>
             
            </li>
            </ul>
        </div>
        </React.Fragment>
    );
}

TradeItem.propTypes = {
    username: PropTypes.string.isRequired,
    pokemon: PropTypes.string,
    info: PropTypes.string,
    onDelete: PropTypes.func,

}

