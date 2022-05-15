import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const MapLoc = (props) => {

    let { name } = useParams()
    const [marker, setMarkers] = useState(null)
    const [check, setChecker] = useState('')

    useEffect(() => {
        fetch(`/location/${name}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setMarkers(data.response))
    }, [name])
    
    useEffect(() => {
        fetch(`/location/${name}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setChecker(data.response))
    }, [name])
 
    return (
        <div>
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
    <div className = "display">
            <table className="table table-dark">
                <tbody>
                <tr > 
                    <th> Attribute </th>
                    <th> Attribute Value</th>
                </tr>
                <tr >
                    <td> Name </td>
                    <td> {check.name} </td>
                </tr>
                <tr >
                    <td> Latitude </td>
                    <td> {check.latitude} </td>
                </tr>
                <tr >
                    <td> Longitude </td>
                    <td> {check.longitude} </td>
                </tr>
                <tr>
                    <td> Humidity </td>
                    <td> {check.humidity} </td>
                </tr>
                <tr>
                    <td> Precipitation </td>
                    <td> {check.precip_mm} </td>
                </tr>
                <tr>
                    <td> Temperature </td>
                    <td> {check.temp_c}</td>
                </tr>
                <tr>
                    <td> Visibility </td>
                    <td> {check.vis_km} </td>
                </tr>
                <tr>
                    <td> Wind Direction </td>
                    <td> {check.wind_dir} </td>
                </tr>
                <tr>
                    <td> Wind Speed </td>
                    <td> {check.wind_kph}</td>
                </tr>
                <tr>
                    <td> Last Update of Data </td>
                    <td> {check.last_updated} </td>
                </tr>
                </tbody>
            </table>
            </div> 
            <Comments username={props.username} name={check.name}/>
    </div>
    )
}


export default React.memo(MapLoc);
