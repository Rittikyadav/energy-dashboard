import React, { useState } from "react"

import {
    LayoutDashboard,
    Users,
    Cpu,
    LogOut,
    Menu,
    X,
    ChevronRight,
    ShieldCheck,
    Building2
} from "lucide-react"

import UserAdminOverview from "./useradmin/UserAdminOverview"
import UserAdminUsers from "./useradmin/UserAdminUsers"
import UserAdminDevices from "./useradmin/UserAdminDevices"


const UserAdminPanel = () => {

    const [activePage, setActivePage] = useState("overview")
    const [sidebarOpen, setSidebarOpen] = useState(false)


    // ==========================================
    // MENU
    // ==========================================

    const menuItems = [
        {
            id: "overview",
            label: "Overview",
            icon: LayoutDashboard
        },
        {
            id: "users",
            label: "Users & Access",
            icon: Users
        },
        {
            id: "devices",
            label: "Devices",
            icon: Cpu
        }
    ]


    // ==========================================
    // PAGE TITLES
    // ==========================================

    const pageTitles = {
        overview: "User Admin Overview",
        users: "Users & Access",
        devices: "Assigned Devices"
    }


    // ==========================================
    // PAGE RENDER
    // ==========================================

    const renderPage = () => {

        switch (activePage) {

            case "overview":
                return <UserAdminOverview />

            case "users":
                return <UserAdminUsers />

            case "devices":
                return <UserAdminDevices />

            default:
                return <UserAdminOverview />
        }
    }


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("role")
        localStorage.removeItem("selectedAssignment")

        window.location.href = "/"
    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="min-h-screen bg-gray-50">


            {/* =====================================
                MOBILE OVERLAY
            ====================================== */}

            {sidebarOpen && (

                <div
                    className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />

            )}


            {/* =====================================
                SIDEBAR
            ====================================== */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    flex
                    h-screen
                    w-72
                    flex-col
                    border-r
                    border-gray-200
                    bg-white
                    transition-transform
                    duration-300
                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >


                {/* BRAND */}

                <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                            <Building2 size={21} />
                        </div>

                        <div>

                            <p className="text-sm font-extrabold text-gray-900">
                                Suncraft Energy
                            </p>

                            <p className="text-xs font-medium text-gray-400">
                                User Administration
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 lg:hidden"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* USER SCOPE */}

                <div className="mx-4 mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                            <Users size={18} />
                        </div>

                        <div className="min-w-0">

                            <p className="truncate text-sm font-bold text-gray-900">
                                User Admin
                            </p>

                            <p className="mt-0.5 text-xs text-blue-700">
                                Palash Blossom Resort
                            </p>

                        </div>

                    </div>


                    <div className="mt-3 flex items-center gap-2">

                        <span className="h-2 w-2 rounded-full bg-green-500" />

                        <span className="text-xs font-semibold text-green-700">
                            Access Active
                        </span>

                    </div>

                </div>


                {/* NAVIGATION */}

                <nav className="flex-1 px-4 py-6">

                    <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                        User Management
                    </p>


                    <div className="space-y-1.5">

                        {menuItems.map((item) => {

                            const Icon = item.icon

                            const active =
                                activePage === item.id


                            return (

                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {

                                        setActivePage(item.id)
                                        setSidebarOpen(false)

                                    }}
                                    className={`
                                        group
                                        flex
                                        w-full
                                        items-center
                                        justify-between
                                        rounded-2xl
                                        px-4
                                        py-3.5
                                        text-left
                                        transition
                                        ${
                                            active
                                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-100"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }
                                    `}
                                >

                                    <div className="flex items-center gap-3">

                                        <Icon size={19} />

                                        <span className="text-sm font-bold">
                                            {item.label}
                                        </span>

                                    </div>


                                    {active && (
                                        <ChevronRight size={17} />
                                    )}

                                </button>

                            )
                        })}

                    </div>

                </nav>


                {/* ACCESS LEVEL */}

                <div className="mx-4 mb-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                            <ShieldCheck size={17} />
                        </div>

                        <div>

                            <p className="text-xs font-bold text-gray-800">
                                Access Level
                            </p>

                            <p className="mt-0.5 text-[11px] text-gray-500">
                                User Administrator
                            </p>

                        </div>

                    </div>

                </div>


                {/* LOGOUT */}

                <div className="border-t border-gray-100 p-4">

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-bold text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>

                </div>

            </aside>


            {/* =====================================
                MAIN
            ====================================== */}

            <main className="min-h-screen lg:ml-72">


                {/* HEADER */}

                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">

                    <div className="flex items-center gap-4">

                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 lg:hidden"
                        >
                            <Menu size={20} />
                        </button>


                        <div>

                            <p className="text-xs font-semibold text-gray-400">
                                User Administration
                            </p>

                            <h2 className="text-lg font-bold text-gray-900">
                                {pageTitles[activePage]}
                            </h2>

                        </div>

                    </div>


                    {/* PROFILE */}

                    <div className="flex items-center gap-3">

                        <div className="hidden text-right sm:block">

                            <p className="text-sm font-bold text-gray-900">
                                User Admin
                            </p>

                            <p className="text-xs text-gray-400">
                                Palash Blossom Resort
                            </p>

                        </div>


                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md">
                            UA
                        </div>

                    </div>

                </header>


                {/* PAGE CONTENT */}

                <div className="p-4 sm:p-6 lg:p-8">

                    {renderPage()}

                </div>

            </main>

        </div>
    )
}


export default UserAdminPanel

