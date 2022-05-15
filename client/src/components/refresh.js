import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import styles from "./Edit.module.css";

function Refresh() {
  const [locList, setlocList] = useState([])

  useEffect(() => {
    Axios.get("/refreshData").then(() =>
      fetch("/locations/", { method: 'GET' })
        .then(response => response.json())
        .then(data => setlocList(data.response)))
  }, [])


  return (
    <div className={styles.App}>
      <h1> Refreshed data from API </h1>
      <div className="container">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Temperature</th>
              <th scope="col">Humidity</th>
              <th scope="col">wind_kph</th>
              <th scope="col">wind_dir</th>
              <th scope="col">precip_mm</th>
              <th scope="col">vis_km</th>
              <th scope="col">last_updated</th>
            </tr>
          </thead>
          <tbody>
            {locList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.temp_c}</td>
                  <td>{val.humidity}</td>
                  <td>{val.wind_kph}</td>
                  <td>{val.wind_dir}</td>
                  <td>{val.precip_mm}</td>
                  <td>{val.vis_km}</td>
                  <td>{val.last_updated}</td>
                </tr>
              )
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Refresh;
