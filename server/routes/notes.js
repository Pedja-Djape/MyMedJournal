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
    try {
        const uid = req.user.userId;
        const userNotes = await getUserNotes(uid);
        return res.status(200).send({
            message: "Successfully obtained notes.",
            notes: userNotes.notes
        })
    } catch (error) {
        return res.status(500).send({
            message: "Failed to obtain notes.",
            error
        })
    }
    
    

});

router.get('/:noteId', authenticateToken , async (req, res) => {
    const uid = req.user.userId;
    if (!noteId) {
        return res.status(422).send({
            errors: {
                message: "Error! Please specifiy a valid noteId."
            }
        })
    }
    const { noteId } = req.params;
    try {
        const userNotes = await getUserNotes(uid);
        for (const note of userNotes.notes) {
            if (note._id.toString() === noteId) {
                return res.status(200).send({
                    message: "Successfully obtained note.",
                    note
                })
            }
        }
        return res.status(422).send({
            errors: {
                message: `Note with id ${noteId} does not exist.`
            }
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Failed to obtain note.'
        })
    }
    
})

router.patch('/:noteId', authenticateToken, async (req, res) => { 
    const uid  = req.user.userId
    const { title, content} = req.body;
    const {noteId} = req.params;
    if (title && content && noteId) {
        try {
            await Notes.updateOne(
                { _id: uid, 'notes._id': noteId },
                {$set: {
                    'notes.$.title': title, 'notes.$.content': content
                }}
            )
            return res.status(200).send({
                message: "Sucessfully updated note."
            })
        } catch (error) {
            return res.status(500).send({
                message: "Failed to update not."
            })
        }
    }
    let errors = {}


    if (!title) {
        errors.title = "Invalid note title provided."
    }
    if (!content) { 
        errors.content = "Invalid note content provided."
    }
    if (!noteId) {
        errors.id = "Invalid note id provided."
    }
    return res.send(422).send({
        errors
    })
    
}) 

// ADD AUTHENTICATIION AND VALIDATION!!!!
router.post('/', authenticateToken, async (req, res) => {
    // check if fields are empty
    // add try {} ... catch {} blocks for validation errors.
    const { userId } = req.user
    const { title: noteTitle, content: noteContent} = req.body;
    if (userId && noteTitle && noteContent) {
        // fetch users notes
        try {
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
        } catch (error) {
            res.status(500).send({
                message: "Failed to add note.",
                error
            })
        }
    }
    let errors = {}
    if (!noteTitle) {
        errors.title = `Invalid title provided.`
    }
    if (!noteContent) { 
        errors.noteContent = `Invalid note content provided.`
    }
    if (!noteId) {
        errors.id = 'Invalid note ID provided.'
    }
    return res.status(422).send({
        errors
    })
    
    
})


router.delete('/:noteId', authenticateToken, async (req, res) => {
    const { userId } = req.user
    const {noteId} = req.params;
    if (noteId) {
        try {
            const result = await Notes.updateOne(
                { _id: userId },
                { $pull: { notes: {_id: noteId } } }
            );
            return res.status(200).send({message: "Successfully deleted note."});
        } catch (error) {
            return res.status(500).send({
                message: "Failed to delete note."
            });
        }
    }
    return res.status(422).send({
        errors: {
            id: 'Invalid note ID provided.'
        }
    });
    
    
});

module.exports = router;


