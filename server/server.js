const express =require('express');
const cors=require('cors');
const locFunctions=require('./FavouritesAndSearch.js');
const signInandUp=require('./signIn.js');

const mongoose = require('mongoose'); 


mongoose.connect('mongodb+srv://stu110:p869132-@csci2720.m2qbq.mongodb.net/stu110');

const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console,'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
console.log("Connection is open...");
});




//const auth= require('./auth.routes');
const app=express();
app.use(cors());
app.use(express.json());


app.post('/signin-user/:role',signInandUp.signIn);
app.post('/signup-user',signInandUp.signUp);

app.post('/keywordlocation',locFunctions.keywordLocation);
app.get('/favourites/:name/:loc',locFunctions.addFavourites);
app.get('/favourites/:userName',locFunctions.listFavourites);

app.listen(5000,()=>{
    console.log("your application is running");

})