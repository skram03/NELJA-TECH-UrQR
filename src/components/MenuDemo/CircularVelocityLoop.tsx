import { Zap, Sparkles } from "lucide-react";
import "./CircularVelocityLoop.css";

type RoleDevice = "guest" | "waiter" | "kitchen" | "payment";

interface CircularVelocityLoopProps {
  activeRole: RoleDevice;
  onSelectRole: (role: RoleDevice) => void;
  verticalName: string;
  turnoverBoost: string;
}

interface StepInfo {
  id: RoleDevice;
  stepNum: string;
  title: string;
  roleBadge: string;
  headline: string;
  desc: string;
  metric: string;
  color: string;
  accentClass: string;
  handoff: string;
}

const STEPS: StepInfo[] = [
  {
    id: "guest",
    stepNum: "STEP 01",
    title: "Guest Mobile Scan",
    roleBadge: "TABLE DINER",
    headline: "1.2s Instant Camera Open",
    desc: "Diners scan acrylic table QR. Launches live bilingual menu with 82°C wood-fire dum countdown. Zero app install.",
    metric: "⚡ 1.2s Open",
    color: "#0284C7",
    accentClass: "step-accent--blue",
    handoff: "Transmits KOT to Waiter in 0ms ➔"
  },
  {
    id: "waiter",
    stepNum: "STEP 02",
    title: "Waiter Mobile POS",
    roleBadge: "FLOOR STEWARD",
    headline: "10-Seat Real-Time Grid",
    desc: "Personal phone command center with color-coded floor map (Vacant, Dining, Bill Req) and haptic chime alerts.",
    metric: "📱 ₹0 Hardware",
    color: "#EA580C",
    accentClass: "step-accent--orange",
    handoff: "Auto-routes split to Kitchen KDS ➔"
  },
  {
    id: "kitchen",
    stepNum: "STEP 03",
    title: "Station Kitchen Pass",
    roleBadge: "CHEF EXPEDITER",
    headline: "FIFO Chronological KDS",
    desc: "Station split: biryani to Handi, starters to Tandoor. 1-tap bump immediately alerts steward for hot pickup.",
    metric: "⏱️ -6m Prep Saved",
    color: "#84CC16",
    accentClass: "step-accent--lime",
    handoff: "Signals steward for pickup & readies bill ➔"
  },
  {
    id: "payment",
    stepNum: "STEP 04",
    title: "15s Table UPI & 86 Sync",
    roleBadge: "AUTO-VACATE TURN",
    headline: "Dynamic Stand Settlement",
    desc: "Guests pay on table QR with PhonePe or GPay. Payment clears in 15 seconds, instantly auto-vacating seat.",
    metric: "💳 15s Auto-Vacate",
    color: "#10B981",
    accentClass: "step-accent--emerald",
    handoff: "Flips seat to Vacant (Emerald) ↺"
  }
];

