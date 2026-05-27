
import { Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import EnergyGeneration from "./pages/EnergyGeneration"
import Irradiance from "./pages/Irradiance"
import CUFAnalysis from "./pages/CUFAnalysis"
import PRAnalysis from "./pages/PRAnalysis"
import HealthMonitoring from "./pages/HealthMonitoring"
import DeviceSelection from "./pages/DeviceSelection"
import AdminPanel from "./pages/AdminPanel"
import Login from "./pages/Login"

function App() {

  return (

    <Routes>

      {/* LOGIN PAGE */}

      <Route

        path="/login"

        element={<Login />}

      />

      {/* DASHBOARD */}

      <Route

        path="/"

        element={

          localStorage.getItem("token")

            ? <Dashboard />

            : <Login />

        }

      />

      {/* ENERGY GENERATION */}

      <Route

        path="/energy-generation"

        element={

          localStorage.getItem("token")

            ? <EnergyGeneration />

            : <Login />

        }

      />

      {/* IRRADIANCE */}

      <Route

        path="/irradiance"

        element={

          localStorage.getItem("token")

            ? <Irradiance />

            : <Login />

        }

      />

      {/* CUF ANALYSIS */}

      <Route

        path="/cuf-analysis"

        element={

          localStorage.getItem("token")

            ? <CUFAnalysis />

            : <Login />

        }

      />

      {/* PR ANALYSIS */}

      <Route

        path="/pr-analysis"

        element={

          localStorage.getItem("token")

            ? <PRAnalysis />

            : <Login />

        }

      />

      {/* HEALTH MONITORING */}

      <Route

        path="/health-monitoring"

        element={

          localStorage.getItem("token")

            ? <HealthMonitoring />

            : <Login />

        }

      />

      {/* DEVICE SELECTION */}

      <Route

        path="/device-selection"

        element={

          localStorage.getItem("token")

            ? <DeviceSelection />

            : <Login />

        }

      />

      {/* ADMIN PANEL */}

      <Route

        path="/admin"

        element={

          localStorage.getItem("token")

            ? <AdminPanel />

            : <Login />

        }

      />

    </Routes>

  )
}

export default App
