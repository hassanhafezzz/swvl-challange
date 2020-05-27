import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoreProvider from './store';

import Header from './components/common/Header';
import Main from './components/Main';
import Ride from './components/Ride';
import Stats from './components/Stats';

const App = () => {
  return (
    <StoreProvider>
      <Main>
        <Header />
        <main role="main">
          <Router>
            <Switch>
              <Route path="/stats">
                <Stats />
              </Route>
              <Route exact path="/">
                <Ride />
              </Route>
            </Switch>
          </Router>
        </main>
      </Main>
    </StoreProvider>
  );
};

export default App;
