import { Link } from 'react-router-dom';


const UserNav = (props) => {

    return (
        <div id="menuwrapper">
            <h4 className="check" style={{ textAlign: "right" }}> {props.username} | <button className="btn btn-outline-light btn-lg" onClick={() => window.location.href = '/logout'}>Logout </button></h4>
            <h1 className="check">Weather API <i className='fa-solid fa-cloud' /> </h1>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="list-inline">
                    <li className="list-inline-item" style={{ width: "345px", textAlign: "center" }} ><Link to="/locations">Location Details</Link></li>
                    <li className="list-inline-item" style={{ width: "345px", textAlign: "center" }}><Link to="/map">Locations map</Link></li>
                    <li className="list-inline-item" style={{ width: "345px", textAlign: "center" }}><Link to="/fav">Favourites</Link></li>
                    <li className="list-inline-item" style={{ width: "345px", textAlign: "center" }}><Link to="/search">location Search</Link></li>
                </ul>
            </nav>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default UserNav

