import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.webp";
import hero3 from "@/assets/hero-3.webp";
import earlyDetection from "@/assets/early-detection.webp";
import earlyIntervention from "@/assets/early-intervention.webp";
import earlyPrediction from "@/assets/early-prediction.webp";
import productCats from "@/assets/product-cats.webp";
import productReport from "@/assets/product-report.webp";
import hospitalTeam from "@/assets/hospital-team.webp";
import thermalMap from "@/assets/thermal-map.webp";

export const CONTACT = {
  phone: "1800-123-4567",
  phoneHref: "tel:18001234567",
  email: "info@umanghealth.com",
  supportEmail: "support@umanghealth.com",
};

export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
] as const;

export const HERO_SLIDES = [
  { src: hero1, alt: "A doctor explains a breast thermal scan to a patient", caption: "See your thermal scan explained by a doctor, in plain words." },
  { src: hero2, alt: "A contact-free thermal camera set up in a calm private room", caption: "No touch, no radiation, no pain — just a camera and a few minutes." },
  { src: hero3, alt: "Women at a community breast health screening camp", caption: "Screening camps that bring early detection to every neighbourhood." },
];

export const ISO_BADGES = [
  { code: "13485", label: "Medical devices" },
  { code: "9001", label: "Quality" },
  { code: "14001", label: "Environment" },
];

export const PILLARS = [
  { title: "Early Detection", src: earlyDetection, alt: "Doctor pointing at a colourful thermal breast scan with a patient" },
  { title: "Early Intervention", src: earlyIntervention, alt: "Doctor in a reassuring consultation with a woman patient" },
  { title: "Early Prediction", src: earlyPrediction, alt: "Doctor reviewing results on a tablet with a smiling patient" },
];

export const PRODUCTS = [
  {
    title: "CaTS Thermal Screening System",
    text: "A portable, contact-free thermal camera paired with AI analysis. Set it up in a clinic, an office or a screening camp in minutes.",
    src: productCats,
    alt: "Portable thermal camera, carry case and laptop showing a breast heat map",
  },
  {
    title: "CaTS Report & Care Dashboard",
    text: "Clear reports women can understand, and a dashboard that helps hospital teams track every screening and follow-up.",
    src: productReport,
    alt: "Tablet and phone showing a simple health report dashboard",
  },
];

export const IMPACT = [
  { icon: "megaphone", title: "Awareness that reaches", text: "Talks and camps that help women understand why checking early matters." },
  { icon: "chart", title: "Earlier answers", text: "AI highlights unusual heat patterns so doctors can act sooner." },
  { icon: "mail", title: "Reports you can read", text: "Your doctor-reviewed report arrives by email and SMS, in plain language." },
  { icon: "cart", title: "Affordable access", text: "A home screening costs ₹500, so cost isn't a reason to wait." },
] as const;

export const ALT_BLOCKS = [
  {
    title: "Built for hospital teams",
    text: "CaTS fits into your existing workflow. Radiologists and oncologists get AI-assisted thermal maps, flagged findings and a simple way to manage referrals.",
    cta: { label: "Learn more", to: "/breast-screening" as const },
    src: hospitalTeam,
    alt: "Hospital team reviewing thermal scan results on a monitor",
  },
  {
    title: "Screening that reaches every community",
    text: "From corporate offices to village health camps, our portable setup brings private, comfortable screening to women who might never visit a hospital.",
    cta: { label: "Learn more", to: "/booking" as const },
    src: hero3,
    alt: "Health worker welcoming women at a community screening camp",
  },
];

export const SOLUTIONS = [
  { icon: "venus", title: "Women's Health", text: "Early detection & screening for a healthier tomorrow." },
  { icon: "briefcase", title: "Corporate Wellness", text: "Employee health screenings & wellness programs." },
  { icon: "users", title: "Community Screening", text: "Large scale screening camps for communities across India." },
  { icon: "hospital", title: "Hospitals", text: "Advanced screening solutions for better clinical outcomes." },
  { icon: "dna", title: "AI Diagnostics", text: "AI-powered insights for accurate & quick diagnosis." },
] as const;

export const CATS_FEATURES = [
  { title: "Reads your body's heat", text: "A thermal camera captures tiny temperature differences in breast tissue — without touching you.", src: thermalMap, alt: "Colourful thermal heat map of an upper torso" },
  { title: "Private and painless", text: "No compression, no radiation and no physical contact. You stay comfortable from start to finish.", src: hero2, alt: "Contact-free thermal camera in a private screening room" },
  { title: "AI that supports doctors", text: "Our AI marks unusual patterns, and a qualified doctor reviews every report before it reaches you.", src: productReport, alt: "AI report dashboard on a tablet and phone" },
];

export const STATS = [
  { label: "Sensitivity", value: 86, note: "Correctly flags women who need a closer look." },
  { label: "Specificity", value: 82, note: "Correctly reassures women who don't." },
];

export const PROCESS = [
  { icon: "calendar", title: "Book your slot", text: "Choose a date and time online. We come to your home, office or a camp near you." },
  { icon: "armchair", title: "Rest for 10 minutes", text: "You sit in a private room so your body temperature settles for an accurate scan." },
  { icon: "thermometer", title: "Contact-free scan", text: "The thermal camera takes a few images from a short distance. Nothing touches you." },
  { icon: "brain", title: "AI analysis", text: "CaTS compares heat patterns on both sides and highlights anything unusual." },
  { icon: "stethoscope", title: "Doctor review", text: "A qualified doctor checks every result before your report is released." },
  { icon: "file", title: "Report & next steps", text: "You get an easy-to-read report and, if needed, guidance on follow-up tests." },
] as const;

export const FAQS = [
  { q: "Does the CaTS screening hurt or use radiation?", a: "No. CaTS uses a thermal camera that simply reads the heat your body gives off. There is no radiation, no compression and no physical contact." },
  { q: "Who should get screened, and how often?", a: "Any woman aged 18 or above can be screened. Many women choose a yearly check. Your doctor can advise what's right for you, especially if breast cancer runs in your family." },
  { q: "How long does the screening take?", a: "Plan for about 20 minutes. Most of that is resting so your skin temperature settles; the scan itself takes only a few minutes." },
  { q: "How should I prepare?", a: "For two hours before, avoid lotions, deodorant, exercise and hot showers. Wear a top that is easy to remove. Everything happens in a private space with a female technician." },
  { q: "Can CaTS replace a mammogram?", a: "CaTS is a screening aid, not a final diagnosis. If your report shows something that needs a closer look, your doctor will recommend next steps such as an ultrasound or mammogram." },
  { q: "When will I get my results?", a: "Your report is shared by email and SMS once a doctor has reviewed it, usually within two working days." },
];
