import React from 'react';
import {Router, Route, IndexRoute, IndexLink, Link} from "react-router";

var App = React.createClass({
  render: function() {
    return (
   
      <div id="menuwrapper">
        <h1>Weather API <i className='fa-solid fa-cloud'/> </h1>
        <ul>
          <li><IndexLink to="/" activeClassName="active">Location Details</IndexLink></li>
          <li className="dropdown">
            <Link to="/about" activeClassName="active">Information</Link>
              <div className="dropdown-content">
                    <Link to="/mi1" activeClassName="active">Map</Link>
                    <Link to="/mi2" activeClassName="active">Comments</Link> 
              </div>
          </li>  
          <li><Link to="/fav" activeClassName="active">Favourites</Link></li>
        </ul>
        <div className="content">
            {this.props.children}
        </div>
      </div>
    )
  }
});

export default App;