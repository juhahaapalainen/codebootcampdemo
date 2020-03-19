import React, { Component,useState, useEffectfrom, useEffect } from 'react';
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
//import tradeList from "./tradeList.json"
import blankImg from "./blank.gif"



class MakeCard extends Component {
  constructor(props) {
    super(props);
this.state = {
  search: "",
  tradeList: []
};

}


componentDidMount() {
  fetch("/api/trades")
    .then(res => res.json())
    .then((data) => {
      this.setState({tradeList: data})
      console.log("Data: " +data)
      //console.log("Tralist: " +tradeList)
    
    })
    .catch(err => console.log(err))
        
//console.log("mouti: " +tradeLista);
}

/*getFromApi =async() => {
  const api_call = await fetch(`/api/trades`);
  const data = await api_call.json();
  console.log("Data: " +data)
}*/


  renderTrade = trade => {
    const { search } = this.state;
    const {tradeList} = this.state;
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
            <CardText title = {trade.username}>
              {trade.username}
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
    const {tradeList} = this.state;
    console.log("Renderin tradet: " +tradeList)
    const filteredTrades = tradeList.filter(trade => {
      return trade.pokemon.toLowerCase().indexOf(search.toLowerCase()) !== -1;
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
              {filteredTrades
              .sort((a,b) => a.username.localeCompare(b.username))
              .map(trade => {
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

//       .sort((a,b) => a.user.localeCompare(b.user))


  


