const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRefresh = require('./refreshData');
const getLocations = require("./userLocationData");
const adminLocationData = require("./adminLocationData");
const adminUserData = require("./adminUserData");
//////////////////////////////////////////////////////
const locFunctions = require('./FavouritesAndSearch.js');
const signInandUp = require('./signIn.js');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://stu110:p869132-@csci2720.m2qbq.mongodb.net/stu110", (err) => {
  if (err) {
    console.log("database encountered the following error: %s", err);
  } else {
    console.log("Connected to the Database");
  }
});

const PORT = 80;
app.use(express.static("build"));

//Admin refresh data
app.post("/newLocation", adminLocationData.register)
app.get('/refreshData', adminRefresh.refreshData)
app.get('/locations', getLocations.getAllLocations)
app.get('/location/:name', getLocations.getLocation)

//ADMIN CRUD OPERATIONS ON LOCATION DATA
app.post("/newLocation", adminLocationData.register)
app.get("/allLocation", adminLocationData.index)
app.post("/updateLocation", adminLocationData.update)
app.delete("/deleteLocation", adminLocationData.destroy)

//ADMIN CRUD OPERATIONS ON USER DATA
app.post("/newUser", adminUserData.register)
app.get("/allUser", adminUserData.index)
app.post("/updateUser", adminUserData.update)
app.delete("/deleteUser", adminUserData.destroy)

//Functions in signIn File
app.post('/signin-user/:role', signInandUp.signIn);
app.post('/signup-user', signInandUp.signUp);

//Functions in FavouritesAndSearch File
app.post('/keywordlocation', locFunctions.keywordLocation);
app.get('/favourites/:name/:loc', locFunctions.addFavourites);
app.get('/favourites/:userName', locFunctions.listFavourites);
app.get('/delfavourites/:name/:loc',locFunctions.delFavourites);



app.get('/favs/:userName', locFunctions.getUserFavs)
app.post('/newComment', getLocations.addComment)

app.listen(PORT, () => console.log(`Example app running on ${PORT}`))
