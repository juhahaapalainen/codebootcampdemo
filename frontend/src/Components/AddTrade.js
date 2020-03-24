import React from "react";


export default class AddTrade extends React.Component {
    state = {
        username: "",
        pokemon: "",
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const inputName = target.name;
    
        this.setState({[inputName]: value});
    }

    onSave(event) {
        event.preventDefault();
        fetch('/api/trades', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(newTrade => this.props.onTradeAdded(newTrade))
    }

    render() {
        return (
            <React.Fragment>
            <form onSubmit={(event) => this.onSave(event)}>
                <div>
                    <label>Nimi</label>
                    <select 
                        required
                        name="username"
                        onChange={(event) => this.handleInputChange(event)}
                    >
                        <option value="" selected disabled hidden>Please select one</option>
                        <option value="user1">user1</option>
                        <option value="user2">user2</option>
                        <option value="user3">user3</option>
                        
                    </select>
                
                </div>
                <div>
                    <label>Pokemon</label>
                    <input required type="text" name="pokemon" onChange={(event) => 
                        this.handleInputChange(event)}/>
                </div>
            
                <button type="submit">Lisää</button>
            </form>
            
            </React.Fragment>
        );
    }
}