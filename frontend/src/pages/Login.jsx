import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    // ==========================================
    // REAL LOGIN
    // ==========================================

    const handleLogin = async (e) => {

        e.preventDefault()

        setError("")
        setLoading(true)

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL || "/api"}/auth/login`,
                {
                    username,
                    password
                }
            )

            const data = response.data

            console.log("Login response:", data)


            // ======================================
            // SAVE AUTH DATA
            // ======================================

            if (data.token) {

                localStorage.setItem(
                    "token",
                    data.token
                )
            }

            if (data.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                )
            }


            // ======================================
            // SAVE ROLE
            // ======================================

            if (data.user?.role) {

                localStorage.setItem(
                    "role",
                    data.user.role
                )
            }


            // ======================================
            // ROLE BASED ROUTING
            // ======================================

            const user = data.user || {}

            const role = user.role

            const usertype = Number(
                user.usertype
            )


            // SUPER ADMIN

            if (
                role === "super_admin" ||
                usertype === 900
            ) {

                navigate("/admin")
                return
            }


            // CLIENT ADMIN

            if (
                role === "client_admin"
            ) {

                navigate("/client-admin")
                return
            }


            // PLANT ADMIN

            if (
                role === "plant_admin"
            ) {

                navigate("/plant-admin")
                return
            }


            // USER ADMIN

            if (
                role === "user_admin"
            ) {

                navigate("/device-selection")
                return
            }


            // NORMAL USER

            navigate("/device-selection")

        } catch (err) {

            console.error(
                "Login error:",
                err
            )

            const message =
                err?.response?.data?.message ||
                err?.response?.data?.detail ||
                "Invalid username or password."

            setError(message)

        } finally {

            setLoading(false)
        }
    }


    // ==========================================
    // DEV TEST LOGIN
    // ==========================================

    const handlePlantAdminTestLogin = () => {

        const testUser = {

            id: "dev-plant-admin-001",

            username: "plantadmin01",

            name: "Plant Admin",

            email:
                "plantadmin01@suncraftenergy.net",

            role: "plant_admin",

            usertype: 300,

            plant:
                "Palash Blossom Resort",

            plantId:
                "PLB-001"
        }


        localStorage.setItem(
            "token",
            "DEV_PLANT_ADMIN_TOKEN"
        )

        localStorage.setItem(
            "user",
            JSON.stringify(testUser)
        )

        localStorage.setItem(
            "role",
            "plant_admin"
        )

        localStorage.removeItem(
            "selectedAssignment"
        )

        navigate("/plant-admin")
    }


    // ==========================================
    // USER ADMIN TEST LOGIN
    // ==========================================

    const handleUserAdminTestLogin = () => {

        const testUser = {

            id: "dev-user-admin-001",

            username: "useradmin01",

            name: "User Admin",

            email:
                "useradmin01@suncraftenergy.net",

            role: "user_admin",

            usertype: 200,

            plant:
                "Palash Blossom Resort",

            plantId:
                "PLB-001"
        }


        localStorage.setItem(
            "token",
            "DEV_USER_ADMIN_TOKEN"
        )

        localStorage.setItem(
            "user",
            JSON.stringify(testUser)
        )

        localStorage.setItem(
            "role",
            "user_admin"
        )

        localStorage.removeItem(
            "selectedAssignment"
        )

        navigate("/user-admin")
    }


    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* ==================================
                    LOGIN CARD
                =================================== */}

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

                    {/* ==================================
                        HEADER
                    =================================== */}

                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-8 text-white">

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">

                                <span className="text-xl font-bold">
                                    S
                                </span>

                            </div>

                            <div>

                                <h1 className="text-2xl font-bold">
                                    Suncraft Energy
                                </h1>

                                <p className="text-sm text-slate-300 mt-1">
                                    Energy Management Platform
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ==================================
                        FORM
                    =================================== */}

                    <div className="px-8 py-8">

                        <div className="mb-6">

                            <h2 className="text-xl font-semibold text-slate-900">
                                Welcome back
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Sign in to continue to your dashboard.
                            </p>

                        </div>


                        {/* ERROR */}

                        {error && (

                            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                                {error}

                            </div>

                        )}


                        <form
                            onSubmit={handleLogin}
                            className="space-y-5"
                        >

                            {/* USERNAME */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder="Enter username"
                                    autoComplete="username"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                />

                            </div>


                            {/* PASSWORD */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter password"
                                        autoComplete="current-password"
                                        required
                                        className="w-full px-4 py-3 pr-20 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-slate-900"
                                    >

                                        {showPassword
                                            ? "Hide"
                                            : "Show"}

                                    </button>

                                </div>

                            </div>


                            {/* LOGIN BUTTON */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-slate-900 text-white py-3.5 font-semibold transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                            >

                                {loading
                                    ? "Signing in..."
                                    : "Sign In"}

                            </button>

                        </form>


                        {/* ==================================
                            DEV TEST AREA
                        =================================== */}

                        <div className="mt-8 pt-6 border-t border-slate-200">

                            <div className="mb-4">

                                <div className="flex items-center gap-2">

                                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                                        Development Testing
                                    </span>

                                </div>

                                <p className="text-xs text-slate-500 mt-1">
                                    These buttons bypass the backend login and are for frontend development only.
                                </p>

                            </div>


                            {/* PLANT ADMIN */}

                            <button
                                type="button"
                                onClick={
                                    handlePlantAdminTestLogin
                                }
                                className="w-full mb-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-left transition hover:bg-amber-100"
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <div className="text-sm font-semibold text-amber-900">
                                            🧪 Test Plant Admin
                                        </div>

                                        <div className="text-xs text-amber-700 mt-1">
                                            Palash Blossom Resort
                                        </div>

                                    </div>

                                    <div className="text-xs font-medium text-amber-700">
                                        DEV
                                    </div>

                                </div>

                            </button>


                            {/* USER ADMIN */}

                            <button
                                type="button"
                                onClick={
                                    handleUserAdminTestLogin
                                }
                                className="w-full rounded-xl border border-blue-300 bg-blue-50 px-4 py-3 text-left transition hover:bg-blue-100"
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <div className="text-sm font-semibold text-blue-900">
                                            🧪 Test User Admin
                                        </div>

                                        <div className="text-xs text-blue-700 mt-1">
                                            Palash Blossom Resort
                                        </div>

                                    </div>

                                    <div className="text-xs font-medium text-blue-700">
                                        DEV
                                    </div>

                                </div>

                            </button>

                        </div>

                    </div>

                </div>


                {/* ==================================
                    FOOTER
                =================================== */}

                <div className="text-center mt-5">

                    <p className="text-xs text-slate-400">
                        Suncraft Energy Management System
                    </p>

                </div>

            </div>

        </div>
    )
}


export default Login
