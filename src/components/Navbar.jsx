import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#/" },
  { label: "Dashboard", href: "#/dashboard" },
  { label: "Donasi", href: "#/donasi" },
  { label: "Tentang Kami", href: "#/tentang" },
  { label: "Kontak", href: "#/kontak" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#0d1f3c]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-2" : "bg-[#0d1f3c] py-3"
    }`}>
      <div className="h-[2px] w-full absolute top-0 left-0 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group ">
        <img
          src={logo}
          alt="Clovest Logo"
          className="w-12 h-12 object-fit"
        />
         
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-xl tracking-wide" style={{ fontFamily: "'Sora', sans-serif" }}>
              Clov<span className="text-[#3f6894]">est</span>
            </span>
            <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Wear. Care. Share.</span>
          </div>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.label)}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                activeLink === link.label ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {activeLink === link.label && (
                <span className="absolute inset-0 bg-white/8 rounded-lg border border-white/10" />
              )}
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-300" />
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            /* ── LOGGED IN ── */
            <>
              {/* Notifikasi */}
              <button className="w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1652C7] rounded-full" />
              </button>

              {/* Settings */}
              <button className="w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Avatar + Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1652C7&color=fff`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#00A8FF]"
                  />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-white text-xs font-semibold">{user.name}</span>
                    <span className="text-white/40 text-[10px]">{user.email}</span>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-[#0d1f3c] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    <a href="#/profil" className="flex items-center gap-2 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Profil Saya
                    </a>
                    <a href="#/riwayat" className="flex items-center gap-2 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Riwayat Donasi
                    </a>
                    <div className="h-px bg-white/10 mx-3" />
                    <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-all">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* ── GUEST ── */
            <>
              <a href="#/login" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg border border-white/20 hover:border-[#00A8FF] hover:bg-white/5 transition-all duration-300 group">
                Login
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#/register" className="relative flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-lg overflow-hidden group">
                <span className="absolute inset-0 bg-[#1652C7] group-hover:bg-[#00A8FF] transition-colors duration-300" />
                <span className="relative flex items-center gap-2">
                  Daftar
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </span>
              </a>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]" onClick={() => setMobileOpen(!mobileOpen)}>
          <span className={`h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`} />
          <span className={`h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 w-0" : "w-4"}`} />
          <span className={`h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pt-2 pb-5 border-t border-white/10 mt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => { setActiveLink(link.label); setMobileOpen(false); }}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeLink === link.label ? "bg-white/10 text-white border-l-2 border-[#00A8FF]" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              {link.label}
            </a>
          ))}
          {user ? (
            <button onClick={logout} className="mt-3 w-full text-center py-2.5 text-sm font-semibold text-red-400 rounded-lg border border-red-400/30">
              Logout
            </button>
          ) : (
            <div className="flex gap-2 mt-3">
              <a href="#/login" className="flex-1 text-center py-2.5 text-sm font-semibold text-white rounded-lg border border-white/20">Login</a>
              <a href="#/register" className="flex-1 text-center py-2.5 text-sm font-semibold text-white rounded-lg bg-[#00A8FF]">Daftar</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}