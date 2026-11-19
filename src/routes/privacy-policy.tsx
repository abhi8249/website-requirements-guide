import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CONTACT } from "@/data/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Umang Health Innovation" },
      { name: "description", content: "How Umang Health Innovation collects, uses and protects your information." },
      { property: "og:title", content: "Privacy Policy — Umang Health Innovation" },
      { property: "og:description", content: "How Umang Health Innovation collects, uses and protects your information." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Navbar />
      <main id="main" className="section">
        <article className="container legal">
          <h1 className="h-section">Privacy Policy</h1>
          <p>How Umang Health Innovation collects, uses and protects your information. We only collect what we need to book and deliver your screening: your name, age, contact details, address and screening results.</p>
          <h2>How we use your data</h2>
          <p>Your details are used to schedule your visit, share your doctor-reviewed report and contact you about follow-up care. We never sell your data.</p>
          <h2>Your rights</h2>
          <p>You can ask to see, correct or delete your data at any time by emailing {CONTACT.email}.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
