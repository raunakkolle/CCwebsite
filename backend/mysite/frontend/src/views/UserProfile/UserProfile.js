import React from "react";
// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';

import InputLabel from "@material-ui/core/InputLabel";
// core components
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios';
import SERVER_URL from 'Server'
import avatar from "assets/img/faces/marc.jpg";

const style = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const styles = theme => (style);
// const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class UserProfile extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      user:{
        "id": 0,
        "firstname": "firstname",
        "lastname": "lastname",
        "bio": "bio",
        "location": "location",
        "company": "company",
        "interest": "interest",
        "birth_date": "DOB",
        "profile_picture": "/media/profile_pictures/default.png",
        "resume": "",
        "branch": "branch",
        "USN": "usn",
        "website": "website",
        "linkedIn_ID": "linkedIn_ID",
        "github_ID": "github_ID",
        "codechef_id": "codechef_id",
        "codeforces_id": "codeforces_id",
        "hackerrank_id": "hackerrank_id",
        "sem": "sem",
        "user": 3,
        "skills": []
      },
      alert : {
        open:false,
        severity:"xxx",
        text:"xxx"

      },
    }
    this.myChangeHandler = this.myChangeHandler.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleAlertClose = this.handleAlertClose.bind(this)

  }
  componentDidMount (){

    var self = this;

     axios.get(SERVER_URL+'/auth/get/user/profile/', {
        headers: {
          Authorization: "TOKEN 9758b89a4f4fb899d168b6ebf1dcc25a006faec2"
        }
      })
      .then(function (response) {
        // console.log(response.data);
        const user = response.data
        console.log(user[0])
        self.setState({"user":user[0]});
        
      })
      .catch(function (error) {
        console.log(error);
        
       
      });
  }
  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({alert:{
      open : false,
      severity:"",
      text:""

    }});
  }
  updateProfile(){
    var self = this;
    var data = this.state.user;
    delete data["id"]
    delete data["birth_date"]
    delete data["profile_picture"]
    delete data["resume"]
    delete data["user"]
    delete data["skills"]
    

    console.log(data);
    // /auth/update/user/profile/


    axios({
    method: 'post',
    url: SERVER_URL+'/auth/update/user/profile/',
    data: data,
    headers: {'Content-Type': 'application/json',
          Authorization: "TOKEN 5d54bede23d64e548cb696343722589497cf1325"
     }
    })
    .then(function (response) {
        self.setState({
            alert:{
              open : true,
              severity:"success",
              text:"Profile Updated"
            }
          })
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        self.setState({
            alert:{
              open : true,
              severity:"error",
              text:response.toString()
            }
          })
    });


  }

  myChangeHandler(event) {
    let nam = event.target.name;
    let val = event.target.value;
    // data = this.state.user;
    this.setState(
        {'user':{
          ...this.state.user,
          [nam]: val
        }}
      );

    
  }


  render(){
    const {classes }= this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="First Name"
                      id="firstname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'firstname',
                        onChange:this.myChangeHandler,
                        value:this.state.user.firstname,
                      }}

                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Last name"
                      id="lastname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'lastname',
                        onChange:this.myChangeHandler,
                        value:this.state.user.lastname
                      }} 
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Company"
                      id="company"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'company',
                        onChange:this.myChangeHandler,
                        value:this.state.user.company
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="USN"
                      id="USN"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'USN',
                        onChange:this.myChangeHandler,
                        value:this.state.user.USN
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Semester"
                      id="sem"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'sem',
                        onChange:this.myChangeHandler,
                        value:this.state.user.sem
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Website url"
                      id="website"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'website',
                        onChange:this.myChangeHandler,
                        value:this.state.user.website
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="linkedIn_url"
                      id="linkedIn_ID"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'linkedIn_ID',
                        onChange:this.myChangeHandler,
                        value:this.state.user.linkedIn_ID
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="github_url"
                      id="github_ID"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'github_ID',
                        onChange:this.myChangeHandler,
                        value:this.state.user.github_ID
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Codechef username"
                      id="codechef_id"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'codechef_id',
                        onChange:this.myChangeHandler,
                        value:this.state.user.codechef_id
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Codeforces username"
                      id="codeforces_id"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'codeforces_id',
                        onChange:this.myChangeHandler,
                        value:this.state.user.codeforces_id
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Hackerrank username"
                      id="hackerrank_id"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'hackerrank_id',
                        onChange:this.myChangeHandler,
                        value:this.state.user.hackerrank_id
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                    <CustomInput
                      labelText="Bio"
                      id="BIO"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name:'bio',
                        onChange:this.myChangeHandler,

                        value:this.state.user.bio,
                        multiline: true,
                        rows: 5
                      }}
                      
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.updateProfile}>Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={SERVER_URL+this.state.user.profile_picture} alt="profile picture" />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{this.state.user.company}</h6>
                <h4 className={classes.cardTitle}>{this.state.user.firstname+" "+this.state.user.lastname}</h4>
                <p className={classes.description}>
                  {this.state.user.bio}
                </p>
                <input type="file"/>

              {/*ADD ON CLICK TO UPLOAD IMAGE*/}
                <Button color="primary" round >
                  Save
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>


        <Snackbar open={this.state.alert.open} autoHideDuration={2000} onClose={this.handleAlertClose}>
          <Alert onClose={this.handleAlertClose}  severity={this.state.alert.severity}>
            {this.state.alert.text}
          </Alert>
      </Snackbar>
      

      </div>
    );
  }
}
export default withStyles(styles, {withTheme:true})(UserProfile);
