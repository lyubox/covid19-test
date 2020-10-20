import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import List from './components/list/List';
// import './App.css';

function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' children={<List />} />
          <Route path='/details/:country' children={<List />} />
          <Route path='/history/:country' children={<List />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
