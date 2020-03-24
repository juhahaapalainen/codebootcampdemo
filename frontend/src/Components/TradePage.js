import React, {useState, useEffectfrom, useEffect} from 'react';
import "./Home.css"
import oakdexPokedex from 'oakdex-pokedex';
import Pokedex from './Pokedex';
import TradeItem from './TradeItem'
import AddTrade from './AddTrade'
//oakdexPokedex = require('oakdex-pokedex');




export default function TradePage(props) {
    
    const [trades, setTrades] = useState([]);
  const pokeDex = oakdexPokedex.allPokemon();
    const [filterTrades, setFilterTrades] = useState(trades);
    const [search, setSearch] = useState("");

    
    
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

    useEffect(() =>{
        const results = trades.filter(poke => poke.pokemon.toLowerCase().includes(search))
        console.log("REsults " +results)
        setFilterTrades(results)
    },[])
    
    

    const onChange = e => {

       
       
        let oldList = trades.map(pokemon =>{
            return {id: pokemon.id, username: pokemon.username, pokemon: pokemon.pokemon.toLowerCase}
        })
        if(search !== ""){
                console.log("Trads.pokem: " +trades.map(trade => trade.pokemon))
           let newList = [];
           newList=oldList.pokemon.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            //newList=oldList.filter(pokemon => trades.pokemon.includes(search.toLowerCase()))
            //setFilterTrades(trades.filter(pokemon => trades.pokemon.includes(search.toLowerCase())))
        }else {
            setFilterTrades(trades)
        }
       
        console.log("onchange")
           

    }
    const handleSearchInputChanges = (e) =>{

        setSearch(e);
        
        console.log("Handesta: " +trades.map(pokemon => trades.pokemon));
        const tempFilter = trades.filter(pokemon => {
            return pokemon.pokemon.toLowerCase().indexOf(e.toLowerCase()) !== -1;
        });
        setTrades(tempFilter);
        console.log("Word: " +e +"Seartsri: "+search)
    }

    const onDelete = (id) => {
        fetch(`/api/trades/${id}`, {
            method: "DELETE"
        })
        .then(() =>
            setTrades(trades.filter(trade => trade.id !== id))
        );
    }

   // const darkPokemon = oakdexPokedex.allPokemon({type: 'Dark'});
   // console.log(darkPokemon.map(monni => monni.names.en));

    const tradeElements = trades.map(
        pokeData => {
          return <TradeItem 
            key={pokeData.id} 
            username={pokeData.username}
            pokemon={pokeData.pokemon.slice(0,1).toUpperCase() + pokeData.pokemon.slice(1, pokeData.pokemon.length)}
            onDelete = {() => onDelete(pokeData.id)}
            
          >
          {pokeData.info}</TradeItem>
        }
    )
    console.log(tradeElements)
   
    return (
        <React.Fragment>
        <div>
        <AddTrade onTradeAdded={(newTrade) => setTrades([...trades, newTrade])} />
          <div>
          <input
                  label="Search trade"
                  icon="search"
                  value={search}
                  onChange={e => handleSearchInputChanges(e.target.value)}
                  type="text"
                />
            
            <button onClick={()=>{
                window.location.href='./Home';
            }}> +</button>
          </div>
        <div className = "trades">
            {tradeElements}
        </div>
        
        
        </div>

        <div>
       
        
        </div>
      
        </React.Fragment>
    );
}
