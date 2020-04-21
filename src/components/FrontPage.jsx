import React, {Component} from 'react';

class FrontPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        
        return (
        <div>
        <img className='meditating-lake' src={require('../chair_at_lake.jpg')} alt="Mindfully meditating by the lake." />          
        <p className="App-intro">
          Freedom through agency
        </p>
        <p className="homepage-copy">
          Agency is the capacity to act and choose regardless of outside influences. 
        </p>
        <p className="homepage-copy">Despite the ease of running on autopilot, it is now more important to make conscious and thoughtful decisions.</p>
        <p className="homepage-copy">For me, agency is made of two capacities:</p>
        <ol>
          <li>constant presence and awareness of choice</li>
          <li>ability to make mental space, breathe, and make conscious decisions at all times</li>
        </ol>
        </div>
        );
    }
}

export default FrontPage;