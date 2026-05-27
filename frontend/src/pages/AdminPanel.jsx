import { useEffect, useState } from "react"

import axios from "axios"

import Sidebar from "../components/Sidebar"

function AdminPanel() {

    // CLIENT DATA

    const [clients, setClients] =
        useState([])

    // FORM DATA

    const [formData, setFormData] =
        useState({

            clientName: "",

            projectName: "",

            username: "",

            password: ""

        })

    // FETCH CLIENTS

    useEffect(() => {

        fetchClients()

    }, [])

    const fetchClients = async () => {

        try {

            const res =
                await axios.get(

                    "http://localhost:8000/api/clients"

                )

            setClients(res.data)

        } catch (error) {

            console.log(error)

        }

    }

    // HANDLE INPUT

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        })

    }

    // ADD CLIENT

    const handleAddClient = async () => {

        try {

            await axios.post(

                "http://localhost:8000/api/clients",

                formData

            )

            fetchClients()

            setFormData({

                clientName: "",

                projectName: "",

                username: "",

                password: ""

            })

            alert("Client Added Successfully")

        } catch (error) {

            console.log(error)

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN */}

            <main className="flex-1 p-8 overflow-y-auto">

                {/* HEADER */}

                <div className="mb-10">

                    <h1 className="text-5xl font-black text-gray-800 tracking-tight">

                        Admin Control Panel

                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">

                        Manage clients, projects & authentication system

                    </p>

                </div>

                {/* ADD CLIENT FORM */}

                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 mb-10">

                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Add New Client

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Register new solar monitoring clients

                            </p>

                        </div>

                        <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">

                            ADMIN ACCESS

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* CLIENT NAME */}

                        <div>

                            <label className="block text-gray-700 font-semibold mb-3">

                                Client Name

                            </label>

                            <input

                                type="text"

                                name="clientName"

                                placeholder="Enter Client Name"

                                value={formData.clientName}

                                onChange={handleChange}

                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none shadow-sm focus:ring-2 focus:ring-blue-400"

                            />

                        </div>

                        {/* PROJECT NAME */}

                        <div>

                            <label className="block text-gray-700 font-semibold mb-3">

                                Project Name

                            </label>

                            <input

                                type="text"

                                name="projectName"

                                placeholder="Enter Project Name"

                                value={formData.projectName}

                                onChange={handleChange}

                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none shadow-sm focus:ring-2 focus:ring-green-400"

                            />

                        </div>

                        {/* USERNAME */}

                        <div>

                            <label className="block text-gray-700 font-semibold mb-3">

                                Username

                            </label>

                            <input

                                type="text"

                                name="username"

                                placeholder="Enter Username"

                                value={formData.username}

                                onChange={handleChange}

                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none shadow-sm focus:ring-2 focus:ring-purple-400"

                            />

                        </div>

                        {/* PASSWORD */}

                        <div>

                            <label className="block text-gray-700 font-semibold mb-3">

                                Password

                            </label>

                            <input

                                type="password"

                                name="password"

                                placeholder="Enter Password"

                                value={formData.password}

                                onChange={handleChange}

                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none shadow-sm focus:ring-2 focus:ring-red-400"

                            />

                        </div>

                    </div>

                    {/* BUTTON */}

                    <button

                        onClick={handleAddClient}

                        className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"

                    >

                        + Add Client

                    </button>

                </div>

                {/* CLIENT DATABASE */}

                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Client Database

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Registered client access records

                            </p>

                        </div>

                        <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">

                            LIVE DATABASE

                        </div>

                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-gray-100">

                        <table className="w-full border-collapse">

                            <thead>

                                <tr className="bg-gradient-to-r from-slate-100 to-gray-100">

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        Client Name

                                    </th>

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        Project Name

                                    </th>

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        Username

                                    </th>

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        Password

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {clients.map((client, index) => (

                                    <tr

                                        key={index}

                                        className="border-b hover:bg-blue-50 transition-all duration-200"

                                    >

                                        <td className="p-5 font-semibold text-gray-800">

                                            {client.clientName}

                                        </td>

                                        <td className="p-5 text-blue-600 font-semibold">

                                            {client.projectName}

                                        </td>

                                        <td className="p-5 text-gray-700 font-semibold">

                                            {client.username}

                                        </td>

                                        <td className="p-5">

                                            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold">

                                                {client.password}

                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>

        </div>

    )
}

export default AdminPanel