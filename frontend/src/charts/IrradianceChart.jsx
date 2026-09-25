import Chart from "react-apexcharts"


function IrradianceChart({
    irradiance = 0
}) {

    // ============================================================
    // SOLAR IRRADIATION REFERENCE
    //
    // Example:
    //
    // August DNI = 123.700
    // August days = 31
    //
    // ASI = 123.700 / 31
    //     = 3.99 kWh/m²/day
    // ============================================================

    const irradiation =
        Number.parseFloat(
            irradiance
        ) || 0


    // ============================================================
    // CHART DATA
    //
    // This is intentionally ONE daily reference value.
    //
    // We do NOT create fake timestamps because there is no
    // physical irradiance sensor providing hourly W/m² readings.
    // ============================================================

    const chartSeries = [

        {

            name:
                "Solar Irradiation Reference",

            data: [
                irradiation
            ]

        }

    ]


    // ============================================================
    // CHART OPTIONS
    // ============================================================

    const chartOptions = {

        chart: {

            id:
                "irradiation-reference-chart",

            type:
                "area",

            height:
                360,

            background:
                "#ffffff",

            toolbar: {

                show: true,

                tools: {

                    download: true,

                    selection: false,

                    zoom: false,

                    zoomin: false,

                    zoomout: false,

                    pan: false,

                    reset: false

                }

            },

            animations: {

                enabled: true,

                easing:
                    "easeinout",

                speed:
                    1000

            }

        },


        theme: {

            mode:
                "light"

        },


        colors: [

            "#f59e0b"

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
                    0.5,

                opacityFrom:
                    0.45,

                opacityTo:
                    0.03,

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
                "round",

            colors: [

                "#f59e0b"

            ]

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
                    10,

                right:
                    10,

                top:
                    20,

                bottom:
                    10

            }

        },


        markers: {

            size:
                8,

            colors: [

                "#f59e0b"

            ],

            strokeColors:
                "#ffffff",

            strokeWidth:
                3,

            hover: {

                size:
                    10

            }

        },


        tooltip: {

            theme:
                "light",

            shared:
                false,

            intersect:
                true,

            style: {

                fontSize:
                    "14px"

            },

            y: {

                formatter:
                    function (value) {

                        return (

                            Number(
                                value
                            ).toFixed(2)

                            +

                            " kWh/m²/day"

                        )

                    }

            }

        },


        xaxis: {

            categories: [

                "Daily Reference"

            ],

            labels: {

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

            }

        },


        yaxis: {

            min:
                0,

            forceNiceScale:
                true,

            decimalsInFloat:
                2,

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
                    "Solar Irradiation (kWh/m²/day)",

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
    // UI
    // ============================================================

    return (

        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 overflow-hidden transition-all duration-500">


            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="flex items-center justify-between mb-8">


                <div>

                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">

                        Solar Irradiation Reference

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Daily solar resource value used for PR analysis

                    </p>

                </div>


                {/* REFERENCE BADGE */}

                <div className="flex items-center gap-3 bg-orange-100 px-5 py-2 rounded-full shadow-md">

                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>

                    <span className="text-orange-700 font-bold text-sm tracking-wide">

                        REFERENCE

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


export default IrradianceChart