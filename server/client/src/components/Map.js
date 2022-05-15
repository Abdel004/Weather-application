import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';



const containerStyle = {
    width: '100%',
    height: '500px'
};
const center = {
    lat: -3.745,
    lng: -38.523
};

const MapContainer = () => {
    let navigate = useNavigate();
    const [markers, setMarkers] = useState([])

    useEffect(() => {
            fetch("/locations/", { method: 'GET' })
                .then(response => response.json())
                .then(data => setMarkers(data.response))
    }, [])

    const handleClick = (name) => {
        navigate(`/map/${name}`) // edit link to go to main component
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDqqZNAZtnVcfFHcIA6bf_icnltZW5op-0"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={2}
            >
                {markers ? markers.map((loc, i) =>
                    <Marker
                        key={i}
                        onClick={() => handleClick(loc.name)}
                        position={{ lat: loc.latitude, lng: loc.longitude }}
                    />
                ) : null}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}


export default React.memo(MapContainer);