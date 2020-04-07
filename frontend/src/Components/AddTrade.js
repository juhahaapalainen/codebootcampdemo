import React from "react";
import './AddTrade.css'



export default class AddTrade extends React.Component {
    state = {
        username: "",
        pokemon: "",
        info: "",

    }




    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const inputName = target.name;

        this.setState({ [inputName]: value });
    }

    onSave(event) {
        event.preventDefault();
        //console.log("OnSaveevent: pokemon " +this.state.pokemon +" username: " +this.state.username)
        fetch('/api/trades', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                pokemon: this.state.pokemon,
                info: this.state.info
            })
        })
            .then(response => response.json())
            .then(newTradeItem => this.props.onTradeAdded(newTradeItem))
            .then(this.pokemon = "")
            .then(this.username = "")
    }

    render() {
        return (
            <React.Fragment>
                <form className=" addform" onSubmit={(event) => this.onSave(event)}>
                    <h3>Lisää pokemon:</h3>
                    <div>
                        <label>Username</label>
                        <input required
                            className="usernameinput"
                            type="text"
                            id="username"
                            name="username"
                            value={this.username}
                            onChange={(event) => this.handleInputChange(event)} />
                    </div>
                    <div>
                        <label>Pokemon</label>
                        <input required
                            className="pokemoninput"
                            type="text"
                            id="pokemon"
                            name="pokemon"
                            value={this.pokemon}
                            onChange={(event) => this.handleInputChange(event)} />
                    </div>

                    <button type="submit">Lisää</button>
                </form>

            </React.Fragment>
        );
    }
}