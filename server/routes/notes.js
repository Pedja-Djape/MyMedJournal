const express = require('express');
const Notes = require('../models/note.model');
const { default: mongoose } = require('mongoose');

const router = express.Router();


router.get('/', async (req, res) => {
    // check if user exists
    
    const {userId} = req.body;
    const userNotes = await Notes.findOne({_id: userId}).exec();
    return res.status(200).send({
        message: "Successfully obtained notes.",
        notes: userNotes.notes
    })

});

// ADD AUTHENTICATIION AND VALIDATION!!!!
router.post('/add', async (req, res) => {
    // auth check with token (use middleware before this function is called)
    // check if fields are empty
    // check if userID exists
    // add try {} ... catch {} blocks for validation errors.
    
    const {userId, noteTitle, noteContent} = req.body;
    // fetch users notes
    const userNotes = await Notes.findOne({_id: userId}).exec();

    // user has no notes
    if (userNotes === null) {
        const newUserNotes = new Notes({
            _id: userId,
            notes: [
                {
                    title: noteTitle,
                    content: noteContent
                }
            ]
        });
        const result = await newUserNotes.save();
        return res.status(200).send({
            noteId: result.notes[0]._id.toString()
        });
    } else {
        const newNote = {
            title: noteTitle,
            content: noteContent
        }
        const numNotes = userNotes.notes.push(newNote)
        const result = await userNotes.save();
        console.log(result);
        return res.status(200).send(
            {
                noteId: userNotes.notes[numNotes - 1]._id.toString()
            }
        )
    }
})


module.exports = router;

