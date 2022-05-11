const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

// models
const User = require('./models/User');
const Location = require('./models/Location');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect("mongodb+srv://stu096:p411402-@csci2720.m2qbq.mongodb.net/stu096", (err) => {
  if (err) {
    console.log(`database encountered the following error: {err}`);
  } else {
    console.log("Connected to the Database");
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(5000, () => {
  console.log(`Connected to http://localhost:5000`)
})