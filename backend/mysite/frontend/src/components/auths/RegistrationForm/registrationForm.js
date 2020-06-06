import React from 'react';
import ReactDOM from 'react-dom';
import {registerUser} from 'redux/auths/authActions'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

class RegistrationForm extends React.Component {
  constructor(props){
    super(props);
    let fields = {};
          fields["username"] = "";
          fields["email"] = "";
          fields["password"] = "";
          fields["re_password"] = "";
          
    this.state = {

        fields: fields,
        errors: {}

    };


    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

  };

  componentDidMount(){
    // console.log("register user called")
    // this.props.registerUser()
  }


  handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submituserRegistrationForm(e) {
      e.preventDefault();
          this.props.registerUser(this.state.fields)
        
    }

  render() {
    if(this.props.loggedIn){

      return <Redirect to="/admin" />          
      
    }



                // { this.props.loggedIn == true ? <Redirect to="/admin" /> : null }
    return (
       <div className="signin">
        <div className="container" id="container">
          
          <div className="form-container sign-in-container">
            <form onSubmit= {this.submituserRegistrationForm}>
              <h1>Sign Up</h1>
  
              <span>or use your account</span>
              <input type="text" id="username" label="Username" 
                required
                name="username" 
                value={this.state.fields.username} 
                placeholder="Username" 
                onChange={this.handleChange}
                autoFocus
                 />

                <span style={{color:"red"}} >{this.props.error.username}</span>
               <input type="text" id="email" label="Username" 
                name="email" 
                required

                placeholder="email"
                value={this.state.fields.email}
                placeholder="email" 
                onChange={this.handleChange}
               />
               <span style={{color:"red"}} >{this.props.error.email}</span>
              <input 
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                placeholder="password" 
                value={this.state.fields.password} 
                onChange={this.handleChange}
                />
                <span style={{color:"red"}} >{this.props.error.password}</span>
              <input type="password"
                required
              name="re_password" 
              placeholder="re password" 
              value={this.state.fields.re_password} 
              onChange={this.handleChange}/>
              <span style={{color:"red"}} >{this.props.error.re_password}</span>
              <span style={{color:"red"}} >{this.props.error.non_field_errors}</span>
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" 
                onClick= {()=>{this.props.history.push("/login")}}
                id="signIn">Sign In</button>
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
 registerUser: user => dispatch(registerUser(user))
}
};


export default connect(mapStateToProps,mapDispatchToProps)(RegistrationForm);
// export default connect(mapStateToProps,{registerUser})(RegistrationForm);