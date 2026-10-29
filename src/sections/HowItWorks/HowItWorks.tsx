import { useState } from "react";
import { Link } from "react-router-dom";
import {
  QrCode,
  Flame,
  ChefHat,
  Volume2,
  Clock,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCw,
  Zap,
  ShieldCheck,
  Radio,
  Grid3X3,
  Smartphone,
  CreditCard,
  UserCheck,
  Wifi,
  Battery,
} from "lucide-react";
import "./HowItWorks.css";

type StationKey = "guest" | "cockpit" | "kitchen" | "payment" | "all";

export default function HowItWorks() {
  // Active selected role in the cockpit switcher
  const [activeStation, setActiveStation] = useState<StationKey>("cockpit"); // Default to Cockpit role

  // Synchronized state across all 4 operational stations
  const [biryaniQty, setBiryaniQty] = useState<number>(2);
  const [pepperFryQty, setPepperFryQty] = useState<number>(1);
  const [kotPunched, setKotPunched] = useState<boolean>(true);
  const [stewardAck, setStewardAck] = useState<boolean>(false);
  const [kdsBumped, setKdsBumped] = useState<boolean>(false);
  const [upiPaid, setUpiPaid] = useState<boolean>(false);

  // Computed values for Table 12
  const biryaniSubtotal = biryaniQty * 260;
  const pepperFrySubtotal = pepperFryQty * 220;
  const foodTotal = biryaniSubtotal + pepperFrySubtotal;
  const totalItemsCount = biryaniQty + pepperFryQty;
  const tax = Math.round(foodTotal * 0.05);
  const grandTotal = foodTotal + tax;

  return (
    <section className="hiw section" id="how-it-works" aria-labelledby="hiw-heading">
      {/* Background Restaurant Photo with Ambient Lighting Gradient Overlay */}
      <div className="hiw__bg-wrap" aria-hidden="true">
        <img
          src="/images/restaurant-bg.jpg"
          alt="Restaurant Dining Atmosphere"
          className="hiw__bg-img"
          loading="lazy"
        />
        <div className="hiw__bg-overlay" />
      </div>

      <div className="container hiw__container">
        {/* Section Header */}
        <div className="hiw__header">
          <div className="section-label">
            <Sparkles size={15} className="icon-pulse text-emerald" />
            Operational Choreography
          </div>
          <h2 id="hiw-heading" className="hiw__title">
            From table QR scan to kitchen pass in 4 fluid steps.
          </h2>
          <p className="hiw__subtitle">
            Experience how a live order for Table 12 flows synchronously across the guest phone, waiter cockpit, kitchen KDS, and table UPI checkout.
          </p>
        </div>

        {/* ── INTERACTIVE ROLE & COCKPIT SWITCHER ── */}
        <div className="hiw-cockpit-switcher" role="tablist" aria-label="Operational Stage Switcher">
          <button
            type="button"
            role="tab"
            aria-selected={activeStation === "guest"}
            className={`switcher-tab ${activeStation === "guest" ? "switcher-tab--active" : ""}`}
            onClick={() => setActiveStation("guest")}
          >
            <Smartphone size={18} />
            <div className="switcher-tab__label">
              <span className="tab-step-no">STEP 01</span>
              <span className="tab-role-name">Guest Mobile</span>
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeStation === "cockpit"}
            className={`switcher-tab switcher-tab--cockpit ${activeStation === "cockpit" ? "switcher-tab--active" : ""}`}
            onClick={() => setActiveStation("cockpit")}
          >
            <UserCheck size={18} />
            <div className="switcher-tab__label">
              <span className="tab-step-no">STEP 02</span>
              <span className="tab-role-name">Waiter Cockpit</span>
            </div>
            <span className="live-pulse-badge">Live Radar</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeStation === "kitchen"}
            className={`switcher-tab switcher-tab--kitchen ${activeStation === "kitchen" ? "switcher-tab--active" : ""}`}
            onClick={() => setActiveStation("kitchen")}
          >
            <ChefHat size={18} />
            <div className="switcher-tab__label">
              <span className="tab-step-no">STEP 03</span>
              <span className="tab-role-name">Kitchen KDS</span>
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeStation === "payment"}
            className={`switcher-tab switcher-tab--payment ${activeStation === "payment" ? "switcher-tab--active" : ""}`}
            onClick={() => setActiveStation("payment")}
          >
            <CreditCard size={18} />
            <div className="switcher-tab__label">
              <span className="tab-step-no">STEP 04</span>
              <span className="tab-role-name">Tabletop UPI</span>
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeStation === "all"}
            className={`switcher-tab switcher-tab--all ${activeStation === "all" ? "switcher-tab--active" : ""}`}
            onClick={() => setActiveStation("all")}
          >
            <Grid3X3 size={18} />
            <div className="switcher-tab__label">
              <span className="tab-step-no">OVERVIEW</span>
              <span className="tab-role-name">All 4 Stations</span>
            </div>
          </button>
        </div>

        {/* ── DYNAMIC FOCUSED ROLE STAGE (FOR MOBILE, TABLET & DESKTOP) ── */}
        {activeStation !== "all" && (
          <div className="focused-station-stage">
            {/* ─────────────────────────────────────────────────────────── */}
            {/* ROLE 01: GUEST SMARTPHONE EXPERIENCE                         */}
            {/* ─────────────────────────────────────────────────────────── */}
            {activeStation === "guest" && (
              <div className="station-view-layout station-view-layout--guest">
                {/* Left/Main: High-Def Device Viewport */}
                <div className="station-device-container">
                  <div className="device-screen device-screen--mobile">
                    {/* Notch & Status Bar */}
                    <div className="device-screen__notch">
                      <div className="notch-left">
                        <span className="notch-time">9:41</span>
                        <span className="notch-table-badge">Table #12</span>
                      </div>
                      <div className="notch-right">
                        <span className="notch-lang-badge">ಕನ್ನಡ | <strong>ENG</strong></span>
                        <Wifi size={13} className="notch-icon" />
                        <Battery size={14} className="notch-icon" />
                      </div>
                    </div>

                    {/* Mobile Screen Body */}
                    <div className="device-screen__body">
                      {/* Restaurant Brand Strip */}
                      <div className="mobile-brand-strip">
                        <div className="brand-dot" />
                        <span className="brand-name">Thoogudeepa Military Hotel</span>
                        <span className="brand-rating">★ 4.8 (2.4k)</span>
                      </div>

                      {/* Live Featured Dish Card */}
                      <div className="mobile-dish-card">
                        <div className="mobile-dish-img-wrap">
                          <img
                            src="/images/food-spread.jpg"
                            alt="Nati Koli Donne Biryani"
                            className="mobile-dish-img"
                          />
                          <span className="mobile-handi-alert">🔥 6 Handis Left</span>
                        </div>

                        <div className="mobile-dish-details">
                          <div className="mobile-dish-header">
                            <span className="diet-dot diet-dot--nonveg" />
                            <span className="mobile-dish-title">Nati Koli Donne Biryani</span>
                          </div>
                          <div className="mobile-dish-sub">ನಾಟಿ ಕೋಳಿ ಬಿರಿಯಾನಿ (Steamed in Donne)</div>
                          <div className="mobile-dish-price-stepper">
                            <span className="mobile-dish-price">₹260</span>
                            <div className="mobile-stepper">
                              <button
                                type="button"
                                className="stepper-btn"
                                onClick={() => setBiryaniQty((q) => Math.max(1, q - 1))}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="stepper-count">{biryaniQty}</span>
                              <button
                                type="button"
                                className="stepper-btn"
                                onClick={() => setBiryaniQty((q) => q + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add-on Dish Item with Interactive Stepper */}
                      <div className="mobile-dish-mini-card">
                        <div className="dish-mini-left">
                          <span className="diet-dot diet-dot--nonveg" />
                          <div className="dish-mini-info">
                            <span className="dish-mini-title">Chicken Pepper Fry</span>
                            <span className="dish-mini-sub">Tossed with black pepper &amp; curry leaves</span>
                          </div>
                        </div>
                        <div className="dish-mini-right">
                          <span className="dish-mini-price">₹220</span>
                          {pepperFryQty > 0 ? (
                            <div className="mobile-stepper mobile-stepper--mini">
                              <button
                                type="button"
                                className="stepper-btn"
                                onClick={() => setPepperFryQty((q) => Math.max(0, q - 1))}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="stepper-count">{pepperFryQty}</span>
                              <button
                                type="button"
                                className="stepper-btn"
                                onClick={() => setPepperFryQty((q) => q + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="mini-add-btn"
                              onClick={() => setPepperFryQty(1)}
                            >
                              + ADD
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Floating Cart Tray */}
                      <div className="mobile-cart-tray">
                        <div className="cart-tray-left">
                          <span className="cart-tray-items">{totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"} in Table Cart</span>
                          <span className="cart-tray-total">Total: ₹{foodTotal}</span>
                        </div>
                        <button
                          type="button"
                          className={`cart-tray-punch ${kotPunched ? "cart-tray-punch--fired" : ""}`}
                          onClick={() => setKotPunched(!kotPunched)}
                        >
                          <Zap size={14} />
                          <span>{kotPunched ? "KOT Fired (✓)" : "Fire Order"}</span>
                        </button>
                      </div>

                      {/* Live Telemetry Flow Indicator */}
                      <div className="device-screen__flow-indicator">
                        <span className="flow-pulse-dot" />
                        <span>➔ Fired order pings Step 2 Steward Cockpit in &lt; 40ms</span>
                      </div>
                    </div>

                    {/* Hardware Footer */}
                    <div className="device-screen__hardware-footer">
                      <Check size={14} className="text-emerald flex-shrink-0" />
                      <span>iOS &amp; Android PWA • 0 MB Download Required • Instant Camera Ready</span>
                    </div>
                  </div>
                </div>

                {/* Right: Operational Breakdown & Navigation */}
                <div className="station-intel-panel">
                  <div className="station-role-badge">STEP 01 • TABLETOP DISCOVERY</div>
                  <h3 className="station-intel-title">Instant Guest Scan &amp; Order Placement</h3>
                  <p className="station-intel-desc">
                    When guests arrive at Table 12, they point their smartphone camera at the acrylic QR stand. No app download, no password logins, and zero waiting for stewards during peak weekend rush hours.
                  </p>

                  <div className="station-metrics-grid">
                    <div className="metric-box">
                      <span className="metric-val">1.2s</span>
                      <span className="metric-lbl">Menu Load Speed</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">0 MB</span>
                      <span className="metric-lbl">App Download Required</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">100%</span>
                      <span className="metric-lbl">Handi Stock Shield</span>
                    </div>
                  </div>

                  <div className="station-action-bar">
                    <button
                      type="button"
                      className="btn btn--primary btn--md"
                      onClick={() => setActiveStation("cockpit")}
                    >
                      Advance to Waiter Cockpit <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary btn--md"
                      onClick={() => setActiveStation("all")}
                    >
                      View All 4 Stations Flow
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────── */}
            {/* ROLE 02: HIGH-DEF WAITER / STEWARD FLOOR COCKPIT             */}
            {/* ─────────────────────────────────────────────────────────── */}
            {activeStation === "cockpit" && (
              <div className="station-view-layout station-view-layout--cockpit">
                {/* Left/Main: Full Floor Cockpit Terminal Viewport */}
                <div className="station-device-container">
                  <div className="device-screen device-screen--cockpit-full">
                    {/* Steward Header Bar */}
                    <div className="device-screen__notch device-screen__notch--cockpit">
                      <div className="cockpit-status-online">
                        <Radio size={14} className="cockpit-radio-ping" />
                        <span>LIVE FLOOR COCKPIT</span>
                      </div>
                      <span className="cockpit-steward-name">Steward: Manjunath (#04)</span>
                      <span className="cockpit-zone-tag">Section B • 10 Tables</span>
                    </div>

                    {/* Cockpit Screen Body */}
                    <div className="device-screen__body">
                      {/* 10-Table Live Floor Radar Grid */}
                      <div className="cockpit-radar-box">
                        <div className="cockpit-radar-header">
                          <span className="radar-title">10-TABLE FLOOR RADAR MATRIX</span>
                          <span className="radar-legend">
                            <span className="legend-dot legend-dot--green" /> Vacant
                            <span className="legend-dot legend-dot--amber" /> Dining
                            <span className="legend-dot legend-dot--rose" /> Bill
                          </span>
                        </div>

                        <div className="cockpit-radar-grid-full">
                          <div className="cockpit-tile cockpit-tile--vacant">
                            <span className="tbl-id">T-01</span>
                            <span className="tbl-pax">2 Pax</span>
                            <span className="tbl-status">Vacant</span>
                          </div>
                          <div className="cockpit-tile cockpit-tile--dining">
                            <span className="tbl-id">T-02</span>
                            <span className="tbl-pax">4 Pax</span>
                            <span className="tbl-status">14m</span>
                          </div>
                          <div className="cockpit-tile cockpit-tile--vacant">
                            <span className="tbl-id">T-04</span>
                            <span className="tbl-pax">2 Pax</span>
                            <span className="tbl-status">Vacant</span>
                          </div>
                          <div className="cockpit-tile cockpit-tile--dining">
                            <span className="tbl-id">T-06</span>
                            <span className="tbl-pax">6 Pax</span>
                            <span className="tbl-status">22m</span>
                          </div>
                          <div className="cockpit-tile cockpit-tile--vacant">
                            <span className="tbl-id">T-08</span>
                            <span className="tbl-pax">4 Pax</span>
                            <span className="tbl-status">Vacant</span>
                          </div>
                          <div className="cockpit-tile cockpit-tile--dining">
                            <span className="tbl-id">T-10</span>
                            <span className="tbl-pax">4 Pax</span>
                            <span className="tbl-status">31m</span>
                          </div>

                          {/* ── TABLE 12: ACTIVE HOT TARGET ── */}
                          <div className={`cockpit-tile cockpit-tile--active-target ${stewardAck ? "cockpit-tile--target-ack" : ""}`}>
                            <span className="tbl-id">T-12 🔥</span>
                            <span className="tbl-pax">4 Pax</span>
                            <span className="tbl-status">{stewardAck ? "Ack'd ✓" : "KOT Fired!"}</span>
                          </div>

                          <div className="cockpit-tile cockpit-tile--dining">
                            <span className="tbl-id">T-14</span>
                            <span className="tbl-pax">2 Pax</span>
                            <span className="tbl-status">08m</span>
                          </div>
                          <div className="cockpit-tile cockpit-tile--billing">
                            <span className="tbl-id">T-16</span>
                            <span className="tbl-pax">4 Pax</span>
                            <span className="tbl-status">Bill Req</span>
                          </div>
                          <div className="cockpit-tile cockpit-tile--vacant">
                            <span className="tbl-id">T-18</span>
                            <span className="tbl-pax">2 Pax</span>
                            <span className="tbl-status">Vacant</span>
                          </div>
                        </div>
                      </div>

                      {/* Focused Table 12 Order Stream & Chimes */}
                      <div className="cockpit-ticket-feed-full">
                        <div className="feed-header">
                          <span className="feed-table-badge">Table 12 Stream • 4 Guests</span>
                          <span className="feed-time-badge">⚡ KOT Fired 12s ago via QR</span>
                        </div>
                        <div className="feed-order-summary">
                          <span className="feed-dish-qty">{biryaniQty}x Nati Koli Donne Biryani (₹{biryaniSubtotal})</span>
                          {pepperFryQty > 0 && <span className="feed-dish-add">+ {pepperFryQty}x Chicken Pepper Fry (₹{pepperFrySubtotal})</span>}
                        </div>
                        <div className="feed-guest-note">
                          Note: <em>&ldquo;Medium spicy, extra salna on the side&rdquo;</em>
                        </div>

                        {/* Quick Service Chimes */}
                        <div className="steward-quick-chimes-row">
                          <span className="chime-pill">💧 Water Refill Requested</span>
                          <span className="chime-pill">🍴 Extra Plates (4)</span>
                        </div>
                      </div>

                      {/* Steward Interactive Acknowledge Action */}
                      <button
                        type="button"
                        className={`cockpit-action-btn ${stewardAck ? "cockpit-action-btn--acked" : ""}`}
                        onClick={() => setStewardAck(!stewardAck)}
                      >
                        {stewardAck ? (
                          <>
                            <Check size={16} /> Synced to Kitchen Pass &amp; Floor Map (Table 12 Active)
                          </>
                        ) : (
                          <>
                            <Zap size={16} /> Tap to Acknowledge Table 12 KOT &amp; Sync KDS
                          </>
                        )}
                      </button>

                      {/* Connection Flow Indicator */}
                      <div className="device-screen__flow-indicator">
                        <span className="flow-pulse-dot flow-pulse-dot--cyan" />
                        <span>➔ Automatically feeds Step 3 (Kitchen KDS Handi Pass) in real-time</span>
                      </div>
                    </div>

                    {/* Hardware Footer */}
                    <div className="device-screen__hardware-footer">
                      <ShieldCheck size={14} className="text-emerald flex-shrink-0" />
                      <span>Haptic Vibration Alerts • &lt; 24ms WebSockets Sync • Zero Proprietary Hardware</span>
                    </div>
                  </div>
                </div>

                {/* Right: Operational Breakdown & Navigation */}
                <div className="station-intel-panel">
                  <div className="station-role-badge station-role-badge--cockpit">STEP 02 • FLOOR COORDINATION ENGINE</div>
                  <h3 className="station-intel-title">Waiter Mobile Floor Cockpit</h3>
                  <p className="station-intel-desc">
                    Floor captains and stewards use their own phones to manage the entire dining room. No expensive handheld terminals, no lost tickets, and no confused order runners during peak dining rushes.
                  </p>

                  <div className="station-metrics-grid">
                    <div className="metric-box">
                      <span className="metric-val">2x</span>
                      <span className="metric-lbl">Server Table Capacity</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">&lt; 24ms</span>
                      <span className="metric-lbl">Floor Sync Latency</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">0.0%</span>
                      <span className="metric-lbl">Dropped Order Rate</span>
                    </div>
                  </div>

                  <div className="station-action-bar">
                    <button
                      type="button"
                      className="btn btn--primary btn--md"
                      onClick={() => setActiveStation("kitchen")}
                    >
                      Advance to Kitchen KDS <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary btn--md"
                      onClick={() => setActiveStation("guest")}
                    >
                      <ArrowLeft size={16} /> Back to Guest Menu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────── */}
            {/* ROLE 03: KITCHEN STATION KDS EXPEDITER PASS                 */}
            {/* ─────────────────────────────────────────────────────────── */}
            {activeStation === "kitchen" && (
              <div className="station-view-layout station-view-layout--kitchen">
                {/* Left/Main: KDS Tablet Viewport */}
                <div className="station-device-container">
                  <div className="device-screen device-screen--kds">
                    {/* KDS Header Bar */}
                    <div className="device-screen__notch device-screen__notch--kds">
                      <div className="kds-station-title">
                        <ChefHat size={16} />
                        <span>STATION 02 • BIRYANI &amp; HOT PASS</span>
                      </div>
                      <div className="kds-cook-timer">
                        <Clock size={14} />
                        <span>04:15 / 06:00 (On Time)</span>
                      </div>
                    </div>

                    {/* Screen Body */}
                    <div className="device-screen__body">
                      {/* KOT Ticket Container */}
                      <div className="kds-ticket-container">
                        <div className="kds-ticket-meta">
                          <span className="kds-order-no">KOT #204</span>
                          <span className="kds-table-no">TABLE 12</span>
                          <span className="kds-pax-no">4 Guests</span>
                        </div>

                        <div className="kds-items-list">
                          {biryaniQty > 0 && (
                            <div className="kds-item-entry">
                              <span className="kds-item-qty">{biryaniQty}x</span>
                              <div className="kds-item-text">
                                <span className="kds-item-name">Nati Koli Donne Biryani</span>
                                <span className="kds-item-subnote">Handi #4 • Wood-Fire Dum • Hot Salna</span>
                              </div>
                            </div>
                          )}

                          {pepperFryQty > 0 && (
                            <div className="kds-item-entry">
                              <span className="kds-item-qty">{pepperFryQty}x</span>
                              <div className="kds-item-text">
                                <span className="kds-item-name">Chicken Pepper Fry</span>
                                <span className="kds-item-subnote">Wok Station 1 • Crispy Curry Leaves</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Telemetry Row */}
                      <div className="kds-telemetry-badge-row">
                        <div className="kds-temp-pill">
                          <Flame size={14} />
                          <span>82°C Sealed Handi</span>
                        </div>
                        <span className="kds-queue-info">Station Queue: 2 Orders Ahead</span>
                      </div>

                      {/* Bump Action Button */}
                      <button
                        type="button"
                        className={`kds-action-bump-btn ${kdsBumped ? "kds-action-bump-btn--done" : ""}`}
                        onClick={() => setKdsBumped(!kdsBumped)}
                      >
                        {kdsBumped ? (
                          <>
                            <Check size={16} /> BUMPED TO TABLE RUNNER PASS (CHIMED)
                          </>
                        ) : (
                          <>
                            <Flame size={16} /> 1-Tap Bump to Table Runner Pass
                          </>
                        )}
                      </button>

                      {/* Connection Flow Indicator */}
                      <div className="device-screen__flow-indicator">
                        <span className="flow-pulse-dot flow-pulse-dot--amber" />
                        <span>➔ Expedited to Table 12 runner for immediate dining service</span>
                      </div>
                    </div>

                    {/* Hardware Footer */}
                    <div className="device-screen__hardware-footer">
                      <Check size={14} className="text-emerald flex-shrink-0" />
                      <span>Rugged Touch Interface • Chronological FIFO Order Queue</span>
                    </div>
                  </div>
                </div>

                {/* Right: Operational Breakdown & Navigation */}
                <div className="station-intel-panel">
                  <div className="station-role-badge station-role-badge--kds">STEP 03 • KITCHEN DISPATCH</div>
                  <h3 className="station-intel-title">Direct Station KDS &amp; Cooking Timers</h3>
                  <p className="station-intel-desc">
                    Orders auto-split and route directly to cook stations. Eliminates noisy shouting in the pass, lost thermal paper receipts, and food cooked out of chronological order.
                  </p>

                  <div className="station-metrics-grid">
                    <div className="metric-box">
                      <span className="metric-val">4m 15s</span>
                      <span className="metric-lbl">Average Cook Window</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">82°C</span>
                      <span className="metric-lbl">Guaranteed Handi Temp</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">0</span>
                      <span className="metric-lbl">Lost Thermal Tickets</span>
                    </div>
                  </div>

                  <div className="station-action-bar">
                    <button
                      type="button"
                      className="btn btn--primary btn--md"
                      onClick={() => setActiveStation("payment")}
                    >
                      Advance to Tabletop UPI <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary btn--md"
                      onClick={() => setActiveStation("cockpit")}
                    >
                      <ArrowLeft size={16} /> Back to Waiter Cockpit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────── */}
            {/* ROLE 04: TABLETOP UPI SETTLEMENT & AUTO-LOOP                 */}
            {/* ─────────────────────────────────────────────────────────── */}
            {activeStation === "payment" && (
              <div className="station-view-layout station-view-layout--payment">
                {/* Left/Main: Payment Terminal Viewport */}
                <div className="station-device-container">
                  <div className="device-screen device-screen--payment">
                    {/* Header Bar */}
                    <div className="device-screen__notch device-screen__notch--payment">
                      <span className="bill-screen-title">TABLE 12 FINAL CHECK</span>
                      <span className="bill-screen-amount">₹{grandTotal}</span>
                    </div>

                    {/* Screen Body */}
                    <div className="device-screen__body">
                      {/* Itemized Check */}
                      <div className="payment-bill-box">
                        {biryaniQty > 0 && (
                          <div className="bill-line">
                            <span>{biryaniQty}x Nati Koli Donne Biryani</span>
                            <span className="font-mono">₹{biryaniSubtotal}</span>
                          </div>
                        )}
                        {pepperFryQty > 0 && (
                          <div className="bill-line">
                            <span>{pepperFryQty}x Chicken Pepper Fry</span>
                            <span className="font-mono">₹{pepperFrySubtotal}</span>
                          </div>
                        )}
                        <div className="bill-line bill-line--tax">
                          <span>CGST (2.5%) + SGST (2.5%)</span>
                          <span className="font-mono">₹{tax}</span>
                        </div>
                        <div className="bill-line bill-line--total">
                          <span>GRAND TOTAL PAYABLE</span>
                          <span className="total-highlight font-mono">₹{grandTotal}</span>
                        </div>
                      </div>

                      {/* Dynamic UPI QR Code & Soundbox */}
                      <div className="payment-qr-telemetry-row">
                        <div className="upi-qr-box">
                          <QrCode size={48} className="text-slate-900" />
                        </div>
                        <div className="upi-details-col">
                          <span className="upi-supported">PhonePe • GPay • Paytm • BHIM</span>
                          <span className="upi-vpa">urqr.thoogudeepa@hdfc</span>
                          <div className="upi-soundbox-chime">
                            <Volume2 size={14} className="text-emerald" />
                            <span>Paytm Soundbox: ₹{grandTotal} received!</span>
                          </div>
                        </div>
                      </div>

                      {/* Settle Action Button */}
                      <button
                        type="button"
                        className={`payment-action-trigger ${upiPaid ? "payment-action-trigger--paid" : ""}`}
                        onClick={() => setUpiPaid(!upiPaid)}
                      >
                        {upiPaid ? (
                          <>
                            <RotateCw size={16} className="spin-slow" /> Table 12 Reset to Green Vacant (Loop Complete)
                          </>
                        ) : (
                          <>
                            <Zap size={16} /> Simulate 15s Tabletop UPI Payment
                          </>
                        )}
                      </button>

                      {/* Connection Flow Indicator */}
                      <div className="device-screen__flow-indicator">
                        <span className="flow-pulse-dot flow-pulse-dot--green" />
                        <span>⟲ Automatically resets Table 12 in Step 2 Waiter Cockpit</span>
                      </div>
                    </div>

                    {/* Hardware Footer */}
                    <div className="device-screen__hardware-footer">
                      <Check size={14} className="text-emerald flex-shrink-0" />
                      <span>14s Average Settlement • WhatsApp GST Receipt • Cashier Queue: 0</span>
                    </div>
                  </div>
                </div>

                {/* Right: Operational Breakdown & Navigation */}
                <div className="station-intel-panel">
                  <div className="station-role-badge station-role-badge--payment">STEP 04 • INSTANT TURNOVER</div>
                  <h3 className="station-intel-title">On-Table UPI Settlement &amp; Auto Re-Loop</h3>
                  <p className="station-intel-desc">
                    Guests settle their check right at the table using any UPI application. As soon as payment verifies, the table flips to Green (Vacant) in the Waiter Cockpit, ready for the next party in Step 1.
                  </p>

                  <div className="station-metrics-grid">
                    <div className="metric-box">
                      <span className="metric-val">14s</span>
                      <span className="metric-lbl">Settlement Speed</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">+38%</span>
                      <span className="metric-lbl">Table Turnover Boost</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">0 min</span>
                      <span className="metric-lbl">Billing Counter Queue</span>
                    </div>
                  </div>

                  <div className="station-action-bar">
                    <button
                      type="button"
                      className="btn btn--primary btn--md"
                      onClick={() => setActiveStation("guest")}
                    >
                      <RotateCw size={16} /> Re-Loop Back to Step 1 (Guest Scan)
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary btn--md"
                      onClick={() => setActiveStation("cockpit")}
                    >
                      View Waiter Cockpit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── OVERVIEW MODE: ALL 4 STATIONS FLOW DECK ── */}
        {activeStation === "all" && (
          <div className="hiw__grid">
            {/* Card 1 */}
            <div className="hiw-card">
              <div className="hiw-card__top-bar">
                <span className="hiw-card__step-pill"><span className="step-digit">01</span> GUEST</span>
                <button onClick={() => setActiveStation("guest")} className="station-focus-link">Focus View ➔</button>
              </div>
              <h3 className="hiw-card__title">1.2s Fast QR Menu Scan</h3>
              <p className="hiw-card__desc">Point camera at Table 12 acrylic stand. Instant PWA with live Dum stock and spice customization.</p>
              <div className="hiw-card__quick-stat">🔥 {biryaniQty}x Donne Biryani in Cart</div>
            </div>

            {/* Card 2 */}
            <div className="hiw-card hiw-card--cockpit-featured">
              <div className="hiw-card__top-bar">
                <span className="hiw-card__step-pill hiw-card__step-pill--cockpit"><span className="step-digit">02</span> COCKPIT</span>
                <button onClick={() => setActiveStation("cockpit")} className="station-focus-link">Focus View ➔</button>
              </div>
              <h3 className="hiw-card__title">Steward Mobile Cockpit</h3>
              <p className="hiw-card__desc">10-seat floor radar with live dining timers and Table 12 instant order chime.</p>
              <div className="hiw-card__quick-stat">⚡ T-12: {biryaniQty}x Biryani Fired</div>
            </div>

            {/* Card 3 */}
            <div className="hiw-card">
              <div className="hiw-card__top-bar">
                <span className="hiw-card__step-pill hiw-card__step-pill--kds"><span className="step-digit">03</span> KITCHEN</span>
                <button onClick={() => setActiveStation("kitchen")} className="station-focus-link">Focus View ➔</button>
              </div>
              <h3 className="hiw-card__title">Wood-Fire KDS Pass</h3>
              <p className="hiw-card__desc">Chronological order routing to Handi station with 1-tap bump to runner.</p>
              <div className="hiw-card__quick-stat">⏱️ KOT #204: 04:15 On Time</div>
            </div>

            {/* Card 4 */}
            <div className="hiw-card">
              <div className="hiw-card__top-bar">
                <span className="hiw-card__step-pill hiw-card__step-pill--payment"><span className="step-digit">04</span> UPI</span>
                <button onClick={() => setActiveStation("payment")} className="station-focus-link">Focus View ➔</button>
              </div>
              <h3 className="hiw-card__title">15s Tabletop UPI Settle</h3>
              <p className="hiw-card__desc">Dynamic QR checkout with Paytm soundbox chime and auto-loop table reset.</p>
              <div className="hiw-card__quick-stat">₹{grandTotal} Grand Total Check</div>
            </div>
          </div>
        )}

        {/* Section CTA */}
        <div className="hiw__cta">
          <Link to="/how-it-works" className="btn btn--primary btn--lg" id="hiw-learn-more">
            Explore Full Technical Specifications <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
