import React,{Component} from 'react';

class SectionHeader extends Component{
    constructor(props){
        super(props);
        this.myDivToFocus = React.createRef();
        this.scrollToSection = this.scrollToSection.bind(this);
    }

    scrollToSection(e){
        if(this.myDivToFocus.current){
            this.myDivToFocus.current.scrollIntoView({ 
               behavior: "smooth", 
               block: "nearest"
            })
        }
    }

    render(){
        return (<div ref={this.myDivToFocus}/>);
    }
}

export default SectionHeader;