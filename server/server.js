const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Schema = mongoose.Schema;
mongoose.connect("mongodb+srv://stu096:p411402-@csci2720.m2qbq.mongodb.net/stu096");


// Note: length check for user and password should be done on the frontend
// Password should be stored as a hashed + salt value using bcrypt
const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user", enum: ["user", "admin"] },
  favouriteLocations: [String]
});

const LocationSchema = new Schema({
  latitude: { type: Schema.Types.Decimal128, required: true, unique: true },
  longitude: { type: Schema.Types.Decimal128, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  comments: [{
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    comment: { type: String, required: true }
  }],
  temp_c: { type: Schema.Types.Decimal128 },
  wind_kph: { type: Schema.Types.Decimal128 },
  wind_dir: { type: String },
  humidity: { type: Number },
  precip_mm: { type: Schema.Types.Decimal128 },
  vis_km: { type: Schema.Types.Decimal128 }
});

const User = mongoose.model("User", UserSchema);
const Location = mongoose.model("Location", LocationSchema);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log(`Connected to http://localhost:3000`)
})