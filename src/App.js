import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/trivia" component={ Trivia } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
