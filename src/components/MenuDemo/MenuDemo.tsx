import { useState, useMemo } from "react";
import {
  ShoppingCart, ChevronLeft, ChevronRight, Clock,
  Search, Smartphone, ChefHat, Bell, QrCode,
  Flame, CheckCircle2, Plus, Minus, Users, Check,
  UserCheck, Receipt, CreditCard, Sparkles, Volume2,
  Zap, ShoppingBag
} from "lucide-react";
import {
  RESTAURANT_VERTICALS,
  type RestaurantVertical,
  type MenuItem
} from "../../data/appData";
import "./MenuDemo.css";

/* ──────────────────────────────────────────────────────────── */
/* NEW CONCEPT CARABINER CHAIN CONNECTOR (BETWEEN 4 CARDS)      */
/* Modern titanium & emerald carabiner linking pipeline nodes   */
/* ──────────────────────────────────────────────────────────── */
function CarabinerBridge() {
  return (
    <div className="carabiner-bridge" aria-hidden="true">
      <svg width="48" height="28" viewBox="0 0 48 28" fill="none" className="carabiner-bridge-svg">
        <defs>
          <linearGradient id="bridgeMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="bridgeEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* Outer Heavy-Duty Carabiner Ring */}
        <rect
          x="4"
          y="4"
          width="40"
          height="20"
          rx="10"
          stroke="url(#bridgeEmeraldGrad)"
          strokeWidth="4"
        />
        {/* Screw Tension Barrel */}
        <rect
          x="18"
          y="2"
          width="12"
          height="24"
          rx="3"
          fill="#10B981"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        {/* Velocity Pulse Arrow */}
        <path
          d="M22 14 L26 14 M24 12 L26 14 L24 16"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

type RoleDevice = "guest" | "waiter" | "kitchen" | "payment";
type GuestScreen = "menu" | "cart" | "tracking";

interface LiveCartItem {
  item: MenuItem;
  quantity: number;
  note: string;
}

const VERTICAL_FALLBACK_IMAGES: Record<string, string> = {
  military_hotel: "/images/food-spread.jpg",
  cafe: "/images/cafe-ambiance.jpg",
  fine_dining: "/images/fine-dining.jpg",
  qsr: "/images/hero-restaurant.jpg",
};

interface MenuDemoProps {
  onVerticalChange?: (vKey: "military_hotel" | "cafe" | "fine_dining" | "qsr") => void;
  initialVertical?: "military_hotel" | "cafe" | "fine_dining" | "qsr";
}

export default function MenuDemo({ onVerticalChange, initialVertical }: MenuDemoProps = {}) {
  const [verticalKey, setVerticalKey] = useState<"military_hotel" | "cafe" | "fine_dining" | "qsr">(
    initialVertical || "military_hotel"
  );
  const vertical: RestaurantVertical = RESTAURANT_VERTICALS[verticalKey] || RESTAURANT_VERTICALS.military_hotel;

  const [activeRole, setActiveRole] = useState<RoleDevice>("waiter"); // Default to waiter cockpit!

  // Guest view states
  const [guestScreen, setGuestScreen] = useState<GuestScreen>("menu");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<LiveCartItem[]>([
    { item: vertical.items[0], quantity: 2, note: "Medium spice" },
    { item: vertical.items[1] || vertical.items[0], quantity: 1, note: "Extra crispy" }
  ]);
  const [placedOrderItems, setPlacedOrderItems] = useState<LiveCartItem[]>([
    { item: vertical.items[0], quantity: 2, note: "Medium spice" },
    { item: vertical.items[1] || vertical.items[0], quantity: 1, note: "Extra crispy" }
  ]);
  const [orderPunched, setOrderPunched] = useState(true);
  const [orderStage, setOrderStage] = useState<"placed" | "preparing" | "ready" | "served">("preparing");
  const [waiterAlerts, setWaiterAlerts] = useState<string[]>([
    "Table T-04: Water Refill Summoned",
    "Table T-02: Split UPI Bill Requested"
  ]);
  const [selectedCockpitSeat, setSelectedCockpitSeat] = useState<string>("T-04");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function handleVerticalChange(vKey: "military_hotel" | "cafe" | "fine_dining" | "qsr") {
    setVerticalKey(vKey);
    onVerticalChange?.(vKey);
    const newVert = RESTAURANT_VERTICALS[vKey];
    setActiveCategory("all");
    setSearchQuery("");
    setCart([{ item: newVert.items[0], quantity: 1, note: "" }]);
    setPlacedOrderItems([{ item: newVert.items[0], quantity: 1, note: "" }]);
    setOrderPunched(false);
    setOrderStage("placed");
    setGuestScreen("menu");
    showToast(`Switched vertical to ${newVert.name}`);
  }

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  }

  function addToCart(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1, note: "" }];
    });
    showToast(`Added ${item.name} to cart`);
  }

  function removeFromCart(id: string) {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === id);
      if (!existing) return prev;
      if (existing.quantity <= 1) return prev.filter((c) => c.item.id !== id);
      return prev.map((c) =>
        c.item.id === id ? { ...c, quantity: c.quantity - 1 } : c
      );
    });
  }

  function fireOrderKOT() {
    if (cart.length === 0 && placedOrderItems.length === 0) return;
    if (cart.length > 0) {
      setPlacedOrderItems([...cart]);
      setCart([]);
    }
    setOrderPunched(true);
    setOrderStage("preparing");
    setGuestScreen("tracking");
    showToast(`⚡ KOT #TH-402 fired directly to Kitchen KDS!`);
  }

  function callWaiterService(reason: string) {
    setWaiterAlerts((prev) => [`${vertical.tableNumber}: ${reason}`, ...prev]);
    showToast(`🛎️ Steward summoned for "${reason}"`);
  }

  function advanceKitchenStatus() {
    if (orderStage === "placed" || orderStage === "preparing") {
      setOrderStage("ready");
      showToast("🧑‍🍳 Kitchen Pass: Order marked READY! Steward alerted for pickup.");
    } else if (orderStage === "ready") {
      setOrderStage("served");
      showToast("🍽️ Steward served hot food to table!");
    } else {
      setOrderStage("preparing");
    }
  }

  function settleBillPayment() {
    setOrderStage("served");
    showToast("✅ UPI Payment verified! Seat auto-flipped to Vacant (Emerald).");
  }

  const subtotal = cart.reduce((sum, it) => sum + it.item.price * it.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;
  const cartItemCount = cart.reduce((s, it) => s + it.quantity, 0);

  const filteredItems = useMemo(() => {
    let list = activeCategory === "all"
      ? vertical.items
      : vertical.items.filter(it => it.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(it => it.name.toLowerCase().includes(q) || it.description.toLowerCase().includes(q));
    }
    return list;
  }, [vertical, activeCategory, searchQuery]);

  return (
    <div className="cockpit-simulator" role="region" aria-label="Interactive Restaurant OS Simulator">
      {/* Full-bleed ambient background image filling the screen with selected vertical */}
      <div className="cockpit-simulator__bg-wrap" aria-hidden="true">
        <img
          src={VERTICAL_FALLBACK_IMAGES[verticalKey] || "/images/food-spread.jpg"}
          alt={`${vertical.name} Ambiance Background`}
          className="cockpit-simulator__bg-img"
          key={verticalKey}
        />
        <div className="cockpit-simulator__bg-overlay" />
      </div>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="simulator-toast" role="status">
          <Sparkles size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Simulator Top Controls */}
      <div className="simulator-top-bar">
        {/* Restaurant Type Selector */}
        <div className="vertical-selector-group">
          <span className="selector-label">SELECT RESTAURANT FORMAT:</span>
          <div className="vertical-pill-tabs">
            <button
              type="button"
              onClick={() => handleVerticalChange("military_hotel")}
              className={`vertical-tab ${verticalKey === "military_hotel" ? "vertical-tab--active" : ""}`}
            >
              🍗 Military Hotel (Thoogudeepa)
            </button>
            <button
              type="button"
              onClick={() => handleVerticalChange("cafe")}
              className={`vertical-tab ${verticalKey === "cafe" ? "vertical-tab--active" : ""}`}
            >
              ☕ Specialty Cafe
            </button>
            <button
              type="button"
              onClick={() => handleVerticalChange("fine_dining")}
              className={`vertical-tab ${verticalKey === "fine_dining" ? "vertical-tab--active" : ""}`}
            >
              🍷 Fine Dining Lounge
            </button>
            <button
              type="button"
              onClick={() => handleVerticalChange("qsr")}
              className={`vertical-tab ${verticalKey === "qsr" ? "vertical-tab--active" : ""}`}
            >
              ⚡ Fast Casual & QSR
            </button>
          </div>
        </div>

        {/* Device / Role Cockpit Switcher */}
        <div className="role-device-selector">
          <span className="selector-label">SWITCH ACTIVE COCKPIT ROLE:</span>
          <div className="role-tabs">
            <button
              type="button"
              onClick={() => setActiveRole("guest")}
              className={`role-tab ${activeRole === "guest" ? "role-tab--active" : ""}`}
            >
              <Smartphone size={15} />
              <span>1. Guest Mobile (QR)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("waiter")}
              className={`role-tab ${activeRole === "waiter" ? "role-tab--active" : ""}`}
            >
              <UserCheck size={15} />
              <span>2. Waiter Cockpit</span>
              {waiterAlerts.length > 0 && <span className="role-badge pulse-rose">{waiterAlerts.length}</span>}
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("kitchen")}
              className={`role-tab ${activeRole === "kitchen" ? "role-tab--active" : ""}`}
            >
              <ChefHat size={15} />
              <span>3. Kitchen Pass (KDS)</span>
              {orderPunched && <span className="role-badge pulse-emerald">1</span>}
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("payment")}
              className={`role-tab ${activeRole === "payment" ? "role-tab--active" : ""}`}
            >
              <Receipt size={15} />
              <span>4. 15s Table UPI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Frame */}
      <div className="simulator-stage">

        {/* ─────────────────────────────────────────────────────────── */}
        {/* ROLE 1: GUEST SMARTPHONE EXPERIENCE                         */}
        {/* ─────────────────────────────────────────────────────────── */}
        {activeRole === "guest" && (
          <div className="phone-mockup-frame">
            <div className="phone-notch" />
            <div className="phone-inner-screen">
              <div className="guest-header">
                <div className="guest-header__brand">
                  <div>
                    <h3 className="guest-header__title">{vertical.name}</h3>
                    {vertical.kannadaTitle && <span className="guest-header__kannada">{vertical.kannadaTitle}</span>}
                    <div className="guest-header__meta">
                      <span className="table-badge">{vertical.tableNumber}</span>
                      <span className="online-dot" /> Online
                    </div>
                  </div>
                  <div className="guest-header__actions">
                    <button
                      type="button"
                      onClick={() => setGuestScreen(guestScreen === "cart" ? "menu" : "cart")}
                      className="cart-trigger-btn"
                      title="View Cart"
                    >
                      <ShoppingCart size={16} />
                      {guestScreen !== "tracking" && cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                    </button>
                  </div>
                </div>

                {guestScreen === "menu" && (
                  <>
                    <div className="guest-search-bar">
                      <Search size={14} className="text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search biryani, starters, beverages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="guest-search-input"
                      />
                      {searchQuery && <button onClick={() => setSearchQuery("")} className="clear-btn">✕</button>}
                    </div>

                    <div className="guest-categories-scroll">
                      {vertical.categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`cat-pill ${activeCategory === cat.id ? "cat-pill--active" : ""}`}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Guest Menu Screen */}
              {guestScreen === "menu" && (
                <div className="guest-content-scroll">
                  <div className="concierge-call-strip">
                    <span className="concierge-title">Need Table Assistance?</span>
                    <div className="concierge-quick-btns">
                      <button onClick={() => callWaiterService("Water Refill")} className="quick-call-pill">💧 Water</button>
                      <button onClick={() => callWaiterService("Extra Sherva / Gravy")} className="quick-call-pill">🍲 Extra Sherva</button>
                      <button onClick={() => callWaiterService("Cutlery & Napkins")} className="quick-call-pill">🍴 Cutlery</button>
                    </div>
                  </div>

                  <div className="dishes-list">
                    {filteredItems.map((item) => {
                      const cartItem = cart.find((ci) => ci.item.id === item.id);
                      const qty = cartItem ? cartItem.quantity : 0;
                      return (
                        <div key={item.id} className="dish-card">
                          <div className="dish-card__info">
                            <div className="dish-card__badge-row">
                              <span className={`diet-dot ${item.isVeg ? "diet-dot--veg" : "diet-dot--nonveg"}`} />
                              {item.isPopular && (
                                <span className="dum-pill">
                                  {verticalKey === "military_hotel" ? (
                                    <><Flame size={10} /> 82°C DUM (9 left)</>
                                  ) : verticalKey === "cafe" ? (
                                    <>☕ Barista Special</>
                                  ) : verticalKey === "fine_dining" ? (
                                    <>⭐ Chef Signature</>
                                  ) : (
                                    <>⚡ Fast Dispatch</>
                                  )}
                                </span>
                              )}
                            </div>
                            <h4 className="dish-card__name">{item.name}</h4>
                            <p className="dish-card__desc">{item.description}</p>
                            <div className="dish-card__price-row">
                              <span className="dish-price">₹{item.price}</span>
                            </div>
                          </div>
                          <div className="dish-card__media">
                            <img
                              src={item.image || VERTICAL_FALLBACK_IMAGES[verticalKey] || "/images/food-spread.jpg"}
                              alt={item.name}
                              className="dish-img"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = VERTICAL_FALLBACK_IMAGES[verticalKey] || "/images/food-spread.jpg";
                              }}
                            />
                            {qty > 0 ? (
                              <div className="dish-stepper">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromCart(item.id);
                                  }}
                                  className="dish-stepper-btn"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="dish-stepper-count">{qty}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(item);
                                  }}
                                  className="dish-stepper-btn"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(item);
                                }}
                                className="add-btn"
                              >
                                ADD <Plus size={11} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sticky Cart Peek Bar inside Menu Scroll */}
                  {cartItemCount > 0 && (
                    <div className="cart-peek-bar">
                      <div className="cart-peek-info">
                        <span>{cartItemCount} {cartItemCount === 1 ? "ITEM ADDED" : "ITEMS ADDED"}</span>
                        <strong>₹{grandTotal} <small className="text-[10px] text-emerald-100 font-normal">incl. tax</small></strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGuestScreen("cart")}
                        className="view-cart-btn"
                      >
                        <span>View Cart</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Guest Cart Screen */}
              {guestScreen === "cart" && (
                <div className="guest-content-scroll">
                  <div className="screen-sub-nav">
                    <button onClick={() => setGuestScreen("menu")} className="back-link">
                      <ChevronLeft size={16} /> Back to Menu
                    </button>
                    <span className="screen-sub-title">Table KOT Review</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="empty-cart-state py-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 text-slate-400">
                        <ShoppingCart size={22} />
                      </div>
                      <h5 className="text-xs font-bold text-slate-800">Your table cart is empty</h5>
                      <p className="text-[11px] text-slate-500 mb-4">Add fresh items from the menu to punch a KOT.</p>
                      <button onClick={() => setGuestScreen("menu")} className="btn btn--primary btn--sm">
                        + Browse Menu
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="cart-items-container">
                        {cart.map((ci) => (
                          <div key={ci.item.id} className="cart-item-row">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${ci.item.isVeg ? "bg-emerald-500" : "bg-rose-500"}`} />
                                <span className="font-bold text-xs text-slate-800">{ci.item.name}</span>
                              </div>
                              <span className="text-[11px] text-slate-400 font-mono">₹{ci.item.price} × {ci.quantity}</span>
                            </div>
                            <div className="qty-control">
                              <button onClick={() => removeFromCart(ci.item.id)} className="qty-btn">−</button>
                              <span className="qty-count">{ci.quantity}</span>
                              <button onClick={() => addToCart(ci.item)} className="qty-btn">+</button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bill-summary-card">
                        <div className="bill-row">
                          <span>Subtotal:</span>
                          <span className="font-mono">₹{subtotal}</span>
                        </div>
                        <div className="bill-row">
                          <span>GST (5%):</span>
                          <span className="font-mono">₹{gst}</span>
                        </div>
                        <div className="bill-row bill-row--total">
                          <span>Grand Total:</span>
                          <span className="font-mono text-emerald-400 font-black">₹{grandTotal}</span>
                        </div>
                      </div>

                      <button onClick={fireOrderKOT} className="fire-kot-btn">
                        <Flame size={16} /> PUNCH ORDER TO KITCHEN KDS (₹{grandTotal})
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Guest Tracking Screen */}
              {guestScreen === "tracking" && (() => {
                const displayOrderItems = placedOrderItems.length > 0 ? placedOrderItems : cart;
                return (
                  <div className="guest-content-scroll tracking-screen-view">
                    {/* Live Pulse Hero Card */}
                    <div className="tracking-hero-card">
                      <div className="tracking-hero-ring">
                        <span className="hero-pulse-halo" />
                        <div className="hero-icon-bubble">
                          <CheckCircle2 size={26} className="text-emerald-500" />
                        </div>
                      </div>
                      <div className="tracking-status-chip">
                        <span className="live-ping-dot" /> KOT DISPATCHED TO KITCHEN PASS
                      </div>
                      <h3 className="tracking-hero-title">Order #TH-402 Active</h3>
                      <p className="tracking-hero-sub">
                        {vertical.tableNumber} • Est. Prep Time: <strong>8-10 mins</strong>
                      </p>

                      {/* Progress Bar */}
                      <div className="tracking-progress-track">
                        <div
                          className="tracking-progress-fill"
                          style={{ width: orderStage === "served" ? "100%" : orderStage === "ready" ? "80%" : "48%" }}
                        />
                      </div>
                    </div>

                    {/* Connected Visual Pipeline Steps */}
                    <div className="order-pipeline-card">
                      <div className={`pipeline-step ${orderStage !== "placed" ? "pipeline-step--done" : "pipeline-step--active"}`}>
                        <div className="step-indicator">
                          <span className="step-circle"><Check size={11} /></span>
                          <span className="step-line" />
                        </div>
                        <div className="step-content">
                          <div className="step-head">
                            <h5>1. Order Placed at Table</h5>
                            <span className="step-time">13:42 ✓</span>
                          </div>
                          <p>Digitally confirmed by guest QR & synced to Floor Radar</p>
                        </div>
                      </div>

                      <div className={`pipeline-step ${orderStage === "ready" || orderStage === "served" ? "pipeline-step--done" : orderStage === "preparing" ? "pipeline-step--active" : ""}`}>
                        <div className="step-indicator">
                          <span className="step-circle step-circle--pulse"><Flame size={11} /></span>
                          <span className="step-line" />
                        </div>
                        <div className="step-content">
                          <div className="step-head">
                            <h5>2. Wood-Fire Handi Kitchen</h5>
                            <span className="step-badge-live">COOKING IN PASS</span>
                          </div>
                          <p>Handi station steaming Donne Biryani portion at 82°C</p>
                        </div>
                      </div>

                      <div className={`pipeline-step ${orderStage === "served" ? "pipeline-step--done" : orderStage === "ready" ? "pipeline-step--active" : ""}`}>
                        <div className="step-indicator">
                          <span className="step-circle"><Clock size={11} /></span>
                        </div>
                        <div className="step-content">
                          <div className="step-head">
                            <h5>3. Plated & Runner Dispatch</h5>
                            <span className="step-time-est">{orderStage === "ready" ? "READY ON PASS!" : "~4m remaining"}</span>
                          </div>
                          <p>Steward bringing steaming tray directly to {vertical.tableNumber}</p>
                        </div>
                      </div>
                    </div>

                    {/* Ordered Items Summary */}
                    <div className="tracking-items-card">
                      <div className="tracking-items-header">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <ShoppingBag size={13} className="text-emerald-600" /> Punched Items ({displayOrderItems.length})
                        </span>
                        <span className="text-[11px] font-mono font-bold text-emerald-600">₹{grandTotal}</span>
                      </div>
                      <div className="tracking-items-list">
                        {displayOrderItems.map((ci, idx) => (
                          <div key={idx} className="tracking-item-row">
                            <span className="item-qty-badge">{ci.quantity}x</span>
                            <span className="item-title">{ci.item.name}</span>
                            <span className="item-price">₹{ci.item.price * ci.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Table Assistance Concierge */}
                    <div className="tracking-concierge-card">
                      <span className="concierge-sub-label">Need Table Assistance?</span>
                      <div className="concierge-btn-grid">
                        <button type="button" onClick={() => callWaiterService("Water Refill")} className="track-concierge-btn">
                          💧 Water
                        </button>
                        <button type="button" onClick={() => callWaiterService("Extra Sherva")} className="track-concierge-btn">
                          🍲 Extra Gravy
                        </button>
                        <button type="button" onClick={() => callWaiterService("Cutlery & Napkins")} className="track-concierge-btn">
                          🍴 Cutlery
                        </button>
                      </div>
                    </div>

                    {/* Cross-Role Navigation Buttons */}
                    <div className="tracking-cross-actions">
                      <button onClick={() => setActiveRole("waiter")} className="btn btn--secondary btn--sm w-full">
                        👔 View Waiter Cockpit
                      </button>
                      <button onClick={() => setActiveRole("kitchen")} className="btn btn--secondary btn--sm w-full">
                        👨‍🍳 View Kitchen KDS
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="phone-home-indicator" />
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────── */}
        {/* ROLE 2: HIGH-DEF WAITER MOBILE COCKPIT VIEW                 */}
        {/* ─────────────────────────────────────────────────────────── */}
        {activeRole === "waiter" && (
          <div className="waiter-cockpit-view">
            {/* Steward Header Bar */}
            <div className="waiter-header-bar">
              <div className="steward-meta-group">
                <div className="steward-avatar-lg">RK</div>
                <div>
                  <span className="steward-badge-title">FLOOR COMMAND COCKPIT</span>
                  <h4 className="steward-display-name">Ramesh Kumar (#TH-08) · Shift Active</h4>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="shift-chip">● ONLINE (ZONE 1)</span>
                <button
                  type="button"
                  onClick={() => callWaiterService("Table 04 Call")}
                  className="waiter-bell-btn relative"
                  title="Simulate Guest Call"
                >
                  <Bell size={16} />
                  {waiterAlerts.length > 0 && <span className="alert-count-pill">{waiterAlerts.length}</span>}
                </button>
              </div>
            </div>

            {/* Live Service Alerts Strip */}
            {waiterAlerts.length > 0 && (
              <div className="waiter-alerts-panel">
                <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                  <Volume2 size={13} /> Active Diner Calls:
                </span>
                <div className="alerts-stack">
                  {waiterAlerts.map((alt, idx) => (
                    <div key={idx} className="alert-item">
                      <span>🔔 {alt}</span>
                      <button
                        onClick={() => setWaiterAlerts(prev => prev.filter((_, i) => i !== idx))}
                        className="resolve-btn"
                      >
                        ✓ Acknowledge
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10-Seat Interactive Floor Grid Header */}
            <div className="waiter-grid-header">
              <span className="text-xs font-bold text-slate-700">Floor Layout · Zone 1 (Seats T-01 to T-10)</span>
              <div className="legend-items">
                <span className="legend-chip legend-chip--green">● Vacant (5)</span>
                <span className="legend-chip legend-chip--amber">● Dining (4)</span>
                <span className="legend-chip legend-chip--rose">● Bill Req (1)</span>
              </div>
            </div>

            {/* 10-Seat Tile Grid */}
            {(() => {
              const cockpitSeats = [
                { id: "T-01", pax: 2, status: "VACANT", type: "vacant" as const, timer: "Ready", guest: "Ready for Seating", sub: "Cleaned · 2-Top", amount: 0, items: 0 },
                { id: "T-02", pax: 4, status: "BILL REQ", type: "billing" as const, timer: "42m", guest: "Suhas M.", sub: "UPI Stand Active", amount: 1120, items: 3 },
                { id: "T-03", pax: 2, status: "VACANT", type: "vacant" as const, timer: "Ready", guest: "Ready for Seating", sub: "Cleaned · 2-Top", amount: 0, items: 0 },
                { id: "T-04", pax: 4, status: "DINING", type: "occupied" as const, timer: "18m", guest: "Diner Walk-In", sub: "KOT #402 Cooking", amount: grandTotal, items: (placedOrderItems.length || cart.length || 3) },
                { id: "T-05", pax: 6, status: "VACANT", type: "vacant" as const, timer: "Ready", guest: "Ready for Seating", sub: "Family Booth · Clean", amount: 0, items: 0 },
                { id: "T-06", pax: 4, status: "DINING", type: "occupied" as const, timer: "08m", guest: "Praveen S.", sub: "Handi KOT Pass", amount: 640, items: 2 },
                { id: "T-07", pax: 2, status: "VACANT", type: "vacant" as const, timer: "Ready", guest: "Ready for Seating", sub: "Window Table · Clean", amount: 0, items: 0 },
                { id: "T-08", pax: 4, status: "DINING", type: "occupied" as const, timer: "26m", guest: "Kiran R.", sub: "3 Guests · Mains", amount: 920, items: 4 },
                { id: "T-09", pax: 2, status: "VACANT", type: "vacant" as const, timer: "Ready", guest: "Ready for Seating", sub: "Cleaned · 2-Top", amount: 0, items: 0 },
                { id: "T-10", pax: 4, status: "DINING", type: "occupied" as const, timer: "14m", guest: "Deepak V.", sub: "Starters Dispatched", amount: 480, items: 2 },
              ];

              const activeSeat = cockpitSeats.find((s) => s.id === selectedCockpitSeat) || cockpitSeats[3];

              return (
                <>
                  <div className="seats-layout-grid">
                    {cockpitSeats.map((seat) => (
                      <div
                        key={seat.id}
                        onClick={() => setSelectedCockpitSeat(seat.id)}
                        className={`seat-tile ${
                          seat.type === "billing"
                            ? "seat-tile--billing"
                            : seat.type === "occupied"
                            ? "seat-tile--occupied"
                            : "seat-tile--vacant"
                        } ${selectedCockpitSeat === seat.id ? "seat-tile--selected" : ""}`}
                      >
                        {/* Tile Top Head: ID + Pax + Badge */}
                        <div className="seat-tile__head">
                          <div className="flex items-center gap-1.5">
                            <span className="seat-title">{seat.id}</span>
                            <span className="seat-pax-tag"><Users size={9} /> {seat.pax}</span>
                          </div>
                          <span className={`seat-badge ${
                            seat.type === "billing" ? "seat-badge--rose" : seat.type === "occupied" ? "seat-badge--amber" : "seat-badge--green"
                          }`}>
                            <span className="seat-status-dot" />
                            {seat.status}
                          </span>
                        </div>

                        {/* Tile Body: Content based on Type */}
                        <div className="seat-tile__body">
                          {seat.type === "vacant" ? (
                            <div className="seat-vacant-info">
                              <span className="vacant-lead">Ready for seating</span>
                              <span className="vacant-sub">{seat.sub}</span>
                            </div>
                          ) : seat.type === "billing" ? (
                            <div className="seat-billing-info">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="font-bold text-slate-800 truncate">{seat.guest}</span>
                                <span className="font-mono text-slate-500 flex items-center gap-0.5"><Clock size={9} /> {seat.timer}</span>
                              </div>
                              <div className="billing-amount-line">
                                <span className="amount-label">Bill:</span>
                                <span className="amount-val text-rose-600 font-mono">₹{seat.amount}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="seat-occupied-info">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="font-bold text-slate-800 truncate">{seat.guest}</span>
                                <span className="font-mono text-amber-700 flex items-center gap-0.5"><Clock size={9} /> {seat.timer}</span>
                              </div>
                              <div className="occupied-amount-line">
                                <span className="items-chip">{seat.items} items</span>
                                <span className="amount-val text-emerald-700 font-mono">₹{seat.amount}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Tile Action Button */}
                        <div className="seat-tile__action">
                          {seat.type === "billing" ? (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setActiveRole("payment"); }}
                              className="seat-action-btn seat-action-btn--rose"
                            >
                              <CreditCard size={10} /> Settle UPI
                            </button>
                          ) : seat.type === "occupied" ? (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setActiveRole("kitchen"); }}
                              className="seat-action-btn seat-action-btn--amber"
                            >
                              <ChefHat size={10} /> Check KDS
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setActiveRole("guest"); }}
                              className="seat-action-btn seat-action-btn--green"
                            >
                              <Plus size={10} /> Open Menu
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Selected Seat Detailed Control Panel */}
                  <div className="selected-seat-control-card">
                    <div className="seat-control-head">
                      <div className="seat-control-meta">
                        <div className="seat-avatar-badge">{activeSeat.id}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="seat-control-title">Table {activeSeat.id} Management</h4>
                            <span className="seat-capacity-badge">
                              <Users size={11} /> {activeSeat.pax} Guests Max
                            </span>
                          </div>
                          <span className="seat-zone-desc">Floor Radar • Section B • Handi Runner Pass</span>
                        </div>
                      </div>

                      <div className="seat-control-status">
                        <span className={`control-status-pill ${
                          activeSeat.type === "billing" ? "control-status-pill--rose" : activeSeat.type === "occupied" ? "control-status-pill--amber" : "control-status-pill--green"
                        }`}>
                          <span className="pulse-dot" />
                          {activeSeat.type === "billing"
                            ? "UPI PAYMENT PENDING"
                            : activeSeat.type === "occupied"
                            ? "KOT #402 IN FIRE KITCHEN"
                            : "TABLE CLEAN & VACANT"}
                        </span>
                      </div>
                    </div>

                    {/* Metrics 3-Col Row */}
                    <div className="seat-metrics-row">
                      <div className="seat-metric-box">
                        <span className="metric-label">OCCUPANCY STATUS</span>
                        <span className="metric-value font-mono">
                          {activeSeat.type === "vacant" ? "Vacant (0/2)" : activeSeat.type === "billing" ? "Billing (4 Pax)" : "Dining (4 Pax)"}
                        </span>
                      </div>
                      <div className="seat-metric-box">
                        <span className="metric-label">RUNNING BILL AMOUNT</span>
                        <span className="metric-value font-mono text-emerald-600">
                          {activeSeat.amount > 0 ? `₹${activeSeat.amount}` : "₹0.00"}
                        </span>
                      </div>
                      <div className="seat-metric-box">
                        <span className="metric-label">TABLE TURN TIME</span>
                        <span className="metric-value font-mono">
                          {activeSeat.type === "vacant" ? "Ready" : `${activeSeat.timer} seated`}
                        </span>
                      </div>
                    </div>

                    {/* Control Quick Actions */}
                    <div className="seat-control-actions">
                      <button
                        type="button"
                        onClick={() => setActiveRole("guest")}
                        className="btn btn--secondary btn--sm"
                      >
                        <Smartphone size={13} /> Open Table Guest Menu
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveRole("kitchen")}
                        className="btn btn--secondary btn--sm"
                      >
                        <ChefHat size={13} /> Expedite Kitchen KDS
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveRole("payment")}
                        className="btn btn--primary btn--sm"
                      >
                        <CreditCard size={13} /> Launch UPI Payment Stand
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────── */}
        {/* ROLE 3: KITCHEN PASS KDS VIEW                               */}
        {/* ─────────────────────────────────────────────────────────── */}
        {activeRole === "kitchen" && (
          <div className="kitchen-kds-view">
            <div className="kds-header">
              <div className="kds-header__info">
                <span className="kds-station-tag">STATION PASS MONITOR</span>
                <h4 className="kds-station-title">
                  {verticalKey === "cafe"
                    ? "Station 01: Espresso Bar & Cold Craft"
                    : verticalKey === "fine_dining"
                    ? "Station 01: Chef Expediter Pass"
                    : "Station 01: Wood-Fire Handi Dum & Grill"}
                </h4>
              </div>
              <div className="kds-header__controls">
                <span className="kds-clock-chip">
                  <Clock size={11} /> PASS ACTIVE: 13:42:19
                </span>
                <button type="button" onClick={advanceKitchenStatus} className="btn-bump-all">
                  ✓ BUMP NEXT TICKET
                </button>
              </div>
            </div>

            <div className="kds-tickets-board">
              <div className="kds-ticket-card kds-ticket-card--urgent">
                <div className="kds-ticket-head">
                  <span className="ticket-id">TICKET #TH-402 · TABLE {vertical.tableNumber}</span>
                  <span className="ticket-timer ticket-timer--urgent">
                    <Clock size={11} /> 04:12m
                  </span>
                </div>
                <div className="kds-ticket-items">
                  {cart.map((ci, i) => (
                    <div key={i} className="kds-item-row">
                      <span className="kds-item-qty">{ci.quantity}x</span>
                      <span className="kds-item-name">{ci.item.name}</span>
                      {ci.note && <span className="kds-item-note">({ci.note})</span>}
                    </div>
                  ))}
                </div>
                <div className="kds-ticket-footer">
                  <span className={`kds-stage-pill ${orderStage === "ready" ? "kds-stage-pill--ready" : "kds-stage-pill--cooking"}`}>
                    STATUS: {orderStage.toUpperCase()}
                  </span>
                  <button type="button" onClick={advanceKitchenStatus} className="kds-action-btn">
                    {orderStage === "ready" ? "✓ SERVE FOOD" : "BUMP TO PASS"}
                  </button>
                </div>
              </div>

              <div className="kds-ticket-card">
                <div className="kds-ticket-head">
                  <span className="ticket-id">TICKET #TH-401 · TABLE T-02</span>
                  <span className="ticket-timer">
                    <Clock size={11} /> 08:12m
                  </span>
                </div>
                <div className="kds-ticket-items">
                  <div className="kds-item-row">
                    <span className="kds-item-qty">2x</span>
                    <span className="kds-item-name">
                      {verticalKey === "cafe" ? "Classic Cold Brew (Single-Origin)" : "Donne Chicken Biryani"}
                    </span>
                  </div>
                  <div className="kds-item-row">
                    <span className="kds-item-qty">1x</span>
                    <span className="kds-item-name">
                      {verticalKey === "cafe" ? "Almond Butter Croissant" : "Nati Style Chicken Sukka"}
                    </span>
                  </div>
                </div>
                <div className="kds-ticket-footer">
                  <span className="kds-stage-pill kds-stage-pill--ready">STATUS: READY ON PASS</span>
                  <button type="button" onClick={() => showToast("Notified waiter for Seat T-02")} className="kds-action-btn kds-action-btn--ring">
                    RING STEWARD
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────── */}
        {/* ROLE 4: ON-TABLE DYNAMIC UPI PAYMENT                        */}
        {/* ─────────────────────────────────────────────────────────── */}
        {activeRole === "payment" && (
          <div className="payment-checkout-view">
            <div className="payment-card">
              <div className="payment-card__header">
                <span className="chip chip--emerald">INSTANT ON-TABLE CHECKOUT</span>
                <h4 className="payment-card-title">Scan Dynamic UPI Stand</h4>
                <p className="payment-card-sub">{vertical.name} • {vertical.tableNumber}</p>
              </div>

              <div className="qr-box-wrapper">
                <div className="qr-display-box">
                  <QrCode size={130} className="text-slate-900" />
                </div>
                <p className="payment-scan-instruction">
                  Scan with PhonePe, Google Pay, Paytm, or CRED
                </p>
                <div className="upi-app-logos">
                  <span className="upi-badge">PhonePe</span>
                  <span className="upi-badge">Google Pay</span>
                  <span className="upi-badge">Paytm</span>
                  <span className="upi-badge">CRED</span>
                </div>
              </div>

              <div className="payment-amount-box">
                <span className="payment-amount-label">Total Bill Payable</span>
                <span className="payment-amount-val">₹{grandTotal}</span>
                <span className="payment-amount-tax">Includes 2.5% CGST + 2.5% SGST Tax Invoice</span>
              </div>

              <button type="button" onClick={settleBillPayment} className="settle-bill-action-btn">
                <CreditCard size={16} /> SIMULATE CUSTOMER UPI PAYMENT SUCCESS (AUTO-VACATE)
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4 PROPER VISIBLE VELOCITY CARDS CONNECTED VIA CARABINER CHAIN  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="simulator-operational-guide">
        <div className="guide-header">
          <div>
            <div className="guide-badge">
              <Zap size={13} className="text-emerald" />
              <span>4-STAGE SYNCHRONIZED ARCHITECTURE</span>
            </div>
            <h3 className="guide-title">
              How UrQR Powers <span className="type-serif-em">{vertical.name}</span>
            </h3>
          </div>
          <span className="turnover-pill">{vertical.turnoverBoost}</span>
        </div>

        {/* 4 High-Visibility Technical Chassis Cards Connected by Carabiner Links */}
        <div className="conduit-flashcards-pipeline">
          {[
            {
              step: "STEP 01",
              role: "GUEST DINER",
              roleClass: "role-emerald",
              title: "Instant Camera QR Scan",
              desc: "Diners scan the table stand with any phone camera. Zero app install or login friction.",
              metric: "⚡ 1.2s Fast Open",
              guestAction: "Scans stand & browses bilingual menu",
              staffAction: "Zero paper menu distribution",
              kitchenAction: "Portion stock verified in real time",
              handoff: "Transmits KOT to Waiter Cockpit in 0ms ➔"
            },
            {
              step: "STEP 02",
              role: "FLOOR STEWARD",
              roleClass: "role-amber",
              title: "Waiter Mobile POS Grid",
              desc: "Personal phone command center with color-coded 10-seat floor map and haptic vibration chimes.",
              metric: "📱 ₹0 Hardware Cost",
              guestAction: "Summons water/bill via table tap",
              staffAction: "Vibration alerts for service calls",
              kitchenAction: "Receives synchronized order split",
              handoff: "Auto-routes order split to Kitchen KDS ➔"
            },
            {
              step: "STEP 03",
              role: "KITCHEN EXPEDITER",
              roleClass: "role-cyan",
              title: "Chronological Station Pass",
              desc: "FIFO queue splits biryani to handi & starters to tandoor. 1-tap bump alerts server for hot pickup.",
              metric: "⏱️ -6m Prep Saved",
              guestAction: "Sees real-time preparation tracker",
              staffAction: "Receives instant pickup chime",
              kitchenAction: "1-Tap bump to expediter pass",
              handoff: "Signals steward for pickup & readies bill ➔"
            },
            {
              step: "STEP 04",
              role: "SETTLEMENT & TURN",
              roleClass: "role-purple",
              title: "15s Table UPI & 86 Sync",
              desc: "Guests pay on table QR without waiting for cashier. Payment flips seat to Vacant for next party.",
              metric: "💳 15s Table Turn",
              guestAction: "Pays via PhonePe/GPay at seat",
              staffAction: "Zero bill chit delivery walk",
              kitchenAction: "Instant 100ms 86 item stockout",
              handoff: "Auto-flips seat to Vacant (Emerald) ↺"
            }
          ].map((card, idx, arr) => (
            <div key={card.step} className="conduit-card-wrapper">
              <article className="conduit-velocity-card">
                {/* Hardware Corner Rivets */}
                <span className="hardware-rivet hardware-rivet--tl" />
                <span className="hardware-rivet hardware-rivet--tr" />

                {/* Card Top Strip */}
                <div className="conduit-card__top">
                  <span className="conduit-step-num">{card.step}</span>
                  <span className={`conduit-role-badge ${card.roleClass}`}>{card.role}</span>
                </div>

                <h4 className="conduit-card__title">{card.title}</h4>
                <p className="conduit-card__desc">{card.desc}</p>

                {/* Key Performance Metric Chip */}
                <div className="conduit-metric-pill">
                  <span>{card.metric}</span>
                </div>

                {/* Actor Actions Flow */}
                <div className="conduit-actors-list">
                  <div className="actor-row actor-row--guest">
                    <strong>Guest:</strong> <span>{card.guestAction}</span>
                  </div>
                  <div className="actor-row actor-row--staff">
                    <strong>Steward:</strong> <span>{card.staffAction}</span>
                  </div>
                  <div className="actor-row actor-row--kitchen">
                    <strong>Kitchen:</strong> <span>{card.kitchenAction}</span>
                  </div>
                </div>

                {/* Velocity Handoff Pill */}
                <div className="conduit-handoff-pill">
                  <span className="handoff-dot" />
                  <span>{card.handoff}</span>
                </div>
              </article>

              {/* Carabiner Bridge between the 4 cards (desktop/laptop) */}
              {idx < arr.length - 1 && <CarabinerBridge />}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
