import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { TopBar } from "./TopBar";

const PRODUCTS = [
  { label: "CaTS Breast Screening", desc: "AI-assisted, contact-free thermal screening", to: "/breast-screening" as const },
  { label: "All products", desc: "Screening system and care dashboard", to: "/" as const, hash: "products" },
];

export function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!productsOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setProductsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProductsOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [productsOpen]);

  const close = () => {
    setMobileOpen(false);
    setProductsOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-shell">
        <TopBar />
        <nav className="navbar" aria-label="Main">
          <Brand />
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link" activeOptions={{ exact: true, includeHash: false }}>
                Home
              </Link>
            </li>
            <li
              className="dropdown"
              ref={dropdownRef}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className="nav-link"
                aria-expanded={productsOpen}
                aria-controls="products-menu"
                onClick={() => setProductsOpen((o) => !o)}
              >
                Products <ChevronDown size={16} className="dropdown-chevron" aria-hidden="true" />
              </button>
              <ul id="products-menu" className="dropdown-menu" data-open={productsOpen}>
                {PRODUCTS.map((p) => (
                  <li key={p.label}>
                    <Link to={p.to} hash={p.hash} className="dropdown-item" onClick={close} tabIndex={productsOpen ? 0 : -1}>
                      <strong>{p.label}</strong>
                      <span>{p.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link to="/" hash="impact" className="nav-link">
                Services
              </Link>
            </li>
            <li>
              <Link to="/" hash="stories" className="nav-link">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/" hash="contact" className="nav-link">
                Contact us
              </Link>
            </li>
          </ul>
          <div className="nav-actions">
            <Link to="/booking" className="btn btn-primary nav-cta">
              Book a screening
            </Link>
            <ThemeToggle />
            <button
              type="button"
              className="icon-btn menu-toggle"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
        <div id="mobile-menu" className="mobile-panel" data-open={mobileOpen} inert={!mobileOpen}>
          <div>
            <ul className="mobile-list">
              <li><Link to="/" onClick={close}>Home</Link></li>
              <li><span className="eyebrow" style={{ padding: "0.5rem 0.75rem", display: "block" }}>Products</span></li>
              {PRODUCTS.map((p) => (
                <li key={p.label}>
                  <Link to={p.to} hash={p.hash} className="mobile-sub" onClick={close}>{p.label}</Link>
                </li>
              ))}
              <li><Link to="/" hash="impact" onClick={close}>Services</Link></li>
              <li><Link to="/" hash="stories" onClick={close}>Blog</Link></li>
              <li><Link to="/" hash="contact" onClick={close}>Contact us</Link></li>
              <li><Link to="/booking" className="btn btn-primary btn-block" onClick={close}>Book a screening</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
