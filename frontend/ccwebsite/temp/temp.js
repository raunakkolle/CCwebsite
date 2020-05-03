const redux = require('redux')

// npm install redux-logger
const   reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers =  redux.combineReducers
const logger = reduxLogger.createLogger()


const applyMiddleware = redux.applyMiddleware


const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'


// ACtions
function buyCake(){
    return{
        type: BUY_CAKE,
        info : 'First redux action'
    }    
}

function buyIcecream(){
    return{
        type: BUY_ICECREAM
    }    
}


const initialCakeState = {
    numOfCakes : 10
}

const initialIseCreamState = {
    numOfIceCreams : 20
}


const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case BUY_CAKE:return{
            ...state,
            numOfCakes : state.numOfCakes -1
        }
        default : return state
    }
}

const iceCreamReducer = (state = initialIseCreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM:return{
            ...state,
            numOfIceCreams : state.numOfIceCreams -1
        }
        default : return state
    }
}

const rootReducer =  combineReducers({
    cake : cakeReducer,
    iceCream : iceCreamReducer 
})








const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State:', store.getState())
const unsubscribe = store.subscribe(()=>console.log('Updated State:', store.getState()));

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsubscribe()