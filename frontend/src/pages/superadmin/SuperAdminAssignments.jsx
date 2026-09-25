import React, { useMemo, useState } from "react"
import {
    Search,
    Plus,
    X,
    Building2,
    Factory,
    Cpu,
    Link2,
    Unlink,
    CheckCircle2,
    Ban,
    ChevronRight,
    Network,
    MapPin,
    MoreVertical
} from "lucide-react"


// =====================================================
// MOCK CLIENT DATA
// =====================================================

const clients = [
    {
        id: "CL-001",
        name: "Suncraft Renewable Solutions",
        location: "Kolkata, West Bengal",
        status: "Active"
    },
    {
        id: "CL-002",
        name: "Green Horizon Energy",
        location: "Bhubaneswar, Odisha",
        status: "Active"
    },
    {
        id: "CL-003",
        name: "Eastern Solar Power",
        location: "Durgapur, West Bengal",
        status: "Active"
    },
    {
        id: "CL-004",
        name: "North Bengal Renewables",
        location: "Siliguri, West Bengal",
        status: "Disabled"
    }
]


// =====================================================
// MOCK PLANT DATA
// =====================================================

const plants = [
    {
        id: "PLB-001",
        clientId: "CL-001",
        name: "Palash Blossom Resort",
        location: "West Bengal",
        capacity: "5 MW",
        status: "Operational"
    },
    {
        id: "PLB-002",
        clientId: "CL-001",
        name: "Kolkata Solar Plant",
        location: "Kolkata, West Bengal",
        capacity: "10 MW",
        status: "Attention"
    },
    {
        id: "PLB-003",
        clientId: "CL-001",
        name: "Durgapur Solar Plant",
        location: "Durgapur, West Bengal",
        capacity: "7.5 MW",
        status: "Operational"
    },
    {
        id: "PLB-004",
        clientId: "CL-001",
        name: "Siliguri Solar Farm",
        location: "Siliguri, West Bengal",
        capacity: "4 MW",
        status: "Attention"
    },
    {
        id: "GH-001",
        clientId: "CL-002",
        name: "Bhubaneswar Solar Plant",
        location: "Bhubaneswar, Odisha",
        capacity: "8 MW",
        status: "Operational"
    },
    {
        id: "GH-002",
        clientId: "CL-002",
        name: "Cuttack Renewable Plant",
        location: "Cuttack, Odisha",
        capacity: "6 MW",
        status: "Operational"
    },
    {
        id: "ES-001",
        clientId: "CL-003",
        name: "Eastern Solar Main Plant",
        location: "Durgapur, West Bengal",
        capacity: "12 MW",
        status: "Operational"
    }
]


// =====================================================
// MOCK DEVICE DATA
// =====================================================

const devices = [
    {
        id: "DEV-PLB-001",
        name: "Inverter Gateway 01",
        plantId: "PLB-001",
        type: "Inverter Gateway",
        protocol: "MQTT",
        status: "Active"
    },
    {
        id: "DEV-PLB-002",
        name: "Weather Station 01",
        plantId: "PLB-001",
        type: "Weather Station",
        protocol: "Modbus TCP",
        status: "Active"
    },
    {
        id: "DEV-PLB-003",
        name: "Energy Meter 01",
        plantId: "PLB-001",
        type: "Energy Meter",
        protocol: "Modbus TCP",
        status: "Active"
    },
    {
        id: "DEV-PLB-004",
        name: "SCADA Gateway 01",
        plantId: "PLB-001",
        type: "SCADA Gateway",
        protocol: "MQTT",
        status: "Active"
    },
    {
        id: "DEV-PLB-005",
        name: "Inverter Gateway 02",
        plantId: "PLB-002",
        type: "Inverter Gateway",
        protocol: "MQTT",
        status: "Active"
    },
    {
        id: "DEV-PLB-006",
        name: "Weather Station 02",
        plantId: "PLB-002",
        type: "Weather Station",
        protocol: "Modbus TCP",
        status: "Active"
    },
    {
        id: "DEV-PLB-007",
        name: "Energy Meter 02",
        plantId: "PLB-003",
        type: "Energy Meter",
        protocol: "Modbus TCP",
        status: "Active"
    },
    {
        id: "DEV-GH-001",
        name: "SCADA Gateway 01",
        plantId: "GH-001",
        type: "SCADA Gateway",
        protocol: "MQTT",
        status: "Active"
    },
    {
        id: "DEV-GH-002",
        name: "Weather Station 01",
        plantId: "GH-001",
        type: "Weather Station",
        protocol: "Modbus TCP",
        status: "Active"
    },
    {
        id: "DEV-ES-001",
        name: "Inverter Gateway 01",
        plantId: "ES-001",
        type: "Inverter Gateway",
        protocol: "MQTT",
        status: "Active"
    }
]


