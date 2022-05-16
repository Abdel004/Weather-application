import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from "./Edit.module.css";

function App() {
  const [values, setValues] = useState({
    name: '',
    latitude: '',
    longitude: '',
    error: ''
  })
  const [newValues, setNewValues] = useState({
    name: '',
    latitude: '',
    longitude: '',
    error: ''
  })
  const [locList, setlocList] = useState([])
  const [refresh, setRefresh] = useState(false)

//Get all Locations
  useEffect(() => {
    axios.get("/allLocation").then((response) => {
      setlocList(response.data.response);
    })
  }, [refresh])

//Add new Location 
  const addToList = () => {
    axios.post("/newLocation", {
      name: values.name,
      latitude: values.latitude,
      longitude: values.longitude
    }).then(() => {
      setValues(rest => {
        return ({
          name: '',
          latitude: '',
          longitude: '',
          error: ''
        })
      })
      setRefresh((ref) => !ref)
    },
      error => {
        setValues(rest => {
          return ({
            ...rest,
            error: 'Input does not match with data from the API'
          })
        })
      }
    )
  }

 //Update existing Location
  const updateLocation = (old) => {
    axios.post("/updateLocation",
      {
        name: newValues.name,
        latitude: newValues.latitude,
        longitude: newValues.longitude,
        oldname: old
      }).then(() => {
        setRefresh((ref) => !ref)
      },
        error => {
          setNewValues(rest => {
            return ({
              ...rest,
              oldUserName: old,
              error: 'Input does not match with data from the API'
            })
          })
        }
      )
  }

  //Delete Location
  const deleteLoc = (name) => {
    axios.delete("/deleteLocation", {
      data: {
        name: name
      }
    }).then(() => setRefresh((ref) => !ref))
  }

  return (
    <div className={styles.App}>    
      <div className="h1 text-white mt-3 font-weight-bold">CRUD FOR LOCATION</div> 
      <div className="form-group w-25 mt-5">
        <div className="h3 text-white" for="example2">Location Name</div>
        <input className="form-control" type="text" value={values.name} name="name" onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} />
      </div>
      <div className="form-group w-25 mt-3">
          <div className="h3 text-white" for="example2">Latitude</div>
          <input className="form-control" type="number" value={values.latitude} name="latitude" onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }}/>
      </div>
      <div className="form-group w-25 mt-3">
          <div className="h3 text-white" for="example2">Longitude</div>
          <input className="form-control"  type="number" value={values.longitude} name="longitude" onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} />
      </div>
        {values.error && <p className={styles.error}>{values.error}</p>}
      <button className="btn btn-primary btn-lg mt-3 mb-5" onClick={addToList}>Create Location</button>
      <div className='h1 text-white mb-4 font-weight-bold'>Location List</div> 
      <div className="border border-white p-5 ">
      {locList.map((val, key) => {
        return (
          <div key={key} className={styles.user}>
            <div className="container d-flex justify-content-between">
            
             
            
            </div>
            <div className="input-group mb-5 col-xs-2">
            <div>
                <div className='h6 text-white'>{val.name}</div> 
                <input className="form-control-lg"  type="text"  placeholder="Update Location Name" name="name" onChange={(event) => { setNewValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} />
            </div>
            <div>
                <div className='h6 text-white'>{val.latitude}{'\u00b0'}</div>
                <input className="form-control-lg " type="number" placeholder="Update Latitude"  name="latitude" onChange={(event) => { setNewValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }}/>  
            </div>
            <div>
                <div className='h6 text-white'>{val.longitude}{'\u00b0'}</div>
                <input className="form-control-lg " type="number" placeholder="Update Longitude" name="longitude" onChange={(event) => { setNewValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }}></input>
            </div>
            <div className="d-inline mt-4">
              <button className="btn btn-primary btn-lg" onClick={() => updateLocation(val.name)}> Update Location</button>
            </div>
      
            
            <div className="d-inline mt-4 ">
            <button className="btn btn-secondary btn-lg" onClick={() => deleteLoc(val.name)}> Delete Location</button>
            </div>
         
          </div>
          </div>
          );
      })}
    </div>
    </div>
  );
}

export default App;
