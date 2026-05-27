const express = require("express")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const User = require("../models/User")

const router = express.Router()

// REGISTER

router.post("/register", async (req, res) => {

    const {
        username,
        password,
        client,
        project
    } = req.body

    try {

        const hashedPassword =
            await bcrypt.hash(password, 10)

        const user = new User({

            username,
            password: hashedPassword,
            client,
            project

        })

        await user.save()

        res.json({
            message: "User Registered"
        })

    } catch (error) {

        res.status(500).json(error)

    }

})

// LOGIN

router.post("/login", async (req, res) => {

    const {
        username,
        password,
        client,
        project
    } = req.body

    try {

        const user =
            await User.findOne({

                username,
                client,
                project

            })

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            })

        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            )

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Password"
            })

        }

        const token =
            jwt.sign(

                {
                    id: user._id,
                    role: user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1d"
                }

            )

        res.json({

            token,

            user: {

                username: user.username,

                client: user.client,

                project: user.project,

                role: user.role

            }

        })

    } catch (error) {

        res.status(500).json(error)

    }

})

module.exports = router