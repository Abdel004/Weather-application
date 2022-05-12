const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const adminRefresh = require('./refreshData');


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

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
app.get('/refreshData', adminRefresh.refreshData)

app.listen(5000, () => {
  console.log(`Connected to http://localhost:5000`)
})