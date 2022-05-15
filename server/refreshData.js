const axios = require('axios');
const Location = require('./models/Location');


const update = async (key, location) => {
    const URL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location.name}&aqi=no`
    await axios.get(URL)
        .then((body) => {
            const update = {
                last_updated: body.data.current.last_updated,
                temp_c: body.data.current.temp_c,
                wind_kph: body.data.current.wind_kph,
                wind_dir: body.data.current.wind_dir,
                humidity: body.data.current.humidity,
                precip_mm: body.data.current.precip_mm,
                vis_km: body.data.current.vis_km
            }
            Location.findByIdAndUpdate(location._id, update)
        })
        .catch(err => {
            res.json({
                message: `Something went wrong while trying to update all location data: ${err}`
            })
        })
}

const refreshData = (req, res) => {
    const key = "0ccd60a1f85143eeac7162510221205"
    Location.find({})
        .then(response => {
            response.map(async (location) => {
                await update(key, location)
            })
        }).catch(err => {
            res.json({
                message: `Something went wrong while trying to get all locations: ${err}`
            })
        })
    res.end()
}


module.exports = { refreshData }