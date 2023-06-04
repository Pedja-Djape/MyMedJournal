const express = require('express');
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");
require('dotenv').config();

const User = require('../models/user.model');
const Notes = require('../models/note.model');
const { validateCredentials } = require('../util/validateCreds');

const router = express.Router();

/*
    Register user endpoint.
*/

router.post("/signup", async (req, res) => {
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

    try {
        const hashedPassword = await bcrypt.hash(enteredPassword, 10);
        const user = new User({
            email: enteredEmail,
            password: hashedPassword,
        });
        const result = await user.save();
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                userEmail: user.email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { 
                expiresIn: "24h"
            }
        );
        console.log(user)
        const newUserNotes = await new Notes({
            _id: result._id.toString(),
            notes: []
        }).save();
        
        return res.status(200).send({
            message: "User Created Successfully",
            email: result.email,
            id: result._id.toString(),
            token
        })
    } catch (error) {
        if (error.code === 11000 && "email" in error.keyPattern) {
            return res.status(400).send({
                message: "Error creating user. Username already exists.",
                email: "Username already exists!"
            })
        }
        console.log(error)
        return res.status(500).send({error});
    }
    
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
                process.env.ACCESS_TOKEN_SECRET,
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
  
  
  

