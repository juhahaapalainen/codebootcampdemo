import React, {useState, useEffectfrom, useEffect} from 'react';
import Pokemon from './Pokemon'
import SearchPokemon from './SearchPokemon';
import "./Pokemonlist.css"


export default function(props) {
    const [tradeList, setTradeList] = useState([]);
    

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/api/pokemons");
            res
                .json()
                .then(data => settradeList(data))
                .catch(err => console.log(err))
        }    
        fetchData();   
    }, []);



    const tradeElements = tradeList.map(
        tradeData => {
          return <Pokemon 
            key={tradeData.id} 
            type={tradeData.pokemon}
            onDelete = {() => onDelete(tradeData.id)}
          >
          {tradeData.user}</Pokemon>
        }
    )

  
    const onDelete = (id) => {
        fetch(`/api/pokemons/${id}`, {
            method: "DELETE"
        })
        
        .then(() =>
            setTradeList(tradeList.filter(trade => trade.id !== id))
        );
    }

   

    
    
    console.log(tradeElements);
    
    return (
        <React.Fragment>
        <div>
            <SearchPokemon/>
        <div className = "pokemons">
            {tradeElements}
        </div>
        
        
        </div>

        <div>
        {tradeList.filter(pokemon => pokemon.pokemon.includes('Torkoal')).map(trade => (
        <li>
            {trade.user} {trade.pokemon}
        </li>
         ))}
        </div>
      
        </React.Fragment>
    );
}