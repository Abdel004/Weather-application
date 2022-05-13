import { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
    width: '50%',
    height: '100%'
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
        <Map
            google={props.google}
            zoom={zoom}
            style={mapStyles}
            initialCenter={
                {
                    lat: 22.28,
                    lng: 114.15
                }
            }
        >
            {markers ? markers.map((loc, i) =>
                <Marker
                    key={i}
                    onClick={() => console.log(loc.name)} // rerouting logic here
                    position={{ lat: loc.latitude, lng: loc.longitude }}
                />
            ) : null}
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDqqZNAZtnVcfFHcIA6bf_icnltZW5op-0'
})(MapContainer);