import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts"

function GenerationChart({ trendData = [] }) {

    /*
     * ============================================================
     * SAFETY
     * ============================================================
     */

    const safeData = Array.isArray(trendData)
        ? trendData.filter(Boolean)
        : []


    /*
     * ============================================================
     * IMPORTANT
     *
     * EnergyGeneration.jsx already calculates:
     *
     *     _generated
     *
     * including meter-reset handling.
     *
     * DO NOT recalculate kWh differences here.
     *
     * The chart must use exactly the same values as:
     *
     *     Daily Generation
     *
     * and:
     *
     *     Generation History
     * ============================================================
     */


    /*
     * ============================================================
     * SORT OLD -> NEW
     * ============================================================
     */

    const orderedData = [...safeData].sort(
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


    /*
     * ============================================================
     * CONVERT DATA FOR CHART
     *
     * Use _generated directly.
     * ============================================================
     */

    const calculatedData = orderedData
        .map((item) => {

            let hour =
                Number.parseInt(
                    item?.loghh,
                    10
                )


            /*
             * Fallback to timestamp
             */

            if (
                !Number.isFinite(hour) &&
                item?.ts
            ) {

                const date =
                    new Date(item.ts)

                if (
                    !Number.isNaN(
                        date.getTime()
                    )
                ) {

                    hour =
                        date.getHours()
                }
            }


            /*
             * Ignore invalid hours
             */

            if (
                !Number.isFinite(hour) ||
                hour < 0 ||
                hour > 23
            ) {

                return null
            }


            /*
             * ----------------------------------------------------
             * USE THE ALREADY-CALCULATED GENERATION
             * ----------------------------------------------------
             *
             * _generated is created by EnergyGeneration.jsx.
             *
             * This is important because it already handles:
             *
             * 18431.92
             *       ↓
             * 18304.10  RESET
             *       ↓
             * 18304.28
             *
             * Therefore the chart must NOT calculate
             * currentKwh - previousKwh again.
             */

            const generation =
                Number(
                    item?._generated || 0
                )


            return {

                hour,

                generation:
                    Number.isFinite(
                        generation
                    ) &&
                        generation > 0
                        ? generation
                        : 0,

                kwh:
                    Number.parseFloat(
                        item?.kwh
                    ),

                ts:
                    item?.ts || null
            }
        })
        .filter(Boolean)


    /*
     * ============================================================
     * 24-HOUR TEMPLATE
     * ============================================================
     */

    const hourlyData =
        Array.from(
            { length: 24 },
            (_, i) => ({

                hour:
                    i
                        .toString()
                        .padStart(
                            2,
                            "0"
                        ),

                generation: 0
            })
        )


    /*
     * ============================================================
     * GROUP GENERATION BY HOUR
     * ============================================================
     */

    calculatedData.forEach(
        (item) => {

            const hour =
                Number.parseInt(
                    item.hour,
                    10
                )


            if (
                !Number.isFinite(hour) ||
                hour < 0 ||
                hour > 23
            ) {

                return
            }


            hourlyData[
                hour
            ].generation +=
                item.generation
        }
    )


    /*
     * ============================================================
     * ROUND ONLY FOR DISPLAY
     * ============================================================
     */

    hourlyData.forEach(
        (item) => {

            item.generation =
                Number(
                    item.generation.toFixed(
                        3
                    )
                )
        }
    )


    /*
     * ============================================================
     * PERIOD GENERATION
     *
     * Use the SAME _generated values.
     *
     * No independent calculation.
     * ============================================================
     */

    const totalGeneration =
        calculatedData.reduce(
            (
                sum,
                item
            ) => {

                return (
                    sum +
                    (
                        Number.isFinite(
                            item.generation
                        )
                            ? item.generation
                            : 0
                    )
                )
            },
            0
        )


    /*
     * ============================================================
     * UI
     * ============================================================
     */

    return (

        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 overflow-hidden transition-all duration-500">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">

                        Real-Time Energy Generation

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Hourly solar energy generation based on cumulative meter readings

                    </p>

                </div>


                {/* PERIOD GENERATION */}

                <div className="text-right">

                    <div className="text-sm text-gray-500 font-semibold">

                        Period Generation

                    </div>

                    <div className="text-2xl font-black text-green-600">

                        {totalGeneration.toFixed(2)} kWh

                    </div>

                </div>

            </div>


            {/* LIVE BADGE */}

            <div className="flex justify-end mb-4">

                <div className="flex items-center gap-3 bg-green-100 px-5 py-2 rounded-full shadow-md">

                    <div className="relative">

                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>

                        <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>

                    </div>

                    <span className="text-green-700 font-bold text-sm tracking-wide">

                        LIVE

                    </span>

                </div>

            </div>


            {/* CHART */}

            <ResponsiveContainer
                width="100%"
                height={380}
            >

                <AreaChart
                    data={hourlyData}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 10
                    }}
                >

                    {/* GRADIENT */}

                    <defs>

                        <linearGradient
                            id="solarGenerationGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="0%"
                                stopColor="#22c55e"
                                stopOpacity={0.50}
                            />

                            <stop
                                offset="100%"
                                stopColor="#22c55e"
                                stopOpacity={0.03}
                            />

                        </linearGradient>

                    </defs>


                    {/* GRID */}

                    <CartesianGrid
                        strokeDasharray="5 5"
                        stroke="#e5e7eb"
                        vertical={false}
                    />


                    {/* X AXIS */}

                    <XAxis
                        dataKey="hour"
                        tick={{
                            fill: "#64748b",
                            fontSize: 12,
                            fontWeight: 600
                        }}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        interval={1}
                        tickFormatter={
                            (value) =>
                                `${value}:00`
                        }
                    />


                    {/* Y AXIS */}

                    <YAxis
                        tick={{
                            fill: "#64748b",
                            fontSize: 12,
                            fontWeight: 600
                        }}
                        tickLine={false}
                        axisLine={false}
                        width={65}
                        tickFormatter={
                            (value) =>
                                `${Number(
                                    value
                                ).toFixed(1)}`
                        }
                        label={{
                            value:
                                "Generation (kWh)",
                            angle: -90,
                            position:
                                "insideLeft",
                            style: {
                                textAnchor:
                                    "middle",
                                fill:
                                    "#64748b",
                                fontSize:
                                    12,
                                fontWeight:
                                    600
                            }
                        }}
                    />


                    {/* TOOLTIP */}

                    <Tooltip
                        contentStyle={{
                            backgroundColor:
                                "#ffffff",
                            borderRadius:
                                "18px",
                            border:
                                "1px solid #e5e7eb",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.08)",
                            fontSize:
                                "14px"
                        }}
                        labelStyle={{
                            fontWeight: 700,
                            marginBottom: 6
                        }}
                        labelFormatter={
                            (label) =>
                                `${label}:00`
                        }
                        formatter={
                            (value) => [
                                `${Number(
                                    value || 0
                                ).toFixed(
                                    2
                                )} kWh`,
                                "Generation"
                            ]
                        }
                    />


                    {/* LEGEND */}

                    <Legend
                        verticalAlign="top"
                        align="center"
                        wrapperStyle={{
                            paddingBottom: 20,
                            fontWeight: 700
                        }}
                    />


                    {/* AREA */}

                    <Area
                        type="monotone"
                        dataKey="generation"
                        stroke="#16a34a"
                        fill="url(#solarGenerationGradient)"
                        strokeWidth={4}
                        animationDuration={1000}
                        activeDot={{
                            r: 7,
                            strokeWidth: 0,
                            fill: "#16a34a"
                        }}
                        name="Solar Generation"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>
    )
}

export default GenerationChart