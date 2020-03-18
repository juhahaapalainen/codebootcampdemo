import React, { Component } from 'react';
import {
  Button,
  Input,
  Footer,
  MDBCard,
  CardBody,
  CardImage,
  CardTitle,
  CardText
} from "mdbreact";
import "./MakeCard.css"
import "./Card.css"
import tradeList from "./tradeList.json"
import blankImg from "./blank.gif"
import oakdexPokedex from "oakdex-pokedex"

const pokeDex = oakdexPokedex.allPokemon();

class Pokedex extends Component {
state = {
  search: ""
};


 
 renderDex = dex => {
  const { search } = this.state;
  var code = dex.names.en.toLowerCase();

   

    return (
      <div className="col-md-3" style={{ marginTop: "20px" }}>
        <MDBCard>
          <CardBody>
            <p className="">
                <img 
                
                />
            </p>
            <CardTitle title={dex.names.en}>
              
              
              {dex.names.en}
            
            </CardTitle>
            
          </CardBody>
        </MDBCard>
      </div>
    );
  };

 onchange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { search } = this.state;
    const filteredPokemons = pokeDex.filter(poke => {
      return poke.names.en.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
      <div className="flyout">
        <main style={{ marginTop: "4rem" }}>
          <div className="container">
            <div className="row">
            
              <div className="col">
                <Input
                  label="Search trade"
                  icon="search"
                  onChange={this.onchange}
                />
                
              </div>
              <div className="col" />
            </div>
            <div className="row">
              {filteredPokemons
              .sort((a,b) => a.national_id - (b.national_id))
              .map(pokem => {
                return this.renderDex(pokem);
              })}
            </div>
          </div>
        </main>
        <Footer color="indigo">
         
        </Footer>
      </div>
    );
  }

}
export default Pokedex;


  


