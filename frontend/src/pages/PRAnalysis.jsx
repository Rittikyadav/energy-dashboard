import { useEffect, useState } from "react"
import axios from "axios"

import Sidebar from "../components/Sidebar"
import PRChart from "../charts/PRChart"
import PRDonutChart from "../charts/PRDonutChart"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


function PRAnalysis() {

    // ============================================================
    // DATE
    // ============================================================

    const [selectedDate, setSelectedDate] =
        useState(new Date())


    // ============================================================
    // DATA
    // ============================================================

    const [trendData, setTrendData] =
        useState([])


    // ============================================================
    // VALUES
    // ============================================================

    const [irradiance, setIrradiance] =
        useState(0)

    const [plantCapacity, setPlantCapacity] =
        useState(30)

    const [dailyGeneration, setDailyGeneration] =
        useState(0)

    const [performanceRatio, setPerformanceRatio] =
        useState(0)

    const [performanceStatus, setPerformanceStatus] =
        useState("Good")

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState("")


    // ============================================================
    // LOCAL DATE
    // ============================================================

    const formatLocalDate = (date) => {

        if (!date) return ""

        const year =
            date.getFullYear()

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0")

        const day =
            String(
                date.getDate()
            ).padStart(2, "0")

        return `${year}-${month}-${day}`
    }


    // ============================================================
    // CALCULATE DAILY GENERATION
    //
    // IMPORTANT:
    //
    // kwh = cumulative meter reading.
    //
    // Normally:
    //
    // Current kWh - Previous kWh
    //
    // If the meter suddenly decreases, it means the meter
    // has reset / rolled over / changed baseline.
    //
    // In that situation we START A NEW GENERATION SEGMENT
    // and ignore the previous segment.
    //
    // This prevents values such as:
    //
    // 18431.92 -> 18304.10
    //
    // from creating incorrect generation.
    // ============================================================

    const calculateGeneration = (data) => {

        if (
            !Array.isArray(data) ||
            data.length < 2
        ) {
            return 0
        }


        let generation = 0

        let previousKwh = null


        for (let i = 0; i < data.length; i++) {

            const currentKwh =
                Number.parseFloat(
                    data[i]?.kwh
                )


            // Ignore invalid meter values
            if (!Number.isFinite(currentKwh)) {
                continue
            }


            // First valid reading
            if (previousKwh === null) {

                previousKwh =
                    currentKwh

                continue
            }


            const difference =
                currentKwh - previousKwh


            // ====================================================
            // NORMAL INCREMENT
            // ====================================================

            if (
                Number.isFinite(difference) &&
                difference >= 0
            ) {

                generation +=
                    difference

                previousKwh =
                    currentKwh

                continue
            }


            // ====================================================
            // METER RESET
            //
            // Example:
            //
            // 18431.92
            //      ↓
            // 18304.10
            //
            // Do NOT add the negative difference.
            //
            // Start calculation again from the new baseline.
            // ====================================================

            if (difference < 0) {

                generation = 0

                previousKwh =
                    currentKwh

                continue
            }
        }


        if (
            !Number.isFinite(generation) ||
            generation < 0
        ) {
            return 0
        }


        return generation
    }


    // ============================================================
    // FETCH DATA
    // ============================================================

    const fetchData = async () => {

        try {

            setLoading(true)
            setError("")


            // ====================================================
            // DATE
            // ====================================================

            const formattedDate =
                formatLocalDate(
                    selectedDate
                )


            // ====================================================
            // API
            // ====================================================

            const response =
                await axios.get(
                    `https://rail.sustiknow.com/getOrders.php?date=${formattedDate}`
                )


            const apiData =
                Array.isArray(
                    response.data?.data
                )
                    ? response.data.data
                    : []


            // ====================================================
            // NO DATA
            // ====================================================

            if (apiData.length === 0) {

                setTrendData([])

                setIrradiance(0)

                setDailyGeneration(0)

                setPerformanceRatio(0)

                setPerformanceStatus(
                    "Poor"
                )

                return
            }


            // ====================================================
            // SORT DATA CHRONOLOGICALLY
            // ====================================================

            const sortedData =
                [...apiData].sort(
                    (a, b) => {

                        const timeA =
                            new Date(
                                a?.ts || 0
                            ).getTime()

                        const timeB =
                            new Date(
                                b?.ts || 0
                            ).getTime()

                        return timeA - timeB
                    }
                )


            setTrendData(
                sortedData
            )


            // ====================================================
            // IRRADIANCE
            // ====================================================

            const irr =
                Number(
                    response.data
                        ?.irradiance
                        ?.[0]
                        ?.asi
                ) || 0


            setIrradiance(
                irr
            )


            // ====================================================
            // PLANT CAPACITY
            // ====================================================

            const capacity =
                Number(
                    response.data
                        ?.plantkwp
                        ?.[0]
                        ?.capacity
                ) || 30


            setPlantCapacity(
                capacity
            )


            // ====================================================
            // DAILY GENERATION
            // ====================================================

            const generation =
                calculateGeneration(
                    sortedData
                )


            const safeGeneration =
                Number.isFinite(
                    generation
                ) &&
                    generation >= 0
                    ? generation
                    : 0


            const roundedGeneration =
                Number(
                    safeGeneration.toFixed(2)
                )


            setDailyGeneration(
                roundedGeneration
            )


            // ====================================================
            // PERFORMANCE RATIO
            //
            // PR =
            //
            // Daily Generation
            // -----------------------------
            // Plant Capacity × Irradiance
            //
            // × 100
            //
            // Example:
            //
            // Generation = 8.35 kWh
            // Capacity   = 30 kWp
            // Irradiance = 3.99 kWh/m²/day
            //
            // PR = 8.35 / (30 × 3.99) × 100
            //    = 6.98%
            // ====================================================

            let pr = 0


            if (
                capacity > 0 &&
                irr > 0 &&
                safeGeneration >= 0
            ) {

                pr =
                    (
                        safeGeneration /
                        (
                            capacity *
                            irr
                        )
                    ) * 100
            }


            // ====================================================
            // INVALID PR PROTECTION
            // ====================================================

            if (
                !Number.isFinite(pr) ||
                pr < 0
            ) {

                pr = 0
            }


            // ====================================================
            // LIMIT DISPLAY TO 100%
            // ====================================================

            pr =
                Math.min(
                    Math.max(
                        pr,
                        0
                    ),
                    100
                )


            const roundedPR =
                Number(
                    pr.toFixed(2)
                )


            setPerformanceRatio(
                roundedPR
            )


            // ====================================================
            // PERFORMANCE STATUS
            // ====================================================

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


        } catch (err) {

            console.error(
                "PR Analysis API Error:",
                err
            )


            setError(
                "Unable to load PR analysis data."
            )

        } finally {

            setLoading(false)
        }
    }


    // ============================================================
    // LOAD DATA
    // ============================================================

    useEffect(() => {

        fetchData()


        const interval =
            setInterval(
                fetchData,
                60000
            )


        return () => {

            clearInterval(
                interval
            )
        }

    }, [selectedDate])


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">

                        <p className="text-gray-500 font-semibold">

                            Loading PR analysis...

                        </p>

                    </div>

                </main>

            </div>
        )
    }


    // ============================================================
    // ERROR
    // ============================================================

    if (error) {

        return (

            <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">

                        <p className="text-red-500 font-semibold">

                            {error}

                        </p>


                        <button
                            onClick={fetchData}
                            className="mt-5 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700"
                        >

                            Retry

                        </button>

                    </div>

                </main>

            </div>
        )
    }


    // ============================================================
    // MAIN UI
    // ============================================================

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex">


            {/* ====================================================
                SIDEBAR
            ==================================================== */}

            <Sidebar />


            {/* ====================================================
                MAIN
            ==================================================== */}

            <main className="flex-1 p-8 overflow-y-auto">


                {/* =================================================
                    HEADER
                ================================================= */}

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

                            selected={
                                selectedDate
                            }

                            onChange={(date) => {

                                if (date) {

                                    setSelectedDate(
                                        date
                                    )
                                }
                            }}

                            dateFormat="dd/MM/yyyy"

                            className="border border-gray-200 rounded-2xl p-4 text-lg outline-none font-semibold shadow-sm"

                        />

                    </div>

                </div>


                {/* =================================================
                    PREMIUM TOP CARDS
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">


                    {/* IRRADIANCE */}

                    <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Irradiance

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {irradiance.toFixed(2)}

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

                                    {dailyGeneration.toFixed(2)}

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

                                    {performanceRatio.toFixed(2)}

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


                {/* =================================================
                    DONUT + TREND
                ================================================= */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">


                    {/* =================================================
                        DONUT
                    ================================================= */}

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
                            pr={
                                performanceRatio
                            }
                        />

                    </div>


                    {/* =================================================
                        TREND
                    ================================================= */}

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

                            trendData={
                                trendData
                            }

                            irradiance={
                                irradiance
                            }

                            plantCapacity={
                                plantCapacity
                            }

                        />

                    </div>

                </div>


            </main>

        </div>
    )
}


export default PRAnalysis