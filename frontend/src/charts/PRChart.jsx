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


function PRChart({
    trendData = [],
    plantCapacity = 0,
    irradiance = 0
}) {

    // ============================================================
    // SAFE VALUES
    // ============================================================

    const capacity =
        Number(plantCapacity) || 0

    const dailyIrradiance =
        Number(irradiance) || 0


    // ============================================================
    // SORT DATA CHRONOLOGICALLY
    // ============================================================

    const sortedData =
        [...trendData]
            .filter((item) => item)
            .sort((a, b) => {

                const timeA =
                    new Date(
                        a?.ts || 0
                    ).getTime()

                const timeB =
                    new Date(
                        b?.ts || 0
                    ).getTime()

                return timeA - timeB
            })


    // ============================================================
    // RESET-AWARE CUMULATIVE METER PROCESSING
    //
    // kwh is a cumulative meter reading.
    //
    // Normal:
    //
    // current - previous
    //
    // Reset:
    //
    // previous = 18431.92
    // current  = 18304.10
    //
    // When current < previous:
    // start a new generation segment.
    // ============================================================

    let segmentBaseline = null

    let previousKwh = null


    const chartData =
        sortedData.map((item) => {

            // ====================================================
            // TIME
            // ====================================================

            const hour =
                String(
                    item?.loghh ?? ""
                ).padStart(2, "0")

            const minute =
                String(
                    item?.logmi ?? ""
                ).padStart(2, "0")

            const time =
                `${hour}:${minute}`


            // ====================================================
            // CUMULATIVE KWH
            // ====================================================

            const currentKwh =
                Number.parseFloat(
                    item?.kwh
                )


            // ====================================================
            // INVALID DATA
            // ====================================================

            if (
                !Number.isFinite(
                    currentKwh
                )
            ) {

                return {

                    time,

                    pr: null,

                    generation: null,

                    cumulative: null,

                    reset: false
                }
            }


            // ====================================================
            // FIRST VALID READING
            // ====================================================

            if (
                previousKwh === null ||
                segmentBaseline === null
            ) {

                previousKwh =
                    currentKwh

                segmentBaseline =
                    currentKwh

                return {

                    time,

                    pr: 0,

                    generation: 0,

                    cumulative:
                        Number(
                            currentKwh.toFixed(2)
                        ),

                    reset: false
                }
            }


            // ====================================================
            // DIFFERENCE
            // ====================================================

            const difference =
                currentKwh -
                previousKwh


            // ====================================================
            // METER RESET
            //
            // Example:
            //
            // 18431.92
            //       ↓
            // 18304.10
            //
            // IMPORTANT:
            //
            // Do NOT plot this as PR = 0.
            //
            // Instead return null so the chart creates
            // a visual break.
            // ====================================================

            if (
                Number.isFinite(
                    difference
                ) &&
                difference < 0
            ) {

                segmentBaseline =
                    currentKwh

                previousKwh =
                    currentKwh

                return {

                    time,

                    pr: null,

                    generation: null,

                    cumulative:
                        Number(
                            currentKwh.toFixed(2)
                        ),

                    reset: true
                }
            }


            // ====================================================
            // GENERATION FROM CURRENT SEGMENT
            // ====================================================

            let generation =
                currentKwh -
                segmentBaseline


            if (
                !Number.isFinite(
                    generation
                ) ||
                generation < 0
            ) {

                generation = 0
            }


            // ====================================================
            // UPDATE PREVIOUS METER
            // ====================================================

            previousKwh =
                currentKwh


            // ====================================================
            // PR CALCULATION
            //
            // PR =
            //
            // Generated Energy
            // -----------------------------
            // Capacity × Irradiance
            //
            // × 100
            // ====================================================

            let pr = 0


            if (
                capacity > 0 &&
                dailyIrradiance > 0
            ) {

                pr =
                    (
                        generation /
                        (
                            capacity *
                            dailyIrradiance
                        )
                    ) *
                    100
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
            // LIMIT PR
            // ====================================================

            pr =
                Math.min(
                    Math.max(
                        pr,
                        0
                    ),
                    100
                )


            // ====================================================
            // CHART POINT
            // ====================================================

            return {

                time,

                pr:
                    Number(
                        pr.toFixed(2)
                    ),

                generation:
                    Number(
                        generation.toFixed(2)
                    ),

                cumulative:
                    Number(
                        currentKwh.toFixed(2)
                    ),

                reset: false
            }
        })


    // ============================================================
    // EMPTY DATA PROTECTION
    // ============================================================

    const safeChartData =
        chartData.length > 0
            ? chartData
            : [

                {
                    time: "--:--",

                    pr: 0,

                    generation: 0,

                    cumulative: 0,

                    reset: false
                }

            ]


    // ============================================================
    // GET VALID PR VALUES
    //
    // Used for dynamic Y-axis scaling.
    // ============================================================

    const validPRValues =
        safeChartData
            .map(
                (item) =>
                    Number(item?.pr)
            )
            .filter(
                (value) =>
                    Number.isFinite(value)
            )


    const maxPR =
        validPRValues.length > 0
            ? Math.max(
                ...validPRValues
            )
            : 0


    // ============================================================
    // DYNAMIC Y-AXIS
    //
    // If PR is around 7%, don't waste the chart with 0–100%.
    //
    // Examples:
    //
    // max PR = 6.98
    // chart max ≈ 10
    //
    // max PR = 22
    // chart max ≈ 25
    //
    // max PR = 85
    // chart max ≈ 100
    // ============================================================

    let yAxisMax


    if (maxPR <= 5) {

        yAxisMax = 10

    } else if (maxPR <= 8) {

        yAxisMax = 10

    } else if (maxPR <= 15) {

        yAxisMax = 20

    } else if (maxPR <= 20) {

        yAxisMax = 25

    } else if (maxPR <= 30) {

        yAxisMax = 40

    } else if (maxPR <= 50) {

        yAxisMax = 60

    } else if (maxPR <= 75) {

        yAxisMax = 80

    } else {

        yAxisMax = 100
    }


    // ============================================================
    // LATEST PR
    // ============================================================

    const latestPR =
        validPRValues.length > 0
            ? validPRValues[
            validPRValues.length - 1
            ]
            : 0


    // ============================================================
    // CHART
    // ============================================================

    return (

        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 overflow-hidden transition-all duration-500">


            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">

                        Real-Time PR Trend

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Performance ratio calculated from cumulative energy generation

                    </p>

                </div>


                {/* LIVE BADGE */}

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


            {/* ====================================================
                SUMMARY CARDS
            ==================================================== */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">


                {/* PLANT CAPACITY */}

                <div className="bg-gray-50 rounded-2xl p-5">

                    <p className="text-sm text-gray-500 font-semibold">

                        Plant Capacity

                    </p>

                    <p className="text-2xl font-black text-gray-800 mt-1">

                        {capacity.toFixed(2)} kWp

                    </p>

                </div>


                {/* SOLAR IRRADIANCE */}

                <div className="bg-gray-50 rounded-2xl p-5">

                    <p className="text-sm text-gray-500 font-semibold">

                        Solar Irradiance

                    </p>

                    <p className="text-2xl font-black text-gray-800 mt-1">

                        {dailyIrradiance.toFixed(2)}

                        <span className="text-sm ml-1 font-semibold text-gray-500">

                            kWh/m²/day

                        </span>

                    </p>

                </div>


                {/* LATEST PR */}

                <div className="bg-green-50 rounded-2xl p-5">

                    <p className="text-sm text-green-600 font-semibold">

                        Latest PR

                    </p>

                    <p className="text-2xl font-black text-green-700 mt-1">

                        {latestPR.toFixed(2)}%

                    </p>

                </div>

            </div>


            {/* ====================================================
                CHART
            ==================================================== */}

            <ResponsiveContainer
                width="100%"
                height={360}
            >

                <AreaChart
                    data={safeChartData}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 10
                    }}
                >


                    {/* =================================================
                        GRADIENT
                    ================================================= */}

                    <defs>

                        <linearGradient
                            id="prGradient"
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


                    {/* =================================================
                        GRID
                    ================================================= */}

                    <CartesianGrid
                        strokeDasharray="5 5"
                        stroke="#e5e7eb"
                        vertical={false}
                    />


                    {/* =================================================
                        X AXIS
                    ================================================= */}

                    <XAxis
                        dataKey="time"
                        tick={{
                            fill: "#64748b",
                            fontSize: 12,
                            fontWeight: 600
                        }}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        minTickGap={30}
                    />


                    {/* =================================================
                        Y AXIS
                    ================================================= */}

                    <YAxis
                        domain={[
                            0,
                            yAxisMax
                        ]}
                        tick={{
                            fill: "#64748b",
                            fontSize: 12,
                            fontWeight: 600
                        }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) =>
                            `${value}%`
                        }
                    />


                    {/* =================================================
                        TOOLTIP
                    ================================================= */}

                    <Tooltip

                        contentStyle={{
                            backgroundColor: "#ffffff",
                            borderRadius: "18px",
                            border: "1px solid #e5e7eb",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.08)",
                            fontSize: "14px"
                        }}

                        labelStyle={{
                            fontWeight: 700,
                            marginBottom: 6
                        }}

                        formatter={(
                            value,
                            name
                        ) => {

                            if (
                                name ===
                                "PR Performance"
                            ) {

                                return [

                                    `${Number(value).toFixed(2)} %`,

                                    "PR"

                                ]
                            }


                            return [

                                `${Number(value).toFixed(2)} kWh`,

                                "Generation"

                            ]
                        }}

                    />


                    {/* =================================================
                        LEGEND
                    ================================================= */}

                    <Legend
                        verticalAlign="top"
                        align="center"
                        wrapperStyle={{
                            paddingBottom: 20,
                            fontWeight: 700
                        }}
                    />


                    {/* =================================================
                        PR AREA
                    ================================================= */}

                    <Area

                        type="monotone"

                        dataKey="pr"

                        stroke="#16a34a"

                        fill="url(#prGradient)"

                        strokeWidth={4}

                        animationDuration={1200}

                        activeDot={{
                            r: 7,
                            strokeWidth: 0,
                            fill: "#16a34a"
                        }}

                        name="PR Performance"

                        connectNulls={false}

                    />

                </AreaChart>

            </ResponsiveContainer>


            {/* ====================================================
                FORMULA
            ==================================================== */}

            <div className="mt-6 bg-gray-50 rounded-2xl p-5">

                <p className="text-sm text-gray-500 font-semibold mb-2">

                    PR Calculation

                </p>

                <p className="text-gray-700 font-semibold">

                    PR = Generated Energy ÷
                    (Plant Capacity × Solar Irradiance) × 100

                </p>

            </div>

        </div>
    )
}


export default PRChart