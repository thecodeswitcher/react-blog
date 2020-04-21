import React,{Component} from 'react';
import ReactHtmlParser from 'react-html-parser';

class BlogPost extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (<div>It worked!</div>);
        // return <div>{ ReactHtmlParser(this.props.htmlString) }</div>;
    }
}

export default BlogPost;