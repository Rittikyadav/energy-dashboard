import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import axios from "axios"


const API_URL = import.meta.env.VITE_API_URL || "/api"

function DeviceSelection() {

    const navigate = useNavigate()

    const [assignments, setAssignments] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    const user = (() => {
        try {
            return JSON.parse(
                localStorage.getItem("user") || "null"
            )
        } catch {
            return null
        }
    })()

    const isAdmin =
        user?.role === "admin" ||
        Number(user?.usertype) === 900

    // ==========================================
    // FETCH ASSIGNED DEVICES
    // ==========================================

    useEffect(() => {
        fetchAssignments()
    }, [])

    const fetchAssignments = async () => {

        try {

            setLoading(true)
            setError("")

            const token =
                localStorage.getItem("token")

            if (!token) {
                navigate("/login", { replace: true })
                return
            }

            const endpoint = isAdmin
                ? "/admin/assignments"
                : "/client/assignments"

            const response = await axios.get(
                `${API_URL}${endpoint}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            if (!response.data?.success) {
                throw new Error(
                    response.data?.message ||
                    "Unable to load devices"
                )
            }

            const data = Array.isArray(
                response.data?.data
            )
                ? response.data.data
                : []

            const activeAssignments = data.filter(
                item => Number(item.active) === 1
            )

            setAssignments(activeAssignments)

        } catch (err) {

            console.error(
                "Device Selection Error:",
                err
            )

            const status =
                err?.response?.status

            if (status === 401 || status === 403) {

                localStorage.removeItem("token")
                localStorage.removeItem("user")
                localStorage.removeItem("selectedAssignment")

                navigate("/login", {
                    replace: true
                })

                return
            }

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to load devices"
            )

        } finally {
            setLoading(false)
        }

    }

    // ==========================================
    // OPEN DASHBOARD
    // ==========================================

    const handleSelectDevice = (assignment) => {

        localStorage.setItem(
            "selectedAssignment",
            JSON.stringify(assignment)
        )

        navigate("/dashboard")
    }

    // ==========================================
    // BACK TO ADMIN
    // ==========================================

    const handleBackToAdmin = () => {

        localStorage.removeItem("selectedAssignment")

        navigate("/admin", {
            replace: true
        })
    }

    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("selectedAssignment")

        navigate("/login", {
            replace: true
        })
    }

    const getPlantName = assignment =>
        assignment.plantname ||
        assignment.plant_id ||
        "Energy Device"

    const getLocation = assignment =>
        assignment.location ||
        assignment.plantaddress ||
        "Location not available"

    const getMeterName = assignment =>
        assignment.meter_name ||
        assignment.meter_id ||
        "Energy Meter"

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center p-8">

                <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-10 text-center">

                    <h1 className="text-4xl font-black text-gray-800">
                        Device Selection
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Loading your monitoring devices...
                    </p>

                    <div className="mt-10">
                        <div className="text-xl font-semibold text-gray-600">
                            Loading...
                        </div>
                    </div>

                </div>

            </div>
        )
    }

    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200">

            <main className="min-h-screen p-8 overflow-y-auto">

                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}

                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-10">

                        <div>

                            <h1 className="text-5xl font-black text-gray-800 tracking-tight">
                                Device Selection
                            </h1>

                            <p className="text-gray-500 mt-3 text-lg">
                                {isAdmin
                                    ? "Select a monitoring device to open the dashboard"
                                    : "Select your assigned plant and energy meter"}
                            </p>

                        </div>

                        <div className="flex flex-wrap gap-3">

                            {isAdmin && (
                                <button
                                    onClick={handleBackToAdmin}
                                    className="px-5 py-3 rounded-xl bg-white border border-green-200 text-green-700 font-semibold shadow-sm hover:bg-green-50"
                                >
                                    ← Back to Admin
                                </button>
                            )}

                            <button
                                onClick={handleLogout}
                                className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold shadow-sm hover:bg-gray-50"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                    {/* ERROR */}

                    {error && (
                        <div className="mb-8 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5">
                            <div className="font-bold">
                                Unable to load devices
                            </div>
                            <div className="text-sm mt-1">
                                {error}
                            </div>
                        </div>
                    )}

                    {/* EMPTY */}

                    {!error && assignments.length === 0 && (
                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

                            <div className="text-5xl mb-5">
                                📡
                            </div>

                            <h2 className="text-2xl font-black text-gray-800">
                                No Device Assigned
                            </h2>

                            <p className="text-gray-500 mt-3">
                                {isAdmin
                                    ? "No active device assignments are available yet. Create an assignment from the Admin Panel."
                                    : "Please contact the administrator to assign a monitoring device to your account."}
                            </p>

                        </div>
                    )}

                    {/* DEVICE CARDS */}

                    {assignments.length > 0 && (

                        <div>

                            <div className="flex items-center justify-between mb-6">

                                <div>

                                    <h2 className="text-2xl font-black text-gray-800">
                                        Monitoring Devices
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        {assignments.length} available device
                                        {assignments.length !== 1 ? "s" : ""}
                                    </p>

                                </div>

                                <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">
                                    ACTIVE
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                                {assignments.map(assignment => (

                                    <div
                                        key={assignment.assignment_id}
                                        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                    >

                                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 text-white">

                                            <div className="flex items-center justify-between">

                                                <div>
                                                    <div className="text-sm text-gray-300">
                                                        PLANT
                                                    </div>

                                                    <h3 className="text-2xl font-black mt-1">
                                                        {getPlantName(assignment)}
                                                    </h3>
                                                </div>

                                                <div className="text-3xl">
                                                    ⚡
                                                </div>

                                            </div>

                                        </div>

                                        <div className="p-6">

                                            <div className="grid grid-cols-2 gap-4 mb-5">

                                                <div>
                                                    <div className="text-xs font-bold text-gray-400 uppercase">
                                                        Plant ID
                                                    </div>
                                                    <div className="font-bold text-gray-800 mt-1">
                                                        {assignment.plant_id || "-"}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="text-xs font-bold text-gray-400 uppercase">
                                                        Device ID
                                                    </div>
                                                    <div className="font-bold text-gray-800 mt-1">
                                                        {assignment.device_id || "-"}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="mb-5">
                                                <div className="text-xs font-bold text-gray-400 uppercase">
                                                    Location
                                                </div>
                                                <div className="font-semibold text-gray-700 mt-1">
                                                    {getLocation(assignment)}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-5">

                                                <div>
                                                    <div className="text-xs font-bold text-gray-400 uppercase">
                                                        Meter
                                                    </div>
                                                    <div className="font-semibold text-gray-700 mt-1">
                                                        {getMeterName(assignment)}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="text-xs font-bold text-gray-400 uppercase">
                                                        Gateway
                                                    </div>
                                                    <div className="font-semibold text-gray-700 mt-1">
                                                        {assignment.gateway_id || "-"}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="flex items-center justify-between mb-5">
                                                <span className="text-gray-500 font-semibold">
                                                    Status
                                                </span>
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                                                    ACTIVE
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => handleSelectDevice(assignment)}
                                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                                            >
                                                Open Dashboard →
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>
                    )}

                </div>

            </main>

        </div>
    )
}

export default DeviceSelection
