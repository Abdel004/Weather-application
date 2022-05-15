import { Link } from 'react-router-dom';


const UserNav = (props) => {

    const handleClick = () => {
        window.location.href = '/logout';
    }

    return (
        <div id="menuwrapper">
        <h4 className="check" style={{ textAlign: "right" }}> {props.username} | <button onClick={handleClick}>Logout </button></h4>
        <h1 className="check">Weather API <i className='fa-solid fa-cloud' /> </h1>
        <ul className="check">
          <li><Link to="/requests" >Data Refresh</Link></li>
          <li><Link to="/user" >User CRUD</Link></li>
          <li><Link to="/loc">Location CRUD</Link></li>
        </ul>
        <div className="content">
          {props.children}
        </div>
      </div>
    )
}

export default UserNav