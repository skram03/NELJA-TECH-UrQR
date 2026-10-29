import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  QrCode,
  Flame,
  Smartphone,
  Zap,
  ToggleRight,
  BarChart3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Check,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  Bell,
  Eye,
  Sliders,
} from "lucide-react";
import { FEATURES } from "../../data/appData";
import "./FeaturesSection.css";

const ICON_MAP: Record<string, React.ElementType> = {
  QrCode,
  Flame,
  Smartphone,
  Zap,
  ToggleRight,
  BarChart3,
};

const FEATURE_VISUALS: Record<string, { img: string; alt: string; category: string }> = {
  "instant-qr": {
    img: "/images/qr-scan.jpg",
    alt: "Guest scanning UrQR code on restaurant dining table",
    category: "Tabletop Discovery",
  },
  "kot-fire": {
    img: "/images/kitchen-team.jpg",
    alt: "Kitchen brigade and expediter station with order display",
    category: "Kitchen Operations",
  },
  "waiter-grid": {
    img: "/images/waiter-uniform.jpg",
    alt: "Properly dressed restaurant steward in formal uniform holding digital order tablet",
    category: "Floor Orchestration",
  },
  "table-upi": {
    img: "/images/hero-restaurant.jpg",
    alt: "Guest dining table with instant UPI payment QR",
    category: "Payment Velocity",
  },
  "stock-control": {
    img: "/images/food-spread.jpg",
    alt: "Fresh Donne Biryani food spread with 86 live toggle",
    category: "Inventory Defense",
  },
  "analytics": {
    img: "/images/fine-dining.jpg",
    alt: "Executive restaurant dining telemetry and rush reports",
    category: "Revenue Intelligence",
  },
};

const ROTATION_INTERVAL_MS = 6000;

interface TableSeat {
  id: string;
  status: "VACANT" | "BILL REQ" | "DINING" | "KDS PREP";
  type: "vacant" | "bill" | "dining" | "kds";
  time: string;
  guests: string;
  billAmount?: string;
}

