import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles, Flame, WifiOff, CreditCard,
  ChefHat, Users, CheckCircle2, XCircle, ArrowRight, Zap,
  ChevronLeft, ChevronRight, Plus, Minus, HelpCircle
} from "lucide-react";
import "./FAQSection.css";

interface Scenario {
  id: string;
  tabLabel: string;
  icon: typeof Flame;
  title: string;
  subtitle: string;
  traditionalProblem: string;
  traditionalPoints: string[];
  urqrSolution: string;
  urqrPoints: string[];
  statBadge: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "rush-hour",
    tabLabel: "Peak 1:30 PM Biryani Rush",
    icon: Flame,
    title: "42 Tables Ordering Simultaneously at Peak Lunch",
    subtitle: "When Donne Biryani Handis open and 80+ guests sit within 10 minutes.",
    traditionalProblem: "Traditional POS System Collapse",
    traditionalPoints: [
      "Waiters run back and forth scribbling KOTs on grease-stained paper",
      "Kitchen cooks lose thermal tickets in wood-fire smoke & scream order numbers",
      "Diners wait 18–25 minutes just to wave down a waiter for the bill"
    ],
    urqrSolution: "The UrQR Velocity Pipeline",
    urqrPoints: [
      "Guests scan Table 04 with camera; KOT fires directly to Wood-fire Handi KDS in 1.2s",
      "Waiter smartphone cockpit chimes and turns Seat 04 Amber with active elapsed timer",
      "Guests scan Table Dynamic UPI and pay in 15 seconds; seat auto-clears immediately"
    ],
    statBadge: "+42% Extra Table Turnover",
  },
  {
    id: "offline-network",
    tabLabel: "Low Signal / Zero 5G",
    icon: WifiOff,
    title: "Indoor Dining Halls with Poor Mobile Connectivity",
    subtitle: "Basements, thick concrete restaurant walls, or crowded dining towers.",
    traditionalProblem: "Heavy App & Clunky Web POS Fails",
    traditionalPoints: [
      "Guests refuse to download 45MB apps from Play Store over weak 3G signals",
      "Cloud-only POS registers stall and freeze when restaurant WiFi hiccups",
      "Customer cards get stuck halfway through payment gateway timeouts"
    ],
    urqrSolution: "Zero-Install Offline Cached Engine",
    urqrPoints: [
      "UrQR is a featherweight Progressive Web App that renders in 1.2s on basic 3G",
      "Local browser caching keeps menus and cart orders responsive even during drops",
      "Stewards' smartphones maintain offline KOT sync directly to local network KDS"
    ],
    statBadge: "1.2s Load Speed on 3G",
  },
  {
    id: "cash-split",
    tabLabel: "Cash & Split Payments",
    icon: CreditCard,
    title: "Split Bills, Corporate Diners & Cash Walk-ins",
    subtitle: "Customers wanting to split payments or pay cash with the steward.",
    traditionalProblem: "Billing Counter Gridlock",
    traditionalPoints: [
      "Cashier handles 6 tables trying to split ₹1,480 across 4 different cards",
      "Stewards carry heavy, clumsy card swipe terminals from table to table",
      "Tables remain occupied 15 minutes after eating just waiting for change"
    ],
    urqrSolution: "Flexible Dual-Mode Table Settle",
    urqrPoints: [
      "1-tap Table Dynamic UPI displays instant split options directly on guest screens",
      "Waiter takes cash at the table and taps 'Mark Cash Settled' on their smartphone in 1s",
      "Automated GST-compliant PDF receipt fires to the guest's WhatsApp or SMS"
    ],
    statBadge: "15s Table Settlement",
  },
  {
    id: "item-86",
    tabLabel: "Item 86 (Sold-Out Handi)",
    icon: ChefHat,
    title: "Donne Biryani Handi Runs Out Mid-Service",
    subtitle: "When a wood-fire dum batch sells out and only 3 portions remain.",
    traditionalProblem: "Customer Frustration & Cancellations",
    traditionalPoints: [
      "Waiters continue taking orders for dishes that the head chef ran out of 10m ago",
      "Stewards have to return to tables, apologize, and ask guests to pick again",
      "Angry customer reviews and disrupted kitchen prep rhythms"
    ],
    urqrSolution: "Instant 100ms 86 Broadcast Toggler",
    urqrPoints: [
      "Chef or captain taps 'Item 86' on their phone or KDS tablet once",
      "Item immediately disables across all 42 table QR menus in real time",
      "Menu displays real-time portion counter: 'Only 3 Portions Left in Current Dum'"
    ],
    statBadge: "100ms Instant Sync",
  },
  {
    id: "waiter-onboarding",
    tabLabel: "Non-Tech Staff & High Turnover",
    icon: Users,
    title: "New Waiters & Elderly Diners Who Don't Use Tech",
    subtitle: "Staff with zero software background, or seniors who prefer manual service.",
    traditionalProblem: "Complex Software Requires Weeks of Training",
    traditionalPoints: [
      "Waiters struggle with complicated multi-level POS touchscreen menus",
      "High restaurant staff turnover means constant expensive re-training costs",
      "Elderly guests feel alienated if forced into rigid digital-only workflows"
    ],
    urqrSolution: "Ergonomic Color-Coded Mobile Grid",
    urqrPoints: [
      "Waiters learn the 10-seat cockpit in 2 minutes: Green (Vacant), Amber (Dining), Rose (Bill)",
      "Stewards can punch manual orders in 2 taps for walk-in or elderly guests",
      "Bilingual scripts (English, Kannada, Hindi) let staff and guests use their language"
    ],
    statBadge: "2-Min Staff Onboarding",
  },
];

