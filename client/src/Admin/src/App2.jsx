import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (

      <div id="menuwrapper">
        <h4 className="check" style={{ textAlign: "right" }}> {this.props.username} | <button onClick={() => this.props.removeCookies() && <Link to="/"></Link>}>Logout </button></h4>
        <h1 className="check">Weather API <i className='fa-solid fa-cloud' /> </h1>
        <ul className="check">
          <li><Link to="/" >Data Requests</Link></li>
          <li><Link to="/user" >User CRUD</Link></li>
          <li><Link to="/loc">Location CRUD</Link></li>
        </ul>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
