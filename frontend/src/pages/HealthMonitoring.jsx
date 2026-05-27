import { useEffect, useState } from "react"

import { io } from "socket.io-client"

import Sidebar from "../components/Sidebar"

const socket = io("http://localhost:8000")

function HealthMonitoring() {

    const [liveData, setLiveData] =
        useState(null)

    // SOCKET DATA

    useEffect(() => {

        socket.on("liveData", (data) => {

            setLiveData(data)

        })

        return () => {

            socket.off("liveData")

        }

    }, [])

    // SAFE VALUE PARSER

    const safeValue = (value) =>

        Number(parseFloat(value || 0))

    // VOLTAGE VALUES

    const vr = safeValue(liveData?.REG1)

    const vy = safeValue(liveData?.REG3)

    const vb = safeValue(liveData?.REG5)

    // CURRENT VALUES

    const ir = safeValue(liveData?.REG17)

    const iy = safeValue(liveData?.REG19)

    const ib = safeValue(liveData?.REG21)

    // FREQUENCY VALUE

    const freq = safeValue(liveData?.REG57)

    // HEALTH CHECKS

    const voltageHealthy =

        vr >= 180 &&
        vr <= 260 &&

        vy >= 180 &&
        vy <= 260 &&

        vb >= 180 &&
        vb <= 260

    // CURRENT HEALTH

    const currentHealthy =

        ir >= 0 &&
        ir <= 150 &&

        iy >= 0 &&
        iy <= 150 &&

        ib >= 0 &&
        ib <= 150

    // FREQUENCY HEALTH

    const frequencyHealthy =

        freq >= 45 &&
        freq <= 55

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-green-50 flex">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN */}

            <main className="flex-1 p-8 overflow-y-auto">

                {/* HEADER */}

                <div className="mb-10">

                    <h1 className="text-5xl font-black text-gray-800 tracking-tight">

                        Health Monitoring Dashboard

                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">

                        Real-time industrial solar plant monitoring

                    </p>

                </div>

                {/* TOP STATUS */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                    {/* MQTT */}

                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[30px] shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-500">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    MQTT Status

                                </h3>

                                <p className="text-4xl font-black mt-5">

                                    Connected

                                </p>

                                <p className="mt-2 text-green-100">

                                    Live Telemetry Active

                                </p>

                            </div>

                            <div className="relative">

                                <div className="w-5 h-5 bg-white rounded-full"></div>

                                <div className="absolute inset-0 w-5 h-5 bg-white rounded-full animate-ping opacity-70"></div>

                            </div>

                        </div>

                    </div>

                    {/* DEVICE */}

                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[30px] shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-500">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Device Status

                                </h3>

                                <p className="text-4xl font-black mt-5">

                                    Online

                                </p>

                                <p className="mt-2 text-blue-100">

                                    Meter Connected

                                </p>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl"></div>

                        </div>

                    </div>

                    {/* BACKEND */}

                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-[30px] shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-500">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Backend Status

                                </h3>

                                <p className="text-4xl font-black mt-5">

                                    Running

                                </p>

                                <p className="mt-2 text-pink-100">

                                    API Services Healthy

                                </p>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl"></div>

                        </div>

                    </div>

                    {/* DATABASE */}

                    <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-[30px] shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-500">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Database Status

                                </h3>

                                <p className="text-4xl font-black mt-5">

                                    Connected

                                </p>

                                <p className="mt-2 text-orange-100">

                                    Cloud Database Active

                                </p>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl"></div>

                        </div>

                    </div>

                </div>

                {/* HEALTH STATUS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* VOLTAGE */}

                    <div className="bg-white rounded-[30px] shadow-2xl p-8 border border-gray-100 hover:scale-[1.01] transition-all duration-500">

                        <div className="flex justify-between items-center">

                            <h2 className="text-3xl font-black text-gray-800">

                                Voltage Health

                            </h2>

                            <div className={`w-5 h-5 rounded-full ${voltageHealthy
                                ? "bg-green-500 animate-pulse"
                                : "bg-red-500 animate-pulse"
                                }`}>

                            </div>

                        </div>

                        <p className={`text-4xl font-black mt-5 ${voltageHealthy
                            ? "text-green-600"
                            : "text-red-600"
                            }`}>

                            {voltageHealthy
                                ? "Healthy"
                                : "Warning"}

                        </p>

                        <div className="mt-8 space-y-4">

                            <div className="bg-red-50 rounded-2xl p-4">

                                <p className="text-gray-500">

                                    R Phase

                                </p>

                                <p className="text-3xl font-black text-red-500 mt-2">

                                    {vr.toFixed(2)} V

                                </p>

                            </div>

                            <div className="bg-yellow-50 rounded-2xl p-4">

                                <p className="text-gray-500">

                                    Y Phase

                                </p>

                                <p className="text-3xl font-black text-yellow-500 mt-2">

                                    {vy.toFixed(2)} V

                                </p>

                            </div>

                            <div className="bg-blue-50 rounded-2xl p-4">

                                <p className="text-gray-500">

                                    B Phase

                                </p>

                                <p className="text-3xl font-black text-blue-500 mt-2">

                                    {vb.toFixed(2)} V

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* CURRENT */}

                    <div className="bg-white rounded-[30px] shadow-2xl p-8 border border-gray-100 hover:scale-[1.01] transition-all duration-500">

                        <div className="flex justify-between items-center">

                            <h2 className="text-3xl font-black text-gray-800">

                                Current Health

                            </h2>

                            <div className={`w-5 h-5 rounded-full ${currentHealthy
                                ? "bg-green-500 animate-pulse"
                                : "bg-red-500 animate-pulse"
                                }`}>

                            </div>

                        </div>

                        <p className={`text-4xl font-black mt-5 ${currentHealthy
                            ? "text-green-600"
                            : "text-red-600"
                            }`}>

                            {currentHealthy
                                ? "Healthy"
                                : "Warning"}

                        </p>

                        <div className="mt-8 space-y-4">

                            <div className="bg-red-50 rounded-2xl p-4">

                                <p className="text-gray-500">

                                    R Phase

                                </p>

                                <p className="text-3xl font-black text-red-500 mt-2">

                                    {ir.toFixed(2)} A

                                </p>

                            </div>

                            <div className="bg-yellow-50 rounded-2xl p-4">

                                <p className="text-gray-500">

                                    Y Phase

                                </p>

                                <p className="text-3xl font-black text-yellow-500 mt-2">

                                    {iy.toFixed(2)} A

                                </p>

                            </div>

                            <div className="bg-blue-50 rounded-2xl p-4">

                                <p className="text-gray-500">

                                    B Phase

                                </p>

                                <p className="text-3xl font-black text-blue-500 mt-2">

                                    {ib.toFixed(2)} A

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* FREQUENCY */}

                    <div className="bg-white rounded-[30px] shadow-2xl p-8 border border-gray-100 hover:scale-[1.01] transition-all duration-500">

                        <div className="flex justify-between items-center">

                            <h2 className="text-3xl font-black text-gray-800">

                                Frequency Health

                            </h2>

                            <div className={`w-5 h-5 rounded-full ${frequencyHealthy
                                ? "bg-green-500 animate-pulse"
                                : "bg-red-500 animate-pulse"
                                }`}>

                            </div>

                        </div>

                        <p className={`text-4xl font-black mt-5 ${frequencyHealthy
                            ? "text-green-600"
                            : "text-red-600"
                            }`}>

                            {frequencyHealthy
                                ? "Healthy"
                                : "Warning"}

                        </p>

                        <div className="mt-8 bg-indigo-50 rounded-3xl p-6">

                            <p className="text-gray-500">

                                Grid Frequency

                            </p>

                            <p className="text-5xl font-black text-indigo-700 mt-4">

                                {freq.toFixed(2)} Hz

                            </p>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    )
}

export default HealthMonitoring