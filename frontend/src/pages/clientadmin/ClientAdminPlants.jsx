import React, { useState } from "react"
import {
    Building2,
    Search,
    Plus,
    MapPin,
    Cpu,
    Users,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Eye,
    UserPlus,
    MoreVertical
} from "lucide-react"

const ClientAdminPlants = () => {

    // UI MOCK DATA ONLY
    const [plants, setPlants] = useState([
        {
            id: 1,
            name: "Palash Blossom Resort",
            location: "West Bengal",
            capacity: "5 MW",
            devices: 8,
            onlineDevices: 8,
            admin: "Plant Admin 01",
            status: "Operational"
        },
        {
            id: 2,
            name: "Kolkata Solar Plant",
            location: "Kolkata, West Bengal",
            capacity: "10 MW",
            devices: 7,
            onlineDevices: 6,
            admin: "Plant Admin 02",
            status: "Attention"
        },
        {
            id: 3,
            name: "Durgapur Solar Plant",
            location: "Durgapur, West Bengal",
            capacity: "7.5 MW",
            devices: 6,
            onlineDevices: 6,
            admin: "Plant Admin 03",
            status: "Operational"
        },
        {
            id: 4,
            name: "Siliguri Solar Farm",
            location: "Siliguri, West Bengal",
            capacity: "4 MW",
            devices: 5,
            onlineDevices: 4,
            admin: "Plant Admin 04",
            status: "Attention"
        },
        {
            id: 5,
            name: "Burdwan Renewable Plant",
            location: "Burdwan, West Bengal",
            capacity: "6 MW",
            devices: 6,
            onlineDevices: 5,
            admin: "Plant Admin 05",
            status: "Operational"
        }
    ])

    const [search, setSearch] = useState("")

    const filteredPlants = plants.filter((plant) =>
        `${plant.name} ${plant.location} ${plant.admin} ${plant.capacity}`
            .toLowerCase()
            .includes(search.toLowerCase())
    )

    const operationalCount = plants.filter(
        (plant) => plant.status === "Operational"
    ).length

    const attentionCount = plants.filter(
        (plant) => plant.status === "Attention"
    ).length

    const totalDevices = plants.reduce(
        (total, plant) => total + plant.devices,
        0
    )

    const onlineDevices = plants.reduce(
        (total, plant) => total + plant.onlineDevices,
        0
    )

    const togglePlant = (id) => {
        setPlants((current) =>
            current.map((plant) =>
                plant.id === id
                    ? {
                        ...plant,
                        status:
                            plant.status === "Disabled"
                                ? "Operational"
                                : "Disabled"
                    }
                    : plant
            )
        )
    }

    return (
        <div className="space-y-6">

            {/* =====================================================
                HEADER
            ===================================================== */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="mb-2 flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
                            <Building2 size={18} />
                        </div>

                        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                            Plant Management
                        </span>

                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        My Plants
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View and manage all plants assigned to your client
                        account.
                    </p>

                </div>

                <button
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                    <Plus size={18} />
                    Add Plant
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
                                Total Plants
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {plants.length}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                            <Building2 size={21} />
                        </div>

                    </div>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-xs font-semibold text-gray-500">
                                Operational
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {operationalCount}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                            <CheckCircle2 size={21} />
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
                                {attentionCount}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                            <AlertTriangle size={21} />
                        </div>

                    </div>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-xs font-semibold text-gray-500">
                                Online Devices
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {onlineDevices}/{totalDevices}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <Cpu size={21} />
                        </div>

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
                        placeholder="Search plants, location or plant administrator..."
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                    />

                </div>

            </div>


            {/* =====================================================
                PLANTS
            ===================================================== */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                {filteredPlants.map((plant) => {

                    const disabled = plant.status === "Disabled"
                    const attention = plant.status === "Attention"

                    return (
                        <div
                            key={plant.id}
                            className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >

                            {/* TOP */}
                            <div className="flex items-start justify-between gap-4">

                                <div className="flex min-w-0 items-center gap-4">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-md">
                                        <Building2 size={22} />
                                    </div>

                                    <div className="min-w-0">

                                        <h2 className="truncate text-base font-bold text-gray-900">
                                            {plant.name}
                                        </h2>

                                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">

                                            <MapPin size={13} />

                                            {plant.location}

                                        </div>

                                    </div>

                                </div>


                                {/* STATUS */}
                                {disabled ? (

                                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                                        <XCircle size={13} />
                                        Disabled
                                    </span>

                                ) : attention ? (

                                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
                                        <AlertTriangle size={13} />
                                        Attention
                                    </span>

                                ) : (

                                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                                        <CheckCircle2 size={13} />
                                        Operational
                                    </span>

                                )}

                            </div>


                            {/* CAPACITY */}
                            <div className="mt-6 rounded-2xl bg-gray-50 p-4">

                                <div className="flex items-center justify-between">

                                    <span className="text-xs font-semibold text-gray-500">
                                        Installed Capacity
                                    </span>

                                    <span className="text-sm font-bold text-gray-900">
                                        {plant.capacity}
                                    </span>

                                </div>

                            </div>


                            {/* DETAILS */}
                            <div className="mt-4 grid grid-cols-2 gap-3">

                                <div className="rounded-2xl border border-gray-100 p-4">

                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Cpu size={16} />

                                        <span className="text-xs">
                                            Devices
                                        </span>
                                    </div>

                                    <p className="mt-2 text-lg font-bold text-gray-900">
                                        {plant.devices}
                                    </p>

                                    <p className="mt-1 text-[11px] text-green-600">
                                        {plant.onlineDevices} online
                                    </p>

                                </div>


                                <div className="rounded-2xl border border-gray-100 p-4">

                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Users size={16} />

                                        <span className="text-xs">
                                            Plant Admin
                                        </span>
                                    </div>

                                    <p className="mt-2 truncate text-sm font-bold text-gray-900">
                                        {plant.admin}
                                    </p>

                                    <p className="mt-1 text-[11px] text-gray-400">
                                        Administrator
                                    </p>

                                </div>

                            </div>


                            {/* ACTIONS */}
                            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-5">

                                <div className="flex gap-2">

                                    <button
                                        title="View Plant"
                                        className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-600 transition hover:bg-green-50 hover:text-green-600"
                                    >
                                        <Eye size={15} />
                                        View
                                    </button>

                                    <button
                                        title="Manage Plant Admin"
                                        className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <UserPlus size={15} />
                                        Admin
                                    </button>

                                </div>


                                <div className="flex gap-2">

                                    <button
                                        onClick={() => togglePlant(plant.id)}
                                        title={disabled ? "Enable Plant" : "Disable Plant"}
                                        className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                                            disabled
                                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                                : "bg-red-50 text-red-500 hover:bg-red-100"
                                        }`}
                                    >
                                        {disabled ? (
                                            <CheckCircle2 size={17} />
                                        ) : (
                                            <XCircle size={17} />
                                        )}
                                    </button>

                                    <button
                                        title="More"
                                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                                    >
                                        <MoreVertical size={17} />
                                    </button>

                                </div>

                            </div>

                        </div>
                    )
                })}

            </div>


            {/* EMPTY STATE */}
            {filteredPlants.length === 0 && (

                <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

                    <Building2
                        size={42}
                        className="mx-auto text-gray-300"
                    />

                    <p className="mt-4 font-semibold text-gray-600">
                        No plants found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                        Try changing your search.
                    </p>

                </div>

            )}

        </div>
    )
}

export default ClientAdminPlants

