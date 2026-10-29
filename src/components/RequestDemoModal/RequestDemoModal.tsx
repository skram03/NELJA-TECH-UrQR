import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, X, Sparkles, ShieldCheck } from "lucide-react";
import "./RequestDemoModal.css";

interface DemoForm {
  name: string;
  email: string;
  state: string;
  city: string;
  phone: string;
  restaurant: string;
}

type DemoErrors = Partial<Record<keyof DemoForm, string>>;

const INITIAL_FORM: DemoForm = {
  name: "",
  email: "",
  state: "",
  city: "",
  phone: "",
  restaurant: "",
};

const CITIES_BY_STATE: Record<string, string[]> = {
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Delhi: ["New Delhi"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
};

function validate(form: DemoForm): DemoErrors {
  const errors: DemoErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email.";
  if (!form.state) errors.state = "Select a state.";
  if (!form.city) errors.city = "Select a city.";
  if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) errors.phone = "Enter a valid 10-digit number.";
  if (!form.restaurant.trim()) errors.restaurant = "Restaurant name is required.";
  return errors;
}

export default function RequestDemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<DemoErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  function updateField(name: keyof DemoForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      document.getElementById(`demo-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }
    setSubmitted(true);
  }

  if (!isOpen) return null;

  return (
    <div className="demo-modal" role="presentation">
      <button className="demo-modal__backdrop" aria-label="Close demo request" onClick={closeModal} />
      <section
        ref={dialogRef}
        className="demo-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        tabIndex={-1}
      >
        {submitted ? (
          <div className="demo-modal__success" role="status" aria-live="polite">
            <button className="demo-modal__close" aria-label="Close demo request" onClick={closeModal}>
              <X size={18} strokeWidth={2.4} />
            </button>
            <div className="demo-modal__success-icon">
              <CheckCircle2 size={40} strokeWidth={2.4} />
            </div>
            <h2 id="demo-modal-title">Demo Request Confirmed!</h2>
            <p>
              Our solutions engineer will connect with you within 2 business hours to schedule an interactive walkthrough for{" "}
              <strong>{form.restaurant || "your restaurant"}</strong>.
            </p>
            <button className="demo-modal__submit" onClick={closeModal}>
              Return to Experience
            </button>
          </div>
        ) : (
          <form className="demo-modal__form-wrapper" onSubmit={handleSubmit} noValidate>
            {/* FIXED HEADER */}
            <header className="demo-modal__header">
              <div className="demo-modal__header-content">
                <div className="demo-modal__badge">
                  <Sparkles size={12} className="text-emerald" />
                  <span>INTERACTIVE WALKTHROUGH</span>
                </div>
                <h2 id="demo-modal-title" className="demo-modal__title">
                  Request Demo
                </h2>
                <p className="demo-modal__sub">
                  Enter your outlet details to test UrQR's high-velocity ordering engine.
                </p>
              </div>
              <button type="button" className="demo-modal__close" aria-label="Close demo request" onClick={closeModal}>
                <X size={18} strokeWidth={2.4} />
              </button>
            </header>

            {/* SCROLLABLE CONTENT BODY */}
            <div className="demo-modal__body">
              <label className="demo-modal__field">
                <span>
                  Your Name <b>*</b>
                </span>
                <input
                  id="demo-name"
                  placeholder="e.g. Ramesh Gowda"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <small>{errors.name}</small>}
              </label>

              <label className="demo-modal__field">
                <span>
                  Business Email <b>*</b>
                </span>
                <input
                  id="demo-email"
                  type="email"
                  placeholder="ramesh@restaurant.com"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <small>{errors.email}</small>}
              </label>

              <div className="demo-modal__row">
                <label className="demo-modal__field">
                  <span>
                    State <b>*</b>
                  </span>
                  <select
                    id="demo-state"
                    value={form.state}
                    onChange={(event) => updateField("state", event.target.value)}
                    aria-invalid={Boolean(errors.state)}
                  >
                    <option value="">Select State</option>
                    {Object.keys(CITIES_BY_STATE).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && <small>{errors.state}</small>}
                </label>
                <label className="demo-modal__field">
                  <span>
                    City <b>*</b>
                  </span>
                  <select
                    id="demo-city"
                    value={form.city}
                    onChange={(event) => updateField("city", event.target.value)}
                    disabled={!form.state}
                    aria-invalid={Boolean(errors.city)}
                  >
                    <option value="">Select City</option>
                    {(CITIES_BY_STATE[form.state] ?? []).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && <small>{errors.city}</small>}
                </label>
              </div>

              <label className="demo-modal__field">
                <span>
                  Phone Number <b>*</b>
                </span>
                <div className={`demo-modal__phone ${errors.phone ? "demo-modal__phone--invalid" : ""}`}>
                  <span>+91</span>
                  <input
                    id="demo-phone"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value.replace(/\D/g, ""))}
                    aria-invalid={Boolean(errors.phone)}
                  />
                </div>
                {errors.phone && <small>{errors.phone}</small>}
              </label>

              <label className="demo-modal__field">
                <span>
                  Restaurant / Outlet Name <b>*</b>
                </span>
                <input
                  id="demo-restaurant"
                  placeholder="e.g. Donne Biryani Hub, Indiranagar"
                  value={form.restaurant}
                  onChange={(event) => updateField("restaurant", event.target.value)}
                  aria-invalid={Boolean(errors.restaurant)}
                />
                {errors.restaurant && <small>{errors.restaurant}</small>}
              </label>
            </div>

            {/* FIXED FOOTER */}
            <footer className="demo-modal__footer">
              <button type="submit" className="demo-modal__submit">
                Submit
              </button>
              <div className="demo-modal__trust">
                <ShieldCheck size={13} className="text-emerald" />
                <span>Zero hardware lock-in · 15-min walkthrough · No spam</span>
              </div>
            </footer>
          </form>
        )}
      </section>
    </div>
  );
}
