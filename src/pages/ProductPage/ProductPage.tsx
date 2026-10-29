import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight, QrCode, Map,
  ChefHat, Smartphone, CheckCircle2,
  Sparkles, Flame, Clock, CreditCard, Bell, Zap,
  Repeat, ArrowLeftRight, Play, Pause
} from "lucide-react";
import "./ProductPage.css";

/* ──────────────────────────────────────────────────────────── */
/* CIRCULAR CHAIN CARABINER LINK COMPONENT                      */
/* Interlocking titanium & emerald carabiner connecting nodes   */
/* ──────────────────────────────────────────────────────────── */
interface ChainLinkProps {
  active: boolean;
}

function CircleCarabinerLink({ active }: ChainLinkProps) {
  return (
    <div className={`circle-chain-link ${active ? "circle-chain-link--active" : ""}`} aria-hidden="true">
      <svg width="44" height="24" viewBox="0 0 44 24" fill="none" className="carabiner-svg">
        <defs>
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        {/* Carabiner Body Ring */}
        <rect
          x="3"
          y="3"
          width="38"
          height="18"
          rx="9"
          stroke={active ? "url(#emeraldGrad)" : "url(#metalGrad)"}
          strokeWidth="3.5"
          className="carabiner-body"
        />

        {/* Tension Screw Gate */}
        <rect
          x="16"
          y="1"
          width="12"
          height="22"
          rx="3"
          fill={active ? "#10B981" : "#334155"}
          stroke="#F8FAFC"
          strokeWidth="1.2"
        />

        {/* Bidirectional Sync Indicator */}
        <path
          d="M19 12 L25 12 M23 10 L25 12 L23 14"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* Loop Return Carabiner (Closes the 4 to 1 Circle) */
function LoopReturnLink({ active }: { active: boolean }) {
  return (
    <div className={`circle-return-badge ${active ? "circle-return-badge--active" : ""}`} aria-hidden="true">
      <Repeat size={14} className="repeat-icon" />
      <span>LOOPS TO 01</span>
    </div>
  );
}

interface CircleNode {
  id: string;
  step: string;
  title: string;
  shortLabel: string;
  role: string;
  roleTag: string;
  accentColor: string;
  icon: typeof Smartphone;
  headline: string;
  subheadline: string;
  metric: string;
  capabilities: { title: string; desc: string; metric: string }[];
  viceVersaTitle: string;
  viceVersaSummary: string;
  syncChannels: {
    direction: string;
    from: string;
    to: string;
    action: string;
    latency: string;
  }[];
}

const CIRCLE_NODES: CircleNode[] = [
  {
    id: "guest-menu",
    step: "01",
    title: "Guest Mobile Menu",
    shortLabel: "1. Guest Menu",
    role: "TABLE DINER",
    roleTag: "GUEST INTERFACE",
    accentColor: "#0284C7", // Cyan/Azure
    icon: Smartphone,
    headline: "1.2s Instant Camera Open. Zero App Download.",
    subheadline: "Guests scan the table QR code. The live bilingual menu opens instantly with high-definition food photography, spice heat meters, and live portion stock.",
    metric: "1.2s Fast Open",
    capabilities: [
      {
        title: "Zero Friction Camera Scan",
        desc: "Instant PWA opens in any phone browser without app store download or login.",
        metric: "1.2s Open",
      },
      {
        title: "Live Wood-Fire Dum Count",
        desc: "Portion countdown updates as handis empty, eliminating disappointed diners.",
        metric: "82°C Dum",
      },
      {
        title: "Bilingual Kannada / English",
        desc: "One-tap language toggle with rich dietary tags and spice level badges.",
        metric: "100% Native",
      },
    ],
    viceVersaTitle: "Guest ⇄ Waiter Bi-Directional Channel",
    viceVersaSummary: "Camera scan fires table KOT to Waiter in 0ms; Waiter acknowledges water & bill calls instantaneously.",
    syncChannels: [
      {
        direction: "Forward Flow",
        from: "Diner Phone",
        to: "Waiter Cockpit",
        action: "Orders 2× Donne Biryani ➔ KOT flashes on staff phone with table seat ID",
        latency: "0ms Real-Time",
      },
      {
        direction: "Reverse (Vice-Versa)",
        from: "Waiter Cockpit",
        to: "Diner Phone",
        action: "Steward acknowledges 'Water Refill' call ➔ Diner sees 'Steward on way' status",
        latency: "Instant Haptic",
      },
    ],
  },
  {
    id: "waiter-cockpit",
    step: "02",
    title: "Waiter Mobile Cockpit",
    shortLabel: "2. Waiter Cockpit",
    role: "FLOOR STEWARD",
    roleTag: "FLOOR COORDINATION",
    accentColor: "#EA580C", // Warm Amber
    icon: Map,
    headline: "High-Visibility 10-Seat Grid on Staff Phones.",
    subheadline: "Transforms existing staff smartphones into an ergonomic dining room command center. Color-coded table states eliminate napkin scribbles and double table capacity per steward.",
    metric: "10-Seat Grid",
    capabilities: [
      {
        title: "Real-Time 3-State Floor Map",
        desc: "Emerald (Vacant), Amber (Dining with timers), and Rose (Bill requested).",
        metric: "10-Seat Grid",
      },
      {
        title: "Haptic Chimes & Concierge Alerts",
        desc: "Vibration alerts for water refills, split bills, and guest summon calls.",
        metric: "0ms Latency",
      },
      {
        title: "Shift Handovers & Table Swap",
        desc: "One-tap table reallocation and PIN-protected staff shift reconciliation.",
        metric: "₹0 Hardware",
      },
    ],
    viceVersaTitle: "Waiter ⇄ Kitchen Bi-Directional Channel",
    viceVersaSummary: "Waiter routes order split to Station Passes; Kitchen 1-tap bump vibrates waiter phone for hot tray pickup.",
    syncChannels: [
      {
        direction: "Forward Flow",
        from: "Waiter Cockpit",
        to: "Kitchen Station Pass",
        action: "Splits biryani to Handi Line & starters to Tandoor Line with special notes",
        latency: "Auto-Routing",
      },
      {
        direction: "Reverse (Vice-Versa)",
        from: "Kitchen Pass",
        to: "Waiter Cockpit",
        action: "Chef bumps plated Donne Biryani ➔ Steward phone vibrates: 'Tray Ready for Table 04'",
        latency: "Haptic Alert",
      },
    ],
  },
  {
    id: "kitchen-kds",
    step: "03",
    title: "Station Kitchen KDS",
    shortLabel: "3. Kitchen Pass",
    role: "KITCHEN EXPEDITER",
    roleTag: "KITCHEN DISPATCH",
    accentColor: "#10B981", // Emerald
    icon: ChefHat,
    headline: "Chronological Station Routing for Wood-Fire Passes.",
    subheadline: "Orders fire instantaneously from table scans into dedicated station passes (Biryani Handi, Tandoor & Starters). Eliminates lost greasy thermal tickets and kitchen friction.",
    metric: "-6m Prep Saved",
    capabilities: [
      {
        title: "Automatic Station Splitting",
        desc: "Biryanis route to Handi pass while appetizers route to tandoor simultaneously.",
        metric: "Auto Split",
      },
      {
        title: "Chronological FIFO Queue",
        desc: "Color-coded ticket countdown prevents forgotten orders and skips.",
        metric: "FIFO Queue",
      },
      {
        title: "1-Tap 'Bump to Pass'",
        desc: "Chefs bump tickets when plated, immediately vibrating the waiter for pickup.",
        metric: "-6m Prep Saved",
      },
    ],
    viceVersaTitle: "Kitchen ⇄ Table Settlement Channel",
    viceVersaSummary: "Plated food delivery readies dynamic UPI QR; 100ms 86 item stockout sync prevents kitchen overselling.",
    syncChannels: [
      {
        direction: "Forward Flow",
        from: "Kitchen Station",
        to: "Table UPI QR",
        action: "Final dish bumped ➔ Dynamic table QR stand calculates bill with 5% GST",
        latency: "Automated",
      },
      {
        direction: "Reverse (Vice-Versa)",
        from: "Kitchen Station",
        to: "All Table Menus",
        action: "Handi batch sold out (86'd) ➔ Turns dish OFF across all diner QR stands in 100ms",
        latency: "100ms Sync",
      },
    ],
  },
  {
    id: "table-upi",
    step: "04",
    title: "15s Table UPI & 86 Sync",
    shortLabel: "4. Table UPI",
    role: "SETTLEMENT & TURN",
    roleTag: "INSTANT SETTLEMENT",
    accentColor: "#6366F1", // Indigo
    icon: CreditCard,
    headline: "Dynamic Table QR Settlement with Instant Vacate.",
    subheadline: "Guests scan the dynamic table stand QR and pay via PhonePe, Google Pay, or Paytm. Slashes the 20-minute billing bottleneck down to 15 seconds.",
    metric: "15s Table Turn",
    capabilities: [
      {
        title: "Pre-Computed Tax Invoice",
        desc: "Dynamic QR encodes exact table total including 5% restaurant GST.",
        metric: "PhonePe/GPay",
      },
      {
        title: "Auto-Vacate Status Flip",
        desc: "Payment confirmation immediately flips table to Vacant (Emerald) for next party.",
        metric: "15s Turn",
      },
      {
        title: "WhatsApp Tax Receipt",
        desc: "Automated digital PDF bill sent directly to guest phone on payment.",
        metric: "Zero Paper",
      },
    ],
    viceVersaTitle: "Settlement ⇄ Next Diner Channel (Closes the Circle)",
    viceVersaSummary: "UPI payment clearance automatically resets table to Vacant (Emerald), seamlessly ready for the next diner to scan.",
    syncChannels: [
      {
        direction: "Closing the Circle",
        from: "Table UPI Payment",
        to: "Floor Management",
        action: "Diner pays ₹588 ➔ Soundbox announces payment; Table 04 turns Emerald (Vacant)",
        latency: "15s Clearance",
      },
      {
        direction: "New Cycle Starts",
        from: "Vacant Table 04",
        to: "Next Walk-In Party",
        action: "Next diner sits down & points camera at table stand ➔ Cycle 01 begins again",
        latency: "Zero Floor Lag",
      },
    ],
  },
];

export default function ProductPage() {
  const [activeStep, setActiveStep] = useState(1); // Default to Step 2: Waiter Cockpit
  const [autoCycle, setAutoCycle] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string>("T-04");
  const [activeZone, setActiveZone] = useState("Zone 1");
  const [waiterAcknowledged, setWaiterAcknowledged] = useState(false);
  const location = useLocation();

  const [seatsState, setSeatsState] = useState([
    { id: "T-01", status: "VACANT", type: "vacant", time: "Ready", guests: 0 },
    { id: "T-02", status: "BILL REQ", type: "bill", time: "₹1,120", guests: 3 },
    { id: "T-03", status: "VACANT", type: "vacant", time: "Ready", guests: 0 },
    { id: "T-04", status: "DINING", type: "dining", time: "18m", guests: 4 },
    { id: "T-05", status: "VACANT", type: "vacant", time: "Ready", guests: 0 },
    { id: "T-06", status: "KDS PREP", type: "kds", time: "04:12", guests: 2 },
  ]);

  // Auto-Cycle Engine (Smooth demonstration of unbroken circular flow)
  useEffect(() => {
    if (!autoCycle) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % CIRCLE_NODES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoCycle]);

  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.replace("#", "");
      const foundIndex = CIRCLE_NODES.findIndex((p) => p.id === hashId);
      if (foundIndex !== -1) {
        setActiveStep(foundIndex);
        setTimeout(() => {
          const el = document.getElementById("circle-chain-container");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  }, [location.hash]);

  const activeNode = CIRCLE_NODES[activeStep];
  const currentSeat = seatsState.find((s) => s.id === selectedSeat) || seatsState[3];

  const handleSettleSeat = (tableId: string) => {
    setSeatsState((prev) =>
      prev.map((s) =>
        s.id === tableId
          ? { ...s, status: "VACANT", type: "vacant", time: "Ready", guests: 0 }
          : s
      )
    );
  };

  const handleSeatWalkIn = (tableId: string) => {
    setSeatsState((prev) =>
      prev.map((s) =>
        s.id === tableId
          ? { ...s, status: "DINING", type: "dining", time: "01m", guests: 2 }
          : s
      )
    );
  };

  return (
    <div className="product-page">
      {/* Product Hero Header */}
      <section className="product-hero section" aria-labelledby="product-hero-heading">
        <div className="container">
          
          <div className="product-hero__header">
            <div className="section-label">
              <Sparkles size={14} className="icon-pulse" />
              <span>UNBROKEN CIRCULAR RESTAURANT CHAIN · 1-TO-1 SYNC</span>
            </div>
            <h1 id="product-hero-heading" className="product-hero__title">
              The Closed-Loop Velocity Engine. <br />
              <span className="type-serif-em">Connected One-to-One.</span>
            </h1>
            <p className="product-hero__sub">
              Diner QR Scan ⇄ Waiter Mobile Cockpit ⇄ Kitchen Station Pass ⇄ 15s Table UPI.
              Every node links in an unbroken circular feedback loop with zero floor lag.
            </p>
          </div>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* THE MASTER CIRCLE CHAIN COMPONENT (INSPIRED BY USER BRIEF)   */}
          {/* 4 Quadrants Connected with Interlocking Curved Bands & Hub  */}
          {/* ──────────────────────────────────────────────────────────── */}
          <div className="circle-infographic-wrapper" id="circle-chain-container">
            <div className="circle-infographic-card">
              
              <div className="circle-infographic-top-strip">
                <div className="flex items-center gap-2">
                  <span className="live-radar-dot" />
                  <strong className="text-sm font-mono tracking-wider">CIRCULAR PIPELINE ARCHITECTURE</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAutoCycle(!autoCycle)}
                    className={`btn-auto-cycle ${autoCycle ? "btn-auto-cycle--active" : ""}`}
                    title="Toggle automatic cycle through the 4 dining stages"
                  >
                    {autoCycle ? <Pause size={12} /> : <Play size={12} />}
                    <span>{autoCycle ? "PAUSE AUTO-FLOW" : "AUTO-CYCLE FLOW (4s)"}</span>
                  </button>
                </div>
              </div>

              {/* The SVG Interconnected Process Ring */}
              <div className="circle-ring-container">
                <svg viewBox="0 0 600 600" className="circle-ring-svg" aria-label="Circular Restaurant Engine Flow Diagram">
                  <defs>
                    {/* Gradients for the 4 Quadrant Arcs */}
                    <linearGradient id="arcGrad0" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>
                    <linearGradient id="arcGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EA580C" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient id="arcGrad2" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                    <linearGradient id="arcGrad3" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#0284C7" />
                    </linearGradient>

                    {/* Filter for glowing active arcs */}
                    <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Outer Orbit Guide Track */}
                  <circle cx="300" cy="300" r="195" fill="none" stroke="#E6E4DD" strokeWidth="36" strokeLinecap="round" />

                  {/* Interconnected Arc 1 (Top: Step 01 -> Step 02) */}
                  <path
                    d="M 162 162 A 195 195 0 0 1 438 162"
                    fill="none"
                    stroke={activeStep === 0 ? "url(#arcGrad0)" : "#D5D2C7"}
                    strokeWidth={activeStep === 0 ? "40" : "32"}
                    strokeLinecap="round"
                    className={`arc-path ${activeStep === 0 ? "arc-path--active" : ""}`}
                  />

                  {/* Interconnected Arc 2 (Right: Step 02 -> Step 03) */}
                  <path
                    d="M 438 162 A 195 195 0 0 1 438 438"
                    fill="none"
                    stroke={activeStep === 1 ? "url(#arcGrad1)" : "#D5D2C7"}
                    strokeWidth={activeStep === 1 ? "40" : "32"}
                    strokeLinecap="round"
                    className={`arc-path ${activeStep === 1 ? "arc-path--active" : ""}`}
                  />

                  {/* Interconnected Arc 3 (Bottom: Step 03 -> Step 04) */}
                  <path
                    d="M 438 438 A 195 195 0 0 1 162 438"
                    fill="none"
                    stroke={activeStep === 2 ? "url(#arcGrad2)" : "#D5D2C7"}
                    strokeWidth={activeStep === 2 ? "40" : "32"}
                    strokeLinecap="round"
                    className={`arc-path ${activeStep === 2 ? "arc-path--active" : ""}`}
                  />

                  {/* Interconnected Arc 4 (Left: Step 04 -> Step 01, LOOPS BACK TO CLOSE THE CIRCLE) */}
                  <path
                    d="M 162 438 A 195 195 0 0 1 162 162"
                    fill="none"
                    stroke={activeStep === 3 ? "url(#arcGrad3)" : "#D5D2C7"}
                    strokeWidth={activeStep === 3 ? "40" : "32"}
                    strokeLinecap="round"
                    className={`arc-path ${activeStep === 3 ? "arc-path--active" : ""}`}
                  />

                  {/* Animated Traveling Pulse Dots along the Circle Track */}
                  <circle cx="300" cy="105" r="5" fill="#FFFFFF" className="pulse-dot-orbit orbit-top" />
                  <circle cx="495" cy="300" r="5" fill="#FFFFFF" className="pulse-dot-orbit orbit-right" />
                  <circle cx="300" cy="495" r="5" fill="#FFFFFF" className="pulse-dot-orbit orbit-bottom" />
                  <circle cx="105" cy="300" r="5" fill="#FFFFFF" className="pulse-dot-orbit orbit-left" />

                  {/* One-to-One Flow Ribbon Annotations */}
                  <text x="300" y="110" textAnchor="middle" className="arc-label-text">
                    STEP 01 ➔ 02: KOT Auto-Fired (0ms) ⇄ Haptic Ack
                  </text>
                  <text x="500" y="305" textAnchor="middle" transform="rotate(90 500 305)" className="arc-label-text">
                    STEP 02 ➔ 03: Station Splitting ⇄ Plated Pickup Chime
                  </text>
                  <text x="300" y="500" textAnchor="middle" className="arc-label-text">
                    STEP 03 ➔ 04: Auto Bill Ready ⇄ 100ms 86 Stockout
                  </text>
                  <text x="100" y="305" textAnchor="middle" transform="rotate(-90 100 305)" className="arc-label-text">
                    STEP 04 ➔ 01: Table Re-Vacate ⇄ Next Diner Scan (Loop Closes!)
                  </text>

                  {/* Central Core Display Hub */}
                  <g className="circle-center-hub" transform="translate(300, 300)">
                    {/* Concentric radar backdrop */}
                    <circle r="92" fill="#FAF9F6" stroke="#E4E2DB" strokeWidth="2" />
                    <circle r="76" fill="#FFFFFF" stroke={activeNode.accentColor} strokeWidth="2.5" strokeDasharray="4 4" className="radar-dash-ring" />
                    <circle r="60" fill="#FAF9F6" />

                    {/* Central Status Content */}
                    <text y="-28" textAnchor="middle" className="hub-step-text">
                      STEP 0{activeStep + 1} OF 04
                    </text>
                    <text y="-6" textAnchor="middle" className="hub-role-text">
                      {activeNode.role}
                    </text>
                    <text y="14" textAnchor="middle" className="hub-metric-text">
                      {activeNode.metric}
                    </text>
                    <text y="32" textAnchor="middle" className="hub-loop-status">
                      ⇄ 1-TO-1 VICE-VERSA SYNC
                    </text>
                  </g>
                </svg>

                {/* 4 Interactive HTML Pods Positioned at the 4 Quadrants */}
                <div className="circle-quadrant-nodes">
                  {CIRCLE_NODES.map((node, idx) => {
                    const Icon = node.icon;
                    const isActive = activeStep === idx;
                    const quadrantClasses = [
                      "node-top-left",
                      "node-top-right",
                      "node-bottom-right",
                      "node-bottom-left",
                    ];

                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => {
                          setActiveStep(idx);
                          setAutoCycle(false);
                        }}
                        className={`circle-quadrant-pod ${quadrantClasses[idx]} ${isActive ? "circle-quadrant-pod--active" : ""}`}
                        style={{
                          "--pod-accent": node.accentColor,
                        } as React.CSSProperties}
                        aria-selected={isActive}
                      >
                        <div className="pod-outer-ring">
                          <span className="pod-step-badge">STEP {node.step}</span>
                          <div className="pod-icon-circle">
                            <Icon size={24} />
                          </div>
                        </div>
                        <div className="pod-text-label">
                          <strong className="pod-name">{node.title}</strong>
                          <span className="pod-role-sub">{node.roleTag}</span>
                          <span className="pod-metric-chip">{node.metric}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick-Switch Bar for Touch & Small Screens */}
              <div className="circle-mobile-nav-bar" role="tablist">
                {CIRCLE_NODES.map((node, idx) => {
                  const Icon = node.icon;
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        setActiveStep(idx);
                        setAutoCycle(false);
                      }}
                      className={`mobile-step-tab ${isActive ? "mobile-step-tab--active" : ""}`}
                    >
                      <span className="tab-num">{node.step}</span>
                      <Icon size={14} />
                      <span className="tab-title">{node.shortLabel}</span>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* THE FLOOR COORDINATION CONTAINER & DEEP-DIVE SCREEN STAGE   */}
          {/* ──────────────────────────────────────────────────────────── */}
          <div className="circle-chain-chassis">
            <div className="screen-stage">
              
              {/* Left Column: Clean Typography & Bi-Directional One-to-One Sync Stream */}
              <div className="screen-stage__details">
                <div className="screen-stage__tag-row">
                  <span className="screen-stage__tag">
                    <Zap size={13} className="text-emerald" />
                    <span>{activeNode.roleTag}</span>
                  </span>
                  <span className="screen-stage__role-pill">{activeNode.role}</span>
                </div>

                <h2 className="screen-stage__title">{activeNode.headline}</h2>
                <p className="screen-stage__desc">{activeNode.subheadline}</p>

                {/* ── THE VICE-VERSA BI-DIRECTIONAL ONE-TO-ONE SYNC MATRIX ── */}
                <div className="vice-versa-wrapper">
                  <div className="vice-versa-handler" aria-hidden="true">
                    <span className="vv-mount-ring" />
                    <span className="vv-mount-strap" style={{ background: activeNode.accentColor }} />
                    <div className="vv-mount-clamp" style={{ borderColor: activeNode.accentColor }}>
                      <span className="vv-clamp-jaw" />
                    </div>
                  </div>

                  <div
                    className="vice-versa-sync-card"
                    style={{ borderTop: `3px solid ${activeNode.accentColor}` }}
                  >
                    <div className="vice-versa-header">
                      <div className="flex items-center gap-2">
                        <ArrowLeftRight size={14} className="text-emerald" />
                        <h4 className="vice-versa-title">{activeNode.viceVersaTitle}</h4>
                      </div>
                      <span className="vice-versa-badge">1-TO-1 SYNC</span>
                    </div>
                    <p className="vice-versa-summary">{activeNode.viceVersaSummary}</p>

                    <div className="sync-channels-stack">
                      {activeNode.syncChannels.map((ch, i) => (
                        <div key={i} className="sync-channel-row">
                          <div className="sync-direction-tag">
                            <span>{ch.direction}</span>
                          </div>
                          <div className="sync-action-details">
                            <div className="sync-actor-flow">
                              <strong>{ch.from}</strong> ➔ <span>{ch.to}</span>
                            </div>
                            <p className="sync-action-txt">{ch.action}</p>
                          </div>
                          <span className="sync-latency-pill">{ch.latency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3 Balanced Capability Cards with Micro-Metrics */}
                <div className="screen-stage__capabilities-list">
                  {activeNode.capabilities.map((c, i) => (
                    <div key={i} className="capability-card">
                      <div
                        className="capability-card__clip"
                        aria-hidden="true"
                        style={{ background: activeNode.accentColor }}
                      />
                      <div className="capability-card__header">
                        <div className="capability-title-group">
                          <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                          <h4 className="capability-title">{c.title}</h4>
                        </div>
                        <span className="capability-metric-chip">{c.metric}</span>
                      </div>
                      <p className="capability-desc">{c.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Direct Action Links */}
                <div className="screen-stage__actions">
                  <Link to="/contact" className="btn btn--primary btn--md">
                    <span>Schedule Floor Walkthrough</span>
                    <ArrowRight size={15} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveStep((prev) => (prev + 1) % CIRCLE_NODES.length)}
                    className="btn btn--secondary btn--md"
                  >
                    <span>Next Node in Circle Loop ➔</span>
                  </button>
                </div>
              </div>

              {/* Right Column: High-Fidelity Interactive Mobile Screen Previews */}
              <div className="screen-stage__preview">
                
                {/* ── MOCKUP 01: GUEST MENU ── */}
                {activeNode.id === "guest-menu" && (
                  <div className="device-frame device-frame--phone">
                    <div className="device-notch" />
                    <div className="device-screen">
                      <div className="mockup-topbar">
                        <div>
                          <span className="mockup-pill-emerald">TABLE T-04</span>
                          <strong>Thoogudeepa Donne Biryani</strong>
                        </div>
                        <span className="mockup-cart-badge">Cart (2) · ₹560</span>
                      </div>

                      <div className="mockup-dish-card">
                        <img src="/images/food-spread.jpg" alt="Donne Biryani" className="mockup-dish-img" />
                        <div className="mockup-dish-content">
                          <div className="mockup-dish-row">
                            <span className="mockup-dum-tag"><Flame size={11} /> 82°C WOOD-FIRE DUM</span>
                            <span className="mockup-stock-tag">9 Left</span>
                          </div>
                          <h4>Mutton Donne Biryani</h4>
                          <p>Jeera samba rice simmered with tender mutton & military spice blend.</p>
                          <div className="mockup-dish-footer">
                            <span className="mockup-price">₹320</span>
                            <span className="mockup-add-pill">+ ADD</span>
                          </div>
                        </div>
                      </div>

                      <div className="mockup-dish-mini">
                        <div>
                          <strong>Chicken Sukka Fry</strong>
                          <span>Curry leaf roasted · ₹240</span>
                        </div>
                        <span className="mockup-add-pill mockup-add-pill--added">✓ ADDED</span>
                      </div>

                      <div className="mockup-floating-cart">
                        <div>
                          <span>2 items in cart</span>
                          <strong>₹560 + taxes</strong>
                        </div>
                        <button type="button" onClick={() => setActiveStep(1)} className="mockup-fire-btn">
                          Fire KOT to Waiter ➔
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── MOCKUP 02: WAITER MOBILE COCKPIT (THE FLOOR COORDINATION CONTAINER) ── */}
                {activeNode.id === "waiter-cockpit" && (
                  <div className="device-frame device-frame--phone device-frame--waiter-cockpit">
                    <div className="device-notch" />
                    <div className="device-screen waiter-cockpit-phone-screen">
                      
                      {/* Steward Top Status Bar */}
                      <div className="waiter-phone-topbar">
                        <div className="steward-profile">
                          <div className="steward-avatar">RK</div>
                          <div>
                            <span className="steward-role">ZONE 1 STEWARD</span>
                            <strong className="steward-name">Ramesh K. (#TH-08)</strong>
                          </div>
                        </div>
                        <div className="steward-status-pill">
                          <span className="status-dot-pulse" />
                          <span>ACTIVE</span>
                        </div>
                      </div>

                      {/* Zone Selector Bar */}
                      <div className="waiter-zone-strip">
                        {["Zone 1 (T1–T8)", "Patio (T9–T14)", "AC Hall"].map((zone) => (
                          <button
                            key={zone}
                            type="button"
                            onClick={() => setActiveZone(zone)}
                            className={`zone-chip ${activeZone === zone ? "zone-chip--active" : ""}`}
                          >
                            {zone}
                          </button>
                        ))}
                      </div>

                      {/* High-Visibility 6-Seat Interactive Floor Grid */}
                      <div className="cockpit-seats-grid">
                        {seatsState.map((seat) => (
                          <button
                            key={seat.id}
                            type="button"
                            onClick={() => setSelectedSeat(seat.id)}
                            className={`seat-box seat-box--${seat.type} ${selectedSeat === seat.id ? "seat-box--selected" : ""}`}
                          >
                            <div className="seat-box-top">
                              <span className="seat-id-txt">{seat.id}</span>
                              <span className="seat-time-tag">{seat.time}</span>
                            </div>
                            <span className="seat-status-label">{seat.status}</span>
                            {seat.guests > 0 && <span className="seat-guests-sub">{seat.guests} Guests</span>}
                          </button>
                        ))}
                      </div>

                      {/* Live Table Ticket Details (Selected Table View) */}
                      <div className="waiter-selected-ticket-card">
                        <div className="ticket-card-header">
                          <div>
                            <span className="ticket-table-name">SELECTED: {currentSeat.id}</span>
                            <small className="ticket-sub-info">
                              {currentSeat.guests > 0
                                ? `${currentSeat.guests} Guests · ${currentSeat.status}`
                                : "Vacant · Ready for Seating"}
                            </small>
                          </div>
                          <span className="ticket-stage-badge">
                            {currentSeat.status}
                          </span>
                        </div>

                        <div className="ticket-order-lines">
                          {currentSeat.id === "T-04" ? (
                            <>
                              <div className="ticket-line-item">
                                <span>2× Mutton Donne Biryani</span>
                                <strong className="text-amber">Dum Line</strong>
                              </div>
                              <div className="ticket-line-item">
                                <span>1× Nati Chicken Sukka</span>
                                <strong className="text-emerald">Plated</strong>
                              </div>
                            </>
                          ) : currentSeat.id === "T-02" ? (
                            <div className="ticket-line-item">
                              <span>Total Bill: ₹1,120</span>
                              <strong className="text-rose">Split UPI Req</strong>
                            </div>
                          ) : currentSeat.id === "T-06" ? (
                            <div className="ticket-line-item">
                              <span>1× Mutton Donne Biryani</span>
                              <strong className="text-cyan">04:12m Timer</strong>
                            </div>
                          ) : (
                            <div className="ticket-line-item text-slate-400">
                              <span>Table empty. Tap to seat walk-in party.</span>
                            </div>
                          )}
                        </div>

                        {/* Quick Steward Action Buttons */}
                        <div className="waiter-ticket-actions">
                          {currentSeat.type === "dining" && (
                            <>
                              <button
                                type="button"
                                onClick={() => setSelectedSeat("T-02")}
                                className="btn-steward btn-steward--amber"
                              >
                                Request Bill
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveStep(2)}
                                className="btn-steward btn-steward--emerald"
                              >
                                View KDS ➔
                              </button>
                            </>
                          )}
                          {currentSeat.type === "bill" && (
                            <button
                              type="button"
                              onClick={() => handleSettleSeat(currentSeat.id)}
                              className="btn-steward btn-steward--rose w-full"
                            >
                              <CreditCard size={12} /> Confirm UPI Payment (Auto-Vacate)
                            </button>
                          )}
                          {currentSeat.type === "vacant" && (
                            <button
                              type="button"
                              onClick={() => handleSeatWalkIn(currentSeat.id)}
                              className="btn-steward btn-steward--primary w-full"
                            >
                              + Seat Walk-In Diner (2 Guests)
                            </button>
                          )}
                          {currentSeat.type === "kds" && (
                            <button
                              type="button"
                              onClick={() => setActiveStep(2)}
                              className="btn-steward btn-steward--cyan w-full"
                            >
                              <ChefHat size={12} /> Track in Kitchen Pass
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Live Concierge Bell Notification Drawer */}
                      <div className="waiter-bell-alert-strip">
                        <Bell size={14} className="text-rose animate-bounce" />
                        <div className="alert-content">
                          <strong>Table T-04 Alert:</strong>
                          <span>Water refill & extra sherva summoned</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setWaiterAcknowledged(true)}
                          className="btn-ack"
                        >
                          {waiterAcknowledged ? "✓ ACK" : "ACK"}
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* ── MOCKUP 03: KITCHEN PASS KDS ── */}
                {activeNode.id === "kitchen-kds" && (
                  <div className="device-frame device-frame--tablet">
                    <div className="device-screen">
                      <div className="mockup-kds-header">
                        <div>
                          <span className="mockup-pill-amber">HANDI DUM PASS</span>
                          <strong className="text-white text-md">3 Active Tickets</strong>
                        </div>
                        <span className="mockup-kds-clock">13:42:19</span>
                      </div>

                      <div className="mockup-kds-tickets">
                        <div className="mockup-kds-card mockup-kds-card--urgent">
                          <div className="mockup-kds-card-head">
                            <span>TICKET #1042 · TABLE T-04</span>
                            <b className="timer"><Clock size={11} /> 05:12</b>
                          </div>
                          <div className="mockup-kds-items">
                            <div><strong>1× Mutton Donne Biryani</strong> (Extra Sherva)</div>
                            <div><strong>1× Chicken Sukka Fry</strong> (Spicy)</div>
                          </div>
                          <button type="button" onClick={() => setActiveStep(1)} className="mockup-bump-btn">
                            ✓ BUMP TO PASS (ALERT WAITER)
                          </button>
                        </div>

                        <div className="mockup-kds-card">
                          <div className="mockup-kds-card-head">
                            <span>TICKET #1043 · TABLE T-06</span>
                            <b className="timer"><Clock size={11} /> 01:45</b>
                          </div>
                          <div className="mockup-kds-items">
                            <div><strong>2× Mutton Donne Biryani</strong></div>
                          </div>
                          <button type="button" onClick={() => setActiveStep(1)} className="mockup-bump-btn">
                            ✓ BUMP TO PASS (ALERT WAITER)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── MOCKUP 04: 15S TABLE UPI ── */}
                {activeNode.id === "table-upi" && (
                  <div className="device-frame device-frame--phone">
                    <div className="device-notch" />
                    <div className="device-screen flex-center">
                      <div className="mockup-upi-card">
                        <div className="mockup-upi-brand">
                          <Flame size={16} className="text-amber" />
                          <span>THOOGUDEEPA DONNE BIRYANI</span>
                        </div>
                        <span className="mockup-table-pill">TABLE T-04 SETTLEMENT</span>
                        <div className="mockup-upi-qr-box">
                          <QrCode size={110} />
                          <span className="mockup-upi-amount">₹588.00</span>
                        </div>
                        <p className="mockup-upi-note">Scan with PhonePe, GPay, or Paytm</p>
                        <div className="mockup-upi-badges">
                          <span>PhonePe</span>
                          <span>GPay</span>
                          <span>Paytm</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveStep(0)}
                          className="mockup-upi-instant-pill"
                          style={{ cursor: "pointer", border: "none" }}
                        >
                          <Zap size={12} className="text-emerald" />
                          <span>Auto-flips table to Vacant (Loops to Step 01) ↺</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* 4 CONNECTED VELOCITY ROLE CARDS (NEW CONCEPT CHAIN & BORDER) */}
          {/* Visible Cards with Titanium Chain Bridges Linking 1-to-1     */}
          {/* ──────────────────────────────────────────────────────────── */}
          <div className="connected-roles-section">
            <div className="connected-roles-header">
              <span className="section-label">
                <Repeat size={13} className="text-emerald" />
                <span>ONE-TO-ONE ARCHITECTURE SPECIFICATION</span>
              </span>
              <h3 className="connected-roles-title">
                Four Interconnected Nodes. Zero Floor Friction.
              </h3>
              <p className="connected-roles-sub">
                Each operational station is locked into the next through automated event bridges,
                ensuring perfect data integrity and uninterrupted service flow.
              </p>
            </div>

            <div className="connected-roles-grid">
              {CIRCLE_NODES.map((node, idx) => {
                const Icon = node.icon;
                const isCurrentActive = activeStep === idx;
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={node.id}
                    className={`connected-role-wrapper ${isEven ? "role-unit--sway-a" : "role-unit--sway-b"}`}
                  >
                    {/* Industrial Titanium Carabiner & Ballistic Webbing Badge Handler */}
                    <div className="product-card-handler" aria-hidden="true">
                      {/* Truss Suspension Mounting Bracket */}
                      <div className="product-handler__bracket">
                        <span className="product-handler__pin" />
                        <span className="product-handler__plate" />
                      </div>

                      {/* Titanium Carabiner D-Ring with Screw Gate */}
                      <div className="product-handler__carabiner">
                        <svg
                          width="36"
                          height="26"
                          viewBox="0 0 36 26"
                          fill="none"
                          className="product-carabiner-svg"
                        >
                          <defs>
                            <linearGradient
                              id={`prodCarabiner-${node.id}`}
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#FFFFFF" />
                              <stop offset="30%" stopColor="#CBD5E1" />
                              <stop offset="70%" stopColor="#64748B" />
                              <stop offset="100%" stopColor="#1E293B" />
                            </linearGradient>
                          </defs>

                          {/* Carabiner D-Spine */}
                          <path
                            d="M10 4 C10 4, 26 4, 26 4 C29.5 4, 32 7, 32 11 L32 15 C32 19, 29.5 22, 26 22 L10 22 C6.5 22, 4 19, 4 15 L4 11 C4 7, 6.5 4, 10 4 Z"
                            stroke={`url(#prodCarabiner-${node.id})`}
                            strokeWidth="3.2"
                            strokeLinecap="round"
                          />

                          {/* Threaded Brass / Colored Locking Gate */}
                          <rect
                            x="12"
                            y="2"
                            width="11"
                            height="5.5"
                            rx="1.5"
                            fill={isCurrentActive ? node.accentColor : "#334155"}
                            stroke="#FFFFFF"
                            strokeWidth="0.8"
                          />
                        </svg>
                      </div>

                      {/* Ballistic Webbing Strap with Center Reflective Accent Line */}
                      <div
                        className="product-handler__strap"
                        style={{
                          borderColor: node.accentColor,
                          boxShadow: isCurrentActive ? `0 2px 10px ${node.accentColor}40` : "none",
                        }}
                      >
                        <span className="strap-texture" />
                        <span
                          className="strap-center-line"
                          style={{ background: node.accentColor }}
                        />
                        <span className="strap-metal-snap" />
                      </div>

                      {/* Dual Metallic Card Clamping Jaws */}
                      <div className="product-handler__jaws">
                        <span
                          className="product-jaw product-jaw--l"
                          style={{ background: node.accentColor }}
                        />
                        <span className="product-jaw-bar" />
                        <span
                          className="product-jaw product-jaw--r"
                          style={{ background: node.accentColor }}
                        />
                      </div>
                    </div>

                    <div
                      className={`connected-role-card ${isCurrentActive ? "connected-role-card--active" : ""}`}
                      onClick={() => setActiveStep(idx)}
                      role="button"
                      tabIndex={0}
                      style={{
                        borderTop: `3px solid ${node.accentColor}`,
                      }}
                    >
                      {/* Technical Corner Brackets */}
                      <span className="card-bracket card-bracket--tl">+</span>
                      <span className="card-bracket card-bracket--br">+</span>

                      {/* Card Top Strip */}
                      <div className="role-card-top">
                        <span
                          className="role-step-pill"
                          style={{
                            background: isCurrentActive ? node.accentColor : undefined,
                            color: isCurrentActive ? "#FFFFFF" : undefined,
                          }}
                        >
                          STEP {node.step}
                        </span>
                        <span
                          className="role-metric-badge"
                          style={{
                            color: node.accentColor,
                            background: `${node.accentColor}18`,
                          }}
                        >
                          {node.metric}
                        </span>
                      </div>

                      {/* Role Header */}
                      <div className="role-header-group">
                        <div
                          className="role-icon-box"
                          style={{
                            color: isCurrentActive ? "#FFFFFF" : node.accentColor,
                            background: isCurrentActive ? node.accentColor : `${node.accentColor}12`,
                            borderColor: `${node.accentColor}30`,
                          }}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <span className="role-tag-sub">{node.roleTag}</span>
                          <h4 className="role-card-title">{node.title}</h4>
                        </div>
                      </div>

                      {/* Role Summary */}
                      <p className="role-card-desc">{node.subheadline}</p>

                      {/* One-to-One Link Badge */}
                      <div className="role-link-status">
                        <div className="role-link-row">
                          <span className="link-arrow" style={{ color: node.accentColor }}>➔</span>
                          <span className="link-text">
                            <strong>{node.syncChannels[0]?.from}</strong> to {node.syncChannels[0]?.to}
                          </span>
                        </div>
                        <div className="role-link-row">
                          <span className="link-arrow text-amber">⮌</span>
                          <span className="link-text text-muted">
                            {node.syncChannels[1]?.action.split("➔")[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Titanium Carabiner Bridge to Next Card */}
                    {idx < CIRCLE_NODES.length - 1 ? (
                      <div className="card-chain-bridge">
                        <CircleCarabinerLink active={idx < activeStep} />
                      </div>
                    ) : (
                      <div className="card-chain-bridge">
                        <LoopReturnLink active={activeStep === 3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
