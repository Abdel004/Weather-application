const mongoose = require('mongoose');

// Note: length check for user and password should be done on the frontend
// Password should be stored as a hashed + salt value using bcrypt

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user", enum: ["user", "admin"] },
    favouriteLocations: [String]
});


module.exports = mongoose.model("User", UserSchema);  