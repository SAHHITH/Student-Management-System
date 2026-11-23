import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Info, X, Database } from "lucide-react";
import { useStudents } from "../context/StudentContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { students } = useStudents();

  const navItems = [
    { to: "/", label: " Home", icon: LayoutDashboard },
    { to: "/students", label: "Students Directory", icon: Users, badge: students.length },
    { to: "/about", label: "About System", icon: Info },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 dark:bg-[#0a0f0d]/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#fbfaf7] dark:bg-[#0e1512] border-r border-[#e0dbd0] dark:border-[#22312b] flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between lg:hidden pb-2 border-b border-[#e0dbd0] dark:border-[#22312b]">
            <span className="font-semibold text-[#141d18] dark:text-[#f2efe9]">Navigation</span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#4d5e55] dark:text-[#a3b18a] hover:text-[#141d18] dark:hover:text-[#f2efe9] hover:bg-[#f0ede4] dark:hover:bg-[#1a2621]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#73827a] dark:text-[#6c7d75] mb-2">
              Main Menu
            </p>
            {navItems.map(({ to, label, icon: Icon, badge }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#e09f3e]/20 dark:bg-[#e09f3e]/15 text-[#9e6310] dark:text-[#e09f3e] border border-[#e09f3e]/45 dark:border-[#e09f3e]/35 shadow-xs"
                      : "text-[#4d5e55] dark:text-[#9aa89f] hover:text-[#141d18] dark:hover:text-[#f2efe9] hover:bg-[#f0ede4] dark:hover:bg-[#16201c]"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </div>
                {badge !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#edeae1] dark:bg-[#192420] text-[#141d18] dark:text-[#d8d3c8] border border-[#dcd7c9] dark:border-[#2a3b34]">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 m-4 rounded-xl bg-[#f3f0e8] dark:bg-[#131c18] border border-[#e0dbd0] dark:border-[#22312b]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#9e6310] dark:text-[#e09f3e] mb-1">
            <Database className="w-3.5 h-3.5" />
            <span>Local Sync Active</span>
          </div>
          <p className="text-[11px] text-[#5c6d64] dark:text-[#8b9990] leading-relaxed">
            Records persist locally and switch to full-screen 404 mode whenever offline.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;