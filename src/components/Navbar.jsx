import { Menu, GraduationCap, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#ffffff]/90 dark:bg-[#101815]/90 backdrop-blur-xl border-b border-[#e0dbd0] dark:border-[#22312b] px-4 lg:px-8 flex items-center justify-between transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-[#4d5e55] dark:text-[#a3b18a] hover:text-[#141d18] dark:hover:text-[#f2efe9] hover:bg-[#f0ede4] dark:hover:bg-[#1a2621] transition cursor-pointer"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#e09f3e] to-[#d95d39] flex items-center justify-center shadow-lg shadow-[#e09f3e]/20">
            <GraduationCap className="w-5 h-5 text-[#0a0f0d]" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-[#141d18] dark:text-[#f2efe9]">
              EduPulse
            </span>
            <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#e09f3e]/20 dark:bg-[#e09f3e]/15 text-[#9e6310] dark:text-[#e09f3e] border border-[#e09f3e]/40 dark:border-[#e09f3e]/30">
              Admin Portal
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f6f4ef] dark:bg-[#17221e] text-[#141d18] dark:text-[#f2efe9] border border-[#dcd7c9] dark:border-[#2a3b34] hover:border-[#e09f3e] text-xs font-semibold transition cursor-pointer"
        aria-label="Toggle Dark and Light Mode"
      >
        {theme === "dark" ? (
          <>
            <Sun className="w-4 h-4 text-[#e09f3e]" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-[#9e6310]" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    </header>
  );
};

export default Navbar;