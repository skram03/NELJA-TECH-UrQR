import { Link } from "react-router-dom";
import { Smartphone, Zap, BarChart2, CheckCircle2, RefreshCw, Layers, Sparkles, ArrowRight } from "lucide-react";
import "./WhyUrQR.css";

const PRINCIPLES = [
  {
    icon: Smartphone,
    title: "100% Native Camera Instant Scan",
    desc: "Zero app download, zero login walls. Guest phone camera opens a lightweight, lightning-fast interactive menu in 1.2 seconds flat.",
  },
  {
    icon: Zap,
    title: "Direct Table Cart to Wood-Fire Pass",
    desc: "Orders fire in real time with table numbers, guest spice preferences, and notes directly to the station KDS pass.",
  },
  {
    icon: CheckCircle2,
    title: "10-Seat Ergonomic Waiter Cockpit",
    desc: "Waiters see dining timers, seat occupancy colors (Vacant, Dining, Bill Req), and hear gentle audio chimes on their own mobile screens.",
  },
  {
    icon: RefreshCw,
    title: "Live 82°C Dum Inventory Sync",
    desc: "When the mutton biryani handi is down to 3 portions, the menu warns guests in real time. Mark items 86'd across all tables in 1 tap.",
  },
  {
    icon: BarChart2,
    title: "RevPASH & Velocity Telemetry",
    desc: "Real-time revenue per available seat-hour, station cook speed telemetry, and table turn velocity tracked without legacy POS bloat.",
  },
  {
    icon: Layers,
    title: "15-Second Table Dynamic UPI Settlement",
    desc: "Guests scan the table QR code, verify split bill, and pay directly via PhonePe, GPay, or Paytm. Freeing seats 3x faster.",
  },
];

export default function WhyUrQR() {
  return (
    <section className="why-urqr section" id="why-urqr" aria-labelledby="why-heading">
      <div className="container">
        <div className="why-urqr__inner">
          {/* Left Column */}
          <div className="why-urqr__left">
            <div className="section-label">
              <Sparkles size={14} className="icon-pulse" />
              Engineered For Speed
            </div>
            <h2 id="why-heading" className="why-urqr__title">
              Built specifically for the high-intensity rhythm of Indian dining.
            </h2>
            <p className="why-urqr__sub">
              UrQR was born inside peak lunch rushes. We eliminate every step of human friction between the guest sitting down, the biryani hitting the table, and the bill getting settled.
            </p>

            <div className="why-urqr__actions">
              <Link to="/contact" className="btn btn--primary btn--lg">
                Schedule Live Demo <ArrowRight size={16} />
              </Link>
              <Link to="/how-it-works" className="btn btn--secondary btn--lg">
                See System Flow
              </Link>
            </div>

            {/* Food image preview card */}
            <div className="why-urqr__image-card">
              <img
                src="/images/food-spread.jpg"
                alt="Donne Biryani and South Indian fare"
                className="why-urqr__image"
                loading="lazy"
              />
              <div className="why-urqr__image-overlay" />
              <div className="why-urqr__image-caption">
                <span className="why-urqr__image-caption-dot" />
                <span>Live in top military hotels & artisan cafes across Bengaluru</span>
              </div>
            </div>
          </div>

          {/* Right Column: Principles list */}
          <div className="why-urqr__right">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="why-card">
                  <div className="why-card__icon">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div className="why-card__body">
                    <h3 className="why-card__title">{p.title}</h3>
                    <p className="why-card__desc">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
