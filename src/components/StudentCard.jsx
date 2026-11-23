import { Link } from "react-router-dom";
import { Mail, Trash2, ArrowUpRight, Award, MapPin, HeartPulse, BookOpen } from "lucide-react";
import StudentAvatar from "./StudentAvatar";

const StudentCard = ({ student, onDelete }) => {
  if (!student) return null;

  return (
    <div className="group relative bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] hover:border-[#e09f3e] dark:hover:border-[#e09f3e]/50 rounded-2xl p-5 transition-all duration-200 shadow-xs hover:shadow-lg dark:hover:shadow-black/40 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#f4efe4] dark:bg-[#18231f] text-[#9e6310] dark:text-[#e09f3e] border border-[#e3d7be] dark:border-[#2a3b34]">
              #{student.id}
            </span>
            {student.bloodGroup && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#fae6e0] dark:bg-[#d95d39]/15 text-[#b03c1c] dark:text-[#f08a6c] border border-[#f0c2b4] dark:border-[#d95d39]/30">
                <HeartPulse className="w-3 h-3" />
                {student.bloodGroup}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                student.status === "Active"
                  ? "bg-[#e3efe6] dark:bg-[#84a98c]/15 text-[#265c3b] dark:text-[#9bc1a3] border-[#bdd8c5] dark:border-[#84a98c]/30"
                  : "bg-[#fae6e0] dark:bg-[#d95d39]/15 text-[#b03c1c] dark:text-[#f08a6c] border-[#f0c2b4] dark:border-[#d95d39]/30"
              }`}
            >
              {student.status}
            </span>
            <button
              onClick={() => onDelete(student.id, student.name)}
              className="p-1.5 rounded-lg text-[#73827a] dark:text-[#8b9990] hover:text-[#b03c1c] dark:hover:text-[#f08a6c] hover:bg-[#fae6e0] dark:hover:bg-[#d95d39]/15 transition cursor-pointer"
              title="Delete Student"
              aria-label={`Delete ${student.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3.5 mb-4">
          <StudentAvatar student={student} size="md" />
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-[#141d18] dark:text-[#f2efe9] truncate group-hover:text-[#9e6310] dark:group-hover:text-[#e09f3e] transition">
              {student.name}
            </h3>
            <p className="text-xs text-[#4d5e55] dark:text-[#9aa89f] truncate">
              {student.department}
            </p>
            <p className="text-[11px] text-[#73827a] dark:text-[#6c7d75]">
              {student.year} {student.section ? `• ${student.section}` : ""}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-[#4d5e55] dark:text-[#9aa89f] mb-4 border-t border-[#ece7dc] dark:border-[#22312b] pt-3">
          <div className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 text-[#73827a] dark:text-[#6c7d75] shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#73827a] dark:text-[#6c7d75] shrink-0" />
            <span className="truncate">{student.city}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="flex items-center gap-1 font-semibold text-[#141d18] dark:text-[#f2efe9]">
              <Award className="w-3.5 h-3.5 text-[#c98520] dark:text-[#e09f3e]" />
              CGPA: {student.cgpa}
            </span>
            <span className="flex items-center gap-1 font-semibold text-[#265c3b] dark:text-[#9bc1a3]">
              <BookOpen className="w-3.5 h-3.5" />
              Att: {student.attendance}%
            </span>
          </div>
        </div>
      </div>

      <Link
        to={`/students/${student.id}`}
        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#f3f0e8] dark:bg-[#192420] hover:bg-[#e09f3e] dark:hover:bg-[#e09f3e] text-[#141d18] dark:text-[#f2efe9] hover:text-[#0a0f0d] dark:hover:text-[#0a0f0d] text-xs font-semibold transition-colors"
      >
        <span>View Full Profile</span>
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default StudentCard;