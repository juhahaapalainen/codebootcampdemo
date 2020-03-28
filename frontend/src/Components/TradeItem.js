import React from 'react';
import oakdexPokedex from 'oakdex-pokedex';
import "./TradeItem.css"
import PropTypes from 'prop-types'


export default function TradeItem(props) {
    //console.log("Moro pokemonista url: " +'../assets/img/pokemon_icons/pokemon_icon_' +props.id +'_00.png')
    //Pitää muuttaa eka kirjain isoka ja muut pieneks muuten menee särki :()
    if(props.pokemon != undefined && props.username != undefined) {
        console.log("Tradeitem props.pokemon: " +props.pokemon +" props.usenname: " +props.username)
        const pokemon = oakdexPokedex.findPokemon(props.pokemon);
        console.log("TradeItem pokemonnationalid: " +pokemon.national_id)
        //var poke_id2="";
        var poke_id = pokemon.national_id;
        //console.log("Tradeitemsistä:" +props)
        if(pokemon.national_id < 100 && pokemon.national_id >= 10) {
            poke_id = ('0' +poke_id).slice(-3);
            //console.log("Ol pienempi ku 100")
        }
        if (pokemon.national_id < 10) {

            poke_id = ('00' +poke_id).slice(-3);

        }
    }
    //console.log("Poke_id: " +poke_id);
    //console.log("Thisprops: " +props.event);

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
                <button class="btn" onClick={event => props.onDelete()}>X </button>
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

