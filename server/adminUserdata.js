// const { response } = require('express')
// const User = require('../models/User')
// const bcrypt = require('bcryptjs')
// const jwt =  require('jsonwebtoken')
// const { append } = require('express/lib/response')
// // app.set('view engine', 'jade').
// const bodyParser = require('body-parser');
// const express = require('express')
// const { handle } = require('express/lib/application')
// const { header } = require('express/lib/request')
// const { any } = require('../middleware/upload')



// const app = express();
// // support parsing of application/json type post data
// app.use(bodyParser.json())

// //support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({extended:true}))


// FOR USER DATA


//CREATE USER
const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            username: req.body.username,
            password: hashedPass,
        })
    
        user.save()
        .then(user => {
            res.json({
                message: "User Added Successfully"
            })
        })
        .catch(error =>{
            res.json({
                message: "An error occured"
            })
        })
    })
}

// Show list of all users //ADMIN
const index = (req, res, next) => {
    User.find()
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

//Show particular user
const show = (req, res, next) => {
    let username = req.body.username
    User.find({usernmae:{$regex:username}},{username:1,password:1})
        .then(response => {
            const password = response[0].password;
            const username = response[0].username;
            //can display here
    })
        .catch(error => {
            res.json({
                message: error.message
            })   
        })
};
        



//Update a user and store the information in database 
const update = (req, res, next) => {
    let username = req.body.username
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error: err
            })
        }
        let updatedData = {
            password: hashedPass
        }
        User.findOneAndUpdate({username:{$regex:username}}, {$set: updatedData})
        
        .then(() => {
        res.json({   
            message: 'User updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
    })
         
}


//Delete a user 
const destroy = (req,res,next) => {
    let username = req.body.username
    User.findByIdAndRemove(username)
    .then(() => {
        res.json({
            message: 'User Deleted Successfully'
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