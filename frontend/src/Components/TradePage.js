import React, {useState, useEffectfrom, useEffect} from 'react';
import "./Home.css"
import oakdexPokedex from 'oakdex-pokedex';
import Pokedex from './Pokedex';
import TradeItem from './TradeItem'
//oakdexPokedex = require('oakdex-pokedex');




export default function(props) {
    
    const [trades, setTrades] = useState([]);
    const pokeDex = oakdexPokedex.allPokemon();

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/api/trades");
            res
                .json()
                .then(data => setTrades(data))
                .catch(err => console.log(err))
        }    
        fetchData();   
    }, []);

   // const darkPokemon = oakdexPokedex.allPokemon({type: 'Dark'});
   // console.log(darkPokemon.map(monni => monni.names.en));

    const tradeElements = trades.map(
        pokeData => {
          return <TradeItem 
            key={pokeData.id} 
            username={pokeData.username}
            pokemon={pokeData.pokemon.slice(0,1).toUpperCase() + pokeData.pokemon.slice(1, pokeData.pokemon.length)

            }
            
          >
          {pokeData.info}</TradeItem>
        }
    )

    return (
        <React.Fragment>
        <div>
          
        <div className = "trades">
            {tradeElements}
        </div>
        
        
        </div>

        <div>
       
        
        </div>
      
        </React.Fragment>
    );
}