// =====================================================
// EXISTING ASSIGNMENTS
// =====================================================

const initialAssignments = [
    {
        id: "ASN-001",
        clientId: "CL-001",
        plantId: "PLB-001",
        deviceId: "DEV-PLB-001",
        status: "Active"
    },
    {
        id: "ASN-002",
        clientId: "CL-001",
        plantId: "PLB-001",
        deviceId: "DEV-PLB-002",
        status: "Active"
    },
    {
        id: "ASN-003",
        clientId: "CL-001",
        plantId: "PLB-001",
        deviceId: "DEV-PLB-003",
        status: "Active"
    },
    {
        id: "ASN-004",
        clientId: "CL-001",
        plantId: "PLB-002",
        deviceId: "DEV-PLB-005",
        status: "Active"
    },
    {
        id: "ASN-005",
        clientId: "CL-002",
        plantId: "GH-001",
        deviceId: "DEV-GH-001",
        status: "Active"
    },
    {
        id: "ASN-006",
        clientId: "CL-003",
        plantId: "ES-001",
        deviceId: "DEV-ES-001",
        status: "Active"
    }
]


// =====================================================
// MAIN COMPONENT
// =====================================================

const SuperAdminAssignments = () => {

    const [assignments, setAssignments] =
        useState(initialAssignments)

    const [search, setSearch] =
        useState("")

    const [showAssignModal, setShowAssignModal] =
        useState(false)

    const [selectedClientId, setSelectedClientId] =
        useState("")

    const [selectedPlantId, setSelectedPlantId] =
        useState("")

    const [selectedDeviceId, setSelectedDeviceId] =
        useState("")

    const [selectedAssignment, setSelectedAssignment] =
        useState(null)

    const [showDetails, setShowDetails] =
        useState(false)


    // =================================================
    // AVAILABLE PLANTS
    // =================================================

    const availablePlants = useMemo(() => {

        if (!selectedClientId) {
            return []
        }

        return plants.filter(
            (plant) =>
                plant.clientId === selectedClientId
        )

    }, [selectedClientId])


    // =================================================
    // AVAILABLE DEVICES
    // =================================================

    const availableDevices = useMemo(() => {

        if (!selectedPlantId) {
            return []
        }

        return devices.filter(
            (device) =>
                device.plantId === selectedPlantId
        )

    }, [selectedPlantId])


    // =================================================
    // FILTER ASSIGNMENTS
    // =================================================

    const filteredAssignments = useMemo(() => {

        const value =
            search.trim().toLowerCase()

        if (!value) {
            return assignments
        }

        return assignments.filter(
            (assignment) => {

                const client =
                    clients.find(
                        (item) =>
                            item.id ===
                            assignment.clientId
                    )

                const plant =
                    plants.find(
                        (item) =>
                            item.id ===
                            assignment.plantId
                    )

                const device =
                    devices.find(
                        (item) =>
                            item.id ===
                            assignment.deviceId
                    )

                return [
                    assignment.id,
                    assignment.clientId,
                    assignment.plantId,
                    assignment.deviceId,
                    client?.name,
                    plant?.name,
                    device?.name
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(value)
            }
        )

    }, [assignments, search])


    // =================================================
    // STATS
    // =================================================

    const totalAssignments =
        assignments.length

    const activeAssignments =
        assignments.filter(
            (item) =>
                item.status === "Active"
        ).length

    const disabledAssignments =
        assignments.filter(
            (item) =>
                item.status === "Disabled"
        ).length

    const assignedDevices =
        new Set(
            assignments.map(
                (item) =>
                    item.deviceId
            )
        ).size


    // =================================================
    // OPEN ASSIGN MODAL
    // =================================================

    const openAssignModal = () => {

        setSelectedClientId("")
        setSelectedPlantId("")
        setSelectedDeviceId("")

        setShowAssignModal(true)
    }


    // =================================================
    // CLIENT CHANGE
    // =================================================

    const handleClientChange = (value) => {

        setSelectedClientId(value)

        setSelectedPlantId("")

        setSelectedDeviceId("")
    }


    // =================================================
    // PLANT CHANGE
    // =================================================

    const handlePlantChange = (value) => {

        setSelectedPlantId(value)

        setSelectedDeviceId("")
    }


    // =================================================
    // CREATE ASSIGNMENT
    // =================================================

    const handleAssign = (e) => {

        e.preventDefault()


        if (
            !selectedClientId ||
            !selectedPlantId ||
            !selectedDeviceId
        ) {

            alert(
                "Please select Client, Plant and Device."
            )

            return
        }


        const alreadyAssigned =
            assignments.some(
                (assignment) =>
                    assignment.deviceId ===
                    selectedDeviceId &&
                    assignment.status ===
                    "Active"
            )


        if (alreadyAssigned) {

            alert(
                "This device is already assigned."
            )

            return
        }


        const nextNumber =
            assignments.length + 1


        const newAssignment = {

            id:
                `ASN-${String(nextNumber).padStart(3, "0")}`,

            clientId:
                selectedClientId,

            plantId:
                selectedPlantId,

            deviceId:
                selectedDeviceId,

            status:
                "Active"
        }


        setAssignments(
            (previous) => [
                newAssignment,
                ...previous
            ]
        )


        setShowAssignModal(false)

        setSelectedClientId("")

        setSelectedPlantId("")

        setSelectedDeviceId("")
    }


    // =================================================
    // TOGGLE ASSIGNMENT
    // =================================================

    const toggleAssignmentStatus =
        (assignmentId) => {

            setAssignments(
                (previous) =>
                    previous.map(
                        (assignment) => {

                            if (
                                assignment.id !==
                                assignmentId
                            ) {
                                return assignment
                            }

                            return {
                                ...assignment,
                                status:
                                    assignment.status ===
                                        "Active"
                                        ? "Disabled"
                                        : "Active"
                            }
                        }
                    )
            )
        }


    // =================================================
    // REMOVE ASSIGNMENT
    // =================================================

    const removeAssignment =
        (assignmentId) => {

            const confirmed =
                window.confirm(
                    "Remove this device assignment?"
                )

            if (!confirmed) {
                return
            }

            setAssignments(
                (previous) =>
                    previous.filter(
                        (assignment) =>
                            assignment.id !==
                            assignmentId
                    )
            )

            setShowDetails(false)
        }


    // =================================================
    // GETTERS
    // =================================================

    const getClient = (clientId) =>
        clients.find(
            (client) =>
                client.id === clientId
        )

    const getPlant = (plantId) =>
        plants.find(
            (plant) =>
                plant.id === plantId
        )

    const getDevice = (deviceId) =>
        devices.find(
            (device) =>
                device.id === deviceId
        )


    return (

        <div className="min-h-full bg-slate-50 p-4 md:p-6">


            {/* =========================================
                HEADER
            ========================================== */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                <div>

                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">

                        <span>
                            Super Admin
                        </span>

                        <ChevronRight
                            size={15}
                        />

                        <span>
                            Assignments
                        </span>

                    </div>


                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                        Assignment Management
                    </h1>


                    <p className="text-sm text-slate-500 mt-1">
                        Manage Client → Plant → Device relationships.
                    </p>

                </div>


                <button
                    onClick={openAssignModal}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                >

                    <Plus
                        size={18}
                    />

                    Assign Device

                </button>

            </div>


            {/* =========================================
                HIERARCHY FLOW
            ========================================== */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm mb-6">

                <div className="flex items-center gap-2 mb-5">

                    <Network
                        size={19}
                        className="text-slate-700"
                    />

                    <div>

                        <h2 className="font-semibold text-slate-900">
                            Assignment Hierarchy
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                            Device access flows through the organizational hierarchy.
                        </p>

                    </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-3">

                    <HierarchyCard
                        icon={
                            <Building2
                                size={20}
                            />
                        }
                        title="Client"
                        description="Organization"
                    />

                    <FlowArrow />


                    <HierarchyCard
                        icon={
                            <Factory
                                size={20}
                            />
                        }
                        title="Plant"
                        description="Solar Plant"
                    />

                    <FlowArrow />


                    <HierarchyCard
                        icon={
                            <Cpu
                                size={20}
                            />
                        }
                        title="Device"
                        description="Field Device"
                    />

                </div>

            </div>


            {/* =========================================
                STATS
            ========================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                <StatCard
                    icon={
                        <Link2
                            size={20}
                        />
                    }
                    label="Total Assignments"
                    value={
                        totalAssignments
                    }
                    description="Device relationships"
                />


                <StatCard
                    icon={
                        <CheckCircle2
                            size={20}
                        />
                    }
                    label="Active"
                    value={
                        activeAssignments
                    }
                    description="Currently active"
                />


                <StatCard
                    icon={
                        <Ban
                            size={20}
                        />
                    }
                    label="Disabled"
                    value={
                        disabledAssignments
                    }
                    description="Temporarily disabled"
                />


                <StatCard
                    icon={
                        <Cpu
                            size={20}
                        />
                    }
                    label="Assigned Devices"
                    value={
                        assignedDevices
                    }
                    description="Unique devices"
                />

            </div>


            {/* =========================================
                SEARCH
            ========================================== */}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5 shadow-sm">

                <div className="relative max-w-xl">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="Search client, plant, device or assignment..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />

                </div>

            </div>


            {/* =========================================
                ASSIGNMENT TABLE
            ========================================== */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-5 py-4 border-b border-slate-200">

                    <h2 className="font-semibold text-slate-900">
                        Device Assignments
                    </h2>

                    <p className="text-xs text-slate-500 mt-1">
                        {filteredAssignments.length} assignment
                        {filteredAssignments.length !== 1
                            ? "s"
                            : ""} displayed
                    </p>

                </div>


                <div className="hidden lg:block overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-50 border-b border-slate-200">

                            <tr>

                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Assignment
                                </th>

                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Client
                                </th>

                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Plant
                                </th>

                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Device
                                </th>

                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Status
                                </th>

                                <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-slate-100">

                            {filteredAssignments.map(
                                (assignment) => {

                                    const client =
                                        getClient(
                                            assignment.clientId
                                        )

                                    const plant =
                                        getPlant(
                                            assignment.plantId
                                        )

                                    const device =
                                        getDevice(
                                            assignment.deviceId
                                        )


                                    return (

                                        <tr
                                            key={
                                                assignment.id
                                            }
                                            className="hover:bg-slate-50 transition"
                                        >

                                            {/* ASSIGNMENT */}

                                            <td className="px-5 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">

                                                        <Link2
                                                            size={17}
                                                            className="text-slate-600"
                                                        />

                                                    </div>

                                                    <span className="font-semibold text-slate-900">
                                                        {
                                                            assignment.id
                                                        }
                                                    </span>

                                                </div>

                                            </td>


                                            {/* CLIENT */}

                                            <td className="px-5 py-4">

                                                <div className="flex items-center gap-2">

                                                    <Building2
                                                        size={16}
                                                        className="text-slate-400"
                                                    />

                                                    <div>

                                                        <p className="text-sm font-medium text-slate-900">
                                                            {
                                                                client?.name
                                                            }
                                                        </p>

                                                        <p className="text-xs text-slate-500">
                                                            {
                                                                client?.id
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* PLANT */}

                                            <td className="px-5 py-4">

                                                <div>

                                                    <p className="text-sm font-medium text-slate-900">
                                                        {
                                                            plant?.name
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {
                                                            plant?.id
                                                        }
                                                    </p>

                                                </div>

                                            </td>


                                            {/* DEVICE */}

                                            <td className="px-5 py-4">

                                                <div>

                                                    <p className="text-sm font-medium text-slate-900">
                                                        {
                                                            device?.name
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {
                                                            device?.id
                                                        }
                                                    </p>

                                                </div>

                                            </td>


                                            {/* STATUS */}

                                            <td className="px-5 py-4">

                                                <StatusBadge
                                                    status={
                                                        assignment.status
                                                    }
                                                />

                                            </td>


                                            {/* ACTIONS */}

                                            <td className="px-5 py-4">

                                                <div className="flex justify-end items-center gap-2">

                                                    <button
                                                        type="button"
                                                        title="View assignment"
                                                        onClick={() => {

                                                            setSelectedAssignment(
                                                                assignment
                                                            )

                                                            setShowDetails(
                                                                true
                                                            )
                                                        }}
                                                        className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                                    >

                                                        <MoreVertical
                                                            size={16}
                                                        />

                                                    </button>


                                                    <button
                                                        type="button"
                                                        title="Enable / Disable"
                                                        onClick={() =>
                                                            toggleAssignmentStatus(
                                                                assignment.id
                                                            )
                                                        }
                                                        className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                                    >

                                                        {
                                                            assignment.status ===
                                                                "Active"
                                                                ? (
                                                                    <Ban
                                                                        size={16}
                                                                    />
                                                                )
                                                                : (
                                                                    <CheckCircle2
                                                                        size={16}
                                                                    />
                                                                )
                                                        }

                                                    </button>


                                                    <button
                                                        type="button"
                                                        title="Remove assignment"
                                                        onClick={() =>
                                                            removeAssignment(
                                                                assignment.id
                                                            )
                                                        }
                                                        className="w-9 h-9 rounded-lg border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-50"
                                                    >

                                                        <Unlink
                                                            size={16}
                                                        />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                }
                            )}

                        </tbody>

                    </table>

                </div>


                {/* =====================================
                    MOBILE CARDS
                ====================================== */}

                <div className="lg:hidden divide-y divide-slate-100">

                    {filteredAssignments.map(
                        (assignment) => {

                            const client =
                                getClient(
                                    assignment.clientId
                                )

                            const plant =
                                getPlant(
                                    assignment.plantId
                                )

                            const device =
                                getDevice(
                                    assignment.deviceId
                                )


                            return (

                                <div
                                    key={
                                        assignment.id
                                    }
                                    className="p-5"
                                >

                                    <div className="flex items-start justify-between gap-3">

                                        <div>

                                            <div className="flex items-center gap-2">

                                                <Link2
                                                    size={17}
                                                    className="text-slate-500"
                                                />

                                                <span className="font-semibold text-slate-900">
                                                    {
                                                        assignment.id
                                                    }
                                                </span>

                                            </div>

                                            <p className="text-xs text-slate-500 mt-1">
                                                Device assignment
                                            </p>

                                        </div>


                                        <StatusBadge
                                            status={
                                                assignment.status
                                            }
                                        />

                                    </div>


                                    <div className="mt-4 space-y-3">

                                        <MobileHierarchyItem
                                            icon={
                                                <Building2
                                                    size={16}
                                                />
                                            }
                                            label="Client"
                                            value={
                                                client?.name
                                            }
                                        />


                                        <MobileHierarchyItem
                                            icon={
                                                <Factory
                                                    size={16}
                                                />
                                            }
                                            label="Plant"
                                            value={
                                                plant?.name
                                            }
                                        />


                                        <MobileHierarchyItem
                                            icon={
                                                <Cpu
                                                    size={16}
                                                />
                                            }
                                            label="Device"
                                            value={
                                                device?.name
                                            }
                                        />

                                    </div>


                                    <div className="flex gap-2 mt-4">

                                        <button
                                            type="button"
                                            onClick={() => {

                                                setSelectedAssignment(
                                                    assignment
                                                )

                                                setShowDetails(
                                                    true
                                                )
                                            }}
                                            className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                        >
                                            View
                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleAssignmentStatus(
                                                    assignment.id
                                                )
                                            }
                                            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                        >
                                            {assignment.status ===
                                                "Active"
                                                ? "Disable"
                                                : "Enable"}
                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeAssignment(
                                                    assignment.id
                                                )
                                            }
                                            className="rounded-xl border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            )
                        }
                    )}

                </div>


                {filteredAssignments.length === 0 && (

                    <div className="px-6 py-16 text-center">

                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">

                            <Link2
                                size={22}
                                className="text-slate-400"
                            />

                        </div>

                        <h3 className="font-semibold text-slate-900">
                            No assignments found
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Try changing your search or create a new assignment.
                        </p>

                    </div>

                )}

            </div>


            {/* =========================================
                ASSIGN DEVICE MODAL
            ========================================== */}

            {showAssignModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    <div
                        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
                        onClick={() =>
                            setShowAssignModal(
                                false
                            )
                        }
                    />


                    <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">

                        {/* HEADER */}

                        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-slate-900">
                                    Assign Device
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Select the Client → Plant → Device relationship.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setShowAssignModal(
                                        false
                                    )
                                }
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100"
                            >

                                <X
                                    size={20}
                                />

                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            onSubmit={
                                handleAssign
                            }
                            className="p-6"
                        >

                            {/* CLIENT */}

                            <SelectField
                                label="Client"
                                value={
                                    selectedClientId
                                }
                                onChange={
                                    handleClientChange
                                }
                                placeholder="Select client"
                                options={
                                    clients.map(
                                        (client) => ({
                                            value:
                                                client.id,
                                            label:
                                                `${client.name} (${client.id})`
                                        })
                                    )
                                }
                            />


                            {/* PLANT */}

                            <SelectField
                                label="Plant"
                                value={
                                    selectedPlantId
                                }
                                onChange={
                                    handlePlantChange
                                }
                                placeholder={
                                    selectedClientId
                                        ? "Select plant"
                                        : "Select client first"
                                }
                                disabled={
                                    !selectedClientId
                                }
                                options={
                                    availablePlants.map(
                                        (plant) => ({
                                            value:
                                                plant.id,
                                            label:
                                                `${plant.name} — ${plant.capacity}`
                                        })
                                    )
                                }
                            />


                            {/* DEVICE */}

                            <SelectField
                                label="Device"
                                value={
                                    selectedDeviceId
                                }
                                onChange={
                                    setSelectedDeviceId
                                }
                                placeholder={
                                    selectedPlantId
                                        ? "Select device"
                                        : "Select plant first"
                                }
                                disabled={
                                    !selectedPlantId
                                }
                                options={
                                    availableDevices.map(
                                        (device) => ({
                                            value:
                                                device.id,
                                            label:
                                                `${device.name} — ${device.id}`
                                        })
                                    )
                                }
                            />


                            {/* PREVIEW */}

                            {selectedClientId &&
                                selectedPlantId &&
                                selectedDeviceId && (

                                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 mb-6">

                                        <div className="flex items-center gap-2 text-blue-800 mb-3">

                                            <Link2
                                                size={17}
                                            />

                                            <span className="text-sm font-semibold">
                                                Assignment Preview
                                            </span>

                                        </div>


                                        <div className="space-y-2 text-sm">

                                            <PreviewRow
                                                label="Client"
                                                value={
                                                    getClient(
                                                        selectedClientId
                                                    )?.name
                                                }
                                            />

                                            <PreviewRow
                                                label="Plant"
                                                value={
                                                    getPlant(
                                                        selectedPlantId
                                                    )?.name
                                                }
                                            />

                                            <PreviewRow
                                                label="Device"
                                                value={
                                                    getDevice(
                                                        selectedDeviceId
                                                    )?.id
                                                }
                                            />

                                        </div>

                                    </div>
                                )}


                            {/* BUTTONS */}

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowAssignModal(
                                            false
                                        )
                                    }
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={
                                        !selectedClientId ||
                                        !selectedPlantId ||
                                        !selectedDeviceId
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                                >

                                    <Link2
                                        size={17}
                                    />

                                    Assign Device

                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}


            {/* =========================================
                DETAILS MODAL
            ========================================== */}

            {showDetails &&
                selectedAssignment && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                        <div
                            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
                            onClick={() =>
                                setShowDetails(
                                    false
                                )
                            }
                        />


                        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

                            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

                                <div>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Assignment Details
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {
                                            selectedAssignment.id
                                        }
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowDetails(
                                            false
                                        )
                                    }
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100"
                                >

                                    <X
                                        size={20}
                                    />

                                </button>

                            </div>


                            <div className="p-6">

                                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                        <HierarchyDetail
                                            icon={
                                                <Building2
                                                    size={20}
                                                />
                                            }
                                            label="Client"
                                            value={
                                                getClient(
                                                    selectedAssignment.clientId
                                                )?.name
                                            }
                                            id={
                                                selectedAssignment.clientId
                                            }
                                        />


                                        <HierarchyDetail
                                            icon={
                                                <Factory
                                                    size={20}
                                                />
                                            }
                                            label="Plant"
                                            value={
                                                getPlant(
                                                    selectedAssignment.plantId
                                                )?.name
                                            }
                                            id={
                                                selectedAssignment.plantId
                                            }
                                        />


                                        <HierarchyDetail
                                            icon={
                                                <Cpu
                                                    size={20}
                                                />
                                            }
                                            label="Device"
                                            value={
                                                getDevice(
                                                    selectedAssignment.deviceId
                                                )?.name
                                            }
                                            id={
                                                selectedAssignment.deviceId
                                            }
                                        />

                                    </div>

                                </div>


                                <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-200">

                                    <StatusBadge
                                        status={
                                            selectedAssignment.status
                                        }
                                    />


                                    <div className="flex gap-2">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleAssignmentStatus(
                                                    selectedAssignment.id
                                                )
                                            }
                                            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                        >

                                            {selectedAssignment.status ===
                                                "Active"
                                                ? "Disable"
                                                : "Enable"}

                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeAssignment(
                                                    selectedAssignment.id
                                                )
                                            }
                                            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                                        >

                                            Remove

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                )}

        </div>
    )
}


// =====================================================
// STAT CARD
// =====================================================

const StatCard = ({
    icon,
    label,
    value,
    description
}) => {

    return (

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-slate-500">
                        {label}
                    </p>

                    <p className="text-2xl font-bold text-slate-900 mt-2">
                        {value}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                        {description}
                    </p>

                </div>


                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">

                    {icon}

                </div>

            </div>

        </div>
    )
}


// =====================================================
// HIERARCHY CARD
// =====================================================

const HierarchyCard = ({
    icon,
    title,
    description
}) => {

    return (

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600">

                    {icon}

                </div>

                <div>

                    <p className="font-semibold text-slate-900">
                        {title}
                    </p>

                    <p className="text-xs text-slate-500">
                        {description}
                    </p>

                </div>

            </div>

        </div>
    )
}


// =====================================================
// FLOW ARROW
// =====================================================

const FlowArrow = () => {

    return (

        <div className="hidden md:flex items-center justify-center text-slate-300">

            <ChevronRight
                size={22}
            />

        </div>
    )
}


// =====================================================
// STATUS BADGE
// =====================================================

const StatusBadge = ({
    status
}) => {

    const active =
        status === "Active"

    return (

        <span
            className={
                active
                    ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                    : "inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700"
            }
        >

            <span
                className={
                    active
                        ? "w-1.5 h-1.5 rounded-full bg-emerald-500"
                        : "w-1.5 h-1.5 rounded-full bg-red-500"
                }
            />

            {status}

        </span>
    )
}


// =====================================================
// MOBILE HIERARCHY ITEM
// =====================================================

const MobileHierarchyItem = ({
    icon,
    label,
    value
}) => {

    return (

        <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 p-3">

            <div className="text-slate-500">
                {icon}
            </div>

            <div className="min-w-0">

                <p className="text-xs text-slate-500">
                    {label}
                </p>

                <p className="text-sm font-semibold text-slate-900 truncate">
                    {value}
                </p>

            </div>

        </div>
    )
}


// =====================================================
// SELECT FIELD
// =====================================================

const SelectField = ({
    label,
    value,
    onChange,
    placeholder,
    options,
    disabled = false
}) => {

    return (

        <div className="mb-5">

            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }
                disabled={disabled}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-100 disabled:text-slate-400"
            >

                <option value="">
                    {placeholder}
                </option>

                {options.map(
                    (option) => (

                        <option
                            key={
                                option.value
                            }
                            value={
                                option.value
                            }
                        >
                            {
                                option.label
                            }
                        </option>

                    )
                )}

            </select>

        </div>
    )
}


// =====================================================
// PREVIEW ROW
// =====================================================

const PreviewRow = ({
    label,
    value
}) => {

    return (

        <div className="flex items-center justify-between gap-4">

            <span className="text-blue-700">
                {label}
            </span>

            <span className="font-semibold text-blue-900 text-right">
                {value}
            </span>

        </div>
    )
}


// =====================================================
// HIERARCHY DETAIL
// =====================================================

const HierarchyDetail = ({
    icon,
    label,
    value,
    id
}) => {

    return (

        <div className="rounded-xl bg-white border border-slate-200 p-4">

            <div className="flex items-center gap-2 text-slate-400">

                {icon}

                <span className="text-xs">
                    {label}
                </span>

            </div>

            <p className="text-sm font-semibold text-slate-900 mt-2">
                {value}
            </p>

            <p className="text-xs text-slate-500 mt-1">
                {id}
            </p>

        </div>
    )
}


export default SuperAdminAssignments