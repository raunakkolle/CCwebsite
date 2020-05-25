import React from 'react';
import './Card.css';
import axios from 'axios';

class BlogCard extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      blogs:[]
    };

  };

  // componentDidMount(){

  //   let config = {
  //     headers: {
  //       Authorization: "TOKEN 5d54bede23d64e548cb696343722589497cf1325",
  //     }
  //   }

  //   console.log("MAKING API CALL")
  //    axios.get('http://127.0.0.1:8000/blogs/', {
  //       headers: {
  //         Authorization: "TOKEN 5d54bede23d64e548cb696343722589497cf1325"
  //       }
  //     })
  //     .then(function (response) {
  //       // console.log(response.data);
  //       const blogs = response.data
  //       // this.setState({ blogs });

  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       // console.log(this.state);
  //     });
  // }

   // "id": 1,
   //      "creationDate": "2020-05-04",
   //      "publish": true,
   //      "title": "aa",
   //      "content": "aaa",
   //      "tags": "aaaa",
   //      "author": {
   //          "id": 8,
   //          "name": "Anonymous",
   //          "profile": "/media/profile_pictures/default.png"
   //      },
   //      "category": 1
   // <img alt="image" src="http://127.0.0.1:8000/media/blog_background/default.jpg"/>

  render() {
    const tags = this.props.blog.tags.split(",").filter((tag)=>(tag)).map((tag)=>(<div>{tag}</div>))
    const background = "http://127.0.0.1:8000" + this.props.blog.background;
    console.log(background)
    // const background = "http://127.0.0.1:8000/media/blog_background/fedora_29_background-wallpaper-3840x2160.jpg";
    

    return (
      <div class="plx-card gold" onClick={this.props.onClick}>
        <div class="pxc-bg" style={{backgroundImage: "url(" + background + ")"}}>  </div>
        <div class="pxc-avatar"><img src={"http://127.0.0.1:8000"+this.props.blog.author.profile}/></div>
        <div class="pxc-stopper">   </div>
        <div class="pxc-subcard">
          <div class="pxc-title">{this.props.blog.title}</div>
            
          <div class="pxc-sub">{this.props.blog.tagline} </div>
          {/*<div class="pxc-feats">{this.props.blog.title}
          </div>*/}
          <div class="pxc-tags">
            {tags}
          </div>
          <div class="bottom-row"> 
            <div class="pxc-info">
              {/*<div class="flags">
              <span><img src="http://pollux.fun/images/flags/EN.png"/>
              </span><span><img src="http://pollux.fun/images/flags/BR.png"/>
              </span><span><img src="http://pollux.fun/images/flags/FR.png"/></span>
              <span><img src="http://pollux.fun/images/flags/TR.png"/></span><span>
              <img src="http://pollux.fun/images/flags/JP.png"/></span>
              </div>*/}
              <div class="region">{this.props.blog.creationDate}</div>
            </div>
            {/*
            <div class="links"><a class="site" uk-tooltip="WEBSITE"><i class="fas fa-globe-americas"> </i></a>
            <a class="link discordLink" uk-tooltip="DISCORD SERVER"><i class="fab fa-discord"></i></a>
            <a class="shop" uk-tooltip="EXCLUSIVE POLLUX SHOP"><i class="fas fa-shopping-bag"> </i></a>
            </div>
            */}
          </div>
        </div>
      </div>
    );
  }

}

export default BlogCard;
