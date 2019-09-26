const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Add User to database and hash password
router.post('/signup', (req, res, next) => {
   bcrypt.hash(req.body.password, 10, function(err, hash){
      if(err) {
         return res.status(500).json({
            error: err
         });
      }
      else {
         const user = new User({
            _id: new  mongoose.Types.ObjectId(),
            user: req.body.user,
            password: hash    
         });
         user.save().then(function(result) {
            console.log(result);
            res.status(200).json({
               success: 'New user has been created'
            });
         }).catch(error => {
            res.status(500).json({
               error: err
            });
         });
      }
   });
});


// Login user with password authentication, assigns client Json Web Token
router.post('/signin', (req, res, next) => {
    User.findOne({user: req.body.user})
    .exec()
    .then(function(user) {
       bcrypt.compare(req.body.password, user.password, function(err, result){
          if(err) {
             return res.status(401).json({
                failed: 'Unauthorized Access'
             });
          }
          if(result) {
            const JWTToken = jwt.sign({
                 user: user.user,
                 _id: user._id
               },
                process.env.JWT_SECRET,
                );
                return res.status(200).json({
                  success: 'Welcome to the JWT Auth',
                  token: JWTToken
                });
            }
          return res.status(401).json({
             failed: 'Unauthorized Access'
          });
       });
    })
    .catch(error => {
       res.status(500).json({
          error: error
       });
    });;
 });

 //Check Authorization to access /add-item page, redirects to /login if token missing/expired
router.post('/checkAuth', (req, res, next) => {
   //if jwt sent in header sets to token var
   let token = req.headers['x-access-token'];
   if (token === null) return res.status(401).send({ auth: false, message: 'No token provided.' });
   //Checks if token is valid
   jwt.verify(token, process.env.JWT_SECRET, (err, jwtres) => {
      if (err) {
         console.log('jwt verify err is ', err);
         console.log('jwt verify err, token is ', token);
         res.json({ allowAccess: false });
         return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      res.json({ allowAccess: true });		  
   });
});

module.exports = router;