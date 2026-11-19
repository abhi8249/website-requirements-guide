import { Link } from "@tanstack/react-router";
import {
  Calendar, ChevronLeft, CircleCheck, Clock, CreditCard, Landmark, Lock, Percent, Plus, ShieldCheck, Smartphone, Trash2, Wallet,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CONTACT } from "@/data/site";
import {
  CONVENIENCE_FEE, SCREENING_PRICE, TIME_SLOTS, bookingReference, emptyScreening, formatINR, orderTotal, todayISO,
  validateBooking, type PaymentMethod, type Screening, type ScreeningErrors,
} from "@/lib/booking";

const COUNTRY_CODES = ["+91", "+971", "+44", "+1", "+65"];

const METHODS: { id: PaymentMethod; label: string; desc: string; icon: ReactNode }[] = [
  { id: "cards", label: "Cards", desc: "Visa, MasterCard, RuPay & more", icon: <CreditCard size={20} /> },
  { id: "upi", label: "UPI", desc: "Pay using any UPI app", icon: <Smartphone size={20} /> },
  { id: "netbanking", label: "Net Banking", desc: "All major banks supported", icon: <Landmark size={20} /> },
  { id: "wallet", label: "Wallet", desc: "Pay using Paytm, PhonePe & more", icon: <Wallet size={20} /> },
  { id: "emi", label: "EMI", desc: "Easy EMI options available", icon: <Percent size={20} /> },
];

type Step = "details" | "payment" | "done";

type Props = { prefill?: Partial<Pick<Screening, "name" | "phone" | "email">> };

