import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Loginpage from "./components/Loginpage";
import AboutUs from "./components/AboutUs";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import DonasiPage from "./pages/DonasiPages";
import ProtectedRoute from "./components/Protectedroute";
import Register from "./components/Register";

// Halaman yang butuh login (user biasa)
// Kalau belum login, redirect ke /login
function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // ← tunggu, jangan redirect dulu
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function Layout() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <>
      {/* Navbar & Footer disembunyikan di halaman admin */}
      {!isAdmin && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/tentang" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />

        {/* Login required — user biasa */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <UserDashboard />
            </RequireAuth>
          
        }

        />

        
        <Route path="/donasi" element={
          <RequireAuth>
            <DonasiPage />
          </RequireAuth>

        } 

        />

        {/* Admin only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
