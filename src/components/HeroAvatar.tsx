const COLORS = [
  ["#e85d3a", "#d14a2a"],
  ["#c2410c", "#9a3412"],
  ["#b91c1c", "#7f1d1d"],
  ["#d97706", "#b45309"],
  ["#dc2626", "#991b1b"],
  ["#ea580c", "#c2410c"],
  ["#b45309", "#92400e"],
  ["#e11d48", "#be123c"],
];

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function initials(name: string) {
  return name
    .split(/\s|-|&/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => (w === "&" ? "&" : w[0]))
    .join("")
    .toUpperCase();
}

export function HeroAvatar({
  name,
  size = 64,
}: {
  name: string;
  size?: number;
}) {
  const [c1, c2] = colorFor(name);
  const fs = Math.round(size * 0.36);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <defs>
        <linearGradient id={`g-${name.replace(/\s/g, "")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width={size - 2}
        height={size - 2}
        rx="2"
        fill={`url(#g-${name.replace(/\s/g, "")})`}
      />
      <text
        x={size / 2}
        y={size / 2}
        dominantBaseline="central"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize={fs}
        letterSpacing="-0.02em"
      >
        {initials(name)}
      </text>
    </svg>
  );
}
