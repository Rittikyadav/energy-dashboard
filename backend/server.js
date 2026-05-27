require("dotenv").config()

const express = require("express")

const cors = require("cors")

const http = require("http")

const { Server } = require("socket.io")

const mqtt = require("mqtt")

// DATABASE

const connectDB =
    require("./config/db")

// ROUTES

const authRoutes =
    require("./routes/authRoutes")

const clientRoutes =
    require("./routes/clientRoutes")

const deviceRoutes =
    require("./routes/deviceRoutes")

// EXPRESS APP

const app = express()

// CONNECT DATABASE

connectDB()

// MIDDLEWARE

app.use(cors())

app.use(express.json())

// API ROUTES

app.use("/api/auth", authRoutes)

app.use("/api/clients", clientRoutes)

app.use("/api/devices", deviceRoutes)

// CREATE HTTP SERVER

const server = http.createServer(app)

// SOCKET.IO

const io = new Server(server, {

    cors: {
        origin: "*"
    }

})

// MQTT CONNECTION

const mqttClient = mqtt.connect(
    "mqtt://213.190.4.113:1883"
)

// MQTT CONNECT EVENT

mqttClient.on("connect", () => {

    console.log("MQTT Connected")

    mqttClient.subscribe(
        "Smart_ENergy_Meter"
    )

})

// MQTT MESSAGE EVENT

mqttClient.on("message", (topic, message) => {

    try {

        const data =
            JSON.parse(message.toString())

        console.log("MQTT DATA:", data)

        // SEND DATA TO FRONTEND

        io.emit("liveData", data)

    } catch (error) {

        console.log(error)

    }

})

// TEST ROUTE

app.get("/", (req, res) => {

    res.send("Backend Running")

})

// SOCKET CONNECTION

io.on("connection", (socket) => {

    console.log("Frontend Connected")

    socket.on("disconnect", () => {

        console.log("Frontend Disconnected")

    })

})

// SERVER START

server.listen(process.env.PORT, () => {

    console.log(
        `Server running on port ${process.env.PORT}`
    )

})