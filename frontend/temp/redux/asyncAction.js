const reduc = require('redux')
const createStore = redux.createStore

// npm install axios redux-thunk
// axios > requests to an API endpoint
// redux-thunk > Define async action creator , middleware



const thunkMiddleware = require('reduc-thunk').default
const axios = require('axios')
const combineReducers =  redux.combineReducers


const applyMiddleware = redux.applyMiddleware


const initialState = {
    loading : false,
    users = [],
    error : ''
}


const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

const fetchUserRequest = () => {
    return {
            type : FETCH_USER_REQUEST

        }
}

const fetchUsersSuccess = (users) => {
    return {
            type : FETCH_USER_SUCCESS,
            payload : users

        } 
}

const fetchUsersFailure = (error) => {
    return {
            type : FETCH_USER_FAILURE,
            payload : error

        } 
}


const reducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_USER_REQUEST:
        return {
            ...state,
            loading : true
        }

        case FETCH_USER_SUCCESS:
        return {
            ...state,
            loading : false,
            users : action.payload,
            error = ''



        }

        case FETCH_USER_FAILURE:
        return {
            ...state,
            loading : false,
            users : [],
            error = action.payload

        }
        default:
        return state

    }
}




const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequest())

        axios.get('http.....')
        .then(response=>{

            const users = response.data
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error=>{
            dispatch(fetchUsersFailure(error.message))
        })
    }
}



const store = createStore(reducer, applyMiddleware(thunkMiddleware))

