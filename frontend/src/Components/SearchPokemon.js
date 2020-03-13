import React from 'react';



export default class SearchPokemon extends React.Component{

    state = {
        user: "",
        pokemon: "",
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const inputName = target.name;
    
        this.setState({[inputName]: value});
    }

    onSave(event) {
        fetch('/api/pokemons', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(newPokemon => this.props.onPokemonAdded(newPokemon))
    }
    
render() {
    return (
        <React.Fragment>
            <form>
            <div>
            <label>Search:</label>
                        <input required name="pokemonName"/>
            </div>
      
            </form>
        
        
        </React.Fragment>
    );
}
}