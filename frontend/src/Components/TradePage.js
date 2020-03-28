import React, {useState, useEffectfrom, useEffect} from 'react';
import "./Home.css"
import oakdexPokedex from 'oakdex-pokedex';
import Pokedex from './Pokedex';
import TradeItem from './TradeItem'
import AddTrade from './AddTrade'
import './TradePage.css'
import SearchBar from './SearchBar' 
//oakdexPokedex = require('oakdex-pokedex');




export default function TradePage(props) {
    
    const [trades, setTrades] = useState([]);
    const pokeDex = oakdexPokedex.allPokemon();
    const [filterTrades, setFilterTrades] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if(search != '') {
         const tempTrades = (trades.filter(trade => trade.pokemon.toLowerCase().indexOf(search.toLowerCase()) !== -1))
         setFilterTrades(tempTrades)
         }
         else {
             setFilterTrades(trades)
         }
 
    }, [search])
    
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

  
   
    
    

  /*  const onChange = e => {

       
       
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
           

    }*/
/*    const handleSearchInputChanges = (e) =>{

        setSearch(e);
        
        console.log("Handesta: " +trades.map(pokemon => trades.pokemon));
        const tempFilter = trades.filter(pokemon => {
            return pokemon.pokemon.toLowerCase().indexOf(e.toLowerCase()) !== -1;
        });
        setTrades(tempFilter);
        console.log("Word: " +e +"Seartsri: "+search)
    }*/

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
  //  console.log(filterTrades.map(pokeData => pokeData.username))
    //console.log(filterTrades.map(pokeData => pokeData.pokemon))

    
    const tradeElements = trades
    .sort((a,b) => a.username.localeCompare(b.username))
    .map(
        pokeData => {
          return <TradeItem 
            key={pokeData.id} 
            username={pokeData.username}
            pokemon={pokeData.pokemon}
            onDelete = {() => onDelete(pokeData.id)}
            
          >
          {pokeData.info}</TradeItem>
        }
    )

    const filteredTradeElements = trades
    //.filter(suodatin => suodatin.username.includes(user))
    .filter(hakuSuodatin => hakuSuodatin.pokemon.toLowerCase().includes(search.toLowerCase()))
    .map(
        pokeData => {
          return <TradeItem 
            key={pokeData.id} 
            username={pokeData.username}
            pokemon={pokeData.pokemon}
            onDelete = {() => onDelete(pokeData.id)}
            
          >
          {pokeData.info}</TradeItem>
        }
    )

    const temp = trades.map(kayttajadata => (kayttajadata.username)).sort();
    const unique = new Set(temp);

    const users = [...unique];

       const addSearchTerm = (newSearch) => {

            setSearch(newSearch);
          /*  if(search != '') {
                const tempTrades = (trades.filter(trade => trade.pokemon.toLowerCase().indexOf(search.toLowerCase()) !== -1))
                setFilterTrades(tempTrades)

            }
            else {
                setFilterTrades(trades)
            }*/
           
         //  console.log("temptrades" +tempTrades)
           //console.log("temptradespokemon " +tempTrades.map(temp => temp.pokemon))
        }
        console.log("TradePageSerarch: " +search)
        
    //.slice(0,1).toUpperCase() + pokeData.pokemon.slice(1, pokeData.pokemon.length)
    //console.log(tradeElements)
   // console.log(users)
   //onChange={e => handleSearchInputChanges(e.target.value)} 
   //console.log(trades.filter(suodatin => suodatin.username.indexOf("user1")))
/*<form>
<label>Search</label>
<input type ="text" value={search} onChange={ e => addSearchTerm(e.target.value) } />
</form>*/


    return (
        <React.Fragment>
        <div> 
        <AddTrade onTradeAdded={newTradeItem => setTrades([...trades, newTradeItem])} />
        <SearchBar addSearchTerm={addSearchTerm}/>

     <div>
        {users.map((user) => 
            <div className = "users">
             <h1>{user}</h1>
                <div className="trades">
                { 
                    trades
                    .filter(suodatin => suodatin.username.includes(user))
                    .filter(hakuSuodatin => hakuSuodatin.pokemon.toLowerCase().includes(search.toLowerCase()))
                    .map( pokeData => {
                        return <TradeItem 
                        key={pokeData.id} 
                        username={pokeData.username}
                        pokemon={pokeData.pokemon}
                        onDelete = {() => onDelete(pokeData.id)}
                        
                        >
                        {pokeData.info}</TradeItem>
                    })

                }
                </div>
             </div>  
            )
           
        }
        
        </div>
        
        </div>
      
        </React.Fragment>
    );
}

/*
 <input
                  label="Search trade"
                  icon="search"
                  value={search}
               
                  type="text"
                />
            
            <button onClick={()=>{
                window.location.href='./Home';
            }}> +</button>
*/
