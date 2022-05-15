import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./login.module.css";

function FavLocations(props) {
    // const {username} = useParams();
    const [location, setLocation] = useState([]);

    useEffect(() => {
        axios.get(`/favourites/${props.username}`)
            .then((response) => setLocation(response.data))
    }, [props.username]);

    const deleteLocation = (location) => {
        fetch(`/favourites/${props.username}/${location}`) // needs to be modified
            .then(res => res.json())
            .then(res => console.log(res))
            .then(window.location.reload())
    }


    const displayFavs = location.map((location) =>
        <tr>
            <td>{location.name}</td>
            <td>{location.temp_c}</td>
            <td>{location.humidity}</td>
            <button type="button" className={`btn btn-primary btn-lg`} onClick={deleteLocation}>Delete</button>
        </tr>
    );

    return (
        <div className="container">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Temperature</th>
                        <th scope="col">Humidity</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {displayFavs}
                </tbody>
            </table>
        </div>
    )
}

export default FavLocations;
