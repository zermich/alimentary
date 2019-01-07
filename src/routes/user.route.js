const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const plainTextPassword1 = "DFGh5546*%^__90";

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
            email: req.body.email,
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

router.post('/test', (req, res, next) => {
//  console.log("email is", req.body.email);
    res.json({
        "Test": req.body.email
    });
});

module.exports = router;