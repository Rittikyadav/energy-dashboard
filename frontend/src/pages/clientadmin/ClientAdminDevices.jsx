import React, { useState } from "react"

import {
    Cpu,
    Search,
    Plus,
    Building2,
    User,
    Clock3,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Eye,
    Send,
    MoreVertical,
    Radio,
    ShieldCheck
} from "lucide-react"

const ClientAdminDevices = () => {

    // UI MOCK DATA ONLY
    const [devices, setDevices] = useState([
        {
            id: 1,
            deviceId: "DEV-PLB-001",
            name: "Inverter Monitor 01",
            type: "Solar Inverter",
            plant: "Palash Blossom Resort",
            requestedBy: "Plant Admin 01",
            requestDate: "Today, 09:30 AM",
            status: "Active",
            requestStatus: "Approved"
        },
        {
            id: 2,
            deviceId: "DEV-KOL-001",
            name: "Weather Station 01",
            type: "Weather Station",
            plant: "Kolkata Solar Plant",
            requestedBy: "Plant Admin 02",
            requestDate: "Today, 10:15 AM",
            status: "Active",
            requestStatus: "Pending"
        },
        {
            id: 3,
            deviceId: "DEV-KOL-002",
            name: "Inverter Monitor 02",
            type: "Solar Inverter",
            plant: "Kolkata Solar Plant",
            requestedBy: "Plant Admin 02",
            requestDate: "Yesterday, 04:20 PM",
            status: "Active",
            requestStatus: "Forwarded"
        },
        {
            id: 4,
            deviceId: "DEV-DGP-001",
            name: "Energy Meter 01",
            type: "Energy Meter",
            plant: "Durgapur Solar Plant",
            requestedBy: "Plant Admin 03",
            requestDate: "Yesterday, 11:40 AM",
            status: "Active",
            requestStatus: "Approved"
        },
        {
            id: 5,
            deviceId: "DEV-SLG-001",
            name: "Irradiance Sensor 01",
            type: "Irradiance Sensor",
            plant: "Siliguri Solar Farm",
            requestedBy: "Plant Admin 04",
            requestDate: "2 days ago",
            status: "Disabled",
            requestStatus: "Approved"
        },
        {
            id: 6,
            deviceId: "REQUEST-006",
            name: "New Monitoring Device",
            type: "SCADA Gateway",
            plant: "Burdwan Renewable Plant",
            requestedBy: "Plant Admin 05",
            requestDate: "2 days ago",
            status: "Pending",
            requestStatus: "Pending"
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
                            device.status === "Active"
                                ? "Disabled"
                                : "Active"
                    }
                    : device
            )
        )
    }

    const filteredDevices = devices.filter((device) =>
        `${device.deviceId} ${device.name} ${device.type} ${device.plant} ${device.requestedBy}`
            .toLowerCase()
            .includes(search.toLowerCase())
    )

    const totalDevices = devices.length

    const activeDevices = devices.filter(
        (device) => device.status === "Active"
    ).length

    const pendingRequests = devices.filter(
        (device) => device.requestStatus === "Pending"
    ).length

    const forwardedRequests = devices.filter(
        (device) => device.requestStatus === "Forwarded"
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
                            Device Management
                        </span>

                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Devices & Requests
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage plant devices and forward device requests
                        to the Super Admin.
                    </p>

                </div>

                <button
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                    <Plus size={18} />
                    Add Device Request
                </button>

            </div>


            {/* =====================================================
                SUMMARY CARDS
            ===================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {/* TOTAL */}

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
                                Across assigned plants
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <Cpu size={21} />
                        </div>

                    </div>

                </div>


                {/* ACTIVE */}

                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Active Devices
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {activeDevices}
                            </p>

                            <p className="mt-1 text-xs text-green-600">
                                Currently enabled
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                            <Radio size={21} />
                        </div>

                    </div>

                </div>


                {/* PENDING */}

                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Pending Requests
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {pendingRequests}
                            </p>

                            <p className="mt-1 text-xs text-orange-600">
                                Needs review
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                            <AlertTriangle size={21} />
                        </div>

                    </div>

                </div>


                {/* FORWARDED */}

                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Forwarded
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {forwardedRequests}
                            </p>

                            <p className="mt-1 text-xs text-indigo-600">
                                With Super Admin
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                            <Send size={21} />
                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                WORKFLOW
            ===================================================== */}

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <ShieldCheck size={19} />
                    </div>

                    <div>

                        <h2 className="font-bold text-gray-900">
                            Device Request Workflow
                        </h2>

                        <p className="text-xs text-gray-500">
                            Device provisioning hierarchy
                        </p>

                    </div>

                </div>


                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">

                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                            Step 01
                        </p>

                        <p className="mt-2 font-bold text-gray-800">
                            Plant Admin
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Creates device request
                        </p>

                    </div>


                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-blue-500">
                            Step 02
                        </p>

                        <p className="mt-2 font-bold text-blue-900">
                            Client Admin
                        </p>

                        <p className="mt-1 text-xs text-blue-600">
                            Reviews & forwards request
                        </p>

                    </div>


                    <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-purple-500">
                            Step 03
                        </p>

                        <p className="mt-2 font-bold text-purple-900">
                            Super Admin
                        </p>

                        <p className="mt-1 text-xs text-purple-600">
                            Adds device ID & assigns
                        </p>

                    </div>


                    <div className="rounded-2xl border border-green-100 bg-green-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                            Step 04
                        </p>

                        <p className="mt-2 font-bold text-green-900">
                            Plant System
                        </p>

                        <p className="mt-1 text-xs text-green-600">
                            Device becomes available
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
                        placeholder="Search device ID, device name, plant or requester..."
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />

                </div>

            </div>


            {/* =====================================================
                DEVICE TABLE
            ===================================================== */}

            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-6 py-5">

                    <h2 className="text-lg font-bold text-gray-900">
                        Device Management
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                        Monitor devices and manage provisioning requests.
                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1200px]">

                        <thead className="bg-gray-50">

                            <tr className="border-b border-gray-100">

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Device
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Plant
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Requested By
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Request Date
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Request Status
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Device Status
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


                                    {/* PLANT */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2">

                                            <Building2
                                                size={16}
                                                className="text-green-500"
                                            />

                                            <span className="text-sm font-semibold text-gray-700">
                                                {device.plant}
                                            </span>

                                        </div>

                                    </td>


                                    {/* REQUESTED BY */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2">

                                            <User
                                                size={16}
                                                className="text-gray-400"
                                            />

                                            <span className="text-sm text-gray-600">
                                                {device.requestedBy}
                                            </span>

                                        </div>

                                    </td>


                                    {/* DATE */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2 text-sm text-gray-600">

                                            <Clock3
                                                size={15}
                                                className="text-gray-400"
                                            />

                                            {device.requestDate}

                                        </div>

                                    </td>


                                    {/* REQUEST STATUS */}

                                    <td className="px-6 py-5 text-center">

                                        {device.requestStatus === "Approved" && (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">

                                                <CheckCircle2 size={13} />

                                                Approved

                                            </span>

                                        )}

                                        {device.requestStatus === "Pending" && (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">

                                                <Clock3 size={13} />

                                                Pending

                                            </span>

                                        )}

                                        {device.requestStatus === "Forwarded" && (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">

                                                <Send size={13} />

                                                Forwarded

                                            </span>

                                        )}

                                    </td>


                                    {/* DEVICE STATUS */}

                                    <td className="px-6 py-5 text-center">

                                        {device.status === "Active" ? (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">

                                                <span className="h-2 w-2 rounded-full bg-green-500" />

                                                Active

                                            </span>

                                        ) : device.status === "Disabled" ? (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">

                                                <span className="h-2 w-2 rounded-full bg-red-500" />

                                                Disabled

                                            </span>

                                        ) : (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">

                                                <span className="h-2 w-2 rounded-full bg-orange-500" />

                                                Pending

                                            </span>

                                        )}

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


                                            {device.requestStatus === "Pending" && (

                                                <button
                                                    title="Forward to Super Admin"
                                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100"
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
                                                        device.status === "Active"
                                                            ? "Disable Device"
                                                            : "Enable Device"
                                                    }
                                                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                                                        device.status === "Active"
                                                            ? "bg-red-50 text-red-500 hover:bg-red-100"
                                                            : "bg-green-50 text-green-600 hover:bg-green-100"
                                                    }`}
                                                >

                                                    {device.status === "Active" ? (
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

export default ClientAdminDevices

