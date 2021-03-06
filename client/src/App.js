import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import jwt_decode from 'jwt-decode';

import Routes from './components/routing/Routes';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token to get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated state
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Token expired - logout and redirect
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route component={Routes} />
      </Router>
    </Provider>
  );
};

export default App;
