import React, { Component } from 'react';
import './App.css';
import BlogHeader from './components/BlogHeader.jsx';
import PostPreview from './components/PostPreview.jsx';
import { articleMetadata } from './constants/metadata';
import FrontPage from './components/FrontPage.jsx';
import BlogPost from './components/BlogPost.jsx';
import AllPreviews from './components/AllPreviews.jsx';
import SectionHeaders from './components/SectionHeaders.jsx';
import ReactHtmlParser from 'react-html-parser';
import SideNav from './components/SideNav';
//toggleDisplayBlog

class App extends Component {
  constructor(props){
    super(props);
    this.toggleDisplayBlog = this.toggleDisplayBlog.bind(this);
    this.toggleAllPreview = this.toggleAllPreview.bind(this);
    const metaData = [];
    const blogPosts = {};
    console.log("Rebuilding the metadata array!");
    for (let i=0; i<articleMetadata.length; i++){
      metaData.push(<PostPreview title={articleMetadata[i].title} 
                                 description={articleMetadata[i].description} 
                                 key={i}
                                 toggleDisplayBlog={this.toggleDisplayBlog}
                                 />);
      blogPosts[articleMetadata[i].title] = articleMetadata[i];                       
                  
    }
    
    
    this.state={
      displayFirstPage:true,
      metaData,
      blogPosts,
      displayBlog:'',
      displayAllPreviews:false,
      topOfPage: true,
    };

    this.homeClick = this.homeClick.bind(this);
    this.previewClick=this.previewClick.bind(this);
    this.openNav=this.openNav.bind(this);
    this.closeNav=this.closeNav.bind(this);

    // this.getHeaderAndContentXY = this.getHeaderAndContentXY.bind(this);
    
  
  }

  render() {
    let blogPostToDisplay;
    if(this.state.displayBlog){
      blogPostToDisplay = (<div className='CurrentBlogPost'>  
                            <article>
                            {ReactHtmlParser(this.state.blogPosts[this.state.displayBlog].text)}
                            </article>                                                     
                          </div>)
    }
    
    console.log(`Display first page? ${this.state.displayFirstPage}`);
    console.log(`displayBlog? ${this.state.displayBlog}`);

    return (
      <div className="App">
          
          <BlogHeader handleClick={this.closeNav}
                      displayFirstPage={this.state.displayFirstPage} 
                      openNav={this.openNav} 
                      
                      />
          <SideNav 
            closeNav={this.closeNav}
            homeClick={this.homeClick} 
            allBlogsClick={this.previewClick} 
            displayPreviews={this.state.displayAllPreviews}
            displayFirstPage={this.state.displayFirstPage}
            sections={this.state.displayBlog ? this.state.blogPosts[this.state.displayBlog].sections : null}
          />
          <div id="content" onClick={this.closeNav}>
            {this.state.displayFirstPage && <FrontPage/>}       
            {this.state.displayFirstPage && <AllPreviews metaData={this.state.metaData[0]}/>}
            {this.state.displayAllPreviews && <AllPreviews metaData={this.state.metaData} onClick={this.toggleAllPreview} displayButton={this.state.displayAllPreviews}/>}
            {this.state.displayBlog && blogPostToDisplay}
          </div>

      </div>
    );
  }
  
  componentDidMount(){
    console.log(`
    displayPreviews: ${this.state.displayAllPreviews}
    displayFirstPage: ${this.state.displayFirstPage}
    displayBlog: ${this.state.displayBlog}
    `);
    // console.log(this.state);
    // console.log(this.toggleArticle);
    // console.log('content position ', document.getElementById('content').getBoundingClientRect());
    // window.addEventListener('scroll', this.getHeaderAndContentXY);
    window.onscroll = () => {
      let backColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--backColor');
      
      if(!this.state.displayFirstPage){
        const nav = document.querySelector('#full-header');
        
        // if(this.scrollY <= 10) nav.className = ''; else nav.className = 'scroll';
        // console.log(scrollY);
        if(scrollY <=100){
          console.log('At the top!');
          nav.className = 'nonScrolledNav';
          nav.style.width = '100%';

          // headercolor same as body
          document.documentElement.style
            .setProperty('--headerColor', backColor);
        
        } else {
          nav.className = 'scrolledNav';
          nav.style.width = '10%';

          //headercolor transparent
          document.documentElement.style
            .setProperty('--headerColor', 'transparent');
        }
      } else{
        const nav = document.querySelector('#full-header');
        nav.className = 'nonScrolledNav';
        nav.style.width = '100%';
        // headercolor same as body
        document.documentElement.style
        .setProperty('--headerColor', backColor);
      }

      }
  }

