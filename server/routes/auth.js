const express = require('express');
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");

const User = require('../models/user.model');
const { validateCredentials } = require('../util/validateCreds');

const router = express.Router();

/*
    Register user endpoint.
*/

router.post("/signup", (req, res) => {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;

    // validate email and password
    let errors = validateCredentials(enteredEmail, enteredPassword);
    // check for errors
    if (Object.keys(errors).length > 0) {
        return res.status(422).send({
            errors
        });
    }
    // hash the password
    bcrypt.hash(enteredPassword, 10).then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new User({
            email: enteredEmail,
            password: hashedPassword,
        });
    
        // save the new user
        user.save().then((result) => {
            // return success if the new user is added to the database successfully
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
            res.status(201).send({
                message: "User Created Successfully",
                email: result.email,
                id: user._id,
                token
            });
        }).catch((error) => {
            // catch error if the new user wasn't added successfully to the database
            res.status(500).send({
            message: "Error creating user",
            error,
            });
        });
    }).catch((e) => {
        res.status(500).send({
            message: "Password was not hashed successfully",
            e
        });
    });
});

/*
    Login user endpoint.
*/
router.post("/login", (req, res) => {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;

    // validate email and password
    let errors = validateCredentials(enteredEmail, enteredPassword);
    // check for errors
    if (Object.keys(errors).length > 0) {
        return res.status(422).send({
            errors
        });
    }
    // search for user.
    User.findOne({email: enteredEmail}).then( user => {
        // compare passwords
        bcrypt.compare(enteredPassword, user.password).then( passwordCheck => {
            if (!passwordCheck) {
                errors.password = "Passwords do not match."
                return res.status(401).send({
                    errors
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
                id: user._id,
                token
            });
        }).catch( error => {
            errors.password = "Passwords do not match"
            res.status(401).send({
                errors
            })})

    }).catch( err => {
        errors.email = "Email does not exist."
        res.status(401).send({
            errors
        })
    })
});

module.exports = router;
  
  
  

