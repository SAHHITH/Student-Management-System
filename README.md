# EduPulse — Student Management System

EduPulse is a responsive, multi-page React frontend engineered for fault-tolerant academic record management. Built with **React 19**, **Vite**, **React Router v7**, and **Tailwind CSS v4**, it features real-time network awareness, a Service Worker app-shell cache, local persistence, and a custom dual-theme editorial interface.

---

## Key Features

- **Offline 404 Interception & Refresh Resilience:** Listens to real browser connectivity (`online` / `offline` events) alongside a lightweight Service Worker (`public/sw.js`). When internet connectivity disconnects—even across hard browser refreshes (`F5`)—the application replaces the interface with a minimalist **404 Offline Screen** instead of showing raw network errors, complete with an **Access Offline Student App** button to continue viewing and managing cached records.
- **Comprehensive Student Directory & CRUD:**
  - Enroll students across **12 engineering departments** and **8 semesters** (`1st Year (Sem 1)` through `4th Year (Sem 8)`).
  - Track academic metrics (Register ID, Section, CGPA, Attendance %, Admission Quota, Faculty Mentor, Technical Skills) and personal/guardian details (Gender, DOB, Blood Group, Guardian Name & Phone, City, Residential Address).
  - Delete student records from either the directory cards or the detailed profile view with safe fallback handling.
- **Real-Time Search & Multi-Criteria Filtering:** Filter students instantaneously by name, register number, email, city, department, or year/semester.
- **Dual-Theme Editorial UI:** Switch seamlessly between **Obsidian Moss & Marigold Ochre** (Dark Mode) and **Warm Parchment & Forest Ink** (Light Mode) with persistent theme storage.
- **Automatic Local Persistence:** All student additions, deletions, and theme preferences synchronize automatically with browser `localStorage`.

---

## Tech Stack

- **Frontend Framework:** React 19 + Vite 6
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React
- **Offline Caching & Storage:** Service Worker API (`public/sw.js`) + Web `localStorage`

---

## Project File Structure

```text
student-management-app/
├── public/
│   ├── favicon.svg
│   └── sw.js                     # Service worker for offline shell caching & refresh support
├── src/
│   ├── components/
│   │   ├── DashboardLayout.jsx   # Responsive shell combining Navbar, Sidebar, and Outlet
│   │   ├── Navbar.jsx            # Top navigation header with Dark/Light mode switcher
│   │   ├── OfflineGuard.jsx      # Root-level connectivity guard rendering the 404 screen
│   │   ├── Sidebar.jsx           # Collapsible navigation drawer with live student count
│   │   └── StudentCard.jsx       # Summary card with quick metrics and delete action
│   ├── context/
│   │   ├── StudentContext.jsx    # Global student CRUD state, localStorage sync & network listener
│   │   └── ThemeContext.jsx      # Dark/Light theme state and HTML class synchronization
│   ├── data/
│   │   └── mockStudents.js       # Master lists (departments, semesters, sections) & initial records
│   ├── pages/
│   │   ├── About.jsx             # System architecture and feature overview
│   │   ├── Home.jsx              # Dashboard KPIs (Total Enrolled, Active Status, Average CGPA)
│   │   ├── NotFound.jsx          # Minimalist 404 screen for offline mode and invalid routes
│   │   ├── StudentDetails.jsx    # Full academic, personal, and guardian profile view
│   │   └── Students.jsx          # Searchable directory grid and multi-section enrollment form
│   ├── App.css                   # Custom scrollbar styling
│   ├── App.jsx                   # Route definitions wrapped in Theme, Student, and Offline providers
│   ├── index.css                 # Tailwind CSS v4 import, custom dark variant, and base theme colors
│   └── main.jsx                  # React root mount and Service Worker registration
├── index.html
├── package.json
└── vite.config.js
```

---

## Application Routes

| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home` | Academic dashboard overview, enrollment KPIs, and recent student table |
| `/students` | `Students` | Searchable & filterable student directory with the **Enroll New Student** form |
| `/students/:id` | `StudentDetails` | Full student profile view with academic performance, guardian info, and delete option |
| `/about` | `About` | Architecture and offline-resilience documentation |
| `*` | `NotFound` | Minimalist 404 fallback page (also triggered automatically when offline) |

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Build for Production

```bash
npm run build
npm run preview
```

---

## Testing Offline 404 & Refresh Behavior

1. Load the application once while **Online** so `public/sw.js` registers and caches the application shell.
2. Disconnect your network (turn off Wi-Fi or open **Browser DevTools (`F12`) → Network → set throttling to `Offline`**).
3. The entire interface automatically switches to the full-screen **404 Offline Page**.
4. Refresh the browser (`F5` or `Ctrl + R`) while offline—the 404 screen persists cleanly without browser network errors.
5. Click **ACCESS OFFLINE STUDENT APP** on the 404 page to inspect, add, or delete locally stored student records while offline, or reconnect your internet to restore normal online mode automatically.
