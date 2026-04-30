// src/pages/AdminDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ── DATA STATIS ──
const initialForms = [
  {
    id: 1,
    donatur: "Lee Jaein",
    penjemputan_tgl: "15 April 2026",
    penjemputan_loc: "Jln Kenanga...",
    items: ["3 Atasan", "4 Bawahan"],
    berat: "4 KG",
    telepon: "+62 8795678123",
    kurir: "J&T EXPRESS",
    no_kurir: "J&T 987654321",
    foto: ["Atasan.pdf", "Bawahan.pdf"],
    status: "menunggu",
  },
  {
    id: 2,
    donatur: "Park Yoonho",
    penjemputan_tgl: "25 April 2026",
    penjemputan_loc: "Jalan Melati...",
    items: ["3 Atasan"],
    berat: "1,5 KG",
    telepon: "+62 82109872345",
    kurir: "J&T EXPRESS",
    no_kurir: "J&T 987654321",
    foto: ["Atasan.pdf"],
    status: "menunggu",
  },
];

const historyData = [
  { donatur: "Kim Taeri",     tgl: "01-04-2006", telepon: "+62678901234", berat: "8 KG",  jumlah: "6 Barang", status: "Diterima" },
  { donatur: "Lee Jongsuk",   tgl: "06-04-2006", telepon: "+62234567901", berat: "2 KG",  jumlah: "4 Barang", status: "Ditolak"  },
  { donatur: "Jo Soomin",     tgl: "06-04-2006", telepon: "+62157891235", berat: "1 KG",  jumlah: "2 Barang", status: "Diterima" },
  { donatur: "Park Solomon",  tgl: "07-04-2006", telepon: "+62211678903", berat: "1 KG",  jumlah: "2 Barang", status: "Diterima" },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const [tab, setTab]     = useState("formulir");
  const [forms, setForms] = useState(initialForms);

  const handleLogout = () => { logout(); navigate("/login"); };

  const handleValidasi = (id) =>
    setForms((prev) => prev.map((f) => f.id === id ? { ...f, status: "diterima" } : f));

  const handleTolak = (id) =>
    setForms((prev) => prev.map((f) => f.id === id ? { ...f, status: "ditolak" } : f));

  const waiting   = forms.filter((f) => f.status === "menunggu").length;
  const validated = forms.filter((f) => f.status === "diterima").length;
  const rejected  = forms.filter((f) => f.status === "ditolak").length;

  return (
    <div className="min-h-screen bg-[#e8ecf0] font-['Plus_Jakarta_Sans']">

      {/* ── TOP NAV ── */}
      <nav className="bg-[#0d1f3c] px-6 py-3 flex items-center justify-between shadow-lg">
        <span className="text-white font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>
          Admin Bank Fashion
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
          {/* Notif */}
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          {/* Settings */}
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { count: validated, label: "Formulir Tervalidasi\nBulan Ini", border: "border-t-4 border-blue-500" },
            { count: rejected,  label: "Formulir Ditolak\nBulan Ini",     border: "border-t-4 border-red-500" },
            { count: waiting,   label: "Formulir Menunggu\nValidasi",      border: "border-t-4 border-gray-400" },
          ].map((card, i) => (
            <div key={i} className={`bg-[#dde1e7] rounded-xl p-5 text-center shadow-sm ${card.border}`}>
              <div className="text-4xl font-bold text-gray-800 mb-1">{card.count}</div>
              <div className="text-gray-600 text-xs leading-snug whitespace-pre-line">{card.label}</div>
            </div>
          ))}
        </div>

        {/* ── TAB ── */}
        <div className="flex items-center bg-gray-300 rounded-full w-fit mb-8 overflow-hidden">
          {["formulir", "pencairan"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-8 py-2 text-sm font-semibold rounded-full capitalize transition-all duration-200 ${
                tab === t ? "bg-[#2563eb] text-white shadow" : "text-gray-600"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "formulir" ? (
          <>
            {/* ── FORMULIR MENUNGGU ── */}
            <h2 className="text-gray-800 font-bold text-lg mb-4">Formulir Menunggu Validasi</h2>

            <div className="flex flex-col gap-4 mb-10">
              {forms.filter((f) => f.status === "menunggu").length === 0 ? (
                <div className="bg-white rounded-2xl p-6 text-center text-gray-400 text-sm shadow-sm">
                  Tidak ada formulir yang menunggu validasi.
                </div>
              ) : (
                forms.filter((f) => f.status === "menunggu").map((f) => (
                  <FormCard key={f.id} form={f} onValidasi={handleValidasi} onTolak={handleTolak} />
                ))
              )}
            </div>

            {/* ── RIWAYAT ── */}
            <h2 className="text-gray-800 font-bold text-lg mb-4">Riwayat Validasi Formulir Bulan Ini</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Donatur","Tanggal","No Telepon","Estimasi Berat","Jumlah Barang","Status"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-gray-700 font-semibold text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-gray-700">{row.donatur}</td>
                      <td className="px-4 py-3 text-gray-500">{row.tgl}</td>
                      <td className="px-4 py-3 text-gray-500">{row.telepon}</td>
                      <td className="px-4 py-3 text-gray-500">{row.berat}</td>
                      <td className="px-4 py-3 text-gray-500">{row.jumlah}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          row.status === "Diterima"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400 shadow-sm">
            Fitur Pencairan belum tersedia.
          </div>
        )}
      </div>
    </div>
  );
}

// ── FORM CARD ──
function FormCard({ form, onValidasi, onTolak }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border-l-4 border-gray-200">
      <div className="grid grid-cols-3 gap-4 mb-4">

        {/* Kolom 1 */}
        <div className="flex flex-col gap-3">
          <InfoBlock label="Donatur" icon="user" value={form.donatur} />
          <InfoBlock label="Penjemputan" icon="clock" value={form.penjemputan_tgl} />
          <InfoBlock label="Penjemputan" icon="pin" value={form.penjemputan_loc} />
        </div>

        {/* Kolom 2 */}
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-gray-400 text-xs mb-1">Item Donasi</p>
            <ul className="text-gray-700 text-sm list-disc list-inside">
              {form.items.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Estimasi Berat</p>
            <p className="text-gray-700 text-sm font-semibold">{form.berat}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Nomor Telepon</p>
            <p className="text-gray-700 text-sm">{form.telepon}</p>
          </div>
        </div>

        {/* Kolom 3 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block" />
              Menunggu Validasi
            </span>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Kurir</p>
            <p className="text-gray-700 text-sm font-semibold">{form.kurir}</p>
            <p className="text-gray-400 text-xs">{form.no_kurir}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Foto</p>
            <div className="flex flex-col gap-1">
              {form.foto.map((f, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded w-fit">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => onTolak(form.id)}
          className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition"
        >
          Tolak
        </button>
        <button
          onClick={() => onValidasi(form.id)}
          className="px-4 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold rounded-lg transition"
        >
          Validasi Form
        </button>
      </div>
    </div>
  );
}

function InfoBlock({ label, icon, value }) {
  const icons = {
    user:  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    pin:   <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
  };
  return (
    <div>
      <p className="text-gray-400 text-xs mb-0.5">{label}</p>
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 text-gray-400 flex-shrink-0">
          {icons[icon]}
        </svg>
        <p className="text-gray-700 text-sm">{value}</p>
      </div>
    </div>
  );
}