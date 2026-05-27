const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({

    clientName: {
        type: String,
        required: true
    },

    projectName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

})

module.exports =
    mongoose.model("Client", ClientSchema)