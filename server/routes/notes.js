const express = require('express');
const Notes = require('../models/note.model');
const { default: mongoose } = require('mongoose');

const router = express.Router();

async function getUserNotes(uid) {
    return await Notes.findOne({_id: uid}).exec()
}

router.get('/:uid', async (req, res) => {
    // check if user exists and other validation
    const {uid} = req.params;
    const userNotes = await getUserNotes(uid);
    return res.status(200).send({
        message: "Successfully obtained notes.",
        notes: userNotes.notes
    })

});

router.get('/:uid/:noteId', async (req, res) => {
    const {uid, noteId} = req.params;
    const userNotes = await getUserNotes(uid);
    for (const note of userNotes.notes) {
        if (note._id.toString() === noteId) {
            return res.status(200).send({
                message: "Successfully obtained note.",
                note
            })
        }
    }
    return res.status(400).send({
        message: `Note with id ${noteId} does not exist.`
    });
})

router.patch('/edit/:noteId', async (req, res) => { 
    const { uid, title, content} = await req.body;
    const {noteId} = req.params;
    const idk = await Notes.updateOne(
        { _id: uid, 'notes._id': noteId },
        {$set: {
            'notes.$.title': title, 'notes.$.content': content
        }}
    )
            
    return res.status(200).send({message: "word"})
}) 

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
        return res.status(200).send(
            {
                noteId: userNotes.notes[numNotes - 1]._id.toString()
            }
        )
    }
})


module.exports = router;

