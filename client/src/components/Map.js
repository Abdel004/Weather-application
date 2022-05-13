import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
    width: '100%',
    height: '60%'
};

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}         // Shows the InfoWindow to the selected place upon a marker
    };

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={2}
                style={mapStyles}
                initialCenter={
                    {
                        lat: 22.28,
                        lng: 114.15
                    }
                }
            >
                {this.props.markers.map((loc, i) =>
                    <Marker
                        key={i}
                        onClick={() => console.log(loc.name)} // rerouting logic here
                        position={{lat: loc.latitude, lng: loc.longitude}}
                    />
                )}
            </Map>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDqqZNAZtnVcfFHcIA6bf_icnltZW5op-0'
})(MapContainer);