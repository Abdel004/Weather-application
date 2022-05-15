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
      <h1> CRUD FOR Location </h1>
      <label>Location Name</label>
      <input className={styles.put} type="text" value={values.name} name="name"
        onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} />
      <label> Latitude </label>
      <input className={styles.put} type="number" value={values.latitude} name="latitude"
        onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }}
      />
      <label> Longitude</label>
      <input className={styles.put} type="number" value={values.longitude} name="longitude"
        onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} />
      {values.error && <p className={styles.error}>{values.error}</p>}
      <button className={styles.btn} onClick={addToList}>Create Location</button>
      <h1> Location List</h1>
      {locList.map((val, key) => {
        return (
          <div key={key} className={styles.user}>
            <h1>{val.name}</h1> <h1>{val.latitude} </h1><h1>{val.longitude} </h1>
            <input className={styles.put} type="text"  placeholder="New Location Name" name="name"
              onChange={(event) => { setNewValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} />
            <input className={styles.put} type="number" placeholder="New Latitude"  name="latitude"
              onChange={(event) => { setNewValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }}
            />
            <input className={styles.put} type="number" placeholder="New Longitude" name="longitude"
              onChange={(event) => { setNewValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }}></input>
            <button className={styles.btn} onClick={() => updateLocation(val.name)}> Update Location</button>
            <button className={styles.btn} onClick={() => deleteLoc(val.name)}> Delete Location</button>
          </div>);
      })}
    </div>
  );
}

export default App;
