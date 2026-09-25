import React from "react"

import {
    Users,
    Cpu,
    Activity,
    Wifi,
    Server,
    CheckCircle2,
    AlertTriangle,
    Zap,
    Gauge,
    ShieldCheck
} from "lucide-react"


const UserAdminOverview = () => {

    const stats = [
        {
            title: "Assigned Devices",
            value: "8",
            subtitle: "Plant devices",
            icon: Cpu,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            title: "Active Users",
            value: "12",
            subtitle: "Users under management",
            icon: Users,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            title: "Online Devices",
            value: "7",
            subtitle: "Currently connected",
            icon: Wifi,
            iconBg: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            title: "Active Alerts",
            value: "1",
            subtitle: "Needs attention",
            icon: AlertTriangle,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-600"
        }
    ]


    const devices = [
        {
            id: "DEV-PLB-001",
            name: "Inverter Monitor 01",
            status: "Online",
            power: "4.82 MW"
        },
        {
            id: "DEV-PLB-002",
            name: "Inverter Monitor 02",
            status: "Online",
            power: "4.67 MW"
        },
        {
            id: "DEV-PLB-003",
            name: "Weather Station",
            status: "Online",
            power: "N/A"
        },
        {
            id: "DEV-PLB-004",
            name: "Energy Meter 01",
            status: "Attention",
            power: "3.91 MW"
        }
    ]


    return (

        <div className="space-y-8">


            {/* HEADER */}

            <div>

                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                    <ShieldCheck size={16} />
                    User Administration
                </div>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900">
                    User Admin Overview
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage users, device access and plant monitoring permissions.
                </p>

            </div>


            {/* STATS */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {

                    const Icon = stat.icon

                    return (

                        <div
                            key={stat.title}
                            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
                        >

                            <div className="flex items-start justify-between">

                                <div>
                                    <p className="text-sm font-semibold text-gray-400">
                                        {stat.title}
                                    </p>

                                    <p className="mt-3 text-3xl font-black text-gray-900">
                                        {stat.value}
                                    </p>

                                    <p className="mt-1 text-xs font-medium text-gray-400">
                                        {stat.subtitle}
                                    </p>
                                </div>

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.iconColor}`}
                                >
                                    <Icon size={22} />
                                </div>

                            </div>

                        </div>

                    )
                })}

            </div>


            {/* PLANT / ACCESS SUMMARY */}

            <div className="grid gap-6 lg:grid-cols-3">

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-lg font-black text-gray-900">
                                Assigned Plant
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Current operational scope
                            </p>
                        </div>

                        <div className="rounded-xl bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
                            Operational
                        </div>

                    </div>


                    <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-600 shadow-sm">
                                <Zap size={22} />
                            </div>

                            <div>

                                <h3 className="font-black text-gray-900">
                                    Palash Blossom Resort
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    West Bengal · 5 MW Solar Plant
                                </p>

                            </div>

                        </div>


                        <div className="mt-5 grid grid-cols-3 gap-3">

                            <div className="rounded-xl bg-white p-3">
                                <p className="text-xs text-gray-400">
                                    Devices
                                </p>
                                <p className="mt-1 text-lg font-black text-gray-900">
                                    8
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-3">
                                <p className="text-xs text-gray-400">
                                    Users
                                </p>
                                <p className="mt-1 text-lg font-black text-gray-900">
                                    12
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-3">
                                <p className="text-xs text-gray-400">
                                    Capacity
                                </p>
                                <p className="mt-1 text-lg font-black text-gray-900">
                                    5 MW
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ACCESS LEVEL */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                        <ShieldCheck size={21} />
                    </div>

                    <h2 className="mt-5 text-lg font-black text-gray-900">
                        Access Level
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        You can manage users and control dashboard access within your assigned plant.
                    </p>

                    <div className="mt-6 space-y-3">

                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                            <CheckCircle2
                                size={17}
                                className="text-green-500"
                            />
                            <span className="text-sm font-semibold text-gray-700">
                                Manage Users
                            </span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                            <CheckCircle2
                                size={17}
                                className="text-green-500"
                            />
                            <span className="text-sm font-semibold text-gray-700">
                                Assign Device Access
                            </span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                            <CheckCircle2
                                size={17}
                                className="text-green-500"
                            />
                            <span className="text-sm font-semibold text-gray-700">
                                View Device Status
                            </span>
                        </div>

                    </div>

                </div>

            </div>


            {/* DEVICE STATUS */}

            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">

                <div className="border-b border-gray-100 p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Activity size={19} />
                        </div>

                        <div>
                            <h2 className="font-black text-gray-900">
                                Device Status
                            </h2>

                            <p className="text-sm text-gray-400">
                                Quick view of assigned devices
                            </p>
                        </div>

                    </div>

                </div>


                <div className="divide-y divide-gray-100">

                    {devices.map((device) => (

                        <div
                            key={device.id}
                            className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                        >

                            <div className="flex items-center gap-4">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                                    <Cpu size={19} />
                                </div>

                                <div>

                                    <p className="font-bold text-gray-900">
                                        {device.name}
                                    </p>

                                    <p className="mt-1 text-xs font-mono text-gray-400">
                                        {device.id}
                                    </p>

                                </div>

                            </div>


                            <div className="flex items-center gap-8">

                                <div className="hidden sm:block">

                                    <p className="text-xs text-gray-400">
                                        Current Power
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-gray-800">
                                        {device.power}
                                    </p>

                                </div>


                                <div className="flex items-center gap-2">

                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${
                                            device.status === "Online"
                                                ? "bg-green-500"
                                                : "bg-orange-500"
                                        }`}
                                    />

                                    <span
                                        className={`text-sm font-bold ${
                                            device.status === "Online"
                                                ? "text-green-600"
                                                : "text-orange-600"
                                        }`}
                                    >
                                        {device.status}
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* QUICK METRICS */}

            <div className="grid gap-5 sm:grid-cols-3">

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <Gauge
                            size={20}
                            className="text-blue-600"
                        />

                        <p className="font-bold text-gray-700">
                            Performance Ratio
                        </p>

                    </div>

                    <p className="mt-4 text-3xl font-black text-gray-900">
                        82.4%
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                        +2.1% today
                    </p>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <Zap
                            size={20}
                            className="text-yellow-500"
                        />

                        <p className="font-bold text-gray-700">
                            Today's Generation
                        </p>

                    </div>

                    <p className="mt-4 text-3xl font-black text-gray-900">
                        18.7 MWh
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Plant total
                    </p>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <Server
                            size={20}
                            className="text-purple-600"
                        />

                        <p className="font-bold text-gray-700">
                            Backend
                        </p>

                    </div>

                    <div className="mt-4 flex items-center gap-2">

                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                        <span className="text-2xl font-black text-gray-900">
                            Connected
                        </span>

                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                        Data service operational
                    </p>

                </div>

            </div>

        </div>
    )
}

export default UserAdminOverview
