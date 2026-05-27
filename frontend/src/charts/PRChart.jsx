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

    trendData,

    plantCapacity,

    irradiance

}) {

    // PEAK SUN HOURS

    const peakSunHours =

        irradiance / 1000

    // FORMAT DATA

    const chartData = trendData.map((item) => {

        const generation =

            parseFloat(item.kwhgen || 0)

        const pr =

            peakSunHours > 0

                ? (

                    generation /

                    (

                        plantCapacity *

                        peakSunHours

                    )

                ) * 100

                : 0

        return {

            time:

                `${item.loghh}:${item.logmi}`,

            pr:

                parseFloat(pr.toFixed(2))

        }

    })

    return (

        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 overflow-hidden transition-all duration-500">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">

                        Real-Time PR Trend

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Interactive live Performance Ratio analytics

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

            {/* CHART */}

            <ResponsiveContainer

                width="100%"

                height={360}

            >

                <AreaChart

                    data={chartData}

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

                    {/* GRID */}

                    <CartesianGrid

                        strokeDasharray="5 5"

                        stroke="#e5e7eb"

                        vertical={false}

                    />

                    {/* X AXIS */}

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

                        tickFormatter={(value) =>

                            `${value}%`

                        }

                    />

                    {/* TOOLTIP */}

                    <Tooltip

                        contentStyle={{

                            backgroundColor: "#ffffff",

                            borderRadius: "18px",

                            border: "1px solid #e5e7eb",

                            boxShadow:

                                "0 10px 30px rgba(0,0,0,0.08)",

                            fontSize: "14px"

                        }}

                        formatter={(value) =>

                            [`${value.toFixed(2)} %`, "PR"]

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

                        dataKey="pr"

                        stroke="#16a34a"

                        fill="url(#prGradient)"

                        strokeWidth={4}

                        animationDuration={2500}

                        activeDot={{

                            r: 7,

                            strokeWidth: 0,

                            fill: "#16a34a"

                        }}

                        name="PR Performance"

                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    )
}

export default PRChart