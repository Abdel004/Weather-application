import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '500px'
};
const center = {
    lat: -3.745,
    lng: -38.523
};

const MapContainer = (props) => {

    const [markers, setMarkers] = useState([])
    const [zoom, setZoom] = useState(2)
    
    useEffect(() => {
        if (!props.multipleLocations) {
            fetch("/locations/", { method: 'GET' })
                .then(response => response.json())
                .then(data => setMarkers(data.response))
        } else {
            fetch(`/location/${props.name}`, { method: 'POST' })
                .then(response => response.json())
                .then(data => setMarkers([data.response]))
            setZoom(10)
        }

    }, [props.multipleLocations, props.name])

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDqqZNAZtnVcfFHcIA6bf_icnltZW5op-0"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
            >
                {markers ? markers.map((loc, i) =>
                    <Marker
                        key={i}
                        onClick={() => console.log(loc.name)} // rerouting logic here
                        position={{ lat: loc.latitude, lng: loc.longitude }}
                    />
                ) : null}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}


export default React.memo(MapContainer);