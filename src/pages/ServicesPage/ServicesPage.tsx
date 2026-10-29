import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import "./ServicesPage.css";

interface PlanFeature {
  name: string;
  pro: boolean;
  max: boolean;
}

interface FeatureSection {
  category: string;
  features: PlanFeature[];
}

const FEATURE_SECTIONS: FeatureSection[] = [
  {
    category: "Basic Features",
    features: [
      { name: "Cloud billing & digital POS", pro: true, max: true },
      { name: "Table-side QR code scanning & digital menu", pro: true, max: true },
      { name: "Live cart management & item customization", pro: true, max: true },
      { name: "Razorpay payment gateway integration", pro: true, max: true },
      { name: "Dynamic Tabletop UPI payment (PhonePe, GPay, Paytm)", pro: true, max: true },
      { name: "10-seat floor radar map with live dining timers", pro: true, max: true },
      { name: "Waiter captain mobile order taking app", pro: true, max: true },
      { name: "Real-time food order tracking", pro: true, max: true },
      { name: "Digital receipt download & bill splitting", pro: true, max: true },
      { name: "Multi terminal billing support", pro: true, max: true },
      { name: "Unlimited billing customers & orders", pro: true, max: true },
      { name: "Unlimited staff & captain users", pro: true, max: true },
      { name: "Fast table merging & seat assignment", pro: true, max: true },
      { name: "Real-time stock shield & handi portion counters", pro: true, max: true },
      { name: "Multi-language menu (English, Kannada, regional)", pro: true, max: true },
      { name: "Expenses management & daily market purchases", pro: true, max: true },
      { name: "Daily sales summary & register auto-closing", pro: true, max: true },
      { name: "Swiggy & Zomato settlements & integration", pro: true, max: true },
      { name: "Central kitchen module & inventory tracking", pro: true, max: true },
      { name: "50+ Real-time operational reports & analytics", pro: true, max: true },
      { name: "Multi-role permissions (Manager, Kitchen, Waiter)", pro: true, max: true },
      { name: "Floor & table mapping configuration (31+ tables)", pro: true, max: true },
      { name: "Steward concierge alerts (water refill, extra plates)", pro: true, max: true },
      { name: "Free onboarding training & operational setup", pro: true, max: true },
    ],
  },
  {
    category: "Add-Ons",
    features: [
      { name: "Scan & QR Order table ordering", pro: true, max: true },
      { name: "QR based feedback & customer ratings", pro: true, max: true },
      { name: "Electronic bill (E-BILL) download", pro: true, max: true },
      { name: "Dynamic real-time revenue reports", pro: true, max: true },
      { name: "Credit customers ledger & billing history", pro: true, max: true },
      { name: "Category wise KOT thermal printing dispatch", pro: true, max: true },
      { name: "Multiple kitchen & cook station setting", pro: true, max: true },
      { name: "Owner mobile dashboard app", pro: true, max: true },
    ],
  },
  {
    category: "Advance Features",
    features: [
      { name: "Dedicated branded restaurant website", pro: false, max: true },
      { name: "Direct online ordering widget for takeout & delivery", pro: false, max: true },
      { name: "Kitchen Display System (KDS) touchscreen interface", pro: false, max: true },
      { name: "Multi-station KDS routing (Handi, Wok, Beverage)", pro: false, max: true },
      { name: "Item-level & table-level prep cook timers", pro: false, max: true },
      { name: "Chronological FIFO queue with 1-tap bump to pass", pro: false, max: true },
      { name: "Customized Tally ERP integration & accounting sync", pro: false, max: true },
      { name: "Standalone self-ordering kiosk software", pro: false, max: true },
      { name: "Google Business profile & 5-star review capture", pro: false, max: true },
      { name: "WhatsApp automated digital billing & receipts", pro: false, max: true },
      { name: "Brand SMS communications to customers", pro: false, max: true },
      { name: "Customer loyalty programme & Resto Wallet", pro: false, max: true },
      { name: "Social-Media profile & online menu setup", pro: false, max: true },
      { name: "Custom UI branding & bespoke feature customizations", pro: false, max: true },
    ],
  },
  {
    category: "Support & Infrastructure",
    features: [
      { name: "24/7 On-call & on-chat remote technical support", pro: true, max: true },
      { name: "Cloud server hosting & 99.9% database uptime", pro: true, max: true },
      { name: "Dedicated cloud storage & automated daily backups", pro: true, max: true },
      { name: "Software bug fixes & continuous performance updates", pro: true, max: true },
      { name: "Dedicated technical account manager & priority SLA", pro: false, max: true },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="services-page">
      {/* ── HERO BANNER ── */}
      <section className="services-hero" aria-labelledby="services-title">
        <div className="services-hero__bg-wrap" aria-hidden="true">
          <img
            src="/images/restaurant-bg.jpg"
            alt="Restaurant Operating Interior"
            className="services-hero__bg-img"
            fetchPriority="high"
          />
          <div className="services-hero__bg-overlay" />
        </div>

        <div className="container services-hero__container">
          <div className="services-hero__badge">
            <Sparkles size={15} className="text-emerald" />
            <span>NELJA TECH ENTERPRISE RESTAURANT SUITE</span>
          </div>

          <h1 id="services-title" className="services-hero__title">
            Nelja Tech Plans for Your Smooth Operations
          </h1>

          <p className="services-hero__sub">
            Engineered exclusively for military hotels, specialty cafés, and high-velocity restaurants.
            Review the complete operational feature matrix below to choose between Nelja Pro and Nelja Max.
          </p>

          {/* ── TOP PLAN CARDS (PRO VS MAX) ── */}
          <div className="plan-cards-row">
            {/* NELJA PRO CARD */}
            <div className="plan-card plan-card--pro">
              <div className="plan-card__top">
                <span className="plan-code-badge">CORE DINING ROOM SUITE</span>
                <h2 className="plan-name">NELJA PRO</h2>
                <p className="plan-purpose">
                  Ideal for busy restaurants, military hotels, and cafés needing high-speed table QR ordering, waiter mobile apps, and manager POS.
                </p>
              </div>

              <div className="plan-card__feature-bullets">
                <div className="bullet-item">
                  <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                  <span>Customer QR &amp; Instant Digital Menu Ordering</span>
                </div>
                <div className="bullet-item">
                  <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                  <span>Waiter Captain Mobile Floor Radar &amp; Table Timers</span>
                </div>
                <div className="bullet-item">
                  <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                  <span>Advanced Manager POS, Daily Summaries &amp; KOT</span>
                </div>
                <div className="bullet-item">
                  <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                  <span>Cloud Hosting, Automated Backups &amp; 24/7 Support</span>
                </div>
              </div>

              <div className="plan-card__cta-wrap">
                <Link to="/contact?plan=pro" className="btn btn--secondary btn--lg w-full">
                  Inquire About Nelja Pro <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* NELJA MAX CARD */}
            <div className="plan-card plan-card--max">
              <div className="popular-ribbon">COMPLETE ECOSYSTEM</div>
              <div className="plan-card__top">
                <span className="plan-code-badge plan-code-badge--max">ENTERPRISE FLAGSHIP</span>
                <h2 className="plan-name">NELJA MAX</h2>
                <p className="plan-purpose">
                  The complete autonomous restaurant operating suite with multi-station kitchen KDS displays, custom branded website, and Tally ERP sync.
                </p>
              </div>

              <div className="plan-card__feature-bullets">
                <div className="bullet-item">
                  <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                  <span>Everything Included in Nelja Pro Core Suite</span>
                </div>
                <div className="bullet-item">
                  <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                  <span>Touchscreen Multi-Station Kitchen Display (KDS)</span>
                </div>
                <div className="bullet-item">
                  <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                  <span>Custom Restaurant Website &amp; Online Ordering Widget</span>
                </div>
                <div className="bullet-item">
                  <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                  <span>WhatsApp Automated Invoices &amp; Tally ERP Sync</span>
                </div>
              </div>

              <div className="plan-card__cta-wrap">
                <Link to="/contact?plan=max" className="btn btn--primary btn--lg w-full">
                  Inquire About Nelja Max <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESTOSOFTIN-STYLE COMPARISON TABLE MATRIX ── */}
      <section className="services-table-section">
        <div className="container">
          <div className="table-section-heading">
            <h2 className="table-main-title">
              Nelja Plans for Your Smooth Operations
            </h2>
            <p className="table-main-sub">
              Feature-by-feature operational breakdown across Nelja Pro and Nelja Max.
            </p>
          </div>

          <div className="services-table-wrap">
            <table className="services-matrix-table" aria-label="Nelja Plans Comparison Matrix">
              <colgroup>
                <col className="col-feature" />
                <col className="col-pro" />
                <col className="col-max" />
              </colgroup>

              <thead>
                <tr className="table-head-row">
                  <th scope="col" className="th-feature-col">
                    Features &amp; Modules
                  </th>
                  <th scope="col" className="th-plan-col th-plan-col--pro">
                    NELJA PRO
                  </th>
                  <th scope="col" className="th-plan-col th-plan-col--max">
                    NELJA MAX
                  </th>
                </tr>
              </thead>

              <tbody>
                {FEATURE_SECTIONS.map((section, sIdx) => (
                  <Fragment key={sIdx}>
                    {/* Category Banner Row (Restosoft style banner in Nelja Tech Emerald) */}
                    <tr className="category-banner-row">
                      <td colSpan={3} className="category-banner-td">
                        {section.category}
                      </td>
                    </tr>

                    {/* Features in this section */}
                    {section.features.map((feat, fIdx) => (
                      <tr key={fIdx} className={`feature-data-row ${fIdx % 2 === 1 ? "row-zebra" : ""}`}>
                        {/* Feature Name Column (No subtext, no bullet points) */}
                        <td className="td-feature-name">
                          {feat.name}
                        </td>

                        {/* Pro Column (Only Checkmark or Crossmark) */}
                        <td className="td-mark td-mark--pro">
                          {feat.pro ? (
                            <Check size={20} strokeWidth={3} className="icon-check" aria-label="Included in Pro" />
                          ) : (
                            <X size={18} strokeWidth={2.6} className="icon-cross" aria-label="Not included in Pro" />
                          )}
                        </td>

                        {/* Max Column (Only Checkmark or Crossmark) */}
                        <td className="td-mark td-mark--max">
                          {feat.max ? (
                            <Check size={20} strokeWidth={3} className="icon-check icon-check--max" aria-label="Included in Max" />
                          ) : (
                            <X size={18} strokeWidth={2.6} className="icon-cross" aria-label="Not included in Max" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── CONSULTATION DOCK ── */}
          <div className="services-footer-dock">
            <div className="footer-dock__left">
              <div className="dock-icon-box">
                <ShieldCheck size={32} className="text-emerald" />
              </div>
              <div>
                <h3 className="dock-title">Need Guidance Choosing Between Pro and Max?</h3>
                <p className="dock-desc">
                  Our engineering team can evaluate your restaurant seating capacity, kitchen layout, and billing stations to recommend the exact setup needed for peak weekend rush.
                </p>
              </div>
            </div>

            <div className="footer-dock__right">
              <Link to="/contact" className="btn btn--primary btn--lg">
                Schedule Floor Walkthrough <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919945000000?text=Hi%20Nelja%20Tech,%20I%20would%20like%20to%20discuss%20Nelja%20Pro%20and%20Nelja%20Max%20plans."
                target="_blank"
                rel="noreferrer"
                className="btn btn--secondary btn--lg"
              >
                <PhoneCall size={16} /> WhatsApp Nelja Tech
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
