const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    client: {
        type: String,
        required: true
    },

    project: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "user"
    }

})

module.exports =
    mongoose.model("User", UserSchema)