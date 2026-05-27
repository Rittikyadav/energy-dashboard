const mongoose = require("mongoose")

const DeviceSchema = new mongoose.Schema({

    deviceName: {
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    clientName: {
        type: String,
        required: true
    },

    projectName: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Online"
    }

})

module.exports =
    mongoose.model("Device", DeviceSchema)