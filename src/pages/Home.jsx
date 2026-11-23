import { Link } from "react-router-dom";
import { Users, Award, UserCheck, ArrowRight, Sparkles } from "lucide-react";
import { useStudents } from "../context/StudentContext";
import StudentAvatar from "../components/StudentAvatar";

const Home = () => {
  const { students } = useStudents();

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "Active").length;
  const avgCgpa =
    totalStudents > 0
      ? (students.reduce((acc, s) => acc + Number(s.cgpa || 0), 0) / totalStudents).toFixed(2)
      : "0.00";

  const stats = [
    {
      label: "Total Enrolled",
      value: totalStudents,
      sub: "Verified records",
      icon: Users,
      color: "from-[#e09f3e] to-[#c78224]",
    },
    {
      label: "Active Status",
      value: activeStudents,
      sub: "Currently attending",
      icon: UserCheck,
      color: "from-[#84a98c] to-[#52796f]",
    },
    {
      label: "Average CGPA",
      value: avgCgpa,
      sub: "Across all departments",
      icon: Award,
      color: "from-[#d95d39] to-[#b54424]",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#ffffff] via-[#f9f7f2] to-[#efeae0] dark:from-[#17231e] dark:via-[#111916] dark:to-[#0d1310] border border-[#e0dbd0] dark:border-[#263830] p-6 sm:p-10 shadow-xs">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e09f3e]/20 dark:bg-[#e09f3e]/15 border border-[#e09f3e]/40 dark:border-[#e09f3e]/30 text-[#9e6310] dark:text-[#e09f3e] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Operations Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#141d18] dark:text-[#f2efe9]">
            Student Management System
          </h1>
          <p className="text-[#4d5e55] dark:text-[#a5b3aa] text-sm sm:text-base leading-relaxed">
            
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/students"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e09f3e] hover:bg-[#ebb156] text-[#0a0f0d] text-sm font-bold shadow-lg shadow-[#e09f3e]/20 transition"
            >
              <span>Open Student Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffffff] dark:bg-[#192420] hover:bg-[#f0ede4] dark:hover:bg-[#22312b] text-[#141d18] dark:text-[#f2efe9] border border-[#dcd7c9] dark:border-[#2c3e37] text-sm font-semibold transition"
            >
              <span>Architecture Overview</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map(({ label, value, sub, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] rounded-2xl p-6 flex items-center justify-between shadow-xs"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5c6d64] dark:text-[#8b9990]">
                {label}
              </p>
              <p className="text-3xl font-bold text-[#141d18] dark:text-[#f2efe9] mt-1">{value}</p>
              <p className="text-xs text-[#73827a] dark:text-[#6c7d75] mt-1">{sub}</p>
            </div>
            <div
              className={`w-12 h-12 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-6 h-6 text-[#0a0f0d]" />
            </div>
          </div>
        ))}
      </section>

      <section className="bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#141d18] dark:text-[#f2efe9]">
            Recently Enrolled Students
          </h2>
          <Link
            to="/students"
            className="text-xs font-semibold text-[#9e6310] dark:text-[#e09f3e] hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {students.length === 0 ? (
          <p className="text-sm text-[#5c6d64] dark:text-[#8b9990] py-6 text-center">
            No student records currently available. Add a student in the directory.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e0dbd0] dark:border-[#22312b] text-[11px] uppercase tracking-wider text-[#5c6d64] dark:text-[#8b9990]">
                  <th className="py-3 px-4">Register ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Year & Sem</th>
                  <th className="py-3 px-4">CGPA</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ece7dc] dark:divide-[#1c2823] text-sm">
                {students.slice(0, 5).map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-[#f6f4ef] dark:hover:bg-[#16201c] transition"
                  >
                    <td className="py-3 px-4 font-mono text-xs text-[#9e6310] dark:text-[#e09f3e]">
                      {student.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-[#141d18] dark:text-[#f2efe9]">
                      <div className="flex items-center gap-2.5">
                        <StudentAvatar student={student} size="sm" />
                        <span>{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#4d5e55] dark:text-[#a5b3aa]">
                      {student.department}
                    </td>
                    <td className="py-3 px-4 text-xs text-[#5c6d64] dark:text-[#8b9990]">
                      {student.year}
                    </td>
                    <td className="py-3 px-4 text-[#141d18] dark:text-[#f2efe9] font-semibold">
                      {student.cgpa}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/students/${student.id}`}
                        className="text-xs font-semibold text-[#9e6310] dark:text-[#e09f3e] hover:underline"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;