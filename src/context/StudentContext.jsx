import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { initialStudents } from "../data/mockStudents";
import { getStudentAvatarUrl } from "../utils/avatar";

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

const NETWORK_STORAGE_KEY = "edupulse_network_status";

const getInitialOnlineStatus = () => {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return false;
  }
  try {
    const cached =
      sessionStorage.getItem(NETWORK_STORAGE_KEY) ||
      localStorage.getItem(NETWORK_STORAGE_KEY);
    if (cached === "offline") {
      return false;
    }
  } catch {
    // Ignore storage errors
  }
  return true;
};

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem("edupulse_students_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((s) => ({
          ...s,
          avatar: s.avatar || getStudentAvatarUrl(s),
        }));
      }
      return initialStudents;
    } catch {
      return initialStudents;
    }
  });

  const [isOnline, setIsOnline] = useState(getInitialOnlineStatus);

  useEffect(() => {
    try {
      localStorage.setItem("edupulse_students_v2", JSON.stringify(students));
    } catch (err) {
      console.warn("Storage sync skipped:", err);
    }
  }, [students]);

  const updateOnlineStatus = useCallback((online) => {
    setIsOnline(online);
    try {
      const val = online ? "online" : "offline";
      sessionStorage.setItem(NETWORK_STORAGE_KEY, val);
      localStorage.setItem(NETWORK_STORAGE_KEY, val);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const pingCheck = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      return false;
    }

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);
      await fetch(`https://www.google.com/favicon.ico?_t=${Date.now()}`, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
        signal: controller.signal,
      });
      clearTimeout(timer);
      return true;
    } catch {
      // Primary probe failed; try secondary probe
      try {
        const backupController = new AbortController();
        const backupTimer = setTimeout(() => backupController.abort(), 2000);
        await fetch(`https://1.1.1.1/cdn-cgi/trace?_t=${Date.now()}`, {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-store",
          signal: backupController.signal,
        });
        clearTimeout(backupTimer);
        return true;
      } catch {
        return false;
      }
    }
  }, []);

  const verifyConnectivity = useCallback(async () => {
    const connected = await pingCheck();
    updateOnlineStatus(connected);
    return connected;
  }, [pingCheck, updateOnlineStatus]);

  useEffect(() => {
    // Check network immediately on mount
    verifyConnectivity();

    const handleOffline = () => {
      updateOnlineStatus(false);
    };

    const handleOnline = () => {
      verifyConnectivity();
    };

    const handleVisibilityOrFocus = () => {
      verifyConnectivity();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("focus", handleVisibilityOrFocus);
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);

    // Periodic check to detect network drops or reconnects
    const intervalId = setInterval(() => {
      verifyConnectivity();
    }, 4000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      clearInterval(intervalId);
    };
  }, [verifyConnectivity, updateOnlineStatus]);

  const addStudent = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const resetDemoData = () => {
    setStudents(initialStudents);
  };

  const showOffline404 = !isOnline;

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        deleteStudent,
        resetDemoData,
        isOnline,
        showOffline404,
        checkConnection: verifyConnectivity,
        setAllowOfflineAccess: () => {},
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
