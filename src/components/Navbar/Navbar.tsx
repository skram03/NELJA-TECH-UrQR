import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, QrCode, ChevronRight, ArrowRight } from "lucide-react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Product OS", href: "/product" },
  { label: "Restaurant Verticals", href: "/solutions" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services", href: "/services" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} role="banner">
        <div className="navbar__inner container">
          {/* Logo with Nelja Tech Badge */}
          <Link to="/" className="navbar__logo" aria-label="UrQR Home">
            <span className="navbar__logo-icon">
              <QrCode size={18} strokeWidth={2.5} />
            </span>
            <div className="navbar__logo-text-wrap">
              <span className="navbar__logo-text">
                <span className="navbar__logo-ur">Ur</span>QR
              </span>
              <span className="navbar__logo-tag">BY NELJA TECH</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Live Outlet Indicator & Action CTA */}
          <div className="navbar__actions">
            <div className="navbar__live-indicator">
              <span className="navbar__live-dot" />
              <span>Live in 12+ Outlets</span>
            </div>
            <Link to="/contact" className="btn btn--primary btn--sm" id="nav-book-demo">
              Book a Demo <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            className="navbar__mobile-toggle"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`mobile-nav ${mobileOpen ? "mobile-nav--open" : ""}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav__inner">
          <div className="mobile-nav__badge">
            <span className="navbar__live-dot" />
            <span>UrQR Restaurant OS · Live in Bengaluru</span>
          </div>

          <nav className="mobile-nav__links" aria-label="Mobile navigation links">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `mobile-nav__link ${isActive ? "mobile-nav__link--active" : ""}`
                }
              >
                <span>{link.label}</span>
                <ChevronRight size={16} className="mobile-nav__chevron" />
              </NavLink>
            ))}
          </nav>

          <div className="mobile-nav__cta">
            <Link to="/contact" className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
              Book an Outlet Demo <ArrowRight size={15} />
            </Link>
            <Link to="/#interactive-simulator" className="btn btn--secondary" style={{ width: "100%", justifyContent: "center" }}>
              Test Live Simulator
            </Link>
          </div>

          <p className="mobile-nav__footer">UrQR by Nelja Tech • Serving High-Velocity Restaurants</p>
        </div>
      </div>

      {/* Backdrop overlay */}
      {mobileOpen && (
        <div
          className="mobile-nav__overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Exact Spacer to guarantee no page jump or header clipping */}
      <div className="navbar__spacer" aria-hidden="true" />
    </>
  );
}
