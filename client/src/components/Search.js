
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./search.module.css";

//Search Location with keyword
function Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationList, setLocations] = useState([])

  useEffect(() => {
    axios.post("/keywordlocation", {
      name: searchTerm
    }).then((response) => {
      setLocations(response.data);
    })
  }, [searchTerm])


  return (
    <div className="App">
      <input type="text" className={styles.search} placeholder="Search by Name..."
        onChange={e => { setSearchTerm(e.target.value); }} />

      <table className={styles.search}>
        <thead>
          <tr >
            <th className={styles.th} scope="col"> Location </th>
            <th className={styles.th} scope="col"> Humidity </th>
            <th className={styles.th} scope="col"> Temperature </th>
          </tr>
        </thead>
        <tbody>
          {locationList.filter((val) => {
            if (searchTerm === "") {
              return val
            }
            else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            } else {
              return null
            }
          }).map((val, key) => {
            return (
              <tr className={styles.tr} key={key}>
                <td className={styles.td}>{val.name} </td>
                <td className={styles.td}> {val.humidity} </td>
                <td className={styles.td}> {val.temp_c} </td>
              </tr>)
          })}
        </tbody>
      </table>

    </div>
  );
}

export default Search;
