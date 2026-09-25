import React from "react"
import {
    Building2,
    Cpu,
    Users,
    Activity,
    ShieldCheck,
    CheckCircle2,
    AlertTriangle,
    Zap,
    ArrowUpRight,
    Clock3
} from "lucide-react"

const ClientAdminOverview = () => {

    // UI MOCK DATA ONLY
    const stats = [
        {
            title: "My Plants",
            value: "5",
            subtitle: "Assigned plants",
            icon: Building2,
            gradient: "from-green-500 to-emerald-500"
        },
        {
            title: "Total Devices",
            value: "32",
            subtitle: "Across all plants",
            icon: Cpu,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Plant Admins",
            value: "7",
            subtitle: "Active administrators",
            icon: Users,
            gradient: "from-purple-500 to-violet-500"
        },
        {
            title: "Active Devices",
            value: "29",
            subtitle: "Currently online",
            icon: Activity,
            gradient: "from-orange-500 to-amber-500"
        }
    ]

    const plants = [
        {
            name: "Palash Blossom Resort",
            location: "West Bengal",
            devices: 8,
            activeDevices: 8,
            status: "Operational"
        },
        {
            name: "Kolkata Solar Plant",
            location: "Kolkata",
            devices: 7,
            activeDevices: 6,
            status: "Attention"
        },
        {
            name: "Durgapur Solar Plant",
            location: "Durgapur",
            devices: 6,
            activeDevices: 6,
            status: "Operational"
        },
        {
            name: "Siliguri Solar Farm",
            location: "Siliguri",
            devices: 5,
            activeDevices: 4,
            status: "Attention"
        }
    ]

    const activities = [
        {
            title: "Device request received",
            description: "New device registration request from plant admin",
            time: "15 minutes ago",
            icon: Cpu
        },
        {
            title: "Plant Admin created",
            description: "New administrator account created",
            time: "1 hour ago",
            icon: Users
        },
        {
            title: "Device connected",
            description: "SCADA-PLANT-001 is now online",
            time: "2 hours ago",
            icon: Activity
        },
        {
            title: "Plant status updated",
            description: "Kolkata Solar Plant requires attention",
            time: "3 hours ago",
            icon: AlertTriangle
        }
    ]

    return (
        <div className="space-y-6">

            {/* =====================================================
                HEADER
            ===================================================== */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-7 text-white shadow-xl">

                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

                <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">

                    <div>

                        <div className="mb-2 flex items-center gap-2">

                            <ShieldCheck size={20} />

                            <span className="text-sm font-semibold uppercase tracking-wider text-green-100">
                                Client Administration
                            </span>

                        </div>

                        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                            Client Overview
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-green-50 md:text-base">
                            Monitor your plants, devices and plant
                            administrators from one central dashboard.
                        </p>

                    </div>


                    <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md">

                        <p className="text-xs text-green-100">
                            Client Status
                        </p>

                        <div className="mt-1 flex items-center gap-2">

                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-300" />

                            <span className="font-bold">
                                Active
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                STAT CARDS
            ===================================================== */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {

                    const Icon = stat.icon

                    return (
                        <div
                            key={stat.title}
                            className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm font-semibold text-gray-500">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400">
                                        {stat.subtitle}
                                    </p>

                                </div>

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg transition group-hover:scale-110`}
                                >
                                    <Icon size={22} />
                                </div>

                            </div>

                            <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-green-600">
                                <ArrowUpRight size={14} />
                                Client scope
                            </div>

                        </div>
                    )
                })}

            </div>


            {/* =====================================================
                PLANT STATUS + ACTIVITY
            ===================================================== */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* =================================================
                    PLANTS
                ================================================= */}
                <div className="xl:col-span-2 rounded-3xl border border-gray-100 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

                        <div>

                            <h2 className="text-lg font-bold text-gray-900">
                                Plant Status
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Current status of assigned plants
                            </p>

                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                            <Building2 size={19} />
                        </div>

                    </div>


                    <div className="divide-y divide-gray-100">

                        {plants.map((plant) => {

                            const healthy =
                                plant.status === "Operational"

                            return (
                                <div
                                    key={plant.name}
                                    className="flex flex-col gap-4 px-6 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-center"
                                >

                                    <div className="flex min-w-0 flex-1 items-center gap-4">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                                            <Building2 size={20} />
                                        </div>

                                        <div className="min-w-0">

                                            <h3 className="truncate text-sm font-bold text-gray-900">
                                                {plant.name}
                                            </h3>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {plant.location}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="flex items-center gap-6">

                                        <div>

                                            <p className="text-xs text-gray-400">
                                                Devices
                                            </p>

                                            <p className="mt-1 text-sm font-bold text-gray-800">
                                                {plant.activeDevices}/{plant.devices}
                                            </p>

                                        </div>


                                        <div>

                                            {healthy ? (

                                                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">

                                                    <CheckCircle2 size={14} />

                                                    Operational

                                                </span>

                                            ) : (

                                                <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">

                                                    <AlertTriangle size={14} />

                                                    Attention

                                                </span>

                                            )}

                                        </div>

                                    </div>

                                </div>
                            )
                        })}

                    </div>

                </div>


                {/* =================================================
                    RECENT ACTIVITY
                ================================================= */}
                <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">

                    <div className="border-b border-gray-100 px-6 py-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Clock3 size={19} />
                            </div>

                            <div>

                                <h2 className="text-lg font-bold text-gray-900">
                                    Recent Activity
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Latest updates
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="divide-y divide-gray-100">

                        {activities.map((activity, index) => {

                            const Icon = activity.icon

                            return (
                                <div
                                    key={index}
                                    className="flex gap-3 px-5 py-5 transition hover:bg-gray-50"
                                >

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                                        <Icon size={17} />
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-sm font-bold text-gray-800">
                                            {activity.title}
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            {activity.description}
                                        </p>

                                        <p className="mt-2 text-[11px] font-medium text-gray-400">
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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                            <Zap size={21} />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-500">
                                Today's Generation
                            </p>

                            <p className="text-2xl font-bold text-gray-900">
                                18.42 MWh
                            </p>
                        </div>

                    </div>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                            <Activity size={21} />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-500">
                                Device Availability
                            </p>

                            <p className="text-2xl font-bold text-gray-900">
                                90.6%
                            </p>
                        </div>

                    </div>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                            <Users size={21} />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-500">
                                Plant Administrators
                            </p>

                            <p className="text-2xl font-bold text-gray-900">
                                7 Active
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ClientAdminOverview

