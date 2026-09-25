import Chart from "react-apexcharts"

function CurrentChart({ trendData = [] }) {

    // ============================================================
    // PREPARE DATA
    // ============================================================

    const chartData = Array.isArray(trendData)

        ? trendData
            .map((item) => {

                const hour =
                    Number.parseInt(
                        item.loghh,
                        10
                    )

                const minute =
                    Number.parseInt(
                        item.logmi,
                        10
                    )

                const currentR =
                    Number.parseFloat(
                        item.ir
                    )

                const currentY =
                    Number.parseFloat(
                        item.iy
                    )

                const currentB =
                    Number.parseFloat(
                        item.ib
                    )

                return {

                    hour:
                        Number.isFinite(hour)
                            ? hour
                            : 0,

                    minute:
                        Number.isFinite(minute)
                            ? minute
                            : 0,

                    time:
                        `${String(
                            Number.isFinite(hour)
                                ? hour
                                : 0
                        ).padStart(2, "0")
                        }:${String(
                            Number.isFinite(minute)
                                ? minute
                                : 0
                        ).padStart(2, "0")
                        }`,

                    currentR:
                        Number.isFinite(currentR)
                            ? currentR
                            : 0,

                    currentY:
                        Number.isFinite(currentY)
                            ? currentY
                            : 0,

                    currentB:
                        Number.isFinite(currentB)
                            ? currentB
                            : 0

                }

            })

            // ====================================================
            // CHRONOLOGICAL ORDER
            // ====================================================

            .sort((a, b) => {

                const timeA =
                    (
                        a.hour * 60
                    ) +
                    a.minute

                const timeB =
                    (
                        b.hour * 60
                    ) +
                    b.minute

                return timeA - timeB

            })

        : []


    // ============================================================
    // TIME DATA
    // ============================================================

    const timeData =
        chartData.map(
            (item) => item.time
        )


    // ============================================================
    // CURRENT DATA
    // ============================================================

    const currentR =
        chartData.map(
            (item) => item.currentR
        )

    const currentY =
        chartData.map(
            (item) => item.currentY
        )

    const currentB =
        chartData.map(
            (item) => item.currentB
        )


    // ============================================================
    // FIND CURRENT RANGE
    // ============================================================

    const allCurrents = [

        ...currentR,

        ...currentY,

        ...currentB

    ].filter(
        (value) =>
            Number.isFinite(value)
    )


    const minCurrent =
        allCurrents.length > 0

            ? Math.min(
                ...allCurrents
            )

            : 0


    const maxCurrent =
        allCurrents.length > 0

            ? Math.max(
                ...allCurrents
            )

            : 1


    // ============================================================
    // Y AXIS RANGE
    // ============================================================

    const currentRange =
        maxCurrent - minCurrent


    const padding =
        currentRange > 0

            ? currentRange * 0.15

            : Math.max(
                maxCurrent * 0.05,
                1
            )


    const yAxisMin =
        Math.max(
            0,
            Math.floor(
                (
                    minCurrent -
                    padding
                ) * 10
            ) / 10
        )


    const yAxisMax =
        Math.ceil(
            (
                maxCurrent +
                padding
            ) * 10
        ) / 10


    // ============================================================
    // CHART OPTIONS
    // ============================================================

    const chartOptions = {

        chart: {

            id:
                "current-chart",

            type:
                "area",

            height:
                360,

            background:
                "#ffffff",

            toolbar: {

                show: true,

                tools: {

                    download:
                        true,

                    selection:
                        true,

                    zoom:
                        true,

                    zoomin:
                        true,

                    zoomout:
                        true,

                    pan:
                        true,

                    reset:
                        true

                }

            },

            zoom: {

                enabled:
                    true,

                type:
                    "x",

                autoScaleYaxis:
                    true

            },

            animations: {

                enabled:
                    true,

                easing:
                    "linear",

                speed:
                    1000,

                animateGradually: {

                    enabled:
                        true,

                    delay:
                        80

                },

                dynamicAnimation: {

                    enabled:
                        true,

                    speed:
                        800

                }

            }

        },


        theme: {

            mode:
                "light"

        },


        colors: [

            "#ef4444",

            "#eab308",

            "#3b82f6"

        ],


        fill: {

            type:
                "gradient",

            gradient: {

                shade:
                    "light",

                type:
                    "vertical",

                shadeIntensity:
                    0.4,

                opacityFrom:
                    0.30,

                opacityTo:
                    0.02,

                stops: [
                    0,
                    100
                ]

            }

        },


        stroke: {

            curve:
                "smooth",

            width:
                4,

            lineCap:
                "round"

        },


        dataLabels: {

            enabled:
                false

        },


        grid: {

            borderColor:
                "#e5e7eb",

            strokeDashArray:
                6,

            padding: {

                left:
                    15,

                right:
                    15,

                top:
                    10,

                bottom:
                    10

            }

        },


        markers: {

            size:
                0,

            hover: {

                size:
                    7

            }

        },


        tooltip: {

            theme:
                "light",

            shared:
                true,

            intersect:
                false,

            style: {

                fontSize:
                    "14px"

            },

            x: {

                show:
                    true

            },

            y: {

                formatter:
                    function (value) {

                        const numericValue =
                            Number(
                                value
                            )

                        return (

                            numericValue
                                .toFixed(2)

                            +

                            " A"

                        )

                    }

            }

        },


        xaxis: {

            categories:
                timeData,

            tickAmount:
                Math.min(
                    8,
                    Math.max(
                        timeData.length - 1,
                        1
                    )
                ),

            labels: {

                rotate:
                    -45,

                style: {

                    colors:
                        "#64748b",

                    fontSize:
                        "12px",

                    fontWeight:
                        600

                }

            },

            axisBorder: {

                show:
                    false

            },

            axisTicks: {

                show:
                    false

            },

            crosshairs: {

                show:
                    true,

                stroke: {

                    color:
                        "#22c55e",

                    width:
                        1,

                    dashArray:
                        4

                }

            }

        },


        yaxis: {

            min:
                yAxisMin,

            max:
                yAxisMax,

            decimalsInFloat:
                1,

            labels: {

                formatter:
                    function (value) {

                        return Number(
                            value
                        ).toFixed(1)

                    },

                style: {

                    colors:
                        "#64748b",

                    fontSize:
                        "12px",

                    fontWeight:
                        600

                }

            },

            title: {

                text:
                    "Current (A)",

                style: {

                    color:
                        "#64748b",

                    fontSize:
                        "12px",

                    fontWeight:
                        600

                }

            }

        },


        legend: {

            position:
                "top",

            horizontalAlign:
                "center",

            floating:
                false,

            fontSize:
                "14px",

            fontWeight:
                700,

            itemMargin: {

                horizontal:
                    15,

                vertical:
                    8

            },

            labels: {

                colors:
                    "#374151"

            }

        }

    }


    // ============================================================
    // SERIES
    // ============================================================

    const chartSeries = [

        {

            name:
                "Current R",

            data:
                currentR

        },

        {

            name:
                "Current Y",

            data:
                currentY

        },

        {

            name:
                "Current B",

            data:
                currentB

        }

    ]


    // ============================================================
    // EMPTY STATE
    // ============================================================

    if (
        chartData.length === 0
    ) {

        return (

            <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8">

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">

                            Real-Time Current Trend

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Interactive live phase current monitoring

                        </p>

                    </div>


                    <div className="flex items-center gap-3 bg-gray-100 px-5 py-2 rounded-full">

                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>

                        <span className="text-gray-600 font-bold text-sm">

                            NO DATA

                        </span>

                    </div>

                </div>


                <div className="h-[360px] flex items-center justify-center">

                    <p className="text-gray-400 font-semibold">

                        No current data available for the selected date.

                    </p>

                </div>

            </div>

        )
    }


    // ============================================================
    // MAIN UI
    // ============================================================

    return (

        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 overflow-hidden transition-all duration-500">


            {/* HEADER */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">

                        Real-Time Current Trend

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Interactive live phase current monitoring

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

            <Chart

                options={
                    chartOptions
                }

                series={
                    chartSeries
                }

                type="area"

                height={360}

            />

        </div>

    )
}


export default CurrentChart