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
      console.log(this.state)
      if (this.validateForm() || true) {
          
          // alert("Form submitted");
          console.log(this.state)
          const data = this.props.registerUser(this.state.fields)
          console.log("Register status", data)
      }

    }

  validateForm(){
    console.log("validating form")
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

     if (!fields["username"]) {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
      }

      if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
            errors["username"] = "*Please enter alphabet characters only.";
        }
      }

       if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Please enter your email-ID.";
      }

      if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email-ID.";
        }
      }

       if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        // if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        if (fields["password"].length <5) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.";
        }
      }



      if (typeof fields["re_password"] !== "undefined") {
        if (fields["re_password"] !==fields["password"]) {
          formIsValid = false;
          errors["re_password"] = "*Password do not match.";
        }
      }
       this.setState({
        errors: errors
      });

      return formIsValid;


  }    



  render() {
    if(this.props.loggedIn){
      console.log(this.props.loggedIn)
      return <Redirect to="/admin" />          
      
    }

                // { this.props.loggedIn == true ? <Redirect to="/admin" /> : null }
    return (
            <div>
                <p>{this.props.user.name}</p>


                <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={this.state.fields.username} placeholder="Username" onChange={this.handleChange}  />
                    <p style={{color:"red"}}>{ this.state.errors.username}  </p>

                    <br/>
                    <label htmlFor="username">email</label>
                    <input type="email" name="email" value={this.state.fields.email} placeholder="email" onChange={this.handleChange}/>
                    <p style={{color:"red"}}> {this.state.errors.email } </p>

                    <br/>
                    <label htmlFor="username">password</label>
                    <input type="password" name="password" placeholder="password" value={this.state.fields.password} onChange={this.handleChange}/>
                    <p style={{color:"red"}}> {this.state.errors.password } </p>
                    <br/>
                    <label htmlFor="username">re password</label>
                    <input type="password" name="re_password" placeholder="password" value={this.state.fields.re_password} onChange={this.handleChange}/>
                    <p style={{color:"red"}}> {this.state.errors.re_password } </p>
                    <br/>

                    <button type="submit">Register</button>

                
                    <a onClick= {()=>{this.props.history.push("/login")}}> have account ? Login </a> 
                </form>                
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
  }
}


const mapDispatchToProps = dispatch => {
  return {
 registerUser: user => dispatch(registerUser(user))
}
};


export default connect(mapStateToProps,mapDispatchToProps)(RegistrationForm);
// export default connect(mapStateToProps,{registerUser})(RegistrationForm);