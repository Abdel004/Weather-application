// FOR LOCATION DATA
const LocationSchema = require("./models/Location");

//CREATE LATLONG and NAME
const register = (req, res, next) => {
    
        let data = new LocationSchema({
            latitude: req.body.latitude,
            longitude:req.body.longitude,
            name: req.body.name,
        })
    
        data.save()
        .then(data => {
            res.json({
                message: "Data Added Successfully"
            })
        })
        .catch(error =>{
            res.json({
                message: "An error occured"
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
        res.json({
            message: 'An error occured'
        })
    })
}

//Show particular latlong by name
const show = (req, res, next) => {
    let name = req.body.name
    LocationSchema.find({name:{$regex:name}},{latitude:1, longitude:1})
        .then(response => {
            const latitude = response[0].latitude;
            const longitude = response[0].longitude;
    })
        .catch(error => {
            res.json({
                message: error.message
            })   
        })
};
        


//Update a user and store the information in database 
const update = (req, res, next) => {
    let name = req.body.name
 
        let updatedData = {
            latitude: req.body.latitude,
            longitude:req.body.longitude
        }
        LocationSchema.findOneAndUpdate({name:{$regex:name}}, {$set: updatedData})
        .then(() => {
        res.json({   
            message: 'Data updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
    }
         



//Delete a user 
const destroy = (req,res,next) => {
    let name = req.body.name
    LocationSchema.findByIdAndRemove({name:{$regex:name}})
    .then(() => {
        res.json({
            message: 'Data Deleted Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error occured'
        })
    })
}

module.exports = {
    register,index,show,update,destroy
}