// src/pages/AboutUs.jsx
import about from "../assets/about us.png";
import about1 from "../assets/about us1.png";
import about2 from "../assets/about us2.png";
import team from "../assets/team.jpeg";


const points = [
  {
    number: "0",
    title: "Siapa Kami?",
    desc: "Platform digital yang menghubungkan masyarakat dengan pengelolaan limbah tekstil.",
    img: about,
  },
  {
    number: "1",
    title: "Apa yang Kami Lakukan?",
    desc: "Mengumpulkan dan mengelola pakaian layak pakai maupun bahan tekstil berkolaborasi dengan bank fashion.",
    img: about1,
  },
  {
    number: "2",
    title: "Bagaimana Kami Membantu?",
    desc: "Mengolah donasi menjadi produk bernilai berkolaborasi dengan bank fashion.",
    img: about2,
  },
  {
    number: "3",
    title: "Dampak yang Dihasilkan",
    desc: "Memberikan manfaat ekonomi sekaligus mengurangi limbah lingkungan.", 
  },
];

const teamMembers = [
  {
    name: "Nama Anggota 1",
    role: "Co-Founder",
    img: team, 
  },
  {
    name: "Nama Anggota 2",
    role: "Co-Founder",
    img: team,
  },
  {
    name: "Nama Anggota 3",
    role: "Developer",
    img: team,
  },
];

export default function AboutUs() {
  return (
    <div className="bg-[#f0f2f5] min-h-screen font-['Plus_Jakarta_Sans']">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* ── ABOUT US ── */}
        <h2
          className="text-gray-900 text-2xl font-bold mb-3"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          About Us
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-10 text-justify">
          Clovest adalah platform berbasis Circular Economy yang menghubungkan masyarakat dengan Bank Fashion untuk mengurangi limbah tekstil.
        </p>

        
        <div className="flex gap-6">
          
          <div className="flex-1 grid grid-cols-2 gap-6">
            {points.map((p) => (
              <div key={p.number}>
                
                <div className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center text-gray-700 text-sm font-bold mb-2">
                  {p.number}
                </div>
                <h3 className="text-gray-900 text-sm font-bold mb-1">{p.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed text-justify">{p.desc}</p>
              </div>
            ))}
          </div>

          
          <div className="flex flex-col gap-2 w-28 flex-shrink-0">
            {points
              .filter((p) => p.img)
              .map((p, i) => (
                <img
                  key={i}
                  src={p.img}
                  alt={p.title}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
          </div>
        </div>

        {/* ── OUR TEAM ── */}
        <div className="mt-16">
          <h2
            className="text-gray-900 text-2xl font-bold text-center mb-10"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Our Team
          </h2>

          <div className="flex justify-center gap-8 flex-wrap">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-800 border-4 border-white shadow-md">
                  {member.img ? (
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-gray-800 text-sm font-semibold">{member.name}</p>
                  <p className="text-gray-500 text-xs">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}