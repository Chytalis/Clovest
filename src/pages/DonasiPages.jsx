import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import donasibg from "../assets/headerdonasi.png";

const donobg = {donasibg};

const STEPS = ["Identitas Pendonor", "Detail Barang", "Upload Foto", "Validasi"];

const CATEGORIES = [
  {
    key: "atasan",
    label: "Atasan",
    sub: "Kaos, Kemeja, Blus",
    icon: (
      <svg viewBox="0 0 32 32" fill="white" className="w-7 h-7">
        <path d="M30.586,9.586l-3.828-3.828C25.632,4.632,24.106,4,22.515,4h-0.456l-1.888,3.776c-0.233,0.468-0.685,0.775-1.205,0.823C18.92,8.603,18.47,8.385,18.184,8.006L16,5.833l-2.184,2.173C13.53,8.425,13.034,8.64,12.508,8.6c-0.521-0.048-0.972-0.355-1.205-0.823L9.415,4H8.96C7.369,4,5.843,4.632,4.718,5.757L0.889,9.586c-0.781,0.781-0.781,2.047,0,2.828l2.172,2.172c0.781,0.781,2.047,0.781,2.828,0L7,14L5.281,27.752C5.132,28.946,6.063,30,7.266,30h17.469c1.203,0,2.134-1.054,1.985-2.248L25,14l1.111,1.586c0.781,0.781,2.047,0.781,2.828,0l2.172-2.172C31.367,11.633,31.367,10.367,30.586,9.586z"/>
      </svg>
    ),
  },
  {
    key: "bawahan",
    label: "Bawahan",
    sub: "Celana, Rok, Jeans",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M6 2h12l2 8H4L6 2zM4 10v12h4l2-6 2 6h4V10H4z"/>
      </svg>
    ),
  },
  {
    key: "tas",
    label: "Tas & Aksesoris",
    sub: "Tas, Dompet, Topi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
    ),
  },
];

const KURIR = [
  { key: "jnt", label: "J&T Express", sub: "Pengiriman Cepat & Aman" },
  { key: "jne", label: "JNE", sub: "Jangkauan Luas & Terpercaya" },
];

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10 text-gray-500 mx-auto mb-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 18h8M3 18h1m14 0h1m-5-6V6H5v6h12zM5 12H3l-1 4h1M19 12h2l1 4h-1M9 6V4h6v2"/>
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-gray-400 mx-auto mb-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
  </svg>
);

const CheckCircle = ({ size = 6 }) => (
  <svg viewBox="0 0 24 24" fill="#22c55e" className={`w-${size} h-${size}`}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 14.5l-4-4 1.414-1.414L10.5 13.672l5.586-5.586L17.5 9.5l-7 7z"/>
  </svg>
);

