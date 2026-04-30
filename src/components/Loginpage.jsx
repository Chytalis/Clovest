// src/components/Loginpage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import heroBg from "../assets/herobg.png";

export default function LoginPage() {
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();
  const [show, setShow]   = useState(false);
  const [form, setForm]   = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = login(form.email, form.password);
    if (role === "admin") navigate("/admin");
    else if (role === "user") navigate("/");
    // kalau null, error sudah di-set di AuthContext
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 font-['Plus_Jakarta_Sans']">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 w-full max-w-md bg-[#1a2e52]/85 backdrop-blur-md rounded-2xl px-8 py-10 shadow-2xl border border-white/10">
        <h1 className="text-white text-3xl font-extrabold text-center tracking-widest uppercase mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
          Selamat Datang
        </h1>
        <p className="text-white/60 text-sm text-center mb-8">
          Harap login atau daftarkan akun terlebih dahulu
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <p className="text-white/70 text-sm -mb-2">Sudah memiliki akun?</p>

          <input
            type="text"
            placeholder="Username or Email"
            value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(""); }}
            className="w-full bg-[#e8edf5] text-gray-700 placeholder-gray-400 text-sm rounded-lg px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(""); }}
              className="w-full bg-[#e8edf5] text-gray-700 placeholder-gray-400 text-sm rounded-lg px-4 py-3.5 pr-11 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
              {show
                ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              }
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-400 text-xs -mt-2 flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </p>
          )}

          <a href="#lupa-password" className="text-blue-400 hover:text-blue-300 text-xs -mt-3 w-fit transition">Lupa Password</a>

          <button type="submit" className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.98] text-white font-semibold text-sm py-3.5 rounded-lg transition-all duration-200">
            Login
          </button>
        </form>

        <p className="text-white/50 text-xs text-center mt-6">
          Belum memiliki akun?{" "}
          <a href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">Daftar Sekarang</a>
        </p>
      </div>
    </div>
  );
}