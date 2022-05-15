const cors = require('cors');
const express = require("express");
const { json } = require("express/lib/response");
const LocationSchema = require("./models/Location.js");
const UserSchema = require("./models/User.js");
const app = express();

const mongoose = require('mongoose');
const res = require('express/lib/response');


//list of locations based on keyword
const keywordLocation = (req, res) => {
    let name = req.body.name;
    LocationSchema
        .find({ name: { $regex: name } }, { name: 1, temp_c: 1, humidity: 1 })
        .exec((err, results) => {
            if (err) res.send(err);
            let arr = [];
            if (results != null) {

                var str;
                for (let i = 0; i < results.length; i++) {
                    str = { name: results[i].name, temp_c: results[i].temp_c, humidity: results[i].humidity };
                    arr.push(str);
                }
                res.send(JSON.stringify(arr, null, 2));
            }
            else if (results == null) {
                res.send(JSON.stringify(results));
            }

        })

}


//Adding user's favourite locations
const addFavourites = (req, res) => {
    console.log("entered addFavourites\n");
    let username = req.params['name'];
    let loc = req.params['loc'];

    console.log("first here");
    UserSchema.findOneAndUpdate({ userName: username },
        {
            $addToSet: {
                favouriteLocations: loc
            }

        }, { new: true })
        .then((doc) => {
            console.log(`doc is ${doc}`);
            res.send(JSON.stringify(doc, null, 2));
        })
}

//Delete Favourite location
const delFavourites=(req,res)=>{
    console.log("entered addFavourites\n");
    let username=req.params['name'];
    let loc=req.params['loc'];
   
    console.log("first here");
    UserSchema.findOneAndUpdate({userName: username},
    {
        $pull : {
            favouriteLocations : loc
        }
            
    },{new:true})
    .then((doc)=>{
        console.log(`doc is ${doc}`);
        res.send(JSON.stringify(doc,null,2));
        }) 
}
   

//List of all favourite locations of a particular user
const listFavourites = (req, res) => {
    let arr = [];
    UserSchema
        .findOne({ userName: req.params['userName'] })
        .then((result) => {
            let favLoc = result.favouriteLocations;

            favLoc.map(loc => {
                LocationSchema.findOne({ name: { $regex: loc, '$options': 'i' } })
                    .then((resultt) => {
                        str = { name: resultt.name, temp_c: resultt.temp_c, humidity: resultt.humidity }
                        arr.push(str);
                    })
            })
            function f() { res.send(JSON.stringify(arr, null, 2)); }
            setTimeout(f, 1000);

        }).catch(e => {
            console.log(e)
        })
}

const getUserFavs = (req, res) => {

    UserSchema.findOne({ userName: req.params['userName'] })
        .then((result) => {
            let favLoc = result.favouriteLocations;
            res.json(favLoc)
        }).catch(e => {
            console.log(e)
        })
}

module.exports={keywordLocation,addFavourites,delFavourites,listFavourites, getUserFavs};
   
