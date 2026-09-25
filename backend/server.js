require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mqtt = require("mqtt");
const mysql = require("mysql2/promise");

// ==========================================
// ROUTES
// ==========================================

const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const clientPortalRoutes = require("./routes/clientPortalRoutes");
const scadaRoutes = require("./routes/scadaRoutes");

// ==========================================
// EXPRESS
// ==========================================

const app = express();

app.use(
    cors({
        origin: "*"
    })
);

app.use(express.json());

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientPortalRoutes);
app.use("/api/scada", scadaRoutes);

// ==========================================
// HTTP SERVER
// ==========================================

const server = http.createServer(app);

// ==========================================
// SOCKET.IO
// ==========================================

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// ==========================================
// MYSQL CONNECTION
// ==========================================

const mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST || "127.0.0.1",

    port: Number(
        process.env.MYSQL_PORT || 3306
    ),

    user: process.env.MYSQL_USER,

    password:
        process.env.MYSQL_PASSWORD || "",

    database:
        process.env.MYSQL_DATABASE || "energydb",

    waitForConnections: true,

    connectionLimit: 5,

    queueLimit: 0
});

// ==========================================
// TEST MYSQL
// ==========================================

async function testMySQL() {

    try {

        const connection =
            await mysqlPool.getConnection();

        await connection.query("SELECT 1");

        connection.release();

        console.log("MySQL Connected");

    } catch (error) {

        console.error(
            "MySQL Connection Error:",
            error.message
        );

    }

}

testMySQL();

// ==========================================
// MQTT CONFIGURATION
// ==========================================

const mqttBroker =
    process.env.MQTT_BROKER ||
    "mqtt://127.0.0.1:1883";

const mqttTopic =
    process.env.MQTT_TOPIC ||
    "Smart_ENergy_Meter";

// ==========================================
// MQTT CONNECTION
// ==========================================

const mqttClient =
    mqtt.connect(mqttBroker);

// ==========================================
// MQTT CONNECT
// ==========================================

mqttClient.on("connect", () => {

    console.log("MQTT Connected");

    mqttClient.subscribe(
        mqttTopic,
        (error) => {

            if (error) {

                console.error(
                    "MQTT Subscribe Error:",
                    error.message
                );

                return;
            }

            console.log(
                `Subscribed to ${mqttTopic}`
            );

        }
    );

});

// ==========================================
// MQTT ERROR
// ==========================================

mqttClient.on("error", (error) => {

    console.error(
        "MQTT Error:",
        error.message
    );

});

// ==========================================
// MQTT RECONNECT
// ==========================================

mqttClient.on("reconnect", () => {

    console.log(
        "MQTT reconnecting..."
    );

});

// ==========================================
// MQTT OFFLINE
// ==========================================

mqttClient.on("offline", () => {

    console.log(
        "MQTT offline"
    );

});

// ==========================================
// MQTT DATA
// ==========================================

