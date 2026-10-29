import { useState } from "react";
import MenuDemo from "../../components/MenuDemo/MenuDemo";
import { Smartphone, ChefHat, UserCheck, Receipt, Sparkles } from "lucide-react";
import "./DemoSection.css";

const VERTICAL_BG_MAP: Record<string, string> = {
  military_hotel: "/images/food-spread.jpg",
  cafe: "/images/cafe-ambiance.jpg",
  fine_dining: "/images/fine-dining.jpg",
  qsr: "/images/hero-restaurant.jpg",
};

export default function DemoSection() {
  const [activeVertical, setActiveVertical] = useState<"military_hotel" | "cafe" | "fine_dining" | "qsr">("military_hotel");

  return (
    <section className="demo-section section" id="interactive-simulator" aria-labelledby="demo-heading">
      {/* Full-bleed background filling the entire screen with selected vertical's ambiance */}
      <div className="demo-section__bg-wrap" aria-hidden="true">
        <img
          src={VERTICAL_BG_MAP[activeVertical] || "/images/food-spread.jpg"}
          alt="Selected Restaurant Vertical Atmosphere"
          className="demo-section__bg-img"
          key={activeVertical}
        />
        <div className="demo-section__bg-overlay" />
      </div>

      <div className="container demo-section__container">
        
        {/* Section Header */}
        <div className="demo-section__header text-center">
          <div className="section-label">
            <Sparkles size={14} className="icon-pulse" />
            INTERACTIVE FLOOR SIMULATOR
          </div>
          <h2 id="demo-heading" className="demo-section__title">
            Test the Entire <span className="gradient-text-emerald">Dining Ecosystem</span> Live.
          </h2>
          <p className="demo-section__sub">
            Switch between <strong>Customer Phone</strong>, <strong>Waiter Cockpit</strong>, <strong>Kitchen Pass KDS</strong>, and <strong>Table UPI Payment</strong>.
            Pick between Thoogudeepa Donne Biryani, Specialty Cafe, or Fine Dining to see the actual operational flow in action.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="demo-section__pills">
          <div className="demo-pill">
            <Smartphone size={14} className="text-emerald" />
            <span>1. Customer punches Donne Biryani</span>
          </div>
          <div className="demo-pill-arrow">→</div>
          <div className="demo-pill">
            <ChefHat size={14} className="text-cyan" />
            <span>2. Kitchen KDS rings ticket</span>
          </div>
          <div className="demo-pill-arrow">→</div>
          <div className="demo-pill">
            <UserCheck size={14} className="text-amber" />
            <span>3. Waiter mobile marks 'Dining'</span>
          </div>
          <div className="demo-pill-arrow">→</div>
          <div className="demo-pill">
            <Receipt size={14} className="text-purple" />
            <span>4. 15s Table UPI settle</span>
          </div>
        </div>

        {/* The Master Simulator Component with Full Desktop Screen Utilization */}
        <div className="demo-section__simulator-wrapper">
          <MenuDemo onVerticalChange={(vKey) => setActiveVertical(vKey)} />
        </div>

      </div>
    </section>
  );
}
