import { ShieldCheck, WifiOff, Layers, Trash2 } from "lucide-react";

const About = () => {
  const features = [
    {
      title: "Full-Screen Offline 404 Takeover",
      desc: "When your network connection disconnects—even across browser refreshes—a root guard and service worker display the minimalist 404 Not Found screen until the network is restored.",
      icon: WifiOff,
    },
    {
      title: "Comprehensive Student Profiles & CRUD",
      desc: "Enroll students across 12 departments and 8 semesters with guardian contacts, blood group, mentor, attendance, and CGPA, or delete records cleanly.",
      icon: Trash2,
    },
    {
      title: "Persistent Local Storage",
      desc: "All changes automatically synchronize with browser storage so student records remain intact across sessions.",
      icon: ShieldCheck,
    },
    {
      title: "Dual-Theme Editorial UI",
      desc: "Switch seamlessly between Warm Parchment Light Mode and Obsidian Moss Dark Mode with persistent theme preference.",
      icon: Layers,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] rounded-3xl p-6 sm:p-8 shadow-xs">
        <h1 className="text-2xl font-bold text-[#141d18] dark:text-[#f2efe9] mb-2">
          About EduPulse Student Portal
        </h1>
        <p className="text-sm text-[#4d5e55] dark:text-[#9aa89f] leading-relaxed">
          EduPulse is a multi-page React frontend engineered for fault-tolerant academic record
          management. Every route is protected at the application root so users never encounter raw
          browser crash screens when internet connectivity drops or refreshes offline.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {features.map(({ title, desc, icon: Icon }) => (
          <div
            key={title}
            className="bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] rounded-2xl p-6 space-y-3 shadow-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-[#f4efe4] dark:bg-[#e09f3e]/15 border border-[#e3d7be] dark:border-[#e09f3e]/35 flex items-center justify-center text-[#9e6310] dark:text-[#e09f3e]">
              <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-[#141d18] dark:text-[#f2efe9]">{title}</h2>
            <p className="text-xs text-[#5c6d64] dark:text-[#8b9990] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;