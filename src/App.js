import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' children={<Home />} />
        <Route path='/:module/:country' children={<Home />} />
      </Switch>
    </Router>
  );
}

export default App;
