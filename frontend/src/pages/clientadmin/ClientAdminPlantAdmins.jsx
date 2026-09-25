import React, { useState } from "react"
import {
    Users,
    Search,
    Plus,
    Building2,
    Mail,
    CheckCircle2,
    XCircle,
    Eye,
    UserPlus,
    MoreVertical,
    Clock3,
    ShieldCheck
} from "lucide-react"

const ClientAdminPlantAdmins = () => {

    // UI MOCK DATA ONLY
    const [admins, setAdmins] = useState([
        {
            id: 1,
            name: "Plant Admin 01",
            email: "plantadmin01@suncraftenergy.net",
            plant: "Palash Blossom Resort",
            lastActive: "10 minutes ago",
            status: "Active"
        },
        {
            id: 2,
            name: "Plant Admin 02",
            email: "plantadmin02@suncraftenergy.net",
            plant: "Kolkata Solar Plant",
            lastActive: "25 minutes ago",
            status: "Active"
        },
        {
            id: 3,
            name: "Plant Admin 03",
            email: "plantadmin03@suncraftenergy.net",
            plant: "Durgapur Solar Plant",
            lastActive: "1 hour ago",
            status: "Active"
        },
        {
            id: 4,
            name: "Plant Admin 04",
            email: "plantadmin04@suncraftenergy.net",
            plant: "Siliguri Solar Farm",
            lastActive: "3 hours ago",
            status: "Active"
        },
        {
            id: 5,
            name: "Plant Admin 05",
            email: "plantadmin05@suncraftenergy.net",
            plant: "Burdwan Renewable Plant",
            lastActive: "Yesterday",
            status: "Disabled"
        }
    ])

    const [search, setSearch] = useState("")

    const toggleAdmin = (id) => {
        setAdmins((current) =>
            current.map((admin) =>
                admin.id === id
                    ? {
                        ...admin,
                        status:
                            admin.status === "Active"
                                ? "Disabled"
                                : "Active"
                    }
                    : admin
            )
        )
    }

    const filteredAdmins = admins.filter((admin) =>
        `${admin.name} ${admin.email} ${admin.plant}`
            .toLowerCase()
            .includes(search.toLowerCase())
    )

    const activeAdmins = admins.filter(
        (admin) => admin.status === "Active"
    ).length

    const disabledAdmins = admins.filter(
        (admin) => admin.status === "Disabled"
    ).length

    return (
        <div className="space-y-6">

            {/* =====================================================
                HEADER
            ===================================================== */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="mb-2 flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <ShieldCheck size={18} />
                        </div>

                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                            Access Management
                        </span>

                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Plant Administrators
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Create and manage administrators responsible for
                        individual plants.
                    </p>

                </div>

                <button
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                    <Plus size={18} />
                    Create Plant Admin
                </button>

            </div>


            {/* =====================================================
                SUMMARY
            ===================================================== */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Total Plant Admins
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {admins.length}
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                            <Users size={21} />
                        </div>

                    </div>

                </div>


                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Active
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {activeAdmins}
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
                                Disabled
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {disabledAdmins}
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                            <XCircle size={21} />
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
                        placeholder="Search administrator, email or plant..."
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                    />

                </div>

            </div>


            {/* =====================================================
                ADMIN TABLE
            ===================================================== */}
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-6 py-5">

                    <h2 className="text-lg font-bold text-gray-900">
                        Plant Administrator Accounts
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                        Each administrator is responsible for the plant
                        assigned to them.
                    </p>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[950px]">

                        <thead className="bg-gray-50">

                            <tr className="border-b border-gray-100">

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Administrator
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Assigned Plant
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Last Activity
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {filteredAdmins.map((admin) => (

                                <tr
                                    key={admin.id}
                                    className="transition hover:bg-gray-50"
                                >

                                    {/* ADMIN */}
                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 text-white shadow-md">
                                                <Users size={19} />
                                            </div>

                                            <div>

                                                <p className="text-sm font-bold text-gray-900">
                                                    {admin.name}
                                                </p>

                                                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">

                                                    <Mail size={12} />

                                                    {admin.email}

                                                </div>

                                            </div>

                                        </div>

                                    </td>


                                    {/* PLANT */}
                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                                <Building2 size={18} />
                                            </div>

                                            <div>

                                                <p className="text-sm font-semibold text-gray-800">
                                                    {admin.plant}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    Assigned plant
                                                </p>

                                            </div>

                                        </div>

                                    </td>


                                    {/* LAST ACTIVITY */}
                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2 text-sm text-gray-600">

                                            <Clock3
                                                size={16}
                                                className="text-gray-400"
                                            />

                                            {admin.lastActive}

                                        </div>

                                    </td>


                                    {/* STATUS */}
                                    <td className="px-6 py-5 text-center">

                                        {admin.status === "Active" ? (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">

                                                <span className="h-2 w-2 rounded-full bg-green-500" />

                                                Active

                                            </span>

                                        ) : (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">

                                                <span className="h-2 w-2 rounded-full bg-red-500" />

                                                Disabled

                                            </span>

                                        )}

                                    </td>


                                    {/* ACTIONS */}
                                    <td className="px-6 py-5">

                                        <div className="flex items-center justify-end gap-2">

                                            <button
                                                title="View Administrator"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-green-50 hover:text-green-600"
                                            >
                                                <Eye size={17} />
                                            </button>

                                            <button
                                                title="Assign / Change Plant"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <UserPlus size={17} />
                                            </button>

                                            <button
                                                onClick={() => toggleAdmin(admin.id)}
                                                title={
                                                    admin.status === "Active"
                                                        ? "Disable Administrator"
                                                        : "Enable Administrator"
                                                }
                                                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                                                    admin.status === "Active"
                                                        ? "bg-red-50 text-red-500 hover:bg-red-100"
                                                        : "bg-green-50 text-green-600 hover:bg-green-100"
                                                }`}
                                            >
                                                {admin.status === "Active" ? (
                                                    <XCircle size={17} />
                                                ) : (
                                                    <CheckCircle2 size={17} />
                                                )}
                                            </button>

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
                {filteredAdmins.length === 0 && (

                    <div className="px-6 py-14 text-center">

                        <Users
                            size={40}
                            className="mx-auto text-gray-300"
                        />

                        <p className="mt-3 font-semibold text-gray-600">
                            No administrators found
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

export default ClientAdminPlantAdmins
