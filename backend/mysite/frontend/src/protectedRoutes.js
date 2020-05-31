import React from "react"

import {Route, Redirect} from "react-router-dom"

export const ProtectedRoute = ({component:Component, ...rest})=>{

    const loggedIn = true
    return(
            <Route {...rest} render={
                (props)=>{
                    if(loggedIn){
                    return <Component {...props} />
                    }
                    else{
                        return <Redirect to={{pathname:"/register"}}/>
                    }
                }
            }



            />


        )
}