import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';

// core components
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import BlogCard from "components/Typography/Card.js";
import Markdown from "components/Typography/Markdown.js";
import axios from 'axios';
import SERVER_URL from 'Server';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
// import ReactMarkdown from 'react-markdown'
import CodeBlock from "components/Typography/CodeBlock"
import {connect} from 'react-redux'



const ReactMarkdown = require('react-markdown/with-html')

const htmlParser = require('react-markdown/plugins/html-parser')
// const HtmlToReact = require('html-to-react');
// const HtmlToReactParser = require('html-to-react').Parser;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const processingInstructions = [
  {
    // Custom <h1> processing
    shouldProcessNode: function (node) {
      return node.parent && node.parent.name && node.parent.name === 'h1';
    },
    processNode: function (node, children) {
      return node.data.toUpperCase();
    }
  },
  {
    // Anything else
    shouldProcessNode: function (node) {
      return true;
    },
    // processNode: processNodeDefinitions.processDefaultNode
  }
];

const parseHtml = htmlParser({
  isValidNode: node => node.type !== 'script',
  processingInstructions: processingInstructions
})

const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
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
  },
  renderer:{
    textAlign:"left"
  }
};
const styles = theme => (style);

// const useStyles = makeStyles(styles);
class Typography extends React.Component{
 
 constructor(props){
    super(props)
    this.state = {
      blogs:[],
      
      searchText :"",
      alert : {
        open:false,
        severity:"xxx",
        text:"xxx"

      },

      // view will be
      // 0 for list of blogs, 
      // -1 for new post,
      // -id for edit post 
      //  id rest for blog id 
      view:0
    }
    this.handleAlertClose = this.handleAlertClose.bind(this)
    this.searchHandle = this.searchHandle.bind(this)
    this.openBlog = this.openBlog.bind(this)
    this.addBlog = this.addBlog.bind(this)
    this.editBlog = this.editBlog.bind(this)

  };

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

