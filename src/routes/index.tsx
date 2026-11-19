import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChartLine, Mail, Megaphone, ShoppingCart } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IconCard, ImageCard } from "@/components/Card";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { ALT_BLOCKS, IMPACT, PILLARS, PRODUCTS } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Umang Health Innovation — AI breast cancer screening (CaTS)" },
      { name: "description", content: "Contact-free, radiation-free AI-assisted breast thermal screening for women, hospitals and communities across India." },
      { property: "og:title", content: "Umang Health Innovation — AI breast cancer screening" },
      { property: "og:description", content: "CaTS: contact-free, AI-assisted breast thermal screening across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const IMPACT_ICONS = { megaphone: Megaphone, chart: ChartLine, mail: Mail, cart: ShoppingCart };

function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />

        <section className="section" aria-label="Our approach">
          <div className="container grid-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <ImageCard titleFirst title={p.title} src={p.src} alt={p.alt} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="products" className="section section-divider" aria-labelledby="products-title" style={{ scrollMarginTop: "8rem" }}>
          <div className="container center">
            <Reveal>
              <h2 id="products-title" className="h-section">Our Products</h2>
              <p className="lead" style={{ marginTop: "1rem" }}>
                Simple tools for women and powerful ones for clinicians — built to find breast changes early.
              </p>
            </Reveal>
            <div className="grid-2 products-grid" style={{ textAlign: "left" }}>
              {PRODUCTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 120}>
                  <ImageCard title={p.title} text={p.text} src={p.src} alt={p.alt} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="impact" className="section section-divider" aria-labelledby="impact-title" style={{ scrollMarginTop: "8rem" }}>
          <div className="container impact-grid">
            <Reveal className="stack">
              <h2 id="impact-title" className="h-section">Our Impact</h2>
              <p className="lead">
                We work with hospitals, employers and community groups so more women get screened earlier — close to home and at a fair price.
              </p>
              <Link to="/breast-screening" className="btn btn-primary">
                Learn more <ArrowRight size={16} className="arrow" aria-hidden="true" />
              </Link>
            </Reveal>
            <div className="feature-2x2">
              {IMPACT.map((f, i) => {
                const Icon = IMPACT_ICONS[f.icon];
                return (
                  <Reveal key={f.title} delay={i * 90}>
                    <IconCard icon={<Icon size={20} />} title={f.title} text={f.text} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="stories" className="section section-divider" aria-label="Stories" style={{ scrollMarginTop: "8rem" }}>
          <div className="container">
            <div className="alt-shell">
              {ALT_BLOCKS.map((b, i) => (
                <Reveal key={b.title} className={`alt-row ${i % 2 ? "reverse" : ""}`}>
                  <div className={`alt-text stack`} style={i % 2 ? { order: 2 } : undefined}>
                    <h2 className="h-section">{b.title}</h2>
                    <p className="lead">{b.text}</p>
                    <Link to={b.cta.to} className="btn btn-primary">
                      {b.cta.label} <ArrowRight size={16} className="arrow" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="alt-media">
                    <img src={b.src} alt={b.alt} loading="lazy" width={1280} height={853} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="partners-title">
          <div className="container center">
            <h2 id="partners-title" className="h-section">Partners</h2>
            <ul className="partners-row" style={{ listStyle: "none", padding: 0 }}>
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="partner-slot"><span>Partner logo</span></li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
