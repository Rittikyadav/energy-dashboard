import React, { useState } from "react"

import {
    Cpu,
    Search,
    Eye,
    Settings,
    Activity,
    Wifi,
    Server,
    Database,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    ShieldCheck,
    Clock3,
    Gauge,
    Zap
} from "lucide-react"


const UserAdminDevices = () => {

    // ==========================================
    // UI MOCK DATA ONLY
    // ==========================================

    const [devices, setDevices] = useState([
        {
            id: 1,
            deviceId: "DEV-PLB-001",
            name: "Inverter Monitor 01",
            type: "Solar Inverter",
            protocol: "MQTT",
            connection: "Connected",
            backend: "Connected",
            status: "Online",
            power: "4.82 MW",
            users: 5,
            lastData: "12 sec ago"
        },
        {
            id: 2,
            deviceId: "DEV-PLB-002",
            name: "Inverter Monitor 02",
            type: "Solar Inverter",
            protocol: "MQTT",
            connection: "Connected",
            backend: "Connected",
            status: "Online",
            power: "4.67 MW",
            users: 4,
            lastData: "18 sec ago"
        },
        {
            id: 3,
            deviceId: "DEV-PLB-003",
            name: "Weather Station",
            type: "Weather Sensor",
            protocol: "Modbus TCP",
            connection: "Connected",
            backend: "Connected",
            status: "Online",
            power: "N/A",
            users: 8,
            lastData: "8 sec ago"
        },
        {
            id: 4,
            deviceId: "DEV-PLB-004",
            name: "Energy Meter 01",
            type: "Energy Meter",
            protocol: "Modbus TCP",
            connection: "Connected",
            backend: "Attention",
            status: "Attention",
            power: "3.91 MW",
            users: 3,
            lastData: "2 min ago"
        },
        {
            id: 5,
            deviceId: "DEV-PLB-005",
            name: "Inverter Monitor 03",
            type: "Solar Inverter",
            protocol: "MQTT",
            connection: "Connected",
            backend: "Connected",
            status: "Online",
            power: "4.51 MW",
            users: 6,
            lastData: "21 sec ago"
        },
        {
            id: 6,
            deviceId: "DEV-PLB-006",
            name: "Irradiance Sensor",
            type: "Weather Sensor",
            protocol: "MQTT",
            connection: "Disconnected",
            backend: "Disconnected",
            status: "Offline",
            power: "N/A",
            users: 2,
            lastData: "26 min ago"
        }
    ])


    const [search, setSearch] = useState("")


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredDevices = devices.filter((device) => {

        const query = search.toLowerCase()

        return (
            device.deviceId.toLowerCase().includes(query) ||
            device.name.toLowerCase().includes(query) ||
            device.type.toLowerCase().includes(query) ||
            device.protocol.toLowerCase().includes(query)
        )
    })


    // ==========================================
    // COUNTS
    // ==========================================

    const totalDevices = devices.length

    const onlineDevices =
        devices.filter(
            (device) => device.status === "Online"
        ).length

    const attentionDevices =
        devices.filter(
            (device) => device.status === "Attention"
        ).length

    const offlineDevices =
        devices.filter(
            (device) => device.status === "Offline"
        ).length


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="space-y-8">


            {/* HEADER */}

            <div>

                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                    <Cpu size={16} />
                    Device Management
                </div>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900">
                    Assigned Devices
                </h1>

                <p className="mt-2 text-gray-500">
                    View assigned devices, connection status and monitoring access.
                </p>

            </div>


            {/* SUMMARY */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


                {/* TOTAL */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-semibold text-gray-400">
                                Total Devices
                            </p>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {totalDevices}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Assigned to plant
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <Cpu size={22} />
                        </div>

                    </div>

                </div>


                {/* ONLINE */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-semibold text-gray-400">
                                Online
                            </p>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {onlineDevices}
                            </p>

                            <p className="mt-1 text-xs text-green-600">
                                Data flowing normally
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                            <Wifi size={22} />
                        </div>

                    </div>

                </div>


                {/* ATTENTION */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-semibold text-gray-400">
                                Attention
                            </p>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {attentionDevices}
                            </p>

                            <p className="mt-1 text-xs text-orange-600">
                                Needs review
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                            <AlertTriangle size={22} />
                        </div>

                    </div>

                </div>


                {/* OFFLINE */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-semibold text-gray-400">
                                Offline
                            </p>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {offlineDevices}
                            </p>

                            <p className="mt-1 text-xs text-red-600">
                                Connection unavailable
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <XCircle size={22} />
                        </div>

                    </div>

                </div>

            </div>


            {/* SYSTEM CONNECTION SUMMARY */}

            <div className="grid gap-5 md:grid-cols-3">


                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                            <Wifi size={19} />
                        </div>

                        <div>

                            <p className="font-black text-gray-900">
                                MQTT
                            </p>

                            <p className="text-xs text-gray-400">
                                Device communication
                            </p>

                        </div>

                    </div>

                    <div className="mt-5 flex items-center gap-2">

                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                        <span className="text-sm font-bold text-green-600">
                            Connected
                        </span>

                    </div>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <Server size={19} />
                        </div>

                        <div>

                            <p className="font-black text-gray-900">
                                Backend
                            </p>

                            <p className="text-xs text-gray-400">
                                Data service
                            </p>

                        </div>

                    </div>

                    <div className="mt-5 flex items-center gap-2">

                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                        <span className="text-sm font-bold text-green-600">
                            Operational
                        </span>

                    </div>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Database size={19} />
                        </div>

                        <div>

                            <p className="font-black text-gray-900">
                                Data Storage
                            </p>

                            <p className="text-xs text-gray-400">
                                Monitoring database
                            </p>

                        </div>

                    </div>

                    <div className="mt-5 flex items-center gap-2">

                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                        <span className="text-sm font-bold text-green-600">
                            Healthy
                        </span>

                    </div>

                </div>

            </div>


            {/* DEVICE TABLE */}

            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">


                {/* HEADER */}

                <div className="border-b border-gray-100 p-6">

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div>

                            <h2 className="text-lg font-black text-gray-900">
                                Device Inventory
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Devices available within your management scope
                            </p>

                        </div>


                        <div className="relative w-full lg:w-80">

                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search devices..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-50"
                            />

                        </div>

                    </div>

                </div>


                {/* TABLE */}

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1100px]">

                        <thead>

                            <tr className="border-b border-gray-100 bg-gray-50/70">

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Device
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Protocol
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Connection
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Backend
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Users
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Last Data
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-gray-100">

                            {filteredDevices.map((device) => (

                                <tr
                                    key={device.id}
                                    className="transition hover:bg-gray-50/70"
                                >


                                    {/* DEVICE */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                <Cpu size={19} />
                                            </div>

                                            <div>

                                                <p className="font-bold text-gray-900">
                                                    {device.name}
                                                </p>

                                                <p className="mt-1 font-mono text-xs text-gray-400">
                                                    {device.deviceId}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    {device.type}
                                                </p>

                                            </div>

                                        </div>

                                    </td>


                                    {/* PROTOCOL */}

                                    <td className="px-6 py-5">

                                        <span className="rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">
                                            {device.protocol}
                                        </span>

                                    </td>


                                    {/* CONNECTION */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2">

                                            <span
                                                className={`h-2.5 w-2.5 rounded-full ${
                                                    device.connection === "Connected"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            />

                                            <span
                                                className={`text-sm font-bold ${
                                                    device.connection === "Connected"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {device.connection}
                                            </span>

                                        </div>

                                    </td>


                                    {/* BACKEND */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2">

                                            <span
                                                className={`h-2.5 w-2.5 rounded-full ${
                                                    device.backend === "Connected"
                                                        ? "bg-green-500"
                                                        : "bg-orange-500"
                                                }`}
                                            />

                                            <span
                                                className={`text-sm font-bold ${
                                                    device.backend === "Connected"
                                                        ? "text-green-600"
                                                        : "text-orange-600"
                                                }`}
                                            >
                                                {device.backend}
                                            </span>

                                        </div>

                                    </td>


                                    {/* USERS */}

                                    <td className="px-6 py-5">

                                        <span className="font-bold text-gray-800">
                                            {device.users}
                                        </span>

                                    </td>


                                    {/* LAST DATA */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2 text-sm text-gray-500">

                                            <Clock3 size={15} />

                                            {device.lastData}

                                        </div>

                                    </td>


                                    {/* STATUS */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2">

                                            <span
                                                className={`h-2.5 w-2.5 rounded-full ${
                                                    device.status === "Online"
                                                        ? "bg-green-500"
                                                        : device.status === "Attention"
                                                            ? "bg-orange-500"
                                                            : "bg-red-500"
                                                }`}
                                            />

                                            <span
                                                className={`text-sm font-bold ${
                                                    device.status === "Online"
                                                        ? "text-green-600"
                                                        : device.status === "Attention"
                                                            ? "text-orange-600"
                                                            : "text-red-600"
                                                }`}
                                            >
                                                {device.status}
                                            </span>

                                        </div>

                                    </td>


                                    {/* ACTIONS */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center justify-end gap-2">

                                            <button
                                                type="button"
                                                title="View device"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Eye size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                title="Device settings"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition hover:bg-purple-50 hover:text-purple-600"
                                            >
                                                <Settings size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                title="Device activity"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition hover:bg-green-50 hover:text-green-600"
                                            >
                                                <Activity size={16} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {/* EMPTY STATE */}

                {filteredDevices.length === 0 && (

                    <div className="p-12 text-center">

                        <Cpu
                            size={40}
                            className="mx-auto text-gray-300"
                        />

                        <p className="mt-4 font-bold text-gray-700">
                            No devices found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Try changing your search.
                        </p>

                    </div>

                )}

            </div>


            {/* PERMISSION NOTICE */}

            <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-600"
                />

                <p className="text-xs leading-5 text-blue-700">
                    Device configuration and provisioning are controlled by the Plant Admin. User Admin can view assigned devices, monitor connectivity and manage user access to available dashboards.
                </p>

            </div>


            {/* QUICK PERFORMANCE */}

            <div className="grid gap-5 sm:grid-cols-3">

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <Gauge
                            size={20}
                            className="text-blue-600"
                        />

                        <p className="font-bold text-gray-700">
                            Plant PR
                        </p>

                    </div>

                    <p className="mt-4 text-3xl font-black text-gray-900">
                        82.4%
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                        Healthy performance
                    </p>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <Zap
                            size={20}
                            className="text-yellow-500"
                        />

                        <p className="font-bold text-gray-700">
                            Current Generation
                        </p>

                    </div>

                    <p className="mt-4 text-3xl font-black text-gray-900">
                        4.82 MW
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Live plant output
                    </p>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <Activity
                            size={20}
                            className="text-green-600"
                        />

                        <p className="font-bold text-gray-700">
                            Data Flow
                        </p>

                    </div>

                    <p className="mt-4 text-3xl font-black text-gray-900">
                        98.7%
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                        Data availability
                    </p>

                </div>

            </div>

        </div>
    )
}

export default UserAdminDevices
