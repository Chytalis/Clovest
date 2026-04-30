import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
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

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />; // ← /login bukan #login
  return children;
}

function Layout() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <>
      {!isAdmin && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/"         element={<Home />} />
        <Route path="/login"    element={<Loginpage />} />
        <Route path="/tentang"  element={<AboutUs />} />
        <Route path="/register" element={<Register />} />

        {/* Login required */}
        <Route path="/dashboard" element={
          <RequireAuth><UserDashboard /></RequireAuth>
        } />
        <Route path="/donasi" element={
          <RequireAuth><DonasiPage /></RequireAuth>
        } />

        {/* Admin only */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}