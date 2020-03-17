import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavBar from './Components/NavBar';
import Home from './Components/Home';

import './App.css';
import Pokemonlist from './Components/Pokemonlist';
import MakeCard from './Components/MakeCard'
import Testi from './Components/Testi'
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

function App() {
  return (
    <Router>
      <NavBar />
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Pokemonlist" component={Pokemonlist} />
        <Route exact path="/Card" component={MakeCard} />
        <Route path="/Testi" component={Testi} />
      </Switch>
    </Router>
  );
}

export default App;
