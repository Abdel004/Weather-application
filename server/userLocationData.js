const Location = require('./models/Location');

// for one single location
const getLocation = (req, res) => {
  Location.findOne({ name: { $regex: req.params['name'], '$options': 'i' } })
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
  Location.find({})
    .then(response => {
      res.json({ response })
    }).catch(err => {
      res.json({
        message: `Something went wrong while trying to get all locations: ${err}`
      })
    })
}


const addComment = (req, res) => {

  locName = req.body.name
  let updatedData = {
    userName: req.body.userName,
    comment: req.body.comment
  }

  Location.findOneAndUpdate({ name: locName }, { $push: { comments: updatedData } })
    .then(resp => {
      res.json({ message: 'Comment addded successfully!' })
    }).catch(e => {
      res.status(401).json({
        error: "something wrong happened"
      })
    })
}

module.exports = {
  getLocation, getAllLocations, addComment
}