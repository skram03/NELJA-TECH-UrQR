import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles, Flame, Zap } from "lucide-react";
import { SOLUTIONS } from "../../data/appData";
import FinalCTA from "../../sections/FinalCTA/FinalCTA";
import "./SolutionsPage.css";

const SOLUTION_IMAGES: Record<string, { img: string; alt: string; badge: string }> = {
  military_hotel: {
    img: "/images/food-spread.jpg",
    alt: "Donne Biryani and Military Hotel Rush",
    badge: "10-Seat Cockpit · Wood-Fire KDS",
  },
  cafe: {
    img: "/images/cafe-ambiance.jpg",
    alt: "Artisan coffee and brew bar",
    badge: "Barista KDS · Silent Mobile Buzzer",
  },
  fine_dining: {
    img: "/images/fine-dining.jpg",
    alt: "Fine dining and restobar ambiance",
    badge: "Paced Courses · Table Concierge",
  },
  qsr: {
    img: "/images/hero-restaurant.jpg",
    alt: "Express QSR and fast casual",
    badge: "Counter Bypass · Token Dispatch",
  },
  foodcourt: {
    img: "/images/restaurant-bg.jpg",
    alt: "Multi-brand food court hub",
    badge: "Multi-Vendor Routing · Shared Token",
  },
  cloud: {
    img: "/images/kitchen-team.jpg",
    alt: "Cloud kitchen dispatch line",
    badge: "Aggregator Ingestion · Dispatch KDS",
  },
  chain: {
    img: "/images/fine-dining.jpg",
    alt: "Multi-outlet chain management",
    badge: "Global Menu Sync · Regional Telemetry",
  },
};

const VERTICAL_THEMES: Record<string, { color: string; glow: string }> = {
  military_hotel: { color: "#D97706", glow: "rgba(217, 119, 6, 0.3)" },
  cafe: { color: "#92400E", glow: "rgba(146, 64, 14, 0.3)" },
  fine_dining: { color: "#7C3AED", glow: "rgba(124, 58, 237, 0.3)" },
  qsr: { color: "#DC2626", glow: "rgba(220, 38, 38, 0.3)" },
  foodcourt: { color: "#0284C7", glow: "rgba(2, 132, 199, 0.3)" },
  cloud: { color: "#059669", glow: "rgba(5, 150, 105, 0.3)" },
  chain: { color: "#475569", glow: "rgba(71, 85, 105, 0.3)" },
};

