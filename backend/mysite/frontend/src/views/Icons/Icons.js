/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ProjectCard from "components/ProjectCard"
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import axios from 'axios';
import SERVER_URL from 'Server';

// const useStyles = makeStyles(styles);
const style = theme => (styles);

class Icons extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      projects : [
      {
        "id": 1,
        "publish": true,
        "title": "InstaPostDownloader",
        "description": "A Bot to automatically download high quality images from Instagram account",
        "link": "https://github.com/Gr8ayu/",
        "image_url": "",
        "content": "A Bot to automatically download high quality images from Instagram account. It is written in python and and use selenium driver to automaticall browse internet and download images in high quality",
        "tags": "Instagram, bot, python, aiutomation, web scraping",
        "author": 3
      }]
    }

    // this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount = ()=>{

    var self = this;

     axios.get(SERVER_URL+'/blogs/projects', {
        headers: {
          Authorization: "TOKEN 5d54bede23d64e548cb696343722589497cf1325"
        }
      })
      .then(function (response) {
        
        const projects = response.data
        self.setState({"projects":projects});
        console.log(self.state)
        
      })
      .catch(function (error) {
        console.log(error);
        
       
      });
  }

  render(){
    const {classes }= this.props;
    const projects = this.state.projects
    const projectList = projects.map((project)=>{
      return (<GridItem xs={12} sm={4} md={3}>
          <ProjectCard data = {project}/>
      </GridItem>)
    })
    console.log(projectList)
    return (
      <GridContainer>
        {projectList}
      </GridContainer>
    );
  }
}

export default withStyles(style, {withTheme:true})(Icons);
