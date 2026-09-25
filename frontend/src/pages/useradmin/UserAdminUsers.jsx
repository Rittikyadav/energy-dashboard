import React, { useState } from "react"

import {
    Users,
    Search,
    UserPlus,
    Eye,
    Settings,
    CheckCircle2,
    XCircle,
    ShieldCheck,
    MoreVertical,
    Clock3,
    UserCheck,
    UserX
} from "lucide-react"


const UserAdminUsers = () => {

    // ==========================================
    // UI MOCK DATA ONLY
    // ==========================================

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Rahul Das",
            username: "rahul.das",
            email: "rahul.das@suncraftenergy.net",
            role: "Normal User",
            access: "Full Dashboard",
            devices: 3,
            lastActive: "5 minutes ago",
            status: "Active"
        },
        {
            id: 2,
            name: "Ankit Sharma",
            username: "ankit.sharma",
            email: "ankit.sharma@suncraftenergy.net",
            role: "Normal User",
            access: "Full Dashboard",
            devices: 2,
            lastActive: "18 minutes ago",
            status: "Active"
        },
        {
            id: 3,
            name: "Priya Sen",
            username: "priya.sen",
            email: "priya.sen@suncraftenergy.net",
            role: "Normal User",
            access: "Limited Dashboard",
            devices: 1,
            lastActive: "42 minutes ago",
            status: "Active"
        },
        {
            id: 4,
            name: "Amit Roy",
            username: "amit.roy",
            email: "amit.roy@suncraftenergy.net",
            role: "Normal User",
            access: "Full Dashboard",
            devices: 4,
            lastActive: "1 hour ago",
            status: "Active"
        },
        {
            id: 5,
            name: "Sourav Ghosh",
            username: "sourav.ghosh",
            email: "sourav.ghosh@suncraftenergy.net",
            role: "Normal User",
            access: "No Access",
            devices: 0,
            lastActive: "2 days ago",
            status: "Disabled"
        },
        {
            id: 6,
            name: "Neha Roy",
            username: "neha.roy",
            email: "neha.roy@suncraftenergy.net",
            role: "Normal User",
            access: "Limited Dashboard",
            devices: 2,
            lastActive: "3 hours ago",
            status: "Active"
        }
    ])


    const [search, setSearch] = useState("")


    // ==========================================
    // FILTER
    // ==========================================

    const filteredUsers = users.filter((user) => {

        const query = search.toLowerCase()

        return (
            user.name.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        )
    })


    // ==========================================
    // TOGGLE STATUS
    // ==========================================

    const toggleStatus = (id) => {

        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === id
                    ? {
                        ...user,
                        status:
                            user.status === "Active"
                                ? "Disabled"
                                : "Active"
                    }
                    : user
            )
        )
    }


    // ==========================================
    // COUNTS
    // ==========================================

    const totalUsers = users.length

    const activeUsers =
        users.filter(
            (user) => user.status === "Active"
        ).length

    const disabledUsers =
        users.filter(
            (user) => user.status === "Disabled"
        ).length

    const fullAccessUsers =
        users.filter(
            (user) => user.access === "Full Dashboard"
        ).length


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="space-y-8">


            {/* HEADER */}

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                <div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                        <Users size={16} />
                        User Management
                    </div>

                    <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900">
                        Users & Access
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Create users, manage dashboard access and control device permissions.
                    </p>

                </div>


                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-green-100 transition hover:scale-[1.02]"
                >
                    <UserPlus size={18} />
                    Create User
                </button>

            </div>


            {/* SUMMARY */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


                {/* TOTAL */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-semibold text-gray-400">
                                Total Users
                            </p>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {totalUsers}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Under management
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <Users size={22} />
                        </div>

                    </div>

                </div>


                {/* ACTIVE */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-semibold text-gray-400">
                                Active Users
                            </p>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {activeUsers}
                            </p>

                            <p className="mt-1 text-xs text-green-600">
                                Currently enabled
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                            <UserCheck size={22} />
                        </div>

                    </div>

                </div>


                {/* DISABLED */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-semibold text-gray-400">
                                Disabled Users
                            </p>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {disabledUsers}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Access disabled
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <UserX size={22} />
                        </div>

                    </div>

                </div>


                {/* FULL ACCESS */}

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-semibold text-gray-400">
                                Full Dashboard
                            </p>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {fullAccessUsers}
                            </p>

                            <p className="mt-1 text-xs text-purple-600">
                                Full monitoring access
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                            <ShieldCheck size={22} />
                        </div>

                    </div>

                </div>

            </div>


            {/* ACCESS HIERARCHY */}

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                        <ShieldCheck size={21} />
                    </div>

                    <div>

                        <h2 className="font-black text-gray-900">
                            User Access Hierarchy
                        </h2>

                        <p className="text-sm text-gray-400">
                            Your management scope
                        </p>

                    </div>

                </div>


                <div className="mt-6 grid gap-3 md:grid-cols-3">

                    <div className="rounded-2xl border border-green-100 bg-green-50 p-5">

                        <p className="text-xs font-black uppercase tracking-wider text-green-600">
                            Level 01
                        </p>

                        <p className="mt-2 font-black text-gray-900">
                            Plant Admin
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Controls the overall plant administration.
                        </p>

                    </div>


                    <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">

                        <p className="text-xs font-black uppercase tracking-wider text-purple-600">
                            Level 02
                        </p>

                        <p className="mt-2 font-black text-gray-900">
                            User Admin
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Creates users and manages dashboard access.
                        </p>

                    </div>


                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">

                        <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                            Level 03
                        </p>

                        <p className="mt-2 font-black text-gray-900">
                            Normal User
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Views assigned devices and monitoring dashboards.
                        </p>

                    </div>

                </div>

            </div>


            {/* USER TABLE */}

            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">


                {/* TABLE HEADER */}

                <div className="border-b border-gray-100 p-6">

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div>

                            <h2 className="text-lg font-black text-gray-900">
                                Managed Users
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Users assigned under your administration
                            </p>

                        </div>


                        <div className="relative w-full lg:w-80">

                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search users..."
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

                    <table className="w-full min-w-[900px]">

                        <thead>

                            <tr className="border-b border-gray-100 bg-gray-50/70">

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Access
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Devices
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    Last Active
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

                            {filteredUsers.map((user) => (

                                <tr
                                    key={user.id}
                                    className="transition hover:bg-gray-50/70"
                                >

                                    {/* USER */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-black text-white">
                                                {user.name
                                                    .split(" ")
                                                    .map((part) => part[0])
                                                    .slice(0, 2)
                                                    .join("")
                                                }
                                            </div>

                                            <div>

                                                <p className="font-bold text-gray-900">
                                                    {user.name}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    {user.email}
                                                </p>

                                            </div>

                                        </div>

                                    </td>


                                    {/* ROLE */}

                                    <td className="px-6 py-5">

                                        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                                            {user.role}
                                        </span>

                                    </td>


                                    {/* ACCESS */}

                                    <td className="px-6 py-5">

                                        <span
                                            className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                                                user.access === "Full Dashboard"
                                                    ? "bg-green-50 text-green-700"
                                                    : user.access === "Limited Dashboard"
                                                        ? "bg-yellow-50 text-yellow-700"
                                                        : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            {user.access}
                                        </span>

                                    </td>


                                    {/* DEVICES */}

                                    <td className="px-6 py-5">

                                        <span className="font-bold text-gray-800">
                                            {user.devices}
                                        </span>

                                    </td>


                                    {/* LAST ACTIVE */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2 text-sm text-gray-500">

                                            <Clock3 size={15} />

                                            {user.lastActive}

                                        </div>

                                    </td>


                                    {/* STATUS */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2">

                                            <span
                                                className={`h-2.5 w-2.5 rounded-full ${
                                                    user.status === "Active"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            />

                                            <span
                                                className={`text-sm font-bold ${
                                                    user.status === "Active"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {user.status}
                                            </span>

                                        </div>

                                    </td>


                                    {/* ACTIONS */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center justify-end gap-2">

                                            <button
                                                type="button"
                                                title="View user"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Eye size={16} />
                                            </button>


                                            <button
                                                type="button"
                                                title="Manage access"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition hover:bg-purple-50 hover:text-purple-600"
                                            >
                                                <Settings size={16} />
                                            </button>


                                            <button
                                                type="button"
                                                title={
                                                    user.status === "Active"
                                                        ? "Disable user"
                                                        : "Enable user"
                                                }
                                                onClick={() =>
                                                    toggleStatus(user.id)
                                                }
                                                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                                                    user.status === "Active"
                                                        ? "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600"
                                                        : "bg-green-50 text-green-600 hover:bg-green-100"
                                                }`}
                                            >
                                                {user.status === "Active"
                                                    ? <XCircle size={16} />
                                                    : <CheckCircle2 size={16} />
                                                }
                                            </button>


                                            <button
                                                type="button"
                                                title="More actions"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                                            >
                                                <MoreVertical size={16} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {/* EMPTY STATE */}

                {filteredUsers.length === 0 && (

                    <div className="p-12 text-center">

                        <Users
                            size={40}
                            className="mx-auto text-gray-300"
                        />

                        <p className="mt-4 font-bold text-gray-700">
                            No users found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Try changing your search.
                        </p>

                    </div>

                )}

            </div>


            {/* FOOTNOTE */}

            <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-600"
                />

                <p className="text-xs leading-5 text-blue-700">
                    User Admin can create, disable and manage Normal Users within the assigned plant. Higher-level plant administration remains with the Plant Admin.
                </p>

            </div>

        </div>
    )
}

export default UserAdminUsers
