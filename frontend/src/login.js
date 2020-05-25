import React from 'react';
import ReactDOM from 'react-dom';

class RegistrationForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        username:"",
        email:"",
        password:"",
        re_password:"",
        fields: {},
        errors: {}

    };


    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

  };

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
      if (this.validateForm()) {
          let fields = {};
          fields["username"] = "";
          fields["emailid"] = "";
          fields["password"] = "";
          fields["repassword"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
      }

    }

  validateForm(){
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
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.";
        }
      }



      if (typeof fields["repassword"] !== "undefined") {
        if (fields["repassword"] !==fields["password"]) {
          formIsValid = false;
          errors["repassword"] = "*Password do not match.";
        }
      }

       this.setState({
        errors: errors
      });
      return formIsValid;


  }    

  render() {
    return (
            <div>
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
                    <input type="password" name="repassword" placeholder="password" value={this.state.fields.repassword} onChange={this.handleChange}/>
                    <p style={{color:"red"}}> {this.state.errors.repassword } </p>
                    <br/>

                    <button type="submit">Register</button>
                </form>                
            </div>
        );
  }
}



export default RegistrationForm;