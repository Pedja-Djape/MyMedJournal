const express = require('express');
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");

const User = require('../models/user.model');
const auth = require('../routes/auth');

const router = express.Router();

/*
    Register user endpoint.
*/

router.post("/signup", (request, response) => {
    // hash the password
    bcrypt.hash(request.body.password, 10).then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new User({
        email: request.body.email,
        password: hashedPassword,
        });
    
        // save the new user
        user.save().then((result) => {
            // return success if the new user is added to the database successfully
            response.status(201).send({
            message: "User Created Successfully",
            result,
            });
        }).catch((error) => {
            // catch error if the new user wasn't added successfully to the database
            response.status(500).send({
            message: "Error creating user",
            error,
            });
        });
    }).catch((e) => {
        response.status(500).send({
            message: "Password was not hashed successfully",
            e
        });
    });
});

/*
    Login user endpoint.
*/
router.post("/login", (req, res) => {
    User.findOne({email: req.body.email}).then( user => {

    bcrypt.compare(req.body.password, user.password).then( passwordCheck => {
        // check if pass matches
        if (!passwordCheck) {
            return res.status(400).send({
                message: "Passwords do not match",
                error
            });
        }
        // create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email,
            },
            "RANDOM_TOKEN",
            { 
                expiresIn: "24h"
            }
        );
        return res.status(200).send({
            message: "Login successful",
            email: user.email,
            token,
            });
    }).catch( error => {
        res.status(400).send({
            message: "Passwords do not match",
            error
        })
    })}).catch( err => {
        res.status(404).send({
            error: "Email not found.",
            e
        })
    })
})

module.exports = router;
  
  
  

