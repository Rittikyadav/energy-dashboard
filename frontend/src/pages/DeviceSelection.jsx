import { useEffect, useState } from "react"

import axios from "axios"

import Sidebar from "../components/Sidebar"

function DeviceSelection() {

    // DEVICE LIST

    const [devices, setDevices] =
        useState([])

    // FORM DATA

    const [formData, setFormData] =
        useState({

            deviceName: "",

            topic: "",

            clientName: "",

            projectName: ""

        })

    // FETCH DEVICES

    useEffect(() => {

        fetchDevices()

    }, [])

    const fetchDevices = async () => {

        try {

            const res =
                await axios.get(

                    "http://localhost:8000/api/devices"

                )

            setDevices(res.data)

        } catch (error) {

            console.log(error)

        }

    }

    // INPUT CHANGE

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        })

    }

    // ADD DEVICE

    const handleAddDevice = async () => {

        try {

            await axios.post(

                "http://localhost:8000/api/devices",

                formData

            )

            fetchDevices()

            setFormData({

                deviceName: "",

                topic: "",

                clientName: "",

                projectName: ""

            })

            alert("Device Added Successfully")

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

                        Device Selection Dashboard

                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">

                        MongoDB Connected Smart Device Management System

                    </p>

                </div>

                {/* ADD DEVICE FORM */}

                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 mb-10">

                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Add New Device

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Register MQTT-enabled field devices

                            </p>

                        </div>

                        <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">

                            DEVICE CONFIG

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* DEVICE NAME */}

                        <div>

                            <label className="block text-gray-700 font-semibold mb-3">

                                Device Name

                            </label>

                            <input

                                type="text"

                                name="deviceName"

                                placeholder="Enter Device Name"

                                value={formData.deviceName}

                                onChange={handleChange}

                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none shadow-sm focus:ring-2 focus:ring-blue-400"

                            />

                        </div>

                        {/* MQTT TOPIC */}

                        <div>

                            <label className="block text-gray-700 font-semibold mb-3">

                                MQTT Topic

                            </label>

                            <input

                                type="text"

                                name="topic"

                                placeholder="Enter MQTT Topic"

                                value={formData.topic}

                                onChange={handleChange}

                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none shadow-sm focus:ring-2 focus:ring-blue-400"

                            />

                        </div>

                        {/* CLIENT */}

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

                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none shadow-sm focus:ring-2 focus:ring-green-400"

                            />

                        </div>

                        {/* PROJECT */}

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

                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none shadow-sm focus:ring-2 focus:ring-purple-400"

                            />

                        </div>

                    </div>

                    {/* BUTTON */}

                    <button

                        onClick={handleAddDevice}

                        className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"

                    >

                        + Add Device

                    </button>

                </div>

                {/* DEVICE TABLE */}

                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <h2 className="text-3xl font-black text-gray-800">

                                Device Database

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Connected industrial monitoring devices

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

                                        Device Name

                                    </th>

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        MQTT Topic

                                    </th>

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        Client

                                    </th>

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        Project

                                    </th>

                                    <th className="p-5 text-left text-gray-700 font-bold">

                                        Status

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {devices.map((device, index) => (

                                    <tr

                                        key={index}

                                        className="border-b hover:bg-blue-50 transition-all duration-200"

                                    >

                                        <td className="p-5 font-semibold text-gray-800">

                                            {device.deviceName}

                                        </td>

                                        <td className="p-5 text-blue-600 font-semibold">

                                            {device.topic}

                                        </td>

                                        <td className="p-5 text-gray-700 font-semibold">

                                            {device.clientName}

                                        </td>

                                        <td className="p-5 text-gray-700 font-semibold">

                                            {device.projectName}

                                        </td>

                                        <td className="p-5">

                                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">

                                                {device.status}

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

export default DeviceSelection