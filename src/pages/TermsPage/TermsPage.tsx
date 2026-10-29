import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Shield,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  Mail,
  MapPin,
  ArrowRight,
  Printer,
  ExternalLink,
  Ban,
  Clock,
} from "lucide-react";
import "./TermsPage.css";

const TERMS_SECTIONS = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "platform-scope", label: "2. Platform Role & Scope" },
  { id: "merchant-obligations", label: "3. Merchant Obligations" },
  { id: "guest-conduct", label: "4. Guest Responsibilities" },
  { id: "orders-payments", label: "5. Orders & UPI Payments" },
  { id: "cancellations-refunds", label: "6. Cancellations & Refunds" },
  { id: "intellectual-property", label: "7. Intellectual Property" },
  { id: "availability-disclaimer", label: "8. Availability & Disclaimers" },
  { id: "liability-indemnity", label: "9. Limitation of Liability" },
  { id: "governing-law", label: "10. Governing Law & Disputes" },
  { id: "contact-support", label: "11. Contact & Grievance Desk" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

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
            <Scale size={14} className="text-emerald" />
            <span>NELJA TECH OPERATIONAL TERMS</span>
          </div>

          <h1 className="legal-hero__title">Terms of Service</h1>
          <p className="legal-hero__subtitle">
            The legal terms and conditions governing the use of the UrQR restaurant operating system, tabletop QR ordering services, and merchant tools.
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
              <span>Information Technology Act, 2000 Compliant</span>
            </span>
          </div>

          {/* Quick Switcher Between Legal Docs */}
          <div className="legal-switcher">
            <Link to="/privacy" className="legal-switcher__btn">
              <Shield size={16} />
              <span>Privacy Policy</span>
            </Link>
            <Link to="/terms" className="legal-switcher__btn legal-switcher__btn--active">
              <FileText size={16} />
              <span>Terms of Service</span>
            </Link>
            <button onClick={handlePrint} className="legal-switcher__print-btn" title="Print these terms">
              <Printer size={15} />
              <span>Print Terms</span>
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
              <span>Terms Index</span>
            </h2>
            <nav className="legal-sidebar__nav">
              {TERMS_SECTIONS.map((sec) => (
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
              <p className="legal-sidebar__support-title">Enterprise Contracts?</p>
              <p className="legal-sidebar__support-text">
                For custom franchise agreements or master service contracts (MSA), reach out directly:
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
          <section id="acceptance" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">01</div>
              <h2 className="legal-card__title">Acceptance of Terms</h2>
            </div>
            <div className="legal-card__body">
              <p>
                These Terms of Service (&quot;<strong>Terms</strong>&quot;) constitute a legally binding agreement between you (&quot;<strong>User</strong>&quot;, &quot;<strong>you</strong>&quot;, whether as a dining guest, restaurant outlet owner, manager, or staff operator) and <strong>Nelja Tech Private Limited</strong> (&quot;<strong>Nelja Tech</strong>&quot;, &quot;<strong>UrQR</strong>&quot;, &quot;<strong>we</strong>&quot;, &quot;<strong>us</strong>&quot;, or &quot;<strong>our</strong>&quot;), an Indian technology corporation headquartered in Bengaluru, Karnataka, India.
              </p>
              <p>
                By scanning an UrQR tabletop QR code, placing food orders, utilizing the Waiter Smartphone Cockpit, managing a Wood-Fire KDS, or accessing our software via{" "}
                <a href="https://neljatech.in/" target="_blank" rel="noopener noreferrer" className="legal-link">
                  https://neljatech.in/ <ExternalLink size={12} />
                </a>, you signify your full agreement to be bound by these Terms and our companion <Link to="/privacy" className="legal-link">Privacy Policy</Link>.
              </p>
              <div className="legal-callout legal-callout--info">
                <AlertTriangle size={18} className="legal-callout__icon" />
                <div className="legal-callout__content">
                  <strong>Notice of Legal Capacity</strong>
                  <p>
                    If you are agreeing to these Terms on behalf of a dining establishment, enterprise restaurant group, or franchise entity, you represent and warrant that you hold the legal authority to bind such entity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="platform-scope" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">02</div>
              <h2 className="legal-card__title">Platform Role & Intermediary Status</h2>
            </div>
            <div className="legal-card__body">
              <p>
                UrQR is a cloud-native technology platform engineered to facilitate table management, digital menu presentation, kitchen order routing, and tabletop UPI settlements for restaurants, cafés, and food outlets.
              </p>

              <div className="legal-box" style={{ margin: "16px 0" }}>
                <h3 className="legal-box__title" style={{ marginBottom: "8px" }}>
                  Intermediary Status Under Section 79 of the Information Technology Act, 2000:
                </h3>
                <p className="legal-box__text">
                  Nelja Tech Private Limited operates strictly as a <strong>technology intermediary</strong>. Nelja Tech does <strong>not</strong> operate commercial kitchens, prepare food dishes, brew beverages, or determine menu pricing. The respective restaurant merchant partner holds sole and exclusive legal responsibility for:
                </p>
                <ul className="legal-list" style={{ marginTop: "10px", marginBottom: "0" }}>
                  <li>Food preparation, freshness, taste, hygiene, and kitchen safety.</li>
                  <li>Accurate allergen warnings, dietary categorisations (Veg / Non-Veg / Halal / Jain), and nutritional information.</li>
                  <li>Physical dining room hospitality, table turnover speed, and steward conduct.</li>
                  <li>Compliance with the Food Safety and Standards Act, 2006 (FSSAI).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="merchant-obligations" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">03</div>
              <h2 className="legal-card__title">Merchant Partner Obligations</h2>
            </div>
            <div className="legal-card__body">
              <p>
                Restaurant establishments utilizing UrQR Pro or UrQR Max enterprise tiers covenant and agree to:
              </p>
              <ul className="legal-list">
                <li>
                  <strong>Valid Licensing:</strong> Maintain a current, active FSSAI food operating license, local trade license, and valid GST registration certificate throughout their operational tenure.
                </li>
                <li>
                  <strong>Menu & Pricing Accuracy:</strong> Accurately list menu item prices in Indian National Rupees (INR), inclusive of or clearly detailing applicable CGST/SGST and optional service charges prior to checkout.
                </li>
                <li>
                  <strong>Real-Time Stock Integrity:</strong> Promptly flag out-of-stock items or depleted handi portions via the Manager Cockpit to prevent dining patron frustration.
                </li>
                <li>
                  <strong>Staff Security:</strong> Safeguard administrative credentials and ensure that staff passwords and PIN codes are promptly revoked upon employee separation.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section id="guest-conduct" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">04</div>
              <h2 className="legal-card__title">Dining Guest Responsibilities & Conduct</h2>
            </div>
            <div className="legal-card__body">
              <p>
                When scanning and placing orders through UrQR tabletop QR codes, dining patrons agree:
              </p>
              <div className="legal-grid legal-grid--two">
                <div className="legal-box">
                  <div className="legal-box__title-row">
                    <CheckCircle2 size={18} className="text-emerald" />
                    <h3 className="legal-box__title">Lawful Use & Settlement</h3>
                  </div>
                  <ul className="legal-list">
                    <li>Select the correct table/seat corresponding to your physical seating.</li>
                    <li>Settle the total dining bill for all confirmed orders dispatched to the kitchen.</li>
                    <li>Communicate any severe food allergies directly with restaurant floor captains.</li>
                  </ul>
                </div>

                <div className="legal-box">
                  <div className="legal-box__title-row">
                    <Ban size={18} className="text-emerald" />
                    <h3 className="legal-box__title">Prohibited Conduct</h3>
                  </div>
                  <ul className="legal-list">
                    <li>Tampering with, altering, or swapping physical tabletop QR stands.</li>
                    <li>Attempting automated scraping, SQL injection, or denial-of-service (DDoS) against UrQR endpoints.</li>
                    <li>Submitting fraudulent orders or abusing steward call buzzers.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="orders-payments" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">05</div>
              <h2 className="legal-card__title">Orders, Dynamic UPI & Settlement Protocol</h2>
            </div>
            <div className="legal-card__body">
              <p>
                UrQR delivers sub-second order transmission and frictionless 15-second table checkout:
              </p>
              <ul className="legal-list">
                <li>
                  <strong>Order Finality:</strong> When a dining guest taps &quot;Fire Order&quot; or confirms their cart, the Kitchen Order Ticket (KOT) is transmitted instantaneously to the kitchen display screen.
                </li>
                <li>
                  <strong>Tabletop Dynamic UPI:</strong> UrQR generates dynamic, single-use UPI intent links and QR codes with encoded bill amounts, merchant Virtual Payment Addresses (VPAs), and unique transaction tokens.
                </li>
                <li>
                  <strong>Currency & Aggregators:</strong> All transactions are executed in Indian Rupees (INR) via RBI-authorized payment aggregators (Razorpay / Cashfree) and NPCI unified rails. Funds are settled directly to the restaurant merchant&apos;s verified bank account.
                </li>
                <li>
                  <strong>Tax Invoices:</strong> Final tax receipts (E-Bills) reflecting CGST, SGST, and restaurant GSTIN are generated on behalf of the restaurant merchant.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section id="cancellations-refunds" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">06</div>
              <h2 className="legal-card__title">Cancellations & Refunds Policy</h2>
            </div>
            <div className="legal-card__body">
              <div className="legal-callout legal-callout--info">
                <Clock size={18} className="legal-callout__icon" />
                <div className="legal-callout__content">
                  <strong>Food Preparation Cancellation Rule</strong>
                  <p>
                    Because food preparation begins immediately upon order dispatch to ensure peak freshness, orders cannot be cancelled or modified by guests once the kitchen station has accepted the ticket, except at the explicit discretion of the restaurant floor manager.
                  </p>
                </div>
              </div>

              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "16px 0 8px", color: "#1C1B18" }}>
                Refund Eligibility & Payment Resolution:
              </h3>
              <ul className="legal-list">
                <li>
                  <strong>Technical Double Deduction:</strong> In the rare event of a duplicate UPI charge or account deduction without order receipt generation due to network latency, the payment aggregator&apos;s automated reconciliation engine refunds the duplicate amount to the original source bank account within 3 to 5 banking days.
                </li>
                <li>
                  <strong>Operational Food Disputes:</strong> Any dispute concerning food quality, portion size, delays, or incorrect preparation must be settled directly with restaurant management on premises.
                </li>
                <li>
                  <strong>Escalation Support:</strong> If a merchant refuses to resolve a valid technical billing discrepancy, customers may contact Nelja Tech customer desk at{" "}
                  <a href="mailto:technelja@gmail.com" className="legal-link">
                    technelja@gmail.com
                  </a>{" "}
                  with proof of payment for technical dispute mediation.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section id="intellectual-property" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">07</div>
              <h2 className="legal-card__title">Intellectual Property Rights</h2>
            </div>
            <div className="legal-card__body">
              <p>
                The UrQR platform, including all software code, proprietary radar floor mapping engines, 10-seat smart cockpit workflows, UI/UX aesthetics, graphics, and official trademarks (&quot;<strong>UrQR</strong>&quot;, &quot;<strong>Nelja Tech</strong>&quot;), are the exclusive intellectual property of <strong>Nelja Tech Private Limited</strong> and are protected under the Indian Copyright Act, 1957, Trade Marks Act, 1999, and applicable international treaties.
              </p>
              <p>
                Restaurant partners retain full ownership of their respective registered trade names, food photography, and proprietary recipes. Merchants grant Nelja Tech a limited, royalty-free license to render such assets within the digital menu interfaces for the duration of the operational subscription.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="availability-disclaimer" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">08</div>
              <h2 className="legal-card__title">Service Availability & Disclaimers</h2>
            </div>
            <div className="legal-card__body">
              <p>
                Nelja Tech maintains high-availability cloud infrastructure targeting <strong>99.9% operational uptime</strong>. However, the software is provided on an &quot;<strong>AS IS</strong>&quot; and &quot;<strong>AS AVAILABLE</strong>&quot; basis.
              </p>
              <ul className="legal-list">
                <li>
                  <strong>External Network Outages:</strong> Nelja Tech is not liable for disruptions resulting from local internet service provider (ISP) drops, cellular carrier congestion, or client device hardware defects.
                </li>
                <li>
                  <strong>Banking Rail Maintenance:</strong> Temporary downtimes on third-party NPCI UPI switches, partner bank servers, or payment gateways are outside our direct control.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section id="liability-indemnity" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">09</div>
              <h2 className="legal-card__title">Limitation of Liability & Indemnification</h2>
            </div>
            <div className="legal-card__body">
              <p>
                To the fullest extent permissible under applicable Indian law, neither Nelja Tech Private Limited nor its directors, officers, employees, or affiliates shall be held liable for any indirect, incidental, punitive, or consequential damages, including loss of profits, goodwill, or operational data arising out of the use or inability to use the platform.
              </p>
              <p>
                In any circumstance, Nelja Tech&apos;s total aggregate liability arising under contract or tort shall be capped at the total software subscription fees actually paid by the merchant partner to Nelja Tech in the one (1) month immediately preceding the event giving rise to liability.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="governing-law" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">10</div>
              <h2 className="legal-card__title">Governing Law & Dispute Resolution</h2>
            </div>
            <div className="legal-card__body">
              <p>
                These Terms of Service and any contractual relationship hereunder shall be governed by, interpreted, and construed in accordance with the substantive <strong>laws of the Republic of India</strong>, without giving effect to conflict of law principles.
              </p>
              <p>
                Any dispute, controversy, or claim arising out of or relating to these Terms shall first be attempted to be resolved amicably through mutual negotiations within thirty (30) days. Failing amicable resolution, the dispute shall be subject to the exclusive jurisdiction of the competent civil courts situated at <strong>Bengaluru, Karnataka, India</strong>.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section id="contact-support" className="legal-card">
            <div className="legal-card__header">
              <div className="legal-card__num">11</div>
              <h2 className="legal-card__title">Contact & Enterprise Support Desk</h2>
            </div>
            <div className="legal-card__body">
              <p>
                For questions regarding these Terms of Service, partnership inquiries, or legal clarifications, contact Nelja Tech Private Limited:
              </p>

              <div className="legal-officer-card">
                <div className="legal-officer-card__icon">
                  <Building2 size={24} className="text-emerald" />
                </div>
                <div className="legal-officer-card__info">
                  <h3 className="legal-officer-card__name">Nelja Tech Legal Operations Desk</h3>
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
                      <span>Headquarters:</span>
                      <span>Bengaluru Innovation Lab, Bengaluru, Karnataka, India</span>
                    </div>
                    <div className="legal-officer-row">
                      <ExternalLink size={14} className="text-emerald" />
                      <span>Corporate Portal:</span>
                      <a href="https://neljatech.in/" target="_blank" rel="noopener noreferrer" className="legal-link">
                        https://neljatech.in/
                      </a>
                    </div>
                  </div>

                  <p className="legal-officer-card__timeline">
                    <em>Direct Hotline:</em> Available Monday through Saturday, 9:00 AM to 7:00 PM IST.
                  </p>
                </div>
              </div>

              <div className="legal-footer-nav">
                <Link to="/privacy" className="btn btn--primary">
                  <span>Review Privacy Policy</span>
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