  componentDidUpdate(){
    console.log(`
    displayPreviews: ${this.state.displayAllPreviews}
    displayFirstPage: ${this.state.displayFirstPage}
    displayBlog: ${this.state.displayBlog}
    `);

    // console.log(this.state);
    // if(this.state.displayAllPreviews){
    //   console.log(`Should now display All Previews`);
    //   console.log(this.state)
    // };
    document.getElementById('content').scrollIntoView({behavior: "smooth"});

    // console.log('content position ', document.getElementById('content').getBoundingClientRect());
    // console.log('Header position ', document.getElementById('logo-and-title').getBoundingClientRect());
    
  }

  // getHeaderAndContentXY(){
  //   if (!this.state.displayFirstPage){

  //     const contentY = document.getElementById('section1').getBoundingClientRect()['y'];
  //     const headerY = document.getElementById('logo-and-title').getBoundingClientRect()['height'];
  //     if (this.state.topOfPage && contentY < headerY){
  //       this.setState({topOfPage:false});
  //       console.log('Section 1 now underneath header!');
  //       console.log('Header position ', headerY);
  //       console.log('content position ', contentY);        
  //     }
  //     if(!this.state.topOfPage && contentY >= headerY){
  //       this.setState({topOfPage:true});
  //       console.log('Section 1 now below header!');
  //       console.log('Header position ', headerY);
  //       console.log('content position ', contentY);        
  //     }


  //     // if (headerY === contentY){    
  //     //   console.log('At the top of document!');
  //     //   this.setState({topOfPage:true});
  //     // }
  
  //     // if (this.state.topOfPage &&  headerY !== contentY){
  //     //   this.setState({topOfPage:false});
  //     //   console.log('no longer at top of page')
  //     // }
  //   }
  // }

  toggleDisplayBlog(e){

    const stateCopy = {...this.state};
    // then get the title of the blog
    if(!stateCopy.displayBlog){
      // this depends on where the user clicks
      // if the user clicks on the parent div, then we'll grab the title directly. If it's one of the children, move
      // up one level to get the title.
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
    stateCopy.displayFirstPage = stateCopy.displayBlog ? stateCopy.displayFirstPage = false: stateCopy.displayFirstPage = true;
    //displayAllPreviews
    stateCopy.displayAllPreviews = stateCopy.displayBlog ? stateCopy.displayAllPreviews = false: stateCopy.displayAllPreviews = true;
    this.setState(stateCopy);
  }

  toggleAllPreview(e){
    // console.log(`Now changing the following properties
    // displayAllPreviews: ${this.state.displayAllPreviews} -> ${!this.state.displayAllPreviews}
    // displayFirstPage: ${this.state.displayFirstPage} -> ${!this.state.displayFirstPage}
    // `);
    this.setState({displayAllPreviews: !this.state.displayAllPreviews,
                   displayFirstPage: !this.state.displayFirstPage,
    });
  }

  homeClick(){
    this.setState({
      displayAllPreviews: false,
      displayFirstPage: true,
      displayBlog: '',
    })
  }

  previewClick(){
    this.setState({
      displayAllPreviews: true,
      displayFirstPage: false,
      displayBlog: '',
    })
  }

  openNav(){
    document.getElementById('sidenav').style.width='250px';
  }

  closeNav(){
    document.getElementById('sidenav').style.width='0';
  }


}

export default App;
