
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {loginUser} from 'redux/auths/authActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './login.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



class Login extends React.Component{


    constructor(props){
      super(props)
      this.state={
        fields:{
          "username":"",
          "password":""
        },
        error:{
          username:"",
          password:"",
          non_field_errors:""
        }
      }
      this.handleChange = this.handleChange.bind(this)
      this.submitLogin = this.submitLogin.bind(this)
    }
    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }
    submitLogin(e){
      e.preventDefault();
      const data = this.state.fields 
      this.props.Login(data)

    }


    render(){
    const {classes }= this.props;

    if (this.props.loggedIn == true){
      console.log(this.props.loggedIn)
          return <Redirect to="/admin"/>

    }


      return (
        <div className="signin">
          
          <div className="container" id="container">
            
            <div className="form-container sign-in-container">
              <form action="#">
                <h1>Sign in</h1>
    
                <span>or use your account</span>
                <input type="text" id="username" label="Username" 
                  name="username" 
                  placeholder="Username"
                  value= {this.state.fields.username}
                  onChange={this.handleChange}
                  autoFocus
                  required

                   />
                   <span style={{color:"red"}} >{this.state.error.username}</span>
                <input 
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  required

                  placeholder="password"
                  value= {this.state.fields.password} 
                  onChange={this.handleChange}
                  />
                  <span style={{color:"red"}} >{this.props.error.password}</span>
                  <br/>
                  <span style={{color:"red"}} >{this.props.error.non_field_errors}</span>
                  <br/>
                
                <button onClick = {this.submitLogin}>Sign In</button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button className="ghost" 
                  onClick = {this.submitLogin}
                  id="signIn"
                  >Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button className="ghost" 
                  onClick= {()=>{this.props.history.push("/register")}}
                  id="signUp">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
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
    error: state.error
  }
}


const mapDispatchToProps = dispatch => {
  return {
      Login: user => dispatch(loginUser(user))
}
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);
// export default Login;

