const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const adminRefresh = require('./refreshData');
const getLocations = require("./userLocationData");
const adminLocationData = require("./adminLocationData");
//////////////////////////////////////////////////////
const locFunctions=require('./FavouritesAndSearch.js');
const signInandUp=require('./signIn.js');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://stu096:p411402-@csci2720.m2qbq.mongodb.net/stu096", (err) => {
  if (err) {
    console.log("database encountered the following error: %s", err);
  } else {
    console.log("Connected to the Database");
  }
});





// logout for admin and user
app.get('/logout', (req, res) => {
  res.clearCookie("user");
  res.status(200).json({
    success: true,
    redirectUrl: '/login'
  })
});


//Admin refresh data
app.post("/newLocation", adminLocationData.register)
app.get('/refreshData', adminRefresh.refreshData)
app.get('/locations', getLocations.getAllLocations)
app.post('/location/:name', getLocations.getLocation)

//Functions in signIn File
app.post('/signin-user',signInandUp.signIn);
app.post('/signup-user',signInandUp.signUp);

//Functions in FavouritesAndSearch File
app.post('/keywordlocation',locFunctions.keywordLocation);
app.get('/favourites/:name/:loc',locFunctions.addFavourites);
app.get('/favourites/:userName',locFunctions.listFavourites);

app.listen(5000, () => {
  console.log(`Connected to http://localhost:5000`)
})
