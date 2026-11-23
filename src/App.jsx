import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { StudentProvider } from "./context/StudentContext";
import DashboardLayout from "./components/DashboardLayout";
import OfflineGuard from "./components/OfflineGuard";
import Home from "./pages/Home";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <BrowserRouter>
          <OfflineGuard>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/students" element={<Students />} />
                <Route path="/students/:id" element={<StudentDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </OfflineGuard>
        </BrowserRouter>
      </StudentProvider>
    </ThemeProvider>
  );
}

export default App;