export default function FeaturesSection() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number>(4); // default Day 4
  const [displayMode, setDisplayMode] = useState<"simulator" | "photo">("simulator");

  // 1. Instant QR Menu Simulator States
  const [cartCount, setCartCount] = useState<number>(2);
  const [menuLang, setMenuLang] = useState<"en" | "kn">("en");
  const [dishQty, setDishQty] = useState<number>(2);

  // 2. Direct Wood-Fire KOT Simulator States
  const [kotTimer, setKotTimer] = useState<number>(194); // 03:14 in seconds
  const [kotBumped, setKotBumped] = useState<boolean>(false);
  const [kotStation, setKotStation] = useState<"handi" | "tandoor" | "beverage">("handi");

  // 3. Waiter Mobile Cockpit Simulator States
  const [activeTable, setActiveTable] = useState<string>("T-02");
  const [chimeAcked, setChimeAcked] = useState<boolean>(false);
  const [waiterSubView, setWaiterSubView] = useState<"grid" | "uniform">("grid");
  const [tablesList, setTablesList] = useState<TableSeat[]>([
    { id: "T-01", status: "VACANT", type: "vacant", time: "Ready", guests: "4 Seats" },
    { id: "T-02", status: "BILL REQ", type: "bill", time: "01:12", guests: "2 Guests", billAmount: "₹1,120" },
    { id: "T-03", status: "VACANT", type: "vacant", time: "Ready", guests: "2 Seats" },
    { id: "T-04", status: "DINING", type: "dining", time: "18m", guests: "4 Guests", billAmount: "₹840" },
    { id: "T-05", status: "VACANT", type: "vacant", time: "Ready", guests: "6 Seats" },
    { id: "T-06", status: "KDS PREP", type: "kds", time: "03:14", guests: "3 Guests", billAmount: "₹650" },
  ]);

  // 4. On-Table Dynamic UPI Simulator States
  const [isUpiPaid, setIsUpiPaid] = useState<boolean>(false);
  const [upiSplit, setUpiSplit] = useState<number>(1); // 1 = full, 2 = split 2, 4 = split 4

  // 5. Real-Time 86 Toggler Simulator States
  const [stockItems, setStockItems] = useState([
    { id: "mutton", name: "Mutton Donne Biryani (Handi)", available: true, stock: "8 Left" },
    { id: "seeraga", name: "Seeraga Samba Dum Rice", available: true, stock: "12 Left" },
    { id: "sukka", name: "Nati Chicken Sukka Fry", available: true, stock: "In Stock" },
    { id: "sherva", name: "Wood-Fire Military Sherva", available: false, stock: "86'd Out" },
  ]);

  // 6. Rush Telemetry Simulator States
  const [analyticsRange, setAnalyticsRange] = useState<"lunch" | "dinner" | "weekly">("lunch");
  const [simulatedTurns, setSimulatedTurns] = useState<number>(42);
  const [grossSales, setGrossSales] = useState<number>(148290);

  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const activeIndex = FEATURES.findIndex((f) => f.id === activeId);
  const activeFeature = FEATURES[activeIndex] || FEATURES[0];
  const Icon = ICON_MAP[activeFeature.icon] || QrCode;
  const visual = FEATURE_VISUALS[activeFeature.id] || {
    img: "/images/qr-scan.jpg",
    alt: "UrQR Feature Showcase",
    category: "Operational Feature",
  };

  // Continuous auto-rotation timer
  useEffect(() => {
    if (!isAutoPlaying) return;

    const stepMs = 50;
    const increment = (stepMs / ROTATION_INTERVAL_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const nextIdx = (activeIndex + 1) % FEATURES.length;
          setActiveId(FEATURES[nextIdx].id);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isAutoPlaying, activeIndex]);

  // Live countdown timer for KOT simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setKotTimer((prev) => (prev > 0 ? prev - 1 : 194));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTabSelect = (id: string) => {
    setActiveId(id);
    setProgress(0);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % FEATURES.length;
    setActiveId(FEATURES[nextIdx].id);
    setProgress(0);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + FEATURES.length) % FEATURES.length;
    setActiveId(FEATURES[prevIdx].id);
    setProgress(0);
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3400);
  };

  const handleToggleStock = (itemId: string) => {
    setStockItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newStatus = !item.available;
          showToast(
            newStatus
              ? `✓ ${item.name} activated across all 38 table stands!`
              : `🚫 ${item.name} 86'd OFF across all 38 tables in 85ms!`
          );
          return { ...item, available: newStatus, stock: newStatus ? "In Stock" : "86'd Out" };
        }
        return item;
      })
    );
  };

  const handle86AllHandi = () => {
    setStockItems((prev) =>
      prev.map((item) => ({ ...item, available: false, stock: "86'd Out" }))
    );
    showToast("🚫 KITCHEN RUSH OVERRIDE: All items 86'd across tabletop QR stands!");
  };

  const handleRestoreAllStock = () => {
    setStockItems((prev) =>
      prev.map((item) => ({ ...item, available: true, stock: "In Stock" }))
    );
    showToast("✓ All items restored to In Stock across dining room in 0ms!");
  };

  const formatKotTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `0${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Day calculations for the "Two weeks without commission" interactive widget
  const daySavings = selectedDay * 1840;
  const dayOrders = selectedDay * 46;

  const getDayMilestone = (day: number) => {
    if (day <= 3) {
      return {
        title: "Fast Setup & QR Stand Placement",
        desc: "Acrylic tabletop stands live on 38 tables. Bilingual Kannada & English menu digitized.",
      };
    }
    if (day <= 7) {
      return {
        title: "Kitchen Handi Pass Automation",
        desc: "Direct wood-fire KOT tablets active. Zero lost paper chits, table turn speed increased 28%.",
      };
    }
    if (day <= 11) {
      return {
        title: "Floor Steward Mobile Cockpit",
        desc: "Waitstaff armed with smartphone sync. Steward steps reduced by 40% with instant chime alerts.",
      };
    }
    return {
      title: "Full 22% Aggregator Defense",
      desc: "Peak weekend rush handled with 15s UPI table turnover & ₹25,760 saved in restaurant profits!",
    };
  };

  const milestone = getDayMilestone(selectedDay);

  const selectedTableObj = tablesList.find((t) => t.id === activeTable) || tablesList[1];

  const handleAckChime = () => {
    setChimeAcked(true);
    showToast("✓ Chime Acknowledged! Steward Ramesh en route to Table T-02 (Vibrated smartphone).");
    setTablesList((prev) =>
      prev.map((t) =>
        t.id === "T-02" ? { ...t, status: "DINING", type: "dining", time: "Serviced" } : t
      )
    );
  };

  const handleTableSettle = (tableId: string) => {
    setTablesList((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? { ...t, status: "VACANT", type: "vacant", time: "Ready", billAmount: undefined }
          : t
      )
    );
    showToast(`✓ Table ${tableId} bill settled via UPI! Auto-vacated for walk-in party.`);
  };

  const handleSimulateTurn = () => {
    setSimulatedTurns((prev) => prev + 1);
    setGrossSales((prev) => prev + 840);
    showToast("⚡ Table Turn simulated! +1 turn logged, Gross Sales +₹840.00.");
  };

  return (
    <section className="features-section section" aria-labelledby="features-heading">
      <div className="container">
        {/* Section Header */}
        <div className="features-section__header">
          <div className="section-label">
            <Sparkles size={14} className="icon-pulse" />
            Core Platform Features
          </div>
          <h2 id="features-heading" className="features-section__title">
            Everything your restaurant needs in one place
          </h2>
          <p className="features-section__sub">
            UrQR is a complete restaurant technology layer connecting digital menus, table ordering,
            kitchen automation, floor steward cockpits, and instant payments in a clean, unified light theme.
          </p>

          {/* Live Auto-Rotation Control Bar */}
          <div className="features-rotation-ctrl">
            <div className="rotation-status">
              <span className={`rotation-pulse ${isAutoPlaying ? "rotation-pulse--active" : ""}`} />
              <span className="rotation-text">
                {isAutoPlaying ? "Auto-Rotating Features" : "Rotation Paused"}
              </span>
              <span className="rotation-counter">
                {activeIndex + 1} of {FEATURES.length}
              </span>
            </div>

            <div className="rotation-btn-group">
              <button
                type="button"
                className="rotation-nav-btn"
                onClick={handlePrev}
                aria-label="Previous Feature"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="rotation-play-btn"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                aria-label={isAutoPlaying ? "Pause rotation" : "Play rotation"}
              >
                {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                type="button"
                className="rotation-nav-btn"
                onClick={handleNext}
                aria-label="Next Feature"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div
          className="features-layout"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Left Column: Vertical Feature Selector Tabs + 14-Day Free Pilot Widget */}
          <div className="features-left-col">
            <div className="features-tabs" role="tablist" aria-label="UrQR Platform Features">
              {FEATURES.map((feature) => {
                const TabIcon = ICON_MAP[feature.icon] || QrCode;
                const isActive = activeId === feature.id;

                return (
                  <button
                    key={feature.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`feature-panel-${feature.id}`}
                    id={`feature-tab-${feature.id}`}
                    className={`features-tab ${isActive ? "features-tab--active" : ""}`}
                    onClick={() => handleTabSelect(feature.id)}
                  >
                    <div className="features-tab__icon-wrap">
                      <TabIcon size={18} aria-hidden="true" />
                    </div>
                    <div className="features-tab__content">
                      <span className="features-tab__title">{feature.title}</span>
                      <span className="features-tab__badge">{feature.badge}</span>
                    </div>
                    <span className="features-tab__status-pill">
                      <Check size={11} /> Live
                    </span>

                    {/* Progress Bar for Active Tab Auto-Rotation */}
                    {isActive && (
                      <div
                        className="features-tab__progress-bar"
                        style={{ width: `${progress}%` }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 3D Claymorphic "Two Weeks Without Commission" Moving Bead Card with LIVE USEFUL TELEMETRY */}
            <div className="two-weeks-widget" aria-label="Two weeks without commission demonstration">
              <div className="two-weeks-card">
                <div className="two-weeks-header-strip">
                  <span className="two-weeks-pill">INTERACTIVE PILOT TELEMETRY</span>
                  <small className="two-weeks-hint">Tap any day bead to calculate savings</small>
                </div>

                <div className="two-weeks-tracks">
                  {/* Track 1: Short groove with Day 1 reset bead */}
                  <div className="two-weeks-track two-weeks-track--short">
                    <button
                      type="button"
                      className={`track-num-btn ${selectedDay === 1 ? "track-num-btn--active" : ""}`}
                      onClick={() => setSelectedDay(1)}
                      title="Day 1: Initial Setup"
                    >
                      1
                    </button>
                    {selectedDay === 1 && (
                      <div className="orange-sphere orange-sphere--track1" aria-hidden="true">
                        <div className="sphere-glow" />
                      </div>
                    )}
                  </div>

                  {/* Track 2: Days 1 to 7 with interactive slider bead */}
                  <div className="two-weeks-track two-weeks-track--full">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`track-num-btn ${selectedDay === day ? "track-num-btn--active" : ""}`}
                        onClick={() => setSelectedDay(day)}
                        title={`Day ${day}: Compute profit defense`}
                      >
                        {day}
                      </button>
                    ))}
                    {selectedDay <= 7 && (
                      <div
                        className="orange-sphere sphere-glide-interactive"
                        style={{ left: `${((selectedDay - 1) / 6) * 82 + 5}%` }}
                        aria-hidden="true"
                      >
                        <div className="sphere-glow" />
                      </div>
                    )}
                  </div>

                  {/* Track 3: Days 8 to 14 (Week 2 zero commission) */}
                  <div className="two-weeks-track two-weeks-track--full">
                    {[8, 9, 10, 11, 12, 13, 14].map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`track-num-btn ${selectedDay === day ? "track-num-btn--active" : ""}`}
                        onClick={() => setSelectedDay(day)}
                        title={`Day ${day}: Compute profit defense`}
                      >
                        {day}
                      </button>
                    ))}
                    {selectedDay >= 8 && (
                      <div
                        className="orange-sphere sphere-glide-interactive"
                        style={{ left: `${((selectedDay - 8) / 6) * 82 + 5}%` }}
                        aria-hidden="true"
                      >
                        <div className="sphere-glow" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Typography matching reference image */}
                <div className="two-weeks-footer">
                  <div className="two-weeks-footer__title">Two weeks</div>
                  <div className="two-weeks-footer__sub">without commission</div>
                </div>

                {/* LIVE USEFUL TRIAL SAVINGS TELEMETRY BREAKDOWN */}
                <div className="two-weeks-telemetry-box">
                  <div className="telemetry-box-head">
                    <span className="telemetry-day-badge">DAY {selectedDay} OF 14</span>
                    <strong className="telemetry-saved-amt">₹{daySavings.toLocaleString("en-IN")} SAVED</strong>
                  </div>

                  <div className="telemetry-milestone-info">
                    <strong>{milestone.title}</strong>
                    <p>{milestone.desc}</p>
                  </div>

                  <div className="telemetry-details-grid">
                    <div className="telemetry-detail-item">
                      <span>Direct Orders</span>
                      <strong>{dayOrders}</strong>
                    </div>
                    <div className="telemetry-detail-item">
                      <span>Aggregator Fee</span>
                      <strong className="text-strike">22.0%</strong>
                    </div>
                    <div className="telemetry-detail-item">
                      <span>UrQR Commission</span>
                      <strong className="text-emerald">0.0%</strong>
                    </div>
                  </div>

                  <Link to="/contact" className="telemetry-action-link">
                    Activate 14-Day Free Pilot →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Feature Showcase Card with DUAL MODE (LIVE SIMULATOR & ATMOSPHERE) */}
          <div
            id={`feature-panel-${activeFeature.id}`}
            role="tabpanel"
            aria-labelledby={`feature-tab-${activeFeature.id}`}
            className="features-panel"
            key={activeFeature.id}
          >
            {/* Viewport Header with Dual Mode Switcher: Live Simulator vs Atmosphere Photo */}
            <div className="features-panel__screen-header">
              <div className="screen-mode-pills" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={displayMode === "simulator"}
                  className={`screen-mode-pill ${displayMode === "simulator" ? "screen-mode-pill--active" : ""}`}
                  onClick={() => setDisplayMode("simulator")}
                >
                  <Sliders size={13} />
                  <span>Interactive Live Software</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={displayMode === "photo"}
                  className={`screen-mode-pill ${displayMode === "photo" ? "screen-mode-pill--active" : ""}`}
                  onClick={() => setDisplayMode("photo")}
                >
                  <Eye size={13} />
                  <span>Dining Atmosphere</span>
                </button>
              </div>

              <div className="screen-status-badge">
                <Sparkles size={13} className="text-emerald" />
                <span>{visual.category}</span>
              </div>
            </div>

            {/* SCREEN VIEWPORT: PURE CRISP LIGHT THEME */}
            {displayMode === "simulator" ? (
              <div className="features-panel__simulator-screen features-panel__simulator-screen--light">
                {/* 1. INSTANT QR MENU SIMULATOR */}
                {activeFeature.id === "instant-qr" && (
                  <div className="feat-sim feat-sim--light feat-sim--qr">
                    <div className="sim-topbar">
                      <div className="sim-table-id">
                        <span className="sim-dot" />
                        <strong>Table T-04 · Thoogudeepa Donne Biryani</strong>
                      </div>
                      <div className="sim-lang-switch">
                        <button
                          type="button"
                          className={menuLang === "en" ? "active" : ""}
                          onClick={() => setMenuLang("en")}
                        >
                          EN
                        </button>
                        <span>/</span>
                        <button
                          type="button"
                          className={menuLang === "kn" ? "active" : ""}
                          onClick={() => setMenuLang("kn")}
                        >
                          ಕನ್ನಡ
                        </button>
                      </div>
                    </div>

                    <div className="sim-cat-chips">
                      <span className="sim-cat-chip sim-cat-chip--active">🍖 Biryani Dum</span>
                      <span className="sim-cat-chip">🍗 Military Starters</span>
                      <span className="sim-cat-chip">🥤 Herbal Drinks</span>
                    </div>

                    <div className="sim-menu-card">
                      <div className="sim-dish-info">
                        <span className="sim-dum-tag">🔥 82°C DUM · 8 LEFT IN HANDI</span>
                        <h4>
                          {menuLang === "en"
                            ? "Mutton Donne Biryani (Handi Dum)"
                            : "ಮಟನ್ ದೊನ್ನೆ ಬಿರಿಯಾನಿ (ಹಂಡಿ ದಮ್)"}
                        </h4>
                        <p>
                          {menuLang === "en"
                            ? "Wood-fire seeraga samba rice simmered with tender local mutton & sherva."
                            : "ಸೀರಿಗೆ ಸಾಂಬಾ ಅಕ್ಕಿ ಮತ್ತು ಮಿಲಿಟರಿ ಶೇರ್ವಾ ಜೊತೆ ಮಟನ್ ಬಿರಿಯಾನಿ."}
                        </p>
                        <div className="sim-price-qty-row">
                          <strong className="sim-price">₹{dishQty * 320}.00</strong>
                          <div className="sim-qty-stepper">
                            <button
                              type="button"
                              onClick={() => setDishQty((q) => Math.max(1, q - 1))}
                            >
                              −
                            </button>
                            <span>{dishQty}</span>
                            <button
                              type="button"
                              onClick={() => setDishQty((q) => q + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="sim-add-btn"
                        onClick={() => {
                          setCartCount((c) => c + dishQty);
                          showToast(`✓ Added ${dishQty}× Mutton Donne Biryani to Cart!`);
                        }}
                      >
                        + ADD TO ORDER
                      </button>
                    </div>

                    <div className="sim-floating-cart-bar">
                      <div className="cart-text">
                        <span>Cart Total:</span>
                        <strong>{cartCount} Items · ₹{cartCount * 280 + 40}.00</strong>
                      </div>
                      <button
                        type="button"
                        className="sim-fire-btn"
                        onClick={() => showToast("⚡ Order fired directly to Wood-Fire Handi Pass in 0ms!")}
                      >
                        Fire KOT to Kitchen ➔
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. DIRECT WOOD-FIRE KOT SIMULATOR */}
                {activeFeature.id === "kot-fire" && (
                  <div className="feat-sim feat-sim--light feat-sim--kds">
                    <div className="kds-station-bar">
                      <div>
                        <span className="kds-station-pill">STATION 01</span>
                        <strong>WOOD-FIRE HANDI PASS</strong>
                      </div>
                      <div className="kds-clock">
                        <Clock size={13} />
                        <span>LIVE TIMER: {formatKotTime(kotTimer)}</span>
                      </div>
                    </div>

                    <div className="kds-station-filters">
                      <button
                        type="button"
                        className={`kds-filter-btn ${kotStation === "handi" ? "kds-filter-btn--active" : ""}`}
                        onClick={() => {
                          setKotStation("handi");
                          showToast("Switched to Station 01: Wood-Fire Handi Pass");
                        }}
                      >
                        🔥 Handi Pass
                      </button>
                      <button
                        type="button"
                        className={`kds-filter-btn ${kotStation === "tandoor" ? "kds-filter-btn--active" : ""}`}
                        onClick={() => {
                          setKotStation("tandoor");
                          showToast("Switched to Station 02: Tandoor & Grill");
                        }}
                      >
                        🍗 Tandoor
                      </button>
                      <button
                        type="button"
                        className={`kds-filter-btn ${kotStation === "beverage" ? "kds-filter-btn--active" : ""}`}
                        onClick={() => {
                          setKotStation("beverage");
                          showToast("Switched to Station 03: Beverage & Sherbet");
                        }}
                      >
                        🥤 Bar & Drinks
                      </button>
                    </div>

                    <div className={`kds-active-ticket ${kotBumped ? "kds-ticket--bumped" : ""}`}>
                      <div className="kds-ticket-head">
                        <div>
                          <strong>TICKET #1042 · TABLE T-04</strong>
                          <small>Waitstaff: Ramesh K. (Zone A)</small>
                        </div>
                        <span className="kds-timer-chip">⏱️ {formatKotTime(kotTimer)}</span>
                      </div>
                      <div className="kds-ticket-items">
                        <div className="kds-item-line">
                          <span>2× Mutton Donne Biryani</span>
                          <span className="kds-item-tag">🔥 Handi Dum</span>
                        </div>
                        <div className="kds-item-line">
                          <span>1× Extra Military Sherva (Spicy)</span>
                          <span className="kds-item-tag">⚡ Immediate</span>
                        </div>
                      </div>
                      <div className="kds-actions-row">
                        <button
                          type="button"
                          className="kds-bump-btn"
                          onClick={() => {
                            setKotBumped(true);
                            showToast("🔔 Ticket #1042 Plated! Floor Waiter smartphone vibrated.");
                            setTimeout(() => setKotBumped(false), 2800);
                          }}
                        >
                          {kotBumped ? "✓ BUMPED TO PASS (WAITER NOTIFIED)" : "✓ BUMP TO PASS (ALERT WAITER)"}
                        </button>
                        <button
                          type="button"
                          className="kds-new-btn"
                          onClick={() => {
                            setKotTimer(194);
                            showToast("⚡ Fresh KOT #1043 arrived from Table T-06 (Seeraga Dum)!");
                          }}
                        >
                          + New KOT
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. WAITER MOBILE COCKPIT SIMULATOR — PROPERLY DRESSED WAITER & LIGHT-THEME FLOOR GRID */}
                {activeFeature.id === "waiter-grid" && (
                  <div className="feat-sim feat-sim--light feat-sim--waiter">
                    {/* Properly Dressed Steward Profile Bar with Portrait Thumbnail */}
                    <div className="waiter-steward-profile-bar">
                      <div className="waiter-avatar-box">
                        <img
                          src="/images/waiter-uniform.jpg"
                          alt="Properly dressed restaurant steward in formal uniform"
                          className="waiter-avatar-img"
                        />
                        <span className="waiter-online-dot" title="Online & Floor Synced" />
                      </div>

                      <div className="waiter-identity">
                        <div className="waiter-name-row">
                          <strong>Ramesh K.</strong>
                          <span className="waiter-id-tag">#TH-08</span>
                          <span className="waiter-status-badge">🟢 ON DUTY</span>
                        </div>
                        <div className="waiter-station-info">
                          Lead Floor Steward · Zone A (Patio & Tables T1–T6)
                        </div>
                      </div>

                      <div className="waiter-view-toggle">
                        <button
                          type="button"
                          className={`waiter-sub-btn ${waiterSubView === "grid" ? "waiter-sub-btn--active" : ""}`}
                          onClick={() => setWaiterSubView("grid")}
                        >
                          📱 Grid
                        </button>
                        <button
                          type="button"
                          className={`waiter-sub-btn ${waiterSubView === "uniform" ? "waiter-sub-btn--active" : ""}`}
                          onClick={() => setWaiterSubView("uniform")}
                        >
                          👔 Uniform
                        </button>
                      </div>
                    </div>

                    {waiterSubView === "grid" ? (
                      <>
                        {/* Live Steward Chime Alert Banner */}
                        <div className={`waiter-chime-alert ${chimeAcked ? "waiter-chime-alert--acked" : ""}`}>
                          <div className="waiter-chime-info">
                            <Bell size={15} className={`chime-bell-icon ${!chimeAcked ? "icon-ringing" : ""}`} />
                            <span>
                              {chimeAcked
                                ? "✓ Table T-02 Acknowledged — Steward Ramesh en route!"
                                : "⚡ Table T-02 requested Bill & Water! (Steward Chime Active)"}
                            </span>
                          </div>
                          {!chimeAcked && (
                            <button
                              type="button"
                              className="waiter-chime-ack-btn"
                              onClick={handleAckChime}
                            >
                              ✓ ACKNOWLEDGE
                            </button>
                          )}
                        </div>

                        {/* 6-Table Floor Grid in Crisp Light Theme */}
                        <div className="waiter-grid-tables">
                          {tablesList.map((seat) => {
                            const isSelected = activeTable === seat.id;
                            return (
                              <button
                                key={seat.id}
                                type="button"
                                className={`seat-tile seat-tile--light seat-tile--${seat.type} ${isSelected ? "seat-tile--selected" : ""}`}
                                onClick={() => {
                                  setActiveTable(seat.id);
                                  showToast(`Selected Table ${seat.id} · Status: ${seat.status}`);
                                }}
                              >
                                <div className="seat-tile-header">
                                  <strong className="seat-tile-id">{seat.id}</strong>
                                  <span className="seat-tile-status">{seat.status}</span>
                                </div>
                                <div className="seat-tile-details">
                                  <span className="seat-tile-guests">{seat.guests}</span>
                                  <span className="seat-tile-time">
                                    {seat.billAmount ? seat.billAmount : seat.time}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Interactive Table Contextual Action Bar */}
                        <div className="waiter-selected-bar">
                          <div className="waiter-selected-info">
                            <span className="selected-table-label">Selected:</span>
                            <strong>{selectedTableObj.id}</strong>
                            <span className={`selected-status-badge selected-status-badge--${selectedTableObj.type}`}>
                              {selectedTableObj.status}
                            </span>
                          </div>
                          <div className="waiter-quick-actions">
                            <button
                              type="button"
                              className="waiter-quick-btn"
                              onClick={() => showToast(`🔔 Floor ping sent to Table ${selectedTableObj.id} steward.`)}
                            >
                              🔔 Ping
                            </button>
                            {selectedTableObj.billAmount ? (
                              <button
                                type="button"
                                className="waiter-quick-btn waiter-quick-btn--settle"
                                onClick={() => handleTableSettle(selectedTableObj.id)}
                              >
                                🧾 Settle {selectedTableObj.billAmount}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="waiter-quick-btn"
                                onClick={() => showToast(`⚡ Re-order triggered for ${selectedTableObj.id}!`)}
                              >
                                ⚡ Re-order
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Uniform Inspection View */
                      <div className="waiter-uniform-card">
                        <img
                          src="/images/waiter-uniform.jpg"
                          alt="Full formal uniform of Thoogudeepa restaurant floor steward"
                          className="waiter-uniform-full-img"
                        />
                        <div className="waiter-uniform-specs">
                          <h4>Formal Floor Steward Standard</h4>
                          <ul>
                            <li>✓ Crisp white collar formal shirt with black tailored vest</li>
                            <li>✓ Official UrQR digital name badge & Zone ID #TH-08</li>
                            <li>✓ Handheld smartphone cockpit with real-time floor chime</li>
                            <li>✓ Table turnaround protocol: Under 15 seconds UPI settlement</li>
                          </ul>
                          <button
                            type="button"
                            className="waiter-uniform-back-btn"
                            onClick={() => setWaiterSubView("grid")}
                          >
                            ← Back to Live Table Grid
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. ON-TABLE DYNAMIC UPI QR SIMULATOR */}
                {activeFeature.id === "table-upi" && (
                  <div className="feat-sim feat-sim--light feat-sim--upi">
                    <div className="upi-stand-box">
                      <div className="upi-stand-head">
                        <Flame size={16} className="text-amber" />
                        <strong>TABLE T-04 DYNAMIC UPI STAND</strong>
                        <span className="upi-live-tag">LIVE QR</span>
                      </div>

                      <div className="upi-split-selector">
                        <button
                          type="button"
                          className={upiSplit === 1 ? "active" : ""}
                          onClick={() => setUpiSplit(1)}
                        >
                          Full ₹588
                        </button>
                        <button
                          type="button"
                          className={upiSplit === 2 ? "active" : ""}
                          onClick={() => setUpiSplit(2)}
                        >
                          Split ×2 (₹294)
                        </button>
                        <button
                          type="button"
                          className={upiSplit === 4 ? "active" : ""}
                          onClick={() => setUpiSplit(4)}
                        >
                          Split ×4 (₹147)
                        </button>
                      </div>

                      <div className="upi-qr-display">
                        <QrCode size={110} />
                        <span className="upi-amount">
                          ₹{upiSplit === 1 ? "588.00" : upiSplit === 2 ? "294.00" : "147.00"}
                        </span>
                        <small className="upi-fee-sub">0% MDR · Direct Bank Settle</small>
                      </div>

                      <div className="upi-apps-row">
                        <span className="upi-app-badge">PhonePe</span>
                        <span className="upi-app-badge">Google Pay</span>
                        <span className="upi-app-badge">Paytm</span>
                        <span className="upi-app-badge">Cred UPI</span>
                      </div>

                      <button
                        type="button"
                        className={`upi-test-btn ${isUpiPaid ? "upi-test-btn--paid" : ""}`}
                        onClick={() => {
                          setIsUpiPaid(true);
                          showToast("✓ Payment ₹588 verified! Table T-04 auto-flipped to Vacant in 15s.");
                          setTimeout(() => setIsUpiPaid(false), 3500);
                        }}
                      >
                        {isUpiPaid ? "✓ PAID & TABLE AUTO-VACATED (15s)" : "⚡ Simulate 15s Instant Guest Settle"}
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. REAL-TIME 86 TOGGLER SIMULATOR */}
                {activeFeature.id === "stock-control" && (
                  <div className="feat-sim feat-sim--light feat-sim--86">
                    <div className="stock-top-strip">
                      <div>
                        <span className="stock-pill">KITCHEN 86 MANAGER</span>
                        <strong>1-Tap Out-of-Stock Override</strong>
                      </div>
                      <span className="stock-sync-speed">⚡ 85ms Floor Push</span>
                    </div>

                    <div className="stock-bulk-actions">
                      <button
                        type="button"
                        className="stock-bulk-btn stock-bulk-btn--off"
                        onClick={handle86AllHandi}
                      >
                        🚫 86 All Handi Dum
                      </button>
                      <button
                        type="button"
                        className="stock-bulk-btn stock-bulk-btn--on"
                        onClick={handleRestoreAllStock}
                      >
                        ✓ Restore All In Stock
                      </button>
                    </div>

                    <div className="stock-items-list">
                      {stockItems.map((item) => (
                        <div key={item.id} className="stock-item-row stock-item-row--light">
                          <div className="stock-item-info">
                            <strong>{item.name}</strong>
                            <small className={item.available ? "text-emerald" : "text-rose"}>
                              {item.stock}
                            </small>
                          </div>
                          <button
                            type="button"
                            className={`stock-toggle-btn ${item.available ? "stock-toggle--on" : "stock-toggle--off"}`}
                            onClick={() => handleToggleStock(item.id)}
                          >
                            {item.available ? "IN STOCK" : "86'D OUT"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. LIVE RUSH TELEMETRY SIMULATOR */}
                {activeFeature.id === "analytics" && (
                  <div className="feat-sim feat-sim--light feat-sim--telemetry">
                    <div className="telemetry-top-strip">
                      <div>
                        <span className="telemetry-pill">EXECUTIVE TELEMETRY</span>
                        <strong>Rush Hour Velocity Dashboard</strong>
                      </div>
                      <span className="telemetry-live-pill">● 100% REAL-TIME</span>
                    </div>

                    <div className="telemetry-range-buttons">
                      <button
                        type="button"
                        className={`range-btn ${analyticsRange === "lunch" ? "range-btn--active" : ""}`}
                        onClick={() => {
                          setAnalyticsRange("lunch");
                          showToast("Loaded Weekend Lunch Rush telemetry");
                        }}
                      >
                        Lunch Rush (12-3 PM)
                      </button>
                      <button
                        type="button"
                        className={`range-btn ${analyticsRange === "dinner" ? "range-btn--active" : ""}`}
                        onClick={() => {
                          setAnalyticsRange("dinner");
                          showToast("Loaded Dinner Peak rush telemetry");
                        }}
                      >
                        Dinner Peak (7-11 PM)
                      </button>
                      <button
                        type="button"
                        className={`range-btn ${analyticsRange === "weekly" ? "range-btn--active" : ""}`}
                        onClick={() => {
                          setAnalyticsRange("weekly");
                          showToast("Loaded 7-Day Performance trend");
                        }}
                      >
                        7-Day Trend
                      </button>
                    </div>

                    <div className="telemetry-metrics-grid">
                      <div className="telemetry-metric-tile telemetry-metric-tile--light">
                        <span>RevPASH Gain</span>
                        <strong className="text-emerald">+42.8%</strong>
                        <small>₹1,420 / table / hr</small>
                      </div>
                      <div className="telemetry-metric-tile telemetry-metric-tile--light">
                        <span>Table Turns</span>
                        <strong className="text-amber">
                          {analyticsRange === "lunch" ? `${(simulatedTurns / 10).toFixed(1)}x` : "3.8x"}
                        </strong>
                        <small>+{simulatedTurns} total turns</small>
                      </div>
                      <div className="telemetry-metric-tile telemetry-metric-tile--light">
                        <span>Checkout Time</span>
                        <strong className="text-cyan">15s</strong>
                        <small>vs 18m cash counter</small>
                      </div>
                    </div>

                    <div className="telemetry-feed-strip telemetry-feed-strip--light">
                      <span className="feed-dot" />
                      <span>
                        13:42:09 — Table T-04 paid ₹588 via UPI ➔ Seat Vacated! Gross: ₹{grossSales.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="telemetry-simulate-btn"
                      onClick={handleSimulateTurn}
                    >
                      ⚡ + Simulate Table Turn & Record Sale
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* PHOTO BANNER MODE */
              <div className="features-panel__image-wrap">
                <img
                  src={visual.img}
                  alt={visual.alt}
                  className="features-panel__image"
                  loading="lazy"
                />
                <div className="features-panel__image-overlay" />

                <div className="features-panel__category-badge">
                  <Sparkles size={13} />
                  <span>{visual.category}</span>
                </div>

                <div className="features-panel__image-icon">
                  <Icon size={24} aria-hidden="true" />
                </div>

                <div className="features-panel__trial-chip">
                  <ShieldCheck size={14} className="text-emerald" />
                  <span>14-Day Zero Commission Included</span>
                </div>
              </div>
            )}

            {/* Notification Toast for Live Actions */}
            {notificationToast && (
              <div className="feature-action-toast" role="status" aria-live="polite">
                <span>{notificationToast}</span>
              </div>
            )}

            {/* Showcase Body */}
            <div className="features-panel__body">
              <div className="features-panel__meta-row">
                <span className="chip chip--emerald">
                  <span className="pulse-dot" /> {activeFeature.badge}
                </span>
                <span className="features-panel__uptime-pill">
                  99.98% Floor Uptime
                </span>
              </div>

              <h3 className="features-panel__title">{activeFeature.title}</h3>
              <p className="features-panel__desc">{activeFeature.description}</p>

              {/* Operational Advantages Card Grid */}
              <div className="features-panel__highlights-section">
                <h4 className="features-panel__highlights-heading">
                  Operational Advantages & Deliverables
                </h4>
                <div className="features-panel__highlights-grid">
                  {activeFeature.highlights.map((highlight, idx) => (
                    <div key={idx} className="features-highlight-card">
                      <div className="features-highlight-card__icon">
                        <CheckCircle2 size={16} aria-hidden="true" />
                      </div>
                      <span className="features-highlight-card__text">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel Action Bar */}
              <div className="features-panel__footer">
                <Link to="/product" className="btn btn--primary btn--md">
                  Explore Full System Specs <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn btn--secondary btn--md">
                  Schedule Live Floor Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