export function StepForm({ prefill }: Props) {
  const [step, setStep] = useState<Step>("details");
  const [screenings, setScreenings] = useState<Screening[]>(() => [emptyScreening(prefill)]);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<ScreeningErrors[]>([]);
  const [termsError, setTermsError] = useState<string>();
  const [method, setMethod] = useState<PaymentMethod | "">("");
  const [methodError, setMethodError] = useState<string>();
  const [paying, setPaying] = useState(false);
  const [reference, setReference] = useState("");
  const [today, setToday] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => setToday(todayISO()), []);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const total = orderTotal(screenings.length);
  const subtotal = screenings.length * SCREENING_PRICE;

  const update = (id: string, patch: Partial<Screening>) => {
    setScreenings((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    setErrors((errs) => {
      const i = screenings.findIndex((s) => s.id === id);
      if (i < 0 || !errs[i]) return errs;
      const next = [...errs];
      const copy = { ...next[i] };
      (Object.keys(patch) as (keyof Screening)[]).forEach((k) => delete copy[k]);
      next[i] = copy;
      return next;
    });
  };

  const addScreening = () => setScreenings((l) => [...l, emptyScreening({ address: l[0]?.address ?? "" })]);
  const removeScreening = (id: string) => {
    const i = screenings.findIndex((s) => s.id === id);
    setScreenings((l) => l.filter((s) => s.id !== id));
    setErrors((e) => e.filter((_, idx) => idx !== i));
  };
  const clearAll = () => {
    setScreenings([emptyScreening()]);
    setErrors([]);
  };

  const proceed = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateBooking(screenings, terms, today || todayISO());
    setErrors(result.errors);
    setTermsError(result.termsError);
    if (!result.valid) {
      requestAnimationFrame(() => {
        const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
        first?.focus();
      });
      return;
    }
    setStep("payment");
  };

  const pay = () => {
    if (!method) {
      setMethodError("Choose a payment method to continue.");
      return;
    }
    setPaying(true);
    setTimeout(() => {
      setReference(bookingReference());
      setPaying(false);
      setStep("done");
    }, 1200);
  };

  return (
    <div className="booking-wrap" ref={topRef} style={{ scrollMarginTop: "6rem" }}>
      <div className="flow-card">
        <div className="flow-head">
          {step === "details" ? (
            <Link to="/breast-screening" className="icon-btn icon-btn-sm" aria-label="Back to breast screening">
              <ChevronLeft size={18} aria-hidden="true" />
            </Link>
          ) : step === "payment" ? (
            <button type="button" className="icon-btn icon-btn-sm" aria-label="Back to booking details" onClick={() => setStep("details")}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
          ) : (
            <span />
          )}
          <h1>{step === "details" ? "Book Your Health Screening" : step === "payment" ? "Payment" : "Booking confirmed"}</h1>
          <span />
        </div>

        <Progress step={step} />

        {step === "details" && (
          <form className="flow-body" onSubmit={proceed} noValidate aria-labelledby="details-title">
            <h2 id="details-title" className="h-card">Booking Details</h2>
            <p className="muted" style={{ fontSize: "0.92rem", marginBottom: "1.25rem" }}>
              Fill in your details to book a home screening. Each screening is {formatINR(SCREENING_PRICE)}.
            </p>

            {screenings.map((s, i) => (
              <ScreeningFields
                key={s.id}
                index={i}
                s={s}
                errors={errors[i] ?? {}}
                min={today}
                canRemove={screenings.length > 1}
                onChange={(patch) => update(s.id, patch)}
                onRemove={() => removeScreening(s.id)}
              />
            ))}

            <div className="list-actions">
              <button type="button" className="btn btn-ghost" onClick={addScreening}>
                <Plus size={16} aria-hidden="true" /> Add more screenings
              </button>
              <button type="button" className="btn btn-ghost btn-ghost-danger" onClick={clearAll}>
                <Trash2 size={16} aria-hidden="true" /> Clear all screenings
              </button>
            </div>

            <div className="flow-foot">
              <div>
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={terms}
                    aria-invalid={!!termsError}
                    aria-describedby={termsError ? "terms-err" : undefined}
                    onChange={(e) => {
                      setTerms(e.target.checked);
                      if (e.target.checked) setTermsError(undefined);
                    }}
                  />
                  <span>
                    I declare that I have read and understood the <Link to="/privacy-policy">Terms and Conditions</Link> and the{" "}
                    <Link to="/privacy-policy">Privacy Policy</Link> for clinical diagnostic procedures.
                  </span>
                </label>
                {termsError && <p id="terms-err" className="field-error" style={{ marginTop: "0.4rem" }}>{termsError}</p>}
              </div>
              <button type="submit" className="btn btn-primary btn-lg">
                Proceed to Payment
              </button>
            </div>
          </form>
        )}

        {step === "payment" && (
          <div className="flow-body">
            <div className="pay-grid">
              <div className="panel">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Home Screening{screenings.length > 1 ? ` × ${screenings.length}` : ""}</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Convenience Fee</span>
                  <span>{formatINR(CONVENIENCE_FEE)}</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Total Amount</span>
                  <span>{formatINR(total)}</span>
                </div>

                <fieldset className="method-list" style={{ marginTop: "1.5rem" }} aria-describedby={methodError ? "method-err" : undefined}>
                  <legend className="h-card" style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>Select Payment Method</legend>
                  {METHODS.map((m) => (
                    <label key={m.id} className="method">
                      <input
                        type="radio"
                        name="method"
                        value={m.id}
                        checked={method === m.id}
                        onChange={() => {
                          setMethod(m.id);
                          setMethodError(undefined);
                        }}
                      />
                      <span className="icon-chip" aria-hidden="true">{m.icon}</span>
                      <span>
                        <strong>{m.label}</strong>
                        <small>{m.desc}</small>
                      </span>
                    </label>
                  ))}
                </fieldset>
                {methodError && <p id="method-err" className="field-error" role="alert" style={{ marginTop: "0.6rem" }}>{methodError}</p>}
              </div>

              <aside className="panel stack" aria-label="Payment information">
                <div className="secure-note">
                  <ShieldCheck size={22} aria-hidden="true" />
                  <div>
                    <strong style={{ color: "var(--foreground)" }}>Secure Payment</strong>
                    <p>Your payment information is safe and encrypted.</p>
                  </div>
                </div>
                <div>
                  <p className="label" style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>We Accept</p>
                  <div className="accept-row">
                    {["VISA", "MasterCard", "RuPay", "UPI"].map((c) => (
                      <span key={c} className="accept-chip">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="help-list">
                  <p style={{ fontWeight: 700, fontSize: "0.85rem" }}>Need Help?</p>
                  <a href={`mailto:${CONTACT.supportEmail}`}>{CONTACT.supportEmail}</a>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </div>
              </aside>
            </div>

            <button type="button" className="btn btn-primary btn-lg btn-block" style={{ marginTop: "1.25rem" }} onClick={pay} disabled={paying}>
              <Lock size={16} aria-hidden="true" />
              {paying ? "Processing payment…" : `Pay ${formatINR(total)}`}
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="success" role="status">
            <span className="success-mark"><CircleCheck size={40} aria-hidden="true" /></span>
            <h2 className="h-section">Thank you! Your screening is booked.</h2>
            <p className="lead">
              We've received {formatINR(total)} for {screenings.length} screening{screenings.length > 1 ? "s" : ""}. A
              confirmation will be sent to {screenings[0]?.email}. Our team will call {screenings[0]?.countryCode} {screenings[0]?.phone} a day before your visit.
            </p>
            <p>Booking reference: <span className="success-ref">{reference}</span></p>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <Link to="/" className="btn btn-primary">Back to home</Link>
              <Link to="/breast-screening" hash="faq" className="btn btn-outline">How to prepare</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Progress({ step }: { step: Step }) {
  const onPayment = step !== "details";
  return (
    <ol className="progress" aria-label="Booking progress">
      <li aria-current={step === "details" ? "step" : undefined} data-done={onPayment}>
        <span className="progress-dot">1</span>
        Booking Details
      </li>
      <span className="progress-line" aria-hidden="true" style={{ "--fill": onPayment ? 1 : 0 } as React.CSSProperties} />
      <li aria-current={step === "payment" ? "step" : undefined} data-done={step === "done"}>
        <span className="progress-dot">2</span>
        Payment
      </li>
    </ol>
  );
}

type FieldsProps = {
  index: number;
  s: Screening;
  errors: ScreeningErrors;
  min: string;
  canRemove: boolean;
  onChange: (patch: Partial<Screening>) => void;
  onRemove: () => void;
};

function ScreeningFields({ index, s, errors, min, canRemove, onChange, onRemove }: FieldsProps) {
  const id = (k: string) => `${s.id}-${k}`;
  const err = (k: keyof Screening) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": id(`${k}-err`) } : {};
  const Err = ({ k }: { k: keyof Screening }) =>
    errors[k] ? <p id={id(`${k}-err`)} className="field-error">{errors[k]}</p> : null;
  const slots = useMemo(() => TIME_SLOTS, []);

  return (
    <fieldset className="screening-card" style={{ margin: 0 }}>
      <div className="screening-card-head">
        <legend style={{ padding: 0 }}>
          <h3>Screening {index + 1}</h3>
        </legend>
        {canRemove && (
          <button type="button" className="btn btn-ghost btn-ghost-danger" onClick={onRemove} aria-label={`Remove screening ${index + 1}`}>
            <Trash2 size={15} aria-hidden="true" /> Remove
          </button>
        )}
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor={id("date")}>Pick a Date</label>
          <div className="input-icon">
            <Calendar size={16} aria-hidden="true" />
            <input id={id("date")} type="date" className="input" min={min || undefined} value={s.date} onChange={(e) => onChange({ date: e.target.value })} {...err("date")} />
          </div>
          <Err k="date" />
        </div>
        <div className="field">
          <label htmlFor={id("time")}>Pick a Preferred Time</label>
          <div className="time-row">
            <div className="input-icon" style={{ flex: 1 }}>
              <Clock size={16} aria-hidden="true" />
              <select id={id("time")} className="select input" value={s.time} onChange={(e) => onChange({ time: e.target.value })} {...err("time")}>
                <option value="">Select time</option>
                {slots.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="segmented" role="group" aria-label="AM or PM">
              {(["AM", "PM"] as const).map((m) => (
                <button key={m} type="button" aria-pressed={s.meridiem === m} onClick={() => onChange({ meridiem: m })}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <Err k="time" />
        </div>
      </div>

      <div className="form-row name-age">
        <div className="field">
          <label htmlFor={id("name")}>Full Name</label>
          <input id={id("name")} className="input" autoComplete="name" placeholder="e.g. Rahul Sharma" value={s.name} onChange={(e) => onChange({ name: e.target.value })} {...err("name")} />
          <Err k="name" />
        </div>
        <div className="field">
          <label htmlFor={id("age")}>Age</label>
          <input id={id("age")} className="input" inputMode="numeric" placeholder="45" maxLength={3} value={s.age} onChange={(e) => onChange({ age: e.target.value.replace(/\D/g, "") })} {...err("age")} />
          <Err k="age" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor={id("phone")}>Phone Number</label>
          <div className="phone-group">
            <select className="select" aria-label="Country code" value={s.countryCode} onChange={(e) => onChange({ countryCode: e.target.value })}>
              {COUNTRY_CODES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input id={id("phone")} type="tel" className="input" autoComplete="tel-national" inputMode="tel" placeholder="8977008754" value={s.phone} onChange={(e) => onChange({ phone: e.target.value })} {...err("phone")} />
          </div>
          <Err k="phone" />
        </div>
        <div className="field">
          <label htmlFor={id("email")}>Email Address</label>
          <input id={id("email")} type="email" className="input" autoComplete="email" placeholder="you@example.com" value={s.email} onChange={(e) => onChange({ email: e.target.value })} {...err("email")} />
          <Err k="email" />
        </div>
      </div>

      <div className="field">
        <label htmlFor={id("address")}>Residential Address</label>
        <textarea id={id("address")} className="textarea" autoComplete="street-address" placeholder="Enter your full street address for home visit" value={s.address} onChange={(e) => onChange({ address: e.target.value })} {...err("address")} />
        <Err k="address" />
      </div>
    </fieldset>
  );
}
