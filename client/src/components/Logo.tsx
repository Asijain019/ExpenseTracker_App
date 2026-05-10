import { Link } from "wouter";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  light?: boolean;
  showText?: boolean;
  asLink?: boolean;
}

export const LogoIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="11" fill="url(#logoGrad)" />
    <rect x="7" y="14" width="20" height="14" rx="2.5" stroke="white" strokeWidth="2" fill="none" />
    <path d="M7 20h20" stroke="white" strokeWidth="2" />
    <circle cx="21" cy="24.5" r="2" fill="white" />
    <path d="M10 23l2-2.2 2 1.5 2.2-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 14v-2a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 25 12v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#4338CA" />
      </linearGradient>
    </defs>
  </svg>
);

export function Logo({ size = "md", light = false, showText = true, asLink = true }: LogoProps) {
  const sizeMap = {
    sm: { icon: 30, text: "text-base" },
    md: { icon: 38, text: "text-xl" },
    lg: { icon: 46, text: "text-2xl" },
  };
  const s = sizeMap[size];

  const content = (
    <div className="flex items-center gap-2.5">
      <LogoIcon size={s.icon} />
      {showText && (
        <span className={`font-bold tracking-tight ${s.text} ${light ? "text-white" : "text-slate-900"}`}>
          Expense Tracker
        </span>
      )}
    </div>
  );

  if (asLink) {
    return <Link href="/" className="inline-flex items-center">{content}</Link>;
  }
  return <div className="inline-flex items-center">{content}</div>;
}
