import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudents } from "../context/StudentContext";

const NotFound = ({ isOfflineMode = false }) => {
  const { checkConnection } = useStudents();
  const [checking, setChecking] = useState(false);

  const handleRetry = async () => {
    setChecking(true);
    if (checkConnection) {
      const connected = await checkConnection();
      if (!connected) {
        setChecking(false);
      }
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] text-[#111111] flex flex-col items-center justify-center px-6 text-center select-none">
      <h1 className="text-[7rem] sm:text-[9.5rem] font-black leading-none tracking-tight text-[#0a0a0a]">
        404
      </h1>

      <h2 className="mt-2 text-xl sm:text-3xl font-bold tracking-tight text-[#666666]">
        Oops, This Page Not Found!
      </h2>

      <p className="mt-2 text-base sm:text-xl font-medium text-[#b8b8b8]">
        {isOfflineMode
          ? "The internet connection might be disconnected."
          : "The link might be corrupted."}
      </p>
      <p className="mt-1 text-xs sm:text-sm font-medium text-[#777777]">
        {isOfflineMode
          ? "or the network may have been turned off in the system"
          : "or the page may have been removed"}
      </p>

      <div className="mt-8">
        {isOfflineMode ? (
          <button
            onClick={handleRetry}
            disabled={checking}
            className="px-7 py-3 bg-[#141414] hover:bg-[#2b2b2b] active:scale-[0.99] text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] transition cursor-pointer shadow-sm disabled:opacity-50"
          >
            {checking ? "CHECKING NETWORK..." : "RETRY CONNECTION"}
          </button>
        ) : (
          <Link
            to="/"
            className="inline-block px-7 py-3 bg-[#141414] hover:bg-[#2b2b2b] text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] transition shadow-sm"
          >
            GO BACK HOME
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
