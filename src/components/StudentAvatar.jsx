import { useState } from "react";
import { getStudentAvatarUrl } from "../utils/avatar";

const StudentAvatar = ({
  student,
  size = "md",
  className = "",
  style,
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 rounded-lg text-xs",
    md: "w-12 h-12 rounded-xl text-lg",
    lg: "w-24 h-24 rounded-2xl text-3xl",
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.md;
  const avatarUrl = getStudentAvatarUrl(student, style);
  const initial = (student?.name || "S").charAt(0).toUpperCase();

  return (
    <div
      className={`relative ${currentSizeClass} bg-linear-to-br from-[#e09f3e]/25 to-[#d95d39]/25 dark:from-[#e09f3e]/20 dark:to-[#d95d39]/20 border border-[#e09f3e]/40 dark:border-[#e09f3e]/35 flex items-center justify-center overflow-hidden shrink-0 shadow-xs ${className}`}
    >
      {!hasError ? (
        <img
          src={avatarUrl}
          alt={student?.name ? `${student.name}'s Avatar` : "Student Avatar"}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="font-bold text-[#9e6310] dark:text-[#e09f3e]">
          {initial}
        </span>
      )}
    </div>
  );
};

export default StudentAvatar;
