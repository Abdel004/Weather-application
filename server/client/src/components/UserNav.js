import { Link } from 'react-router-dom';


const UserNav = (props) => {

    return (
        <div id="menuwrapper">
            <h4 className="check" style={{ textAlign: "right" }}> {props.username} | <button onClick={() => window.location.href = '/logout'}>Logout </button></h4>
            <h1 className="check">Weather API <i className='fa-solid fa-cloud' /> </h1>
            <ul className="check">
                <li><Link to="/locations">Location Details</Link></li>
                <li><Link to="/map">Locations map</Link></li>
                <li><Link to="/fav">Favourites</Link></li>
                <li><Link to="/search">location Search</Link></li>
            </ul>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default UserNav