interface FAQItem {
  id: string;
  qNum: string;
  category: string;
  tag: string;
  question: string;
  preview: string;
  answer: string;
  statMetric: string;
  points: string[];
  leatherBase: string;
  leatherDark: string;
  leatherLight: string;
  accentColor: string;
  glowColor: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "guest-app",
    qNum: "Q-01",
    category: "GUEST SCAN EXPERIENCE",
    tag: "ZERO APP DOWNLOAD",
    question: "Do guests have to download any application or sign up with phone OTPs?",
    preview: "100% native camera scan with zero install friction. Diners view menus in 1.2 seconds.",
    answer: "Zero app download, zero login walls. Diners simply point their default iPhone or Android camera at the acrylic table QR stand. The lightweight digital menu renders in 1.2 seconds flat on any mobile browser (Safari, Chrome, Samsung Internet) without consuming phone storage or requiring phone number OTPs.",
    statMetric: "1.2s Instant Camera Open",
    points: [
      "Zero Play Store / App Store friction: opens directly in phone browser",
      "No customer data collection or OTP delays before seeing the food",
      "Featherweight 180KB initial bundle vs 45MB clunky aggregator apps"
    ],
    leatherBase: "#B45309",   // Cognac Amber
    leatherDark: "#78350F",
    leatherLight: "#F59E0B",
    accentColor: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.28)",
  },
  {
    id: "offline-resilience",
    qNum: "Q-02",
    category: "OFFLINE INFRASTRUCTURE",
    tag: "LOCAL-FIRST ENGINE",
    question: "How does UrQR operate in basement dining halls with weak 5G or WiFi drops?",
    preview: "Local-first cache architecture buffers cart state & KOTs even when broadband drops.",
    answer: "UrQR is engineered with a local-first service worker architecture. The digital menu, item modifications, and active cart state persist inside the device's local memory cache. If restaurant broadband drops mid-service, stewards' handhelds maintain local LAN KDS synchronization with zero dropped tickets.",
    statMetric: "100% Signal Resilient",
    points: [
      "Local browser caching keeps menus instant on 3G or indoor basement dead zones",
      "Automatic offline KOT queue retries silently until kitchen pass acknowledges",
      "Stewards maintain continuous floor visibility on local restaurant network"
    ],
    leatherBase: "#047857",   // Forest Emerald
    leatherDark: "#064E3B",
    leatherLight: "#10B981",
    accentColor: "#059669",
    glowColor: "rgba(5, 150, 105, 0.28)",
  },
  {
    id: "split-upi",
    qNum: "Q-03",
    category: "DYNAMIC UPI SETTLEMENT",
    tag: "15s TABLE TURNOVER",
    question: "Can guests split bills and settle directly via PhonePe, GPay, or Paytm?",
    preview: "Table-side dynamic UPI QR with instant 1-tap split freeing seats 3x faster.",
    answer: "Yes. Guests scan the dynamic UPI QR code on their table, choose full bill or equal split (2x, 4x), and pay directly from their preferred UPI app with 0% gateway MDR. As soon as the transaction completes, the steward's floor grid turns green (Vacant) in 15 seconds.",
    statMetric: "15s Table Turnover",
    points: [
      "Zero payment queue at the counter: diners pay right from their seat",
      "Direct bank settlement with 0% MDR vs 2.2% card swipe commissions",
      "Automated GST invoice fires instantly to guest WhatsApp or SMS"
    ],
    leatherBase: "#0284C7",   // Ocean Sapphire
    leatherDark: "#0C4A6E",
    leatherLight: "#38BDF8",
    accentColor: "#0284C7",
    glowColor: "rgba(2, 132, 199, 0.28)",
  },
  {
    id: "non-tech-waiters",
    qNum: "Q-04",
    category: "STEWARD WORKFLOW",
    tag: "2-MIN ONBOARDING",
    question: "Can non-tech stewards still punch manual orders for walk-ins or seniors?",
    preview: "3-color ergonomic floor cockpit with 2-tap manual KOT punch in regional languages.",
    answer: "100% yes. The Waiter Mobile Cockpit features an ultra-simple 3-color seat grid: Green (Vacant), Amber (Dining), Rose (Bill Req). For walk-ins or seniors who prefer manual service, waiters punch KOTs in 2 taps in their choice of English, Kannada, or Hindi.",
    statMetric: "2-Min Staff Training",
    points: [
      "Intuitive color-coded seat timers eliminate waiter floor confusion",
      "Bilingual Kannada/English audio chimes alert stewards when food is ready on pass",
      "New waitstaff operate the phone cockpit proficiently on their first shift"
    ],
    leatherBase: "#B91C1C",   // Crimson Oxblood
    leatherDark: "#7F1D1D",
    leatherLight: "#EF4444",
    accentColor: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.28)",
  },
  {
    id: "item-86-sync",
    qNum: "Q-05",
    category: "KITCHEN DUM SYNCHRONIZATION",
    tag: "100ms ITEM 86",
    question: "What happens when a high-demand dish (e.g. Donne Biryani Handi) runs out?",
    preview: "Instant 100ms broadcast toggler disables sold-out items across all 40+ tables.",
    answer: "When a wood-fire dum batch runs low, the head chef or counter captain taps 'Item 86' on the kitchen pass. Within 100 milliseconds, the dish is disabled across every active guest screen in the restaurant, preventing kitchen confusion and guest disappointment.",
    statMetric: "100ms Instant Broadcast",
    points: [
      "Real-time portion counters warn guests: 'Only 3 Portions Left in Current Dum'",
      "Eliminates embarrassing steward apologies after orders are already placed",
      "Automatic kitchen pass pause prevents prep backlog during peak rush"
    ],
    leatherBase: "#7C3AED",   // Royal Amethyst
    leatherDark: "#4C1D95",
    leatherLight: "#A78BFA",
    accentColor: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.28)",
  },
  {
    id: "hardware-launch",
    qNum: "Q-06",
    category: "ZERO-LOCKIN DEPLOYMENT",
    tag: "24-HOUR LAUNCH",
    question: "What hardware is required and how quickly can our restaurant launch live?",
    preview: "Zero proprietary POS hardware. Launch on standard tablets & smartphones in 24 hours.",
    answer: "No bulky, expensive proprietary POS hardware required. UrQR operates on durable acrylic QR table stands, standard 10-inch Android/iOS tablets for kitchen passes, and existing staff smartphones. Our deployment team configures your menu and launches your dining room in 24 to 48 hours.",
    statMetric: "24-Hour Go-Live",
    points: [
      "Runs on standard off-the-shelf devices: Android tablets & smartphones",
      "Zero monthly lease penalties or locked hardware contracts",
      "Complete menu setup, table QR generation, and staff training included"
    ],
    leatherBase: "#78350F",   // Burnished Espresso
    leatherDark: "#451A03",
    leatherLight: "#D97706",
    accentColor: "#B45309",
    glowColor: "rgba(180, 83, 9, 0.28)",
  },
];

