import {

    PieChart,
    Pie,
    Cell,
    ResponsiveContainer

} from "recharts"

function PRDonutChart({ pr }) {

    // LIMIT PR VALUE

    const prValue = Math.min(

        Math.max(

            Math.round(parseFloat(pr || 0)),

            0

        ),

        100

    )

    // REMAINING

    const remaining =

        100 - prValue

    // DATA

    const data = [

        {

            name: "PR",

            value: prValue

        },

        {

            name: "Remaining",

            value: remaining

        }

    ]

    // COLORS

    const COLORS = [

        "#22c55e",

        "#ecfdf5"

    ]

    return (

        <div className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-6 overflow-hidden transition-all duration-500">

            {/* HEADER */}

            <div className="mb-5">

                <h2 className="text-2xl font-black text-gray-800 tracking-tight">

                    Daily PR Efficiency

                </h2>

                <p className="text-gray-500 mt-1 text-sm">

                    Performance ratio visualization

                </p>

            </div>

            {/* DONUT TILE */}

            <div className="bg-gradient-to-br from-green-50 to-white rounded-[24px] border border-green-100 shadow-inner p-4 flex items-center justify-center relative overflow-hidden">

                {/* SOFT GLOW */}

                <div className="absolute w-52 h-52 bg-green-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>

                {/* CHART */}

                <div className="relative w-full h-[240px] flex items-center justify-center">

                    <ResponsiveContainer

                        width="100%"

                        height="100%"

                    >

                        <PieChart>

                            <Pie

                                data={data}

                                cx="50%"

                                cy="50%"

                                innerRadius={72}

                                outerRadius={100}

                                startAngle={90}

                                endAngle={-270}

                                paddingAngle={2}

                                dataKey="value"

                                animationBegin={0}

                                animationDuration={1800}

                                animationEasing="ease-out"

                                stroke="none"

                            >

                                {data.map((entry, index) => (

                                    <Cell

                                        key={index}

                                        fill={COLORS[index]}

                                    />

                                ))}

                            </Pie>

                        </PieChart>

                    </ResponsiveContainer>

                    {/* CENTER TILE */}

                    <div className="absolute inset-0 flex items-center justify-center">

                        <div className="bg-white rounded-full shadow-xl w-36 h-36 flex flex-col items-center justify-center border border-green-100">

                            <p className="text-5xl font-black text-green-600 tracking-tight leading-none">

                                {prValue}

                                <span className="text-2xl">

                                    %

                                </span>

                            </p>

                            <p className="text-gray-500 mt-1 text-xs font-semibold">

                                PR Ratio

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* STATUS TILE */}

            <div className="mt-4 bg-green-50 border border-green-100 rounded-2xl p-3 flex items-center justify-center">

                <p className="text-green-700 font-bold text-sm">

                    Healthy Plant Performance

                </p>

            </div>

        </div>

    )
}

export default PRDonutChart