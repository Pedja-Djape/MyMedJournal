const express = require('express');
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");
require('dotenv').config();

const User = require('../models/user.model');
const Notes = require('../models/note.model');
const Articles = require('../models/acticles.model');

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
        await new Notes({
            _id: result._id.toString(),
            notes: []
        }).save();
        await new Articles({
            _id: result._id.toString(),
            articles: []
        }).save();
        return res.status(200).send({
            message: "User Created Successfully",
            email: result.email,
            token
        })
    } catch (error) {
        if (error.code === 11000 && "email" in error.keyPattern) {
            return res.status(422).send({
                errors: {
                    email: "Email already exists!"
                }
            })
        }

        return res.status(500).send({error});
    }
    
});

/*
    Login user endpoint.
*/
router.post("/login", async (req, res) => {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;

    // validate email and password
    let errors = validateCredentials(enteredEmail, enteredPassword);
    // check for errors
    if (Object.keys(errors).length > 0) {
        return res.status(422).send({errors});
    }
    try {
        // search for user.
        const user = await User.findOne({email: enteredEmail});
        const passwordCheck = await bcrypt.compare(enteredPassword, user.password);
        if (!passwordCheck) {
            errors.password = "Passwords do not match."
            return res.status(422).send({errors});
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
    } catch (error) {
        return res.status(500).send({error});
    }
});

module.exports = router;
  
  
  

