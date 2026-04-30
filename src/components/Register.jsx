// src/components/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../assets/herobg.png";

export default function Register() {
  const navigate = useNavigate();
  const [show, setShow]         = useState({ password: false, confirm: false });
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);
  const [form, setForm]         = useState({
    nama: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nama || !form.email || !form.password || !form.confirm) {
      setError("Semua field harus diisi.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }

    // TODO: sambungkan ke Supabase auth di sini
    // Sementara simulasi sukses
    setSuccess(true);
    setTimeout(() => navigate("/login"), 2000);
  };

  const EyeIcon = ({ open }) => open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 font-['Plus_Jakarta_Sans']">
      {/* Background */}
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/60" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#1a2e52]/90 backdrop-blur-md rounded-2xl px-8 py-10 shadow-2xl border border-white/10">

        {/* Header */}
        <h1
          className="text-white text-3xl font-bold text-center mb-2"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Buat Akun
        </h1>
        <p className="text-white/60 text-sm text-center mb-8">
          Masukkan Biodata Diri Anda
        </p>

        {/* Success toast */}
        {success && (
          <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs rounded-lg px-4 py-3 mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Akun berhasil dibuat! Mengarahkan ke halaman login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Nama Lengkap */}
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={form.nama}
            onChange={handleChange}
            className="w-full bg-[#e8edf5] text-gray-700 placeholder-gray-400 text-sm rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-[#e8edf5] text-gray-700 placeholder-gray-400 text-sm rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={show.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-[#e8edf5] text-gray-700 placeholder-gray-400 text-sm rounded-xl px-4 py-3.5 pr-11 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, password: !s.password }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <EyeIcon open={show.password} />
            </button>
          </div>

          {/* Konfirmasi Password */}
          <div className="relative">
            <input
              type={show.confirm ? "text" : "password"}
              name="confirm"
              placeholder="Konfirmasi Password"
              value={form.confirm}
              onChange={handleChange}
              className="w-full bg-[#e8edf5] text-gray-700 placeholder-gray-400 text-sm rounded-xl px-4 py-3.5 pr-11 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <EyeIcon open={show.confirm} />
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-xs flex items-center gap-1.5 -mt-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={success}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.98] disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 mt-1"
          >
            Daftar
          </button>
        </form>

        {/* Login link */}
        <p className="text-white/50 text-xs text-center mt-6">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
            Login Sekarang
          </a>
        </p>
      </div>
    </div>
  );
}