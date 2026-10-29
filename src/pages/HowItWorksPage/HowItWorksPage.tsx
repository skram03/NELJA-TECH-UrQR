import { useState } from "react";
import MenuDemo from "../../components/MenuDemo/MenuDemo";
import FinalCTA from "../../sections/FinalCTA/FinalCTA";
import {
  CheckCircle2,
  Smartphone,
  Map,
  ChefHat,
  CreditCard,
  Sparkles,
  Zap,
} from "lucide-react";
import "./HowItWorksPage.css";

const ACTORS = [
  {
    role: "ACTOR 01 · GUEST EXPERIENCE",
    title: "1.2s Native Camera Scan to Cart Fire",
    icon: Smartphone,
    color: "#10B981", // Mint Emerald
    glow: "rgba(16, 185, 129, 0.25)",
    desc: "Guests point their phone camera at the Table 04 QR stand. Zero app download, zero password setup. Browse live high-res dish photos with real-time 82°C Dum stock counters, select custom spice heat, and fire order to kitchen.",
    points: [
      "Works on any iOS or Android browser instantly",
      "Live portion indicators for limited wood-fire handis",
      "Table Concierge built-in: call waiter, plates, or water refill",
    ],
  },
  {
    role: "ACTOR 02 · FLOOR COORDINATION",
    title: "Waiter Smartphone 10-Seat Smart Cockpit",
    icon: Map,
    color: "#06B6D4", // Electric Cyan
    glow: "rgba(6, 182, 212, 0.25)",
    desc: "Servers don't need expensive proprietary handheld terminals. They open the UrQR Staff Cockpit on their own smartphone with an ergonomic 10-seat floor map that glows with real-time table dining timers.",
    points: [
      "Color-coded seat states: Green (Vacant), Amber (Dining), Rose (Bill Req)",
      "Vibration and gentle audio chime when a seat fires a KOT",
      "Waiters handle double the seating capacity with zero dropped orders",
    ],
  },
  {
    role: "ACTOR 03 · KITCHEN DISPATCH",
    title: "Wood-Fire Station KDS & Thermal Pass",
    icon: ChefHat,
    color: "#F59E0B", // Warm Amber
    glow: "rgba(245, 158, 11, 0.25)",
    desc: "Orders auto-split and route to the correct station screen (Biryani Handi, Tandoor & Starters, Beverage Bar). Eliminates lost thermal tickets, loud shouting, and disputed chef cook orders.",
    points: [
      "Chronological FIFO queue prevents customer order skip complaints",
      "Live cook timers change colors as ticket age approaches target prep time",
      "1-tap 'Bump to Pass' alerts the waiter for immediate table run",
    ],
  },
  {
    role: "ACTOR 04 · CHECKOUT & TURNOVER",
    title: "15-Second Table Dynamic UPI Settlement",
    icon: CreditCard,
    color: "#8B5CF6", // Royal Violet
    glow: "rgba(139, 92, 246, 0.25)",
    desc: "When dining is complete, guests scan the table QR code to view live itemized bill, tap PhonePe, GPay, or Paytm, and pay in 15 seconds. The table seat turns Green (Vacant) automatically.",
    points: [
      "No waiting for EDC card machine or change cash",
      "Automated digital tax invoice sent to guest WhatsApp/SMS",
      "Frees tables 38% faster, adding 3-4 extra seating turns per weekend",
    ],
  },
];

const VERTICAL_BG_MAP: Record<string, string> = {
  military_hotel: "/images/food-spread.jpg",
  cafe: "/images/cafe-ambiance.jpg",
  fine_dining: "/images/fine-dining.jpg",
  qsr: "/images/hero-restaurant.jpg",
};

