import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FavLocations(props) {
    // const {username} = useParams();
    const [location, setLocation] = useState([]);

    useEffect(() => {
        axios.get(`/favourites/${props.username}`)
            .then((response) => setLocation(response.data))
    }, [props.username]);

    // const deleteLocation = (location) => {
    //     fetch(`/favourites/${props.username}/${location}`) // needs to be modified
    //         .then(res => res.json())
    //         .then(res => console.log(res))
    //         .then(window.location.reload())
    // }


    const displayFavs = location.map((location, key) =>
        <tr key={key}>
            <td>{location.name}</td>
            <td>{location.temp_c}</td>
            <td>{location.humidity}</td>
            {/* <td><button type="button" className={`btn btn-primary`} onClick={deleteLocation}>Delete</button></td> */}
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
                        {/* <th scope="col">Options</th> */}
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
