import { ReactNode } from "react";
export const AVATARS: Record<string, { bg: string; element: ReactNode }> = {
  "1": { bg: "#FFB6C1", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#FFDBB5"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 65 Q50 75 60 65" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "2": { bg: "#AEC6CF", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#F1C27D"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 60 Q50 70 60 60" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "3": { bg: "#77DD77", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#E0AC69"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 65 Q50 75 60 65" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "4": { bg: "#FDFD96", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#C68642"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 60 Q50 70 60 60" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "5": { bg: "#FF6961", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#8D5524"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 65 Q50 75 60 65" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "6": { bg: "#CB99C9", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#FFDBB5"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 60 Q50 70 60 60" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "7": { bg: "#F49AC2", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#F1C27D"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 65 Q50 75 60 65" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "8": { bg: "#CFCFC4", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#E0AC69"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 60 Q50 70 60 60" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "9": { bg: "#B39EB5", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#C68642"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 65 Q50 75 60 65" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "10": { bg: "#FFD1DC", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#8D5524"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 60 Q50 70 60 60" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "11": { bg: "#DEA5A4", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#FFDBB5"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 65 Q50 75 60 65" stroke="black" strokeWidth="3" fill="transparent"/></svg> },
  "12": { bg: "#FFB347", element: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#F1C27D"/><circle cx="35" cy="45" r="5"/><circle cx="65" cy="45" r="5"/><path d="M40 60 Q50 70 60 60" stroke="black" strokeWidth="3" fill="transparent"/></svg> }
};

export function AvatarDisplay({ avatarId, size = 40, className = "" }: { avatarId: string; size?: number; className?: string }) {
  const av = AVATARS[avatarId] || AVATARS["1"];
  // If it's a base64 image (user uploaded), render an img tag instead of SVG
  if (avatarId && avatarId.startsWith('data:image')) {
    return (
      <div className={`overflow-hidden flex items-center justify-center rounded-full bg-muted ${className}`} style={{ width: size, height: size }}>
        <img src={avatarId} alt="Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`overflow-hidden flex items-center justify-center rounded-full ${className}`} style={{ width: size, height: size, background: av.bg }}>
      {av.element}
    </div>
  );
}