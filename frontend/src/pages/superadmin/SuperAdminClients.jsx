import React, { useMemo, useState } from "react"
import {
    Plus,
    Search,
    Users,
    Building2,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    Eye,
    UserCog,
    MoreVertical,
    Power,
    X,
    CheckCircle2,
    Ban,
    ChevronRight
} from "lucide-react"


const initialClients = [
    {
        id: "CL-001",
        clientName: "Suncraft Renewable Solutions",
        companyName: "Suncraft Renewable Solutions Pvt. Ltd.",
        email: "admin@suncraftenergy.net",
        phone: "+91 98765 43210",
        address: "Kolkata, West Bengal",
        adminName: "Client Admin 01",
        adminUsername: "clientadmin01",
        adminEmail: "clientadmin01@suncraftenergy.net",
        plants: 5,
        devices: 32,
        status: "Active"
    },
    {
        id: "CL-002",
        clientName: "Green Horizon Energy",
        companyName: "Green Horizon Energy Pvt. Ltd.",
        email: "contact@greenhorizon.in",
        phone: "+91 98765 11223",
        address: "Bhubaneswar, Odisha",
        adminName: "Client Admin 02",
        adminUsername: "clientadmin02",
        adminEmail: "clientadmin02@greenhorizon.in",
        plants: 3,
        devices: 18,
        status: "Active"
    },
    {
        id: "CL-003",
        clientName: "Eastern Solar Power",
        companyName: "Eastern Solar Power Ltd.",
        email: "admin@easternsolar.in",
        phone: "+91 98300 44556",
        address: "Durgapur, West Bengal",
        adminName: "Client Admin 03",
        adminUsername: "clientadmin03",
        adminEmail: "clientadmin03@easternsolar.in",
        plants: 4,
        devices: 24,
        status: "Active"
    },
    {
        id: "CL-004",
        clientName: "North Bengal Renewables",
        companyName: "North Bengal Renewables Pvt. Ltd.",
        email: "admin@northernrenewables.in",
        phone: "+91 98000 77889",
        address: "Siliguri, West Bengal",
        adminName: "Client Admin 04",
        adminUsername: "clientadmin04",
        adminEmail: "clientadmin04@northernrenewables.in",
        plants: 2,
        devices: 12,
        status: "Disabled"
    }
]


const emptyForm = {
    clientName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    adminName: "",
    adminUsername: "",
    adminEmail: "",
    status: "Active"
}


