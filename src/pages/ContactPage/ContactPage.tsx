import { useState, type FormEvent } from "react";
import {
  CheckCircle2, Loader2, Mail, MapPin, Clock,
  Sparkles, Calculator, ShieldCheck
} from "lucide-react";
import "./ContactPage.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  restaurant: string;
  businessType: string;
  outlets: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  restaurant?: string;
  businessType?: string;
  message?: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  restaurant: "",
  businessType: "Military Hotel / Donne Biryani",
  outlets: "1",
  message: "",
};

const BUSINESS_TYPES = [
  "Military Hotel / Donne Biryani Hub",
  "Specialty Café / Brew Bar",
  "Fine Dining & Restobar",
  "Quick-Service Restaurant (QSR)",
  "Food Court Hub",
  "Cloud Kitchen",
  "Multi-Outlet Restaurant Chain",
  "Other",
];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^[+\d\s\-()]{7,15}$/.test(phone.trim());
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Full name is required.";
  if (!data.email.trim()) {
    errors.email = "Business email is required.";
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!validatePhone(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!data.restaurant.trim()) errors.restaurant = "Restaurant name is required.";
  if (!data.businessType) errors.businessType = "Please select your business type.";
  return errors;
}

type FormState = "idle" | "submitting" | "success";

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  // Interactive ROI Calculator State
  const [tableCount, setTableCount] = useState<number>(20);
  const [avgTicket, setAvgTicket] = useState<number>(650);

  // Calculations
  const timeSavedMins = 17; // 48m -> 31m
  const extraTurnsPerDay = ((tableCount * 0.18) * 1.6).toFixed(1);
  const extraMonthlyRevenue = Math.round(Number(extraTurnsPerDay) * tableCount * (avgTicket * 0.45) * 30);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormData]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({ name: true, email: true, phone: true, restaurant: true, businessType: true });
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById("contact-" + firstErrorField)?.focus();
      return;
    }

    setFormState("submitting");
    await new Promise((res) => setTimeout(res, 1200));
    setFormState("success");
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setFormState("idle");
  }

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero section" aria-labelledby="contact-heading">
        <div className="container">
          <div className="contact-hero__header">
            <div className="section-label">
              <Sparkles size={14} className="icon-pulse" />
              Deployment & Demo Request
            </div>
            <h1 id="contact-heading" className="contact-hero__title">
              Let&apos;s turn your tables faster.
            </h1>
            <p className="contact-hero__sub">
              Calculate your table velocity gains below or book a live 15-minute walkthrough with the Nelja Tech engineering team.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator Section */}
      <section className="contact-calc-section">
        <div className="container">
          <div className="roi-calculator">
            <div className="roi-calculator__head">
              <div className="roi-calculator__badge">
                <Calculator size={15} className="text-emerald" />
                <span>INTERACTIVE VELOCITY CALCULATOR</span>
              </div>
              <h2 className="roi-calculator__title">Estimate Your Additional Weekend Turnover</h2>
            </div>

            <div className="roi-calculator__body">
              {/* Sliders */}
              <div className="roi-sliders">
                <div className="roi-slider-group">
                  <div className="roi-slider-label">
                    <span>Active Dining Tables:</span>
                    <strong>{tableCount} tables</strong>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="80"
                    step="2"
                    value={tableCount}
                    onChange={(e) => setTableCount(Number(e.target.value))}
                    className="roi-range"
                  />
                  <div className="roi-range-marks">
                    <span>4</span>
                    <span>40</span>
                    <span>80 tables</span>
                  </div>
                </div>

                <div className="roi-slider-group">
                  <div className="roi-slider-label">
                    <span>Average Table Bill:</span>
                    <strong>₹{avgTicket}</strong>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="3500"
                    step="50"
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(Number(e.target.value))}
                    className="roi-range"
                  />
                  <div className="roi-range-marks">
                    <span>₹200</span>
                    <span>₹1,500</span>
                    <span>₹3,500</span>
                  </div>
                </div>
              </div>

              {/* Live Outcome Box with Moveable Floating Cards & Zero Text Overflow */}
              <div className="roi-results">
                <div className="roi-res-card roi-res-card--sway-a">
                  <div className="roi-res-card__clip" aria-hidden="true">
                    <span className="roi-clip-rivet" />
                  </div>
                  <span className="roi-res-label">Turn Time Saved</span>
                  <strong className="roi-res-value">{timeSavedMins} mins</strong>
                  <small className="roi-res-desc">Drops from 48m to 31m per seating</small>
                </div>

                <div className="roi-res-card roi-res-card--sway-b">
                  <div className="roi-res-card__clip" aria-hidden="true">
                    <span className="roi-clip-rivet" />
                  </div>
                  <span className="roi-res-label">Extra Daily Turns</span>
                  <strong className="roi-res-value">+{extraTurnsPerDay} turns</strong>
                  <small className="roi-res-desc">No extra dining tables required</small>
                </div>

                <div className="roi-res-card roi-res-card--highlight roi-res-card--sway-a">
                  <div className="roi-res-card__clip roi-res-card__clip--gold" aria-hidden="true">
                    <span className="roi-clip-rivet" />
                  </div>
                  <span className="roi-res-label">Est. Monthly Gain</span>
                  <strong className="roi-res-value roi-res-value--highlight">
                    +₹{extraMonthlyRevenue.toLocaleString("en-IN")}
                  </strong>
                  <small className="roi-res-desc">🚀 Based on weekend peak velocity</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form & Contact Info */}
      <section className="contact-main section" aria-label="Contact form and information">
        <div className="container">
          <div className="contact-main__inner">
            {/* Form Wrap with Message Reference Folio Card Header */}
            <div className="contact-form-wrap">
              {/* Executive Contact Message Reference Header Strip */}
              <div className="contact-ref-badge-strip" aria-hidden="true">
                <div className="ref-strip-left">
                  <span className="ref-status-indicator" />
                  <span className="ref-ticket-id">DISPATCH REF: #NELJA-DEMO-2026</span>
                </div>
                <div className="ref-strip-right">
                  <span className="ref-channel-pill">DIRECT ENG DESK</span>
                  <span className="ref-city-pill">BENGALURU LAB</span>
                </div>
              </div>

              {formState === "success" ? (
                <div className="contact-success" role="status" aria-live="polite">
                  <div className="contact-success__icon">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="contact-success__title">Demo Request Received!</h2>
                  <p className="contact-success__msg">
                    Our Bengaluru team has logged your outlet specifications under <strong>REF: #NELJA-DEMO-2026</strong>. We&apos;ll reach out on WhatsApp/phone within 1 business day to arrange your live menu demo.
                  </p>
                  <button className="btn btn--secondary" onClick={handleReset} id="contact-reset-btn">
                    Submit Another Outlet
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="contact-form"
                  aria-label="Demo booking enquiry form"
                  noValidate
                >
                  <h2 className="contact-form__title">Book Your 15-Min Live Demo</h2>
                  <p className="contact-form__sub">We&apos;ll digitize your real menu and simulate your floor map live.</p>

                  <div className="contact-form__row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Full name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className={"form-input " + (errors.name ? "error" : "")}
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Darshan Gowda"
                        disabled={formState === "submitting"}
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">Mobile / WhatsApp *</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className={"form-input " + (errors.phone ? "error" : "")}
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="+91 98450 12345"
                        disabled={formState === "submitting"}
                      />
                      {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Business email *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={"form-input " + (errors.email ? "error" : "")}
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="manager@restaurant.com"
                        disabled={formState === "submitting"}
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-restaurant">Restaurant / Hotel Name *</label>
                      <input
                        id="contact-restaurant"
                        name="restaurant"
                        type="text"
                        className={"form-input " + (errors.restaurant ? "error" : "")}
                        value={form.restaurant}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Thoogudeepa Donne Biryani"
                        disabled={formState === "submitting"}
                      />
                      {errors.restaurant && <span className="form-error">{errors.restaurant}</span>}
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-businessType">Dining Model *</label>
                      <select
                        id="contact-businessType"
                        name="businessType"
                        className="form-select"
                        value={form.businessType}
                        onChange={handleChange}
                        disabled={formState === "submitting"}
                      >
                        {BUSINESS_TYPES.map((bt) => (
                          <option key={bt} value={bt}>{bt}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-outlets">Outlet Count</label>
                      <select
                        id="contact-outlets"
                        name="outlets"
                        className="form-select"
                        value={form.outlets}
                        onChange={handleChange}
                        disabled={formState === "submitting"}
                      >
                        {["1 outlet", "2–5 outlets", "6–20 outlets", "20+ outlets"].map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Specific Floor Bottlenecks / Notes</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-textarea"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="e.g. We have high lunch peak between 1-3 PM and need 10-seat waiter phone coordination..."
                      rows={3}
                      disabled={formState === "submitting"}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary btn--lg"
                    id="contact-submit-btn"
                    disabled={formState === "submitting"}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {formState === "submitting" ? (
                      <>
                        <Loader2 size={18} className="contact-form__spinner" />
                        Setting up Demo Environment…
                      </>
                    ) : (
                      "Schedule Live Walkthrough →"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar Info with Reference Ticket Header & Moveable Physics */}
            <aside className="contact-info contact-info--sway" aria-label="Contact information">
              <div className="contact-info-ref-header" aria-hidden="true">
                <span className="info-ref-id">TICKET: REF-ARCH-BLR</span>
                <span className="info-status-pill">ACTIVE LAB</span>
              </div>
              <div className="contact-info__photo">
                <img
                  src="/images/food-spread.jpg"
                  alt="Thoogudeepa Donne Biryani and Military Fare"
                  loading="lazy"
                />
                <div className="contact-info__photo-overlay" />
                <p className="contact-info__photo-caption">Nelja Tech · Bengaluru Innovation Lab</p>
              </div>

              <div className="contact-info__inner">
                <h3 className="contact-info__title">Direct Engineering Desk</h3>
                <p className="contact-info__sub">
                  Speak directly to our restaurant systems architects. No pushy sales calls — only real floor mechanics.
                </p>

                <div className="contact-info__items">
                  <div className="contact-info__item">
                    <div className="contact-info__item-icon">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="contact-info__item-label">Direct Email</p>
                      <a className="contact-info__item-value" href="mailto:technelja@gmail.com">
                        technelja@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="contact-info__item">
                    <div className="contact-info__item-icon">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="contact-info__item-label">Bengaluru Lab</p>
                      <a
                        className="contact-info__item-value"
                        href="https://maps.app.goo.gl/ovDBfpwPSeNXfcpk9"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Google Maps Location
                      </a>
                      <p className="contact-info__item-note">Deploying across Karnataka & India</p>
                    </div>
                  </div>

                  <div className="contact-info__item">
                    <div className="contact-info__item-icon">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="contact-info__item-label">Deployment Turnaround</p>
                      <p className="contact-info__item-value">Live within 24 Hours</p>
                      <p className="contact-info__item-note">Full menu digital onboarding included</p>
                    </div>
                  </div>
                </div>

                <div className="contact-info__note">
                  <ShieldCheck size={16} className="text-emerald flex-shrink-0" />
                  <p>
                    <strong>Zero Hardware Lock-In:</strong> Runs cleanly on staff smartphones and standard tablet screens. No expensive custom POS machines needed.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
