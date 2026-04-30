// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// ── DAFTAR AKUN ──
// Tambah akun baru di sini
const ACCOUNTS = [
  {
    email: "admin@clovest.com",
    password: "admin123",
    role: "admin",
    name: "Admin Bank Fashion",
    avatar: "",
  },
  {
    email: "user@gmail.com",
    password: "user123",
    role: "user",
    name: "User 123",
    avatar: "",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(true); // ← tambah ini

  useEffect(() => {
    const saved = localStorage.getItem("clovest_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false); // ← selesai baca localStorage
  }, []);

  const login = (email, password) => {
    const found = ACCOUNTS.find(
      (a) =>
        a.email.toLowerCase() === email.toLowerCase() &&
        a.password === password
    );
    if (found) {
      const userData = { name: found.name, email: found.email, role: found.role, avatar: found.avatar };
      localStorage.setItem("clovest_user", JSON.stringify(userData));
      setUser(userData);
      setError("");
      return found.role; // "admin" | "user"
    } else {
      setError("Email atau password salah.");
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("clovest_user");
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}