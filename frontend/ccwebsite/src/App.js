import React from 'react';
// import logo from './logo.svg';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { createBrowserHistory } from "history";
// import {Router , Route } from "react-router"
// import { BrowserRouter } from 'react-router-dom'
import './App.css';
import RegistrationForm from './components/auths/RegistrationForm/registrationForm';
import Login from './components/auths/login/Login';
import Dashboard from './components/dashboard';
// import Admin from "./layouts/Admin.js";

import {Provider} from 'react-redux'
import store from './redux/store'

const hist = createBrowserHistory();

function App() {
    const isLoggedIn = store.getState().loggedIn;
    console.log("login status:",isLoggedIn)
  return (
    <Provider store={store}>
        <div className="App">
          <Router history={hist}>
          <Switch>
            <main>
              <nav>
                <ul> <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Home</Link></li>
                <li><Link to="/register">register</Link></li>
                <li><Link to="/dashboard">dashboard</Link></li>
                </ul>
              </nav>
              <Route path="/" exact render={()=><h1>HOME</h1>} />
              <Route path="/register" component = {RegistrationForm} />
              <Route path="/login" component = {Login} />
              <Route path="/dashboard" component = {Dashboard} />
              

            </main>
          </Switch>
        </Router>

           


        </div>
    </Provider>
  );
}

export default App;

// {isLoggedIn ? (
//             <Dashboard />
//           ) : (
//             <RegistrationForm  />
//           )}