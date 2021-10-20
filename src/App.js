import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
