import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Trash2,
  UserX,
  HeartPulse,
  User,
  GraduationCap,
  Home as HomeIcon,
} from "lucide-react";
import { useStudents } from "../context/StudentContext";
import StudentAvatar from "../components/StudentAvatar";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, deleteStudent } = useStudents();

  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-6 bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] rounded-3xl space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#fae6e0] dark:bg-[#d95d39]/15 border border-[#f0c2b4] dark:border-[#d95d39]/35 flex items-center justify-center mx-auto text-[#b03c1c] dark:text-[#f08a6c]">
          <UserX className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-[#141d18] dark:text-[#f2efe9]">
          Student Record Unavailable
        </h2>
        <p className="text-sm text-[#5c6d64] dark:text-[#8b9990]">
          The student profile with ID{" "}
          <span className="font-mono text-[#9e6310] dark:text-[#e09f3e]">{id}</span> may have been
          deleted or does not exist in the directory.
        </p>
        <Link
          to="/students"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e09f3e] hover:bg-[#ebb156] text-[#0a0f0d] text-sm font-bold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>
      </div>
    );
  }

  const handleDeleteAndRedirect = () => {
    deleteStudent(student.id);
    navigate("/students");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4d5e55] dark:text-[#9aa89f] hover:text-[#9e6310] dark:hover:text-[#e09f3e] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students</span>
        </Link>

        <button
          onClick={handleDeleteAndRedirect}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fae6e0] dark:bg-[#d95d39]/15 hover:bg-[#d95d39] dark:hover:bg-[#d95d39] text-[#b03c1c] dark:text-[#f08a6c] hover:text-white dark:hover:text-[#0a0f0d] border border-[#f0c2b4] dark:border-[#d95d39]/35 text-xs font-bold transition cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Student Record</span>
        </button>
      </div>

      <div className="bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] rounded-3xl overflow-hidden shadow-sm">
        <div className="h-28 bg-linear-to-r from-[#e09f3e]/30 via-[#d95d39]/20 to-[#f6f4ef] dark:from-[#e09f3e]/25 dark:via-[#d95d39]/20 dark:to-[#111916] border-b border-[#e0dbd0] dark:border-[#22312b]" />
        <div className="px-6 sm:px-8 pb-8">
          {/* Profile Header */}
          <div className="relative -mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div className="flex items-end gap-4">
              <StudentAvatar
                student={student}
                size="lg"
                className="border-4 border-[#ffffff] dark:border-[#0a0f0d] shadow-md"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-[#9e6310] dark:text-[#e09f3e]">
                    REG NO: {student.id}
                  </span>
                  {student.section && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#f4efe4] dark:bg-[#18231f] text-[#4d5e55] dark:text-[#a5b3aa] border border-[#e0dbd0] dark:border-[#2a3b34]">
                      {student.section}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-[#141d18] dark:text-[#f2efe9] mt-0.5">
                  {student.name}
                </h1>
                <p className="text-sm text-[#5c6d64] dark:text-[#8b9990]">
                  {student.department} • {student.year}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {student.bloodGroup && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#fae6e0] dark:bg-[#d95d39]/15 text-[#b03c1c] dark:text-[#f08a6c] border border-[#f0c2b4] dark:border-[#d95d39]/35">
                  <HeartPulse className="w-3.5 h-3.5" />
                  {student.bloodGroup}
                </span>
              )}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  student.status === "Active"
                    ? "bg-[#e3efe6] dark:bg-[#84a98c]/15 text-[#265c3b] dark:text-[#9bc1a3] border-[#bdd8c5] dark:border-[#84a98c]/35"
                    : "bg-[#fae6e0] dark:bg-[#d95d39]/15 text-[#b03c1c] dark:text-[#f08a6c] border-[#f0c2b4] dark:border-[#d95d39]/35"
                }`}
              >
                {student.status}
              </span>
            </div>
          </div>

          {/* 2-Column Detailed Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-[#ece7dc] dark:border-[#22312b]">
            {/* Left Column: Personal & Guardian Info */}
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#73827a] dark:text-[#6c7d75] mb-3">
                  Personal & Contact Information
                </h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-3 text-[#2d3b34] dark:text-[#d8d3c8]">
                    <Mail className="w-4 h-4 text-[#c98520] dark:text-[#e09f3e] shrink-0" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2d3b34] dark:text-[#d8d3c8]">
                    <Phone className="w-4 h-4 text-[#c98520] dark:text-[#e09f3e] shrink-0" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2d3b34] dark:text-[#d8d3c8]">
                    <User className="w-4 h-4 text-[#c98520] dark:text-[#e09f3e] shrink-0" />
                    <span>
                      {student.gender || "N/A"} • DOB: {student.dob || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2d3b34] dark:text-[#d8d3c8]">
                    <MapPin className="w-4 h-4 text-[#c98520] dark:text-[#e09f3e] shrink-0" />
                    <span>{student.city}</span>
                  </div>
                  {student.address && (
                    <div className="flex items-start gap-3 text-[#2d3b34] dark:text-[#d8d3c8]">
                      <HomeIcon className="w-4 h-4 text-[#c98520] dark:text-[#e09f3e] shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed">{student.address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f6f4ef] dark:bg-[#0a0f0d] border border-[#e0dbd0] dark:border-[#22312b] space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#73827a] dark:text-[#6c7d75]">
                  Parent / Guardian Contact
                </h3>
                <p className="text-sm font-semibold text-[#141d18] dark:text-[#f2efe9]">
                  {student.guardianName || "Not Specified"}
                </p>
                <p className="text-xs text-[#4d5e55] dark:text-[#9aa89f] flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c98520] dark:text-[#e09f3e]" />
                  <span>{student.guardianPhone || "Not Specified"}</span>
                </p>
              </div>
            </div>

            {/* Right Column: Academic & Skills Info */}
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#73827a] dark:text-[#6c7d75] mb-3">
                  Academic Performance
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-[#f6f4ef] dark:bg-[#0a0f0d] border border-[#e0dbd0] dark:border-[#22312b]">
                    <div className="flex items-center gap-2 text-xs text-[#5c6d64] dark:text-[#8b9990] mb-1">
                      <Award className="w-4 h-4 text-[#c98520] dark:text-[#e09f3e]" />
                      <span>Cumulative GPA</span>
                    </div>
                    <p className="text-2xl font-bold text-[#141d18] dark:text-[#f2efe9]">
                      {student.cgpa} / 10
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#f6f4ef] dark:bg-[#0a0f0d] border border-[#e0dbd0] dark:border-[#22312b]">
                    <div className="flex items-center gap-2 text-xs text-[#5c6d64] dark:text-[#8b9990] mb-1">
                      <BookOpen className="w-4 h-4 text-[#265c3b] dark:text-[#9bc1a3]" />
                      <span>Attendance</span>
                    </div>
                    <p className="text-2xl font-bold text-[#141d18] dark:text-[#f2efe9]">
                      {student.attendance}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#4d5e55] dark:text-[#9aa89f] bg-[#f6f4ef] dark:bg-[#0a0f0d] border border-[#e0dbd0] dark:border-[#22312b] rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <GraduationCap className="w-4 h-4 text-[#c98520] dark:text-[#e09f3e]" />
                    Admission Quota:
                  </span>
                  <span className="font-semibold text-[#141d18] dark:text-[#f2efe9]">
                    {student.quota || "Regular"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-4 h-4 text-[#c98520] dark:text-[#e09f3e]" />
                    Faculty Mentor:
                  </span>
                  <span className="font-semibold text-[#141d18] dark:text-[#f2efe9]">
                    {student.mentor || "Assigned Advisor"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-4 h-4 text-[#c98520] dark:text-[#e09f3e]" />
                    Enrollment Date:
                  </span>
                  <span className="font-semibold text-[#141d18] dark:text-[#f2efe9]">
                    {student.enrollmentDate}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#73827a] dark:text-[#6c7d75] mb-2">
                  Technical Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {(student.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-lg bg-[#f4efe4] dark:bg-[#e09f3e]/15 text-[#9e6310] dark:text-[#e09f3e] border border-[#e3d7be] dark:border-[#e09f3e]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;