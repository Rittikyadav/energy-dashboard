import { useEffect, useState } from "react"

import axios from "axios"

import Sidebar from "../components/Sidebar"

import GenerationChart from "../charts/GenerationChart"

import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

function EnergyGeneration() {

    // DATE

    const [selectedDate, setSelectedDate] =
        useState(new Date())

    // API DATA

    const [trendData, setTrendData] =
        useState([])

    // GENERATION

    const [todayGeneration, setTodayGeneration] =
        useState("0")

    const [totalGeneration, setTotalGeneration] =
        useState("0")

    // FETCH DATA

    useEffect(() => {

        // FORMAT DATE

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

                // TOTAL GENERATION

                const lastEntry =
                    apiData[apiData.length - 1]

                setTotalGeneration(

                    parseFloat(
                        lastEntry.kwh || 0
                    ).toFixed(2)

                )

                // TODAY GENERATION

                let totalGen = 0

                apiData.forEach((item) => {

                    totalGen += parseFloat(
                        item.kwhgen || 0
                    )

                })

                setTodayGeneration(
                    totalGen.toFixed(2)
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

                            Energy Generation Dashboard

                        </h1>

                        <p className="text-gray-500 mt-3 text-lg">

                            Real-time solar energy production analytics

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

                {/* PREMIUM TILES */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                    {/* DAILY GENERATION */}

                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Daily Generation

                                </h3>

                                <p className="text-6xl font-black mt-5">

                                    {todayGeneration}

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

                    {/* TOTAL GENERATION */}

                    <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Total Generation

                                </h3>

                                <p className="text-6xl font-black mt-5">

                                    {totalGeneration}

                                </p>

                                <p className="mt-2 text-green-100">

                                    kWh

                                </p>

                            </div>

                            <div className="text-7xl">

                                ☀️

                            </div>

                        </div>

                    </div>

                </div>

                {/* CHART */}

                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10 border border-gray-100">

                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Daily Energy Trend

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Real-time solar generation curve

                            </p>

                        </div>

                        <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">

                            LIVE ANALYTICS

                        </div>

                    </div>

                    <GenerationChart

                        trendData={trendData}

                    />

                </div>

                {/* TABLE */}

                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Generation History

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Latest inverter generation logs

                            </p>

                        </div>

                        <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">

                            UPDATED LIVE

                        </div>

                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-gray-100">

                        <table className="w-full border-collapse">

                            <thead>

                                <tr className="bg-gradient-to-r from-slate-100 to-gray-100">

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        Time

                                    </th>

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        Energy Generated

                                    </th>

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        Total Energy

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {trendData
                                    .slice(-20)
                                    .reverse()
                                    .map((item, index) => (

                                        <tr

                                            key={index}

                                            className="border-b hover:bg-blue-50 transition-all duration-200"

                                        >

                                            <td className="p-5 font-semibold text-gray-700">

                                                {item.loghh}:{item.logmi}

                                            </td>

                                            <td className="p-5 text-green-600 font-bold text-lg">

                                                {parseFloat(
                                                    item.kwhgen || 0
                                                ).toFixed(2)} kWh

                                            </td>

                                            <td className="p-5 text-blue-600 font-bold text-lg">

                                                {parseFloat(
                                                    item.kwh || 0
                                                ).toFixed(2)} kWh

                                            </td>

                                        </tr>

                                    ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>

        </div>

    )
}

export default EnergyGeneration