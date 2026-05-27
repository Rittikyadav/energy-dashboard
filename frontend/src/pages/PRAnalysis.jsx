import { useEffect, useState } from "react"

import axios from "axios"

import Sidebar from "../components/Sidebar"

import PRChart from "../charts/PRChart"

import PRDonutChart from "../charts/PRDonutChart"

import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

function PRAnalysis() {

    // DATE

    const [selectedDate, setSelectedDate] =
        useState(new Date())

    // DATA

    const [trendData, setTrendData] =
        useState([])

    // VALUES

    const [irradiance, setIrradiance] =
        useState(0)

    const [avgPR, setAvgPR] =
        useState(0)

    const [plantCapacity, setPlantCapacity] =
        useState(30)

    const [dailyGeneration, setDailyGeneration] =
        useState(0)

    const [performanceStatus, setPerformanceStatus] =
        useState("Good")

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

                // STORE DATA

                setTrendData(apiData)

                // IRRADIANCE

                const irr =
                    parseFloat(
                        res.data.irradiance[0].asi || 0
                    )

                setIrradiance(irr)

                // PLANT CAPACITY

                const capacity =
                    parseFloat(
                        res.data.plantkwp[0].capacity || 30
                    )

                setPlantCapacity(capacity)

                // DAILY GENERATION

                let totalGeneration = 0

                apiData.forEach((item) => {

                    totalGeneration +=
                        parseFloat(
                            item.kwhgen || 0
                        )

                })

                setDailyGeneration(
                    totalGeneration.toFixed(2)
                )

                // PEAK SUN HOURS

                const peakSunHours =
                    irr

                // PR CALCULATION

                let pr = 0

                if (peakSunHours > 0) {

                    pr = (

                        totalGeneration /

                        (
                            capacity *
                            peakSunHours
                        )

                    ) * 100

                }

                // LIMIT 0-100

                pr = Math.min(
                    Math.max(pr, 0),
                    100
                )

                // ROUND VALUE

                const roundedPR =
                    Number(pr.toFixed(2))

                setAvgPR(roundedPR)

                // PERFORMANCE STATUS

                if (roundedPR >= 90) {

                    setPerformanceStatus(
                        "Excellent"
                    )

                } else if (roundedPR >= 80) {

                    setPerformanceStatus(
                        "Good"
                    )

                } else if (roundedPR >= 70) {

                    setPerformanceStatus(
                        "Moderate"
                    )

                } else {

                    setPerformanceStatus(
                        "Poor"
                    )

                }

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

                            PR Analysis Dashboard

                        </h1>

                        <p className="text-gray-500 mt-3 text-lg">

                            Solar Plant Performance Ratio Analytics

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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                    {/* IRRADIANCE */}

                    <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Irradiance

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

                    {/* DAILY GENERATION */}

                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Daily Generation

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {dailyGeneration}

                                </p>

                                <p className="mt-2 text-blue-100">

                                    kWh

                                </p>

                            </div>

                            <div className="text-7xl">

                                ⚡

                            </div>

                        </div>

                    </div>

                    {/* DAILY PR */}

                    <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Daily PR

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {avgPR}

                                </p>

                                <p className="mt-2 text-green-100">

                                    %

                                </p>

                            </div>

                            <div className="text-7xl">

                                📈

                            </div>

                        </div>

                    </div>

                    {/* STATUS */}

                    <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Plant Status

                                </h3>

                                <p className="text-4xl font-black mt-5">

                                    {performanceStatus}

                                </p>

                                <p className="mt-2 text-pink-100">

                                    System Health

                                </p>

                            </div>

                            <div className="text-7xl">

                                🚀

                            </div>

                        </div>

                    </div>

                </div>

                {/* DONUT + TREND */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">

                    {/* DONUT */}

                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-3xl font-black text-gray-800">

                                    PR Efficiency

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Performance ratio visualization

                                </p>

                            </div>

                            <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">

                                LIVE

                            </div>

                        </div>

                        <PRDonutChart
                            pr={avgPR}
                        />

                    </div>

                    {/* TREND */}

                    <div className="xl:col-span-2 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

                        <div className="flex items-center justify-between mb-8">

                            <div>

                                <h2 className="text-3xl font-black text-gray-800">

                                    PR Trend Analysis

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Real-time plant performance monitoring

                                </p>

                            </div>

                            <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">

                                LIVE ANALYTICS

                            </div>

                        </div>

                        <PRChart

                            trendData={trendData}

                            irradiance={irradiance}

                            plantCapacity={plantCapacity}

                        />

                    </div>

                </div>

            </main>

        </div>

    )
}

export default PRAnalysis