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
            <label>Käyttäjä</label>
                    <select 
                        required
                        name="type"
                        onChange={(event) => this.handleInputChange(event)}
                    >
                        <option value="" selected disabled hidden>Please select one</option>
                        <option value="user">User1</option>
                        <option value="user">User2</option>
                        <option value="user">User3</option>
                        
                    </select>
            </div>
            <div>
            <label>Lisää:</label>
                        <input required name="pokemonName"/>
            </div>
            </form>
            <button type="submit">Lisää</button>
        
        </React.Fragment>
    );
}
}