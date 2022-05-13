const Location = require('./models/Location');

// for one single location
const getLocation = (req, res) => {
  Location.findOne({ name: { $regex: req.params['name'], '$options' : 'i'} })
    .then(response => {
      res.json({ response })
    }).catch(err => {
      res.json({
        message: `Something went wrong while trying to get the location: ${err}`
      })
    })
}

// for google maps
const getAllLocations = (req, res) => {
  Location.find({}, { name: 1, latitude: 1, longitude: 1 })
    .then(response => {
      res.json({ response })
    }).catch(err => {
      res.json({
        message: `Something went wrong while trying to get all locations: ${err}`
      })
    })
}

module.exports = {
  getLocation, getAllLocations
}