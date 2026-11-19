import { Link } from "@tanstack/react-router";

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="15" fill="none" stroke="var(--primary)" strokeWidth="7" strokeDasharray="78 200" strokeLinecap="round" transform="rotate(-60 20 20)" />
      <circle cx="20" cy="20" r="15" fill="none" stroke="var(--rose)" strokeWidth="7" strokeDasharray="12 200" strokeDashoffset="-86" strokeLinecap="round" transform="rotate(-60 20 20)" />
      <circle cx="20" cy="20" r="5" fill="var(--rose)" />
    </svg>
  );
}

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Umang Health Innovation home">
      <LogoMark />
      <span>
        Umang
        <small>Health Innovation</small>
      </span>
    </Link>
  );
}
