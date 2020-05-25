import {USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE} from './authTypes'

// const initialState = {
//     domain: '127.0.0.1:8000/',
//     loggingIn : false,
//     loggedIn : false,
    
//     user : {
//         username : "",
//         email : "",
//         token : ""
//     },

//     error : ""
 
// }


const authsReducer = (state , action) =>{
    switch (action.type){
        case USER_REGISTER_REQUEST :return (
            {...state,
            loggingIn : true,
            })
        case USER_REGISTER_SUCCESS :
            console.log("updating user success state ")
            return (
            {...state,
            loggingIn : false,
            loggedIn : true,
            user : action.payload,
            error: ""
            
            })
        case USER_REGISTER_FAILURE :return (
            {...state,
            loggingIn : false,
            loggedIn : false,
            user : {
                username : "",
                email : "",
                token : ""
            },
            error : action.payload
            })


        default : return state;
    }   
}

export default authsReducer