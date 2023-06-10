// Note collection file

const { default: mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Each note must have a title"],
        unique: false
    },
    content: {
        type: String,
        required: [true, "Each note must have some content."],
        unique: false
    }
})

const notesSchema = new mongoose.Schema({
    _id: {  // will be ID of user
        type: String
    },
    notes: [noteSchema]
})

module.exports = mongoose.model.Notes || mongoose.model("Notes", notesSchema);
