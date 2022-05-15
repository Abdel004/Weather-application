const bcrypt = require('bcrypt')
// FOR USER DATA
const User = require("./models/User");


//CREATE USER
const register = (req, res, next) => {

    if (req.body.password.length > 20 || req.body.password.length < 4) {
        res.status(401).json({
            message: "password length should be between 4 and 20"
        })
    } else if (req.body.username.length > 20 || req.body.username.length < 4) {
        res.status(401).json({
            message: "username length should be between 4 and 20"
        })
    } else {
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                res.status(401).json({
                    error: err
                })
            }

            let user = new User({
                userName: req.body.username,
                password: hashedPass,
            })
            user.save()
                .then(user => {
                    res.json({
                        message: "User Added Successfully"
                    })
                })
                .catch(error => {
                    res.status(401).json({
                        message: "An error occured"
                    })
                })
        })
    }


}

// Show list of all users 
const index = (req, res, next) => {
    User.find()
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
    let username = req.body.username
    let oldUsername = req.body.olduser
    if (req.body.password.length > 20 || req.body.password.length < 4) {
        console.log("here")
        res.status(401).json({
            message: "password length should be between 4 and 20"
        })
    } else if (req.body.username.length > 20 || req.body.username.length < 4) {
        console.log("here1")
        res.status(401).json({
            message: "username length should be between 4 and 20"
        })
    } else {
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                res.status(401).json({
                    error: err
                })
            }
            let updatedData = {
                userName: username,
                password: hashedPass
            }

            User.findOneAndUpdate({ userName: oldUsername }, { $set: updatedData })
                .then((respo) => {
                    res.json({
                        message: 'User updated successfully!'
                    })
                })
                .catch(error => {
                    res.status(401).json({
                        message: 'An error occured!'
                    })
                })
        })
    }


}


//Delete a user 
const destroy = (req, res, next) => {
    let username = req.body.username
    User.findOneAndDelete({ userName: username })
        .then(() => {
            res.json({
                message: 'User Deleted Successfully'
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
