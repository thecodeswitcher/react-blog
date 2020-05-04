import React,{Component} from 'react';

class PostPreview extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='PostPreview' onClick={this.props.toggleDisplayBlog} title={this.props.title}>
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </div>
        );
    }
}
export default PostPreview;
