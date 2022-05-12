const express= require ('express');
const { route } = require('express/lib/application');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router= express.Router();
const userSchema=require("../models/User");
const adminSchema=require("../models/Admin");
//const authorize = require('../middleware/auth');

//User sign in
router.post('/signin-user', (req, res, next) => {
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
          else return res.status(200).json({message: getUser})
      });
    });
  });

//Admin sign in
  router.post('/signin-admin', (req, res, next) => {
    let getAdmin;
    adminSchema
      .findOne({
        userName: req.body.userName,
      },(err,result)=>{
        if (result==null) {
            return res.status(401).json({
              message: 'Invalid username.',
            });
        }
        getAdmin = result;
        bcrypt.compare(req.body.password, result.password,(err,ress)=>{
            if (err) return res.status(401).json({error: err})
            if (!ress) return  res.status(401).json({message: 'Invalid password.'});
            else return res.status(200).json({message: getAdmin})
        });
      });
    });

/*
router.post('/signin-user', (req, res, next) => {
    let getUser;
    userSchema
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: 'Username not found.',
          });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then((response) => {
        if (!response) {
          return res.status(401).json({
            message: 'Wrong password.',
          });
        }
        let jwtToken = jwt.sign(
          {
            username: getUser.username,
            userId: getUser._id,
          },
          'longer-secret-is-better',
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({
          token: jwtToken,
          expiresIn: 3600,
          msg: getUser,
        });
      })
      .catch((err) => {
        console.log("Entered catch");
        //});
      });
  });
  */
  /*router.post('/signin-admin', (req, res, next) => {
    let getAdmin;
    adminSchema
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: 'Username not found.',
          });
        }
        getAdmin = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then((response) => {
        if (!response) {
          return res.status(401).json({
            message: 'Wrong password.',
          });
        }
        let jwtToken = jwt.sign(
          {
            username: getAdmin.username,
            userId: getAdmin._id,
          },
          'longer-secret-is-better',
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({
          token: jwtToken,
          expiresIn: 3600,
          msg: getAdmin,
        });
      })
      .catch((err) => {
        console.log("Entered catch");
        //});
      });
  }); */

  
// Signup User 
router.post('/register-user',
    (req, res, next) => {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          console.log("user name is: ", req.body.userName)
          console.log("password is: ", req.body.password)
          const user = new userSchema({
            userName: req.body.userName,
            password: hash,
          });

          user
            .save()
            .then((response) => {
              res.status(201).json({
                message: 'User successfully created!',
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
});

//Signup Admin
router.post('/register-admin',
    (req, res, next) => {
        bcrypt.hash(req.body.password, 10).then((hash) => {
        //  console.log("admin name is: ", req.body.userName)
         // console.log("admin password is: ", req.body.password)
          const admin = new adminSchema({
            userName: req.body.userName,
            password: hash,
          });

          admin
            .save()
            .then((response) => {
              res.status(201).json({
                message: 'Admin successfully created!',
                result: response,
              });
            })
            .catch((error) => {
              res.status(500).json({
                error: error,
              });
            });
        });
});

/*
router.route('/all-user').get(authorize, (req, res) => {
  userSchema.find((error, response) => {
      if (error) {
          return next(error)
      } else {
          res.status(200).json(response)
      }
  })
})*/


module.exports=router;