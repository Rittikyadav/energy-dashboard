import React, { useState } from "react"

import {
    Users,
    Search,
    Plus,
    ShieldCheck,
    UserCog,
    User,
    Mail,
    CheckCircle2,
    XCircle,
    Eye,
    UserPlus,
    MoreVertical,
    Clock3
} from "lucide-react"

const PlantAdminUsers = () => {

    // UI MOCK DATA ONLY

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "User Admin 01",
            email: "useradmin01@suncraftenergy.net",
            role: "User Admin",
            usersManaged: 8,
            lastActive: "10 minutes ago",
            status: "Active"
        },
        {
            id: 2,
            name: "User 01",
            email: "user01@suncraftenergy.net",
            role: "Normal User",
            usersManaged: 0,
            lastActive: "15 minutes ago",
            status: "Active"
        },
        {
            id: 3,
            name: "User 02",
            email: "user02@suncraftenergy.net",
            role: "Normal User",
            usersManaged: 0,
            lastActive: "30 minutes ago",
            status: "Active"
        },
        {
            id: 4,
            name: "User 03",
            email: "user03@suncraftenergy.net",
            role: "Normal User",
            usersManaged: 0,
            lastActive: "1 hour ago",
            status: "Active"
        },
        {
            id: 5,
            name: "User Admin 02",
            email: "useradmin02@suncraftenergy.net",
            role: "User Admin",
            usersManaged: 4,
            lastActive: "2 hours ago",
            status: "Active"
        },
        {
            id: 6,
            name: "User 04",
            email: "user04@suncraftenergy.net",
            role: "Normal User",
            usersManaged: 0,
            lastActive: "Yesterday",
            status: "Disabled"
        }
    ])

    const [search, setSearch] = useState("")

    const toggleUser = (id) => {

        setUsers((current) =>
            current.map((user) =>
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

    const filteredUsers = users.filter((user) =>
        `${user.name} ${user.email} ${user.role}`
            .toLowerCase()
            .includes(search.toLowerCase())
    )

    const totalUsers = users.length

    const userAdmins = users.filter(
        (user) => user.role === "User Admin"
    ).length

    const normalUsers = users.filter(
        (user) => user.role === "Normal User"
    ).length

    const activeUsers = users.filter(
        (user) => user.status === "Active"
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
                            <Users size={18} />
                        </div>

                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                            User Management
                        </span>

                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Users & Access
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage User Admins and users assigned to this plant.
                    </p>

                </div>

                <button
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                    <Plus size={18} />
                    Create User
                </button>

            </div>


            {/* =====================================================
                SUMMARY
            ===================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {/* TOTAL */}

                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Total Users
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {totalUsers}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Plant accounts
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                            <Users size={21} />
                        </div>

                    </div>

                </div>


                {/* USER ADMINS */}

                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                User Admins
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {userAdmins}
                            </p>

                            <p className="mt-1 text-xs text-purple-600">
                                Administrative access
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <UserCog size={21} />
                        </div>

                    </div>

                </div>


                {/* NORMAL USERS */}

                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Normal Users
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {normalUsers}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Dashboard users
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                            <User size={21} />
                        </div>

                    </div>

                </div>


                {/* ACTIVE */}

                <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs font-semibold text-gray-500">
                                Active Accounts
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {activeUsers}
                            </p>

                            <p className="mt-1 text-xs text-green-600">
                                Currently enabled
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                            <CheckCircle2 size={21} />
                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                ACCESS HIERARCHY
            ===================================================== */}

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <ShieldCheck size={19} />
                    </div>

                    <div>

                        <h2 className="font-bold text-gray-900">
                            User Access Hierarchy
                        </h2>

                        <p className="text-xs text-gray-500">
                            Permissions within this plant
                        </p>

                    </div>

                </div>


                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                    <div className="rounded-2xl border border-green-100 bg-green-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                            Level 01
                        </p>

                        <p className="mt-2 font-bold text-green-900">
                            Plant Admin
                        </p>

                        <p className="mt-1 text-xs text-green-700">
                            Full plant administration
                        </p>

                    </div>


                    <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                            Level 02
                        </p>

                        <p className="mt-2 font-bold text-purple-900">
                            User Admin
                        </p>

                        <p className="mt-1 text-xs text-purple-700">
                            Creates and manages users
                        </p>

                    </div>


                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            Level 03
                        </p>

                        <p className="mt-2 font-bold text-blue-900">
                            Normal User
                        </p>

                        <p className="mt-1 text-xs text-blue-700">
                            Dashboard viewing access
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
                        placeholder="Search user, email or role..."
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                    />

                </div>

            </div>


            {/* =====================================================
                USER TABLE
            ===================================================== */}

            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-6 py-5">

                    <h2 className="text-lg font-bold text-gray-900">
                        Plant Users
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                        Manage account access and user roles.
                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1050px]">

                        <thead className="bg-gray-50">

                            <tr className="border-b border-gray-100">

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Managed Users
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

                            {filteredUsers.map((user) => (

                                <tr
                                    key={user.id}
                                    className="transition hover:bg-gray-50"
                                >

                                    {/* USER */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            <div
                                                className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md ${
                                                    user.role === "User Admin"
                                                        ? "bg-gradient-to-br from-purple-500 to-violet-500"
                                                        : "bg-gradient-to-br from-blue-500 to-cyan-500"
                                                }`}
                                            >

                                                {user.role === "User Admin" ? (
                                                    <UserCog size={19} />
                                                ) : (
                                                    <User size={19} />
                                                )}

                                            </div>

                                            <div>

                                                <p className="text-sm font-bold text-gray-900">
                                                    {user.name}
                                                </p>

                                                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">

                                                    <Mail size={12} />

                                                    {user.email}

                                                </div>

                                            </div>

                                        </div>

                                    </td>


                                    {/* ROLE */}

                                    <td className="px-6 py-5">

                                        {user.role === "User Admin" ? (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">

                                                <ShieldCheck size={13} />

                                                User Admin

                                            </span>

                                        ) : (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">

                                                <User size={13} />

                                                Normal User

                                            </span>

                                        )}

                                    </td>


                                    {/* MANAGED USERS */}

                                    <td className="px-6 py-5">

                                        {user.role === "User Admin" ? (

                                            <span className="text-sm font-bold text-gray-800">
                                                {user.usersManaged} users
                                            </span>

                                        ) : (

                                            <span className="text-sm text-gray-400">
                                                —
                                            </span>

                                        )}

                                    </td>


                                    {/* LAST ACTIVITY */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2 text-sm text-gray-600">

                                            <Clock3
                                                size={15}
                                                className="text-gray-400"
                                            />

                                            {user.lastActive}

                                        </div>

                                    </td>


                                    {/* STATUS */}

                                    <td className="px-6 py-5 text-center">

                                        {user.status === "Active" ? (

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
                                                title="View User"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Eye size={17} />
                                            </button>


                                            <button
                                                title="Assign / Manage"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-purple-50 hover:text-purple-600"
                                            >
                                                <UserPlus size={17} />
                                            </button>


                                            <button
                                                onClick={() => toggleUser(user.id)}
                                                title={
                                                    user.status === "Active"
                                                        ? "Disable User"
                                                        : "Enable User"
                                                }
                                                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                                                    user.status === "Active"
                                                        ? "bg-red-50 text-red-500 hover:bg-red-100"
                                                        : "bg-green-50 text-green-600 hover:bg-green-100"
                                                }`}
                                            >

                                                {user.status === "Active" ? (
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

                {filteredUsers.length === 0 && (

                    <div className="px-6 py-14 text-center">

                        <Users
                            size={40}
                            className="mx-auto text-gray-300"
                        />

                        <p className="mt-3 font-semibold text-gray-600">
                            No users found
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

export default PlantAdminUsers
