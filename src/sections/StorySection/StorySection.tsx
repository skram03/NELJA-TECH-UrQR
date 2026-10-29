import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles, ArrowRight, Flame, Clock, ChefHat,
  X, Check, Zap, DollarSign, TrendingUp, ShieldAlert,
  Smartphone, RotateCcw
} from "lucide-react";
import "./StorySection.css";

/* ──────────────────────────────────────────────────────────── */
/* 4 PEAK-HOUR OPERATIONAL BATTLEGROUNDS DATA                   */
/* Distinct from Screen 2: Focuses on Real Floor Battles Won   */
/* ──────────────────────────────────────────────────────────── */
interface BattlegroundCard {
  id: string;
  stepNumber: string;
  title: string;
  battlegroundTag: string;
  roiMetric: string;
  accentColor: string;
  oldChaos: {
    headline: string;
    description: string;
    frictionTag: string;
  };
  urqrVelocity: {
    headline: string;
    description: string;
    gainTag: string;
  };
  simulationPrompt: string;
  simulationSuccess: string;
  financialPayoff: string;
  icon: typeof Clock;
}

const BATTLEGROUNDS: BattlegroundCard[] = [
  {
    id: "table-turn",
    stepNumber: "01",
    title: "The 20-Min Bill Waiting Bottleneck",
    battlegroundTag: "TABLE TURNOVER SPEED",
    roiMetric: "+3.2 Turns / Shift",
    accentColor: "#0284C7", // Azure
    icon: Clock,
    oldChaos: {
      headline: "The 20-Minute Bill Hostage",
      description: "Diners wait 15–20 mins for printed paper chits and card machines with poor signal. Empty tables stay locked while waiting queues walk away outside.",
      frictionTag: "20 min checkout lag",
    },
    urqrVelocity: {
      headline: "15s Dynamic QR Table Stand UPI",
      description: "Diners scan the table acrylic stand, pay via PhonePe/GPay with 5% GST calculated. Soundbox chimes and table auto-resets to Vacant in seconds.",
      gainTag: "15s instant vacate",
    },
    simulationPrompt: "Simulate 15s Table Stand Settle ➔",
    simulationSuccess: "✓ Table T-04 Auto-Freed 23 Mins Faster!",
    financialPayoff: "+₹24,000 Extra Weekend Revenue",
  },
  {
    id: "dum-stockout",
    stepNumber: "02",
    title: "Sold-Out Biryani Handi Disappointment",
    battlegroundTag: "WOOD-FIRE DUM SHIELD",
    roiMetric: "100ms Real-Time 86",
    accentColor: "#EA580C", // Warm Amber
    icon: Flame,
    oldChaos: {
      headline: "The 1:45 PM Handi Empty Disaster",
      description: "Mutton handi empties out, but waiters keep taking orders. 15 mins later, the kitchen shouts it's over. Furious diners cancel and write 1-star Google reviews.",
      frictionTag: "3-5 walkouts per rush",
    },
    urqrVelocity: {
      headline: "Live 82°C Dum Inventory Countdown",
      description: "Portions tick down in real time on the live menu. When handi hits 0, the item instantly turns OFF across all table QR stands in 100 milliseconds.",
      gainTag: "Zero angry walkouts",
    },
    simulationPrompt: "Simulate Handi Sold-Out Depletion ➔",
    simulationSuccess: "✓ Sold-Out Handi Auto-Disabled across Tables!",
    financialPayoff: "Zero 1-Star Reviews from Stockouts",
  },
  {
    id: "kitchen-fifo",
    stepNumber: "03",
    title: "Greasy Thermal Chits & Shouted Orders",
    battlegroundTag: "STATION KITCHEN DISPATCH",
    roiMetric: "-6m Prep Latency",
    accentColor: "#10B981", // Emerald
    icon: ChefHat,
    oldChaos: {
      headline: "Lost Grease-Soaked Paper Chits",
      description: "Steam and oil destroy thermal tickets. Chefs shout across kitchen passes: 'Table 4 Biryani did you fire?' Plated dishes sit cold waiting for pickup.",
      frictionTag: "18-22 min prep time",
    },
    urqrVelocity: {
      headline: "Digital KDS with 1-Tap Bump Alert",
      description: "Biryani handis auto-route to Dum Line; starters route to Tandoor with FIFO countdowns. 1-tap bump immediately vibrates steward phone for hot pickup.",
      gainTag: "7m ticket-to-pass",
    },
    simulationPrompt: "Simulate 1-Tap Bump to Pass ➔",
    simulationSuccess: "✓ Steward Phone Vibrating for Hot Tray Pickup!",
    financialPayoff: "100% Chronological FIFO & Zero Cold Food",
  },
  {
    id: "steward-multiplier",
    stepNumber: "04",
    title: "Waiter Sprinting & POS Terminal Rental",
    battlegroundTag: "FLOOR STEWARD MULTIPLIER",
    roiMetric: "2× Capacity · ₹0 Rent",
    accentColor: "#6366F1", // Indigo
    icon: Smartphone,
    oldChaos: {
      headline: "14,000 Wasted Steps & Heavy Terminals",
      description: "Waiters sprint back and forth to heavy cashier counters with scribbled napkins. Hardware terminals cost ₹35,000/year to rent with constant battery failures.",
      frictionTag: "₹35k/yr POS rental",
    },
    urqrVelocity: {
      headline: "Ergonomic 10-Seat Smartphone Cockpit",
      description: "Runs natively on staff personal phones. Color-coded 3-state floor map with haptic water alerts and PIN shift handovers doubles steward table capacity.",
      gainTag: "100% floor visibility",
    },
    simulationPrompt: "Simulate PIN Shift Handover ➔",
    simulationSuccess: "✓ Shift Reconciled with ₹0 Hardware Cost!",
    financialPayoff: "Save ₹35,000+ in POS Terminal Rent",
  },
];

