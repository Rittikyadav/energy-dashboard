import { useEffect, useState } from "react"

import axios from "axios"

import Sidebar from "../components/Sidebar"

import IrradianceChart from "../charts/IrradianceChart"

import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"


function Irradiance() {

    // ============================================================
    // DATE
    // ============================================================

    const [selectedDate, setSelectedDate] =
        useState(new Date())


    // ============================================================
    // API DATA
    // ============================================================

    const [trendData, setTrendData] =
        useState([])


    // ============================================================
    // SOLAR IRRADIATION REFERENCE
    //
    // Comes from:
    //
    // getOrders.php
    //      ↓
    // dni_cer
    //      ↓
    // dni / days
    //
    // Unit:
    //
    // kWh/m²/day
    // ============================================================

    const [irradiance, setIrradiance] =
        useState("0.00")


    // ============================================================
    // LOADING
    // ============================================================

    const [loading, setLoading] =
        useState(true)


    // ============================================================
    // ERROR
    // ============================================================

    const [error, setError] =
        useState("")


    // ============================================================
    // FORMAT LOCAL DATE
    //
    // Avoid toISOString() because UTC conversion can shift the
    // selected date.
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
            ).padStart(2, "0")

        const day =
            String(
                date.getDate()
            ).padStart(2, "0")

        return `${year}-${month}-${day}`
    }


    // ============================================================
    // FETCH DATA
    // ============================================================

    useEffect(() => {

        let cancelled = false


        const fetchData = async () => {

            try {

                setLoading(true)

                setError("")


                // =================================================
                // DATE
                // =================================================

                const formattedDate =
                    formatLocalDate(
                        selectedDate
                    )


                // =================================================
                // API
                // =================================================

                const response =
                    await axios.get(

                        `https://rail.sustiknow.com/getOrders.php?date=${formattedDate}`

                    )


                if (cancelled) {
                    return
                }


                // =================================================
                // METER / TREND DATA
                // =================================================

                const apiData =
                    Array.isArray(
                        response.data?.data
                    )
                        ? response.data.data
                        : []


                setTrendData(
                    apiData
                )


                // =================================================
                // SOLAR IRRADIATION REFERENCE
                //
                // API:
                //
                // irradiance[0].asi
                //
                // Example August:
                //
                // DNI = 123.700
                // Days = 31
                //
                // ASI = 123.700 / 31
                //     = 3.99 kWh/m²/day
                // =================================================

                const asi =
                    Number.parseFloat(

                        response.data
                            ?.irradiance
                            ?.[0]
                            ?.asi

                    )


                if (
                    Number.isFinite(
                        asi
                    )
                ) {

                    setIrradiance(
                        asi.toFixed(2)
                    )

                } else {

                    setIrradiance(
                        "0.00"
                    )
                }


            } catch (err) {

                console.error(
                    "Irradiation API Error:",
                    err
                )


                if (!cancelled) {

                    setError(
                        "Unable to load solar irradiation data."
                    )
                }

            } finally {

                if (!cancelled) {

                    setLoading(false)
                }
            }
        }


        fetchData()


        return () => {

            cancelled = true

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

                            Loading solar irradiation data...

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

                    </div>

                </main>

            </div>
        )
    }


    // ============================================================
    // MAIN
    // ============================================================

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex">


            {/* ====================================================
                SIDEBAR
            ==================================================== */}

            <Sidebar />


            {/* ====================================================
                MAIN CONTENT
            ==================================================== */}

            <main className="flex-1 p-8 overflow-y-auto">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-10 gap-5">


                    <div>

                        <h1 className="text-5xl font-black text-gray-800 tracking-tight">

                            Solar Irradiation Analysis

                        </h1>

                        <p className="text-gray-500 mt-3 text-lg">

                            External solar resource reference for plant performance analysis

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
                    TOP CARDS
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">


                    {/* =================================================
                        SOLAR IRRADIATION
                    ================================================= */}

                    <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Solar Irradiation Reference

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


                    {/* =================================================
                        SOURCE
                    ================================================= */}

                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Reference Type

                                </h3>

                                <p className="text-3xl font-black mt-5">

                                    Monthly

                                </p>

                                <p className="mt-2 text-blue-100">

                                    Solar resource dataset

                                </p>

                            </div>


                            <div className="text-7xl">

                                🌤️

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        SENSOR STATUS
                    ================================================= */}

                    <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl shadow-2xl p-8 text-white hover:scale-[1.02] transition-all duration-300">

                        <div className="flex justify-between items-center">

                            <div>

                                <h3 className="text-lg font-semibold opacity-90">

                                    Irradiance Sensor

                                </h3>

                                <p className="text-3xl font-black mt-5">

                                    Not Installed

                                </p>

                                <p className="mt-2 text-green-100">

                                    External reference used

                                </p>

                            </div>


                            <div className="text-7xl">

                                📡

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    INFORMATION PANEL
                ================================================= */}

                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-10">


                    <div className="flex items-start gap-5">

                        <div className="bg-orange-100 rounded-2xl p-4 text-3xl">

                            ☀️

                        </div>


                        <div>

                            <h2 className="text-2xl font-black text-gray-800">

                                Solar Irradiation Reference

                            </h2>

                            <p className="text-gray-500 mt-2 leading-relaxed">

                                The plant does not have a physical
                                irradiance sensor or pyranometer.
                                Solar irradiation is therefore used
                                as an external reference for plant
                                performance calculations.

                            </p>


                            <div className="mt-4 flex flex-wrap gap-3">

                                <span className="bg-orange-50 text-orange-700 border border-orange-100 px-4 py-2 rounded-full text-sm font-bold">

                                    Daily Reference

                                </span>

                                <span className="bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-full text-sm font-bold">

                                    kWh/m²/day

                                </span>

                                <span className="bg-green-50 text-green-700 border border-green-100 px-4 py-2 rounded-full text-sm font-bold">

                                    Used for PR

                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    CHART CONTAINER
                ================================================= */}

                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">


                    <div className="flex items-center justify-between mb-8">


                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Solar Irradiation Reference

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Daily solar resource value used for performance analysis

                            </p>

                        </div>


                        <div className="bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-bold">

                            REFERENCE DATA

                        </div>

                    </div>


                    <IrradianceChart

                        trendData={
                            trendData
                        }

                        irradiance={
                            irradiance
                        }

                    />

                </div>

            </main>

        </div>
    )
}


export default Irradiance