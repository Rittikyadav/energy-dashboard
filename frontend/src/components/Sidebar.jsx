import {

    Link,

    useLocation,

    useNavigate

} from "react-router-dom"

import { useEffect, useState } from "react"

function Sidebar() {

    const navigate =
        useNavigate()

    const location =
        useLocation()

    // THEME STATE

    const [darkMode, setDarkMode] =
        useState(

            localStorage.getItem("theme") === "dark"

        )

    // APPLY THEME

    useEffect(() => {

        if (darkMode) {

            document.documentElement.classList.add("dark")

            localStorage.setItem("theme", "dark")

            document.body.style.background =
                "#0f172a"

        } else {

            document.documentElement.classList.remove("dark")

            localStorage.setItem("theme", "light")

            document.body.style.background =
                "#f3f4f6"

        }

    }, [darkMode])

    // LOGOUT

    const handleLogout = () => {

        localStorage.removeItem("token")

        localStorage.removeItem("user")

        navigate("/login")

    }

    // ACTIVE MENU

    const activeClass =

        "group relative flex items-center gap-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-4 rounded-2xl font-bold shadow-xl scale-[1.02] transition-all duration-300"

    // NORMAL MENU

    const normalClass =

        `group relative flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300
        ${darkMode
            ? "text-gray-300 hover:bg-white/5 hover:text-white"
            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
        }`

    return (

        <aside className={`w-80 flex flex-col p-6 h-screen sticky top-0 overflow-y-auto border-r transition-all duration-500

            ${darkMode

                ? "bg-[#07110a]/95 text-white border-green-900/40 shadow-[0_0_40px_rgba(0,0,0,0.35)]"

                : "bg-white text-gray-800 border-gray-200 shadow-2xl"

            }

        `}>

            {/* LOGO */}

            <div className="mb-10">

                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 shadow-2xl">

                    <h1 className="text-3xl font-black tracking-tight text-white">

                        Solar SCADA

                    </h1>

                    <p className="text-green-100 mt-2 text-sm font-medium">

                        Smart Energy Monitoring Platform

                    </p>

                </div>

            </div>

            {/* THEME TOGGLE */}

            <div className={`mb-8 rounded-3xl p-5 border transition-all duration-300

                ${darkMode

                    ? "bg-white/5 border-white/10"

                    : "bg-gray-50 border-gray-200"

                }

            `}>

                <div className="flex items-center justify-between">

                    <div>

                        <h3 className={`font-bold text-lg

                            ${darkMode
                                ? "text-white"
                                : "text-gray-800"
                            }`}>

                            Theme Mode

                        </h3>

                        <p className={`text-sm mt-1

                            ${darkMode
                                ? "text-green-300"
                                : "text-green-600"
                            }`}>

                            {darkMode
                                ? "Dark Mode Enabled"
                                : "Light Mode Enabled"}

                        </p>

                    </div>

                    {/* TOGGLE */}

                    <button

                        onClick={() =>

                            setDarkMode(!darkMode)

                        }

                        className={`w-16 h-8 rounded-full flex items-center px-1 transition-all duration-300

                            ${darkMode

                                ? "bg-green-500 justify-end"

                                : "bg-gray-300 justify-start"

                            }

                        `}

                    >

                        <div className="w-6 h-6 bg-white rounded-full shadow-lg"></div>

                    </button>

                </div>

            </div>

            {/* NAVIGATION */}

            <nav className="space-y-2 flex-1">

                <Link

                    to="/"

                    className={

                        location.pathname === "/"

                            ? activeClass

                            : normalClass

                    }

                >

                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>

                    <span>

                        Dashboard

                    </span>

                </Link>

                <Link

                    to="/energy-generation"

                    className={

                        location.pathname === "/energy-generation"

                            ? activeClass

                            : normalClass

                    }

                >

                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>

                    <span>

                        Energy Generation

                    </span>

                </Link>

                <Link

                    to="/irradiance"

                    className={

                        location.pathname === "/irradiance"

                            ? activeClass

                            : normalClass

                    }

                >

                    <div className="w-2.5 h-2.5 rounded-full bg-lime-400"></div>

                    <span>

                        Irradiance Analysis

                    </span>

                </Link>

                <Link

                    to="/cuf-analysis"

                    className={

                        location.pathname === "/cuf-analysis"

                            ? activeClass

                            : normalClass

                    }

                >

                    <div className="w-2.5 h-2.5 rounded-full bg-teal-400"></div>

                    <span>

                        CUF Analysis

                    </span>

                </Link>

                <Link

                    to="/pr-analysis"

                    className={

                        location.pathname === "/pr-analysis"

                            ? activeClass

                            : normalClass

                    }

                >

                    <div className="w-2.5 h-2.5 rounded-full bg-green-300"></div>

                    <span>

                        PR Analysis

                    </span>

                </Link>

                <Link

                    to="/health-monitoring"

                    className={

                        location.pathname === "/health-monitoring"

                            ? activeClass

                            : normalClass

                    }

                >

                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-300"></div>

                    <span>

                        Health Monitoring

                    </span>

                </Link>

                <Link

                    to="/device-selection"

                    className={

                        location.pathname === "/device-selection"

                            ? activeClass

                            : normalClass

                    }

                >

                    <div className="w-2.5 h-2.5 rounded-full bg-lime-300"></div>

                    <span>

                        Device Selection

                    </span>

                </Link>

                <Link

                    to="/admin"

                    className={

                        location.pathname === "/admin"

                            ? activeClass

                            : normalClass

                    }

                >

                    <div className="w-2.5 h-2.5 rounded-full bg-teal-300"></div>

                    <span>

                        Admin Panel

                    </span>

                </Link>

            </nav>

            {/* SYSTEM STATUS */}

            <div className={`mt-8 rounded-3xl p-5 border transition-all duration-300

                ${darkMode

                    ? "bg-white/5 border-white/10"

                    : "bg-gray-50 border-gray-200"

                }

            `}>

                <div className="flex items-center justify-between">

                    <div>

                        <h3 className={`font-bold text-lg

                            ${darkMode
                                ? "text-white"
                                : "text-gray-800"
                            }`}>

                            System Status

                        </h3>

                        <p className="text-green-500 text-sm mt-1">

                            All Systems Operational

                        </p>

                    </div>

                    <div className="relative">

                        <div className="w-4 h-4 rounded-full bg-green-500"></div>

                        <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-400 animate-ping opacity-75"></div>

                    </div>

                </div>

            </div>

            {/* FOOTER */}

            <div className="mt-6 text-center">

                <p className={`text-xs tracking-widest uppercase

                    ${darkMode
                        ? "text-green-700"
                        : "text-green-500"
                    }`}>

                    Renewable Energy Platform

                </p>

            </div>

            {/* LOGOUT */}

            <button

                onClick={handleLogout}

                className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-4 rounded-2xl font-bold shadow-xl hover:scale-[1.03] transition-all duration-300"

            >

                Logout

            </button>

        </aside>

    )
}

export default Sidebar