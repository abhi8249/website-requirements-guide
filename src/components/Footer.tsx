import { Link } from "@tanstack/react-router";
import { CONTACT } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-shell">
        <p>
          Copyright © {new Date().getFullYear()} <strong>Umang Health Innovation</strong>. All rights reserved. ·{" "}
          <a href={`mailto:${CONTACT.email}`} style={{ color: "var(--primary)", fontWeight: 600 }}>{CONTACT.email}</a> ·{" "}
          <a href={CONTACT.phoneHref} style={{ color: "var(--primary)", fontWeight: 600 }}>{CONTACT.phone}</a>
        </p>
        <nav className="footer-links" aria-label="Legal">
          <Link to="/gdpr">GDPR</Link>
          <span aria-hidden="true">|</span>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