export default function SolutionsPage() {
  return (
    <div className="solutions-page">
      {/* Hero */}
      <section className="solutions-hero section" aria-labelledby="solutions-hero-heading">
        <div className="container">
          <div className="solutions-hero__header">
            <div className="section-label">
              <Sparkles size={14} className="icon-pulse" />
              Specialized Restaurant Blueprints
            </div>
            <h1 id="solutions-hero-heading" className="solutions-hero__title">
              Engineered for the unique dynamics of each dining model.
            </h1>
            <p className="solutions-hero__sub">
              A high-pressure Military Biryani counter operates completely differently from an artisan pour-over café or a white-tablecloth restobar. Discover the UrQR blueprint tailored for your dining floor.
            </p>

            <div className="solutions-hero__jump">
              {SOLUTIONS.map((s) => (
                <a key={s.id} href={"#" + s.id} className="btn btn--secondary btn--sm">
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Sections */}
      {SOLUTIONS.map((sol, index) => {
        const visual = SOLUTION_IMAGES[sol.id] || {
          img: "/images/hero-restaurant.jpg",
          alt: sol.name,
          badge: "Specialized Hospitality Flow",
        };
        const theme = VERTICAL_THEMES[sol.id] || {
          color: "#10B981",
          glow: "rgba(16, 185, 129, 0.3)",
        };
        const isEven = index % 2 === 0;

        return (
          <section
            key={sol.id}
            id={sol.id}
            className={"sol-section section " + (isEven ? "sol-section--even" : "sol-section--odd")}
            aria-labelledby={"sol-" + sol.id + "-heading"}
          >
            <div className="container">
              <div className={"sol-section__inner " + (isEven ? "" : "sol-section__inner--flip")}>
                {/* Visual card with Architectural Suspension Rail Handler */}
                <div className={`sol-section__visual ${isEven ? "sol-visual--sway-a" : "sol-visual--sway-b"}`}>
                  <div className="sol-blueprint-handler" aria-hidden="true">
                    {/* Top Ceiling Truss Anchor Rail */}
                    <div className="sol-handler__rail">
                      <span className="sol-handler__rail-bar" />
                      <span className="sol-handler__rail-lug sol-handler__rail-lug--l" />
                      <span className="sol-handler__rail-lug sol-handler__rail-lug--r" />
                    </div>

                    {/* Twin Aircraft Tension Cables */}
                    <div className="sol-handler__cables">
                      <div className="sol-handler__cable-drop sol-handler__cable-drop--l" />
                      <div className="sol-handler__cable-drop sol-handler__cable-drop--r" />
                    </div>

                    {/* Dual Precision Clamps with Colored Friction Pads */}
                    <div className="sol-handler__clamps">
                      <div
                        className="sol-handler__clamp sol-handler__clamp--l"
                        style={{ borderColor: theme.color }}
                      >
                        <span className="clamp-bolt" />
                        <span className="clamp-accent" style={{ background: theme.color }} />
                      </div>
                      <div
                        className="sol-handler__clamp sol-handler__clamp--r"
                        style={{ borderColor: theme.color }}
                      >
                        <span className="clamp-bolt" />
                        <span className="clamp-accent" style={{ background: theme.color }} />
                      </div>
                    </div>
                  </div>

                  <div
                    className="sol-section__visual-card"
                    style={{
                      borderTop: `3px solid ${theme.color}`,
                    }}
                  >
                    <img
                      src={visual.img}
                      alt={visual.alt}
                      className="sol-section__visual-img"
                      loading="lazy"
                    />
                    <div className="sol-section__visual-overlay" />
                    <div className="sol-section__feature-pill">
                      <Zap size={13} className="text-emerald" />
                      <span>{visual.badge}</span>
                    </div>
                    <div className="sol-section__turnover-pill">
                      <Flame size={13} className="text-amber" />
                      <span>{sol.turnoverStat}</span>
                    </div>
                  </div>
                </div>

                {/* Content details */}
                <div className="sol-section__content">
                  <div className="sol-section__header-row">
                    <span className="sol-section__eyebrow">{sol.name.toUpperCase()}</span>
                    <span className="chip chip--emerald">{sol.tag}</span>
                  </div>

                  <h2 id={"sol-" + sol.id + "-heading"} className="sol-section__title">
                    {sol.headline}
                  </h2>

                  <div className="sol-section__columns">
                    {/* Pain Points */}
                    <div className="sol-section__panel sol-section__panel--problem">
                      <h3 className="sol-section__col-title sol-section__col-title--problem">
                        Traditional Friction
                      </h3>
                      <ul className="sol-section__list">
                        {sol.painPoints.map((p, i) => (
                          <li key={i} className="sol-section__list-item sol-section__list-item--problem">
                            <span className="sol-section__bullet--problem" aria-hidden="true">✕</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions */}
                    <div className="sol-section__panel sol-section__panel--solution">
                      <h3 className="sol-section__col-title sol-section__col-title--solution">
                        The UrQR Velocity Flow
                      </h3>
                      <ul className="sol-section__list">
                        {sol.howUrQRHelps.map((h, i) => (
                          <li key={i} className="sol-section__list-item">
                            <CheckCircle2 size={16} className="text-emerald flex-shrink-0" aria-hidden="true" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="sol-section__actions">
                    <Link to={"/solutions/" + sol.id} className="btn btn--primary btn--md">
                      View Full Architectural Blueprint <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <FinalCTA />
    </div>
  );
}
