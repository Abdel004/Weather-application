
import React,{useState, useEffect}  from 'react';
import Axios from 'axios';
import styles from "./search.module.css";

//Search Location with keyword
function Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const[locationList, setLocations] = useState([])

  useEffect(()=>{
    Axios.post("/keywordlocation").then((response)=>{
      setLocations(response.data);
    })
    },[])


  return (
    <div className="App">
      <input type = "text" className = {styles.search} placeholder = "Search by Name..." onChange={e =>{
        setSearchTerm(e.target.value);
        }}
        />

        <table className = {styles.search}> 
        <tr>
              <th> Location </th>
              <th> Humidity </th>
              <th> Temperature </th>
          </tr>
          </table>
      {locationList.filter((val) =>{
        if (searchTerm === ""){
          return val
        }
        else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
          return val
        }
      }).map((val,key) =>{ 
        return (
        <div className="user" key={key}>
          <table className = {styles.search}>
          <tr>
          <td>{val.name} </td>
          <td> {val.humidity} </td>
          <td> {val.temp_c} </td>
          </tr>
          </table>
          </div>)
      })}
    </div>
  );
}

export default Search;
