import { Link } from "react-router-dom";
import { QrCode, Mail, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import "./Footer.css";

const PRODUCT_LINKS = [
  { label: "Guest QR Menu Pad", href: "/product#digital-menu" },
  { label: "Waiter Smartphone Cockpit", href: "/product#table-visibility" },
  { label: "Wood-Fire Kitchen KDS", href: "/product#kitchen-workflow" },
  { label: "15s Table Dynamic UPI", href: "/product#qr-ordering" },
  { label: "RevPASH & Velocity Telemetry", href: "/product#analytics" },
];

const SOLUTION_LINKS = [
  { label: "Military Hotels & Donne Biryani", href: "/solutions/military_hotel" },
  { label: "Specialty Cafés & Brew Bars", href: "/solutions/cafe" },
  { label: "Fine Dining & Restobars", href: "/solutions/fine_dining" },
  { label: "Express QSR & Fast Casual", href: "/solutions/qsr" },
  { label: "Multi-Brand Food Courts", href: "/solutions/foodcourt" },
];

const COMPANY_LINKS = [
  { label: "Services & Feature Plans", href: "/services" },
  { label: "How It Works (4-Actor Flow)", href: "/how-it-works" },
  { label: "Interactive Simulator", href: "/#interactive-simulator" },
  { label: "Schedule Outlet Walkthrough", href: "/contact" },
  { label: "Contact Engineering Team", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      {/* Top Banner / Callout Strip */}
      <div className="footer__strip">
        <div className="container footer__strip-inner">
          <div className="footer__strip-text">
            <span className="footer__strip-pulse" />
            <strong>Ready to eliminate peak rush chaos at your restaurant?</strong>
            <span>Model your exact table layout and kitchen pass live in 15 minutes.</span>
          </div>
          <Link to="/contact" className="footer__strip-btn">
            <span>Schedule Live Demo</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="footer__main">
        <div className="footer__inner container">
          {/* Brand column */}
          <div className="footer__brand">
            <div className="footer__brand-header">
              <Link to="/" className="footer__logo" aria-label="UrQR Home">
                <span className="footer__logo-icon">
                  <QrCode size={18} strokeWidth={2.4} />
                </span>
                <span className="footer__logo-text">
                  <span>Ur</span>QR
                </span>
              </Link>

              {/* Official Nelja Tech badge with logo navigating to https://neljatech.in/ */}
              <a
                href="https://neljatech.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__nelja-badge"
                title="Visit Nelja Tech official website (https://neljatech.in/)"
                aria-label="Visit Nelja Tech official website"
              >
                <img
                  src="/nelja_symbol.png"
                  alt="Nelja Tech Logo"
                  className="footer__nelja-img"
                  width="20"
                  height="20"
                />
                <span className="footer__nelja-text">BY NELJA TECH</span>
                <ArrowUpRight size={13} className="footer__nelja-arrow" />
              </a>
            </div>

            <p className="footer__brand-desc">
              The high-velocity restaurant operating system powering Donne Biryani hubs, specialty cafés, and high-tempo dining rooms with 1.2s camera scan ordering and 15s Table UPI checkout.
            </p>

            <div className="footer__status-badge">
              <span className="footer__pulse-dot" />
              <span>UrQR Core v2.4 · Bengaluru Telemetry Active</span>
            </div>

            <div className="footer__contact">
              <a
                href="https://maps.app.goo.gl/ovDBfpwPSeNXfcpk9"
                className="footer__contact-item footer__contact-item--link"
                target="_blank"
                rel="noreferrer"
              >
                <div className="footer__contact-icon">
                  <MapPin size={13} className="text-emerald" />
                </div>
                <span>Bengaluru Innovation Lab · Google Maps</span>
                <ArrowUpRight size={12} className="footer__link-arrow" />
              </a>
              <a href="mailto:technelja@gmail.com" className="footer__contact-item footer__contact-item--link">
                <div className="footer__contact-icon">
                  <Mail size={13} className="text-emerald" />
                </div>
                <span>technelja@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="footer__nav">
            <div className="footer__col">
              <h3 className="footer__col-title">
                <span>Product Engines</span>
              </h3>
              <ul className="footer__links">
                {PRODUCT_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="footer__link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__col-title">
                <span>Vertical Blueprints</span>
              </h3>
              <ul className="footer__links">
                {SOLUTION_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="footer__link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__col-title">
                <span>Ecosystem</span>
              </h3>
              <ul className="footer__links">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="footer__link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner container">
          <div className="footer__copy">
            © {year}{" "}
            <a
              href="https://neljatech.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__nelja-copy-link"
              title="Visit Nelja Tech official website"
            >
              Nelja Tech Private Limited
            </a>
            . All rights reserved. Built for high-velocity Indian dining.
          </div>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">
              Privacy Policy
            </Link>
            <span className="footer__dot-sep">·</span>
            <Link to="/terms" className="footer__legal-link">
              Terms of Service
            </Link>
            <span className="footer__dot-sep">·</span>
            <span className="footer__sub-badge">
              <ShieldCheck size={12} className="text-emerald" />
              <span>100% Native Web · Zero App Install</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
