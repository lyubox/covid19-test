import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import List from './components/list/List';
// import './App.css';

function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' children={<List />} />
          <Route path='/:module/:country' children={<List />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
