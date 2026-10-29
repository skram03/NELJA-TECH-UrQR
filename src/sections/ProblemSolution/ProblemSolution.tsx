import { useState } from "react";
import { AlertTriangle, ChefHat, CreditCard, CheckCircle2, XCircle, Sparkles, Zap, Flame } from "lucide-react";
import "./ProblemSolution.css";

interface ContrastPoint {
  id: string;
  vertical: string;
  oldWay: {
    title: string;
    description: string;
    metric: string;
    pain: string;
  };
  newWay: {
    title: string;
    description: string;
    metric: string;
    gain: string;
  };
  highlight: string;
}

const COMPARISONS: ContrastPoint[] = [
  {
    id: "ordering",
    vertical: "Guest Experience",
    oldWay: {
      title: "Waving hands & Waiting for Menus",
      description: "Guests wait 8–15 minutes just to get a grubby paper menu, only to find the best-selling mutton items are sold out after ordering.",
      metric: "12-18 min delay",
      pain: "Frustrated guests & walkouts during rush hour",
    },
    newWay: {
      title: "1.2s Instant Camera Scan",
      description: "Guests point their phone camera, browse live photos with real-time 82°C dum stock indicators, and fire orders directly from Table 04.",
      metric: "1.2s instant access",
      gain: "Zero wait time, +28% larger average ticket size",
    },
    highlight: "Lightning fast self-order",
  },
  {
    id: "waiter",
    vertical: "Floor Coordination",
    oldWay: {
      title: "Scribbled Notepads & Chaos",
      description: "Waiters sprint between tables scribbling handwritten KOTs, mishearing customizations, and running back and forth to the billing counter.",
      metric: "14,000 steps of friction",
      pain: "3-5 wrong items delivered per shift",
    },
    newWay: {
      title: "Waiter Smartphone 10-Seat Cockpit",
      description: "Waiters monitor an ergonomic 10-seat floor map on their own phone with color-coded seat states: Green (Vacant), Amber (Dining), Rose (Bill Req).",
      metric: "100% floor visibility",
      gain: "Waiters handle 2x tables with zero dropped calls",
    },
    highlight: "Smart seat map & instant alerts",
  },
  {
    id: "kitchen",
    vertical: "Kitchen Pass & KOT",
    oldWay: {
      title: "Lost Thermal Paper & Shouted Orders",
      description: "Steam, oil, and noise swallow paper receipts. Station chefs shout across the kitchen: 'Table 6 Biryani did you fire?'",
      metric: "22 min prep time",
      pain: "Duplicate cook orders and burnt tempers",
    },
    newWay: {
      title: "Digital Kitchen Pass (Station KDS)",
      description: "Orders auto-route to Biryani Handi, Tandoor & Grill, and Beverage stations with live cooking countdowns and 1-tap 'Bump to Pass'.",
      metric: "7 min ticket-to-pass",
      gain: "Zero lost tickets, perfect chronological FIFO fire",
    },
    highlight: "Wood-fire ready digital KDS",
  },
  {
    id: "payment",
    vertical: "Checkout & Settlement",
    oldWay: {
      title: "The 20-Minute Bill Nightmare",
      description: "'Bhaiya bill lana' -> Waiter brings printout -> Card machine has no signal -> Waiter returns -> Guest types PIN -> 20 mins lost.",
      metric: "15-20 min checkout lag",
      pain: "Blocks empty tables waiting for settlement",
    },
    newWay: {
      title: "15-Second Table Dynamic UPI",
      description: "Guests scan the table QR code to view live split bill, pay with PhonePe/GPay/Paytm, and get instant digital receipt. Table frees instantly.",
      metric: "15s instant payment",
      gain: "+3.2 additional table turns per lunch shift",
    },
    highlight: "Instant table turnover",
  },
];

