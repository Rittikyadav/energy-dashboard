import Chart from "react-apexcharts"

function VoltageChart({ trendData }) {

    // VOLTAGE DATA

    const voltageR = trendData.map((item) =>

        parseFloat(item.vr || 0)

    )

    const voltageY = trendData.map((item) =>

        parseFloat(item.vy || 0)

    )

    const voltageB = trendData.map((item) =>

        parseFloat(item.vb || 0)

    )

    // TIME DATA

    const timeData = trendData.map(

        (item) =>

            `${item.loghh}:${item.logmi}`

    )

    // CHART OPTIONS

    const chartOptions = {

        chart: {

            id: "voltage-chart",

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

                speed: 1200,

                animateGradually: {

                    enabled: true,

                    delay: 80

                },

                dynamicAnimation: {

                    enabled: true,

                    speed: 1000

                }

            }

        },

        theme: {

            mode: "light"

        },

        colors: [

            "#ef4444",

            "#eab308",

            "#3b82f6"

        ],

        fill: {

            type: "gradient",

            gradient: {

                shade: "light",

                type: "vertical",

                shadeIntensity: 0.4,

                opacityFrom: 0.30,

                opacityTo: 0.02,

                stops: [0, 100]

            }

        },

        stroke: {

            curve: "smooth",

            width: 4,

            lineCap: "round"

        },

        dataLabels: {

            enabled: false

        },

        grid: {

            borderColor: "#e5e7eb",

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

                formatter: function (value) {

                    return value.toFixed(2) + " V"

                }

            }

        },

        xaxis: {

            categories: timeData,

            tickAmount: 6,

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

                    color: "#22c55e",

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

            position: "top",

            horizontalAlign: "center",

            floating: false,

            fontSize: "14px",

            fontWeight: 700,

            itemMargin: {

                horizontal: 15,

                vertical: 8

            },

            labels: {

                colors: "#374151"

            }

        }

    }

    // CHART SERIES

    const chartSeries = [

        {

            name: "Voltage R",

            data: voltageR

        },

        {

            name: "Voltage Y",

            data: voltageY

        },

        {

            name: "Voltage B",

            data: voltageB

        }

    ]

    return (

        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 overflow-hidden transition-all duration-500">

            {/* HEADER */}

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

            {/* CHART */}

            <Chart

                options={chartOptions}

                series={chartSeries}

                type="area"

                height={360}

            />

        </div>

    )
}

export default VoltageChart