export default function HowItWorksPage() {
  const [activeVertical, setActiveVertical] = useState<string>("military_hotel");

  return (
    <div className="hiw-page">
      {/* Hero */}
      <section className="hiw-page-hero section" aria-labelledby="hiw-page-heading">
        {/* Background Restaurant Photo with Ambient Lighting Gradient Overlay */}
        <div className="hiw-page-hero__bg-wrap" aria-hidden="true">
          <img
            src="/images/restaurant-bg.jpg"
            alt="Restaurant Dining Atmosphere"
            className="hiw-page-hero__bg-img"
            fetchPriority="high"
          />
          <div className="hiw-page-hero__bg-overlay" />
        </div>

        <div className="container hiw-page-hero__container">
          <div className="hiw-page-hero__header">
            <div className="section-label">
              <Sparkles size={14} className="icon-pulse" />
              The 4-Actor Choreography
            </div>
            <h1 id="hiw-page-heading" className="hiw-page-hero__title">
              How data travels through your restaurant in milliseconds.
            </h1>
            <p className="hiw-page-hero__sub">
              UrQR synchronizes four distinct human roles into one frictionless loop: the Guest Phone, the Waiter Smartphone, the Wood-Fire Kitchen Pass, and Table Dynamic UPI.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Actor Zig-Zag Formation with Lanyard Badge Handlers */}
      <section className="hiw-actors section">
        <div className="container">
          <div className="hiw-actors__zigzag">
            {ACTORS.map((actor, idx) => {
              const Icon = actor.icon;
              const isLeft = idx % 2 === 0;
              const nextActor = ACTORS[idx + 1];

              return (
                <div
                  key={idx}
                  className={`hiw-actor-zigzag-row ${isLeft ? "hiw-row--left" : "hiw-row--right"}`}
                  style={{
                    "--actor-color": actor.color,
                    "--actor-glow": actor.glow,
                  } as React.CSSProperties}
                >
                  <div className="hiw-actor-badge-unit">
                    {/* Lanyard Badge Holder Apparatus (matching reference image) */}
                    <div className="hiw-badge-lanyard" aria-hidden="true">
                      {/* Lanyard Fabric Neck Strap with Rivet */}
                      <div className="hiw-lanyard-strap" style={{ background: actor.color }}>
                        <div className="hiw-lanyard-stitch" />
                        <div className="hiw-lanyard-rivet" />
                      </div>

                      {/* Swivel Lobster Clasp Hook SVG */}
                      <div className="hiw-lanyard-clasp">
                        <svg viewBox="0 0 32 44" className="hiw-clasp-svg" aria-hidden="true">
                          <ellipse cx="16" cy="8" rx="8" ry="4.5" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
                          <rect x="14" y="11" width="4" height="5" rx="1" fill="#64748B" />
                          <path
                            d="M16 16 C11 16 9 20 9 26 C9 32 12 37 16 37 C20 37 23 32 23 26 C23 20 21 16 16 16 Z"
                            fill="none"
                            stroke="#94A3B8"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                          />
                          <line x1="16" y1="20" x2="16" y2="33" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                          <path d="M13 36 C13 41 19 41 19 36" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      </div>

                      {/* Badge Holder Frame Top Header with Oval Slot & Side Gripping Brackets */}
                      <div className="hiw-badge-case-top" style={{ borderColor: actor.color }}>
                        <div className="hiw-badge-slot" />
                        <span className="hiw-badge-grip hiw-badge-grip--left" style={{ background: actor.color }} />
                        <span className="hiw-badge-grip hiw-badge-grip--right" style={{ background: actor.color }} />
                      </div>
                    </div>

                    {/* The Badge ID Card Surface — Clean White Theme */}
                    <div className="hiw-actor-card">
                      <div className="hiw-actor-card__head">
                        <div
                          className="hiw-actor-card__icon-wrap"
                          style={{
                            background: `rgba(${parseInt(actor.color.slice(1, 3), 16)}, ${parseInt(actor.color.slice(3, 5), 16)}, ${parseInt(actor.color.slice(5, 7), 16)}, 0.1)`,
                            borderColor: `rgba(${parseInt(actor.color.slice(1, 3), 16)}, ${parseInt(actor.color.slice(3, 5), 16)}, ${parseInt(actor.color.slice(5, 7), 16)}, 0.25)`,
                            color: actor.color,
                          }}
                        >
                          <Icon size={22} aria-hidden="true" />
                        </div>
                        <span className="hiw-actor-card__role" style={{ color: actor.color }}>
                          {actor.role}
                        </span>
                      </div>

                      <h2 className="hiw-actor-card__title">{actor.title}</h2>
                      <p className="hiw-actor-card__desc">{actor.desc}</p>

                      <div className="hiw-actor-card__points">
                        {actor.points.map((pt, pIdx) => (
                          <div key={pIdx} className="hiw-actor-point">
                            <CheckCircle2
                              size={15}
                              className="flex-shrink-0"
                              style={{ color: actor.color }}
                              aria-hidden="true"
                            />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Diagonal Zig-Zag Connection Bridge Between Steps */}
                  {nextActor && (
                    <div className={`hiw-zigzag-bridge ${isLeft ? "bridge-to-right" : "bridge-to-left"}`} aria-hidden="true">
                      <div className="bridge-track-line" />
                      <div className="bridge-sequence-badge">
                        <span className="bridge-dot" style={{ background: actor.color }} />
                        <span>STAGE 0{idx + 1} ➔ 0{idx + 2}</span>
                        <span className="bridge-dot" style={{ background: nextActor.color }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Floor Simulator Section */}
      <section className="hiw-simulator section" aria-labelledby="hiw-sim-heading">
        <div className="hiw-simulator__bg-wrap" aria-hidden="true">
          <img
            src={VERTICAL_BG_MAP[activeVertical] || "/images/cafe-ambiance.jpg"}
            alt="Floor Simulator Background"
            className="hiw-simulator__bg-img"
            key={activeVertical}
            loading="lazy"
          />
          <div className="hiw-simulator__bg-overlay" />
        </div>

        <div className="container hiw-simulator__container">
          <div className="hiw-simulator__header text-center">
            <div className="section-label">
              <Zap size={14} className="icon-pulse" />
              Interactive Floor Cockpit
            </div>
            <h2 id="hiw-sim-heading" className="hiw-simulator__title">
              Test-drive the customer & kitchen pass in real time.
            </h2>
            <p className="hiw-simulator__sub">
              Tap any dish modifier or seat state to watch how tickets flow through the digital pipeline.
            </p>
          </div>

          <MenuDemo onVerticalChange={(vKey) => setActiveVertical(vKey)} />
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
