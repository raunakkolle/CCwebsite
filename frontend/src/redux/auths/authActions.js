import {USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE} from './authTypes'
import store from '../store'
import axios from 'axios'
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




const registerUser = () => {
    return dispatch=>{
        dispatch(userRegisterRequest())
        console.log("dispatching") 
        const user = {
            username : "Gr8ayu",
            email : "anonymouskmr@gmail.com",
            token : "TOKEN 987axsz15662"
        }
        dispatch(userRegisterSuccess(user))

        axios.get("https://jsonplaceholder.typicode.com/users/1")
        .then(res=>{
            console.log(res.data)
            // dispatch(userRegisterSuccess(res))
        }).catch(error=>{
            console.log(error)
            // dispatch(userRegisterFailure(error.message))
        })



        // fetch('https://jsonplaceholder.typicode.com/users/1')
        //   .then(response => {
        //     const user = response.data
        //     console.log("SUCCESS")
        //     console.log(user)
        //     dispatch(userRegisterSuccess(user))
        //   })
        //   .catch(error => {
        //     console.log("ERROR")
        //     dispatch(userRegisterFailure(error.message))
        //   })

    }
}

export default registerUser