export default function DonasiPage() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1
  const [identity, setIdentity] = useState({
    nama: user?.name || "",
    email: user?.email || "",
    telepon: "+62",
    alamat: "",
  });

  // Step 2
  const [items, setItems] = useState({ atasan: 0, bawahan: 0, tas: 0 });
  const [berat, setBerat]   = useState("");

  // Step 3
  const [photos, setPhotos] = useState({ depan: null, belakang: null, label: null });
  const fileRefs = { depan: useRef(), belakang: useRef(), label: useRef() };

  // Step 4
  const [tgl, setTgl]       = useState("");
  const [kurir, setKurir]   = useState("");

  const [error, setError]   = useState("");
  const [done, setDone]     = useState(false);

  const totalBarang = items.atasan + items.bawahan + items.tas;

  // ── VALIDASI PER STEP ──
  const validate = () => {
    if (step === 1) {
      if (!identity.nama || !identity.email || identity.telepon === "+62" || !identity.alamat) {
        setError("Semua field harus diisi."); return false;
      }
    }
    if (step === 2) {
      if (totalBarang === 0) { setError("Pilih minimal 1 barang."); return false; }
      if (!berat)            { setError("Masukkan estimasi berat."); return false; }
    }
    if (step === 3) {
      if (!photos.depan) { setError("Upload minimal Foto Depan."); return false; }
    }
    if (step === 4) {
      if (!tgl)   { setError("Pilih tanggal penjemputan."); return false; }
      if (!kurir) { setError("Pilih mitra kurir."); return false; }
    }
    setError(""); return true;
  };

  const next = () => { if (validate()) setStep((s) => s + 1); };
  const back = () => { setError(""); setStep((s) => s - 1); };

  const handleSubmit = () => {
    if (!validate()) return;
    setDone(true);
  };

  const handleFile = (key, file) => {
    if (!file) return;
    setPhotos((p) => ({ ...p, [key]: file }));
    setError("");
  };

  const removeFile = (key) => setPhotos((p) => ({ ...p, [key]: null }));

  const counter = (key, delta) =>
    setItems((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));

  // ── STEPPER ──
  const Stepper = () => (
    <div className="flex items-center justify-center gap-0 px-4 py-6 bg-[#e8ecf0]">
      {STEPS.map((label, i) => {
        const n       = i + 1;
        const done_s  = n < step;
        const active  = n === step;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all
                ${done_s  ? "bg-[#2563eb] border-[#2563eb] text-white"
                : active  ? "bg-[#2563eb] border-[#2563eb] text-white"
                : "bg-white border-gray-300 text-gray-400"}`}
              >
                {done_s ? <CheckCircle size={5} /> : n}
              </div>
              <span className={`text-[10px] text-center w-16 leading-tight ${active ? "text-gray-800 font-semibold" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-12 h-[2px] mb-5 mx-1 ${n < step ? "bg-[#2563eb]" : "bg-gray-300"}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  // ── NAVIGATION BUTTONS ──
  const NavButtons = ({ onNext, nextLabel = "Lanjut →", isSubmit = false }) => (
    <div className="flex items-center justify-between px-4 py-6 bg-[#e8ecf0]">
      {step > 1 ? (
        <button onClick={back} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition">
          ← Kembali
        </button>
      ) : <div />}
      <button
        onClick={isSubmit ? handleSubmit : next}
        className="flex items-center gap-2 px-6 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-lg transition active:scale-95"
      >
        {nextLabel}
      </button>
    </div>
  );

  // ── SUCCESS PAGE ──
  if (done) {
    const summary = [
      { label: "Nama Lengkap",          value: identity.nama },
      { label: "Alamat Email",          value: identity.email },
      { label: "No Telepon",            value: identity.telepon },
      { label: "Alamat Lengkap",        value: identity.alamat },
      { label: "Total Barang",          value: `${totalBarang} Barang` },
      { label: "Estimasi Berat",        value: `${berat} kg` },
      { label: "Foto Barang",           value: "Sudah Diupload" },
      { label: "Tanggal Penjemputan",   value: tgl },
      { label: "Mitra Kurir",           value: kurir === "jnt" ? "J&T Express" : "JNE" },
    ];
    return (
      <div className="bg-[#e8ecf0] min-h-screen font-['Plus_Jakarta_Sans']">
        {/* Hero */}
        <div className="relative h-48 overflow-hidden">
          <img src={donasibg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-3xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Donasi</h1>
            <p className="text-white/80 text-sm max-w-sm">Bergabunglah bersama ribuan donatur yang telah berkontribusi menciptakan masa depan fashion yang lebih berkelanjutan.</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-8">
          <div className="bg-[#1a3a8f] rounded-2xl p-8 text-center shadow-xl">
            <h2 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>
              Pengisian formulir Donasi Berhasil
            </h2>
            <div className="flex justify-center mb-6">
              <CheckCircle size={16} />
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-8 text-left">
              Saat Ini Hasil Pengisian Formulirmu sedang dicek oleh admin untuk divalidasi mengenai kelayakan barang yang kamu akan kirimkan. Untuk info selanjutnya akan kami infokan lebih lanjut
            </p>

            {/* Ringkasan */}
            <div className="rounded-xl overflow-hidden border border-white/20">
              <div className="bg-[#38bdf8] py-3 px-4">
                <p className="text-[#1a2e52] font-bold text-sm text-center">Ringkasan Pesanan</p>
              </div>
              <div className="bg-[#e8edf5] divide-y divide-gray-200">
                {summary.map((s, i) => (
                  <div key={i} className="flex gap-3 px-4 py-2.5 text-sm">
                    <span className="text-gray-500 w-36 flex-shrink-0">{s.label}</span>
                    <span className="text-gray-700 font-medium">: {s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-8 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-xl transition"
            >
              ← Kembali Ke Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#e8ecf0] min-h-screen font-['Plus_Jakarta_Sans']">

      {/* Hero */}
      <div className="relative h-48 overflow-hidden">
        <img src={donasibg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Donasi</h1>
          <p className="text-white/80 text-sm max-w-sm">Bergabunglah bersama ribuan donatur yang telah berkontribusi menciptakan masa depan fashion yang lebih berkelanjutan sekaligus mendukung pemberdayaan pengrajin lokal.</p>
        </div>
      </div>

      {/* Stepper */}
      <Stepper />

      {/* ── STEP 1: IDENTITAS ── */}
      {step === 1 && (
        <>
          <div className="max-w-lg mx-auto px-4">
            <div className="bg-[#1a3a8f] rounded-2xl p-6 shadow-lg">
              <h2 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Identitas Donatur</h2>
              <p className="text-white/60 text-sm mb-6">Masukkan data diri Anda untuk proses penjemputan</p>

              <div className="flex flex-col gap-4">
                <Field label="Nama Lengkap">
                  <input type="text" value={identity.nama} onChange={(e) => setIdentity({ ...identity, nama: e.target.value })}
                    className="w-full bg-[#e8edf5] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-400" />
                </Field>
                <Field label="Alamat Email">
                  <input type="email" value={identity.email} onChange={(e) => setIdentity({ ...identity, email: e.target.value })}
                    className="w-full bg-[#e8edf5] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-400" />
                </Field>
                <Field label="Nomor Telepon">
                  <input type="tel" value={identity.telepon} onChange={(e) => setIdentity({ ...identity, telepon: e.target.value })}
                    className="w-full bg-[#e8edf5] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-400" />
                </Field>
                <Field label="Alamat Lengkap Penjemputan">
                  <textarea
                    rows={3}
                    placeholder="Nama Jalan, no blok, RT/RW, Kelurahan, Kecamatan, Kota, Provinsi, Kode Pos"
                    value={identity.alamat} onChange={(e) => setIdentity({ ...identity, alamat: e.target.value })}
                    className="w-full bg-[#e8edf5] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                
                </Field>
              </div>

              {error && <ErrorMsg msg={error} />}
            </div>
          </div>
          <NavButtons />
        </>
      )}

      {/* ── STEP 2: DETAIL BARANG ── */}
      {step === 2 && (
        <>
          <div className="max-w-lg mx-auto px-4">
            <div className="bg-[#1a3a8f] rounded-2xl p-6 shadow-lg">
              <h2 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Detail Barang</h2>
              <p className="text-white/60 text-sm mb-6">Pilih kategori dan perkirakan berat total pakaian yang akan disalurkan</p>

              <div className="flex flex-col gap-3 mb-6">
                {CATEGORIES.map((cat) => (
                  <div key={cat.key} className="bg-[#e8edf5] rounded-xl flex items-center gap-4 px-4 py-3">
                    <div className="w-12 h-12 bg-[#1a3a8f] rounded-xl flex items-center justify-center flex-shrink-0">
                      {cat.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-bold text-sm">{cat.label}</p>
                      <p className="text-gray-500 text-xs">{cat.sub}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => counter(cat.key, -1)} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg leading-none">−</button>
                      <span className="text-gray-800 font-bold text-sm w-4 text-center">{items[cat.key]}</span>
                      <button onClick={() => counter(cat.key, +1)} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg leading-none">+</button>
                    </div>
                  </div>
                ))}
              </div>

              <Field label="Estimasi Berat Total (KG)">
                <input type="number" min="0" step="0.1" placeholder="Contoh : 2.5" value={berat} onChange={(e) => setBerat(e.target.value)}
                  className="w-full bg-[#e8edf5] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-400" />
                <p className="text-white/40 text-xs mt-1">Perkiraan berat akan divalidasi setelah barang sampai di Bank Fashion</p>
              </Field>

              {error && <ErrorMsg msg={error} />}
            </div>
          </div>
          <NavButtons />
        </>
      )}

      {/* ── STEP 3: UPLOAD FOTO ── */}
      {step === 3 && (
        <>
          <div className="max-w-lg mx-auto px-4">
            <div className="bg-[#1a3a8f] rounded-2xl p-6 shadow-lg">
              <h2 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Upload Foto Kondisi Pakaian</h2>
              <p className="text-white/60 text-sm mb-6">Unggah foto pakaian dari berbagai sudut untuk proses validasi</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { key: "depan", label: "Foto Depan" },
                  { key: "belakang", label: "Foto Belakang" },
                  { key: "label", label: "Foto Label/Merek" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex flex-col items-center gap-2">
                    <p className="text-white font-semibold text-xs text-center">{label}</p>
                    <div
                      onClick={() => !photos[key] && fileRefs[key].current.click()}
                      className={`w-full aspect-square bg-[#e8edf5] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition p-3 ${photos[key] ? "border-2 border-green-400" : ""}`}
                    >
                      {photos[key] ? (
                        <>
                          <CheckCircle size={8} />
                          <p className="text-gray-600 text-[10px] text-center mt-1 break-all">{photos[key].name}</p>
                          <button onClick={(e) => { e.stopPropagation(); removeFile(key); }}
                            className="text-red-500 text-[10px] mt-1 hover:underline">✕ Hapus</button>
                        </>
                      ) : (
                        <>
                          <UploadIcon />
                          <p className="text-gray-500 text-[10px] text-center">Klik Untuk Upload</p>
                          <p className="text-gray-400 text-[9px]">PDF (max 5MB)</p>
                        </>
                      )}
                    </div>
                    <input ref={fileRefs[key]} type="file" accept=".pdf,image/*" className="hidden"
                      onChange={(e) => handleFile(key, e.target.files[0])} />
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="bg-[#e8edf5] border-l-4 border-[#38bdf8] rounded-xl p-4">
                <p className="text-gray-800 font-bold text-sm mb-2">Tips Foto:</p>
                <ul className="text-gray-600 text-xs space-y-1 list-disc list-inside">
                  <li>Pastikan foto jelas dan terang</li>
                  <li>Ambil foto dengan latar belakang polos</li>
                  <li>Pastikan label/merek terlihat jelas</li>
                  <li>Tunjukkan kondisi keseluruhan pakaian</li>
                  <li>Satukan semua foto barang sesuai kategori dalam bentuk PDF</li>
                </ul>
              </div>

              {error && <ErrorMsg msg={error} />}
            </div>
          </div>
          <NavButtons />
        </>
      )}

      {/* ── STEP 4: LOGISTIK ── */}
      {step === 4 && (
        <>
          <div className="max-w-lg mx-auto px-4">
            <div className="bg-[#1a3a8f] rounded-2xl p-6 shadow-lg">
              <h2 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Logistik & Penjemputan</h2>
              <p className="text-white/60 text-sm mb-6">Pilih jadwal penjemputan dan mitra kurir</p>

              <Field label="Pilih Tanggal Penjemputan">
                <div className="relative">
                  <input type="date" value={tgl} onChange={(e) => setTgl(e.target.value)}
                    className="w-full bg-[#e8edf5] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <p className="text-white/40 text-xs mt-1">Kurir akan menghubungi Anda 1 hari sebelumnya untuk konfirmasi</p>
              </Field>

              <p className="text-white font-bold text-sm mt-5 mb-3">Pilih Mitra Kurir</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {KURIR.map((k) => (
                  <button key={k.key} onClick={() => setKurir(k.key)}
                    className={`bg-[#e8edf5] rounded-xl p-4 flex flex-col items-center gap-1 border-2 transition ${kurir === k.key ? "border-[#2563eb]" : "border-transparent hover:border-gray-300"}`}>
                    <TruckIcon />
                    <p className="text-gray-800 font-bold text-sm">{k.label}</p>
                    <p className="text-gray-500 text-xs">{k.sub}</p>
                  </button>
                ))}
              </div>

              {/* Proses selanjutnya */}
              <div className="bg-[#e8edf5] border-l-4 border-[#38bdf8] rounded-xl p-4">
                <p className="text-gray-800 font-bold text-sm mb-2">Proses Selanjutnya:</p>
                <ol className="text-gray-600 text-xs space-y-1 list-decimal list-inside">
                  <li>Kurir akan menjemput pakaian di alamat yang telah Anda berikan</li>
                  <li>Pakaian dikirim ke Bank Fashion untuk validasi fisik</li>
                  <li>Setelah validasi selesai, saldo digital akan masuk ke akun Anda</li>
                  <li>Anda dapat melihat hasil olahan produk di dashboard</li>
                </ol>
              </div>

              {error && <ErrorMsg msg={error} />}
            </div>
          </div>
          <NavButtons nextLabel="✓ Kirim Ke Bank Fashion" isSubmit />
        </>
      )}
    </div>
  );
}

// ── HELPER COMPONENTS ──
function Field({ label, children }) {
  return (
    <div>
      <p className="text-white font-semibold text-sm mb-1.5">{label}</p>
      {children}
    </div>
  );
}

function ErrorMsg({ msg }) {
  return (
    <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/40 text-red-300 text-xs rounded-lg px-4 py-2.5 mt-4">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {msg}
    </div>
  );
}