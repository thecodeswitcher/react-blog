import React, { Component } from 'react';
import './App.css';
import BlogHeader from './components/BlogHeader.jsx';
import PostPreview from './components/PostPreview.jsx';
import { articleMetadata } from './constants/metadata';
import FrontPage from './components/FrontPage.jsx';
import BlogPost from './components/BlogPost.jsx';
import ReactHtmlParser from 'react-html-parser';
//handleClick

class App extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    const metaData = [];
    const blogPosts = {};
    console.log("Rebuilding the metadata array!");
    for (let i=0; i<articleMetadata.length; i++){
      metaData.push(<PostPreview title={articleMetadata[i].title} 
                                 description={articleMetadata[i].description} 
                                 key={i}
                                 handleClick={this.handleClick}
                                 />);
      blogPosts[articleMetadata[i].title] = <BlogPost htmlString={articleMetadata[i].text} 
                              key={i} 
                              articleTitle={articleMetadata[i].title}                              
                    />
    }
    
    
    this.state={
      displayFirstPage:true,
      metaData,
      blogPosts,
      displayBlog:'',
    };
    
  
  }

  
  
  render() {
    let blogPostToDisplay;
    if(this.state.displayBlog){
      blogPostToDisplay = (<div className='CurrentBlogPost'>
                           <button onClick={this.handleClick}>Home</button>
                            {ReactHtmlParser(this.state.blogPosts[this.state.displayBlog].props.htmlString)}
                          
                          </div>)
    }
    
    console.log(`Display first page? ${this.state.displayFirstPage}`);
    console.log(`displayBlog? ${this.state.displayBlog}`);

    return (
      <div className="App">
        <BlogHeader/>
        {this.state.displayFirstPage && <FrontPage/>}        
        {this.state.displayFirstPage && this.state.metaData}
        {this.state.displayBlog && blogPostToDisplay}
      </div>
    );
  }
  
  // componentDidMount(){
  //   console.log(this.state);
  //   console.log(this.toggleArticle);
  // }

  // componentDidUpdate(){
  //   console.log(this.state);
  //   if(this.state.displayBlog){
  //     console.log(`Display blog is not empty!`);
  //     console.log(this.state)
  //   };
  // }

  handleClick(e){
    // console.log('clicked!');
    // console.log(e.target.parentNode);
    const stateCopy = {...this.state};
    stateCopy.displayFirstPage = !stateCopy.displayFirstPage;
    if(!stateCopy.displayBlog){
      const blogTitle = e.target.parentNode.title ? e.target.parentNode.title: e.target.title;
      console.log(`Ok!, going to display ${blogTitle}`);
      stateCopy.displayBlog = blogTitle;
      if(!e.target.parentNode.title){
        console.log(e.target);
      }
    } else{
      console.log('Going back to the main page.');
      stateCopy.displayBlog = '';
    }
    this.setState(stateCopy);
  }
}

export default App;
