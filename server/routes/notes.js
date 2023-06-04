const express = require('express');
const Notes = require('../models/note.model');
const authenticateToken = require('../middleware/auth');
const { default: mongoose } = require('mongoose');

const router = express.Router();

async function getUserNotes(uid) {
    return await Notes.findOne({_id: uid}).exec()
}


router.get('/', authenticateToken, async (req, res) => {
    // check if user exists and other validation
    const uid = req.user.userId;
    const userNotes = await getUserNotes(uid);
    return res.status(200).send({
        message: "Successfully obtained notes.",
        notes: userNotes.notes
    })

});

router.get('/:noteId', authenticateToken , async (req, res) => {
    const uid = req.user.userId;
    const { noteId } = req.params;
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

router.patch('/:noteId', authenticateToken, async (req, res) => { 
    const uid  = req.user.userId
    const { title, content} = req.body;
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
router.post('/', authenticateToken, async (req, res) => {
    // check if fields are empty
    // add try {} ... catch {} blocks for validation errors.
    const { userId } = req.user
    const { title: noteTitle, content: noteContent} = req.body;
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


router.delete('/:noteId', authenticateToken, async (req, res) => {
    const { userId } = req.user
    const {noteId} = req.params;
    const result = await Notes.updateOne(
        { _id: uid },
        { $pull: { notes: {_id: noteId } } }
    )
});

module.exports = router;


