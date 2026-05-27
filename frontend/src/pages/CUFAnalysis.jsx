import { useEffect, useState } from "react"

import axios from "axios"

import Sidebar from "../components/Sidebar"

import CUFChart from "../charts/CUFChart"

function CUFAnalysis() {

    // API DATA

    const [trendData, setTrendData] =
        useState([])

    // PLANT CAPACITY

    const [plantCapacity, setPlantCapacity] =
        useState(0)

    // DAILY CUF

    const [todayCUF, setTodayCUF] =
        useState(0)

    // OVERALL CUF

    const [overallCUF, setOverallCUF] =
        useState(0)

    // TODAY GENERATION

    const [todayGeneration, setTodayGeneration] =
        useState(0)

    // TOTAL GENERATION

    const [totalGeneration, setTotalGeneration] =
        useState(0)

    // TOTAL DAYS

    const [totalDays, setTotalDays] =
        useState(0)

    useEffect(() => {

        axios
            .get(
                "https://rail.sustiknow.com/getOrders.php?date=2026-05-22"
            )

            .then((res) => {

                const apiData =
                    res.data.data

                setTrendData(apiData)

                // PLANT CAPACITY

                const capacity =
                    parseFloat(
                        res.data.plantkwp[0].capacity
                    )

                setPlantCapacity(capacity)

                // TODAY GENERATION

                let todayGen = 0

                apiData.forEach((item) => {

                    todayGen += parseFloat(
                        item.kwhgen || 0
                    )

                })

                setTodayGeneration(
                    todayGen.toFixed(2)
                )

                // DAILY CUF

                const dailyCUFValue =

                    (
                        todayGen /
                        (capacity * 24)
                    ) * 100

                setTodayCUF(
                    dailyCUFValue.toFixed(2)
                )

                // TOTAL GENERATION

                const lastEntry =
                    apiData[apiData.length - 1]

                const totalGen =
                    parseFloat(
                        lastEntry.kwh || 0
                    )

                setTotalGeneration(
                    totalGen.toFixed(2)
                )

                // DAYS SINCE 22 FEB

                const startDate =
                    new Date("2026-02-22")

                const today =
                    new Date()

                const diffTime =
                    today - startDate

                const days =
                    Math.ceil(
                        diffTime /
                        (1000 * 60 * 60 * 24)
                    )

                setTotalDays(days)

                // OVERALL CUF

                const overallCUFValue =

                    (
                        totalGen /
                        (capacity * days * 24)
                    ) * 100

                setOverallCUF(
                    overallCUFValue.toFixed(2)
                )

            })

            .catch((err) => {

                console.log(err)

            })

    }, [])

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN */}

            <main className="flex-1 p-8 overflow-y-auto">

                {/* HEADER */}

                <div className="mb-10">

                    <h1 className="text-5xl font-black text-gray-800 tracking-tight">

                        CUF Analysis Dashboard

                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">

                        Daily & Overall Capacity Utilization Analytics

                    </p>

                </div>

                {/* PREMIUM TOP CARDS */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                    {/* PLANT CAPACITY */}

                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Plant Capacity

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {plantCapacity}

                                </p>

                                <p className="mt-2 text-blue-100">

                                    kWp

                                </p>

                            </div>

                            <div className="text-7xl">

                                ⚡

                            </div>

                        </div>

                    </div>

                    {/* TODAY GENERATION */}

                    <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Today's Generation

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {todayGeneration}

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

                    {/* TODAY CUF */}

                    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Today's CUF

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {todayCUF}

                                </p>

                                <p className="mt-2 text-yellow-100">

                                    %

                                </p>

                            </div>

                            <div className="text-7xl">

                                📈

                            </div>

                        </div>

                    </div>

                    {/* OVERALL CUF */}

                    <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Overall CUF

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {overallCUF}

                                </p>

                                <p className="mt-2 text-purple-100">

                                    %

                                </p>

                            </div>

                            <div className="text-7xl">

                                🚀

                            </div>

                        </div>

                    </div>

                </div>

                {/* CHART + PERFORMANCE */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

                    {/* DAILY CUF CHART */}

                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

                        <div className="flex items-center justify-between mb-8">

                            <div>

                                <h2 className="text-3xl font-black text-gray-800">

                                    Daily CUF Trend

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Real-time CUF performance analytics

                                </p>

                            </div>

                            <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">

                                LIVE ANALYTICS

                            </div>

                        </div>

                        <CUFChart

                            trendData={trendData}

                            plantCapacity={plantCapacity}

                        />

                    </div>

                    {/* OVERALL PERFORMANCE */}

                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

                        <div className="flex items-center justify-between mb-8">

                            <div>

                                <h2 className="text-3xl font-black text-gray-800">

                                    Overall Plant Performance

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Long-term solar performance metrics

                                </p>

                            </div>

                            <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">

                                HEALTHY SYSTEM

                            </div>

                        </div>

                        <div className="space-y-6">

                            {/* TOTAL GENERATION */}

                            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-3xl hover:scale-[1.01] transition-all duration-300">

                                <h3 className="text-xl font-bold text-blue-700">

                                    Total Generation

                                </h3>

                                <p className="text-4xl font-black mt-4 text-blue-900">

                                    {totalGeneration} kWh

                                </p>

                            </div>

                            {/* TOTAL DAYS */}

                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-3xl hover:scale-[1.01] transition-all duration-300">

                                <h3 className="text-xl font-bold text-green-700">

                                    Total Days Running

                                </h3>

                                <p className="text-4xl font-black mt-4 text-green-900">

                                    {totalDays} Days

                                </p>

                            </div>

                            {/* OVERALL CUF */}

                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-3xl hover:scale-[1.01] transition-all duration-300">

                                <h3 className="text-xl font-bold text-purple-700">

                                    Overall CUF

                                </h3>

                                <p className="text-4xl font-black mt-4 text-purple-900">

                                    {overallCUF} %

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    )
}

export default CUFAnalysis