import { useState } from "react";
import { Search, UserPlus, RotateCcw, X, CheckCircle2 } from "lucide-react";
import { useStudents } from "../context/StudentContext";
import {
  DEPARTMENTS,
  YEAR_SEMESTERS,
  SECTIONS,
  BLOOD_GROUPS,
} from "../data/mockStudents";
import StudentCard from "../components/StudentCard";
import { getStudentAvatarUrl } from "../utils/avatar";

const Students = () => {
  const { students, addStudent, deleteStudent, resetDemoData } = useStudents();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState("");

  const initialFormState = {
    id: "",
    name: "",
    email: "",
    phone: "",
    department: DEPARTMENTS[0],
    year: "3rd Year (Sem 5)",
    section: SECTIONS[0],
    cgpa: "",
    attendance: "",
    status: "Active",
    gender: "Male",
    dob: "",
    bloodGroup: "O+",
    quota: "Government (TNEA)",
    mentor: "",
    guardianName: "",
    guardianPhone: "",
    city: "",
    address: "",
    skills: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const filterDepartments = ["All", ...new Set([...DEPARTMENTS, ...students.map((s) => s.department)])];
  const filterYears = ["All", ...YEAR_SEMESTERS];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      (student.city || "").toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === "All" || student.department === deptFilter;
    const matchesYear = yearFilter === "All" || student.year === yearFilter;
    return matchesSearch && matchesDept && matchesYear;
  });

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!formData.id.trim() || !formData.name.trim() || !formData.email.trim()) return;

    const exists = students.some((s) => s.id === formData.id.trim());
    if (exists) {
      triggerToast("A student with this Register ID already exists.");
      return;
    }

    const newRecord = {
      id: formData.id.trim(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || "+91 90000 00000",
      department: formData.department,
      year: formData.year,
      section: formData.section,
      cgpa: parseFloat(formData.cgpa) || 8.0,
      attendance: parseInt(formData.attendance, 10) || 85,
      status: formData.status,
      gender: formData.gender,
      dob: formData.dob || "2005-01-01",
      bloodGroup: formData.bloodGroup,
      quota: formData.quota,
      mentor: formData.mentor.trim() || "Assigned Faculty Advisor",
      guardianName: formData.guardianName.trim() || "Parent / Guardian",
      guardianPhone: formData.guardianPhone.trim() || "+91 90000 00001",
      city: formData.city.trim() || "Chennai, TN",
      address: formData.address.trim() || "Chennai, Tamil Nadu, India",
      skills: formData.skills
        ? formData.skills.split(",").map((sk) => sk.trim()).filter(Boolean)
        : ["Problem Solving"],
      avatar: getStudentAvatarUrl(formData.name.trim()),
      enrollmentDate: new Date().toISOString().split("T")[0],
    };

    addStudent(newRecord);
    setFormData(initialFormState);
    setShowAddForm(false);
    triggerToast(`Added ${newRecord.name} to directory.`);
  };

  const handleDelete = (id, name) => {
    deleteStudent(id);
    triggerToast(`Removed ${name} (${id}).`);
  };

  const inputClass =
    "w-full bg-[#f6f4ef] dark:bg-[#0a0f0d] border border-[#dcd7c9] dark:border-[#22312b] rounded-xl px-3.5 py-2.5 text-sm text-[#141d18] dark:text-[#f2efe9] placeholder:text-[#73827a] dark:placeholder:text-[#6c7d75] focus:outline-none focus:border-[#e09f3e]";

  const labelClass =
    "block text-[11px] font-semibold uppercase tracking-wider text-[#5c6d64] dark:text-[#8b9990] mb-1";

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#ffffff] dark:bg-[#16201c] border border-[#e09f3e] text-[#141d18] dark:text-[#f2efe9] px-4 py-3 rounded-xl shadow-2xl text-sm">
          <CheckCircle2 className="w-4 h-4 text-[#265c3b] dark:text-[#9bc1a3]" />
          <span>{toast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#141d18] dark:text-[#f2efe9]">
            Students Directory
          </h1>
          <p className="text-sm text-[#5c6d64] dark:text-[#8b9990]">
            Showing {filteredStudents.length} of {students.length} enrolled students
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          {students.length === 0 && (
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ffffff] dark:bg-[#192420] hover:bg-[#f0ede4] dark:hover:bg-[#22312b] text-[#141d18] dark:text-[#f2efe9] border border-[#dcd7c9] dark:border-[#22312b] text-xs font-semibold transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore Sample Data</span>
            </button>
          )}
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e09f3e] hover:bg-[#ebb156] text-[#0a0f0d] text-sm font-bold shadow-lg shadow-[#e09f3e]/20 transition cursor-pointer"
          >
            {showAddForm ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{showAddForm ? "Close Form" : "Add New Student"}</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleCreateStudent}
          className="bg-[#ffffff] dark:bg-[#111916] border border-[#e09f3e]/60 dark:border-[#e09f3e]/35 rounded-2xl p-6 space-y-6 shadow-lg"
        >
          <div className="border-b border-[#ece7dc] dark:border-[#22312b] pb-3">
            <h2 className="text-base font-bold text-[#141d18] dark:text-[#f2efe9]">
              Enroll New Student
            </h2>
            <p className="text-xs text-[#5c6d64] dark:text-[#8b9990]">
              Complete academic, personal, and guardian details below.
            </p>
          </div>

          {/* Section 1: Core Academic Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9e6310] dark:text-[#e09f3e]">
              1. Academic & Department Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Register Number *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 311824103099"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Aarav Sundaram"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>College Email *</label>
                <input
                  required
                  type="email"
                  placeholder="student@msajce.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className={inputClass}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Year & Semester</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className={inputClass}
                >
                  {YEAR_SEMESTERS.map((ys) => (
                    <option key={ys} value={ys}>
                      {ys}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Class Section</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className={inputClass}
                >
                  {SECTIONS.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>CGPA (0 - 10)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="e.g. 8.95"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Attendance (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 92"
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Admission Quota</label>
                <select
                  value={formData.quota}
                  onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
                  className={inputClass}
                >
                  <option value="Government (TNEA)">Government (TNEA)</option>
                  <option value="Management">Management</option>
                  <option value="Lateral Entry">Lateral Entry</option>
                  <option value="Sports / Merit Scholarship">Sports / Merit Scholarship</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Faculty Mentor</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. S. Kavitha"
                  value={formData.mentor}
                  onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Enrollment Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={inputClass}
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Technical Skills (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Python, Machine Learning"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Personal & Guardian Details */}
          <div className="space-y-3 pt-2 border-t border-[#ece7dc] dark:border-[#22312b]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9e6310] dark:text-[#e09f3e]">
              2. Personal & Guardian Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Student Phone</label>
                <input
                  type="text"
                  placeholder="+91 98400 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className={inputClass}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className={inputClass}
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Parent / Guardian Name</label>
                <input
                  type="text"
                  placeholder="e.g. Mr. R. Sundaram"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Parent / Guardian Phone</label>
                <input
                  type="text"
                  placeholder="+91 94440 00000"
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>City / District</label>
                <input
                  type="text"
                  placeholder="e.g. Chennai, TN"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Residential Address</label>
                <input
                  type="text"
                  placeholder="Street, Locality, City, State & Pincode"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#84a98c] hover:bg-[#9bc1a3] text-[#0a0f0d] text-sm font-bold transition cursor-pointer"
            >
              Save Student Record
            </button>
          </div>
        </form>
      )}

      {/* Search & Multi-Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#73827a] dark:text-[#6c7d75] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, register ID, email, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#141d18] dark:text-[#f2efe9] placeholder:text-[#73827a] dark:placeholder:text-[#6c7d75] focus:outline-none focus:border-[#e09f3e]"
          />
        </div>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] rounded-xl px-4 py-2.5 text-sm text-[#141d18] dark:text-[#f2efe9] focus:outline-none focus:border-[#e09f3e]"
        >
          {filterDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept === "All" ? "All Departments" : dept}
            </option>
          ))}
        </select>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] rounded-xl px-4 py-2.5 text-sm text-[#141d18] dark:text-[#f2efe9] focus:outline-none focus:border-[#e09f3e]"
        >
          {filterYears.map((yr) => (
            <option key={yr} value={yr}>
              {yr === "All" ? "All Years & Semesters" : yr}
            </option>
          ))}
        </select>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="text-center py-16 bg-[#ffffff] dark:bg-[#111916] border border-[#e0dbd0] dark:border-[#22312b] rounded-2xl">
          <p className="text-[#141d18] dark:text-[#f2efe9] font-medium">
            No matching student records found.
          </p>
          <p className="text-xs text-[#73827a] dark:text-[#6c7d75] mt-1">
            Try clearing your search filter or add a new student above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;