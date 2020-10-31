import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import makeStore from './state';
import List from './components/List';
// import './App.css';

function App() {
  const { context, initState } = makeStore();

  return (
    <context.Provider value={initState}>
      <Router>
        <Switch>
          <Route exact path="/" children={<List />} />
          <Route path="/:module/:country" children={<List />} />
        </Switch>
      </Router>
    </context.Provider>
  );
}

export default App;
