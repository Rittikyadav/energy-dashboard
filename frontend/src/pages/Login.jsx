import { useState } from "react"

import axios from "axios"

import { useNavigate } from "react-router-dom"

function Login() {

    const navigate =
        useNavigate()

    const [formData, setFormData] =
        useState({

            username: "",

            password: "",

            client: "",

            project: ""

        })

    // HANDLE INPUT

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        })

    }

    // LOGIN

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            const res = await axios.post(

                "http://localhost:8000/api/auth/login",

                formData

            )

            // SAVE TOKEN

            localStorage.setItem(

                "token",

                res.data.token

            )

            // SAVE USER

            localStorage.setItem(

                "user",

                JSON.stringify(res.data.user)

            )

            navigate("/")

        } catch (error) {

            console.log(error)

            alert("Login Failed")

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-green-50 flex items-center justify-center px-6 overflow-hidden relative">

            {/* BACKGROUND GLOW */}

            <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full blur-[140px] opacity-20"></div>

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-[140px] opacity-20"></div>

            {/* LOGIN CARD */}

            <div className="relative z-10 w-full max-w-md">

                {/* TOP LOGO CARD */}

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-[32px] shadow-2xl p-8 mb-6 text-white overflow-hidden relative">

                    {/* GLOW */}

                    <div className="absolute inset-0 bg-white/10 backdrop-blur-xl"></div>

                    <div className="relative z-10">

                        <h1 className="text-4xl font-black tracking-tight">

                            Solar SCADA

                        </h1>

                        <p className="mt-3 text-green-100 text-lg">

                            Smart Energy Monitoring Platform

                        </p>

                    </div>

                </div>

                {/* LOGIN BOX */}

                <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-10 backdrop-blur-xl">

                    {/* HEADER */}

                    <div className="mb-10">

                        <h2 className="text-4xl font-black text-gray-800 tracking-tight">

                            Login

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Secure access to industrial monitoring dashboard

                        </p>

                    </div>

                    {/* FORM */}

                    <form

                        onSubmit={handleLogin}

                        className="space-y-6"

                    >

                        {/* CLIENT */}

                        <div>

                            <label className="block mb-3 font-bold text-gray-700">

                                Client Name

                            </label>

                            <input

                                type="text"

                                name="client"

                                placeholder="Enter Client Name"

                                value={formData.client}

                                onChange={handleChange}

                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"

                                required

                            />

                        </div>

                        {/* PROJECT */}

                        <div>

                            <label className="block mb-3 font-bold text-gray-700">

                                Project Name

                            </label>

                            <input

                                type="text"

                                name="project"

                                placeholder="Enter Project Name"

                                value={formData.project}

                                onChange={handleChange}

                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"

                                required

                            />

                        </div>

                        {/* USERNAME */}

                        <div>

                            <label className="block mb-3 font-bold text-gray-700">

                                Username

                            </label>

                            <input

                                type="text"

                                name="username"

                                placeholder="Enter Username"

                                value={formData.username}

                                onChange={handleChange}

                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"

                                required

                            />

                        </div>

                        {/* PASSWORD */}

                        <div>

                            <label className="block mb-3 font-bold text-gray-700">

                                Password

                            </label>

                            <input

                                type="password"

                                name="password"

                                placeholder="Enter Password"

                                value={formData.password}

                                onChange={handleChange}

                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"

                                required

                            />

                        </div>

                        {/* LOGIN BUTTON */}

                        <button

                            type="submit"

                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] hover:shadow-green-300/40 transition-all duration-300"

                        >

                            Access Dashboard

                        </button>

                    </form>

                    {/* FOOTER */}

                    <div className="mt-8 text-center">

                        <p className="text-sm text-gray-400 tracking-wide">

                            Renewable Energy Monitoring System

                        </p>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Login