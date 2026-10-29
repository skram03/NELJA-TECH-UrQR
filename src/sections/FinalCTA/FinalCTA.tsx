import { Link } from "react-router-dom";
import { CalendarCheck, Sparkles, Flame, CheckCircle2, ArrowRight } from "lucide-react";
import "./FinalCTA.css";

export default function FinalCTA() {
  return (
    <section className="final-cta section" aria-labelledby="cta-heading">
      {/* Background image with obsidian overlay */}
      <div className="final-cta__bg" aria-hidden="true">
        <img
          src="/images/fine-dining.jpg"
          alt=""
          className="final-cta__bg-img"
          loading="lazy"
        />
        <div className="final-cta__bg-overlay" />
      </div>

      <div className="container">
        <div className="final-cta__inner">
          <div className="final-cta__content">
            <div className="final-cta__eyebrow">
              <Sparkles size={14} className="text-emerald" />
              <span>TEST-DRIVE ON YOUR OWN FLOOR</span>
            </div>
            <h2 id="cta-heading" className="final-cta__title">
              Ready to turn tables 38% faster this weekend?
            </h2>
            <p className="final-cta__sub">
              Book a live 15-minute walkthrough. We'll set up your actual restaurant menu, demo the 10-seat waiter smartphone map, and simulate your kitchen pass fire live.
            </p>
            <div className="final-cta__actions">
              <Link to="/contact" className="btn btn--primary btn--lg" id="final-book-demo">
                <CalendarCheck size={18} />
                Book Outlet Demo
              </Link>
              <Link to="/product" className="btn btn--secondary btn--lg">
                Explore Full Tech Specs <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="final-cta__trust">
              {[
                "Zero hardware lock-in (uses staff smartphones)",
                "Full menu digitization in 24 hours",
                "Dedicated Nelja Tech local onboarding support"
              ].map((t, i) => (
                <span key={i} className="final-cta__trust-item">
                  <CheckCircle2 size={15} className="text-emerald" />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Decorative Live Simulation Card */}
          <div className="final-cta__card" aria-hidden="true">
            <div className="final-cta__card-head">
              <div className="final-cta__brand-tag">
                <Flame size={14} className="text-amber" />
                <span>THOOGUDEEPA HUB · LIVE TELEMETRY</span>
              </div>
              <span className="chip chip--emerald">KDS ACTIVE</span>
            </div>

            <div className="final-cta__table-line">
              {["SEAT 01", "SEAT 02", "SEAT 03", "SEAT 04", "SEAT 05", "SEAT 06"].map((t, idx) => (
                <div
                  key={t}
                  className={"final-cta__table-chip " + (idx === 3 ? "is-active" : idx === 1 ? "is-bill" : "")}
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="final-cta__order-preview">
              <div className="final-cta__order-item">
                <span>1× Mutton Donne Biryani (Extra Sherva)</span>
                <b>₹320</b>
              </div>
              <div className="final-cta__order-item">
                <span>1× Chicken Sukka Fry (Spicy)</span>
                <b>₹240</b>
              </div>
              <div className="final-cta__order-item">
                <span>2× Nannari Sherbet with Chia</span>
                <b>₹120</b>
              </div>
              <div className="final-cta__order-total">
                <span>Total Bill (Incl. GST)</span>
                <b>₹714</b>
              </div>
            </div>

            <div className="final-cta__status-bar">
              <span className="final-cta__status-dot" />
              <span>Seat 04 · KOT fired 03:42 ago · Dispatched to Handi Station</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
