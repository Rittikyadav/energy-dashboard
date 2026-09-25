import React from "react"
import {
    Users,
    Building2,
    Cpu,
    Activity,
    UserCheck,
    UserX,
    Server,
    ShieldCheck,
    Clock3,
    ArrowUpRight,
    CheckCircle2,
    AlertCircle
} from "lucide-react"

const SuperAdminOverview = () => {

    // UI MOCK DATA ONLY
    const stats = [
        {
            title: "Total Clients",
            value: "12",
            subtitle: "Registered clients",
            icon: Users,
            gradient: "from-green-500 to-emerald-500"
        },
        {
            title: "Active Clients",
            value: "10",
            subtitle: "Currently active",
            icon: UserCheck,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Total Plants",
            value: "28",
            subtitle: "Across all clients",
            icon: Building2,
            gradient: "from-purple-500 to-violet-500"
        },
        {
            title: "Total Devices",
            value: "146",
            subtitle: "Registered devices",
            icon: Cpu,
            gradient: "from-orange-500 to-amber-500"
        }
    ]

    const recentActivity = [
        {
            title: "New client registered",
            description: "A new client account was created",
            time: "10 minutes ago",
            icon: Users,
            status: "success"
        },
        {
            title: "Device assignment updated",
            description: "A device was assigned to a plant",
            time: "42 minutes ago",
            icon: Cpu,
            status: "success"
        },
        {
            title: "Client account disabled",
            description: "A client account was temporarily disabled",
            time: "2 hours ago",
            icon: UserX,
            status: "warning"
        },
        {
            title: "Device request received",
            description: "New device registration request pending",
            time: "3 hours ago",
            icon: Server,
            status: "warning"
        }
    ]

    const systemStatus = [
        {
            name: "Backend API",
            status: "Operational",
            icon: Activity
        },
        {
            name: "Database",
            status: "Operational",
            icon: Server
        },
        {
            name: "Authentication",
            status: "Operational",
            icon: ShieldCheck
        }
    ]

    return (
        <div className="space-y-6">

            {/* =====================================================
                WELCOME HEADER
            ===================================================== */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-7 text-white shadow-xl">

                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">

                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <ShieldCheck size={20} />
                            <span className="text-sm font-semibold uppercase tracking-wider text-green-100">
                                Super Admin Control Center
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                            System Overview
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-green-50 md:text-base">
                            Manage clients, plants, device assignments and
                            system access from one central administration panel.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                            <Activity size={23} />
                        </div>

                        <div>
                            <p className="text-xs text-green-100">
                                System Status
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-300" />
                                <span className="font-bold">
                                    All Systems Operational
                                </span>
                            </div>
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
                            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg transition duration-300 group-hover:scale-110`}
                                >
                                    <Icon size={22} />
                                </div>

                            </div>

                            <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-green-600">
                                <ArrowUpRight size={14} />
                                System data
                            </div>

                        </div>
                    )
                })}

            </div>


            {/* =====================================================
                MAIN GRID
            ===================================================== */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* =================================================
                    RECENT ACTIVITY
                ================================================= */}
                <div className="xl:col-span-2 rounded-3xl border border-gray-100 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Recent Activity
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Latest administrative actions
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                            <Clock3 size={19} />
                        </div>

                    </div>

                    <div className="divide-y divide-gray-100">

                        {recentActivity.map((activity, index) => {

                            const Icon = activity.icon

                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 px-6 py-5 transition hover:bg-gray-50"
                                >

                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                            activity.status === "success"
                                                ? "bg-green-50 text-green-600"
                                                : "bg-orange-50 text-orange-600"
                                        }`}
                                    >
                                        <Icon size={19} />
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <h3 className="truncate text-sm font-bold text-gray-900">
                                            {activity.title}
                                        </h3>

                                        <p className="mt-1 truncate text-xs text-gray-500">
                                            {activity.description}
                                        </p>

                                    </div>

                                    <div className="hidden text-right sm:block">

                                        <p className="text-xs font-medium text-gray-400">
                                            {activity.time}
                                        </p>

                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </div>


                {/* =================================================
                    SYSTEM STATUS
                ================================================= */}
                <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">

                    <div className="border-b border-gray-100 px-6 py-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                <Activity size={19} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    System Health
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Platform services
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="space-y-3 p-5">

                        {systemStatus.map((service) => {

                            const Icon = service.icon

                            return (
                                <div
                                    key={service.name}
                                    className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm">
                                            <Icon size={17} />
                                        </div>

                                        <span className="text-sm font-semibold text-gray-700">
                                            {service.name}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <CheckCircle2
                                            size={16}
                                            className="text-green-500"
                                        />

                                        <span className="text-xs font-bold text-green-600">
                                            {service.status}
                                        </span>

                                    </div>

                                </div>
                            )
                        })}

                        <div className="mt-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-5">

                            <div className="flex items-start gap-3">

                                <AlertCircle
                                    size={19}
                                    className="mt-0.5 shrink-0 text-green-600"
                                />

                                <div>
                                    <p className="text-sm font-bold text-green-800">
                                        Administration Ready
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-green-700">
                                        Client and device management services
                                        are available from the administration
                                        panel.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>


            {/* =====================================================
                ADMINISTRATIVE SCOPE
            ===================================================== */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="mb-5">

                    <h2 className="text-lg font-bold text-gray-900">
                        Super Admin Responsibilities
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Centralized administration capabilities
                    </p>

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-green-200 hover:bg-green-50/50">

                        <Users className="mb-3 text-green-600" size={22} />

                        <h3 className="font-bold text-gray-900">
                            Client Management
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Create and manage client accounts and their
                            access status.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-green-200 hover:bg-green-50/50">

                        <Building2 className="mb-3 text-green-600" size={22} />

                        <h3 className="font-bold text-gray-900">
                            Plant Administration
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Monitor client plants and maintain their
                            administrative assignments.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-green-200 hover:bg-green-50/50">

                        <Cpu className="mb-3 text-green-600" size={22} />

                        <h3 className="font-bold text-gray-900">
                            Device Assignments
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Register devices and assign them to the
                            appropriate client and plant.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default SuperAdminOverview
