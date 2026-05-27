const express = require("express")

const Device =
    require("../models/Device")

const router = express.Router()

// GET ALL DEVICES

router.get("/", async (req, res) => {

    try {

        const devices =
            await Device.find()

        res.json(devices)

    } catch (error) {

        res.status(500).json(error)

    }

})

// ADD DEVICE

router.post("/", async (req, res) => {

    try {

        const device =
            new Device(req.body)

        await device.save()

        res.json({
            message: "Device Added"
        })

    } catch (error) {

        res.status(500).json(error)

    }

})

module.exports = router