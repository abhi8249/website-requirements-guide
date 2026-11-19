import { useEffect, useState, type CSSProperties } from "react";
import { HERO_SLIDES, ISO_BADGES } from "@/data/site";
import { prefersReducedMotion } from "@/hooks/use-in-view";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => setActive((a) => (a + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow enter" style={d(0)}>AI-assisted breast cancer screening</p>
          <h1 id="hero-title" className="hero-title enter" style={d(120)} aria-label="UmAnG">
            Um<em>A</em>n<em>G</em>
          </h1>
          <p className="hero-text enter" style={d(260)}>
            Umang Health Innovation brings CaTS — a contact-free, radiation-free thermal screening powered by AI — to
            homes, workplaces, hospitals and communities across India. Finding changes early gives every woman more
            options.
          </p>
          <ul className="iso-row enter" style={{ ...d(420), listStyle: "none", padding: 0 }} aria-label="Certifications">
            {ISO_BADGES.map((b) => (
              <li key={b.code} className="iso-badge" title={`ISO ${b.code} — ${b.label}`}>
                <div>
                  <span>ISO</span>
                  <b>{b.code}</b>
                  <span>{b.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="carousel enter-fade"
          style={d(200)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Highlights"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="carousel-frame">
            {HERO_SLIDES.map((s, i) => (
              <figure
                key={s.src}
                className="carousel-slide"
                data-active={i === active}
                aria-hidden={i !== active}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${HERO_SLIDES.length}`}
                style={{ margin: 0 }}
              >
                <img src={s.src} alt={s.alt} width={1280} height={853} fetchPriority={i === 0 ? "high" : "auto"} />
                <figcaption className="carousel-caption">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="carousel-dots">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className="carousel-dot"
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
