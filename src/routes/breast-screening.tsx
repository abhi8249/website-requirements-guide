import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Armchair, BrainCircuit, Briefcase, Calendar, Dna, FileText, Hospital, Mail, MapPin, Phone, Play, Stethoscope, Thermometer, UserRound, Users, Venus,
} from "lucide-react";
import { Fragment, useRef, useState } from "react";
import portrait from "@/assets/screening-portrait.webp";
import poster from "@/assets/video-poster.webp";
import { Accordion } from "@/components/Accordion";
import { ImageCard } from "@/components/Card";
import { Counter } from "@/components/Counter";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ScreeningNav } from "@/components/ScreeningNav";
import { CATS_FEATURES, FAQS, PROCESS, SOLUTIONS, STATS } from "@/data/site";
import { isValidPhone } from "@/lib/booking";

export const Route = createFileRoute("/breast-screening")({
  head: () => ({
    meta: [
      { title: "Breast Screening powered by CaTS — Umang Health" },
      { name: "description", content: "Painless, radiation-free AI breast thermal screening. 86% sensitivity, 82% specificity. Book a home screening for ₹500." },
      { property: "og:title", content: "Breast Screening, Powered by CaTS" },
      { property: "og:description", content: "Contact-free AI breast thermal screening for women, workplaces and hospitals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BreastScreening,
});

const SOL_ICONS = { venus: Venus, briefcase: Briefcase, users: Users, hospital: Hospital, dna: Dna };
const PROC_ICONS = { calendar: Calendar, armchair: Armchair, thermometer: Thermometer, brain: BrainCircuit, stethoscope: Stethoscope, file: FileText };

function BreastScreening() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScreeningNav />
      <main id="main">
        <section className="section" aria-label="Why it matters">
          <div className="quote-block enter">
            <span className="quote-mark open" aria-hidden="true">“</span>
            <blockquote>
              <strong>70%</strong> of breast cancer cases are diagnosed in last stages.
            </blockquote>
            <span className="quote-mark close" aria-hidden="true">”</span>
          </div>
        </section>

        <LeadHero />

        <section className="section" aria-labelledby="solutions-title">
          <div className="container">
            <h2 id="solutions-title" className="solutions-title">Our <span>Solutions</span></h2>
            <div className="title-rule" />
            <ul className="solutions-row" style={{ listStyle: "none", padding: 0 }}>
              {SOLUTIONS.map((s) => {
                const Icon = SOL_ICONS[s.icon];
                return (
                  <li key={s.title} className="solution-tile">
                    <span className="icon-chip icon-chip-rose" aria-hidden="true"><Icon size={22} /></span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="technology" className="section-tight" aria-labelledby="cats-title" style={{ scrollMarginTop: "6rem" }}>
          <div className="container">
            <div className="cats-box">
              <header>
                <h2 id="cats-title" className="h-section">CaTS</h2>
                <p className="eyebrow" style={{ marginTop: "0.5rem" }}>Temperature-based, contact-free screening</p>
              </header>
              <div className="grid-3">
                {CATS_FEATURES.map((f, i) => (
                  <Reveal key={f.title} delay={i * 100}>
                    <ImageCard title={f.title} text={f.text} src={f.src} alt={f.alt} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Accuracy">
          <div className="stats">
            {STATS.map((s, i) => (
              <Fragment key={s.label}>
                {i > 0 && <span className="stat-divider" aria-hidden="true" />}
                <div className="stat">
                  <p className="stat-label">{s.label}</p>
                  <Counter value={s.value} suffix="%" className="stat-value" />
                  <p className="stat-note">{s.note}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </section>

        <section id="process" className="section-tight" aria-labelledby="process-title" style={{ scrollMarginTop: "6rem" }}>
          <div className="container">
            <div className="process-head">
              <h2 id="process-title" className="h-section">Screening Process at a Glance</h2>
              <p className="lead" style={{ marginTop: "0.75rem" }}>Six simple steps from booking to your report — about 20 minutes of your time.</p>
            </div>
            <ol className="process-grid" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {PROCESS.map((p, i) => {
                const Icon = PROC_ICONS[p.icon];
                return (
                  <Reveal as="li" key={p.title} delay={(i % 3) * 90} className="process-item">
                    <span className="icon-chip" aria-hidden="true"><Icon size={20} /></span>
                    <span className="step-num">Step {i + 1}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="section" aria-label="How CaTS works video">
          <div className="container"><VideoBlock /></div>
        </section>

        <section id="faq" className="section-tight" aria-labelledby="faq-title" style={{ scrollMarginTop: "6rem" }}>
          <div className="container faq-grid">
            <div className="stack-sm">
              <h2 id="faq-title" className="faq-title">Frequently Asked Questions</h2>
              <p className="muted">From preparation to results, here's what women ask most.</p>
            </div>
            <Accordion items={FAQS} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function VideoBlock() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="video-frame">
      {playing ? (
        <video ref={ref} src="/media/screening-walkthrough.mp4" poster={poster} controls autoPlay playsInline aria-label="How a CaTS screening works" />
      ) : (
        <>
          <img src={poster} alt="A technician guides a woman to the contact-free thermal camera" loading="lazy" width={1280} height={720} />
          <button type="button" className="play-btn" aria-label="Play video: how a CaTS screening works" onClick={() => setPlaying(true)}>
            <Play size={30} fill="currentColor" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}

type Lead = { name: string; phone: string; email: string; city: string };

function LeadHero() {
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead>({ name: "", phone: "", email: "", city: "" });
  const [errors, setErrors] = useState<Partial<Lead>>({});
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const validate = () => {
    const e: Partial<Lead> = {};
    if (lead.name.trim().length < 2) e.name = "Enter your name.";
    if (!isValidPhone("+91", lead.phone)) e.phone = "Enter a 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email.trim())) e.email = "Enter a valid email.";
    if (lead.city.trim().length < 2) e.city = "Enter your city.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const fields: { k: keyof Lead; label: string; type: string; icon: typeof UserRound; auto: string }[] = [
    { k: "name", label: "Full name", type: "text", icon: UserRound, auto: "name" },
    { k: "phone", label: "Mobile number", type: "tel", icon: Phone, auto: "tel-national" },
    { k: "email", label: "Email", type: "email", icon: Mail, auto: "email" },
    { k: "city", label: "City", type: "text", icon: MapPin, auto: "address-level2" },
  ];

  return (
    <section id="screening" className="pink-hero" aria-labelledby="screening-title" style={{ scrollMarginTop: "6rem" }}>
      <div className="container pink-grid">
        <div className="pink-media enter-fade">
          <img src={portrait} alt="A smiling woman in her forties" width={900} height={900} />
        </div>
        <div className="enter" style={{ ["--d" as string]: "150ms" }}>
          <h1 id="screening-title" className="pink-title">
            Breast Screening<span>Powered by CaTS</span>
          </h1>
          <form className="lead-form" noValidate onSubmit={(e) => e.preventDefault()}>
            {fields.map(({ k, label, type, icon: Icon, auto }) => (
              <div className="field" key={k}>
                <label htmlFor={`lead-${k}`}>{label}</label>
                <div className="input-icon">
                  <Icon size={16} aria-hidden="true" />
                  <input
                    id={`lead-${k}`}
                    className="input"
                    type={type}
                    autoComplete={auto}
                    value={lead[k]}
                    aria-invalid={!!errors[k]}
                    aria-describedby={errors[k] ? `lead-${k}-err` : undefined}
                    onChange={(e) => setLead({ ...lead, [k]: e.target.value })}
                  />
                </div>
                {errors[k] && <p id={`lead-${k}-err`} className="field-error">{errors[k]}</p>}
              </div>
            ))}
          </form>
          <div className="lead-actions">
            <button
              type="button"
              className="btn btn-rose btn-lg"
              onClick={() => validate() && navigate({ to: "/booking", search: { name: lead.name, phone: lead.phone, email: lead.email } })}
            >
              Get Screened
            </button>
            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => validate() && setStatus({ ok: true, msg: `Thanks, ${lead.name.trim()}. Our team will call you within one working day to arrange a demo.` })}
            >
              Request a Demo
            </button>
          </div>
          <div aria-live="polite">{status && <p className={`form-status ${status.ok ? "ok" : "err"}`}>{status.msg}</p>}</div>
        </div>
      </div>
    </section>
  );
}
