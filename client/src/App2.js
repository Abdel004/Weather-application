import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import { response } from 'express';

import './App.css';

function App() {
  const [locName,setlocName] = useState('')
  const [lat, setlat] = useState(0)
  const [lon, setlong] = useState(0)
  const[locList, setlocList] = useState([])
  const[newLocName, setNewLocName] = useState('')
  const[newlat, setNewlat] = useState(0)
  const[newlon, setNewlon] = useState(0)

  

  useEffect(()=>{
    Axios.get("/allLocation").then((response)=>{
      setlocList(response.data);
    })
    },[])
  

  const addToList = () =>{
    Axios.post("/newLocation",{
      locName: locName,
      lat: lat,
      lon: lon
    }); 
  }

  const updateLocation = () => {
    Axios.post("/updateLocation",{
      newLocName: newLocName,
      newlat: newlat,
      newlon: newlon
    }) 
  }

  const  deleteLoc= () => {
    Axios.post("/deleteLocation",locName)
  }
  
  return (
    <div className="App">
      <h1> CRUD FOR USER </h1>
      <label> Name</label>
      <input type = "text" onChange={(event) => {setlocName(event.target.value)}}/>
      <label> Latitude </label>
      <input type = "number" onChange={(event) => {setlat(event.target.value)}}/>
      <label> Longitude</label>
      <input type = "number" onChange={(event) => {setlong(event.target.value)}}/>
      <button onClick={addToList}>Create Location</button>
      <h1> UserList</h1>
      {locList.map((val,key)=>{
        return (
        <div key = {key} className = "loc"> 
        <h1>{val.name}</h1> <h1>{val.latitude} </h1><h1>{val.longitude} </h1>
        <input type = "text" placeholder = "New Location Name" 
        onChange={(event) => {setNewLocName(event.target.value)}}></input>
        <input type = "number" placeholder = "New Latitude" 
        onChange={(event) => {setNewlat(event.target.value)}}></input>
        <input type = "number" placeholder = "New Longitude" 
        onChange={(event) => {setNewlon(event.target.value)}}></input>
        <button onClick={updateLocation}> Update </button>
        <button onClick={()=>deleteLoc(val.name)}> Delete User</button>
        </div>);
      })}
    </div>
  );
}

export default App;
