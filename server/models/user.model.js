// User collection file.

const { default: mongoose } = require("mongoose");

const userSchema =  new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email!"],
        unique: [true, "Email exists."]
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false
    }
})

// if model doesn't exist --> create it.
module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