export default function ProblemSolution() {
  const [activeTab, setActiveTab] = useState(0);
  const current = COMPARISONS[activeTab];

  return (
    <section className="problem-solution section" id="problem-solution" aria-labelledby="problem-heading">
      <div className="container">
        <div className="problem-solution__header">
          <div className="section-label">
            <Zap size={14} className="icon-pulse" />
            Old Restaurant Friction vs UrQR Velocity
          </div>
          <h2 id="problem-heading" className="problem-solution__title">
            Stop losing ₹25,000+ every weekend <br className="hidden-mobile" />
            to chaotic service bottlenecks.
          </h2>
          <p className="problem-solution__sub">
            See how the UrQR Operating System replaces manual restaurant chaos with a synchronized, high-speed digital engine.
          </p>

          {/* Interactive tabs */}
          <div className="problem-tabs" role="tablist">
            {COMPARISONS.map((comp, idx) => (
              <button
                key={comp.id}
                role="tab"
                aria-selected={activeTab === idx}
                className={`problem-tab ${activeTab === idx ? "problem-tab--active" : ""}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className="problem-tab__number">0{idx + 1}</span>
                <span className="problem-tab__label">{comp.vertical}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Duel Card */}
        <div className="comparison-duel">
          {/* Legacy Card (Red tone) */}
          <div className="duel-side duel-side--legacy">
            <div className="duel-badge duel-badge--legacy">
              <XCircle size={15} />
              <span>THE OLD CHAOTIC WAY</span>
            </div>
            <h3 className="duel-title duel-title--legacy">{current.oldWay.title}</h3>
            <p className="duel-desc">{current.oldWay.description}</p>
            
            <div className="duel-stat-box duel-stat-box--legacy">
              <span className="duel-stat-label">Average Friction Delay</span>
              <span className="duel-stat-value duel-stat-value--legacy">{current.oldWay.metric}</span>
              <p className="duel-stat-sub">⚠️ {current.oldWay.pain}</p>
            </div>

            <div className="duel-visual-pill duel-visual-pill--legacy">
              <AlertTriangle size={14} />
              <span>Paper receipts, misheard orders, table disputes</span>
            </div>
          </div>

          {/* VS Badge in Middle */}
          <div className="duel-divider">
            <span className="duel-vs-chip">VS</span>
          </div>

          {/* UrQR Card (Neon emerald tone) */}
          <div className="duel-side duel-side--urqr">
            <div className="duel-badge duel-badge--urqr">
              <Sparkles size={15} />
              <span>THE UrQR WAY</span>
            </div>
            <h3 className="duel-title duel-title--urqr">{current.newWay.title}</h3>
            <p className="duel-desc">{current.newWay.description}</p>
            
            <div className="duel-stat-box duel-stat-box--urqr">
              <span className="duel-stat-label">UrQR Speed Gain</span>
              <span className="duel-stat-value duel-stat-value--urqr">{current.newWay.metric}</span>
              <p className="duel-stat-sub">🚀 {current.newWay.gain}</p>
            </div>

            <div className="duel-visual-pill duel-visual-pill--urqr">
              <CheckCircle2 size={14} />
              <span>{current.highlight}</span>
            </div>
          </div>
        </div>

        {/* Live bottom impact banner */}
        <div className="problem-solution__banner">
          <div className="banner-stat">
            <Flame size={20} className="banner-icon banner-icon--amber" />
            <div>
              <strong>+38% Table Velocity</strong>
              <span>Turnover drops from 48m to 31m per seating</span>
            </div>
          </div>
          <div className="banner-divider" />
          <div className="banner-stat">
            <ChefHat size={20} className="banner-icon banner-icon--emerald" />
            <div>
              <strong>0% Lost Orders</strong>
              <span>Synchronized directly to firewood kitchen KDS</span>
            </div>
          </div>
          <div className="banner-divider" />
          <div className="banner-stat">
            <CreditCard size={20} className="banner-icon banner-icon--cyan" />
            <div>
              <strong>Instant UPI Settlement</strong>
              <span>Zero wait for EDC card machine or change cash</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
