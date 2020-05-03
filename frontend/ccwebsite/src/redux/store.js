import {createStore, applyMiddleware} from 'redux'
import authsReducer from './auths/authsReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const middleware = [thunk]
const initialState = {
    domain: '127.0.0.1:8000/',
    loggingIn : false,
    loggedIn : false,
    
    user : {
        username : "",
        email : "",
        token : ""
    },

    error : ""
 
}

const store = createStore(authsReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware) )
    )

// const store = createStore(reducer, composeWithDevTools(
  // applyMiddleware(...middleware),
  // other store enhancers if any
// ));

export default store