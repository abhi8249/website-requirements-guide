import { Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react";
import { CONTACT, SOCIALS } from "@/data/site";

const ICONS = { facebook: Facebook, instagram: Instagram, linkedin: Linkedin, youtube: Youtube };

export function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-contact">
        <a href={CONTACT.phoneHref}>
          <Phone size={15} aria-hidden="true" />
          <span>{CONTACT.phone}</span>
        </a>
        <a href={`mailto:${CONTACT.email}`}>
          <Mail size={15} aria-hidden="true" />
          <span>{CONTACT.email}</span>
        </a>
      </div>
      <ul className="topbar-social" style={{ listStyle: "none", margin: 0, padding: 0 }} aria-label="Social media">
        {SOCIALS.map((s) => {
          const Icon = ICONS[s.icon];
          return (
            <li key={s.label}>
              <a className="social-link" href={s.href} target="_blank" rel="noreferrer" aria-label={`Umang Health on ${s.label}`}>
                <Icon size={15} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
