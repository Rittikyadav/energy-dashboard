import { Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import EnergyGeneration from "./pages/EnergyGeneration"
import Irradiance from "./pages/Irradiance"
import CUFAnalysis from "./pages/CUFAnalysis"
import PRAnalysis from "./pages/PRAnalysis"
import HealthMonitoring from "./pages/HealthMonitoring"
import DeviceSelection from "./pages/DeviceSelection"

import AdminPanel from "./pages/AdminPanel"
import ClientAdminPanel from "./pages/ClientAdminPanel"
import PlantAdminPanel from "./pages/PlantAdminPanel"

import Login from "./pages/Login"


// ==========================================
// AUTH HELPERS
// ==========================================

const getUser = () => {

    try {

        return JSON.parse(
            localStorage.getItem("user") || "null"
        )

    } catch {

        return null
    }
}


const isAuthenticated = () => {

    return Boolean(
        localStorage.getItem("token")
    )
}


// ==========================================
// ROLE HOME
// ==========================================

const getHomeForRole = () => {

    const user = getUser()

    if (!user) {
        return "/login"
    }


    // ======================================
    // SUPER ADMIN
    // ======================================

    if (
        user.role === "super_admin" ||
        Number(user.usertype) === 900
    ) {

        return "/admin"
    }


    // ======================================
    // CLIENT ADMIN
    // ======================================

    if (
        user.role === "client_admin"
    ) {

        return "/client-admin"
    }


    // ======================================
    // PLANT ADMIN
    // ======================================

    if (
        user.role === "plant_admin"
    ) {

        return "/plant-admin"
    }


    // ======================================
    // USER ADMIN
    // ======================================

    if (
        user.role === "user_admin"
    ) {

        return "/device-selection"
    }


    // ======================================
    // NORMAL USER
    // ======================================

    return "/device-selection"
}


// ==========================================
// ENTRY PAGE
// ==========================================

function EntryPage() {

    if (!isAuthenticated()) {

        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    return (
        <Navigate
            to={getHomeForRole()}
            replace
        />
    )
}


// ==========================================
// PROTECTED PAGE
// ==========================================

function ProtectedPage({ children }) {

    if (!isAuthenticated()) {

        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    return children
}


// ==========================================
// KPI DASHBOARD ACCESS
// ==========================================

function KpiDashboardPage({ children }) {

    if (!isAuthenticated()) {

        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    const user = getUser()

    const canViewKpiDashboard =
        user?.role === "user" ||
        user?.role === "user_admin"

    if (!canViewKpiDashboard) {

        return (
            <Navigate
                to={getHomeForRole()}
                replace
            />
        )
    }

    return children
}


// ==========================================
// SUPER ADMIN ONLY
// ==========================================

function SuperAdminOnlyPage({
    children
}) {

    if (!isAuthenticated()) {

        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    const user = getUser()

    const isSuperAdmin =
        user?.role === "super_admin" ||
        Number(user?.usertype) === 900


    if (!isSuperAdmin) {

        return (
            <Navigate
                to={getHomeForRole()}
                replace
            />
        )
    }

    return children
}


// ==========================================
// CLIENT ADMIN ONLY
// ==========================================

function ClientAdminOnlyPage({
    children
}) {

    if (!isAuthenticated()) {

        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    const user = getUser()


    if (
        user?.role !== "client_admin"
    ) {

        return (
            <Navigate
                to={getHomeForRole()}
                replace
            />
        )
    }

    return children
}


// ==========================================
// PLANT ADMIN ONLY
// ==========================================

function PlantAdminOnlyPage({
    children
}) {

    if (!isAuthenticated()) {

        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    const user = getUser()


    if (
        user?.role !== "plant_admin"
    ) {

        return (
            <Navigate
                to={getHomeForRole()}
                replace
            />
        )
    }

    return children
}


// ==========================================
// USER ADMIN ONLY
// ==========================================

function UserAdminOnlyPage({
    children
}) {

    if (!isAuthenticated()) {

        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    const user = getUser()


    if (
        user?.role !== "user_admin"
    ) {

        return (
            <Navigate
                to={getHomeForRole()}
                replace
            />
        )
    }

    return children
}


// ==========================================
// APP
// ==========================================

function App() {

    return (

        <Routes>


            {/* =====================================
                LOGIN
            ====================================== */}

            <Route
                path="/login"
                element={
                    <Login />
                }
            />


            {/* =====================================
                MAIN ENTRY
            ====================================== */}

            <Route
                path="/"
                element={
                    <EntryPage />
                }
            />


            {/* =====================================
                DASHBOARD
            ====================================== */}

            <Route
                path="/dashboard"
                element={
                    <KpiDashboardPage>
                        <Dashboard />
                    </KpiDashboardPage>
                }
            />


            {/* =====================================
                DEVICE SELECTION
            ====================================== */}

            <Route
                path="/device-selection"
                element={
                    <ProtectedPage>
                        <DeviceSelection />
                    </ProtectedPage>
                }
            />


            {/* =====================================
                ENERGY GENERATION
            ====================================== */}

            <Route
                path="/energy-generation"
                element={
                    <ProtectedPage>
                        <EnergyGeneration />
                    </ProtectedPage>
                }
            />


            {/* =====================================
                IRRADIANCE
            ====================================== */}

            <Route
                path="/irradiance"
                element={
                    <ProtectedPage>
                        <Irradiance />
                    </ProtectedPage>
                }
            />


            {/* =====================================
                CUF ANALYSIS
            ====================================== */}

            <Route
                path="/cuf-analysis"
                element={
                    <ProtectedPage>
                        <CUFAnalysis />
                    </ProtectedPage>
                }
            />


            {/* =====================================
                PR ANALYSIS
            ====================================== */}

            <Route
                path="/pr-analysis"
                element={
                    <ProtectedPage>
                        <PRAnalysis />
                    </ProtectedPage>
                }
            />


            {/* =====================================
                HEALTH MONITORING
            ====================================== */}

            <Route
                path="/health-monitoring"
                element={
                    <ProtectedPage>
                        <HealthMonitoring />
                    </ProtectedPage>
                }
            />


            {/* =====================================
                SUPER ADMIN PANEL
            ====================================== */}

            <Route
                path="/admin"
                element={
                    <SuperAdminOnlyPage>
                        <AdminPanel />
                    </SuperAdminOnlyPage>
                }
            />


            {/* =====================================
                CLIENT ADMIN PANEL
            ====================================== */}

            <Route
                path="/client-admin"
                element={
                    <ClientAdminOnlyPage>
                        <ClientAdminPanel />
                    </ClientAdminOnlyPage>
                }
            />


            {/* =====================================
                PLANT ADMIN PANEL
            ====================================== */}

            <Route
                path="/plant-admin"
                element={
                    <PlantAdminOnlyPage>
                        <PlantAdminPanel />
                    </PlantAdminOnlyPage>
                }
            />


            {/* =====================================
                USER ADMIN PANEL
            ====================================== */}

            <Route
                path="/user-admin"
                element={
                    <UserAdminOnlyPage>
                        <Navigate
                            to="/device-selection"
                            replace
                        />
                    </UserAdminOnlyPage>
                }
            />


            {/* =====================================
                UNKNOWN ROUTES
            ====================================== */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

        </Routes>
    )
}


export default App
