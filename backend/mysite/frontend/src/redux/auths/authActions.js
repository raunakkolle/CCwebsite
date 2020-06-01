import {USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE,
USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE,
USER_LOGOUT
} from './authTypes'
// import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE} from './authTypes'

import store from '../store'
import axios from 'axios'
import SERVER_URL from 'Server';

// const login = () => {
//     return {
//         type : USER_LOGIN
//     }
// }

const userRegisterRequest = () => {
    return {
            type : USER_REGISTER_REQUEST

        }
}

const userRegisterSuccess = (users) => {

    return {
            type : USER_REGISTER_SUCCESS,
            payload : users

        } 
}

const userRegisterFailure = (error) => {
    return {
            type : USER_REGISTER_FAILURE,
            payload : error

        } 
}

const userLoginRequest = () => {
    return {
            type : USER_LOGIN_REQUEST

        }
}

const userLoginSuccess = (users) => {

    return {
            type : USER_LOGIN_SUCCESS,
            payload : users

        } 
}

const userLoginFailure = (error) => {
    return {
            type : USER_LOGIN_FAILURE,
            payload : error

        } 
}

const userLogout = (error) => {
    return {
            type : USER_LOGOUT

        } 
}




 const registerUser = (user) => {
    return dispatch=>{
        dispatch(userRegisterRequest())

        axios({
            method: 'post',
            url: SERVER_URL+'/auth/users/',
            data: user,
            headers: {'Content-Type': 'application/json'}
            })
            .then(function (response) {
                
                dispatch(userRegisterSuccess(response.data))
            })
            .catch(function (response) {
                //handle error
                dispatch(userRegisterFailure(response.message))
                
            });
        }
    }

const loginUser = (user) => {
    return dispatch=>{
        dispatch(userLoginRequest())

        axios({
            method: 'post',
            url: SERVER_URL+'/auth/token/login/',
            data: user,
            headers: {'Content-Type': 'application/json'}
            })
            .then(function (response) {
                
                dispatch(userLoginSuccess(response.data))
            })
            .catch(function (response) {
                //handle error
                dispatch(userLoginFailure(response.message))
                
            });



        }
    }

const logoutUser = (user) => {
    return dispatch=>{
        axios({
            method: 'post',
            url: SERVER_URL+'/auth/token/logout/',
            })
            .then(function (response) {
                
                dispatch(userLogout())
            })
            .catch(function (response) {
                //handle error
                console.log(response.message);
                
            });



        }
    }


export  {registerUser, loginUser, logoutUser}