  componentDidMount(){

    // let config = {
    //   headers: {
    //     Authorization: "TOKEN 5d54bede23d64e548cb696343722589497cf1325",
    //   }
    // }
    // console.log(this.state)
    var self = this;
    console.log("MAKING API CALL")
     axios.get(SERVER_URL + '/blogs/', {
        headers: {
          Authorization: "TOKEN "+ self.props.token  
          
        }
      })
      .then(function (response) {
        console.log(response.data);
        const blogs = response.data
        if(response.status==200){
          self.setState({
            blogs:blogs,
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
        // self.setState({
          
        //   alert:{
        //   open : true,
        //   severity:"error",
        //   text:error
        //   }
        // })
      });
  }



searchHandle(event){
  this.setState({searchText:event.target.value})
}

openBlog=(data)=>{
  // this.setState({view:event.target.value})
  console.log(data)
  this.setState({view:data.id,
    
  });
  if(data.blogData){
    this.setState({
      blogData:data.blogData
    
  });
  }
  else{
   this.setState({
      blogData:{
        'title':"",
        'tagline':"",
        'content':"",
        'tags':""
      }
    
    }); 
  }
}
addBlog(data){
  // console.log("BLOG TO ADD :", data)
  var self = this;
    delete data["id"]
    delete data["creationDate"]
    delete data["publish"]
    delete data["background"]
    delete data["author"]
    delete data["category"]
    
    console.log(data)

    axios({
    method: 'post',
    url: SERVER_URL+'/blogs/add/',
    data: data,
    headers: {'Content-Type': 'application/json',
          Authorization: "TOKEN "+ self.props.token  
          
     }
    })
    .then(function (response) {
        self.setState({
            alert:{
              open : true,
              severity:"success",
              text:"Blog Added"
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

editBlog(data){
  // console.log("BLOG TO ADD :", data)
  var self = this;
    var id = data["id"] 

    delete data["id"]
    delete data["creationDate"]
    delete data["publish"]
    delete data["background"]
    delete data["author"]
    delete data["category"]
    

    axios({
    method: 'post',
    url: SERVER_URL+'/blogs/edit/'+id+'/',
    data: data,
    headers: {'Content-Type': 'application/json',
          Authorization: "TOKEN "+ self.props.token  
          
     }
    })
    .then(function (response) {
        self.setState({
            alert:{
              open : true,
              severity:"success",
              text:"Blog Added"
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



 render() {
  
  const {classes }= this.props;
  
  const BlogsFiltered = this.state.blogs.filter((blog)=> {
    return (
      blog.title.toLowerCase().includes(this.state.searchText.toLowerCase()) ||
      blog.tagline.toLowerCase().includes(this.state.searchText.toLowerCase()) ||
      blog.tags.toLowerCase().includes(this.state.searchText.toLowerCase())
      )
  }) 
  


  const blogList = BlogsFiltered.map((blog)=>(<BlogCard key={blog.id} onClick={()=>this.openBlog({id:blog.id})} blog={blog}/>));
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Blogs | Tutorials | Guide</h4>
        <p className={classes.cardCategoryWhite}>
          
        </p>
      </CardHeader>
      <CardBody>
        
      {/*<input type="text" placeholder="Search" style={{width:"50%", marginRight:"20px"} }/>*/}
      
      
      {this.state.view === 0 && 
        <div>
        <TextField id="standard-basic" label="Search" style={{width:"50%", marginRight:"20px"}} onChange={this.searchHandle}/>
        
        <Button variant="contained" color="secondary" onClick={()=>this.openBlog({id:"NEW_BLOG"})}>
          Write Article
        </Button>
        </div>
      }
      {(this.state.view == "NEW_BLOG" || this.state.view == "EDIT_BLOG" )&& 
        <Button variant="contained"  color="secondary" onClick={()=>this.openBlog({id: 0})}>
          Read Blogs
        </Button>
      }
      {this.state.view > 0 && 
        <div>
        <Button variant="contained"  color="secondary" onClick={()=>this.openBlog({id: 0})}>
          Read Blogs
        </Button>
        {"        "}   

        
        {this.state.blogs.filter((blog)=>(this.state.view==blog.id))[0].author.id === 3 && 
          <Button variant="contained"  color="secondary" onClick={()=>this.openBlog({id: "EDIT_BLOG",
            blogData:this.state.blogs.filter((b)=>(this.state.view == b.id))[0]

          }
          )}>
          
          Edit
        </Button>
        }
        </div>
      }
      

      {this.state.view == 0 && blogList}
      {this.state.view == "NEW_BLOG" && <Markdown saveAction={this.addBlog} blogData={this.state.blogData}/> }
      {this.state.view == "EDIT_BLOG" && <Markdown saveAction={this.editBlog} blogData={this.state.blogData}/> }
      {this.state.view > 0 && this.state.blogs.filter((blog)=>blog.id === this.state.view).map((blog)=>(
        <div className="renderer" style={{textAlign:"left"}}>
          <ReactMarkdown 
           escapeHtml={false}
           renderers = {{code:CodeBlock}}
           source={blog.content}
             />
           
        
        </div>
        ))}

       


      <Snackbar open={this.state.alert.open} autoHideDuration={2000} onClose={this.handleAlertClose}>
        <Alert onClose={this.handleAlertClose}  severity={this.state.alert.severity}>
          {this.state.alert.text}
        </Alert>
      </Snackbar>
      

        
      </CardBody>
    </Card>
  );
}
}



/*
{
    "id": 3,
    "firstname": "First",
    "lastname": "Last",
    "bio": "This is bio of user",
    "location": "Delhi",
    "company": "Coding Club",
    "interest": "Machine learning, web Development",
    "birth_date": "2020-05-05",
    "profile_picture": "/media/profile_pictures/shaurya_XAyHyEV.jpg",
    "resume": "/media/resume/userResume.txt",
    "branch": "ISE",
    "USN": "1RV18CS001",
    "website": "http://relayhack.herokuapp.com/",
    "linkedIn_ID": "http://relayhack.herokuapp.com/",
    "github_ID": "http://relayhack.herokuapp.com/",
    "codechef_id": "codechef",
    "codeforces_id": "codechef",
    "hackerrank_id": "codechef",
    "sem": "1",
    "user": 3,
    "skills": [
      1
    ]
  }

var markdown = markdown.parse(this.props.markdown);
        return <div dangerouslySetInnerHTML={{__html:markdown}} />;


*/



const mapStateToProps = state => {
  //state.reducer.name if combined reducer is used
  return {
    domain : state.domain,
    user : state.user,
    loggedIn : state.loggedIn,
    loggingIn : state.loggingIn,
    token: state.TOKEN
  }
}


const comp =  withStyles(style, {withTheme:true})(Typography);
export default connect(mapStateToProps)(comp);