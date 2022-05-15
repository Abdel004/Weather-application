import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import styles from "./Edit.module.css";

function App() {
  const[locList, setlocList] = useState([])
  const [locName] = useState(0)
  const [last_updated] = useState(0)
  const [temp_c] = useState(0)
  const [wind_kph] = useState(0)
  const [wind_dir] = useState(0)
  const [humidity] = useState(0)
  const [precip_mm] = useState(0)
  const [vis_km] = useState(0)

  useEffect(()=>{
    Axios.get("/refreshData").then((response)=>{
      setlocList(response.data);
    })
    },[])
  return (
    <div className="App">
      <h1> Refresh Location from Backend </h1>
      {locList.map((val,key)=>{
        return (
        <div key = {key} className = "loc"> 
        <ul>
          <li>{val.locName} </li>
          <li>{val.last_updated} </li>
          <li>{val.temp_c} </li>
          <li>{val.wind_kph} </li>
          <li>{val.wind_dir} </li>
          <li>{val.humidity} </li>
          <li>{val.precip_mm} </li>
          <li>{val.vis_km} </li>
        </ul>
        
        </div>);
      })}
    </div>
  );
}

export default App;
