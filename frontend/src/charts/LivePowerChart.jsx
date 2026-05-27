import {

    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip

} from "recharts"

function LivePowerChart({ liveChartData }) {

    return (

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-bold text-gray-800">

                        Live Solar Output

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Real-time MQTT Power Monitoring

                    </p>

                </div>

                {/* LIVE STATUS */}

                <div className="flex items-center gap-3">

                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse">

                    </div>

                    <span className="text-green-600 font-semibold">

                        Live

                    </span>

                </div>

            </div>

            {/* CHART */}

            <ResponsiveContainer
                width="100%"
                height={420}
            >

                <AreaChart
                    data={liveChartData}
                >

                    {/* GREEN GRADIENT */}

                    <defs>

                        <linearGradient
                            id="powerGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop

                                offset="0%"

                                stopColor="#22c55e"

                                stopOpacity={0.9}

                            />

                            <stop

                                offset="100%"

                                stopColor="#22c55e"

                                stopOpacity={0.05}

                            />

                        </linearGradient>

                    </defs>

                    {/* GRID */}

                    <CartesianGrid

                        strokeDasharray="3 3"

                        stroke="#e5e7eb"

                    />

                    {/* X AXIS */}

                    <XAxis

                        dataKey="time"

                        tick={{
                            fill: "#6b7280"
                        }}

                    />

                    {/* Y AXIS */}

                    <YAxis

                        tick={{
                            fill: "#6b7280"
                        }}

                    />

                    {/* TOOLTIP */}

                    <Tooltip

                        contentStyle={{

                            backgroundColor: "#ffffff",

                            borderRadius: "16px",

                            border: "none",

                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.1)"

                        }}

                    />

                    {/* LIVE AREA */}

                    <Area

                        type="monotone"

                        dataKey="power"

                        stroke="#16a34a"

                        strokeWidth={4}

                        fill="url(#powerGradient)"

                        animationDuration={1000}

                        activeDot={{

                            r: 8,

                            fill: "#16a34a"

                        }}

                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    )
}

export default LivePowerChart