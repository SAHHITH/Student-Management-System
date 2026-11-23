import { useStudents } from "../context/StudentContext";
import NotFound from "../pages/NotFound";

const OfflineGuard = ({ children }) => {
  const { showOffline404 } = useStudents();

  if (showOffline404) {
    return <NotFound isOfflineMode={true} />;
  }

  return children;
};

export default OfflineGuard;