const express= require ('express');
const { route } = require('express/lib/application');
const bcrypt = require('bcrypt');

const router= express.Router();
const userSchema=require("./models/User");
//const authorize = require('../middleware/auth');

//User sign in
const signIn=(req,res)=> {
  let getUser;
  userSchema
    .findOne({
      userName: req.body.userName,
    },(err,result)=>{
      if (result==null) {
          return res.status(401).json({
            message: 'Invalid username.',
          });
      }
      getUser = result;
      bcrypt.compare(req.body.password, result.password,(err,ress)=>{
          if (err) return res.status(401).json({error: err})
          if (!ress) return  res.status(401).json({message: 'Invalid password.'});
           else {
            return res.status(200).json({message: getUser})
        }
      });
    });
  };



  
// Signup User 
const signUp=(req,res)=>{
        bcrypt.hash(req.body.password, 10).then((hash) => {
          console.log("user name is: ", req.body.userName)
          console.log("password is: ", req.body.password)
          const user = new userSchema({
            userName: req.body.userName,
            password: hash,
            role: req.body.role
          });

          user
            .save()
            .then((response) => {
              res.status(201).json({
                message: `${req.body.role} successfully created!` ,
                result: response,
              });
            })
            .catch((error) => {
             // console.log("I am in catch.")
              res.status(500).json({
                error: error,
              });
            });
        });
};

module.exports={signIn,signUp};
