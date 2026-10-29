import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, QrCode, Sparkles,
  Flame, CheckCircle2,
  Wifi, Battery, ShoppingBag
} from "lucide-react";
import "./Hero.css";

const FLOW_STEPS = [
  { id: 0, title: "1. Scan QR", icon: "📸" },
  { id: 1, title: "2. Live Menu", icon: "🍛" },
  { id: 2, title: "3. Bill & KOT", icon: "🧾" },
  { id: 3, title: "4. 15s Table UPI", icon: "💳" },
];

export default function Hero() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  // Auto-progress through the customer journey
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % FLOW_STEPS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [autoPlay]);

  function handleStepClick(stepId: number) {
    setCurrentStep(stepId);
    setAutoPlay(false);
  }

  return (
    <section className="hero" aria-label="UrQR Restaurant Operating System">
      {/* Background Restaurant Photo with Ambient Lighting Gradient Overlay */}
      <div className="hero__bg-wrap" aria-hidden="true">
        <img
          src="/images/restaurant-bg.jpg"
          alt="Restaurant Dining Interior"
          className="hero__bg-img"
          fetchPriority="high"
        />
        <div className="hero__bg-overlay" />
      </div>

      <div className="hero__container">
        <div className="hero__inner">
          {/* Left Column: Value Pitch & High Impact Copy */}
          <div className="hero__content">
            <div className="hero__badge">
              <Sparkles size={13} className="hero__badge-icon" />
              <span>RESTAURANT OPERATING SYSTEM</span>
            </div>

            <h1 className="hero__headline">
              The high-velocity operating system for{" "}
              <span className="type-serif-em">modern dining.</span>
            </h1>

            <p className="hero__sub">
              Guests scan at Table 04 to browse authentic Donne Biryani & Starters in 1.2s.
              Waiters manage an ergonomic 10-seat floor cockpit, kitchen handis sync in real time,
              and tables settle in 15 seconds via Table Dynamic UPI.
            </p>

            <div className="hero__cta-group">
              <Link to="/contact" className="btn btn--hero-primary btn--lg" id="hero-book-demo">
                Book Outlet Demo <ArrowRight size={15} />
              </Link>
              <button
                type="button"
                className="btn btn--hero-secondary btn--lg"
                onClick={() => handleStepClick((currentStep + 1) % FLOW_STEPS.length)}
                id="hero-next-step"
              >
                ⚡ Next Flow Step ({currentStep + 1}/4)
              </button>
            </div>

            <div className="hero__props">
              <div className="hero__prop">
                <span className="hero__prop-emoji">⚡</span>
                <span><strong>1.2s Scan:</strong> Zero app download</span>
              </div>
              <div className="hero__prop">
                <span className="hero__prop-emoji">👨‍🍳</span>
                <span><strong>Waiter Cockpit:</strong> 10-seat floor map</span>
              </div>
              <div className="hero__prop">
                <span className="hero__prop-emoji">💳</span>
                <span><strong>15s Table UPI:</strong> Instant settlement</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hyper-Aesthetic Smartphone Visual */}
          <div className="hero__visual" aria-label="Interactive Smartphone Simulator">
            {/* The Realistic Smartphone Chassis */}
            <div className="phone-chassis">
              {/* Phone Outer Details */}
              <div className="phone-earpiece" />
              <div className="phone-btn-volume" />
              <div className="phone-btn-power" />

              <div className="phone-glass-screen">
                {/* Status Bar */}
                <div className="phone-status-bar">
                  <span className="phone-status-time">12:45</span>
                  {/* Dynamic Island with Live Stage Pill */}
                  <div className="phone-dynamic-island">
                    {currentStep === 0 && <span className="island-text">📸 Camera Focused · T-04</span>}
                    {currentStep === 1 && <span className="island-text">⚡ Menu Active · Live</span>}
                    {currentStep === 2 && <span className="island-text">👨‍🍳 KOT Fired · #1042</span>}
                    {currentStep === 3 && <span className="island-text">✓ Table Settled</span>}
                  </div>
                  <div className="phone-status-icons">
                    <Wifi size={11} />
                    <Battery size={11} />
                  </div>
                </div>

                {/* SCREEN CONTENT BASED ON STEP */}
                <div className="phone-viewport">
                  {/* STEP 0: TABLE ACRYLIC STAND & SCANNING */}
                  {currentStep === 0 && (
                    <div className="screen-step screen-step--scan">
                      <div className="scan-table-header">
                        <div className="scan-brand">
                          <Flame size={12} className="text-amber" />
                          <span>THOOGUDEEPA DONNE BIRYANI</span>
                        </div>
                        <span className="scan-badge">TABLE T-04</span>
                      </div>

                      <div className="scan-acrylic-box">
                        <div className="scan-corner scan-corner--tl" />
                        <div className="scan-corner scan-corner--tr" />
                        <div className="scan-corner scan-corner--bl" />
                        <div className="scan-corner scan-corner--br" />
                        <div className="scan-laser-beam" />
                        <QrCode size={115} className="scan-qr-graphic" />
                      </div>

                      <div className="scan-info">
                        <div className="scan-live-pill">
                          <span className="pulse-green-dot" />
                          <span>Point Camera at Acrylic Table Stand</span>
                        </div>
                        <button
                          type="button"
                          className="phone-primary-action"
                          onClick={() => handleStepClick(1)}
                        >
                          <span>Scan QR & Open Live Menu</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 1: LIVE FOOD MENU (ONLY SHOWN AFTER SCAN) */}
                  {currentStep === 1 && (
                    <div className="screen-step screen-step--menu">
                      <div className="menu-topbar">
                        <div>
                          <strong className="menu-venue-title">Thoogudeepa Donne Biryani</strong>
                          <span className="menu-table-sub">Table 04 · Seeraga Samba Dum Special</span>
                        </div>
                        <span className="menu-status-badge">LIVE MENU</span>
                      </div>

                      {/* Category Pills */}
                      <div className="menu-category-row">
                        <span className="cat-pill cat-pill--active">🍛 Biryani</span>
                        <span className="cat-pill">🍗 Starters</span>
                        <span className="cat-pill">🍹 Drinks</span>
                      </div>

                      {/* Featured Dish Card with Food Photo */}
                      <div className="menu-featured-dish">
                        <div className="dish-img-holder">
                          <img
                            src="/images/food-spread.jpg"
                            alt="Mutton Donne Biryani"
                            className="dish-img"
                          />
                          <span className="dish-hot-pill">🔥 82°C Dum Hot</span>
                        </div>
                        <div className="dish-details">
                          <div className="dish-title-line">
                            <strong>Mutton Donne Biryani</strong>
                            <span className="dish-veg-indicator" />
                          </div>
                          <p className="dish-desc">Seeraga samba rice cooked in wood-fire dum handi with sherva.</p>
                          <div className="dish-footer-line">
                            <span className="dish-cost">₹320</span>
                            <span className="dish-qty-btn">ADDED ✓</span>
                          </div>
                        </div>
                      </div>

                      {/* Second Dish Row */}
                      <div className="menu-mini-dish">
                        <div>
                          <strong>Chicken Sukka Fry</strong>
                          <small>Curry leaves & coconut roasted · ₹240</small>
                        </div>
                        <span className="dish-qty-btn">ADDED ✓</span>
                      </div>

                      {/* Bottom Cart Bar */}
                      <div
                        className="menu-cart-sticky-bar"
                        onClick={() => handleStepClick(2)}
                      >
                        <div className="cart-bar-left">
                          <ShoppingBag size={14} />
                          <span>2 Items • <b>₹560</b></span>
                        </div>
                        <span className="cart-bar-action">Review Bill & KOT →</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: BILL BREAKDOWN & FIRE KOT */}
                  {currentStep === 2 && (
                    <div className="screen-step screen-step--bill">
                      <div className="bill-topbar">
                        <div>
                          <strong className="bill-title">Table 04 Order Bill</strong>
                          <span className="bill-sub">KOT #1042 · Diners: 2</span>
                        </div>
                        <span className="bill-badge">ORDER REVIEW</span>
                      </div>

                      {/* Itemized Receipt Table */}
                      <div className="bill-receipt-card">
                        <div className="receipt-row">
                          <div>
                            <strong>1× Mutton Donne Biryani</strong>
                            <small>Special Wood-Fire Dum Handi</small>
                          </div>
                          <span>₹320.00</span>
                        </div>
                        <div className="receipt-row">
                          <div>
                            <strong>1× Chicken Sukka Fry</strong>
                            <small>Curry leaf roasted spicy</small>
                          </div>
                          <span>₹240.00</span>
                        </div>
                        <div className="receipt-row receipt-row--sub">
                          <span>Subtotal</span>
                          <span>₹560.00</span>
                        </div>
                        <div className="receipt-row receipt-row--sub">
                          <span>GST (5%)</span>
                          <span>₹28.00</span>
                        </div>
                        <div className="receipt-row receipt-row--grand">
                          <strong>Grand Total Payable</strong>
                          <strong>₹588.00</strong>
                        </div>
                      </div>

                      <div className="bill-waiter-sync-pill">
                        <span className="pulse-green-dot" />
                        <span>Waiter Cockpit: Seat 04 turns Amber</span>
                      </div>

                      <button
                        type="button"
                        className="phone-primary-action phone-primary-action--amber"
                        onClick={() => handleStepClick(3)}
                      >
                        <Flame size={14} />
                        <span>Fire KOT to Kitchen & Pay UPI</span>
                      </button>
                    </div>
                  )}

                  {/* STEP 3: 15s TABLE DYNAMIC UPI CHECKOUT */}
                  {currentStep === 3 && (
                    <div className="screen-step screen-step--upi">
                      <div className="upi-header">
                        <span className="upi-tag">TABLE 04 DYNAMIC UPI</span>
                        <strong className="upi-venue">Thoogudeepa Donne Biryani Hub</strong>
                      </div>

                      <div className="upi-qr-card">
                        <QrCode size={115} className="upi-qr-image" />
                        <span className="upi-price-label">₹588.00</span>
                        <div className="upi-apps-row">
                          <span>PhonePe</span>
                          <span>•</span>
                          <span>GPay</span>
                          <span>•</span>
                          <span>Paytm</span>
                        </div>
                      </div>

                      <div className="upi-success-badge">
                        <CheckCircle2 size={14} className="text-emerald" />
                        <span>Bill Settled · Table Marked Vacant in 15s</span>
                      </div>

                      <button
                        type="button"
                        className="phone-secondary-action"
                        onClick={() => handleStepClick(0)}
                      >
                        <span>↺ Re-run 4-Step Customer Flow</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Home Indicator Bar */}
                <div className="phone-home-indicator" />
              </div>
            </div>

            {/* Aesthetic Step Progress Timeline Bar */}
            <div className="hero__timeline-bar" role="tablist" aria-label="Customer Journey Steps">
              {FLOW_STEPS.map((step) => {
                const isActive = currentStep === step.id;
                return (
                  <button
                    key={step.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`timeline-pill ${isActive ? "timeline-pill--active" : ""}`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <span className="timeline-dot" />
                    <span className="timeline-title">{step.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Floating Visual Satellite Cards — Separated & Non-Overlapping */}
            <div className="hero__float-card hero__float-card--top-right">
              <span className="float-avatar">👨‍🍳</span>
              <div>
                <strong>Waiter Cockpit</strong>
                <small>Seat 04 Amber (Dining)</small>
              </div>
            </div>

            <div className="hero__float-card hero__float-card--left-center">
              <span className="float-avatar">🍛</span>
              <div>
                <strong>Dum Handi Pass</strong>
                <small>Biryani Handi #02 Cooking</small>
              </div>
            </div>

            <div className="hero__float-card hero__float-card--bottom-right">
              <span className="float-avatar">⚡</span>
              <div>
                <strong>15s Table UPI</strong>
                <small>Auto Vacant & Verified</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Below Section: 4 High-Impact Floating Metric Cards */}
      <div className="hero__floating-cards-bar">
        <div className="hero__cards-grid">
          <div className="hero__metric-card hero__metric-card--scan">
            <span className="metric-card-icon">⚡</span>
            <div className="metric-card-content">
              <div className="metric-card-head">
                <strong className="metric-card-val">1.2s</strong>
                <span className="metric-card-tag">Instant</span>
              </div>
              <span className="metric-card-desc">Camera QR Scan · Zero App Download</span>
            </div>
          </div>

          <div className="hero__metric-card hero__metric-card--turnover">
            <span className="metric-card-icon">📈</span>
            <div className="metric-card-content">
              <div className="metric-card-head">
                <strong className="metric-card-val">+38%</strong>
                <span className="metric-card-tag">Speed</span>
              </div>
              <span className="metric-card-desc">Faster Table Turnover (31m Avg)</span>
            </div>
          </div>

          <div className="hero__metric-card hero__metric-card--cockpit">
            <span className="metric-card-icon">👨‍🍳</span>
            <div className="metric-card-content">
              <div className="metric-card-head">
                <strong className="metric-card-val">10-Seat</strong>
                <span className="metric-card-tag">Ergonomic</span>
              </div>
              <span className="metric-card-desc">Waiter Smartphone Floor Cockpit</span>
            </div>
          </div>

          <div className="hero__metric-card hero__metric-card--upi">
            <span className="metric-card-icon">💳</span>
            <div className="metric-card-content">
              <div className="metric-card-head">
                <strong className="metric-card-val">15s</strong>
                <span className="metric-card-tag">Direct</span>
              </div>
              <span className="metric-card-desc">Table Dynamic UPI Settlement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
