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
    if (!req.params.hasOwnProperty('noteId') || req.params.noteId === null || req.params.noteId === undefined || req.params.noteId === '') {
        return res.status(400).send({
            message: "Error! Please specifiy a valid noteId.",
            note: []
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
        return res.status(400).send({
            message: `Note with id ${noteId} does not exist.`
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
    if (!title) {
        return res.status(200).send({
            message: "Error! Please provide a valid title.",
            title: title
        })
    }
    if (!content) { 
        return res.status(200).send({
            message: "Error! Please provide valid note content.",
            content: content
        })
    }
    if (!noteId) {
        return res.status(200).send({
            message: "Error! Please provide a valid note id.",
            noteId: noteId
        });
    }
    

   
}) 

// ADD AUTHENTICATIION AND VALIDATION!!!!
router.post('/', authenticateToken, async (req, res) => {
    // check if fields are empty
    // add try {} ... catch {} blocks for validation errors.
    const { userId } = req.user
    const { title: noteTitle, content: noteContent} = req.body;
    if (userId && title && content) {
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
    if (!title) {
        return res.status(200).send({
            message: "Error! Please provide a valid title.",
            title: title
        })
    }
    if (!content) { 
        return res.status(200).send({
            message: "Error! Please provide valid note content.",
            content: content
        })
    }
    if (!noteId) {
        return res.status(200).send({
            message: "Error! Please provide a valid note id.",
            noteId: noteId
        });
    }
    
    
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
    return res.status(400).send({
        message: "Error! Please provide a valid note ID.",
        noteId: ''
    });
    
    
});

module.exports = router;


