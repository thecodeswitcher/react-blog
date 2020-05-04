import React from 'react';

const BlogHeader = (props) => {

    return (
        <div id='full-header'>
            <div id='logo-and-title'>
                <h3>The Mindful Programmer</h3>                 
            </div>
            <span id='dots' onClick={props.openNav}>...</span>
        </div>
    );
}

export default BlogHeader;
