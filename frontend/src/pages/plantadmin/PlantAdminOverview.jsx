import React from "react"

import {
    Building2,
    Cpu,
    Users,
    Activity,
    Zap,
    CheckCircle2,
    AlertTriangle,
    Radio,
    ShieldCheck,
    Clock3
} from "lucide-react"

const PlantAdminOverview = () => {

    // UI MOCK DATA ONLY

    const stats = [
        {
            title: "Assigned Plants",
            value: "1",
            subtitle: "Under your control",
            icon: Building2,
            gradient: "from-green-500 to-emerald-500"
        },
        {
            title: "Total Devices",
            value: "8",
            subtitle: "Devices in plant",
            icon: Cpu,
            gradient: "from-blue-500 to-indigo-500"
        },
        {
            title: "Active Users",
            value: "12",
            subtitle: "Users with access",
            icon: Users,
            gradient: "from-purple-500 to-violet-500"
        },
        {
            title: "Online Devices",
            value: "8",
            subtitle: "Currently connected",
            icon: Radio,
            gradient: "from-orange-500 to-amber-500"
        }
    ]

    const devices = [
        {
            name: "Inverter Monitor 01",
            id: "DEV-PLB-001",
            type: "Solar Inverter",
            status: "Online",
            lastSeen: "Just now"
        },
        {
            name: "Weather Station 01",
            id: "DEV-PLB-002",
            type: "Weather Station",
            status: "Online",
            lastSeen: "2 min ago"
        },
        {
            name: "Energy Meter 01",
            id: "DEV-PLB-003",
            type: "Energy Meter",
            status: "Online",
            lastSeen: "1 min ago"
        },
        {
            name: "Irradiance Sensor 01",
            id: "DEV-PLB-004",
            type: "Irradiance Sensor",
            status: "Attention",
            lastSeen: "12 min ago"
        }
    ]

    const activities = [
        {
            title: "New device request created",
            description: "Plant Admin requested SCADA Gateway",
            time: "18 minutes ago",
            icon: Cpu
        },
        {
            title: "User access updated",
            description: "Dashboard authority granted to User 08",
            time: "1 hour ago",
            icon: Users
        },
        {
            title: "Device connection restored",
            description: "DEV-PLB-003 is back online",
            time: "2 hours ago",
            icon: CheckCircle2
        },
        {
            title: "Device warning detected",
            description: "Irradiance Sensor 01 requires attention",
            time: "3 hours ago",
            icon: AlertTriangle
        }
    ]

    return (
        <div className="space-y-6">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="rounded-3xl bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 p-6 text-white shadow-xl">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <div className="mb-3 flex items-center gap-2">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                                <ShieldCheck size={18} />
                            </div>

                            <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                                Plant Administration
                            </span>

                        </div>

                        <h1 className="text-2xl font-bold">
                            Palash Blossom Resort
                        </h1>

                        <p className="mt-1 text-sm text-white/80">
                            Plant operations, users and device management
                        </p>

                    </div>


                    <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">

                        <p className="text-xs font-medium text-white/70">
                            Plant Status
                        </p>

                        <div className="mt-2 flex items-center gap-2">

                            <span className="h-2.5 w-2.5 rounded-full bg-white" />

                            <span className="font-bold">
                                Operational
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                STATS
            ===================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {

                    const Icon = stat.icon

                    return (
                        <div
                            key={stat.title}
                            className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-xs font-semibold text-gray-500">
                                        {stat.title}
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        {stat.subtitle}
                                    </p>

                                </div>

                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-md`}
                                >
                                    <Icon size={20} />
                                </div>

                            </div>

                        </div>
                    )

                })}

            </div>


            {/* =====================================================
                PLANT INFORMATION
            ===================================================== */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">

                    <div className="mb-5 flex items-center justify-between">

                        <div>

                            <h2 className="text-lg font-bold text-gray-900">
                                Plant Information
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Current plant configuration
                            </p>

                        </div>

                        <Building2
                            size={21}
                            className="text-green-500"
                        />

                    </div>


                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="rounded-2xl bg-gray-50 p-4">

                            <p className="text-xs text-gray-400">
                                Location
                            </p>

                            <p className="mt-2 font-bold text-gray-800">
                                West Bengal
                            </p>

                        </div>

                        <div className="rounded-2xl bg-gray-50 p-4">

                            <p className="text-xs text-gray-400">
                                Capacity
                            </p>

                            <p className="mt-2 font-bold text-gray-800">
                                5 MW
                            </p>

                        </div>

                        <div className="rounded-2xl bg-gray-50 p-4">

                            <p className="text-xs text-gray-400">
                                Devices
                            </p>

                            <p className="mt-2 font-bold text-gray-800">
                                8 Devices
                            </p>

                        </div>

                        <div className="rounded-2xl bg-gray-50 p-4">

                            <p className="text-xs text-gray-400">
                                Current Output
                            </p>

                            <p className="mt-2 font-bold text-green-600">
                                3.84 MW
                            </p>

                        </div>

                    </div>

                </div>


                {/* SYSTEM HEALTH */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                            <Activity size={19} />
                        </div>

                        <div>

                            <h2 className="font-bold text-gray-900">
                                System Health
                            </h2>

                            <p className="text-xs text-gray-500">
                                Plant connectivity
                            </p>

                        </div>

                    </div>


                    <div className="space-y-4">

                        <div>

                            <div className="mb-2 flex justify-between text-xs">

                                <span className="font-semibold text-gray-600">
                                    Device Connectivity
                                </span>

                                <span className="font-bold text-green-600">
                                    100%
                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                                <div className="h-full w-full rounded-full bg-green-500" />

                            </div>

                        </div>


                        <div>

                            <div className="mb-2 flex justify-between text-xs">

                                <span className="font-semibold text-gray-600">
                                    MQTT Connection
                                </span>

                                <span className="font-bold text-green-600">
                                    Healthy
                                </span>

                            </div>

                            <div className="flex items-center gap-2 text-xs text-green-600">

                                <CheckCircle2 size={15} />

                                Connected

                            </div>

                        </div>


                        <div>

                            <div className="mb-2 flex justify-between text-xs">

                                <span className="font-semibold text-gray-600">
                                    Backend Connection
                                </span>

                                <span className="font-bold text-green-600">
                                    Healthy
                                </span>

                            </div>

                            <div className="flex items-center gap-2 text-xs text-green-600">

                                <CheckCircle2 size={15} />

                                Connected

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                DEVICES + ACTIVITY
            ===================================================== */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* DEVICES */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center justify-between">

                        <div>

                            <h2 className="text-lg font-bold text-gray-900">
                                Device Status
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Latest plant device status
                            </p>

                        </div>

                        <Cpu
                            size={21}
                            className="text-blue-500"
                        />

                    </div>


                    <div className="space-y-3">

                        {devices.map((device) => (

                            <div
                                key={device.id}
                                className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Cpu size={17} />
                                    </div>

                                    <div>

                                        <p className="text-sm font-bold text-gray-800">
                                            {device.name}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            {device.id} · {device.type}
                                        </p>

                                    </div>

                                </div>


                                <div className="text-right">

                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                            device.status === "Online"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-orange-50 text-orange-700"
                                        }`}
                                    >

                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                                device.status === "Online"
                                                    ? "bg-green-500"
                                                    : "bg-orange-500"
                                            }`}
                                        />

                                        {device.status}

                                    </span>

                                    <p className="mt-1 text-[10px] text-gray-400">
                                        {device.lastSeen}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>


                {/* ACTIVITY */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <Clock3 size={19} />
                        </div>

                        <div>

                            <h2 className="text-lg font-bold text-gray-900">
                                Recent Activity
                            </h2>

                            <p className="text-xs text-gray-500">
                                Latest plant administration events
                            </p>

                        </div>

                    </div>


                    <div className="space-y-5">

                        {activities.map((activity, index) => {

                            const Icon = activity.icon

                            return (
                                <div
                                    key={index}
                                    className="flex gap-3"
                                >

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                                        <Icon size={16} />
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-sm font-bold text-gray-800">
                                            {activity.title}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {activity.description}
                                        </p>

                                        <p className="mt-1 text-[10px] text-gray-400">
                                            {activity.time}
                                        </p>

                                    </div>

                                </div>
                            )

                        })}

                    </div>

                </div>

            </div>


            {/* =====================================================
                ENERGY SUMMARY
            ===================================================== */}

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                            <Zap size={22} />
                        </div>

                        <div>

                            <h2 className="font-bold text-gray-900">
                                Today's Energy Summary
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Live plant generation overview
                            </p>

                        </div>

                    </div>


                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">

                        <div>

                            <p className="text-xs text-gray-400">
                                Generation
                            </p>

                            <p className="mt-1 font-bold text-gray-900">
                                18.42 MWh
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-400">
                                PR
                            </p>

                            <p className="mt-1 font-bold text-green-600">
                                82.6%
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-400">
                                CUF
                            </p>

                            <p className="mt-1 font-bold text-blue-600">
                                15.35%
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-400">
                                Peak Output
                            </p>

                            <p className="mt-1 font-bold text-gray-900">
                                4.71 MW
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default PlantAdminOverview

