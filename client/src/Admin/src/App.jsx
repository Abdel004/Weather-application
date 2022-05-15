import React from 'react';
import {Router, Route, IndexRoute, IndexLink, Link, useHistory} from "react-router";
var App = React.createClass({
  render: 
  function() {
    return (
      
      <div id="menuwrapper">
        <h4 className = "check" style = {{textAlign: "right"}}> {this.props.username} | <button onClick={() => removeCookies() && <Link to ="/"></Link>}>Logout </button></h4>
        <h1 className = "check">Weather API <i className='fa-solid fa-cloud'/> </h1>
        <ul className = "check">
          <li><IndexLink to="/" activeClassName="active">Data Requests</IndexLink></li>
          <li><Link to="/user" activeClassName="active">User CRUD</Link></li>
          <li><Link to="/loc" activeClassName="active">Location CRUD</Link></li>
        </ul>
        <div className="content">
            {this.props.children}
        </div>
      </div>
    )
  }
});

export default App;

