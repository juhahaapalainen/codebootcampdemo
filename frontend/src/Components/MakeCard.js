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

class MakeCard extends Component {
state = {
  search: ""
};


 
  renderTrade = trade => {
    const { search } = this.state;
    var code = trade.pokemon.toLowerCase();

    /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
        return null
    }*/

    return (
      <div className="col-md-3" style={{ marginTop: "20px" }}>
        <MDBCard>
          <CardBody>

            <CardTitle title={trade.pokemon}>
              
              
              {trade.pokemon}
            
            </CardTitle>
            <CardText title = {trade.user}>
              {trade.user}
            </CardText>
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
    const filteredTrades = tradeList.filter(trade => {
      return trade.pokemon.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
      <div className="flyout">
        <main style={{ marginTop: "4rem" }}>
          <div className="container">
            <div className="row">
            
              <div className="col">
                <input
                  label="Search trade"
                  icon="search"
                  onChange={this.onchange}
                />
              </div>
              <div className="col" />
            </div>
            <div className="row">
              {filteredTrades.map(trade => {
                return this.renderTrade(trade);
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
export default MakeCard;


  