mqttClient.on(
    "message",
    async (topic, message) => {

        try {

            // ======================================
            // CHECK TOPIC
            // ======================================

            if (topic !== mqttTopic) {

                return;

            }

            // ======================================
            // PARSE MQTT DATA
            // ======================================

            const data =
                JSON.parse(
                    message.toString()
                );

            // ======================================
            // DEVICE INFORMATION
            // ======================================

            const deviceId =
                String(
                    data.DeviceId || ""
                ).replace(/"/g, "");

            // ======================================
            // MQTT → DATABASE MAPPING
            // ======================================

            // Resolve the device mapping from the
            // active admin assignment.
            //
            // This keeps future devices isolated
            // instead of using one hard-coded
            // meter/gateway.

            const [deviceMappings] =
                await mysqlPool.query(
                    `
                    SELECT gateway_id, meter_id
                    FROM client_assignments
                    WHERE device_id = ?
                      AND active = 1
                    ORDER BY assignment_id DESC
                    LIMIT 1
                    `,
                    [deviceId]
                );

            const deviceMapping =
                deviceMappings[0] || {};

            const row = {

                freq:
                    Number(
                        data.REG57
                    ) || 0,

                gateway_id:
                    deviceMapping.gateway_id ||
                    "2222",

                ib:
                    Number(
                        data.REG21
                    ) || 0,

                ir:
                    Number(
                        data.REG17
                    ) || 0,

                iy:
                    Number(
                        data.REG19
                    ) || 0,

                kwh:
                    Number(
                        data.REG59
                    ) || 0,

                meter_id:
                    deviceMapping.meter_id ||
                    "2",

                pf:
                    Number(
                        data.REG55
                    ) || 0,

                ts:
                    new Date(
                        Number(
                            data.time
                        ) * 1000
                    ).toISOString(),

                vb:
                    Number(
                        data.REG5
                    ) || 0,

                vln:
                    Number(
                        data.REG15
                    ) || 0,

                vr:
                    Number(
                        data.REG1
                    ) || 0,

                vy:
                    Number(
                        data.REG3
                    ) || 0,

                total_kw:
                    Number(
                        data.REG43
                    ) || 0

            };

            // ======================================
            // MQTT LOG
            // ======================================

            console.log(
                "MQTT:",
                deviceId,
                "KWH:",
                row.kwh,
                "KW:",
                row.total_kw
            );

            // ======================================
            // INSERT INTO input_em
            // ======================================

            const [result] =
                await mysqlPool.execute(
                    `
                    INSERT INTO input_em
                    (
                        freq,
                        gateway_id,
                        ib,
                        ir,
                        iy,
                        kwh,
                        meter_id,
                        pf,
                        ts,
                        vb,
                        vln,
                        vr,
                        vy,
                        total_kw
                    )
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `,
                    [
                        row.freq,
                        row.gateway_id,
                        row.ib,
                        row.ir,
                        row.iy,
                        row.kwh,
                        row.meter_id,
                        row.pf,
                        row.ts,
                        row.vb,
                        row.vln,
                        row.vr,
                        row.vy,
                        row.total_kw
                    ]
                );

            // ======================================
            // DATABASE INSERT LOG
            // ======================================

            console.log(
                "DB INSERTED ID:",
                result.insertId
            );

            // ======================================
            // UPDATE input_em_db
            // ======================================

            try {

                await mysqlPool.query(
                    "CALL adddatainput_em()"
                );

                console.log(
                    "input_em_db updated"
                );

            } catch (procedureError) {

                console.error(
                    "Procedure Error:",
                    procedureError.message
                );

            }

            // ======================================
            // SEND LIVE DATA TO FRONTEND
            // ======================================

            io.emit(
                "liveData",
                {
                    ...data,

                    deviceId:
                        deviceId,

                    database:
                        row,

                    dbId:
                        result.insertId
                }
            );

        } catch (error) {

            console.error(
                "MQTT Processing Error:",
                error.message
            );

        }

    }
);

// ==========================================
// BACKEND TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.json({

        status:
            "Backend Running",

        mqtt:
            mqttClient.connected,

        database:
            "MySQL",

        databaseName:
            process.env.MYSQL_DATABASE ||
            "energydb",

        mqttBroker:
            mqttBroker,

        mqttTopic:
            mqttTopic

    });

});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get(
    "/api/health",
    async (req, res) => {

        let mysqlStatus =
            false;

        try {

            await mysqlPool.query(
                "SELECT 1"
            );

            mysqlStatus =
                true;

        } catch (error) {

            mysqlStatus =
                false;

        }

        res.json({

            success:
                true,

            server:
                true,

            mqtt:
                mqttClient.connected,

            mysql:
                mysqlStatus,

            database:
                process.env.MYSQL_DATABASE ||
                "energydb",

            mqttTopic:
                mqttTopic,

            uptime:
                process.uptime()

        });

    }
);

// ==========================================
// SOCKET CONNECTION
// ==========================================

io.on(
    "connection",
    (socket) => {

        console.log(
            "Frontend Connected:",
            socket.id
        );

        socket.on(
            "disconnect",
            () => {

                console.log(
                    "Frontend Disconnected:",
                    socket.id
                );

            }
        );

    }
);

// ==========================================
// START SERVER
// ==========================================

const PORT =
    Number(
        process.env.PORT || 8000
    );

server.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

        console.log(
            `MQTT Broker: ${mqttBroker}`
        );

        console.log(
            `MQTT Topic: ${mqttTopic}`
        );

        console.log(
            `MySQL Database: ${process.env.MYSQL_DATABASE ||
            "energydb"
            }`
        );

    }
);

// ==========================================
// GRACEFUL SHUTDOWN
// ==========================================

async function shutdown() {

    console.log(
        "Shutting down server..."
    );

    try {

        await mysqlPool.end();

        mqttClient.end(
            true,
            () => {

                console.log(
                    "MQTT disconnected"
                );

            }
        );

        server.close(
            () => {

                console.log(
                    "HTTP server closed"
                );

                process.exit(0);

            }
        );

    } catch (error) {

        console.error(
            "Shutdown Error:",
            error.message
        );

        process.exit(1);

    }

}

process.on(
    "SIGINT",
    shutdown
);

process.on(
    "SIGTERM",
    shutdown
);