export default function CircularVelocityLoop({
  activeRole,
  onSelectRole,
  verticalName,
  turnoverBoost
}: CircularVelocityLoopProps) {
  return (
    <div className="circular-velocity-section" role="region" aria-label="Circular 4-Step Velocity Loop">
      
      {/* Section Header */}
      <div className="circular-velocity-header text-center">
        <div className="circular-velocity-badge">
          <Zap size={13} className="text-emerald" />
          <span>CIRCULAR 4-STAGE ARCHITECTURE</span>
        </div>
        <h3 className="circular-velocity-title">
          The Closed Dining Room Loop for <span className="type-serif-em">{verticalName}</span>
        </h3>
        <p className="circular-velocity-sub">
          A continuous, unbroken circle of operations. Every camera scan, waiter dispatch,
          kitchen ticket, and UPI checkout accelerates the next table seating.
        </p>
      </div>

      {/* Main Infographic Stage */}
      <div className="infographic-loop-container">
        
        {/* SVG Orbital Wheel (Matching Reference Photo media_1793213134471_96059f39.png) */}
        <div className="orbital-wheel-wrapper">
          <svg
            viewBox="0 0 700 700"
            className="orbital-wheel-svg"
            aria-hidden="true"
          >
            <defs>
              {/* Gradients matching the reference photo */}
              <linearGradient id="gradStep1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>

              <linearGradient id="gradStep2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>

              <linearGradient id="gradStep3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A3E635" />
                <stop offset="100%" stopColor="#65A30D" />
              </linearGradient>

              <linearGradient id="gradStep4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              {/* Central Hub Gold Gradient */}
              <linearGradient id="hubGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Drop Shadows */}
              <filter id="loopShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1C1B18" floodOpacity="0.12" />
              </filter>
              <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* 4 Continuous Interlocking Curved Ribbons forming the Loop */}
            <g filter="url(#loopShadow)">
              
              {/* Ribbon 1: Top Arc (Step 01 - Azure Blue) */}
              <path
                d="M 184 184 A 235 235 0 0 1 516 184"
                fill="none"
                stroke="url(#gradStep1)"
                strokeWidth="76"
                strokeLinecap="round"
                className={`loop-ribbon ${activeRole === "guest" ? "loop-ribbon--active" : ""}`}
              />

              {/* Ribbon 2: Right Arc (Step 02 - Flame Orange) */}
              <path
                d="M 516 184 A 235 235 0 0 1 516 516"
                fill="none"
                stroke="url(#gradStep2)"
                strokeWidth="76"
                strokeLinecap="round"
                className={`loop-ribbon ${activeRole === "waiter" ? "loop-ribbon--active" : ""}`}
              />

              {/* Ribbon 3: Bottom Arc (Step 03 - Golden Lime) */}
              <path
                d="M 516 516 A 235 235 0 0 1 184 516"
                fill="none"
                stroke="url(#gradStep3)"
                strokeWidth="76"
                strokeLinecap="round"
                className={`loop-ribbon ${activeRole === "kitchen" ? "loop-ribbon--active" : ""}`}
              />

              {/* Ribbon 4: Left Arc (Step 04 - Jade Green) */}
              <path
                d="M 184 516 A 235 235 0 0 1 184 184"
                fill="none"
                stroke="url(#gradStep4)"
                strokeWidth="76"
                strokeLinecap="round"
                className={`loop-ribbon ${activeRole === "payment" ? "loop-ribbon--active" : ""}`}
              />
            </g>

            {/* Step Label Paths for Text-On-Path Curved Typography */}
            <defs>
              <path id="textArc1" d="M 230 148 A 235 235 0 0 1 470 148" fill="none" />
              <path id="textArc2" d="M 552 230 A 235 235 0 0 1 552 470" fill="none" />
              <path id="textArc3" d="M 470 552 A 235 235 0 0 1 230 552" fill="none" />
              <path id="textArc4" d="M 148 470 A 235 235 0 0 1 148 230" fill="none" />
            </defs>

            {/* Curved Step Text on Ribbons */}
            <text className="curved-step-text" fill="#FFFFFF">
              <textPath href="#textArc1" startOffset="50%" textAnchor="middle">
                STEP 01
              </textPath>
            </text>
            <text className="curved-step-text" fill="#FFFFFF">
              <textPath href="#textArc2" startOffset="50%" textAnchor="middle">
                STEP 02
              </textPath>
            </text>
            <text className="curved-step-text" fill="#FFFFFF">
              <textPath href="#textArc3" startOffset="50%" textAnchor="middle">
                STEP 03
              </textPath>
            </text>
            <text className="curved-step-text" fill="#FFFFFF">
              <textPath href="#textArc4" startOffset="50%" textAnchor="middle">
                STEP 04
              </textPath>
            </text>

            {/* Central Core Engine Hub (The Lightbulb / Kinetic Engine Hub) */}
            <g className="central-engine-hub">
              {/* Outer Radiant Spoke Rays connecting outwards to each role */}
              <g stroke="url(#hubGoldGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.85">
                <line x1="350" y1="210" x2="350" y2="242" />
                <line x1="449" y1="251" x2="426" y2="274" />
                <line x1="490" y1="350" x2="458" y2="350" />
                <line x1="449" y1="449" x2="426" y2="426" />
                <line x1="350" y1="490" x2="350" y2="458" />
                <line x1="251" y1="449" x2="274" y2="426" />
                <line x1="210" y1="350" x2="242" y2="350" />
                <line x1="251" y1="251" x2="274" y2="274" />
              </g>

              {/* Core Hub Outer Ring */}
              <circle
                cx="350"
                cy="350"
                r="95"
                fill="#FFFFFF"
                stroke="url(#hubGoldGrad)"
                strokeWidth="7"
                filter="url(#nodeShadow)"
              />

              {/* Core Lightbulb / Engine Graphic */}
              <g transform="translate(350, 350)" className="hub-center-graphic">
                {/* Lightbulb Bulb Outline */}
                <path
                  d="M -16 -24 A 20 20 0 1 1 16 -24 C 18 -14 10 -4 10 2 L -10 2 C -10 -4 -18 -14 -16 -24 Z"
                  fill="none"
                  stroke="#1C1B18"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                {/* Lightbulb Screw Base */}
                <path
                  d="M -9 6 L 9 6 M -8 11 L 8 11 M -5 16 L 5 16"
                  stroke="#1C1B18"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Internal Filament */}
                <path
                  d="M -7 -14 L -2 -22 L 2 -22 L 7 -14"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Core Label */}
              <text x="350" y="388" textAnchor="middle" className="hub-title-txt">
                UrQR CORE
              </text>
              <text x="350" y="402" textAnchor="middle" className="hub-sub-txt">
                0ms VELOCITY ENGINE
              </text>
            </g>

            {/* 4 Circular Node Discs (Matching Reference Photo with Drop Shadows) */}
            
            {/* Node 1: Top-Left (Guest) */}
            <g
              transform="translate(184, 184)"
              filter="url(#nodeShadow)"
              className="orbital-node-btn"
              onClick={() => onSelectRole("guest")}
            >
              <circle cx="0" cy="0" r="44" fill="#FFFFFF" stroke="#0284C7" strokeWidth="5.5" />
              {/* Smartphone / QR Icon */}
              <rect x="-14" y="-22" width="28" height="44" rx="6" fill="none" stroke="#0284C7" strokeWidth="3" />
              <line x1="-6" y1="14" x2="6" y2="14" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="0" cy="-15" r="1.5" fill="#0284C7" />
            </g>

            {/* Node 2: Top-Right (Waiter) */}
            <g
              transform="translate(516, 184)"
              filter="url(#nodeShadow)"
              className="orbital-node-btn"
              onClick={() => onSelectRole("waiter")}
            >
              <circle cx="0" cy="0" r="44" fill="#FFFFFF" stroke="#EA580C" strokeWidth="5.5" />
              {/* Waiter Cockpit Document / Map Icon */}
              <rect x="-16" y="-20" width="32" height="40" rx="4" fill="none" stroke="#EA580C" strokeWidth="3" />
              <line x1="-10" y1="-10" x2="10" y2="-10" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="-10" y1="-2" x2="10" y2="-2" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="-10" y1="6" x2="4" y2="6" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Node 3: Bottom-Right (Kitchen) */}
            <g
              transform="translate(516, 516)"
              filter="url(#nodeShadow)"
              className="orbital-node-btn"
              onClick={() => onSelectRole("kitchen")}
            >
              <circle cx="0" cy="0" r="44" fill="#FFFFFF" stroke="#84CC16" strokeWidth="5.5" />
              {/* Kitchen Gear / Fire Station Icon */}
              <circle cx="0" cy="0" r="12" fill="none" stroke="#65A30D" strokeWidth="3.5" />
              <path
                d="M -4 -22 L 4 -22 M -4 22 L 4 22 M -22 -4 L -22 4 M 22 -4 L 22 4 M -16 -16 L -10 -10 M 16 16 L 10 10 M -16 16 L -10 10 M 16 -16 L 10 -10"
                stroke="#65A30D"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>

            {/* Node 4: Bottom-Left (Payment) */}
            <g
              transform="translate(184, 516)"
              filter="url(#nodeShadow)"
              className="orbital-node-btn"
              onClick={() => onSelectRole("payment")}
            >
              <circle cx="0" cy="0" r="44" fill="#FFFFFF" stroke="#10B981" strokeWidth="5.5" />
              {/* Speech Bubble / UPI Credit Icon */}
              <rect x="-18" y="-16" width="36" height="26" rx="6" fill="none" stroke="#059669" strokeWidth="3" />
              <path d="M -6 10 L -6 18 L 2 10 Z" fill="#059669" />
              <circle cx="-9" cy="-3" r="2.5" fill="#059669" />
              <circle cx="0" cy="-3" r="2.5" fill="#059669" />
              <circle cx="9" cy="-3" r="2.5" fill="#059669" />
            </g>
          </svg>
        </div>

        {/* 4 Quadrant Interactive Cards (Surrounding the Central Ring) */}
        <div className="infographic-quadrants-grid">
          {STEPS.map((step) => {
            const isSelected = activeRole === step.id;

            return (
              <div
                key={step.id}
                onClick={() => onSelectRole(step.id)}
                className={`quadrant-card quadrant-card--${step.id} ${isSelected ? "quadrant-card--selected" : ""}`}
              >
                <div className="quadrant-card__header">
                  <span className="quadrant-step-badge">{step.stepNum}</span>
                  <span className={`quadrant-role-pill ${step.accentClass}`}>{step.roleBadge}</span>
                </div>

                <h4 className="quadrant-title">{step.title}</h4>
                <span className="quadrant-headline">{step.headline}</span>
                <p className="quadrant-desc">{step.desc}</p>

                <div className="quadrant-footer">
                  <span className="quadrant-metric">{step.metric}</span>
                  <span className="quadrant-handoff">{step.handoff}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Dynamic Sync Callout */}
      <div className="loop-sync-banner">
        <Sparkles size={16} className="text-emerald" />
        <p>
          <strong>Closed-Loop Throughput:</strong> Clicking any stage above switches the live cockpit simulator instantly.
          Zero lost orders, zero cashier queues, and an average <strong>{turnoverBoost}</strong>.
        </p>
      </div>

    </div>
  );
}
