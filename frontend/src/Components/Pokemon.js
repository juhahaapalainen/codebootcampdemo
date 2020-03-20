import React from 'react';
import "./Pokemon.css"

export default function(props) {
    //console.log("Moro pokemonista url: " +'../assets/img/pokemon_icons/pokemon_icon_' +props.id +'_00.png')
    return (
        <div className={`pokemon card`} >
            <img className="card-img" 
            src= {'/img/pokemon_icons/pokemon_icon_' +props.id +'_00.png'}
            alt=''
            onError={ (e) => {e.target.onerror=null; e.target.src='/img/pokemon_icons/pokemon_icon_000.png'}}
            ></img>
            <li>{props.type}</li>
            <li>{props.children}</li>
            
            </div>
    );
}

