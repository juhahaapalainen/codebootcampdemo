import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavBar from './Components/NavBar';
import Home from './Components/Home';

import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import TradePage from './Components/TradePage'

function App() {
  return (
    <Router>
      <NavBar />
      
      <Switch>
        <Route exact path="/" component={Home} />

        <Route path="/Tradepage"> <TradePage/></Route>  />
      </Switch>
    </Router>
  );
}

export default App;
