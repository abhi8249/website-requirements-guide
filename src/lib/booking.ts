// Booking rules for the two-step screening checkout. Prices are in Indian rupees.
export const SCREENING_PRICE = 500;
export const CONVENIENCE_FEE = 25;
export const MIN_AGE = 18;
export const MAX_AGE = 100;

export type Meridiem = "AM" | "PM";

export type Screening = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // hh:mm, 12-hour clock
  meridiem: Meridiem;
  name: string;
  age: string;
  countryCode: string;
  phone: string;
  email: string;
  address: string;
};

export type ScreeningErrors = Partial<Record<keyof Screening, string>>;

export const PAYMENT_METHODS = ["cards", "upi", "netbanking", "wallet", "emi"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export function orderTotal(screeningCount: number): number {
  const count = Math.max(1, Math.floor(screeningCount));
  return count * SCREENING_PRICE + CONVENIENCE_FEE;
}

export function formatINR(amount: number): string {
  return `₹${new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;
}

/** 12-hour time slots every 30 minutes: 01:00 … 12:30 */
export const TIME_SLOTS: string[] = Array.from({ length: 24 }, (_, i) => {
  const h = Math.floor(i / 2) + 1;
  return `${String(h).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`;
});

export function todayISO(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const NAME_RE = /^[A-Za-z][A-Za-z .'-]*$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidPhone(countryCode: string, phone: string): boolean {
  const digits = phone.replace(/[\s-]/g, "");
  if (countryCode === "+91") return /^[6-9]\d{9}$/.test(digits);
  return /^\d{6,14}$/.test(digits);
}

export function isValidAge(age: string): boolean {
  if (!/^\d{1,3}$/.test(age.trim())) return false;
  const n = Number(age);
  return n >= MIN_AGE && n <= MAX_AGE;
}

export function validateScreening(s: Screening, today: string = todayISO()): ScreeningErrors {
  const e: ScreeningErrors = {};
  if (!s.date) e.date = "Choose a date for your screening.";
  else if (s.date < today) e.date = "Pick today or a later date.";
  if (!s.time || !TIME_SLOTS.includes(s.time)) e.time = "Choose a preferred time.";
  const name = s.name.trim();
  if (!name) e.name = "Enter the full name of the person being screened.";
  else if (name.length < 2 || !NAME_RE.test(name)) e.name = "Use letters only, at least 2 characters.";
  if (!s.age.trim()) e.age = "Enter age.";
  else if (!isValidAge(s.age)) e.age = `Age must be between ${MIN_AGE} and ${MAX_AGE}.`;
  if (!s.phone.trim()) e.phone = "Enter a phone number.";
  else if (!isValidPhone(s.countryCode, s.phone))
    e.phone = s.countryCode === "+91" ? "Enter a 10-digit mobile number starting with 6–9." : "Enter a valid phone number.";
  if (!s.email.trim()) e.email = "Enter an email address.";
  else if (!EMAIL_RE.test(s.email.trim())) e.email = "Enter a valid email, like name@example.com.";
  if (s.address.trim().length < 10) e.address = "Enter your full address for the home visit.";
  return e;
}

export function validateBooking(screenings: Screening[], termsAccepted: boolean, today: string = todayISO()) {
  const errors = screenings.map((s) => validateScreening(s, today));
  const valid = errors.every((e) => Object.keys(e).length === 0) && termsAccepted && screenings.length > 0;
  return { errors, termsError: termsAccepted ? undefined : "Please accept the terms to continue.", valid };
}

let counter = 0;
export function emptyScreening(prefill: Partial<Screening> = {}): Screening {
  counter += 1;
  return {
    id: `s${Date.now().toString(36)}${counter}`,
    date: "",
    time: "",
    meridiem: "AM",
    name: "",
    age: "",
    countryCode: "+91",
    phone: "",
    email: "",
    address: "",
    ...prefill,
  };
}

export function bookingReference(now: Date = new Date()): string {
  return `UMG-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}