export default function StorySection() {
  const [simulatedCards, setSimulatedCards] = useState<Record<string, boolean>>({});

  const toggleSimulation = (cardId: string) => {
    setSimulatedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <section className="story-section section" id="story-section" aria-labelledby="story-heading">
      <div className="container">
        
        {/* ── SECTION HEADER (BALANCED CENTER ALIGNMENT) ── */}
        <div className="story-section__header">
          <div className="story-section__eyebrow">
            <Sparkles size={13} className="icon-pulse text-emerald" />
            <span>OPERATIONAL TRANSFORMATION · PEAK-HOUR BATTLEGROUNDS</span>
          </div>
          <h2 id="story-heading" className="story-section__title">
            Stop Losing ₹25,000+ Every Weekend. <br />
            <span className="type-serif-em">Four Floor Bottlenecks Solved.</span>
          </h2>
          <p className="story-section__sub">
            Compare the chaotic reality of manual paper tickets and card machine delays against UrQR's
            synchronized floor velocity during peak Sunday lunch rush.
          </p>
        </div>

        {/* ── 4 PEAK-HOUR BATTLEFIELD TRANSFORMATION CARDS (NEW TYPE OF CARDS) ── */}
        <div className="battleground-deck-grid" role="region" aria-label="Floor Battlegrounds Deck">
          {BATTLEGROUNDS.map((bg) => {
            const Icon = bg.icon;
            const isSimulated = !!simulatedCards[bg.id];

            return (
              <div
                key={bg.id}
                className={`battleground-card ${isSimulated ? "battleground-card--simulated" : ""}`}
                style={{
                  "--card-accent": bg.accentColor,
                } as React.CSSProperties}
              >
                {/* Technical Corner Brackets */}
                <span className="bracket-mark bracket-mark--tl" aria-hidden="true">⌜</span>
                <span className="bracket-mark bracket-mark--tr" aria-hidden="true">⌝</span>
                <span className="bracket-mark bracket-mark--bl" aria-hidden="true">⌞</span>
                <span className="bracket-mark bracket-mark--br" aria-hidden="true">⌟</span>

                {/* ── TIER 1: EMBEDDED TECHNICAL CHANNEL BAR (PROPER START & END) ── */}
                <div className="card-terminal-channel">
                  <div className="terminal-channel-start">
                    <span className="terminal-dot" />
                    <span className="terminal-step-text">BATTLEFIELD {bg.stepNumber}</span>
                  </div>
                  <div className="terminal-channel-end">
                    <span className="terminal-metric-chip">{bg.roiMetric}</span>
                    <span className="terminal-dot terminal-dot--end" />
                  </div>
                </div>

                {/* ── TIER 2: IDENTITY & PROBLEM HEADLINE ── */}
                <div className="card-identity-tier">
                  <div className="card-icon-squircle">
                    <Icon size={20} />
                  </div>
                  <div className="card-identity-text">
                    <span className="card-category-label">{bg.battlegroundTag}</span>
                    <h3 className="card-battle-title">{bg.title}</h3>
                  </div>
                </div>

                {/* ── TIER 3: THE BEFORE VS AFTER TRANSFORMATION MATRIX ── */}
                <div className="transformation-split-bed">
                  
                  {/* The Old Way (Paper Chaos) */}
                  <div className="friction-pane">
                    <div className="pane-header pane-header--chaos">
                      <div className="flex items-center gap-1.5">
                        <span className="pane-icon-badge pane-icon-badge--rose">
                          <X size={10} />
                        </span>
                        <strong>TRADITIONAL PAPER CHAOS</strong>
                      </div>
                      <span className="pane-chip pane-chip--rose">{bg.oldChaos.frictionTag}</span>
                    </div>
                    <p className="pane-narrative">{bg.oldChaos.description}</p>
                  </div>

                  {/* The UrQR Way (Velocity OS) */}
                  <div className="velocity-pane">
                    <div className="pane-header pane-header--velocity">
                      <div className="flex items-center gap-1.5">
                        <span className="pane-icon-badge pane-icon-badge--emerald">
                          <Check size={10} />
                        </span>
                        <strong>URQR VELOCITY ENGINE</strong>
                      </div>
                      <span className="pane-chip pane-chip--emerald">{bg.urqrVelocity.gainTag}</span>
                    </div>
                    <p className="pane-narrative">{bg.urqrVelocity.description}</p>
                  </div>

                </div>

                {/* ── TIER 4: INTERACTIVE SIMULATION TRIGGER ── */}
                <div className="card-action-tier">
                  <button
                    type="button"
                    onClick={() => toggleSimulation(bg.id)}
                    className={`btn-simulate-action ${isSimulated ? "btn-simulate-action--active" : ""}`}
                  >
                    {isSimulated ? (
                      <>
                        <span>{bg.simulationSuccess}</span>
                        <RotateCcw size={12} className="ml-1 opacity-75" />
                      </>
                    ) : (
                      <span>{bg.simulationPrompt}</span>
                    )}
                  </button>
                </div>

                {/* ── TIER 5: CONCRETE FINANCIAL PAYOFF FOOTER (PROPER TERMINATION) ── */}
                <div className="card-payoff-footer">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={13} className="text-emerald" />
                    <span className="payoff-text">{bg.financialPayoff}</span>
                  </div>
                  <span className="payoff-badge">VERIFIED ROI</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── 4-COLUMN HARD-NUMBER ROI IMPACT BANNER ── */}
        <div className="floor-performance-section">
          <div className="text-center mb-8">
            <span className="section-label">
              <Zap size={13} className="text-emerald" />
              <span>THE FINANCIAL DIVIDEND</span>
            </span>
            <h3 className="performance-grid-title">Transforming Floor Friction into Direct Profit</h3>
            <p className="performance-grid-sub">
              Calculated on average 40-table restaurant operations running peak Friday to Sunday meal shifts.
            </p>
          </div>

          <div className="performance-cards-grid">
            <div className="perf-card">
              <div className="perf-card__header">
                <div className="perf-icon-circle">
                  <DollarSign size={18} />
                </div>
                <span className="perf-badge">Weekend Boost</span>
              </div>
              <div className="perf-metric-val">+₹24,000</div>
              <h4 className="perf-title">Extra Weekend Turn Revenue</h4>
              <p className="perf-desc">Gained by clearing tables 23 mins faster through instant 15-second table stand UPI.</p>
            </div>

            <div className="perf-card">
              <div className="perf-card__header">
                <div className="perf-icon-circle">
                  <Clock size={18} />
                </div>
                <span className="perf-badge">-23 Mins</span>
              </div>
              <div className="perf-metric-val">15 Seconds</div>
              <h4 className="perf-title">Average Checkout Duration</h4>
              <p className="perf-desc">Eliminates the 20-minute card machine fetch and bill printing bottleneck completely.</p>
            </div>

            <div className="perf-card">
              <div className="perf-card__header">
                <div className="perf-icon-circle">
                  <Flame size={18} />
                </div>
                <span className="perf-badge">100% Protected</span>
              </div>
              <div className="perf-metric-val">100ms Sync</div>
              <h4 className="perf-title">Dum Stockout Shield</h4>
              <p className="perf-desc">Automatically turns empty handi dishes OFF across all tables to stop angry walkouts.</p>
            </div>

            <div className="perf-card">
              <div className="perf-card__header">
                <div className="perf-icon-circle">
                  <ShieldAlert size={18} />
                </div>
                <span className="perf-badge">Zero Hardware</span>
              </div>
              <div className="perf-metric-val">₹0 Cost</div>
              <h4 className="perf-title">Hardware Rental Overhead</h4>
              <p className="perf-desc">Runs natively on existing staff personal phones with secure PIN shift handovers.</p>
            </div>
          </div>

          {/* Direct Floor Walkthrough CTA Row */}
          <div className="floor-cta-row text-center mt-12">
            <Link to="/contact" className="btn btn--primary btn--lg">
              <span>Schedule Floor Walkthrough</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/product" className="btn btn--secondary btn--lg ml-4">
              <span>Explore All Product Engines</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
