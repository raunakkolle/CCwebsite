import React from "react";
// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios';

const style = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
const styles = theme => (style);

// const useStyles = makeStyles(styles);

class TableList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      users:[],
      alert : {
        open:false,
        severity:"xxx",
        text:"xxx"

      }
    }


    // this.handleAlertClose = this.handleAlertClose.bind(this)

  }
  componentDidMount(){

    // let config = {
    //   headers: {
    //     Authorization: "TOKEN 5d54bede23d64e548cb696343722589497cf1325",
    //   }
    // }
    // console.log(this.state)
    var self = this;
    // console.log("MAKING API CALL")
     axios.get('http://127.0.0.1:8000/auth/get/users/', {
        headers: {
          Authorization: "TOKEN 5d54bede23d64e548cb696343722589497cf1325"
        }
      })
      .then(function (response) {
        // console.log(response.data);
        const users = response.data
        // console.log(users)
        if(response.status===200){
          self.setState({
            users:users,
            alert:{
              open : true,
              severity:"success",
              text:"blogs loaded successfully"
            }
          })
        }
        else{
          self.setState(
              {
                alert:{
                  open:true,
                  severity:"warning",
                  text:response.data
                }
              }
            );
        }
      })
      .catch(function (error) {
        console.log(error);
        self.setState({
         alert:{
          open:true,
          severity:"error",
          text:error.toString()
         } 
        });
       
      });
  }


  render() {
    const {classes }= this.props;
    const data = this.state.users.map((user)=>([user.username,user.profile.firstname,user.profile.USN,user.profile.sem]))
    const links = this.state.users.map((user)=>{

      if(user.profile.website){
        return user.profile.website
      }
      else{
        return "#";
      }

      })
    
    // console.log(data)
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>CODING CLUB MEMBERS LIST</h4>
              <p className={classes.cardCategoryWhite}>
                
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Username", "Name", "USN", "Sem"]}
                tableData={data}
                links = {links}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Table on Plain Background
              </h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Name", "Country", "City", "Salary"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                  [
                    "4",
                    "Philip Chaney",
                    "$38,735",
                    "Korea, South",
                    "Overland Park"
                  ],
                  [
                    "5",
                    "Doris Greene",
                    "$63,542",
                    "Malawi",
                    "Feldkirchen in Kärnten"
                  ],
                  ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }

}


export default withStyles(styles, {withTheme:true})(TableList);