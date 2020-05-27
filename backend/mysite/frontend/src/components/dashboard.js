import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    
  };

  componentDidMount(){
    // console.log("register user called")
    // this.props.registerUser()
  }



  render() {
    console.log(this.props)
    return(
        <div>
        { this.props.loggedIn != true ? <Redirect to="/register" /> : null }
        <h1>Hello This is Dashboard.</h1>
        <p>{this.props.user.username}</p>
        <p>{this.props.user.email}</p>
        <p>{this.props.user.token}</p>

      </div>
    )
    
  }
}

// Selector file is used to return some state info from store
const mapStateToProps = state => {
  //state.reducer.name if combined reducer is used
  return {
    domain : state.domain,
    user : state.user,
    loggedIn : state.loggedIn,
    loggingIn : state.loggingIn,
  }
}


// const mapDispatchToProps = dispatch => ({
//  registerUser: registerUser
// });


// export default connect(mapStateToProps,mapDispatchToProps)(RegistrationForm);
export default connect(mapStateToProps,)(Dashboard);