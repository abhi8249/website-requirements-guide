import { Link } from "@tanstack/react-router";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { label: "Breast Screening", hash: "screening" },
  { label: "Technology", hash: "technology" },
  { label: "Breast health", hash: "process" },
];

type Props = { backTo?: "/" | "/breast-screening"; backLabel?: string };

export function ScreeningNav({ backTo = "/", backLabel = "Back to home" }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-shell">
        <nav className="sub-nav" aria-label="Breast screening">
          <Link to={backTo} className="icon-btn" aria-label={backLabel}>
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
          <ul className="sub-nav-links">
            {LINKS.map((l) => (
              <li key={l.hash}>
                <Link to="/breast-screening" hash={l.hash} className="nav-link">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/booking" className="nav-link">
                Book a screening
              </Link>
            </li>
          </ul>
          <Brand />
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="screening-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </nav>
        <div id="screening-menu" className="mobile-panel" data-open={open} inert={!open}>
          <div>
            <ul className="mobile-list">
              {LINKS.map((l) => (
                <li key={l.hash}>
                  <Link to="/breast-screening" hash={l.hash} onClick={() => setOpen(false)}>{l.label}</Link>
                </li>
              ))}
              <li><Link to="/booking" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>Book a screening</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