export default function FAQSection({ limit }: { limit?: number }) {
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [activeQuestionId, setActiveQuestionId] = useState<string>("guest-app");
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS[activeScenario];
  const questions = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS;

  function handleSelectQuestion(id: string, index: number) {
    if (activeQuestionId === id) {
      // Toggle if already active
      setActiveQuestionId("");
    } else {
      setActiveQuestionId(id);
      setCurrentSlideIndex(index);
    }
  }

  function handleNextSlide() {
    const nextIdx = (currentSlideIndex + 1) % questions.length;
    setCurrentSlideIndex(nextIdx);
    setActiveQuestionId(questions[nextIdx].id);
    scrollToCard(nextIdx);
  }

  function handlePrevSlide() {
    const prevIdx = (currentSlideIndex - 1 + questions.length) % questions.length;
    setCurrentSlideIndex(prevIdx);
    setActiveQuestionId(questions[prevIdx].id);
    scrollToCard(prevIdx);
  }

  function scrollToCard(index: number) {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll<HTMLElement>(".faq-card-unit");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }

  return (
    <section className="faq-section section" id="operational-reality-engine" aria-labelledby="faq-heading">
      <div className="container">
        {/* Header */}
        <div className="faq-section__header text-center">
          <div className="faq-badge">
            <Sparkles size={13} className="text-emerald" />
            <span>FIELD REALITY & INTERACTIVE FAQ MATRIX</span>
          </div>
          <h2 id="faq-heading" className="faq-section__title">
            How UrQR Operates in <span className="type-serif-em">Real Dining Chaos.</span>
          </h2>
          <p className="faq-section__sub">
            Real restaurant floors aren't quiet software demos. See how UrQR handles high-stress 1:30 PM lunch rushes,
            poor indoor 5G signals, cash requests, and sold-out handis.
          </p>
        </div>

        {/* Interactive Scenario Switcher Pills */}
        <div className="faq-scenario-nav" role="tablist">
          {SCENARIOS.map((sc, idx) => {
            const Icon = sc.icon;
            const isActive = activeScenario === idx;
            return (
              <button
                key={sc.id}
                role="tab"
                aria-selected={isActive}
                className={`scenario-pill ${isActive ? "scenario-pill--active" : ""}`}
                onClick={() => setActiveScenario(idx)}
              >
                <Icon size={14} className="scenario-pill-icon" />
                <span>{sc.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Master Comparison Card: Old Way vs UrQR Instant Fix */}
        <div className="faq-comparison-card">
          <div className="comparison-card-top">
            <div>
              <span className="comparison-scenario-tag">OPERATIONAL SCENARIO</span>
              <h3 className="comparison-title">{scenario.title}</h3>
              <p className="comparison-subtitle">{scenario.subtitle}</p>
            </div>
            <div className="comparison-stat-badge">
              <Zap size={14} className="text-amber" />
              <span>{scenario.statBadge}</span>
            </div>
          </div>

          <div className="comparison-grid">
            {/* Traditional Breakdown */}
            <div className="comparison-panel comparison-panel--problem">
              <div className="panel-header panel-header--problem">
                <XCircle size={16} className="text-rose" />
                <h4>{scenario.traditionalProblem}</h4>
              </div>
              <ul className="comparison-list">
                {scenario.traditionalPoints.map((pt, i) => (
                  <li key={i} className="list-item-problem">
                    <span className="bullet-problem">×</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* UrQR Velocity Pipeline */}
            <div className="comparison-panel comparison-panel--solution">
              <div className="panel-header panel-header--solution">
                <CheckCircle2 size={16} className="text-emerald" />
                <h4>{scenario.urqrSolution}</h4>
              </div>
              <ul className="comparison-list">
                {scenario.urqrPoints.map((pt, i) => (
                  <li key={i} className="list-item-solution">
                    <span className="bullet-solution">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* INTERACTIVE QUESTION FLOW SHOWCASE (SADDLE LEATHER HANDLERS) */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="faq-interactive-showcase">
          <div className="faq-showcase-topbar">
            <div className="faq-showcase-title-wrap">
              <div className="faq-mini-pill">
                <HelpCircle size={13} className="text-emerald" />
                <span>COMMON OPERATIONAL QUESTIONS</span>
              </div>
              <h3 className="faq-showcase-heading">
                Tap Any Question Card to Reveal Battle-Tested Answers
              </h3>
              <p className="faq-showcase-sub">
                Each card hangs from an artisan saddle-stitched leather suspension strap with gold brass buckle. Click to open and inspect in-place.
              </p>
            </div>

            {/* Flow Controls (Prev / Next & Counter) */}
            <div className="faq-flow-controls">
              <span className="faq-flow-counter">
                <strong>0{currentSlideIndex + 1}</strong> / 0{questions.length}
              </span>
              <div className="faq-flow-btn-group">
                <button
                  type="button"
                  className="faq-flow-nav-btn"
                  onClick={handlePrevSlide}
                  aria-label="Previous question"
                  title="Previous question"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="faq-flow-nav-btn"
                  onClick={handleNextSlide}
                  aria-label="Next question"
                  title="Next question"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Jump Category Pills */}
          <div className="faq-category-pills-bar">
            {questions.map((q, idx) => {
              const isSelected = activeQuestionId === q.id;
              return (
                <button
                  key={q.id}
                  type="button"
                  className={`faq-cat-pill ${isSelected ? "faq-cat-pill--active" : ""}`}
                  style={{
                    borderColor: isSelected ? q.accentColor : undefined,
                    color: isSelected ? "#FFFFFF" : undefined,
                    background: isSelected ? q.accentColor : undefined,
                  }}
                  onClick={() => {
                    setActiveQuestionId(q.id);
                    setCurrentSlideIndex(idx);
                    scrollToCard(idx);
                  }}
                >
                  <span className="faq-cat-pill-num">{q.qNum}</span>
                  <span>{q.tag}</span>
                </button>
              );
            })}
          </div>

          {/* Flowing Cards Track with Independent Pendulum Float Animations */}
          <div className="faq-cards-track" ref={trackRef}>
            {questions.map((faq, idx) => {
              const isOpen = activeQuestionId === faq.id;
              const swayVariant = (idx % 3) + 1; // 1, 2, 3 for alternating physics float

              return (
                <div
                  key={faq.id}
                  className={`faq-card-unit faq-card-unit--float-${swayVariant} ${isOpen ? "faq-card-unit--open" : ""}`}
                >
                  {/* UNIQUE HANDLER: Saddle-Stitched Leather Strap + Brass Buckle + Clamping Jaws */}
                  <div className="faq-leather-handler" aria-hidden="true">
                    {/* Brass Overhead Mounting Stud */}
                    <div className="faq-handler__stud">
                      <span className="faq-handler__stud-ring" />
                      <span className="faq-handler__stud-screw" />
                    </div>

                    {/* SVG Leather Strap with Saddle Stitching & Brass Buckle */}
                    <svg
                      width="54"
                      height="74"
                      viewBox="0 0 54 74"
                      fill="none"
                      className="faq-handler__svg"
                    >
                      <defs>
                        {/* Metallic Polished Brass Gradient */}
                        <linearGradient id={`brassGrad-${faq.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FEF08A" />
                          <stop offset="35%" stopColor="#F59E0B" />
                          <stop offset="70%" stopColor="#D97706" />
                          <stop offset="100%" stopColor="#78350F" />
                        </linearGradient>

                        {/* Saddle Leather Texture Gradient */}
                        <linearGradient id={`leatherGrad-${faq.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={faq.leatherDark} />
                          <stop offset="25%" stopColor={faq.leatherBase} />
                          <stop offset="75%" stopColor={faq.leatherLight} />
                          <stop offset="100%" stopColor={faq.leatherDark} />
                        </linearGradient>
                      </defs>

                      {/* Top Brass Swivel D-Ring */}
                      <path
                        d="M 20 4 L 34 4 C 37 4, 39 7, 39 10 L 39 14 C 39 17, 37 19, 34 19 L 20 19 C 17 19, 15 17, 15 14 L 15 10 C 15 7, 17 4, 20 4 Z"
                        fill={`url(#brassGrad-${faq.id})`}
                        stroke="#78350F"
                        strokeWidth="0.8"
                      />
                      <rect x="19" y="8" width="16" height="7" rx="3.5" fill="#FAF9F6" />

                      {/* Leather Strap Body with Burnished Edges */}
                      <rect
                        x="18"
                        y="15"
                        width="18"
                        height="44"
                        rx="3.5"
                        fill={`url(#leatherGrad-${faq.id})`}
                        stroke={faq.leatherDark}
                        strokeWidth="0.8"
                      />

                      {/* Left Saddle Stitching Dashes */}
                      <line
                        x1="20.5"
                        y1="17"
                        x2="20.5"
                        y2="57"
                        stroke="#FEF9C3"
                        strokeWidth="1.1"
                        strokeDasharray="2.5 2"
                        strokeOpacity="0.85"
                      />

                      {/* Right Saddle Stitching Dashes */}
                      <line
                        x1="33.5"
                        y1="17"
                        x2="33.5"
                        y2="57"
                        stroke="#FEF9C3"
                        strokeWidth="1.1"
                        strokeDasharray="2.5 2"
                        strokeOpacity="0.85"
                      />

                      {/* Brass Belt Buckle Outer Frame */}
                      <rect
                        x="15"
                        y="28"
                        width="24"
                        height="14"
                        rx="3"
                        fill="none"
                        stroke={`url(#brassGrad-${faq.id})`}
                        strokeWidth="2.4"
                      />
                      {/* Buckle Center Tongue Pin */}
                      <line x1="27" y1="28" x2="27" y2="42" stroke={`url(#brassGrad-${faq.id})`} strokeWidth="2.2" />

                      {/* Punched Strap Eyelet Grommets */}
                      <circle cx="27" cy="22" r="1.8" fill="#451A03" stroke={`url(#brassGrad-${faq.id})`} strokeWidth="0.8" />
                      <circle cx="27" cy="48" r="1.8" fill="#451A03" stroke={`url(#brassGrad-${faq.id})`} strokeWidth="0.8" />

                      {/* Articulated Solid Brass Heavy Clamp Grasping Card Top */}
                      <path
                        d="M 12 58 L 42 58 C 44 58, 45 60, 44 62 L 41 72 C 40.5 73.5, 38.5 74, 36 74 L 18 74 C 15.5 74, 13.5 73.5, 13 72 L 10 62 C 9 60, 10 58, 12 58 Z"
                        fill={`url(#brassGrad-${faq.id})`}
                        stroke="#78350F"
                        strokeWidth="1.2"
                      />
                      <line x1="12" y1="66" x2="42" y2="66" stroke="#78350F" strokeWidth="1.2" />
                      <circle cx="27" cy="63" r="2" fill="#78350F" />
                    </svg>
                  </div>

                  {/* Card Surface with White Theme and Step Accent */}
                  <div
                    className={`faq-interactive-card ${isOpen ? "faq-interactive-card--open" : ""}`}
                    style={{
                      borderTop: `3.5px solid ${faq.accentColor}`,
                      boxShadow: isOpen
                        ? `0 20px 48px -10px ${faq.glowColor}, 0 4px 16px rgba(28, 27, 24, 0.08)`
                        : undefined,
                    }}
                    onClick={() => handleSelectQuestion(faq.id, idx)}
                  >
                    {/* Card Header with Question Number & Category */}
                    <div className="faq-card-head">
                      <div className="faq-card-tag-row">
                        <span
                          className="faq-q-number"
                          style={{
                            background: `${faq.accentColor}15`,
                            color: faq.accentColor,
                            borderColor: `${faq.accentColor}30`,
                          }}
                        >
                          {faq.qNum}
                        </span>
                        <span className="faq-q-category-tag">{faq.category}</span>
                      </div>

                      <button
                        type="button"
                        className={`faq-card-expand-btn ${isOpen ? "open" : ""}`}
                        style={{
                          background: isOpen ? faq.accentColor : undefined,
                          color: isOpen ? "#FFFFFF" : undefined,
                          borderColor: isOpen ? faq.accentColor : undefined,
                        }}
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Collapse answer" : "Expand answer"}
                      >
                        {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                      </button>
                    </div>

                    {/* Question Text */}
                    <h4 className="faq-card-question-text">{faq.question}</h4>

                    {/* Short Summary Preview */}
                    <p className="faq-card-preview-text">{faq.preview}</p>

                    {/* EXPANDABLE IN-PLACE ANSWER DRAWER — OPENS WITHOUT NAVIGATING ANYWHERE */}
                    <div className={`faq-card-answer-drawer ${isOpen ? "is-expanded" : ""}`}>
                      <div className="faq-drawer-inner">
                        <div className="faq-drawer-divider" />

                        {/* Benchmark & Stat Badges */}
                        <div className="faq-drawer-badges">
                          <span
                            className="faq-metric-chip"
                            style={{
                              borderColor: `${faq.accentColor}40`,
                              color: faq.accentColor,
                              background: `${faq.accentColor}0D`,
                            }}
                          >
                            <Zap size={13} />
                            <strong>{faq.statMetric}</strong>
                          </span>
                          <span className="faq-verified-chip">
                            <CheckCircle2 size={13} className="text-emerald" />
                            <span>Verified Blueprint</span>
                          </span>
                        </div>

                        {/* Comprehensive Full Answer Body */}
                        <p className="faq-drawer-full-answer">{faq.answer}</p>

                        {/* Operational Takeaway Bullet Points */}
                        <div className="faq-drawer-bullets">
                          <span className="faq-bullets-label">KEY TAKEAWAYS:</span>
                          <ul>
                            {faq.points.map((pt, pIdx) => (
                              <li key={pIdx}>
                                <span className="faq-bullet-icon" style={{ color: faq.accentColor }}>✓</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom Action Bar */}
                    <div className="faq-card-footer">
                      <span
                        className="faq-card-toggle-label"
                        style={{ color: isOpen ? faq.accentColor : undefined }}
                      >
                        {isOpen ? "Click to Collapse ▲" : "Click to View Answer ▼"}
                      </span>
                      <span
                        className="faq-card-accent-dot"
                        style={{ background: faq.accentColor }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot Pagination for Flowing Cards */}
          <div className="faq-dot-pagination">
            {questions.map((faq, idx) => (
              <button
                key={faq.id}
                type="button"
                className={`faq-dot ${currentSlideIndex === idx ? "faq-dot--active" : ""}`}
                style={{
                  background: currentSlideIndex === idx ? faq.accentColor : undefined,
                  transform: currentSlideIndex === idx ? "scale(1.2)" : undefined,
                }}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setActiveQuestionId(faq.id);
                  scrollToCard(idx);
                }}
                aria-label={`Go to question ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA to simulate on custom outlet */}
        <div className="faq-bottom-cta">
          <div>
            <strong>Have an edge-case scenario at your restaurant?</strong>
            <p>Our engineers will model your exact table count, kitchen pass layout, and rush patterns.</p>
          </div>
          <Link to="/contact" className="btn btn--primary btn--md">
            Schedule Field Consultation <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
