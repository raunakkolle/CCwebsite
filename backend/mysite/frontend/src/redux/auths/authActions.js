import {USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE,
USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE,
USER_LOGOUT,UPDATE_USER_INFO
} from './authTypes'
// import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE} from './authTypes'

import {store} from '../store'
import axios from 'axios'
import SERVER_URL from 'Server';
import history from '../../history'
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

const userLogout = () => {
    console.log("logout action ")
    return {
            type : USER_LOGOUT

        } 
}

const userUpdate = (data) => {
    return {
            type : UPDATE_USER_INFO,
            payload: data

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
                history.push("/login")

            })
            .catch(function (error) {
                //handle error
                console.log("REGISTER FAIL", error.response)
                // if response.
                dispatch(userRegisterFailure(error.response.data))
                
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
                console.log("XX")
                dispatch(updateUser(response.data))
            })
            .catch(function (error) {
                //handle error
                dispatch(userLoginFailure(error.response.data))
                
            });



        }
    }



const updateUser = (token) => {
    return dispatch=>{
        // console.log("YY", tok)

        axios({
            method: 'get',
            url: SERVER_URL+'/auth/users/me/',
            headers: {'Authorization': 'TOKEN '+token.auth_token}

            })
            .then(function (response) {
                console.log("YY",response.data)
                dispatch(userUpdate(response.data))
            })
            .catch(function (response) {
                //handle error
                console.log(response.message);
                
            });



        }
    }


const logoutUser = (token) => {
    return dispatch=>{
        dispatch(userLogout())
        axios({
            method: 'post',
            url: SERVER_URL+'/auth/token/logout/',
            headers: {'Authorization': 'TOKEN '+token}

            })
            .then(function (response) {
                
                
            })
            .catch(function (response) {
                //handle error
                dispatch(userLogout())
                
                console.log(response.message);
                
            });



        }
    }


export  {registerUser, loginUser, logoutUser}