import Chart from "react-apexcharts"

function VoltageChart({ trendData = [] }) {

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

                const voltageR =
                    Number.parseFloat(
                        item.vr
                    )

                const voltageY =
                    Number.parseFloat(
                        item.vy
                    )

                const voltageB =
                    Number.parseFloat(
                        item.vb
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

                    voltageR:
                        Number.isFinite(voltageR)
                            ? voltageR
                            : 0,

                    voltageY:
                        Number.isFinite(voltageY)
                            ? voltageY
                            : 0,

                    voltageB:
                        Number.isFinite(voltageB)
                            ? voltageB
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
    // TIME
    // ============================================================

    const timeData =
        chartData.map(
            (item) => item.time
        )


    // ============================================================
    // VOLTAGE DATA
    // ============================================================

    const voltageR =
        chartData.map(
            (item) => item.voltageR
        )

    const voltageY =
        chartData.map(
            (item) => item.voltageY
        )

    const voltageB =
        chartData.map(
            (item) => item.voltageB
        )


    // ============================================================
    // FIND VOLTAGE RANGE
    // ============================================================

    const allVoltages = [

        ...voltageR,

        ...voltageY,

        ...voltageB

    ].filter(
        (value) =>
            Number.isFinite(value)
    )


    const minVoltage =
        allVoltages.length > 0

            ? Math.min(
                ...allVoltages
            )

            : 0


    const maxVoltage =
        allVoltages.length > 0

            ? Math.max(
                ...allVoltages
            )

            : 1


    // ============================================================
    // Y AXIS RANGE
    //
    // Keep some breathing room around the actual voltage values.
    // ============================================================

    const voltageRange =
        maxVoltage - minVoltage


    const padding =
        voltageRange > 0

            ? voltageRange * 0.15

            : Math.max(
                maxVoltage * 0.05,
                5
            )


    const yAxisMin =
        Math.max(
            0,
            Math.floor(
                (
                    minVoltage -
                    padding
                ) * 10
            ) / 10
        )


    const yAxisMax =
        Math.ceil(
            (
                maxVoltage +
                padding
            ) * 10
        ) / 10


    // ============================================================
    // CHART OPTIONS
    // ============================================================

    const chartOptions = {

        chart: {

            id:
                "voltage-chart",

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

                            " V"

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
                    "Voltage (V)",

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
                "Voltage R",

            data:
                voltageR

        },

        {

            name:
                "Voltage Y",

            data:
                voltageY

        },

        {

            name:
                "Voltage B",

            data:
                voltageB

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

                            Real-Time Voltage Trend

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Interactive live phase voltage monitoring

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

                        No voltage data available for the selected date.

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


            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="flex items-center justify-between mb-8">


                <div>

                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">

                        Real-Time Voltage Trend

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Interactive live phase voltage monitoring

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
                CHART
            ==================================================== */}

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


export default VoltageChart