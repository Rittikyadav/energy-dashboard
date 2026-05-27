import Chart from "react-apexcharts"

function PowerTrendChart({ trendData }) {

    // POWER DATA

    const powerData = trendData.map((item) =>

        parseFloat(item.total_kw || 0)

    )

    // TIME DATA

    const timeData = trendData.map(

        (item) =>

            `${item.loghh}:${item.logmi}`

    )

    // CHART OPTIONS

    const chartOptions = {

        chart: {

            id: "power-trend",

            type: "area",

            height: 380,

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

                speed: 1000,

                animateGradually: {

                    enabled: true,

                    delay: 80

                },

                dynamicAnimation: {

                    enabled: true,

                    speed: 800

                }

            }

        },

        theme: {

            mode: "light"

        },

        colors: ["#16a34a"],

        fill: {

            type: "gradient",

            gradient: {

                shade: "light",

                type: "vertical",

                shadeIntensity: 0.5,

                opacityFrom: 0.55,

                opacityTo: 0.05,

                stops: [0, 100]

            }

        },

        stroke: {

            curve: "smooth",

            width: 5,

            lineCap: "round",

            colors: ["#16a34a"]

        },

        dataLabels: {

            enabled: false

        },

        grid: {

            borderColor: "#e5e7eb",

            strokeDashArray: 6,

            padding: {

                left: 20,

                right: 20,

                top: 10,

                bottom: 10

            }

        },

        markers: {

            size: 0,

            strokeWidth: 0,

            hover: {

                size: 8

            }

        },

        tooltip: {

            theme: "light",

            shared: true,

            intersect: false,

            style: {

                fontSize: "14px"

            },

            x: {

                show: true

            },

            y: {

                formatter: function (value) {

                    return value.toFixed(2) + " kW"

                }

            }

        },

        xaxis: {

            categories: timeData,

            tickAmount: 10,

            labels: {

                rotate: -45,

                style: {

                    colors: "#64748b",

                    fontSize: "12px",

                    fontWeight: 600

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

                    color: "#16a34a",

                    width: 1,

                    dashArray: 4

                }

            }

        },

        yaxis: {

            decimalsInFloat: 1,

            labels: {

                formatter: function (value) {

                    return value.toFixed(1)

                },

                style: {

                    colors: "#64748b",

                    fontSize: "12px",

                    fontWeight: 600

                }

            }

        },

        legend: {

            show: false

        }

    }

    // SERIES

    const chartSeries = [

        {

            name: "Power Output",

            data: powerData

        }

    ]

    return (

        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 overflow-hidden transition-all duration-500">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">

                        Real-Time Power Trend

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Interactive live solar power analytics

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

                options={chartOptions}

                series={chartSeries}

                type="area"

                height={400}

            />

        </div>

    )
}

export default PowerTrendChart