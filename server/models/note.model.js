// Note collection file

const { default: mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Each note must have a title"],
        unique: [true, "Each title must be unique"]
    },
    content: {
        type: String,
        required: [true, "Each note must have some content."],
        unique: false
    }
})

const notesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please provide an email."],
        unique: [true, "Email exists"]
    },
    notes: [noteSchema]
})

module.exports = mongoose.model.Notes || mongoose.model("Notes", notesSchema);
