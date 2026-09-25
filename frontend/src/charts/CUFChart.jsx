import Chart from "react-apexcharts"

function CUFChart({
    trendData,
    plantCapacity
}) {

    // ============================================================
    // PLANT CAPACITY
    // ============================================================

    const capacity =
        Number.parseFloat(
            plantCapacity
        ) || 30


    // ============================================================
    // SORT DATA CHRONOLOGICALLY
    // ============================================================

    const sortedData =
        [...(Array.isArray(trendData)
            ? trendData
            : [])]
            .filter(Boolean)
            .sort(
                (a, b) =>
                    new Date(
                        a?.ts || 0
                    ).getTime() -
                    new Date(
                        b?.ts || 0
                    ).getTime()
            )


    // ============================================================
    // BUILD CUF TREND
    //
    // kWh is cumulative.
    //
    // We calculate:
    //
    // interval generation =
    // current kWh - previous kWh
    //
    // Then:
    //
    // cumulative daily generation
    // -------------------------------- × 100
    // plant capacity × 24
    //
    // This keeps the chart consistent with the CUF card.
    // ============================================================

    let previousKwh = null

    let cumulativeGeneration = 0


    const chartData =
        sortedData.map(
            (item) => {

                const currentKwh =
                    Number.parseFloat(
                        item?.kwh
                    )


                // ----------------------------------------------------
                // INVALID KWH
                // ----------------------------------------------------

                if (
                    !Number.isFinite(
                        currentKwh
                    )
                ) {

                    return null
                }


                // ----------------------------------------------------
                // FIRST READING
                // ----------------------------------------------------

                if (
                    previousKwh === null
                ) {

                    previousKwh =
                        currentKwh


                    return {

                        time:
                            `${String(
                                item?.loghh ??
                                ""
                            ).padStart(
                                2,
                                "0"
                            )}:${String(
                                item?.logmi ??
                                ""
                            ).padStart(
                                2,
                                "0"
                            )}`,

                        cuf: 0,

                        generation: 0,

                        cumulativeKwh:
                            currentKwh
                    }
                }


                // ----------------------------------------------------
                // METER DIFFERENCE
                // ----------------------------------------------------

                const difference =
                    currentKwh -
                    previousKwh


                // ----------------------------------------------------
                // HANDLE METER RESET
                //
                // If cumulative meter suddenly becomes smaller,
                // don't create negative generation.
                // ----------------------------------------------------

                if (
                    difference >= 0
                ) {

                    cumulativeGeneration +=
                        difference

                }


                previousKwh =
                    currentKwh


                // ----------------------------------------------------
                // DAILY CUF
                // ----------------------------------------------------

                const cuf =
                    capacity > 0
                        ? (
                            cumulativeGeneration /
                            (
                                capacity *
                                24
                            )
                        ) *
                        100
                        : 0


                return {

                    time:
                        `${String(
                            item?.loghh ??
                            ""
                        ).padStart(
                            2,
                            "0"
                        )}:${String(
                            item?.logmi ??
                            ""
                        ).padStart(
                            2,
                            "0"
                        )}`,

                    cuf:
                        Number(
                            cuf.toFixed(
                                2
                            )
                        ),

                    generation:
                        Number(
                            cumulativeGeneration.toFixed(
                                2
                            )
                        ),

                    cumulativeKwh:
                        currentKwh
                }
            }
        )
            .filter(Boolean)


    // ============================================================
    // CHART OPTIONS
    // ============================================================

    const chartOptions = {

        chart: {

            id: "cuf-chart",

            type: "area",

            height: 360,

            background: "#ffffff",

            toolbar: {

                show: true,

                tools: {

                    download: true,

                    selection: true,

                    zoom: true,

                    zoomin: true,

                    zoomout: true,

                    pan: true,

                    reset: true
                }
            },

            zoom: {

                enabled: true,

                type: "x",

                autoScaleYaxis: true
            },

            animations: {

                enabled: true,

                easing: "linear",

                speed: 600,

                animateGradually: {

                    enabled: false
                },

                dynamicAnimation: {

                    enabled: true,

                    speed: 500
                }
            }
        },


        theme: {

            mode: "light"
        },


        colors: [

            "#10b981"
        ],


        fill: {

            type: "gradient",

            gradient: {

                shade: "light",

                type: "vertical",

                shadeIntensity: 0.5,

                opacityFrom: 0.45,

                opacityTo: 0.03,

                stops: [
                    0,
                    100
                ]
            }
        },


        stroke: {

            curve: "smooth",

            width: 4,

            lineCap: "round",

            colors: [
                "#10b981"
            ]
        },


        dataLabels: {

            enabled: false
        },


        grid: {

            borderColor:
                "#e5e7eb",

            strokeDashArray: 6,

            padding: {

                left: 10,

                right: 10,

                top: 10,

                bottom: 10
            }
        },


        markers: {

            size: 0,

            hover: {

                size: 7
            }
        },


        tooltip: {

            theme: "light",

            shared: true,

            intersect: false,

            style: {

                fontSize: "14px"
            },

            y: {

                formatter:
                    function (
                        value
                    ) {

                        return (
                            Number(
                                value
                            ).toFixed(
                                2
                            ) +
                            " %"
                        )
                    }
            }
        },


        xaxis: {

            categories:
                chartData.map(
                    (item) =>
                        item.time
                ),

            tickAmount: 6,

            labels: {

                rotate: -45,

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

                show: false
            },

            axisTicks: {

                show: false
            },

            crosshairs: {

                show: true,

                stroke: {

                    color:
                        "#22c55e",

                    width: 1,

                    dashArray: 4
                }
            }
        },


        yaxis: {

            min: 0,

            decimalsInFloat: 2,

            labels: {

                formatter:
                    function (
                        value
                    ) {

                        return (
                            Number(
                                value
                            ).toFixed(
                                2
                            )
                        )
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
                    "CUF (%)",

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

            position: "top",

            horizontalAlign:
                "center",

            floating: false,

            fontSize:
                "14px",

            fontWeight:
                700,

            itemMargin: {

                horizontal: 15,

                vertical: 8
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

            name: "CUF %",

            data:
                chartData.map(
                    (item) =>
                        item.cuf
                )
        }
    ]


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 overflow-hidden transition-all duration-500">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">

                        Real-Time CUF Trend

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Daily CUF calculated from cumulative meter generation

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

export default CUFChart