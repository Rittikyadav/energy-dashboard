import { useEffect, useState } from "react"

import axios from "axios"

import Sidebar from "../components/Sidebar"

import IrradianceChart from "../charts/IrradianceChart"

import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

function Irradiance() {

    // DATE

    const [selectedDate, setSelectedDate] =
        useState(new Date())

    // API DATA

    const [trendData, setTrendData] =
        useState([])

    // IRRADIANCE

    const [irradiance, setIrradiance] =
        useState("0")

    // PEAK VALUE

    const [peakIrradiance, setPeakIrradiance] =
        useState("0")

    // AVG VALUE

    const [avgIrradiance, setAvgIrradiance] =
        useState("0")

    // FETCH DATA

    useEffect(() => {

        const formattedDate =

            selectedDate
                .toISOString()
                .split("T")[0]

        axios
            .get(

                `https://rail.sustiknow.com/getOrders.php?date=${formattedDate}`

            )

            .then((res) => {

                const apiData =
                    res.data.data

                setTrendData(apiData)

                // CURRENT IRRADIANCE

                const currentIrr =
                    parseFloat(

                        res.data.irradiance[0].asi || 0

                    )

                setIrradiance(
                    currentIrr.toFixed(2)
                )

                // PEAK IRRADIANCE

                let peak = 0

                apiData.forEach((item) => {

                    const value =
                        parseFloat(
                            item.irradiance || 0
                        )

                    if (value > peak) {

                        peak = value

                    }

                })

                setPeakIrradiance(
                    peak.toFixed(2)
                )

                // AVG IRRADIANCE

                let total = 0

                apiData.forEach((item) => {

                    total += parseFloat(
                        item.irradiance || 0
                    )

                })

                const avg =
                    total / apiData.length

                setAvgIrradiance(
                    avg.toFixed(2)
                )

            })

            .catch((err) => {

                console.log(err)

            })

    }, [selectedDate])

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN */}

            <main className="flex-1 p-8 overflow-y-auto">

                {/* HEADER */}

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-10 gap-5">

                    <div>

                        <h1 className="text-5xl font-black text-gray-800 tracking-tight">

                            Irradiance Analysis Dashboard

                        </h1>

                        <p className="text-gray-500 mt-3 text-lg">

                            Real-time solar irradiance monitoring analytics

                        </p>

                    </div>

                    {/* DATE PICKER */}

                    <div className="bg-white p-5 rounded-3xl shadow-2xl border border-gray-100">

                        <h3 className="text-sm text-gray-500 mb-3 font-semibold">

                            Select Date

                        </h3>

                        <DatePicker

                            selected={selectedDate}

                            onChange={(date) =>

                                setSelectedDate(date)

                            }

                            dateFormat="dd/MM/yyyy"

                            className="border border-gray-200 rounded-2xl p-4 text-lg outline-none font-semibold shadow-sm"

                        />

                    </div>

                </div>

                {/* PREMIUM TOP CARDS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    {/* CURRENT */}

                    <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Current Irradiance

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {irradiance}

                                </p>

                                <p className="mt-2 text-orange-100">

                                    kWh/m²/day

                                </p>

                            </div>

                            <div className="text-7xl">

                                ☀️

                            </div>

                        </div>

                    </div>

                    {/* PEAK */}

                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Peak Irradiance

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {peakIrradiance}

                                </p>

                                <p className="mt-2 text-blue-100">

                                    W/m²

                                </p>

                            </div>

                            <div className="text-7xl">

                                🌤️

                            </div>

                        </div>

                    </div>

                    {/* AVG */}

                    <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Average Irradiance

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {avgIrradiance}

                                </p>

                                <p className="mt-2 text-green-100">

                                    W/m²

                                </p>

                            </div>

                            <div className="text-7xl">

                                📈

                            </div>

                        </div>

                    </div>

                </div>

                {/* CHART */}

                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Irradiance Trend

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Real-time solar irradiance curve analysis

                            </p>

                        </div>

                        <div className="bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-bold">

                            LIVE ANALYTICS

                        </div>

                    </div>

                    <IrradianceChart

                        trendData={trendData}

                        irradiance={irradiance}

                    />

                </div>

            </main>

        </div>

    )
}

export default Irradiance