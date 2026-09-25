import React, { useState } from "react"

import {
    Cpu,
    Search,
    Plus,
    Radio,
    Wifi,
    Server,
    Database,
    Settings,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Eye,
    Send,
    MoreVertical,
    Activity,
    ShieldCheck,
    Clock3
} from "lucide-react"

const PlantAdminDevices = () => {

    // UI MOCK DATA ONLY

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
            lastSeen: "Just now"
        },
        {
            id: 2,
            deviceId: "DEV-PLB-002",
            name: "Weather Station 01",
            type: "Weather Station",
            protocol: "MQTT",
            connection: "Connected",
            backend: "Connected",
            status: "Online",
            lastSeen: "2 min ago"
        },
        {
            id: 3,
            deviceId: "DEV-PLB-003",
            name: "Energy Meter 01",
            type: "Energy Meter",
            protocol: "Modbus TCP",
            connection: "Connected",
            backend: "Connected",
            status: "Online",
            lastSeen: "1 min ago"
        },
        {
            id: 4,
            deviceId: "DEV-PLB-004",
            name: "Irradiance Sensor 01",
            type: "Irradiance Sensor",
            protocol: "MQTT",
            connection: "Warning",
            backend: "Connected",
            status: "Attention",
            lastSeen: "12 min ago"
        },
        {
            id: 5,
            deviceId: "DEV-PLB-005",
            name: "SCADA Gateway 01",
            type: "SCADA Gateway",
            protocol: "MQTT",
            connection: "Pending",
            backend: "Not Configured",
            status: "Pending",
            lastSeen: "Never"
        }
    ])

    const [search, setSearch] = useState("")

    const toggleDevice = (id) => {

        setDevices((current) =>
            current.map((device) =>
                device.id === id
                    ? {
                        ...device,
                        status:
                            device.status === "Online"
                                ? "Disabled"
                                : "Online"
                    }
                    : device
            )
        )
    }

    const filteredDevices = devices.filter((device) =>
        `${device.deviceId} ${device.name} ${device.type} ${device.protocol}`
            .toLowerCase()
            .includes(search.toLowerCase())
    )

    const totalDevices = devices.length

    const onlineDevices = devices.filter(
        (device) => device.status === "Online"
    ).length

    const attentionDevices = devices.filter(
        (device) => device.status === "Attention"
    ).length

    const pendingDevices = devices.filter(
        (device) => device.status === "Pending"
    ).length

    return (
        <div className="space-y-6">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="mb-2 flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Cpu size={18} />
                        </div>

                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            Technical Management
                        </span>

                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Plant Devices
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Configure devices, connections and backend
                        communication for this plant.
                    </p>

                </div>

                <button
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                    <Plus size={18} />
                    Add Device
                </button>

            </div>


            {/* =====================================================
                SUMMARY
            ===================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Total Devices
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {totalDevices}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Configured devices
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <Cpu size={21} />
                        </div>

                    </div>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Online
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {onlineDevices}
                            </p>

                            <p className="mt-1 text-xs text-green-600">
                                Connected devices
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                            <Radio size={21} />
                        </div>

                    </div>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Attention
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {attentionDevices}
                            </p>

                            <p className="mt-1 text-xs text-orange-600">
                                Requires checking
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                            <AlertTriangle size={21} />
                        </div>

                    </div>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Pending Setup
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {pendingDevices}
                            </p>

                            <p className="mt-1 text-xs text-purple-600">
                                Configuration required
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                            <Settings size={21} />
                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                CONNECTION STATUS
            ===================================================== */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* MQTT */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                <Wifi size={19} />
                            </div>

                            <div>

                                <h2 className="font-bold text-gray-900">
                                    MQTT
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Device messaging
                                </p>

                            </div>

                        </div>

                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                    </div>

                    <div className="mt-5 rounded-2xl bg-gray-50 p-4">

                        <p className="text-xs text-gray-400">
                            Broker
                        </p>

                        <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                            mqtt.suncraftenergy.net
                        </p>

                        <p className="mt-3 text-xs text-gray-400">
                            Connection
                        </p>

                        <p className="mt-1 text-sm font-bold text-green-600">
                            Connected
                        </p>

                    </div>

                </div>


                {/* BACKEND */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Server size={19} />
                            </div>

                            <div>

                                <h2 className="font-bold text-gray-900">
                                    Backend
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Data API connection
                                </p>

                            </div>

                        </div>

                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                    </div>

                    <div className="mt-5 rounded-2xl bg-gray-50 p-4">

                        <p className="text-xs text-gray-400">
                            API Endpoint
                        </p>

                        <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                            api.suncraftenergy.net
                        </p>

                        <p className="mt-3 text-xs text-gray-400">
                            Connection
                        </p>

                        <p className="mt-1 text-sm font-bold text-green-600">
                            Connected
                        </p>

                    </div>

                </div>


                {/* DATABASE */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                <Database size={19} />
                            </div>

                            <div>

                                <h2 className="font-bold text-gray-900">
                                    Data Storage
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Plant data pipeline
                                </p>

                            </div>

                        </div>

                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                    </div>

                    <div className="mt-5 rounded-2xl bg-gray-50 p-4">

                        <p className="text-xs text-gray-400">
                            Database
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-800">
                            Plant Data Store
                        </p>

                        <p className="mt-3 text-xs text-gray-400">
                            Status
                        </p>

                        <p className="mt-1 text-sm font-bold text-green-600">
                            Healthy
                        </p>

                    </div>

                </div>

            </div>


            {/* =====================================================
                WORKFLOW
            ===================================================== */}

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <ShieldCheck size={19} />
                    </div>

                    <div>

                        <h2 className="font-bold text-gray-900">
                            Device Provisioning
                        </h2>

                        <p className="text-xs text-gray-500">
                            Device setup and approval workflow
                        </p>

                    </div>

                </div>


                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            Step 01
                        </p>

                        <p className="mt-2 font-bold text-blue-900">
                            Configure Device
                        </p>

                        <p className="mt-1 text-xs text-blue-700">
                            Add device and communication settings
                        </p>

                    </div>


                    <div className="rounded-2xl border border-green-100 bg-green-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                            Step 02
                        </p>

                        <p className="mt-2 font-bold text-green-900">
                            Connect MQTT
                        </p>

                        <p className="mt-1 text-xs text-green-700">
                            Configure broker and topic
                        </p>

                    </div>


                    <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                            Step 03
                        </p>

                        <p className="mt-2 font-bold text-purple-900">
                            Backend Setup
                        </p>

                        <p className="mt-1 text-xs text-purple-700">
                            Configure API/data connection
                        </p>

                    </div>


                    <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                            Step 04
                        </p>

                        <p className="mt-2 font-bold text-orange-900">
                            Send Request
                        </p>

                        <p className="mt-1 text-xs text-orange-700">
                            Forward device details to Client Admin
                        </p>

                    </div>

                </div>

            </div>


            {/* =====================================================
                SEARCH
            ===================================================== */}

            <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">

                <div className="relative">

                    <Search
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search device ID, device name, type or protocol..."
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />

                </div>

            </div>


            {/* =====================================================
                DEVICE TABLE
            ===================================================== */}

            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-6 py-5">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <h2 className="text-lg font-bold text-gray-900">
                                Plant Devices
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Device connectivity and configuration status.
                            </p>

                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">

                            <Activity size={15} />

                            Live Status

                        </div>

                    </div>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1200px]">

                        <thead className="bg-gray-50">

                            <tr className="border-b border-gray-100">

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Device
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Protocol
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Connection
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Backend
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Last Seen
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-gray-100">

                            {filteredDevices.map((device) => (

                                <tr
                                    key={device.id}
                                    className="transition hover:bg-gray-50"
                                >

                                    {/* DEVICE */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md">
                                                <Cpu size={19} />
                                            </div>

                                            <div>

                                                <p className="text-sm font-bold text-gray-900">
                                                    {device.name}
                                                </p>

                                                <p className="mt-1 text-xs font-medium text-blue-600">
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

                                        <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
                                            {device.protocol}
                                        </span>

                                    </td>


                                    {/* CONNECTION */}

                                    <td className="px-6 py-5 text-center">

                                        {device.connection === "Connected" ? (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">

                                                <CheckCircle2 size={13} />

                                                Connected

                                            </span>

                                        ) : device.connection === "Warning" ? (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">

                                                <AlertTriangle size={13} />

                                                Warning

                                            </span>

                                        ) : (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">

                                                <Clock3 size={13} />

                                                Pending

                                            </span>

                                        )}

                                    </td>


                                    {/* BACKEND */}

                                    <td className="px-6 py-5 text-center">

                                        {device.backend === "Connected" ? (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">

                                                <CheckCircle2 size={13} />

                                                Connected

                                            </span>

                                        ) : (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">

                                                <XCircle size={13} />

                                                Not Configured

                                            </span>

                                        )}

                                    </td>


                                    {/* STATUS */}

                                    <td className="px-6 py-5 text-center">

                                        {device.status === "Online" && (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">

                                                <span className="h-2 w-2 rounded-full bg-green-500" />

                                                Online

                                            </span>

                                        )}

                                        {device.status === "Attention" && (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">

                                                <span className="h-2 w-2 rounded-full bg-orange-500" />

                                                Attention

                                            </span>

                                        )}

                                        {device.status === "Pending" && (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">

                                                <span className="h-2 w-2 rounded-full bg-purple-500" />

                                                Pending

                                            </span>

                                        )}

                                        {device.status === "Disabled" && (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">

                                                <span className="h-2 w-2 rounded-full bg-red-500" />

                                                Disabled

                                            </span>

                                        )}

                                    </td>


                                    {/* LAST SEEN */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2 text-sm text-gray-600">

                                            <Clock3
                                                size={15}
                                                className="text-gray-400"
                                            />

                                            {device.lastSeen}

                                        </div>

                                    </td>


                                    {/* ACTIONS */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center justify-end gap-2">

                                            <button
                                                title="View Device"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Eye size={17} />
                                            </button>


                                            <button
                                                title="Configure Device"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-purple-50 hover:text-purple-600"
                                            >
                                                <Settings size={17} />
                                            </button>


                                            {device.status === "Pending" && (

                                                <button
                                                    title="Send to Client Admin"
                                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition hover:bg-orange-100"
                                                >
                                                    <Send size={17} />
                                                </button>

                                            )}


                                            {device.status !== "Pending" && (

                                                <button
                                                    onClick={() =>
                                                        toggleDevice(device.id)
                                                    }
                                                    title={
                                                        device.status === "Online"
                                                            ? "Disable Device"
                                                            : "Enable Device"
                                                    }
                                                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                                                        device.status === "Online"
                                                            ? "bg-red-50 text-red-500 hover:bg-red-100"
                                                            : "bg-green-50 text-green-600 hover:bg-green-100"
                                                    }`}
                                                >

                                                    {device.status === "Online" ? (
                                                        <XCircle size={17} />
                                                    ) : (
                                                        <CheckCircle2 size={17} />
                                                    )}

                                                </button>

                                            )}


                                            <button
                                                title="More"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                                            >
                                                <MoreVertical size={17} />
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

                    <div className="px-6 py-14 text-center">

                        <Cpu
                            size={40}
                            className="mx-auto text-gray-300"
                        />

                        <p className="mt-3 font-semibold text-gray-600">
                            No devices found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Try changing your search.
                        </p>

                    </div>

                )}

            </div>

        </div>
    )
}

export default PlantAdminDevices
