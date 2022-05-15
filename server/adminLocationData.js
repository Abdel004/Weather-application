const axios = require('axios');
// FOR LOCATION DATA
const LocationSchema = require("./models/Location");

//CREATE LATLONG and NAME
const register = (req, res, next) => {
    const key = "0ccd60a1f85143eeac7162510221205"
    let URL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${req.body.name}&aqi=no`
    axios.get(URL)
        .then((body) => {
            const data = new LocationSchema({
                name: body.data.location.name,
                latitude: body.data.location.lat,
                longitude: body.data.location.lon,
                last_updated: body.data.current.last_updated,
                temp_c: body.data.current.temp_c,
                wind_kph: body.data.current.wind_kph,
                wind_dir: body.data.current.wind_dir,
                humidity: body.data.current.humidity,
                precip_mm: body.data.current.precip_mm,
                vis_km: body.data.current.vis_km
            })
            data.save()
                .then(data => {
                    res.json({
                        message: "Data Added Successfully"
                    })
                })
                .catch(error => {
                    res.status(401).json({
                        message: "An error occured"
                    })
                })
        })
        .catch(err => {
            const q = parseFloat(req.body.latitude) + ',' + parseFloat(req.body.longitude)
            URL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${q}&aqi=no`
            axios.get(URL)
                .then((body) => {
                    const data = new LocationSchema({
                        name: body.data.location.name,
                        latitude: body.data.location.lat,
                        longitude: body.data.location.lon,
                        last_updated: body.data.current.last_updated,
                        temp_c: body.data.current.temp_c,
                        wind_kph: body.data.current.wind_kph,
                        wind_dir: body.data.current.wind_dir,
                        humidity: body.data.current.humidity,
                        precip_mm: body.data.current.precip_mm,
                        vis_km: body.data.current.vis_km
                    })
                    data.save()
                        .then(data => {
                            res.json({
                                message: "Data Added Successfully"
                            })
                        })
                        .catch(error => {
                            res.status(401).json({
                                message: "An error occured"
                            })
                        })
                })
                .catch(err => {
                    res.json({
                        message: `Location not found: ${err}`
                    })
                })
        })
}


// Show list of all data //ADMIN
const index = (req, res, next) => {
    LocationSchema.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.status(401).json({
                message: 'An error occured'
            })
        })
}

//Update a user and store the information in database 
const update = (req, res, next) => {

    const key = "0ccd60a1f85143eeac7162510221205"
    let URL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${req.body.name}&aqi=no`
    axios.get(URL)
        .then((body) => {
            const updatedData = {
                name: body.data.location.name,
                latitude: body.data.location.lat,
                longitude: body.data.location.lon,
                last_updated: body.data.current.last_updated,
                temp_c: body.data.current.temp_c,
                wind_kph: body.data.current.wind_kph,
                wind_dir: body.data.current.wind_dir,
                humidity: body.data.current.humidity,
                precip_mm: body.data.current.precip_mm,
                comments: [],
                vis_km: body.data.current.vis_km
            }

            LocationSchema.findOneAndUpdate({ name: req.body.oldname }, { $set: updatedData })
                .then((respo) => {
                    res.json({
                        message: 'location updated successfully!'
                    })
                })
                .catch(error => {
                    res.status(401).json({
                        message: 'An error occured!'
                    })
                })
        })
        .catch(err => {
            const q = parseFloat(req.body.latitude) + ',' + parseFloat(req.body.longitude)
            URL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${q}&aqi=no`
            axios.get(URL)
                .then((body) => {
                    let updatedData = {
                        name: body.data.location.name,
                        latitude: body.data.location.lat,
                        longitude: body.data.location.lon,
                        last_updated: body.data.current.last_updated,
                        temp_c: body.data.current.temp_c,
                        wind_kph: body.data.current.wind_kph,
                        wind_dir: body.data.current.wind_dir,
                        humidity: body.data.current.humidity,
                        precip_mm: body.data.current.precip_mm,
                        comments: [],
                        vis_km: body.data.current.vis_km
                    }

                    LocationSchema.findOneAndUpdate({ name: req.body.oldname }, { $set: updatedData })
                        .then((respo) => {
                            res.json({
                                message: 'location updated successfully!'
                            })
                        })
                        .catch(error => {
                            res.status(401).json({
                                message: 'An error occured!'
                            })
                        })
                })
                .catch(err => {
                    res.json({
                        message: `Location not found: ${err}`
                    })
                })
        })
}




//Delete a user 
const destroy = (req, res, next) => {
    let name = req.body.name
    LocationSchema.findOneAndRemove({ name: name })
        .then(() => {
            res.json({
                message: 'Data Deleted Successfully'
            })
        })
        .catch(error => {
            res.status(401).json({
                message: 'an error occured'
            })
        })
}

module.exports = {
    register, index, update, destroy
}