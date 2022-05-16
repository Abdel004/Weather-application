import { Link } from 'react-router-dom';


const UserNav = (props) => {

    const handleClick = () => {
        window.location.href = '/logout';
    }

    return (
        <div id="menuwrapper">
        <h4 className="check" style={{ textAlign: "right" }}> {props.username} | <button onClick={handleClick} className="btn btn-outline-light btn-lg">Logout </button></h4>
        <h1 className="check">Weather API <i className='fa-solid fa-cloud' /> </h1>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="list-inline">
          <li className="list-inline-item" style={{ width: "465px", textAlign: "center" }}><Link to="/requests" >Data Refresh</Link></li>
          <li className="list-inline-item " style={{ width: "465px",textAlign: "center" }}><Link to="/user" >User CRUD</Link></li>
          <li className="list-inline-item " style={{ width: "465px",textAlign: "center"  }}><Link to="/loc">Location CRUD</Link></li>
        </ul>
        </nav>
        <div className="content">
          {props.children}
        </div>
      </div>
    )
}

export default UserNav
