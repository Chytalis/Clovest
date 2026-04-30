// src/pages/UserDashboard.jsx
import { useAuth } from "../context/AuthContext";
import bersih from "../assets/bersihdanwangi.png";
import kategoribrg from "../assets/kategoribarang.png";
import layak from "../assets/layakpakai.png";
import lengkap from "../assets/lengkaprapi.png";
import tdkberbahaya from "../assets/tdkberbahaya.png";
import milik from "../assets/milik.png";

const pricelist = [
  { item: "Kaos (Cotton, Polyester)", harga: "Rp 15.000 / kg" },
  { item: "Kemeja & Blus",            harga: "Rp 22.000 / kg" },
  { item: "Celana & Rok",             harga: "Rp 25.000 / kg" },
  { item: "Denim Premium",            harga: "Rp 35.000 / kg" },
  { item: "Outerwear (Jaket, Sweater)", harga: "Rp 30.000 / kg" },
  { item: "Tas & Aksesoris",          harga: "Rp 20.000 / kg" },
];

const syaratBarang = [
  {
    title: "Bersih & Wangi",
    desc: "Pakaian sudah dicuci, tidak berbau, dan bebas dari noda membandel.",
    img: bersih,
  },
  {
    title: "Kategori Barang",
    desc: "Barang termasuk kategori tekstil, seperti pakaian, kain, atau sisa bahan jahitan.",
    img: kategoribrg,
  },
  {
    title: "Layak Pakai",
    desc: "Tidak robek, tidak luntur, dan masih dalam kondisi baik untuk digunakan atau diolah kembali.",
    img: layak,
  },
  {
    title: "Lengkap & Rapi",
    desc: "Tidak ada bagian yang hilang (kancing, resleting) dan sudah dilipat dengan rapi.",
    img: lengkap,
  },
  {
    title: "Tidak Berbahaya",
    desc: "Barang tidak mengandung bahan berbahaya atau kotoran yang sulit dibersihkan.",
    img: tdkberbahaya,
    isWarning: true,
  },
  {
    title: "Milik Pribadi",
    desc: "Barang yang disumbangkan harus milik pribadi dan tidak sedang dalam sengketa atau kepemilikan bersama.",
    img: milik,
  },
];

const statusSteps = [
  {
    label: "Pengecekan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: "Penjemputan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4-4 4 4M12 13V3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
      </svg>
    ),
  },
  {
    label: "Validasi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Pencairan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

// Ikon Clovest kecil
const ClovestIcon = ({ color = "#2563eb" }) => (
  <svg viewBox="0 0 32 32" width="36" height="36" fill={color}>
    <path d="M18.875,7.604c0.083-0.008,0.289-0.05,0.401-0.274l1.684-3.368L20,3l-3.546,1.773l1.975,2.633C18.58,7.607,18.79,7.608,18.875,7.604z"/>
    <path d="M13.125,7.604c0.082,0.004,0.294,0.004,0.446-0.198l1.974-2.632L12,3l-0.961,0.961l1.684,3.368C12.836,7.554,13.042,7.596,13.125,7.604z"/>
    <path d="M30.586,9.586l-3.828-3.828C25.632,4.632,24.106,4,22.515,4h-0.456l-1.888,3.776c-0.233,0.468-0.685,0.775-1.205,0.823c-0.047,0.004-0.094,0.006-0.14,0.006c-0.47,0-0.91-0.218-1.196-0.599L16,5.833l-1.629,2.173C14.056,8.425,13.56,8.64,13.034,8.6c-0.521-0.048-0.972-0.355-1.205-0.823L9.941,4H9.485C7.894,4,6.368,4.632,5.243,5.757L1.414,9.586c-0.781,0.781-0.781,2.047,0,2.828l2.172,2.172c0.781,0.781,2.047,0.781,2.828,0L7,14L5.281,27.752C5.132,28.946,6.063,30,7.266,30h17.469c1.203,0,2.134-1.054,1.985-2.248L25,14l0.586,0.586c0.781,0.781,2.047,0.781,2.828,0l2.172-2.172C31.367,11.633,31.367,10.367,30.586,9.586z"/>
  </svg>
);

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="bg-[#e8ecf0] min-h-screen font-['Plus_Jakarta_Sans']">

      {/* ── SALDO SECTION ── */}
      <div className="max-w-2xl mx-auto px-4 pt-10 pb-6">
        <h2 className="text-gray-800 font-bold text-xl mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
          Selamat Datang, {user?.name || "User"} !
        </h2>
        <p className="text-gray-500 text-sm mb-6">Berikut ringkasan aktivitas donasi anda</p>

        {/* Saldo cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Saldo Digital */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-[#2563eb] flex flex-col items-center gap-2">
            <ClovestIcon color="#2563eb" />
            <p className="text-gray-800 font-bold text-xl">Rp 0</p>
            <p className="text-gray-500 text-sm">Saldo Digital</p>
            <button className="mt-1 px-6 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold rounded-lg transition">
              Cairkan
            </button>
          </div>

          {/* Saldo Tersedia */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-emerald-500 flex flex-col items-center gap-2">
            <ClovestIcon color="#10b981" />
            <p className="text-gray-800 font-bold text-xl">Rp 0</p>
            <p className="text-gray-500 text-sm">Saldo Tersedia</p>
            <button className="mt-1 px-6 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold rounded-lg transition">
              Lihat Riwayat
            </button>
          </div>
        </div>

        {/* ── STATUS DONASI ── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#2563eb] mb-10">
          <h3 className="text-gray-800 font-bold text-center mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>
            Status Donasi Terkini
          </h3>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#2563eb] flex items-center justify-center text-white shadow-md">
                    {step.icon}
                  </div>
                  <span className="text-gray-600 text-[11px] text-center">{step.label}</span>
                </div>
                {/* Connector line */}
                {i < statusSteps.length - 1 && (
                  <div className="flex-1 h-[2px] bg-[#2563eb]/30 mx-1 mb-5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SYARAT BARANG ── */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <h2 className="text-gray-800 font-bold text-2xl text-center mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>
          Syarat Barang
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {syaratBarang.map((s, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-28">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e52]/90 via-[#1a2e52]/40 to-transparent" />
                <h4 className="absolute bottom-2 left-3 right-3 text-white font-bold text-xs leading-tight">
                  {s.title}
                </h4>
              </div>
              <div className="bg-[#1a3a8f] p-3">
                <p className="text-white/75 text-[10px] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── PRICELIST ── */}
        <div className="bg-[#1a3a8f] rounded-2xl overflow-hidden shadow-md">
          <div className="py-4 px-6 border-b border-white/10">
            <h3 className="text-white font-bold text-center text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>
              Pricelist per Kilogram
            </h3>
          </div>
          <div className="divide-y divide-white/10">
            {pricelist.map((p, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3">
                <span className="text-white/80 text-sm">{p.item}</span>
                <span className="text-white font-semibold text-sm">{p.harga}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}