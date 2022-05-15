import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const MapLoc = () => {

    let { name } = useParams()
    const [marker, setMarkers] = useState(null)

    useEffect(() => {
        fetch(`/location/${name}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setMarkers(data.response))
    }, [name])
 
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDqqZNAZtnVcfFHcIA6bf_icnltZW5op-0"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center= {marker ? {
                    lat: marker.latitude, lng: marker.longitude 
                } : center}
                zoom={10}
            >
                {marker ? <Marker position={{ lat: marker.latitude, lng: marker.longitude }}/> : null}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}


export default React.memo(MapLoc);