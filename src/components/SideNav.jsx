import React from 'react';
import AllPreviews from './AllPreviews';

const scrollToSection = scrollTo => {
    // scrollTo = 'section2';
    // console.log(document.getElementById('logo-and-title').getBoundingClientRect());
    const yOffset = document.getElementById('full-header').getBoundingClientRect().height;
    let targetedEl = document.getElementById(scrollTo);
    console.log(`scrolling to ${scrollTo}`);
    // console.log(targetedEl.getBoundingClientRect());
    // const superScroll = target => window.scrollTo({top: target.getBoundingClientRect().top - yOffset,behavior:'smooth'});
    // window.scrollTo({top: targetedEl.getBoundingClientRect().top - yOffset
                    // ,behavior:'smooth'});
    targetedEl.scrollIntoView({behavior:'smooth', block:'start'});
    document.getElementById('sidenav').style.width='0';
    // window.scrollBy(0, yOffset); 
    
}

const darkToggle = () =>{
    
    let darkModeOn = document.getElementById('switch-input').checked === true;
    let textColor;
    let backColor;
    let headColor;
    if(darkModeOn){
        console.log("Turning dark Mode on!");
        textColor = 'white';
        backColor = 'black';
        headColor = 'black';
    } else {
        console.log("Turning dark Mode off!");
        textColor = 'black';
        backColor = 'white';
        headColor = 'white';
    }
    document.documentElement.style
    .setProperty('--textColor', textColor);
    //--headerColor
    document.documentElement.style
    .setProperty('--backColor', backColor);
    document.documentElement.style
    .setProperty('--headerColor', headColor);
}

// onChange={()=> {
//     let targetedId = options[document.getElementById("sections").selectedIndex].props.id;                       
//     const scrollingTo = `section${targetedId}`;
//     console.log(`Scrolling to ${scrollingTo}`);
//     scrollToSection(scrollingTo);
// }

const SideNav = props => {
    const sectionLi = [];
    if (props.sections){
        for (let i = 0; i<props.sections.length; i++){
            sectionLi.push(<li                                 
                                key={i} 
                                onClick={()=> scrollToSection(`section${i+1}`)}
                            >
                                {props.sections[i]}
                            </li>
                          );
        }
    }
    return (
        <div id='sidenav'>
            <div id='closeSideNav' onClick={props.closeNav}>X</div>
            <div id='darkToggle'>
                <h3>Dark Mode</h3>
                <label className="switch" >
                    <input id='switch-input' className="switch-input" type="checkbox" onClick={darkToggle}/>
                    <span className="switch-label" data-on="On" data-off="Off"></span> 
                    <span className="switch-handle"></span> 
                </label>
            </div>
            
            <ul id='home-preview-ul'>
                {!props.displayFirstPage && <li onClick={props.homeClick}>Home</li>}
                {!props.displayPreviews && <li onClick={props.allBlogsClick}>All Blogs</li>}
            </ul>
                {props.sections && <ul id='sections-ul'>{sectionLi}</ul> }
        </div>
    );
}

export default SideNav;