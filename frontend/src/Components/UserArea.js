import React, {useState } from 'react';
import TradeItem from './TradeItem'
//import { User } from 'discord.js';

export default function UserArea(props, {onDelete}) {
//const users = props.users;
const trades = props.trades;
const search = props.search
const [id, setId] = useState('');
const temp = trades.map(kayttajadata => (kayttajadata.username)).sort();
const unique = new Set(temp);
const users = [...unique];

console.log("Userista: " +trades +"Nimet: " +users +"Search: " +search)
//onDelete(id);

    return (
        <div>
            {users.map((user) => 
            <div className = {`users ${user}`}>
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
                        onDelete = {console.log(pokeData.id)}
                        
                        >
                        {pokeData.info}</TradeItem>
                    })

                }
                </div>
             </div>  
            )
           
        }
        
        </div>
    );
}

//export default UserArea;
/*
  {users.map((user) => 
            <div className = {`users ${user}`}>
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




*/