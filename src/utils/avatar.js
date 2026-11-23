/**
 * Free open-source DiceBear avatar API generator
 * Official API Endpoint: https://api.dicebear.com/9.x/
 */
export const DEFAULT_AVATAR_STYLE = "adventurer";

export const DICEBEAR_CARTOON_STYLES = [
  { id: "adventurer", label: "Adventurer (Cartoon)" },
  { id: "avataaars", label: "Avataaars (Cartoon)" },
  { id: "lorelei", label: "Lorelei (Cartoon)" },
  { id: "bottts", label: "Bottts (Robots)" },
  { id: "open-peeps", label: "Open Peeps (Doodle)" },
];

/**
 * Returns the DiceBear avatar URL for any student or seed
 * @param {Object|string} studentOrSeed - Student object or seed string
 * @param {string} [style='adventurer'] - Avatar style
 * @returns {string} Fully-formed SVG URL from DiceBear API
 */
export const getStudentAvatarUrl = (studentOrSeed, style = DEFAULT_AVATAR_STYLE) => {
  if (!studentOrSeed) {
    return `https://api.dicebear.com/9.x/${style}/svg?seed=student`;
  }

  // If a full custom avatar URL is already provided
  if (typeof studentOrSeed === "object" && studentOrSeed.avatar) {
    return studentOrSeed.avatar;
  }

  const seed =
    typeof studentOrSeed === "object"
      ? studentOrSeed.avatarSeed || studentOrSeed.name || studentOrSeed.id || "student"
      : studentOrSeed;

  const chosenStyle =
    (typeof studentOrSeed === "object" && studentOrSeed.avatarStyle) || style;

  const cleanSeed = encodeURIComponent(String(seed).trim());
  return `https://api.dicebear.com/9.x/${chosenStyle}/svg?seed=${cleanSeed}`;
};
