import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, QrCode, Smartphone, ChefHat, BarChart3,
  Sparkles, Clock, Flame, CreditCard,
  Zap, Bell
} from "lucide-react";
import "./OfferingsSection.css";

/* ──────────────────────────────────────────────────────────── */
/* CHUNKY RUBY RED INTERLOCKING CHAIN ENGINE                     */
/* Connects Hole-to-Hole with Exact Physics & Interlocking Links */
/* ──────────────────────────────────────────────────────────── */

interface Point {
  x: number;
  y: number;
}

interface ChainSegment {
  from: Point;
  to: Point;
  id: string;
}

export default function OfferingsSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const g1RightRef = useRef<HTMLDivElement>(null);
  const g2LeftRef = useRef<HTMLDivElement>(null);
  const g2RightRef = useRef<HTMLDivElement>(null);
  const g3LeftRef = useRef<HTMLDivElement>(null);
  const g3RightRef = useRef<HTMLDivElement>(null);
  const g4LeftRef = useRef<HTMLDivElement>(null);

  const [chains, setChains] = useState<ChainSegment[]>([]);

  const isHoveringRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  /* Measure the exact center coordinates of each card's grommet hole */
  const measureChains = useCallback(() => {
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();

    const getCenter = (el: HTMLElement | null): Point | null => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return null;
      return {
        x: r.left + r.width / 2 - canvasRect.left,
        y: r.top + r.height / 2 - canvasRect.top,
      };
    };

    const p1 = getCenter(g1RightRef.current);
    const p2 = getCenter(g2LeftRef.current);
    const p3 = getCenter(g2RightRef.current);
    const p4 = getCenter(g3LeftRef.current);
    const p5 = getCenter(g3RightRef.current);
    const p6 = getCenter(g4LeftRef.current);

    const segments: ChainSegment[] = [];
    if (p1 && p2) segments.push({ from: p1, to: p2, id: "chain-1-2" });
    if (p3 && p4) segments.push({ from: p3, to: p4, id: "chain-2-3" });
    if (p5 && p6) segments.push({ from: p5, to: p6, id: "chain-3-4" });

    if (segments.length > 0) {
      setChains(segments);
    }
  }, []);

  /* 60fps tracking loop when mouse is moving */
  const startTracking = useCallback(() => {
    if (!isHoveringRef.current) {
      isHoveringRef.current = true;
      const tick = () => {
        measureChains();
        if (isHoveringRef.current) {
          rafIdRef.current = requestAnimationFrame(tick);
        }
      };
      rafIdRef.current = requestAnimationFrame(tick);
    }
  }, [measureChains]);

  const stopTracking = useCallback(() => {
    isHoveringRef.current = false;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setTimeout(measureChains, 100);
    setTimeout(measureChains, 220);
  }, [measureChains]);

  useLayoutEffect(() => {
    measureChains();
  }, [measureChains]);

  useEffect(() => {
    const timer1 = setTimeout(measureChains, 40);
    const timer2 = setTimeout(measureChains, 250);

    const handleResize = () => measureChains();
    window.addEventListener("resize", handleResize);

    let ro: ResizeObserver | null = null;
    if (canvasRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => measureChains());
      ro.observe(canvasRef.current);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", handleResize);
      if (ro) ro.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [measureChains]);

  /* ──────────────────────────────────────────────────────────── */
  /* INTERACTIVE CURSOR MOTION: CARDS MOVE LEFT & RIGHT ON HOVER  */
  /* ──────────────────────────────────────────────────────────── */

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    startTracking();
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    // Normalized from -1 (left side) to +1 (right side)
    const normX = Math.max(-1, Math.min(1, (x / width - 0.5) * 2));

    // Dynamic left-and-right slide motion (±16px)
    const shiftX = normX * 16;
    // Matching physical tilt (±2.6deg)
    const tiltDeg = normX * 2.6;

    card.style.setProperty("--sway-x", `${shiftX.toFixed(1)}px`);
    card.style.setProperty("--sway-rotate", `${tiltDeg.toFixed(2)}deg`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--sway-x", "0px");
    card.style.setProperty("--sway-rotate", "0deg");
    setTimeout(measureChains, 120);
  };

  /* Canvas-level hover: ambient left-right motion when moving across the section */
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    startTracking();
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.left;
    const canvasWidth = canvasRect.width;
    const normCanvasX = Math.max(-1, Math.min(1, (mouseX / canvasWidth - 0.5) * 2));

    const cards = canvasRef.current.querySelectorAll<HTMLElement>(".chain-hanging-card");
    cards.forEach((card, idx) => {
      if (!card.matches(":hover")) {
        const stagger = idx % 2 === 0 ? 1 : 0.7;
        const ambientX = normCanvasX * 10 * stagger;
        const ambientTilt = normCanvasX * 1.4 * stagger;
        card.style.setProperty("--sway-x", `${ambientX.toFixed(1)}px`);
        card.style.setProperty("--sway-rotate", `${ambientTilt.toFixed(2)}deg`);
      }
    });
  };

  const handleCanvasMouseLeave = () => {
    if (canvasRef.current) {
      const cards = canvasRef.current.querySelectorAll<HTMLElement>(".chain-hanging-card");
      cards.forEach((card) => {
        card.style.setProperty("--sway-x", "0px");
        card.style.setProperty("--sway-rotate", "0deg");
      });
    }
    stopTracking();
  };

  /* Render 3D Interlocking Ruby Red Chain Links along the vector from Hole A to Hole B */
  const renderChainLinks = (from: Point, to: Point, keyPrefix: string) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 15) return null;

    const baseAngleRad = Math.atan2(dy, dx);
    const baseAngleDeg = (baseAngleRad * 180) / Math.PI;

    let numLinks = Math.max(3, Math.round(dist / 19));
    if (numLinks % 2 === 0) numLinks += 1;

    const links: React.ReactNode[] = [];

    for (let i = 0; i < numLinks; i++) {
      const t = i / (numLinks - 1);
      const sag = Math.sin(t * Math.PI) * 4.5;
      const x = from.x + dx * t;
      const y = from.y + dy * t + sag;

      const isEven = i % 2 === 0;
      const linkRotation = isEven ? baseAngleDeg : baseAngleDeg + (i % 4 === 1 ? 32 : -32);
      const width = isEven ? 32 : 26;
      const height = isEven ? 19 : 13;
      const rx = height / 2;

      links.push(
        <g
          key={`${keyPrefix}-${i}`}
          transform={`translate(${x}, ${y}) rotate(${linkRotation})`}
          style={{ filter: "drop-shadow(0 3px 5px rgba(136, 19, 55, 0.42))" }}
        >
          {/* Outer thick glossy ruby red loop */}
          <rect
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            rx={rx}
            fill="none"
            stroke={isEven ? "url(#rubyChainGradient)" : "url(#tiltedLinkGradient)"}
            strokeWidth={isEven ? 5.5 : 5}
          />
          {/* Top highlight sheen */}
          <path
            d={`M ${-width / 2 + rx} ${-height / 2 + 1.6} Q 0 ${-height / 2 + 1} ${width / 2 - rx} ${-height / 2 + 1.6}`}
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Inner bottom shadow */}
          <path
            d={`M ${-width / 2 + rx} ${height / 2 - 1.6} Q 0 ${height / 2 - 1} ${width / 2 - rx} ${height / 2 - 1.6}`}
            stroke="#881337"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>
      );
    }

    return links;
  };

  return (
    <section className="offerings section" id="screen-2-offerings" aria-labelledby="offerings-heading">
      <div className="container offerings-chain-container">
        
        {/* Section Header */}
        <div className="offerings__header text-center">
          <div className="offerings__badge">
            <Sparkles size={13} className="text-emerald" />
            <span>ZIG-ZAG CONNECTED PIPELINE</span>
          </div>
          <h2 id="offerings-heading" className="offerings__title">
            The 4 Engines Linked in an <span className="type-serif-em">Unbroken Velocity Chain.</span>
          </h2>
          <p className="offerings__sub">
            From the guest camera scan to the wood-fire cooking line to the 15-second UPI settlement —
            every role connects through a real-time synchronized pipeline in a flowing zig-zag loop.
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* THE ZIG-ZAG CHAIN-LINKED CANVAS                               */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div
          className="chain-canvas chain-canvas--zigzag"
          ref={canvasRef}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={handleCanvasMouseLeave}
        >

          {/* SVG OVERLAY: RENDERS PHYSICAL RUBY CHAINS HOLE-TO-HOLE */}
          <svg className="chain-links-canvas-overlay" aria-hidden="true">
            <defs>
              <linearGradient id="rubyChainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="25%" stopColor="#FB7185" />
                <stop offset="60%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>

              <linearGradient id="tiltedLinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="40%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#680D26" />
              </linearGradient>
            </defs>

            {chains.map((seg) => (
              <g key={seg.id} className="chain-link-group">
                {renderChainLinks(seg.from, seg.to, seg.id)}
              </g>
            ))}
          </svg>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* CARD 01: GUEST MOBILE MENU (ZIG-ZAG: ELEVATED)              */}
          {/* ════════════════════════════════════════════════════════════ */}
          <article
            className="chain-hanging-card chain-card--step1 chain-card--zigzag-1"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            {/* Right Grommet Hole (Chain 1-to-2 loops directly through here) */}
            <div className="card-grommet card-grommet--right" ref={g1RightRef} aria-hidden="true">
              <span className="grommet-hole" />
            </div>

            {/* Circular Step Number Badge */}
            <div className="step-circle-badge step-circle-badge--red">
              <span className="step-number-text">1</span>
            </div>

            {/* Card Role Tag & Icon */}
            <div className="chain-card__badge-row">
              <span className="chain-role-tag role-tag--emerald">TABLE DINER</span>
              <div className="chain-icon-bubble">
                <QrCode size={18} />
              </div>
            </div>

            <h3 className="chain-card__title">Guest Mobile Menu</h3>
            <p className="chain-card__subtitle">Instant Camera Scan · Zero App</p>

            {/* Visualization: Mini Acrylic QR Stand & Dish Preview */}
            <div className="chain-card__preview-box">
              <div className="preview-top-strip">
                <div className="preview-dot-status">
                  <span className="dot-pulse-green" />
                  <span>TABLE T-04 · 1.2s SCAN</span>
                </div>
                <span className="preview-lang-pill">ಕನ್ನಡ / EN</span>
              </div>

              <div className="preview-dish-item">
                <div className="dish-details">
                  <span className="dish-dum-tag"><Flame size={10} /> 82°C DUM</span>
                  <strong>Mutton Donne Biryani</strong>
                  <small>Jeera Samba Rice · ₹320</small>
                </div>
                <span className="preview-add-btn">+ ADD</span>
              </div>
            </div>

            {/* Core Required Essentials */}
            <ul className="chain-essentials-list">
              <li>
                <Zap size={13} className="text-emerald" />
                <span><strong>1.2s Load:</strong> Opens on any phone camera without app install or login.</span>
              </li>
              <li>
                <Flame size={13} className="text-amber" />
                <span><strong>Live Dum Count:</strong> Real-time portions remaining for wood-fire handis.</span>
              </li>
            </ul>

            {/* Handoff Connection to Next Node */}
            <div className="chain-handoff-pill">
              <span className="handoff-pulse-dot" />
              <span>Fires KOT to Waiter Cockpit in 0ms ➔</span>
            </div>

            {/* Card Footer CTA */}
            <div className="chain-card__action-row">
              <Link to="/product#guest-menu" className="chain-engine-link">
                <span>Explore Guest Menu</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* CARD 02: WAITER MOBILE COCKPIT (ZIG-ZAG: LOWERED)           */}
          {/* ════════════════════════════════════════════════════════════ */}
          <article
            className="chain-hanging-card chain-card--step2 chain-card--zigzag-2"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            {/* Left Grommet Hole (Chain 1-to-2 loops directly through here) */}
            <div className="card-grommet card-grommet--left" ref={g2LeftRef} aria-hidden="true">
              <span className="grommet-hole" />
            </div>

            {/* Right Grommet Hole (Chain 2-to-3 loops directly through here) */}
            <div className="card-grommet card-grommet--right" ref={g2RightRef} aria-hidden="true">
              <span className="grommet-hole" />
            </div>

            {/* Circular Step Number Badge */}
            <div className="step-circle-badge step-circle-badge--red">
              <span className="step-number-text">2</span>
            </div>

            {/* Card Role Tag & Icon */}
            <div className="chain-card__badge-row">
              <span className="chain-role-tag role-tag--amber">FLOOR STEWARD</span>
              <div className="chain-icon-bubble">
                <Smartphone size={18} />
              </div>
            </div>

            <h3 className="chain-card__title">Waiter Mobile Cockpit</h3>
            <p className="chain-card__subtitle">10-Seat Floor Grid on Staff Phones</p>

            {/* Visualization: Mini 4-Seat Status Matrix */}
            <div className="chain-card__preview-box">
              <div className="preview-top-strip">
                <span className="preview-zone-tag">ZONE 1 · 4 SEATS</span>
                <span className="preview-sub-legend">● Vacant ● Dining ● Bill</span>
              </div>

              <div className="preview-mini-seats">
                <div className="seat-cell seat-cell--vacant">
                  <strong>T-01</strong>
                  <span>Vacant</span>
                </div>
                <div className="seat-cell seat-cell--dining">
                  <strong>T-04</strong>
                  <span>Dining 08m</span>
                </div>
                <div className="seat-cell seat-cell--bill">
                  <strong>T-02</strong>
                  <span>Bill Req</span>
                </div>
                <div className="seat-cell seat-cell--dining">
                  <strong>T-06</strong>
                  <span>Dining 16m</span>
                </div>
              </div>

              <div className="preview-alert-row">
                <Bell size={11} className="text-amber" />
                <span>Seat 02 summoned: <strong>Split UPI Bill</strong></span>
              </div>
            </div>

            {/* Core Required Essentials */}
            <ul className="chain-essentials-list">
              <li>
                <Zap size={13} className="text-amber" />
                <span><strong>Zero Hardware Cost:</strong> Runs on staff personal phone with PIN handover.</span>
              </li>
              <li>
                <Bell size={13} className="text-rose" />
                <span><strong>Haptic Chime:</strong> Instant vibration alerts for water, bill, or service calls.</span>
              </li>
            </ul>

            {/* Handoff Connection to Next Node */}
            <div className="chain-handoff-pill">
              <span className="handoff-pulse-dot" />
              <span>Routes orders to Station KDS ➔</span>
            </div>

            {/* Card Footer CTA */}
            <div className="chain-card__action-row">
              <Link to="/product#waiter-cockpit" className="chain-engine-link">
                <span>Explore Waiter Cockpit</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* CARD 03: STATION KITCHEN KDS (ZIG-ZAG: ELEVATED)            */}
          {/* ════════════════════════════════════════════════════════════ */}
          <article
            className="chain-hanging-card chain-card--step3 chain-card--zigzag-3"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            {/* Left Grommet Hole (Chain 2-to-3 loops directly through here) */}
            <div className="card-grommet card-grommet--left" ref={g3LeftRef} aria-hidden="true">
              <span className="grommet-hole" />
            </div>

            {/* Right Grommet Hole (Chain 3-to-4 loops directly through here) */}
            <div className="card-grommet card-grommet--right" ref={g3RightRef} aria-hidden="true">
              <span className="grommet-hole" />
            </div>

            {/* Circular Step Number Badge */}
            <div className="step-circle-badge step-circle-badge--red">
              <span className="step-number-text">3</span>
            </div>

            {/* Card Role Tag & Icon */}
            <div className="chain-card__badge-row">
              <span className="chain-role-tag role-tag--cyan">KITCHEN EXPEDITER</span>
              <div className="chain-icon-bubble">
                <ChefHat size={18} />
              </div>
            </div>

            <h3 className="chain-card__title">Station Kitchen KDS</h3>
            <p className="chain-card__subtitle">Chronological Pass for Handi Lines</p>

            {/* Visualization: Mini KDS Ticket with Live Timer */}
            <div className="chain-card__preview-box">
              <div className="preview-top-strip">
                <span className="kds-station-pill">HANDI DUM PASS</span>
                <span className="kds-timer-text"><Clock size={11} /> 04:12</span>
              </div>

              <div className="kds-ticket-preview-lines">
                <div className="kds-line">
                  <span className="kds-count">2×</span>
                  <strong>Mutton Donne Biryani</strong>
                  <small>(Extra Sherva)</small>
                </div>
                <div className="kds-line">
                  <span className="kds-count">1×</span>
                  <strong>Chicken Sukka Fry</strong>
                  <small>(Spicy)</small>
                </div>
              </div>

              <div className="kds-bump-btn-preview">
                <span>✓ 1-Tap Bump to Pass (Alerts Steward)</span>
              </div>
            </div>

            {/* Core Required Essentials */}
            <ul className="chain-essentials-list">
              <li>
                <Clock size={13} className="text-cyan" />
                <span><strong>FIFO Station Queue:</strong> Auto-splits biryani to handi & starters to tandoor.</span>
              </li>
              <li>
                <Zap size={13} className="text-emerald" />
                <span><strong>-6 Min Prep Saved:</strong> Eliminates lost greasy thermal chits & kitchen stress.</span>
              </li>
            </ul>

            {/* Handoff Connection to Next Node */}
            <div className="chain-handoff-pill">
              <span className="handoff-pulse-dot" />
              <span>Signals steward for pickup & readies bill ➔</span>
            </div>

            {/* Card Footer CTA */}
            <div className="chain-card__action-row">
              <Link to="/product#kitchen-kds" className="chain-engine-link">
                <span>Explore Kitchen KDS</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* CARD 04: 15S TABLE UPI & TELEMETRY (ZIG-ZAG: LOWERED)       */}
          {/* ════════════════════════════════════════════════════════════ */}
          <article
            className="chain-hanging-card chain-card--step4 chain-card--zigzag-4"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            {/* Left Grommet Hole (Chain 3-to-4 loops directly through here) */}
            <div className="card-grommet card-grommet--left" ref={g4LeftRef} aria-hidden="true">
              <span className="grommet-hole" />
            </div>

            {/* Circular Step Number Badge */}
            <div className="step-circle-badge step-circle-badge--red">
              <span className="step-number-text">4</span>
            </div>

            {/* Card Role Tag & Icon */}
            <div className="chain-card__badge-row">
              <span className="chain-role-tag role-tag--purple">SETTLE & CONTROL</span>
              <div className="chain-icon-bubble">
                <BarChart3 size={18} />
              </div>
            </div>

            <h3 className="chain-card__title">15s Table UPI & 86 Sync</h3>
            <p className="chain-card__subtitle">Instant Checkout & Real-Time Stockout</p>

            {/* Visualization: Table UPI QR & RevPASH Telemetry */}
            <div className="chain-card__preview-box">
              <div className="preview-top-strip">
                <span className="upi-verified-badge">DYNAMIC TABLE QR</span>
                <span className="upi-amount-pill">₹588 TOTAL</span>
              </div>

              <div className="preview-upi-apps">
                <span>PhonePe</span>
                <span>GPay</span>
                <span>Paytm</span>
                <span>CRED</span>
              </div>

              <div className="preview-telemetry-strip">
                <div className="tele-item">
                  <span>RevPASH</span>
                  <strong>₹482/hr</strong>
                </div>
                <div className="tele-item">
                  <span>Turnover</span>
                  <strong>31m</strong>
                </div>
                <div className="tele-item">
                  <span>86 Sync</span>
                  <strong className="text-emerald">100ms</strong>
                </div>
              </div>
            </div>

            {/* Core Required Essentials */}
            <ul className="chain-essentials-list">
              <li>
                <CreditCard size={13} className="text-purple" />
                <span><strong>15s Table Turn:</strong> Guests pay on table QR without waiting for cashier.</span>
              </li>
              <li>
                <Zap size={13} className="text-emerald" />
                <span><strong>Instant 86 Sync:</strong> Tapping sold-out turns dishes off across tables in 100ms.</span>
              </li>
            </ul>

            {/* Handoff Connection to Next Node (Closes the Loop) */}
            <div className="chain-handoff-pill">
              <span className="handoff-pulse-dot" />
              <span>Auto-flips seat to Vacant (Emerald) for next diner ↺</span>
            </div>

            {/* Card Footer CTA */}
            <div className="chain-card__action-row">
              <Link to="/product#pos-telemetry" className="chain-engine-link">
                <span>Explore Telemetry</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

        </div>

        {/* ── Summary Guarantee Note ── */}
        <div className="chain-guarantee-note">
          <span className="chain-guarantee-icon">🔗</span>
          <p>
            <strong>The UrQR Zig-Zag Velocity Loop:</strong> Every camera scan, dish modification,
            kitchen ticket bump, and UPI payment transmits seamlessly with zero lost slips and zero floor lag.
          </p>
        </div>

      </div>
    </section>
  );
}
