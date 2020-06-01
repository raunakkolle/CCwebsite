
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
      const data = this.state.fields 
      e.preventDefault();
      this.props.Login(data)

    }


    render(){
    const {classes }= this.props;

    if (this.props.loggedIn == true){
      console.log(this.props.loggedIn)
          return <Redirect to="/admin"/>

    }


      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div >
            <Avatar >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form  noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value= {this.state.fields.username}
                onChange={this.handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value= {this.state.fields.password}

                autoComplete="current-password"
                onChange={this.handleChange}

              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                
                fullWidth
                variant="contained"
                color="primary"
                 onClick = {this.submitLogin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick= {()=>{this.props.history.push("/register")}}variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
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
  }
}


const mapDispatchToProps = dispatch => {
  return {
      Login: user => dispatch(loginUser(user))
}
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);
// export default Login;