const SuperAdminClients = () => {

    const [clients, setClients] = useState(initialClients)

    const [search, setSearch] = useState("")

    const [showCreateModal, setShowCreateModal] =
        useState(false)

    const [selectedClient, setSelectedClient] =
        useState(null)

    const [form, setForm] = useState(emptyForm)

    const [showDetails, setShowDetails] =
        useState(false)


    // ==========================================
    // FILTER
    // ==========================================

    const filteredClients = useMemo(() => {

        const value = search
            .trim()
            .toLowerCase()

        if (!value) {
            return clients
        }

        return clients.filter((client) =>
            [
                client.clientName,
                client.companyName,
                client.email,
                client.adminName,
                client.adminUsername,
                client.address,
                client.id
            ]
                .join(" ")
                .toLowerCase()
                .includes(value)
        )

    }, [clients, search])


    // ==========================================
    // STATS
    // ==========================================

    const totalClients = clients.length

    const activeClients =
        clients.filter(
            (client) =>
                client.status === "Active"
        ).length

    const disabledClients =
        clients.filter(
            (client) =>
                client.status === "Disabled"
        ).length

    const totalPlants =
        clients.reduce(
            (sum, client) =>
                sum + Number(client.plants || 0),
            0
        )


    // ==========================================
    // FORM CHANGE
    // ==========================================

    const handleFormChange = (
        field,
        value
    ) => {

        setForm((previous) => ({
            ...previous,
            [field]: value
        }))
    }


    // ==========================================
    // CREATE CLIENT
    // ==========================================

    const handleCreateClient = (e) => {

        e.preventDefault()


        if (
            !form.clientName.trim() ||
            !form.companyName.trim() ||
            !form.email.trim() ||
            !form.adminName.trim() ||
            !form.adminUsername.trim() ||
            !form.adminEmail.trim()
        ) {

            alert(
                "Please fill all required fields."
            )

            return
        }


        const nextNumber =
            clients.length + 1


        const newClient = {

            id:
                `CL-${String(nextNumber).padStart(3, "0")}`,

            clientName:
                form.clientName.trim(),

            companyName:
                form.companyName.trim(),

            email:
                form.email.trim(),

            phone:
                form.phone.trim(),

            address:
                form.address.trim(),

            adminName:
                form.adminName.trim(),

            adminUsername:
                form.adminUsername.trim(),

            adminEmail:
                form.adminEmail.trim(),

            plants: 0,

            devices: 0,

            status:
                form.status
        }


        setClients((previous) => [
            newClient,
            ...previous
        ])


        setForm(emptyForm)

        setShowCreateModal(false)
    }


    // ==========================================
    // ENABLE / DISABLE
    // ==========================================

    const toggleClientStatus = (clientId) => {

        setClients((previous) =>
            previous.map((client) => {

                if (client.id !== clientId) {
                    return client
                }

                return {
                    ...client,
                    status:
                        client.status === "Active"
                            ? "Disabled"
                            : "Active"
                }
            })
        )
    }


    // ==========================================
    // VIEW CLIENT
    // ==========================================

    const handleViewClient = (client) => {

        setSelectedClient(client)

        setShowDetails(true)
    }


    return (

        <div className="min-h-full bg-slate-50 p-4 md:p-6">

            {/* ==================================
                HEADER
            =================================== */}

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
                            Clients
                        </span>

                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                        Client Management
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        Create and manage client organizations and their administrators.
                    </p>

                </div>


                <button
                    onClick={() =>
                        setShowCreateModal(true)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >

                    <Plus size={18} />

                    Add Client

                </button>

            </div>


            {/* ==================================
                STATS
            =================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                <StatCard
                    icon={<Building2 size={20} />}
                    label="Total Clients"
                    value={totalClients}
                    description="Registered organizations"
                />

                <StatCard
                    icon={<CheckCircle2 size={20} />}
                    label="Active Clients"
                    value={activeClients}
                    description="Currently enabled"
                />

                <StatCard
                    icon={<Ban size={20} />}
                    label="Disabled Clients"
                    value={disabledClients}
                    description="Access disabled"
                />

                <StatCard
                    icon={<Building2 size={20} />}
                    label="Assigned Plants"
                    value={totalPlants}
                    description="Across all clients"
                />

            </div>


            {/* ==================================
                SEARCH + FILTER BAR
            =================================== */}

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
                            setSearch(e.target.value)
                        }
                        placeholder="Search clients, company, admin, email..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />

                </div>

            </div>


            {/* ==================================
                CLIENT LIST
            =================================== */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                <div className="px-5 py-4 border-b border-slate-200">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="font-semibold text-slate-900">
                                Clients
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                {filteredClients.length} client
                                {filteredClients.length !== 1
                                    ? "s"
                                    : ""} displayed
                            </p>

                        </div>

                    </div>

                </div>


                {/* DESKTOP TABLE */}

                <div className="hidden lg:block overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-50 border-b border-slate-200">

                            <tr>

                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Client
                                </th>

                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Client Admin
                                </th>

                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Plants
                                </th>

                                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Devices
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

                            {filteredClients.map(
                                (client) => (

                                    <tr
                                        key={client.id}
                                        className="hover:bg-slate-50 transition"
                                    >

                                        {/* CLIENT */}

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">

                                                    <Building2
                                                        size={19}
                                                        className="text-slate-600"
                                                    />

                                                </div>

                                                <div>

                                                    <div className="font-semibold text-slate-900">
                                                        {client.clientName}
                                                    </div>

                                                    <div className="text-xs text-slate-500 mt-0.5">
                                                        {client.id}
                                                    </div>

                                                </div>

                                            </div>

                                        </td>


                                        {/* ADMIN */}

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-2">

                                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">

                                                    <ShieldCheck
                                                        size={16}
                                                        className="text-blue-600"
                                                    />

                                                </div>

                                                <div>

                                                    <div className="text-sm font-medium text-slate-900">
                                                        {client.adminName}
                                                    </div>

                                                    <div className="text-xs text-slate-500">
                                                        {client.adminUsername}
                                                    </div>

                                                </div>

                                            </div>

                                        </td>


                                        {/* PLANTS */}

                                        <td className="px-5 py-4">

                                            <span className="text-sm font-semibold text-slate-900">
                                                {client.plants}
                                            </span>

                                        </td>


                                        {/* DEVICES */}

                                        <td className="px-5 py-4">

                                            <span className="text-sm font-semibold text-slate-900">
                                                {client.devices}
                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td className="px-5 py-4">

                                            <StatusBadge
                                                status={
                                                    client.status
                                                }
                                            />

                                        </td>


                                        {/* ACTIONS */}

                                        <td className="px-5 py-4">

                                            <div className="flex justify-end items-center gap-2">

                                                <ActionButton
                                                    title="View client"
                                                    onClick={() =>
                                                        handleViewClient(
                                                            client
                                                        )
                                                    }
                                                >
                                                    <Eye
                                                        size={16}
                                                    />
                                                </ActionButton>


                                                <ActionButton
                                                    title="Manage admin"
                                                >
                                                    <UserCog
                                                        size={16}
                                                    />
                                                </ActionButton>


                                                <ActionButton
                                                    title={
                                                        client.status ===
                                                            "Active"
                                                            ? "Disable client"
                                                            : "Enable client"
                                                    }
                                                    onClick={() =>
                                                        toggleClientStatus(
                                                            client.id
                                                        )
                                                    }
                                                >

                                                    <Power
                                                        size={16}
                                                    />

                                                </ActionButton>


                                                <ActionButton
                                                    title="More actions"
                                                >
                                                    <MoreVertical
                                                        size={16}
                                                    />
                                                </ActionButton>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>


                {/* MOBILE CARDS */}

                <div className="lg:hidden divide-y divide-slate-100">

                    {filteredClients.map(
                        (client) => (

                            <div
                                key={client.id}
                                className="p-5"
                            >

                                <div className="flex items-start justify-between gap-3">

                                    <div className="flex items-center gap-3">

                                        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">

                                            <Building2
                                                size={20}
                                                className="text-slate-600"
                                            />

                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-slate-900">
                                                {client.clientName}
                                            </h3>

                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {client.id}
                                            </p>

                                        </div>

                                    </div>

                                    <StatusBadge
                                        status={
                                            client.status
                                        }
                                    />

                                </div>


                                <div className="grid grid-cols-2 gap-3 mt-4">

                                    <InfoItem
                                        label="Plants"
                                        value={
                                            client.plants
                                        }
                                    />

                                    <InfoItem
                                        label="Devices"
                                        value={
                                            client.devices
                                        }
                                    />

                                    <InfoItem
                                        label="Admin"
                                        value={
                                            client.adminName
                                        }
                                    />

                                    <InfoItem
                                        label="Username"
                                        value={
                                            client.adminUsername
                                        }
                                    />

                                </div>


                                <div className="flex gap-2 mt-4">

                                    <button
                                        onClick={() =>
                                            handleViewClient(
                                                client
                                            )
                                        }
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >

                                        <Eye size={16} />

                                        View

                                    </button>


                                    <button
                                        onClick={() =>
                                            toggleClientStatus(
                                                client.id
                                            )
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >

                                        <Power size={16} />

                                        {client.status ===
                                            "Active"
                                            ? "Disable"
                                            : "Enable"}

                                    </button>

                                </div>

                            </div>

                        )
                    )}

                </div>


                {/* EMPTY */}

                {filteredClients.length === 0 && (

                    <div className="px-6 py-16 text-center">

                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">

                            <Search
                                size={22}
                                className="text-slate-400"
                            />

                        </div>

                        <h3 className="font-semibold text-slate-900">
                            No clients found
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Try changing your search.
                        </p>

                    </div>

                )}

            </div>


            {/* ==================================
                CREATE CLIENT MODAL
            =================================== */}

            {showCreateModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    <div
                        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
                        onClick={() =>
                            setShowCreateModal(false)
                        }
                    />


                    <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">

                        {/* MODAL HEADER */}

                        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-slate-900">
                                    Create Client
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Register a new client organization and client administrator.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setShowCreateModal(false)
                                }
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            onSubmit={
                                handleCreateClient
                            }
                            className="p-6"
                        >

                            {/* CLIENT INFORMATION */}

                            <div className="mb-7">

                                <SectionTitle
                                    icon={
                                        <Building2
                                            size={18}
                                        />
                                    }
                                    title="Client Information"
                                    description="Basic information about the client organization."
                                />


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

                                    <FormField
                                        label="Client Name"
                                        required
                                        value={
                                            form.clientName
                                        }
                                        onChange={(value) =>
                                            handleFormChange(
                                                "clientName",
                                                value
                                            )
                                        }
                                        placeholder="Enter client name"
                                    />


                                    <FormField
                                        label="Company Name"
                                        required
                                        value={
                                            form.companyName
                                        }
                                        onChange={(value) =>
                                            handleFormChange(
                                                "companyName",
                                                value
                                            )
                                        }
                                        placeholder="Enter registered company name"
                                    />


                                    <FormField
                                        label="Email"
                                        type="email"
                                        required
                                        value={
                                            form.email
                                        }
                                        onChange={(value) =>
                                            handleFormChange(
                                                "email",
                                                value
                                            )
                                        }
                                        placeholder="client@example.com"
                                    />


                                    <FormField
                                        label="Phone"
                                        value={
                                            form.phone
                                        }
                                        onChange={(value) =>
                                            handleFormChange(
                                                "phone",
                                                value
                                            )
                                        }
                                        placeholder="+91 XXXXX XXXXX"
                                    />


                                    <div className="md:col-span-2">

                                        <FormField
                                            label="Address"
                                            value={
                                                form.address
                                            }
                                            onChange={(value) =>
                                                handleFormChange(
                                                    "address",
                                                    value
                                                )
                                            }
                                            placeholder="Client office address"
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* CLIENT ADMIN */}

                            <div className="mb-7">

                                <SectionTitle
                                    icon={
                                        <ShieldCheck
                                            size={18}
                                        />
                                    }
                                    title="Client Administrator"
                                    description="Credentials and contact details for the client administrator."
                                />


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

                                    <FormField
                                        label="Admin Name"
                                        required
                                        value={
                                            form.adminName
                                        }
                                        onChange={(value) =>
                                            handleFormChange(
                                                "adminName",
                                                value
                                            )
                                        }
                                        placeholder="Client Admin name"
                                    />


                                    <FormField
                                        label="Admin Username"
                                        required
                                        value={
                                            form.adminUsername
                                        }
                                        onChange={(value) =>
                                            handleFormChange(
                                                "adminUsername",
                                                value
                                            )
                                        }
                                        placeholder="clientadmin01"
                                    />


                                    <FormField
                                        label="Admin Email"
                                        type="email"
                                        required
                                        value={
                                            form.adminEmail
                                        }
                                        onChange={(value) =>
                                            handleFormChange(
                                                "adminEmail",
                                                value
                                            )
                                        }
                                        placeholder="admin@example.com"
                                    />


                                    <div>

                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Status
                                        </label>

                                        <select
                                            value={
                                                form.status
                                            }
                                            onChange={(e) =>
                                                handleFormChange(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                        >

                                            <option value="Active">
                                                Active
                                            </option>

                                            <option value="Disabled">
                                                Disabled
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            </div>


                            {/* NOTICE */}

                            <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 mb-6">

                                <div className="flex gap-3">

                                    <ShieldCheck
                                        size={19}
                                        className="text-blue-600 mt-0.5 shrink-0"
                                    />

                                    <div>

                                        <p className="text-sm font-semibold text-blue-900">
                                            Client administration
                                        </p>

                                        <p className="text-xs text-blue-700 mt-1 leading-5">
                                            After creation, plants and devices can be assigned to this client through the Assignments section.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* BUTTONS */}

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm(
                                            emptyForm
                                        )
                                        setShowCreateModal(
                                            false
                                        )
                                    }}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                                >

                                    <Plus size={17} />

                                    Create Client

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* ==================================
                CLIENT DETAILS MODAL
            =================================== */}

            {showDetails &&
                selectedClient && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                        <div
                            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
                            onClick={() =>
                                setShowDetails(false)
                            }
                        />


                        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

                            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

                                <div>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Client Details
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {selectedClient.id}
                                    </p>

                                </div>


                                <button
                                    onClick={() =>
                                        setShowDetails(
                                            false
                                        )
                                    }
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100"
                                >

                                    <X size={20} />

                                </button>

                            </div>


                            <div className="p-6">

                                <div className="flex items-center gap-4 mb-6">

                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">

                                        <Building2
                                            size={25}
                                            className="text-slate-600"
                                        />

                                    </div>

                                    <div>

                                        <h3 className="text-lg font-bold text-slate-900">
                                            {selectedClient.clientName}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {selectedClient.companyName}
                                        </p>

                                    </div>

                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <DetailItem
                                        icon={
                                            <Mail size={17} />
                                        }
                                        label="Email"
                                        value={
                                            selectedClient.email
                                        }
                                    />

                                    <DetailItem
                                        icon={
                                            <Phone size={17} />
                                        }
                                        label="Phone"
                                        value={
                                            selectedClient.phone ||
                                            "Not provided"
                                        }
                                    />

                                    <DetailItem
                                        icon={
                                            <MapPin size={17} />
                                        }
                                        label="Address"
                                        value={
                                            selectedClient.address ||
                                            "Not provided"
                                        }
                                    />

                                    <DetailItem
                                        icon={
                                            <Users size={17} />
                                        }
                                        label="Client Admin"
                                        value={
                                            selectedClient.adminName
                                        }
                                    />

                                    <DetailItem
                                        icon={
                                            <ShieldCheck size={17} />
                                        }
                                        label="Admin Username"
                                        value={
                                            selectedClient.adminUsername
                                        }
                                    />

                                    <DetailItem
                                        icon={
                                            <Mail size={17} />
                                        }
                                        label="Admin Email"
                                        value={
                                            selectedClient.adminEmail
                                        }
                                    />

                                </div>


                                <div className="grid grid-cols-2 gap-4 mt-5">

                                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">

                                        <p className="text-xs text-slate-500">
                                            Assigned Plants
                                        </p>

                                        <p className="text-2xl font-bold text-slate-900 mt-1">
                                            {selectedClient.plants}
                                        </p>

                                    </div>


                                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">

                                        <p className="text-xs text-slate-500">
                                            Assigned Devices
                                        </p>

                                        <p className="text-2xl font-bold text-slate-900 mt-1">
                                            {selectedClient.devices}
                                        </p>

                                    </div>

                                </div>


                                <div className="flex justify-between items-center mt-6 pt-5 border-t border-slate-200">

                                    <StatusBadge
                                        status={
                                            selectedClient.status
                                        }
                                    />

                                    <button
                                        onClick={() =>
                                            setShowDetails(
                                                false
                                            )
                                        }
                                        className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                                    >
                                        Close
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

        </div>
    )
}


// ==========================================
// STAT CARD
// ==========================================

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


// ==========================================
// STATUS BADGE
// ==========================================

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


// ==========================================
// ACTION BUTTON
// ==========================================

const ActionButton = ({
    children,
    title,
    onClick
}) => {

    return (

        <button
            type="button"
            title={title}
            onClick={onClick}
            className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition"
        >

            {children}

        </button>
    )
}


// ==========================================
// INFO ITEM
// ==========================================

const InfoItem = ({
    label,
    value
}) => {

    return (

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">

            <p className="text-xs text-slate-500">
                {label}
            </p>

            <p className="text-sm font-semibold text-slate-900 mt-1 truncate">
                {value}
            </p>

        </div>
    )
}


// ==========================================
// SECTION TITLE
// ==========================================

const SectionTitle = ({
    icon,
    title,
    description
}) => {

    return (

        <div className="flex items-start gap-3">

            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">

                {icon}

            </div>

            <div>

                <h3 className="font-semibold text-slate-900">
                    {title}
                </h3>

                <p className="text-xs text-slate-500 mt-0.5">
                    {description}
                </p>

            </div>

        </div>
    )
}


// ==========================================
// FORM FIELD
// ==========================================

const FormField = ({
    label,
    required,
    value,
    onChange,
    placeholder,
    type = "text"
}) => {

    return (

        <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">

                {label}

                {required && (
                    <span className="text-red-500 ml-1">
                        *
                    </span>
                )}

            </label>

            <input
                type={type}
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder={placeholder}
                required={required}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />

        </div>
    )
}


// ==========================================
// DETAIL ITEM
// ==========================================

const DetailItem = ({
    icon,
    label,
    value
}) => {

    return (

        <div className="rounded-xl border border-slate-200 p-4">

            <div className="flex items-center gap-2 text-slate-400">

                {icon}

                <span className="text-xs">
                    {label}
                </span>

            </div>

            <p className="text-sm font-semibold text-slate-900 mt-2 break-words">
                {value}
            </p>

        </div>
    )
}


export default SuperAdminClients