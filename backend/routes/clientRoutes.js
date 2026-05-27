const express = require("express")

const Client =
    require("../models/Client")

const router = express.Router()

// GET ALL CLIENTS

router.get("/", async (req, res) => {

    try {

        const clients =
            await Client.find()

        res.json(clients)

    } catch (error) {

        res.status(500).json(error)

    }

})

// ADD CLIENT

router.post("/", async (req, res) => {

    try {

        const client = new Client(req.body)

        await client.save()

        res.json({
            message: "Client Added"
        })

    } catch (error) {

        res.status(500).json(error)

    }

})

module.exports = router