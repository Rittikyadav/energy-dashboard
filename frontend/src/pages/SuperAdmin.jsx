import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SuperAdmin() {
    const navigate = useNavigate()

    // =========================================================
    // STATE
    // =========================================================

    const [activeTab, setActiveTab] = useState("overview")

    // Temporary UI data.
    // We will connect these to the backend step-by-step.
    const [clients] = useState([
        {
            id: 1,
            name: "Client One",
            company: "Example Energy Pvt. Ltd.",
            plants: 2,
            devices: 4,
            active: true
        },
        {
            id: 2,
            name: "Client Two",
            company: "ABC Power Solutions",
            plants: 1,
            devices: 2,
            active: true
        }
    ])

    const [assignments] = useState([
        {
            id: 1,
            client: "Client One",
            plant: "Plant A",
            device: "DEV-001",
            status: "Active"
        },
        {
            id: 2,
            client: "Client One",
            plant: "Plant B",
            device: "DEV-002",
            status: "Active"
        },
        {
            id: 3,
            client: "Client Two",
            plant: "Main Plant",
            device: "DEV-003",
            status: "Disabled"
        }
    ])

    // =========================================================
    // STAT CARD
    // =========================================================

    const StatCard = ({
        title,
        value,
        description,
        icon
    }) => {
        return (
            <div className="bg-white rounded-3xl p-7 shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between">

                    <div>
                        <p className="text-gray-500 font-semibold">
                            {title}
                        </p>

                        <h2 className="text-4xl font-black text-gray-800 mt-3">
                            {value}
                        </h2>

                        <p className="text-gray-400 text-sm mt-2">
                            {description}
                        </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
                        {icon}
                    </div>

                </div>
            </div>
        )
    }

    // =========================================================
    // STATUS BADGE
    // =========================================================

    const StatusBadge = ({ active }) => {
        return (
            <span
                className={
                    active
                        ? "bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-black"
                        : "bg-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-black"
                }
            >
                {active ? "ACTIVE" : "DISABLED"}
            </span>
        )
    }

    // =========================================================
    // OVERVIEW
    // =========================================================

    const Overview = () => {
        const activeClients =
            clients.filter(client => client.active).length

        const activeAssignments =
            assignments.filter(
                assignment =>
                    assignment.status === "Active"
            ).length

        return (
            <div>

                {/* SECTION HEADER */}

                <div className="mb-8">
                    <h2 className="text-3xl font-black text-gray-800">
                        System Overview
                    </h2>

                    <p className="text-gray-500 mt-2">
                        High-level view of the energy monitoring platform
                    </p>
                </div>


                {/* STATISTICS */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <StatCard
                        title="Clients"
                        value={clients.length}
                        description="Registered clients"
                        icon="👥"
                    />

                    <StatCard
                        title="Active Clients"
                        value={activeClients}
                        description="Currently enabled"
                        icon="✓"
                    />

                    <StatCard
                        title="Assignments"
                        value={assignments.length}
                        description="Device assignments"
                        icon="🔗"
                    />

                    <StatCard
                        title="Active Assignments"
                        value={activeAssignments}
                        description="Currently active"
                        icon="📡"
                    />

                </div>


                {/* ADMIN RESPONSIBILITY */}

                <div className="mt-8 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">

                    <h3 className="text-2xl font-black text-gray-800">
                        Super Admin Control
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Manage clients, plants and device assignments
                        from one central administration panel.
                    </p>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">

                        <div className="bg-green-50 rounded-2xl p-6">
                            <div className="text-3xl mb-3">
                                👥
                            </div>

                            <h4 className="font-black text-gray-800">
                                Clients
                            </h4>

                            <p className="text-sm text-gray-500 mt-2">
                                Create clients and manage their
                                account status.
                            </p>
                        </div>


                        <div className="bg-blue-50 rounded-2xl p-6">
                            <div className="text-3xl mb-3">
                                🏭
                            </div>

                            <h4 className="font-black text-gray-800">
                                Plants
                            </h4>

                            <p className="text-sm text-gray-500 mt-2">
                                View client plants and enable or
                                disable them.
                            </p>
                        </div>


                        <div className="bg-purple-50 rounded-2xl p-6">
                            <div className="text-3xl mb-3">
                                📡
                            </div>

                            <h4 className="font-black text-gray-800">
                                Assignments
                            </h4>

                            <p className="text-sm text-gray-500 mt-2">
                                Assign devices to clients and plants.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        )
    }

    // =========================================================
    // CLIENTS
    // =========================================================

    const Clients = () => {
        return (
            <div>

                {/* HEADER */}

                <div className="mb-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                        <div>
                            <h2 className="text-3xl font-black text-gray-800">
                                Clients
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Manage client accounts and their plants
                            </p>
                        </div>

                        <button
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-[1.03] transition"
                        >
                            + Add Client
                        </button>

                    </div>

                </div>


                {/* CLIENT CARDS */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {clients.map(client => (

                        <div
                            key={client.id}
                            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-7 hover:shadow-2xl transition"
                        >

                            {/* CLIENT HEADER */}

                            <div className="flex items-start justify-between">

                                <div className="flex items-center gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
                                        👤
                                    </div>

                                    <div>

                                        <h3 className="text-xl font-black text-gray-800">
                                            {client.name}
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                            {client.company}
                                        </p>

                                    </div>

                                </div>

                                <StatusBadge
                                    active={client.active}
                                />

                            </div>


                            {/* CLIENT STATS */}

                            <div className="grid grid-cols-2 gap-4 mt-7">

                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <p className="text-gray-500 text-sm font-semibold">
                                        Plants
                                    </p>

                                    <p className="text-2xl font-black text-gray-800 mt-1">
                                        {client.plants}
                                    </p>

                                </div>


                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <p className="text-gray-500 text-sm font-semibold">
                                        Devices
                                    </p>

                                    <p className="text-2xl font-black text-gray-800 mt-1">
                                        {client.devices}
                                    </p>

                                </div>

                            </div>


                            {/* ACTIONS */}

                            <div className="flex flex-wrap gap-3 mt-6">

                                <button
                                    onClick={() => {
                                        // Later:
                                        // open selected client
                                    }}
                                    className="flex-1 bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                                >
                                    View Client
                                </button>

                                <button
                                    className="flex-1 bg-green-50 text-green-700 px-5 py-3 rounded-xl font-bold hover:bg-green-100 transition"
                                >
                                    View Plants
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* EMPTY STATE */}

                {clients.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

                        <div className="text-5xl mb-5">
                            👥
                        </div>

                        <h3 className="text-2xl font-black text-gray-800">
                            No Clients
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Add your first client to get started.
                        </p>

                    </div>
                )}

            </div>
        )
    }

    // =========================================================
    // ASSIGNMENTS
    // =========================================================

    const Assignments = () => {
        return (
            <div>

                {/* HEADER */}

                <div className="mb-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">
                                Assignments
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Assign monitoring devices to clients and plants
                            </p>

                        </div>


                        <button
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-[1.03] transition"
                        >
                            + New Assignment
                        </button>

                    </div>

                </div>


                {/* ASSIGNMENT TABLE */}

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="p-5 text-left text-sm font-black text-gray-600">
                                        Client
                                    </th>

                                    <th className="p-5 text-left text-sm font-black text-gray-600">
                                        Plant
                                    </th>

                                    <th className="p-5 text-left text-sm font-black text-gray-600">
                                        Device ID
                                    </th>

                                    <th className="p-5 text-left text-sm font-black text-gray-600">
                                        Status
                                    </th>

                                    <th className="p-5 text-right text-sm font-black text-gray-600">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {assignments.map(
                                    assignment => (

                                        <tr
                                            key={assignment.id}
                                            className="border-t border-gray-100 hover:bg-gray-50 transition"
                                        >

                                            <td className="p-5">

                                                <p className="font-bold text-gray-800">
                                                    {assignment.client}
                                                </p>

                                            </td>


                                            <td className="p-5">

                                                <p className="text-gray-600">
                                                    {assignment.plant}
                                                </p>

                                            </td>


                                            <td className="p-5">

                                                <span className="font-mono font-bold text-gray-700">
                                                    {assignment.device}
                                                </span>

                                            </td>


                                            <td className="p-5">

                                                <span
                                                    className={
                                                        assignment.status ===
                                                            "Active"
                                                            ? "bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-black"
                                                            : "bg-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-black"
                                                    }
                                                >
                                                    {assignment.status}
                                                </span>

                                            </td>


                                            <td className="p-5 text-right">

                                                <button
                                                    className="text-red-600 font-bold hover:text-red-800 transition"
                                                >
                                                    {assignment.status ===
                                                        "Active"
                                                        ? "Disable"
                                                        : "Enable"}
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>


                    {assignments.length === 0 && (

                        <div className="p-16 text-center">

                            <div className="text-5xl mb-5">
                                📡
                            </div>

                            <h3 className="text-2xl font-black text-gray-800">
                                No Assignments
                            </h3>

                            <p className="text-gray-500 mt-2">
                                No devices have been assigned yet.
                            </p>

                        </div>

                    )}

                </div>

            </div>
        )
    }

    // =========================================================
    // CONTENT
    // =========================================================

    const renderContent = () => {

        switch (activeTab) {

            case "clients":
                return <Clients />

            case "assignments":
                return <Assignments />

            default:
                return <Overview />

        }

    }

    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200">

            <main className="p-6 lg:p-8 max-w-[1800px] mx-auto">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-10">

                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
                                    ⚡
                                </div>

                                <div>

                                    <h1 className="text-4xl lg:text-5xl font-black text-gray-800 tracking-tight">
                                        Super Admin
                                    </h1>

                                    <p className="text-gray-500 mt-1">
                                        Energy Monitoring Platform
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="flex flex-wrap gap-3">

                            <button
                                onClick={() => {
                                    localStorage.removeItem(
                                        "selectedAssignment"
                                    )

                                    navigate(
                                        "/device-selection"
                                    )
                                }}
                                className="bg-white border border-green-200 text-green-700 px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-green-50 transition"
                            >
                                View Dashboard →
                            </button>


                            <button
                                onClick={() => {
                                    window.location.reload()
                                }}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-[1.03] transition"
                            >
                                ↻ Refresh
                            </button>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <div className="bg-white rounded-3xl shadow-xl p-3 mb-8">

                    <div className="grid grid-cols-3 gap-2">

                        {[
                            [
                                "overview",
                                "Overview",
                                "📊"
                            ],
                            [
                                "clients",
                                "Clients",
                                "👥"
                            ],
                            [
                                "assignments",
                                "Assignments",
                                "🔗"
                            ]
                        ].map(
                            ([key, label, icon]) => (

                                <button
                                    key={key}
                                    onClick={() =>
                                        setActiveTab(key)
                                    }
                                    className={
                                        activeTab === key
                                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-4 rounded-2xl font-bold shadow-lg transition"
                                            : "text-gray-600 px-4 py-4 rounded-2xl font-semibold hover:bg-green-50 hover:text-green-700 transition"
                                    }
                                >

                                    <span className="mr-2">
                                        {icon}
                                    </span>

                                    {label}

                                </button>

                            )
                        )}

                    </div>

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                {renderContent()}

            </main>

        </div>

    )
}

export default SuperAdmin