import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  FileText,
  Lock,
  Eye,
  Server,
  UserCheck,
  CreditCard,
  Mail,
  MapPin,
  ArrowRight,
  Printer,
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import "./PrivacyPage.css";

const PRIVACY_SECTIONS = [
  { id: "overview", label: "1. Overview & Scope" },
  { id: "information-collected", label: "2. Information We Collect" },
  { id: "how-we-use", label: "3. How We Use Data" },
  { id: "payments-security", label: "4. Payments & UPI Security" },
  { id: "retention-storage", label: "5. Storage & Retention" },
  { id: "third-parties", label: "6. Third-Party Sharing" },
  { id: "user-rights", label: "7. Your DPDP Act Rights" },
  { id: "cookies", label: "8. Cookies & Local Cache" },
  { id: "grievance-officer", label: "9. Grievance Redressal" },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="legal-page">
      {/* Hero Header */}
      <section className="legal-hero">
        <div className="container legal-hero__inner">
          <div className="legal-hero__badge">
            <Shield size={14} className="text-emerald" />
            <span>NELJA TECH ENTERPRISE COMPLIANCE</span>
          </div>

          <h1 className="legal-hero__title">Privacy Policy</h1>
          <p className="legal-hero__subtitle">
            How Nelja Tech Private Limited collects, safeguards, and processes operational and personal data across the UrQR restaurant operating system.
          </p>

          <div className="legal-hero__meta">
            <span className="legal-meta-item">
              <Calendar size={14} />
              <span>Effective Date: October 2026</span>
            </span>
            <span className="legal-meta-item">
              <Building2 size={14} />
              <span>Nelja Tech Private Limited · Bengaluru, India</span>
            </span>
            <span className="legal-meta-item legal-meta-item--badge">
              <CheckCircle2 size={13} />
              <span>DPDP Act 2023 & SPDI Rules 2011 Compliant</span>
            </span>
          </div>

          {/* Quick Switcher Between Legal Docs */}
          <div className="legal-switcher">
            <Link to="/privacy" className="legal-switcher__btn legal-switcher__btn--active">
              <Shield size={16} />
              <span>Privacy Policy</span>
            </Link>
            <Link to="/terms" className="legal-switcher__btn">
              <FileText size={16} />
              <span>Terms of Service</span>
            </Link>
            <button onClick={handlePrint} className="legal-switcher__print-btn" title="Print this policy">
              <Printer size={15} />
              <span>Print Policy</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container legal-layout">
        {/* Sticky Table of Contents Sidebar */}
        <aside className="legal-sidebar" aria-label="Table of contents">
          <div className="legal-sidebar__card">
            <h2 className="legal-sidebar__title">
              <span>Policy Index</span>
            </h2>
            <nav className="legal-sidebar__nav">
              {PRIVACY_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`legal-sidebar__link ${
                    activeSection === sec.id ? "legal-sidebar__link--active" : ""
                  }`}
                >
                  <span>{sec.label}</span>
                </button>
              ))}
            </nav>

            <div className="legal-sidebar__support">
              <p className="legal-sidebar__support-title">Need Legal Clarification?</p>
              <p className="legal-sidebar__support-text">
                Our Bengaluru legal & compliance desk is available for enterprise data agreements.
              </p>
              <a href="mailto:technelja@gmail.com" className="legal-sidebar__support-btn">
                <Mail size={13} />
                <span>technelja@gmail.com</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Legal Document Content */}
        <main className="legal-content" id="main-content">
          {/* Section 1 */}
          <section id="overview" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">01</div>
              <h2 className="legal-card__title">Overview & Corporate Scope</h2>
            </div>
            <div className="legal-card__body">
              <p>
                This Privacy Policy (&quot;<strong>Policy</strong>&quot;) sets forth the practices of{" "}
                <strong>Nelja Tech Private Limited</strong> (&quot;<strong>Nelja Tech</strong>&quot;, &quot;<strong>UrQR</strong>&quot;, &quot;<strong>we</strong>&quot;, &quot;<strong>us</strong>&quot;, or &quot;<strong>our</strong>&quot;), a company incorporated in Bengaluru, Karnataka, India, regarding the collection, use, storage, processing, and disclosure of information obtained from users of our high-velocity restaurant operating system (<strong>UrQR</strong>), tabletop QR digital menus, waiter cockpits, kitchen display stations (KDS), and our corporate portal at{" "}
                <a href="https://neljatech.in/" target="_blank" rel="noopener noreferrer" className="legal-link">
                  https://neljatech.in/ <ExternalLink size={12} />
                </a>.
              </p>

              <div className="legal-callout legal-callout--info">
                <AlertCircle size={18} className="legal-callout__icon" />
                <div className="legal-callout__content">
                  <strong>Indian Regulatory Compliance</strong>
                  <p>
                    This policy is formulated in strict accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (&quot;<strong>SPDI Rules</strong>&quot;), and the Digital Personal Data Protection Act, 2023 (&quot;<strong>DPDP Act</strong>&quot;).
                  </p>
                </div>
              </div>

              <p>
                By accessing, scanning, or utilizing any UrQR tabletop QR stand, staff cockpit, or management terminal, you acknowledge that you have read, understood, and consented to the practices described in this Privacy Policy. If you do not agree with this Policy, please refrain from using our services.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="information-collected" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">02</div>
              <h2 className="legal-card__title">Information We Collect</h2>
            </div>
            <div className="legal-card__body">
              <p>
                UrQR is engineered with a <strong>Zero-Bloat & Privacy-First Architecture</strong>. We only capture data strictly necessary to route dining orders and verify payments at high velocity:
              </p>

              <div className="legal-grid">
                <div className="legal-box">
                  <div className="legal-box__title-row">
                    <Eye size={18} className="text-emerald" />
                    <h3 className="legal-box__title">A. Dining Patrons & Guests</h3>
                  </div>
                  <ul className="legal-list">
                    <li>
                      <strong>Device & Session Telemetry:</strong> Anonymized browser user-agent, operating system, and IP address utilized strictly for rate limiting, DDoS shielding, and fraud detection.
                    </li>
                    <li>
                      <strong>Table Order Data:</strong> Table and seat identifier, selected menu items, spice preferences, timestamp of order placement, and split-bill tokens.
                    </li>
                    <li>
                      <strong>Voluntary Contact Details:</strong> Guest mobile number or email address, captured <em>only if voluntarily entered</em> by the guest for digital e-bill delivery via WhatsApp/SMS or steward concierge call-backs.
                    </li>
                    <li>
                      <strong>Zero App Install:</strong> We never access camera feeds, contacts, photo galleries, or biometric identifiers on the guest&apos;s personal device.
                    </li>
                  </ul>
                </div>

                <div className="legal-box">
                  <div className="legal-box__title-row">
                    <Building2 size={18} className="text-emerald" />
                    <h3 className="legal-box__title">B. Restaurant Merchant Partners & Staff</h3>
                  </div>
                  <ul className="legal-list">
                    <li>
                      <strong>Business Registration:</strong> Registered trade name, GSTIN, FSSAI operating license, outlet address, and authorized signatory contact.
                    </li>
                    <li>
                      <strong>Banking & Settlement Data:</strong> Bank account numbers and IFSC details required for routing merchant tabletop UPI collections via authorized payment aggregators.
                    </li>
                    <li>
                      <strong>Staff Access Credentials:</strong> Staff identifiers, role designations (Manager, Waiter Captain, Chef/KDS), and shift audit trails.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="how-we-use" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">03</div>
              <h2 className="legal-card__title">How We Use Your Information</h2>
            </div>
            <div className="legal-card__body">
              <p>Data processed by UrQR serves specific, lawful operational purposes:</p>

              <div className="legal-table-wrap">
                <table className="legal-table" aria-label="Data usage matrix">
                  <thead>
                    <tr>
                      <th>Processing Purpose</th>
                      <th>Data Utilized</th>
                      <th>Lawful Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Instant Kitchen Routing (KOT)</strong>
                        <p className="table-subtext">Transmitting table orders to Wood-Fire KDS passes under 400ms</p>
                      </td>
                      <td>Table ID, dish item codes, spice customisations</td>
                      <td>Performance of contract (Dining fulfillment)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tabletop Dynamic UPI Generation</strong>
                        <p className="table-subtext">Generating NPCI-compliant dynamic QR payloads for 15s checkout</p>
                      </td>
                      <td>Order total, bill reference token, merchant VPA</td>
                      <td>Performance of contract & Payment processing</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Digital E-Bill Dispatch</strong>
                        <p className="table-subtext">Sending electronic tax receipts via SMS / WhatsApp</p>
                      </td>
                      <td>Guest phone number (when provided), bill breakdown</td>
                      <td>Guest explicit consent</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Operational Velocity Analytics</strong>
                        <p className="table-subtext">Aggregated RevPASH, table turn speed, and stock alerts</p>
                      </td>
                      <td>Anonymized order timestamps and dish velocity counts</td>
                      <td>Legitimate business interest</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="payments-security" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">04</div>
              <h2 className="legal-card__title">Payments & UPI Security Standards</h2>
            </div>
            <div className="legal-card__body">
              <div className="legal-callout legal-callout--success">
                <CreditCard size={18} className="legal-callout__icon" />
                <div className="legal-callout__content">
                  <strong>Zero Payment Credential Storage</strong>
                  <p>
                    Nelja Tech Private Limited and UrQR do <strong>NOT</strong> collect, view, or store payment card numbers, CVVs, card expiry dates, UPI PINs, or netbanking passwords.
                  </p>
                </div>
              </div>

              <p>
                When a dining guest scans or clicks to pay via Google Pay, PhonePe, Paytm, or BHIM, the transaction is handed off directly to RBI-authorized payment aggregators (including Razorpay / Cashfree) and the National Payments Corporation of India (NPCI) UPI rail.
              </p>
              <ul className="legal-list">
                <li>
                  <strong>Dynamic Reference Matching:</strong> Each table bill generates an ephemeral payment reference. Upon successful bank authorization, the payment gateway sends a cryptographically signed webhook to mark the table as settled.
                </li>
                <li>
                  <strong>PCI-DSS Compliance:</strong> Payment gateways integrated into UrQR maintain PCI-DSS Level 1 compliance.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="retention-storage" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">05</div>
              <h2 className="legal-card__title">Data Storage, Localization & Retention</h2>
            </div>
            <div className="legal-card__body">
              <div className="legal-grid legal-grid--two">
                <div className="legal-box">
                  <div className="legal-box__title-row">
                    <Server size={18} className="text-emerald" />
                    <h3 className="legal-box__title">Indian Sovereign Hosting</h3>
                  </div>
                  <p className="legal-box__text">
                    In compliance with Reserve Bank of India (RBI) payment storage directives and the DPDP Act 2023, all production databases, telemetry servers, and log pipelines are hosted in sovereign tier-4 data centers physically located in <strong>India</strong> (AWS Asia Pacific Mumbai / GCP India).
                  </p>
                </div>

                <div className="legal-box">
                  <div className="legal-box__title-row">
                    <Lock size={18} className="text-emerald" />
                    <h3 className="legal-box__title">Rigorous Retention Windows</h3>
                  </div>
                  <p className="legal-box__text">
                    Dining guest session tokens automatically expire within <strong>2 hours</strong> of table closure. Aggregated sales records and GST invoices are retained as mandated by Indian statutory tax regulations (typically 8 years under the CGST Act 2017).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="third-parties" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">06</div>
              <h2 className="legal-card__title">Third-Party Disclosures</h2>
            </div>
            <div className="legal-card__body">
              <p>
                <strong>Nelja Tech does not sell, lease, or monetize customer or restaurant data to any advertising brokers, third-party marketing firms, or data aggregators.</strong>
              </p>
              <p>Data is shared solely with vetted sub-processors for platform operation:</p>
              <ul className="legal-list">
                <li>
                  <strong>Licensed Payment Aggregators:</strong> (e.g., Razorpay, Cashfree) to settle funds to the restaurant merchant account.
                </li>
                <li>
                  <strong>Telecom & Messaging Rails:</strong> (e.g., Gupshup / Twilio) solely for delivering digital receipt SMS/WhatsApp alerts requested by the guest.
                </li>
                <li>
                  <strong>Statutory & Legal Authorities:</strong> Disclosed only when legally mandated by a valid subpoena, court order, or official law enforcement summons under the Code of Criminal Procedure, 1973.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section id="user-rights" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">07</div>
              <h2 className="legal-card__title">Your Rights Under the DPDP Act 2023</h2>
            </div>
            <div className="legal-card__body">
              <p>
                As a Data Principal under the Digital Personal Data Protection Act, 2023, dining guests and restaurant partners have full statutory rights:
              </p>
              <div className="legal-rights-grid">
                <div className="legal-right-item">
                  <UserCheck size={16} className="text-emerald" />
                  <div>
                    <strong>Right to Access:</strong>
                    <span>Obtain a summary of personal data held and processed by Nelja Tech.</span>
                  </div>
                </div>
                <div className="legal-right-item">
                  <UserCheck size={16} className="text-emerald" />
                  <div>
                    <strong>Right to Correction & Erasure:</strong>
                    <span>Request correction of inaccurate information or deletion of personal identifiers.</span>
                  </div>
                </div>
                <div className="legal-right-item">
                  <UserCheck size={16} className="text-emerald" />
                  <div>
                    <strong>Right of Grievance Redressal:</strong>
                    <span>Readily accessible mechanism to resolve data privacy questions.</span>
                  </div>
                </div>
                <div className="legal-right-item">
                  <UserCheck size={16} className="text-emerald" />
                  <div>
                    <strong>Right to Nominate:</strong>
                    <span>Nominate another individual to exercise privacy rights in case of incapacity.</span>
                  </div>
                </div>
              </div>
              <p style={{ marginTop: "16px" }}>
                To exercise any of these rights, email our Grievance Desk at{" "}
                <a href="mailto:technelja@gmail.com" className="legal-link">
                  technelja@gmail.com
                </a>{" "}
                with the subject line &quot;Data Principal Rights Request&quot;.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="cookies" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">08</div>
              <h2 className="legal-card__title">Cookies & Ephemeral Local Storage</h2>
            </div>
            <div className="legal-card__body">
              <p>
                UrQR does <strong>NOT</strong> utilize tracking pixels, cross-site profiling cookies, or behavioral advertising identifiers.
              </p>
              <p>We utilize strictly necessary technical browser storage:</p>
              <ul className="legal-list">
                <li>
                  <strong>Session Storage (Local State):</strong> Retains active table number, dining cart items, and ordering step so that an accidental browser tab reload does not wipe out your pending food order.
                </li>
                <li>
                  <strong>Security Headers:</strong> Strict Content-Security-Policy (CSP), HTTPS HSTS enforcement, and CORS protections prevent cross-site scripting (XSS) and session hijacking.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section id="grievance-officer" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">09</div>
              <h2 className="legal-card__title">Grievance Redressal Officer</h2>
            </div>
            <div className="legal-card__body">
              <p>
                In compliance with Rule 5(9) of the Information Technology (SPDI) Rules, 2011 and Section 8(10) of the DPDP Act 2023, the designated Grievance Redressal Officer for Nelja Tech Private Limited is:
              </p>

              <div className="legal-officer-card">
                <div className="legal-officer-card__icon">
                  <Building2 size={24} className="text-emerald" />
                </div>
                <div className="legal-officer-card__info">
                  <h3 className="legal-officer-card__name">Nelja Tech Grievance & Compliance Desk</h3>
                  <p className="legal-officer-card__company">Nelja Tech Private Limited</p>

                  <div className="legal-officer-card__rows">
                    <div className="legal-officer-row">
                      <Mail size={14} className="text-emerald" />
                      <span>Email:</span>
                      <a href="mailto:technelja@gmail.com" className="legal-link">
                        technelja@gmail.com
                      </a>
                    </div>
                    <div className="legal-officer-row">
                      <MapPin size={14} className="text-emerald" />
                      <span>Location:</span>
                      <span>Bengaluru Innovation Lab, Bengaluru, Karnataka, India</span>
                    </div>
                    <div className="legal-officer-row">
                      <ExternalLink size={14} className="text-emerald" />
                      <span>Official Web:</span>
                      <a href="https://neljatech.in/" target="_blank" rel="noopener noreferrer" className="legal-link">
                        https://neljatech.in/
                      </a>
                    </div>
                  </div>

                  <p className="legal-officer-card__timeline">
                    <em>Statutory Redressal Timeline:</em> Acknowledgement within 24 business hours; full resolution within 15 working days.
                  </p>
                </div>
              </div>

              <div className="legal-footer-nav">
                <Link to="/terms" className="btn btn--primary">
                  <span>Review Terms of Service</span>
                  <ArrowRight size={14} />
                </Link>
                <Link to="/" className="btn btn--secondary">
                  <span>Return to UrQR Home</span>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
