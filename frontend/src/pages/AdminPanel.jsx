import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    LayoutDashboard,
    Users,
    Link2,
    LogOut,
    ShieldCheck,
    Menu,
    X
} from "lucide-react"

import SuperAdminOverview from "./superadmin/SuperAdminOverview"
import SuperAdminClients from "./superadmin/SuperAdminClients"
import SuperAdminAssignments from "./superadmin/SuperAdminAssignments"

const AdminPanel = () => {
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState("overview")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }

    const navigation = [
        {
            key: "overview",
            label: "Overview",
            icon: LayoutDashboard
        },
        {
            key: "clients",
            label: "Clients",
            icon: Users
        },
        {
            key: "assignments",
            label: "Assignments",
            icon: Link2
        }
    ]

    const renderContent = () => {
        switch (activeTab) {
            case "clients":
                return <SuperAdminClients />

            case "assignments":
                return <SuperAdminAssignments />

            case "overview":
            default:
                return <SuperAdminOverview />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">

            {/* =====================================================
                HEADER
            ===================================================== */}
            <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 shadow-sm backdrop-blur-xl">

                <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* BRAND */}
                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                            <ShieldCheck size={23} />
                        </div>

                        <div>
                            <h1 className="text-lg font-extrabold tracking-tight text-gray-900">
                                Suncraft Energy
                            </h1>

                            <p className="text-xs font-semibold text-green-600">
                                Super Admin Control Center
                            </p>
                        </div>

                    </div>


                    {/* DESKTOP USER AREA */}
                    <div className="hidden items-center gap-4 md:flex">

                        <div className="text-right">

                            <p className="text-sm font-bold text-gray-800">
                                {user?.username || user?.name || "Super Admin"}
                            </p>

                            <p className="text-xs font-medium text-gray-400">
                                Super Administrator
                            </p>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 text-sm font-bold text-white shadow-md">
                            SA
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
                        >
                            <LogOut size={17} />
                            Logout
                        </button>

                    </div>


                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 md:hidden"
                    >
                        {mobileMenuOpen ? (
                            <X size={21} />
                        ) : (
                            <Menu size={21} />
                        )}
                    </button>

                </div>


                {/* MOBILE MENU */}
                {mobileMenuOpen && (

                    <div className="border-t border-gray-100 bg-white p-4 md:hidden">

                        <div className="mb-4 rounded-2xl bg-gray-50 p-4">

                            <p className="text-sm font-bold text-gray-800">
                                {user?.username || user?.name || "Super Admin"}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Super Administrator
                            </p>

                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600"
                        >
                            <LogOut size={17} />
                            Logout
                        </button>

                    </div>

                )}

            </header>


            {/* =====================================================
                MAIN
            ===================================================== */}
            <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

                {/* =================================================
                    PAGE NAVIGATION
                ================================================= */}
                <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-2 shadow-sm">

                    <div className="flex flex-wrap gap-2">

                        {navigation.map((item) => {

                            const Icon = item.icon

                            const isActive = activeTab === item.key

                            return (
                                <button
                                    key={item.key}
                                    onClick={() => {
                                        setActiveTab(item.key)
                                        setMobileMenuOpen(false)
                                    }}
                                    className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition ${
                                        isActive
                                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                                            : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                                    }`}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </button>
                            )
                        })}

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

export default AdminPanel
