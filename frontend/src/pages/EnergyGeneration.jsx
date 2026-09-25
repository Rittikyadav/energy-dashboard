import { useEffect, useState } from "react"
import axios from "axios"

import Sidebar from "../components/Sidebar"
import GenerationChart from "../charts/GenerationChart"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function EnergyGeneration() {

    const [selectedDate, setSelectedDate] =
        useState(new Date())

    const [trendData, setTrendData] =
        useState([])

    const [todayGeneration, setTodayGeneration] =
        useState("0.00")

    const [totalGeneration, setTotalGeneration] =
        useState("0.00")


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
    // PROCESS METER DATA
    //
    // IMPORTANT:
    //
    // We first find the MOST RECENT downward movement.
    //
    // Example:
    //
    // 18431.74
    // 18431.92
    // 18304.10  <-- RESET
    // 18304.28
    // 18304.47
    //
    // Everything BEFORE 18304.10 belongs to the previous
    // meter session and must NOT contribute to today's
    // generation.
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

                    return timeA - timeB
                }
            )


        // --------------------------------------------------------
        // FIND LATEST RESET
        //
        // A reset is detected when:
        //
        // current kWh < previous kWh
        //
        // We intentionally remember the LAST reset.
        // --------------------------------------------------------

        let latestResetIndex = -1

        let previousKwh = null

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

                latestResetIndex = i
            }


            previousKwh =
                currentKwh
        }


        // --------------------------------------------------------
        // KEEP ONLY DATA FROM LATEST RESET
        //
        // If no reset exists, keep everything.
        // --------------------------------------------------------

        const calculationData =
            latestResetIndex >= 0
                ? sorted.slice(
                    latestResetIndex
                )
                : sorted


        // --------------------------------------------------------
        // CALCULATE GENERATION
        // --------------------------------------------------------

        let lastKwh = null

        const processed =
            calculationData.map(
                (item, index) => {

                    const currentKwh =
                        Number.parseFloat(
                            item?.kwh
                        )


                    // Invalid meter reading
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


                    // ------------------------------------------------
                    // FIRST VALUE AFTER RESET
                    //
                    // This becomes the NEW BASELINE.
                    // ------------------------------------------------

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


                    const difference =
                        currentKwh -
                        lastKwh


                    // ------------------------------------------------
                    // NORMAL INCREASE
                    // ------------------------------------------------

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


                    // ------------------------------------------------
                    // ANOTHER RESET / BAD READING
                    // ------------------------------------------------

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
    // FETCH API
    // ============================================================

    useEffect(() => {

        const date =
            formatLocalDate(
                selectedDate
            )


        setTrendData([])

        setTodayGeneration(
            "0.00"
        )

        setTotalGeneration(
            "0.00"
        )


        axios
            .get(
                `https://rail.sustiknow.com/getOrders.php?date=${date}`
            )
            .then(
                (res) => {

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


                    // ------------------------------------------------
                    // PROCESS
                    // ------------------------------------------------

                    const processed =
                        processMeterData(
                            apiData
                        )


                    setTrendData(
                        processed
                    )


                    // ------------------------------------------------
                    // LATEST CUMULATIVE VALUE
                    // ------------------------------------------------

                    const latest =
                        processed[
                        processed.length - 1
                        ]


                    if (
                        latest &&
                        Number.isFinite(
                            latest._kwh
                        )
                    ) {

                        setTotalGeneration(
                            latest._kwh.toFixed(2)
                        )
                    }


                    // ------------------------------------------------
                    // TOTAL GENERATION AFTER LATEST RESET
                    //
                    // IMPORTANT:
                    //
                    // We SUM ONLY the _generated values in the
                    // post-reset dataset.
                    // ------------------------------------------------

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


                    setTodayGeneration(
                        dailyGeneration.toFixed(2)
                    )
                }
            )
            .catch(
                (error) => {

                    console.error(
                        "Energy generation API error:",
                        error
                    )

                    setTrendData([])

                    setTodayGeneration(
                        "0.00"
                    )

                    setTotalGeneration(
                        "0.00"
                    )
                }
            )

    }, [selectedDate])


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

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-10 gap-5">

                    <div>

                        <h1 className="text-5xl font-black text-gray-800 tracking-tight">

                            Energy Generation Dashboard

                        </h1>

                        <p className="text-gray-500 mt-3 text-lg">

                            Real-time solar energy production analytics

                        </p>

                    </div>


                    {/* DATE */}

                    <div className="bg-white p-5 rounded-3xl shadow-2xl border border-gray-100">

                        <h3 className="text-sm text-gray-500 mb-3 font-semibold">

                            Select Date

                        </h3>

                        <DatePicker

                            selected={
                                selectedDate
                            }

                            onChange={
                                (date) => {

                                    if (date) {

                                        setSelectedDate(
                                            date
                                        )
                                    }
                                }
                            }

                            dateFormat="dd/MM/yyyy"

                            className="border border-gray-200 rounded-2xl p-4 text-lg outline-none font-semibold shadow-sm"

                        />

                    </div>

                </div>


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">


                    {/* DAILY */}

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


                    {/* CUMULATIVE */}

                    <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Cumulative Energy

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


                {/* =================================================
                    DAILY ENERGY TREND
                ================================================= */}

                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10 border border-gray-100">

                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Daily Energy Trend

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Solar generation calculated from cumulative meter readings

                            </p>

                        </div>


                        <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">

                            LIVE ANALYTICS

                        </div>

                    </div>


                    <GenerationChart
                        trendData={
                            trendData
                        }
                    />

                </div>


                {/* =================================================
                    HISTORY
                ================================================= */}

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

                                        Cumulative Energy

                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {trendData

                                    .slice(-20)

                                    .reverse()

                                    .map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <tr

                                                key={
                                                    item?.id ||
                                                    index
                                                }

                                                className="border-b hover:bg-blue-50 transition-all duration-200"

                                            >

                                                <td className="p-5 font-semibold text-gray-700">

                                                    {
                                                        item?.loghh ||
                                                        "--"
                                                    }

                                                    :

                                                    {
                                                        item?.logmi ||
                                                        "--"
                                                    }

                                                </td>


                                                <td className="p-5 text-green-600 font-bold text-lg">

                                                    {Number(
                                                        item?._generated ||
                                                        0
                                                    ).toFixed(2)}

                                                    {" "}kWh

                                                </td>


                                                <td className="p-5 text-blue-600 font-bold text-lg">

                                                    {Number(
                                                        item?._kwh ??
                                                        item?.kwh ??
                                                        0
                                                    ).toFixed(2)}

                                                    {" "}kWh

                                                </td>

                                            </tr>

                                        )
                                    )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>

        </div>
    )
}

export default EnergyGeneration