import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { ScreeningNav } from "@/components/ScreeningNav";
import { StepForm } from "@/components/StepForm";

type Search = { name?: string; phone?: string; email?: string };

export const Route = createFileRoute("/booking")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    name: typeof s.name === "string" ? s.name : undefined,
    phone: typeof s.phone === "string" ? s.phone : undefined,
    email: typeof s.email === "string" ? s.email : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book Your Health Screening — Umang Health" },
      { name: "description", content: "Book a home CaTS breast screening for ₹500 plus ₹25 convenience fee, and pay securely online." },
      { property: "og:title", content: "Book Your Health Screening — Umang Health" },
      { property: "og:description", content: "Book a home breast screening and pay securely in two simple steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Booking,
});

function Booking() {
  const search = Route.useSearch();
  const prefill = Object.fromEntries(Object.entries(search).filter(([, v]) => v)) as Search;
  return (
    <>
      <ScreeningNav backTo="/breast-screening" backLabel="Back to breast screening" />
      <main id="main" className="section-tight">
        <div className="container"><StepForm prefill={prefill} /></div>
      </main>
      <Footer />
    </>
  );
}
