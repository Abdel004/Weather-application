import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./table.module.css";

//Get Locations

function LocationsTable(props) {
    const [value, setValue] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/locations")
        .then(response => response.data ? setData(response.data.response) : [])
    }, []);
    console.log(data)
    const displayList = data.map((data, i) =>
        <tr key={i}>
            <td>{data.name}</td>
            <td>{data.temp_c}</td>
            <td>{data.humidity}</td>
            <td>{data.last_updated}</td>
            <td><button type="button" className={`btn btn-primary`} onClick={() => fetch(`/favourites/${props.username}/${data.name}`)}>Add Favourite</button></td>
        </tr>
    );

    //Sort by temperature using Bubble Sort
    function tempSort() {
        const s_data = data;
        for(let i = 0; i < s_data.length; i++)
        {
            let min = i;
            for(let j = i + 1; j < s_data.length; j++)
            {
                if(s_data[j].temp_c < s_data[min].temp_c)
                {
                    min = j;
                }
            }
            let temp = s_data[i];
            s_data[i] = s_data[min];
            s_data[min] = temp;
        }
        setData(s_data);
        setValue("temp_c");
    }

    //Sort by humidity using Bubble Sort
    function humiditySort() {
        const s_data = data;
        for(let i = 0; i < s_data.length; i++)
        {
            let min = i;
            for(let j = i + 1; j < s_data.length; j++)
            {
                if(s_data[j].humidity < s_data[min].humidity)
                {
                    min = j;
                }
            }
            let temp = s_data[i];
            s_data[i] = s_data[min];
            s_data[min] = temp;
        }
        setData(s_data);
        setValue("humidity");
    }

    return (
        <div className="container">
            <div className={styles.sortbox}>
                <h2 className={styles.sortboxpara}>Locations</h2>
                Sort by:
                <button type="button" className={`btn btn-primary btn-lg ${styles.btn2}`} onClick={tempSort}>Temperature</button>
                <button type="button" className={`btn btn-primary btn-lg ${styles.btn2}`} onClick={humiditySort}>Humidity</button>
            </div>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Temperature</th>
                        <th scope="col">Humidity</th>
                        <th scope="col">Last Updated</th>
                        <th scope="col">Add to Favourite</th>
                    </tr>
                </thead>
                <tbody>
                    {displayList}
                </tbody>
            </table>
        </div>
    )
}

export default LocationsTable;
