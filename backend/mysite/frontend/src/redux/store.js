import {createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


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

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authsReducer)

const store = createStore(persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware) )
    )

const persistor = persistStore(store);

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }
// const store = createStore(reducer, composeWithDevTools(
  // applyMiddleware(...middleware),
  // other store enhancers if any
// ));

// export default store
 export  { store, persistor }