import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavBar from './Components/NavBar';
import Home from './Components/Home';

import './App.css';
import Pokemonlist from './Components/Pokemonlist';
import MakeCard from './Components/MakeCard'


function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Pokemonlist" component={Pokemonlist} />
        <Route exact path="/Card" component={MakeCard} />
      </Switch>
    </Router>
  );
}

export default App;
