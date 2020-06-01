import React from 'react';
// import logo from './logo.svg';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";
// import {Router , Route } from "react-router"
// import { BrowserRouter } from 'react-router-dom'
import './App.css';
import RegistrationForm from './components/auths/RegistrationForm/registrationForm';
import Login from './components/auths/login/Login';
import Dashboard from './components/dashboard';
import Admin from "layouts/Admin.js";
import {ProtectedRoute} from "./protectedRoutes"
import {Provider} from 'react-redux'
import {store, persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'


const hist = createBrowserHistory();

function App() {
    const isLoggedIn = store.getState().loggedIn;
    // console.log("login status:",isLoggedIn)
              // <Redirect  from="/" to="/admin" />
              
  return (
    <Provider store={store}>
      
        <div className="App">
          <Router history={hist}>
          <Switch>
            <main>
              
              
              <Route path="/register" component = {RegistrationForm} />
              <Route path="/login" component = {Login} />              

              <Route exact path="/" component ={()=><Redirect to="/admin"/>} />

              <ProtectedRoute path="/admin" component = {Admin}/>

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
