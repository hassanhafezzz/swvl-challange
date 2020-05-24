import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Ride from './components/Ride';
import Stats from './components/Stats';

function App() {
  return (
    <>
      <Header />
      <main role="main">
        <Router>
          <Switch>
            <Route path="/stats">
              <Stats />
            </Route>
            <Route path="/">
              <Ride />
            </Route>
          </Switch>
        </Router>
      </main>
    </>
  );
}

export default App;
