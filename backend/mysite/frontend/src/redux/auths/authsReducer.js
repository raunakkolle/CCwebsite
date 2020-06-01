import {USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE} from './authTypes'
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE,USER_LOGOUT} from './authTypes'



const authsReducer = (state , action) =>{
    switch (action.type){
        case USER_REGISTER_REQUEST :return (
            {...state,
            
            })
        case USER_REGISTER_SUCCESS :
            console.log("updating user success state ")
            return (
            {...state,
            
            userRegister : action.payload,
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
        case USER_LOGIN_REQUEST :return (
            {...state,
            loggingIn:true
            })

        case USER_LOGIN_SUCCESS :
            console.log("updating user success state ")
            return (
            {...state,
            loggingIn:false,
            loggedIn:true,
            TOKEN : action.payload.auth_token,
            error: ""
            
            })
        case USER_LOGIN_FAILURE :return (
            {...state,
            loggingIn : false,
            loggedIn : false,
            user : {
                username : "",
                email : "",
            
            },
            error : action.payload
            })

            case USER_LOGOUT :return (
            {...state,
            loggingIn : false,
            loggedIn : false,
            user : {
                username : "",
                email : "",
                token : ""
            },
            TOKEN:"",
            error : action.payload
            })


        default : return state;
    }   
}

export default authsReducer