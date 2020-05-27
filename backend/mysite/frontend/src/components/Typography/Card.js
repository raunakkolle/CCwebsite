import React from 'react';
import './Card.css';
import axios from 'axios';
import SERVER_URL from 'Server'
class BlogCard extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      blogs:[]
    };

  };

  render() {
    const tags = this.props.blog.tags.split(",").filter((tag)=>(tag)).map((tag)=>(<div>{tag}</div>))
    const background = SERVER_URL + this.props.blog.background;
    console.log(background)
    

    return (
      <div class="plx-card gold" onClick={this.props.onClick}>
        <div class="pxc-bg" style={{backgroundImage: "url(" + background + ")"}}>  </div>
        <div class="pxc-avatar"><img src={SERVER_URL  +this.props.blog.author.profile}/></div>
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
