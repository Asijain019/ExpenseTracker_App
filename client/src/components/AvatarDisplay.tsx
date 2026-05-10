export const AVATAR_CONFIGS = [
  { seed: "Felix", bg: "b6e3f4" },
  { seed: "Maria", bg: "c0aede" },
  { seed: "James", bg: "ffd5dc" },
  { seed: "Sofia", bg: "d1d4f9" },
  { seed: "Carlos", bg: "c3e6cb" },
  { seed: "Emma", bg: "fef3c7" },
  { seed: "Michael", bg: "fed7aa" },
  { seed: "Aisha", bg: "a7f3d0" },
  { seed: "David", bg: "e9d5ff" },
  { seed: "Priya", bg: "fce7f3" },
  { seed: "Lucas", bg: "dbeafe" },
  { seed: "Nina", bg: "dcfce7" },
];

export const AVATARS: Record<string, { bg: string; element: React.ReactNode }> = Object.fromEntries(
  AVATAR_CONFIGS.map((av, i) => [
    String(i + 1),
    {
      bg: `#${av.bg}`,
      element: (
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${av.seed}&backgroundColor=${av.bg}&radius=50`}
          alt={`Avatar ${i + 1}`}
          style={{ width: "100%", height: "100%" }}
        />
      ),
    },
  ])
);

export function getAvatarUrl(avatarId: string): string {
  if (!avatarId || avatarId.startsWith("data:image")) return "";
  const idx = Math.min(Math.max((parseInt(avatarId) || 1) - 1, 0), AVATAR_CONFIGS.length - 1);
  const av = AVATAR_CONFIGS[idx];
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${av.seed}&backgroundColor=${av.bg}&radius=50`;
}

export function AvatarDisplay({
  avatarId,
  size = 40,
  className = "",
}: {
  avatarId: string;
  size?: number;
  className?: string;
}) {
  if (avatarId && avatarId.startsWith("data:image")) {
    return (
      <div
        className={`overflow-hidden flex items-center justify-center rounded-full bg-muted ${className}`}
        style={{ width: size, height: size }}
      >
        <img src={avatarId} alt="Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  const url = getAvatarUrl(avatarId || "1");

  return (
    <div
      className={`overflow-hidden flex items-center justify-center rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <img src={url} alt="Avatar" className="w-full h-full object-cover" />
    </div>
  );
}
