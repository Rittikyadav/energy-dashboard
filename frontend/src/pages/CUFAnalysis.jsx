import { useEffect, useState } from "react"
import axios from "axios"

import Sidebar from "../components/Sidebar"
import CUFChart from "../charts/CUFChart"


function CUFAnalysis() {

    // ============================================================
    // STATE
    // ============================================================

    const [trendData, setTrendData] =
        useState([])

    const [plantCapacity, setPlantCapacity] =
        useState(30)

    const [todayGeneration, setTodayGeneration] =
        useState("0.00")

    const [todayCUF, setTodayCUF] =
        useState("0.00")

    const [totalGeneration, setTotalGeneration] =
        useState("0.00")

    const [overallCUF, setOverallCUF] =
        useState("0.00")

    const [totalDays, setTotalDays] =
        useState(0)


    // ============================================================
    // LOCAL DATE
    // ============================================================

    const formatLocalDate = (date) => {

        if (!date) {
            return ""
        }

        const year =
            date.getFullYear()

        const month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            )

        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            )

        return `${year}-${month}-${day}`
    }


    // ============================================================
    // PROCESS METER DATA
    //
    // THIS IS THE SAME LOGIC USED BY
    // ENERGY GENERATION PAGE.
    //
    // IMPORTANT:
    //
    // kWh is cumulative.
    //
    // If:
    //
    // 18431.92
    // 18304.10   <-- RESET
    // 18304.28
    // 18304.47
    //
    // everything before 18304.10 belongs to
    // the previous meter session.
    //
    // We therefore calculate today's generation
    // only after the LATEST reset.
    // ============================================================

    const processMeterData = (data) => {

        if (!Array.isArray(data)) {
            return []
        }


        // --------------------------------------------------------
        // SORT OLD -> NEW
        // --------------------------------------------------------

        const sorted =
            [...data].sort(
                (a, b) => {

                    const timeA =
                        new Date(
                            a?.ts || 0
                        ).getTime()

                    const timeB =
                        new Date(
                            b?.ts || 0
                        ).getTime()

                    return (
                        timeA -
                        timeB
                    )
                }
            )


        // --------------------------------------------------------
        // FIND LATEST RESET
        //
        // RESET:
        //
        // current kWh < previous kWh
        // --------------------------------------------------------

        let latestResetIndex =
            -1

        let previousKwh =
            null


        for (
            let i = 0;
            i < sorted.length;
            i++
        ) {

            const currentKwh =
                Number.parseFloat(
                    sorted[i]?.kwh
                )


            if (
                !Number.isFinite(
                    currentKwh
                )
            ) {
                continue
            }


            if (
                previousKwh !== null &&
                currentKwh < previousKwh
            ) {

                latestResetIndex =
                    i
            }


            previousKwh =
                currentKwh
        }


        // --------------------------------------------------------
        // KEEP ONLY DATA FROM LATEST RESET
        // --------------------------------------------------------

        const calculationData =
            latestResetIndex >= 0
                ? sorted.slice(
                    latestResetIndex
                )
                : sorted


        // --------------------------------------------------------
        // CALCULATE INTERVAL GENERATION
        // --------------------------------------------------------

        let lastKwh =
            null


        const processed =
            calculationData.map(
                (
                    item,
                    index
                ) => {

                    const currentKwh =
                        Number.parseFloat(
                            item?.kwh
                        )


                    // --------------------------------------------
                    // INVALID READING
                    // --------------------------------------------

                    if (
                        !Number.isFinite(
                            currentKwh
                        )
                    ) {

                        return {

                            ...item,

                            _kwh: null,

                            _generated: 0,

                            _reset: false,

                            _calculationIndex:
                                index
                        }
                    }


                    // --------------------------------------------
                    // FIRST VALUE AFTER RESET
                    //
                    // This is the baseline.
                    // It does NOT count as generation.
                    // --------------------------------------------

                    if (
                        lastKwh === null
                    ) {

                        lastKwh =
                            currentKwh


                        return {

                            ...item,

                            _kwh:
                                currentKwh,

                            _generated:
                                0,

                            _reset:
                                true,

                            _calculationIndex:
                                index
                        }
                    }


                    // --------------------------------------------
                    // DIFFERENCE
                    // --------------------------------------------

                    const difference =
                        currentKwh -
                        lastKwh


                    // --------------------------------------------
                    // NORMAL INCREASE
                    //
                    // Keep the same 20 kWh safety limit
                    // used by EnergyGeneration.jsx.
                    // --------------------------------------------

                    if (
                        difference >= 0 &&
                        difference <= 20
                    ) {

                        lastKwh =
                            currentKwh


                        return {

                            ...item,

                            _kwh:
                                currentKwh,

                            _generated:
                                difference,

                            _reset:
                                false,

                            _calculationIndex:
                                index
                        }
                    }


                    // --------------------------------------------
                    // ANOTHER RESET / BAD READING
                    // --------------------------------------------

                    lastKwh =
                        currentKwh


                    return {

                        ...item,

                        _kwh:
                            currentKwh,

                        _generated:
                            0,

                        _reset:
                            true,

                        _calculationIndex:
                            index
                    }
                }
            )


        return processed
    }


    // ============================================================
    // FETCH DATA
    // ============================================================

    useEffect(() => {

        const date =
            formatLocalDate(
                new Date()
            )


        // Reset UI while loading

        setTrendData([])

        setTodayGeneration(
            "0.00"
        )

        setTotalGeneration(
            "0.00"
        )

        setTodayCUF(
            "0.00"
        )


        axios
            .get(
                `https://rail.sustiknow.com/getOrders.php?date=${date}`
            )
            .then(
                (res) => {

                    // ====================================================
                    // API DATA
                    // ====================================================

                    const apiData =
                        Array.isArray(
                            res.data?.data
                        )
                            ? res.data.data
                            : []


                    if (
                        apiData.length === 0
                    ) {

                        return
                    }


                    // ====================================================
                    // PLANT CAPACITY
                    // ====================================================

                    const apiCapacity =
                        Number.parseFloat(
                            res.data
                                ?.plantkwp
                                ?.[0]
                                ?.capacity
                        )


                    const capacity =
                        Number.isFinite(
                            apiCapacity
                        ) &&
                            apiCapacity > 0
                            ? apiCapacity
                            : 30


                    setPlantCapacity(
                        capacity
                    )


                    // ====================================================
                    // PROCESS METER DATA
                    // ====================================================

                    const processed =
                        processMeterData(
                            apiData
                        )


                    setTrendData(
                        processed
                    )


                    // ====================================================
                    // LATEST CUMULATIVE ENERGY
                    // ====================================================

                    const latest =
                        processed[
                        processed.length - 1
                        ]


                    const latestKwh =
                        Number.parseFloat(
                            latest?._kwh
                        )


                    if (
                        Number.isFinite(
                            latestKwh
                        )
                    ) {

                        setTotalGeneration(
                            latestKwh.toFixed(
                                2
                            )
                        )
                    }


                    // ====================================================
                    // TODAY'S GENERATION
                    //
                    // EXACT SAME CALCULATION AS
                    // ENERGY GENERATION PAGE.
                    // ====================================================

                    const dailyGeneration =
                        processed.reduce(
                            (
                                total,
                                item
                            ) => {

                                const generation =
                                    Number(
                                        item?._generated ||
                                        0
                                    )


                                if (
                                    Number.isFinite(
                                        generation
                                    ) &&
                                    generation > 0
                                ) {

                                    return (
                                        total +
                                        generation
                                    )
                                }


                                return total
                            },
                            0
                        )


                    const roundedGeneration =
                        Number(
                            dailyGeneration.toFixed(
                                2
                            )
                        )


                    setTodayGeneration(
                        roundedGeneration.toFixed(
                            2
                        )
                    )


                    // ====================================================
                    // DAILY CUF
                    //
                    // CUF =
                    //
                    // Daily Generation
                    // ------------------------------- × 100
                    // Plant Capacity × 24 hours
                    //
                    // Example:
                    //
                    // 8.35
                    // -------- × 100
                    // 30 × 24
                    //
                    // = 1.16%
                    // ====================================================

                    let dailyCUF =
                        0


                    if (
                        capacity > 0
                    ) {

                        dailyCUF =
                            (
                                roundedGeneration /
                                (
                                    capacity *
                                    24
                                )
                            ) *
                            100
                    }


                    if (
                        !Number.isFinite(
                            dailyCUF
                        )
                    ) {

                        dailyCUF =
                            0
                    }


                    setTodayCUF(
                        dailyCUF.toFixed(
                            2
                        )
                    )


                    // ====================================================
                    // RUNNING DAYS
                    //
                    // Keep existing project timeline.
                    // ====================================================

                    const startDate =
                        new Date(
                            "2026-02-22T00:00:00"
                        )


                    const currentDate =
                        new Date()


                    const difference =
                        currentDate -
                        startDate


                    const days =
                        Math.max(
                            1,
                            Math.ceil(
                                difference /
                                (
                                    1000 *
                                    60 *
                                    60 *
                                    24
                                )
                            )
                        )


                    setTotalDays(
                        days
                    )


                    // ====================================================
                    // OVERALL CUF
                    //
                    // Existing dashboard methodology:
                    //
                    // Total cumulative energy
                    // -------------------------------- × 100
                    // Plant Capacity × Running Days × 24
                    // ====================================================

                    let lifetimeCUF =
                        0


                    if (
                        Number.isFinite(
                            latestKwh
                        ) &&
                        capacity > 0 &&
                        days > 0
                    ) {

                        lifetimeCUF =
                            (
                                latestKwh /
                                (
                                    capacity *
                                    days *
                                    24
                                )
                            ) *
                            100
                    }


                    if (
                        !Number.isFinite(
                            lifetimeCUF
                        )
                    ) {

                        lifetimeCUF =
                            0
                    }


                    setOverallCUF(
                        lifetimeCUF.toFixed(
                            2
                        )
                    )
                }
            )
            .catch(
                (error) => {

                    console.error(
                        "CUF API error:",
                        error
                    )

                    setTrendData([])

                    setTodayGeneration(
                        "0.00"
                    )

                    setTotalGeneration(
                        "0.00"
                    )

                    setTodayCUF(
                        "0.00"
                    )
                }
            )

    }, [])


    // ============================================================
    // UI
    // ============================================================

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex">

            <Sidebar />


            <main className="flex-1 p-8 overflow-y-auto">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-10">

                    <h1 className="text-5xl font-black text-gray-800 tracking-tight">

                        CUF Analysis Dashboard

                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">

                        Daily & Overall Capacity Utilization Analytics

                    </p>

                </div>


                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">


                    {/* PLANT CAPACITY */}

                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Plant Capacity

                                </h3>

                                <p className="text-5xl font-black mt-5">

                                    {Number(
                                        plantCapacity
                                    ).toFixed(
                                        2
                                    )}

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


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">


                    {/* DAILY CUF */}

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

                            trendData={
                                trendData
                            }

                            plantCapacity={
                                plantCapacity
                            }

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