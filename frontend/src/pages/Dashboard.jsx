// ===============================
// DASHBOARD.JSX
// ===============================

import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import axios from "axios"

import { io } from "socket.io-client"

import {
    Activity,
    Sun,
    Clock3,
    CalendarDays,
    Cpu,
    Zap,
    GaugeCircle,
    Wifi,
    Sunrise,
    Sunset
} from "lucide-react"

import Sidebar from "../components/Sidebar"
import AlarmPanel from "../components/AlarmPanel"

import PowerTrendChart from "../charts/PowerTrendChart"
import VoltageChart from "../charts/VoltageChart"
import CurrentChart from "../charts/CurrentChart"

import { getSunData } from "../services/sunService"

const socket = io(import.meta.env.VITE_SOCKET_URL || window.location.origin)

function Dashboard() {

    const navigate = useNavigate()

    // ===============================
    // LIVE DATA
    // ===============================

    const selectedAssignment = JSON.parse(
        localStorage.getItem("selectedAssignment") || "null")

    const [liveData, setLiveData] =
        useState(null)

    const [trendData, setTrendData] =
        useState([])

    // ===============================
    // SYSTEM STATES
    // ===============================

    const [plantCapacity, setPlantCapacity] =
        useState("30")

    const [irradiance, setIrradiance] =
        useState("0")

    // ===============================
    // TIME
    // ===============================

    const [currentTime, setCurrentTime] =
        useState("")

    const [currentDate, setCurrentDate] =
        useState("")

    // Date used for historical dashboard/API data
    const [selectedDate, setSelectedDate] =
        useState(() => {
            const now = new Date()
            const year = now.getFullYear()
            const month = String(now.getMonth() + 1).padStart(2, "0")
            const day = String(now.getDate()).padStart(2, "0")
            return `${year}-${month}-${day}`
        })

    // ===============================
    // RUNTIME
    // ===============================

    const [solarRuntime, setSolarRuntime] =
        useState("0h 0m")

    // ===============================
    // SUN DATA
    // ===============================

    const [sunrise, setSunrise] =
        useState("--")

    const [sunset, setSunset] =
        useState("--")

    // ===============================
    // PLANT TOTAL RUNTIME
    // ===============================

    const [runningDays, setRunningDays] =
        useState(0)

    const [runningHours, setRunningHours] =
        useState(0)

    // ===============================
    // SOCKET MQTT
    // ===============================

    useEffect(() => {

        const handleLiveData = (data) => {

            console.log("LIVE DATA RECEIVED:", data)

            const assignment = JSON.parse(
                localStorage.getItem("selectedAssignment") || "null"
            )

            if (!assignment) {
                console.warn("No selected device assignment")
                return
            }

            const database = data?.database

            if (!database) {
                console.warn("Live packet does not contain database mapping")
                return
            }

            const meterMatch =
                String(database.meter_id || "") ===
                String(assignment.meter_id || "")

            const gatewayMatch =
                String(database.gateway_id || "") ===
                String(assignment.gateway_id || "")

            if (!meterMatch || !gatewayMatch) {
                console.log("Ignoring live data from another device:", {
                    receivedMeter: database.meter_id,
                    assignedMeter: assignment.meter_id,
                    receivedGateway: database.gateway_id,
                    assignedGateway: assignment.gateway_id
                })
                return
            }

            console.log("Accepted live data:", {
                plant: assignment.plantname,
                meter: assignment.meter_name,
                device: assignment.device_id
            })

            setLiveData(data)
        }

        socket.on("liveData", handleLiveData)

        return () => {
            socket.off("liveData", handleLiveData)
        }

    }, [])

    // ===============================
    // FETCH API DATA
    // ===============================

    useEffect(() => {

        axios

            .get(

                `https://rail.sustiknow.com/getOrders.php?date=${selectedDate}`

            )

            .then((res) => {

                const apiData =
                    res.data.data || []

                setTrendData(apiData)

                // ===============================
                // CAPACITY
                // ===============================

                if (
                    res.data.plantkwp &&
                    res.data.plantkwp[0]
                ) {

                    setPlantCapacity(

                        res.data.plantkwp[0].capacity

                    )

                }

                // ===============================
                // IRRADIANCE
                // ===============================

                if (
                    res.data.irradiance &&
                    res.data.irradiance[0]
                ) {

                    setIrradiance(

                        res.data.irradiance[0].asi

                    )

                }

                // ===============================
                // ACTIVE RECORDS
                // ===============================

                const activeRecords =
                    apiData.filter(

                        (item) =>

                            parseFloat(
                                item.total_kw || 0
                            ) > 2

                    )

                // ===============================
                // ACTUAL SOLAR RUNTIME
                // ===============================

                if (activeRecords.length > 1) {

                    let runtimeMinutes = 0

                    for (
                        let i = 1;
                        i < activeRecords.length;
                        i++
                    ) {

                        const prev =
                            activeRecords[i - 1]

                        const curr =
                            activeRecords[i]

                        const prevDate =
                            new Date()

                        prevDate.setHours(
                            parseInt(prev.loghh),
                            parseInt(prev.logmi),
                            0
                        )

                        const currDate =
                            new Date()

                        currDate.setHours(
                            parseInt(curr.loghh),
                            parseInt(curr.logmi),
                            0
                        )

                        const diff =
                            (
                                currDate -
                                prevDate
                            ) / (1000 * 60)

                        // ignore broken communication gaps

                        if (diff < 20) {

                            runtimeMinutes += diff

                        }

                    }

                    const diffHours =
                        Math.floor(
                            runtimeMinutes / 60
                        )

                    const diffMinutes =
                        Math.floor(
                            runtimeMinutes % 60
                        )

                    setSolarRuntime(

                        `${diffHours}h ${diffMinutes}m`

                    )

                }

            })

            .catch((err) => {

                console.log(err)

            })

        // ===============================
        // SUNRISE SUNSET
        // ===============================

        getSunData().then((sunData) => {

            if (sunData) {

                const sunriseTime =
                    new Date(
                        sunData.sunrise
                    )

                const sunsetTime =
                    new Date(
                        sunData.sunset
                    )

                setSunrise(

                    sunriseTime.toLocaleTimeString([], {

                        hour: "2-digit",

                        minute: "2-digit"

                    })

                )

                setSunset(

                    sunsetTime.toLocaleTimeString([], {

                        hour: "2-digit",

                        minute: "2-digit"

                    })

                )

            }

        })

    }, [selectedDate])

    // ===============================
    // LIVE CLOCK
    // ===============================

    useEffect(() => {

        const timer = setInterval(() => {

            const now =
                new Date()

            const time =
                now.toLocaleTimeString([], {

                    hour: "2-digit",

                    minute: "2-digit",

                    second: "2-digit"

                })

            setCurrentTime(time)

            const date =
                now.toLocaleDateString("en-IN", {

                    weekday: "long",

                    day: "2-digit",

                    month: "long",

                    year: "numeric"

                })

            setCurrentDate(date)

        }, 1000)

        // ===============================
        // PLANT START DATE
        // ===============================

        const startDate =
            new Date("2026-02-22T00:00:00")

        const now =
            new Date()

        const diffMs =
            now - startDate

        const days =
            Math.floor(

                diffMs /
                (1000 * 60 * 60 * 24)

            )

        const hours =
            Math.floor(

                diffMs /
                (1000 * 60 * 60)

            )

        setRunningDays(days)

        setRunningHours(hours)

        return () =>
            clearInterval(timer)

    }, [])

    // ===============================
    // BACK TO DEVICE SELECTION
    // ===============================

    const handleBackToDevices = () => {
        localStorage.removeItem("selectedAssignment")
        navigate("/device-selection", { replace: true })
    }

    // ===============================
    // UI
    // ===============================

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-green-50 flex">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN */}

            <main className="flex-1 p-8 overflow-y-auto">

                {/* HEADER */}

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-10 gap-5">

                    <div className="flex items-center gap-5">

                        {/* LOGO */}

                        <div className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-3 w-28 h-28 flex items-center justify-center overflow-hidden">

                            <img
                                src="/logo.png"
                                alt="logo"
                                className="w-full h-full object-contain scale-110"
                            />

                        </div>

                        <div>

                            <h1 className="text-5xl font-black text-gray-800 tracking-tight">

                                {selectedAssignment?.plantname ||
                                    "Solar SCADA Dashboard"}

                            </h1>

                            <p className="text-gray-500 mt-3 text-lg">

                                {selectedAssignment
                                    ? `${selectedAssignment.meter_name} • Device ${selectedAssignment.device_id}`
                                    : "Real-Time Energy Monitoring Platform"}

                            </p>

                            <div className="mt-4 flex items-center gap-3">

                                <label
                                    htmlFor="dashboard-date"
                                    className="text-sm font-semibold text-gray-500"
                                >
                                    Data Date
                                </label>

                                <input
                                    id="dashboard-date"
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="px-4 py-2 rounded-xl border border-gray-200 shadow-sm font-semibold text-gray-700 bg-white"
                                />

                            </div>

                        </div>

                    </div>

                    {/* LIVE */}

                    <div className="mt-6 xl:mt-0 flex items-center gap-3 bg-green-100 text-green-700 px-6 py-4 rounded-2xl shadow-xl">

                        <Wifi size={24} />

                        <span className="font-black text-lg">

                            LIVE SYSTEM ACTIVE

                        </span>

                    </div>

                    <button
                        onClick={handleBackToDevices}
                        className="self-start xl:self-center px-6 py-4 rounded-2xl bg-white border border-green-200 text-green-700 font-bold shadow-lg hover:bg-green-50 hover:scale-[1.02] transition"
                    >
                        ← Back to Devices
                    </button>
                </div>

                {/* KPI ROW */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                    {/* TIME */}

                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[30px] p-8 shadow-2xl text-white">

                        <Clock3 size={34} />

                        <h3 className="mt-6 text-lg font-semibold">

                            System Time

                        </h3>

                        <p className="text-5xl font-black mt-4">

                            {currentTime}

                        </p>

                        <p className="mt-3 text-blue-100">

                            {currentDate}

                        </p>

                    </div>

                    {/* RUNTIME */}

                    <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-[30px] p-8 shadow-2xl text-white">

                        <CalendarDays size={34} />

                        <h3 className="mt-6 text-lg font-semibold">

                            Plant Runtime

                        </h3>

                        <p className="text-5xl font-black mt-4">

                            {runningDays} Days

                        </p>

                        <p className="mt-3 text-green-100 text-lg">

                            {runningHours} Hours

                        </p>

                    </div>

                    {/* SOLAR RUNTIME */}

                    <div className="bg-white rounded-[30px] shadow-2xl border border-orange-100 p-8">

                        <Sun
                            size={34}
                            className="text-orange-500"
                        />

                        <h3 className="mt-6 text-lg font-semibold text-gray-500">

                            Today's Solar Runtime

                        </h3>

                        <p className="text-5xl font-black mt-4 text-orange-500">

                            {solarRuntime}

                        </p>

                        <p className="mt-3 text-gray-500">

                            Actual Runtime From Voltage

                        </p>

                    </div>

                    {/* CAPACITY */}

                    <div className="bg-white rounded-[30px] shadow-2xl border border-blue-100 p-8">

                        <Zap
                            size={34}
                            className="text-blue-600"
                        />

                        <h3 className="mt-6 text-lg font-semibold text-gray-500">

                            Installed Plant Capacity

                        </h3>

                        <p className="text-5xl font-black mt-4 text-blue-600">

                            {plantCapacity}

                        </p>

                        <p className="mt-3 text-gray-500">

                            kWp

                        </p>

                    </div>

                </div>

                {/* SUN DATA */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

                    {/* SUNRISE */}

                    <div className="bg-gradient-to-br from-orange-200 to-yellow-100 rounded-[26px] p-6 shadow-xl text-orange-900 border border-orange-100">

                        <Sunrise
                            size={30}
                            className="text-orange-600"
                        />

                        <h3 className="mt-4 text-base font-semibold">

                            Sunrise Time

                        </h3>

                        <p className="text-4xl font-black mt-3">

                            {sunrise}

                        </p>

                    </div>

                    {/* SUNSET */}

                    <div className="bg-gradient-to-br from-indigo-200 to-purple-100 rounded-[26px] p-6 shadow-xl text-indigo-900 border border-indigo-100">

                        <Sunset
                            size={30}
                            className="text-indigo-600"
                        />

                        <h3 className="mt-4 text-base font-semibold">

                            Sunset Time

                        </h3>

                        <p className="text-4xl font-black mt-3">

                            {sunset}

                        </p>

                    </div>

                </div>

                {/* LIVE DATA */}

                {liveData && (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                        <div className="bg-white rounded-[30px] shadow-xl p-8">

                            <Activity className="text-blue-500" />

                            <h3 className="mt-6 text-gray-500 font-semibold">

                                Voltage R

                            </h3>

                            <p className="text-5xl font-black mt-4 text-blue-600">

                                {liveData.REG1?.toFixed(1)}

                            </p>

                            <p className="mt-2 text-gray-400">

                                Volts

                            </p>

                        </div>

                        <div className="bg-white rounded-[30px] shadow-xl p-8">

                            <Activity className="text-yellow-500" />

                            <h3 className="mt-6 text-gray-500 font-semibold">

                                Voltage Y

                            </h3>

                            <p className="text-5xl font-black mt-4 text-yellow-500">

                                {liveData.REG3?.toFixed(1)}

                            </p>

                            <p className="mt-2 text-gray-400">

                                Volts

                            </p>

                        </div>

                        <div className="bg-white rounded-[30px] shadow-xl p-8">

                            <Activity className="text-purple-500" />

                            <h3 className="mt-6 text-gray-500 font-semibold">

                                Voltage B

                            </h3>

                            <p className="text-5xl font-black mt-4 text-purple-500">

                                {liveData.REG5?.toFixed(1)}

                            </p>

                            <p className="mt-2 text-gray-400">

                                Volts

                            </p>

                        </div>

                        <div className="bg-white rounded-[30px] shadow-xl p-8">

                            <GaugeCircle className="text-green-500" />

                            <h3 className="mt-6 text-gray-500 font-semibold">

                                Active Power

                            </h3>

                            <p className="text-5xl font-black mt-4 text-green-600">

                                {liveData.REG43?.toFixed(1)}

                            </p>

                            <p className="mt-2 text-gray-400">

                                kW

                            </p>

                        </div>

                    </div>

                )}

                {/* CHARTS */}

                <div className="bg-white rounded-[30px] shadow-2xl p-8 mb-10">

                    <div className="flex items-center gap-3 mb-8">

                        <Cpu
                            size={30}
                            className="text-blue-600"
                        />

                        <h2 className="text-3xl font-black text-gray-800">

                            Power Trend Analytics

                        </h2>

                    </div>

                    <PowerTrendChart
                        trendData={trendData}
                    />

                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

                    <div className="bg-white rounded-[30px] shadow-2xl p-6">

                        <VoltageChart
                            trendData={trendData}
                        />

                    </div>

                    <div className="bg-white rounded-[30px] shadow-2xl p-6">

                        <CurrentChart
                            trendData={trendData}
                        />

                    </div>

                </div>

                {/* ALARM */}

                <AlarmPanel
                    liveData={liveData}
                />

                {/* FOOTER */}

                <div className="mt-16">

                    <div className="bg-white border border-gray-100 shadow-xl rounded-[24px] px-6 py-5 flex flex-col md:flex-row items-center justify-between">

                        <div>

                            <h3 className="text-xl font-black text-gray-800">

                                Smart Energy Monitoring System

                            </h3>

                            <p className="text-gray-500 mt-1">

                                Industrial Solar SCADA Platform

                            </p>

                        </div>

                        <div className="mt-4 md:mt-0">

                            <p className="text-gray-600 font-semibold">

                                © 2026 Designed & Developed by

                                <span className="text-green-600 font-black">

                                    {" "}R YADAV — SDE 1

                                </span>

                            </p>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    )
}

export default Dashboard
