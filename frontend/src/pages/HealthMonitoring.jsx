import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Sidebar from "../components/Sidebar";


// ============================================================
// SOCKET.IO
// ============================================================

const SOCKET_URL =
    import.meta.env.VITE_SOCKET_URL ||
    window.location.origin;


// ============================================================
// HEALTH MONITORING
// ============================================================

function HealthMonitoring() {

    // ========================================================
    // LIVE DATA
    // ========================================================

    const [liveData, setLiveData] =
        useState(null);


    // ========================================================
    // CONNECTION STATUS
    // ========================================================

    const [connected, setConnected] =
        useState(false);


    // ========================================================
    // LAST UPDATE
    // ========================================================

    const [lastUpdate, setLastUpdate] =
        useState("--");


    // ========================================================
    // SOCKET CONNECTION
    // ========================================================

    useEffect(() => {

        const socket =
            io(SOCKET_URL, {

                transports: [
                    "websocket",
                    "polling"
                ],

                reconnection: true,

                reconnectionAttempts: Infinity,

                reconnectionDelay: 1000

            });


        // ====================================================
        // CONNECTED
        // ====================================================

        socket.on(
            "connect",
            () => {

                console.log(
                    "Health Monitoring Socket Connected:",
                    socket.id
                );

                setConnected(true);

            }
        );


        // ====================================================
        // LIVE MQTT DATA
        // ====================================================

        socket.on(
            "liveData",
            (data) => {

                console.log(
                    "Health Monitoring LIVE DATA:",
                    data
                );

                setLiveData(data);

                setLastUpdate(
                    new Date().toLocaleTimeString()
                );

            }
        );


        // ====================================================
        // DISCONNECTED
        // ====================================================

        socket.on(
            "disconnect",
            () => {

                console.log(
                    "Health Monitoring Socket Disconnected"
                );

                setConnected(false);

            }
        );


        // ====================================================
        // CONNECTION ERROR
        // ====================================================

        socket.on(
            "connect_error",
            (error) => {

                console.error(
                    "Socket Connection Error:",
                    error.message
                );

                setConnected(false);

            }
        );


        // ====================================================
        // CLEANUP
        // ====================================================

        return () => {

            socket.disconnect();

        };

    }, []);


    // ========================================================
    // DATABASE VALUES
    // ========================================================

    const database =
        liveData?.database || {};


    // ========================================================
    // DEVICE ID
    // ========================================================

    const deviceId =
        String(
            liveData?.DeviceId ||
            "Energy_Meter_001"
        ).replace(
            /"/g,
            ""
        );


    // ========================================================
    // VALUES
    // ========================================================

    const voltageR =
        Number(
            database.vr ?? liveData?.REG1 ?? 0
        );

    const voltageY =
        Number(
            database.vy ?? liveData?.REG3 ?? 0
        );

    const voltageB =
        Number(
            database.vb ?? liveData?.REG5 ?? 0
        );


    const currentR =
        Number(
            database.ir ?? liveData?.REG17 ?? 0
        );

    const currentY =
        Number(
            database.iy ?? liveData?.REG19 ?? 0
        );

    const currentB =
        Number(
            database.ib ?? liveData?.REG21 ?? 0
        );


    const frequency =
        Number(
            database.freq ??
            liveData?.REG57 ??
            0
        );


    const powerFactor =
        Number(
            database.pf ??
            liveData?.REG55 ??
            0
        );


    const power =
        Number(
            database.total_kw ??
            liveData?.REG43 ??
            0
        );


    const energy =
        Number(
            database.kwh ??
            liveData?.REG59 ??
            0
        );


    // ========================================================
    // HELPER
    // ========================================================

    const formatValue = (
        value,
        decimals = 2
    ) => {

        if (
            !Number.isFinite(value)
        ) {

            return "0.00";

        }

        return value.toFixed(decimals);

    };


    // ========================================================
    // VOLTAGE STATUS
    // ========================================================

    const getVoltageStatus = (
        value
    ) => {

        if (value <= 0) {

            return {
                label: "No Data",
                className:
                    "bg-gray-100 text-gray-600"
            };

        }

        if (
            value >= 200 &&
            value <= 250
        ) {

            return {
                label: "Normal",
                className:
                    "bg-green-100 text-green-700"
            };

        }

        if (
            value >= 180 &&
            value <= 270
        ) {

            return {
                label: "Warning",
                className:
                    "bg-yellow-100 text-yellow-700"
            };

        }

        return {
            label: "Critical",
            className:
                "bg-red-100 text-red-700"
        };

    };


    // ========================================================
    // CURRENT STATUS
    // ========================================================

    const getCurrentStatus = (
        value
    ) => {

        if (value <= 0) {

            return {
                label: "Idle",
                className:
                    "bg-gray-100 text-gray-600"
            };

        }

        return {
            label: "Active",
            className:
                "bg-green-100 text-green-700"
        };

    };


    // ========================================================
    // FREQUENCY STATUS
    // ========================================================

    const frequencyNormal =
        frequency >= 49 &&
        frequency <= 51;


    // ========================================================
    // POWER FACTOR STATUS
    // ========================================================

    const pfNormal =
        powerFactor >= 0.90;


    // ========================================================
    // CARD COMPONENT
    // ========================================================

    const MetricCard = ({
        title,
        value,
        unit,
        icon,
        status
    }) => (

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-gray-500 text-sm font-semibold">

                        {title}

                    </p>

                    <div className="flex items-end gap-2 mt-4">

                        <p className="text-4xl font-black text-gray-800">

                            {value}

                        </p>

                        <p className="text-gray-500 font-semibold mb-1">

                            {unit}

                        </p>

                    </div>

                </div>

                <div className="text-4xl">

                    {icon}

                </div>

            </div>

            {status && (

                <div className="mt-5">

                    <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${status.className}`}
                    >

                        {status.label}

                    </span>

                </div>

            )}

        </div>

    );


    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex">

            {/* ==================================================
                SIDEBAR
            ================================================== */}

            <Sidebar />


            {/* ==================================================
                MAIN
            ================================================== */}

            <main className="flex-1 p-8 overflow-y-auto">


                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

                    <div>

                        <h1 className="text-5xl font-black text-gray-800 tracking-tight">

                            Health Monitoring

                        </h1>

                        <p className="text-gray-500 mt-3 text-lg">

                            Real-time energy meter health and electrical parameter monitoring

                        </p>

                    </div>


                    {/* ==================================================
                        CONNECTION STATUS
                    ================================================== */}

                    <div
                        className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-md ${connected
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                    >

                        <div className="relative">

                            <div
                                className={`w-3 h-3 rounded-full ${connected
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}
                            />

                            {connected && (

                                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />

                            )}

                        </div>

                        <span
                            className={`font-bold text-sm ${connected
                                    ? "text-green-700"
                                    : "text-red-700"
                                }`}
                        >

                            {connected
                                ? "LIVE"
                                : "OFFLINE"}

                        </span>

                    </div>

                </div>


                {/* ==================================================
                    DEVICE INFORMATION
                ================================================== */}

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-8">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                            <p className="text-gray-500 text-sm font-semibold">

                                Monitoring Device

                            </p>

                            <h2 className="text-2xl font-black text-gray-800 mt-1">

                                {deviceId}

                            </h2>

                        </div>

                        <div className="text-right">

                            <p className="text-gray-500 text-sm">

                                Last Update

                            </p>

                            <p className="font-bold text-gray-700 mt-1">

                                {lastUpdate}

                            </p>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    POWER OVERVIEW
                ================================================== */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">


                    <MetricCard
                        title="Active Power"
                        value={formatValue(power, 3)}
                        unit="kW"
                        icon="⚡"
                        status={
                            power > 0
                                ? {
                                    label: "Generating",
                                    className:
                                        "bg-green-100 text-green-700"
                                }
                                : {
                                    label: "Idle",
                                    className:
                                        "bg-gray-100 text-gray-600"
                                }
                        }
                    />


                    <MetricCard
                        title="Energy Meter"
                        value={formatValue(energy, 2)}
                        unit="kWh"
                        icon="🔋"
                    />


                    <MetricCard
                        title="Power Factor"
                        value={formatValue(powerFactor, 3)}
                        unit=""
                        icon="📊"
                        status={
                            pfNormal
                                ? {
                                    label: "Healthy",
                                    className:
                                        "bg-green-100 text-green-700"
                                }
                                : {
                                    label: "Check",
                                    className:
                                        "bg-yellow-100 text-yellow-700"
                                }
                        }
                    />


                    <MetricCard
                        title="Frequency"
                        value={formatValue(frequency, 2)}
                        unit="Hz"
                        icon="〰️"
                        status={
                            frequencyNormal
                                ? {
                                    label: "Normal",
                                    className:
                                        "bg-green-100 text-green-700"
                                }
                                : {
                                    label: "Check",
                                    className:
                                        "bg-yellow-100 text-yellow-700"
                                }
                        }
                    />

                </div>


                {/* ==================================================
                    VOLTAGE
                ================================================== */}

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">

                    <div className="flex items-center justify-between mb-7">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Phase Voltage

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Real-time three-phase voltage monitoring

                            </p>

                        </div>

                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">

                            VOLTAGE

                        </span>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                        {/* R */}

                        <div className="rounded-2xl border border-red-100 bg-red-50 p-6">

                            <div className="flex justify-between items-center">

                                <p className="font-bold text-gray-700">

                                    Phase R

                                </p>

                                <span className="text-red-500 font-black">

                                    R

                                </span>

                            </div>

                            <p className="text-4xl font-black text-gray-800 mt-5">

                                {formatValue(
                                    voltageR,
                                    2
                                )}

                                <span className="text-lg text-gray-500 ml-2">

                                    V

                                </span>

                            </p>

                            <div className="mt-4">

                                <span
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${getVoltageStatus(
                                        voltageR
                                    ).className
                                        }`}
                                >

                                    {
                                        getVoltageStatus(
                                            voltageR
                                        ).label
                                    }

                                </span>

                            </div>

                        </div>


                        {/* Y */}

                        <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-6">

                            <div className="flex justify-between items-center">

                                <p className="font-bold text-gray-700">

                                    Phase Y

                                </p>

                                <span className="text-yellow-500 font-black">

                                    Y

                                </span>

                            </div>

                            <p className="text-4xl font-black text-gray-800 mt-5">

                                {formatValue(
                                    voltageY,
                                    2
                                )}

                                <span className="text-lg text-gray-500 ml-2">

                                    V

                                </span>

                            </p>

                            <div className="mt-4">

                                <span
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${getVoltageStatus(
                                        voltageY
                                    ).className
                                        }`}
                                >

                                    {
                                        getVoltageStatus(
                                            voltageY
                                        ).label
                                    }

                                </span>

                            </div>

                        </div>


                        {/* B */}

                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

                            <div className="flex justify-between items-center">

                                <p className="font-bold text-gray-700">

                                    Phase B

                                </p>

                                <span className="text-blue-500 font-black">

                                    B

                                </span>

                            </div>

                            <p className="text-4xl font-black text-gray-800 mt-5">

                                {formatValue(
                                    voltageB,
                                    2
                                )}

                                <span className="text-lg text-gray-500 ml-2">

                                    V

                                </span>

                            </p>

                            <div className="mt-4">

                                <span
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${getVoltageStatus(
                                        voltageB
                                    ).className
                                        }`}
                                >

                                    {
                                        getVoltageStatus(
                                            voltageB
                                        ).label
                                    }

                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    CURRENT
                ================================================== */}

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">

                    <div className="flex items-center justify-between mb-7">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Phase Current

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Real-time three-phase current monitoring

                            </p>

                        </div>

                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold">

                            CURRENT

                        </span>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                        <div className="rounded-2xl border border-red-100 bg-red-50 p-6">

                            <p className="font-bold text-gray-700">

                                Current R

                            </p>

                            <p className="text-4xl font-black text-gray-800 mt-5">

                                {formatValue(
                                    currentR,
                                    2
                                )}

                                <span className="text-lg text-gray-500 ml-2">

                                    A

                                </span>

                            </p>

                            <div className="mt-4">

                                <span
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${getCurrentStatus(
                                        currentR
                                    ).className
                                        }`}
                                >

                                    {
                                        getCurrentStatus(
                                            currentR
                                        ).label
                                    }

                                </span>

                            </div>

                        </div>


                        <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-6">

                            <p className="font-bold text-gray-700">

                                Current Y

                            </p>

                            <p className="text-4xl font-black text-gray-800 mt-5">

                                {formatValue(
                                    currentY,
                                    2
                                )}

                                <span className="text-lg text-gray-500 ml-2">

                                    A

                                </span>

                            </p>

                            <div className="mt-4">

                                <span
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${getCurrentStatus(
                                        currentY
                                    ).className
                                        }`}
                                >

                                    {
                                        getCurrentStatus(
                                            currentY
                                        ).label
                                    }

                                </span>

                            </div>

                        </div>


                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

                            <p className="font-bold text-gray-700">

                                Current B

                            </p>

                            <p className="text-4xl font-black text-gray-800 mt-5">

                                {formatValue(
                                    currentB,
                                    2
                                )}

                                <span className="text-lg text-gray-500 ml-2">

                                    A

                                </span>

                            </p>

                            <div className="mt-4">

                                <span
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${getCurrentStatus(
                                        currentB
                                    ).className
                                        }`}
                                >

                                    {
                                        getCurrentStatus(
                                            currentB
                                        ).label
                                    }

                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    SYSTEM HEALTH
                ================================================== */}

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

                    <div className="flex items-center justify-between mb-7">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                System Health

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Current communication and electrical system status

                            </p>

                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-bold ${connected
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                        >

                            {connected
                                ? "SYSTEM ONLINE"
                                : "SYSTEM OFFLINE"}

                        </span>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">


                        <div className="border border-gray-100 rounded-2xl p-5">

                            <p className="text-gray-500 text-sm">

                                MQTT Connection

                            </p>

                            <p className="text-lg font-black text-green-600 mt-2">

                                Connected

                            </p>

                        </div>


                        <div className="border border-gray-100 rounded-2xl p-5">

                            <p className="text-gray-500 text-sm">

                                Socket.IO

                            </p>

                            <p
                                className={`text-lg font-black mt-2 ${connected
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >

                                {connected
                                    ? "Connected"
                                    : "Disconnected"}

                            </p>

                        </div>


                        <div className="border border-gray-100 rounded-2xl p-5">

                            <p className="text-gray-500 text-sm">

                                Database

                            </p>

                            <p className="text-lg font-black text-green-600 mt-2">

                                MySQL Active

                            </p>

                        </div>


                        <div className="border border-gray-100 rounded-2xl p-5">

                            <p className="text-gray-500 text-sm">

                                Data Stream

                            </p>

                            <p className="text-lg font-black text-green-600 mt-2">

                                Live

                            </p>

                        </div>

                    </div>

                </div>


            </main>

        </div>

    );

}


export default HealthMonitoring;