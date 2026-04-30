import herobg from "../assets/herobg.png";
import home1 from "../assets/home 1.png";
import home2 from "../assets/home 2.png";
import home3 from "../assets/home 3.png";
import goal from "../assets/goal.png";
import React from "react";


const steps = [

    {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-white">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
    ),
    text: "Lengkapi data barang fashion yang akan disalurkan, upload foto, dan pilih jadwal penjemputan yang sesuai",
  },

  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-white">
        <rect x="1" y="10" width="22" height="10" rx="2" />
        <path d="M16 10V7a4 4 0 00-8 0v3" />
        <circle cx="8.5" cy="15" r="1.5" fill="currentColor" />
        <circle cx="15.5" cy="15" r="1.5" fill="currentColor" />
      </svg>
    ),
    text: "Mitra kurir (J&T/JNE) akan menjemput pakaian Anda dan mengirimkannya ke Bank Fashion untuk validasi fisik",
  },

  {
     icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-white">
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 15h4" />
      </svg>
    ),
    text: "Setelah Bank Fashion memvalidasi barang, saldo digital otomatis masuk ke akun Anda dan siap dicairkan.",
  }
]
const stats = [
  {
    img: home1,
    text: "Industri fashion merupakan penyumbang limbah terbesar nomer dua di dunia dengan total 92 juta ton per tahun",
  },
  {
    img: home2,
    text: "Hanya sekitar 1% dari material pakaian yang didaur ulang kembali menjadi pakaian baru.",
  },
  {
    img: home3,
    text: "Donasikan setiap pakaian anda yang tidak terpakai sebagai bentuk kepedulian untuk mengurangi limbah fashion",
  },



];


export default function Home() {
  return (
    <div className="font-['Plus_Jakarta_Sans']">
      {/* ── HERO ── */}
      <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden">
        {/* Background image */}
        <img
          src={herobg}
          alt="Fashion waste"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Content card */}
        <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl bg-[#1a2e52]/85 backdrop-blur-sm rounded-2xl p-7 md:p-9 shadow-2xl border border-white/10">
            <h1
              className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Mari Kurangi Limbah Fashion Untuk Masa Depan Lingkungan Yang lebih Baik
            </h1>
            <p className="text-white/75 text-sm md:text-base leading-relaxed mb-6">
              Platform kami hadir sebagai solusi untuk mengurangi limbah fashion, sekaligus
              menjadi penghubung antara Anda dan Bank Fashion. Melalui platform ini, pakaian
              layak pakai yang Anda donasikan akan dikumpulkan dan diolah kembali oleh
              pengrajin lokal menjadi produk yang bernilai guna dan berkelanjutan.
            </p>
            <a
              href="/donasi"
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 group"
            >
              Mulai
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
    
        {/* Wave bottom */}
    
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 90"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-20 md:h-25"
          >
            <path
              d="M0,45 C240,90 480,0 720,45 C960,90 1200,10 1440,45 L1440,90 L0,90 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="bg-[#f8fafc] px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {stats.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-5"
            >
              {/* Circle image */}
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-[220px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROMO CARD ── */}
      <section className="px-6 md:px-16 lg:px-24 pt-10 pb-16">
        <div className="max-w-4xl mx-auto bg-[#1a3a8f] rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">

          {/* Image */}
          <div className="md:w-[280px] flex-shrink-0">
            <img
              src={goal}
              alt="Donasi pakaian"
              className="w-full h-56 md:h-full object-cover"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 p-7 md:p-9 flex flex-col justify-center">
            <h2
              className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Tukar Pakaian Tak Terpakai Jadi Cuan
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-2">
              Bergabunglah bersama ribuan donatur yang telah berkontribusi menciptakan masa depan fashion yang lebih berkelanjutan sekaligus mendukung pemberdayaan pengrajin lokal.
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Setiap kilogram pakaian yang Anda donasikan akan dikonversi menjadi saldo digital yang dapat memberikan nilai lebih bagi Anda, sekaligus membawa dampak positif bagi lingkungan dan masyarakat.
            </p>
            <a
              href="#donasi"
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-semibold text-sm px-6 py-3 rounded-lg w-fit transition-all duration-200 group"
            >
              Donasi Sekarang
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 md:px-16 lg:px-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center text-gray-800 text-2xl md:text-3xl font-bold mb-12"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Bagaimana Platform Kami Bekerja
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-[#1a3a8f] rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:bg-[#1e40af] transition-colors duration-300 shadow-lg"
              >
                {/* Icon box */}
                <div className="w-16 h-16 bg-[#2563eb]/60 rounded-xl flex items-center justify-center">
                  {step.icon}
                </div>
                {/* Step number */}
                <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">
                  Langkah {i + 1}
                </span>
                <p className="text-white/80 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>




          
  );
}