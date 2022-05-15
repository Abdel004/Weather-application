import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function FavLocations (props) {
    const {username} = useParams();
    const [location, setLocation] = useState();

    const displayFavs = location.map((location) =>
        <tr>
            <td>{location.name}</td>
            <td>{location.temp_c}</td>
            <td>{location.humidity}</td>
            <button type="button" className="btn btn-primary btn-lg" onClick={deleteLocation}>Delete</button>
        </tr>
    );

    const getLocation = async() => {
        const res = await fetch('/locations/favLoc/${username}'); // needs to be modified
        const response = await res.json();
        setLocation(response);
    };

    useEffect(() => {
        getLocation();
    });

    const deleteLocation = (location) => {
        fetch('/locations/favLoc/${username}/${location}') // needs to be modified
        .then(res => res.json())
        .then(res => console.log(res))
        .then(window.location.reload())
    }

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