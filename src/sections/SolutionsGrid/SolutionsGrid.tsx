import { Link } from "react-router-dom";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { SOLUTIONS } from "../../data/appData";
import "./SolutionsGrid.css";

interface SolutionVisual {
  bg: string;
  img: string;
  iconTag: string;
  hangerColor: string;
  hangerGlow: string;
}

const SOLUTION_VISUALS: Record<string, SolutionVisual> = {
  military_hotel: {
    bg: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
    img: "/images/food-spread.jpg",
    iconTag: "DONNE BIRYANI & MILITARY",
    hangerColor: "#D97706", // Rich Warm Amber
    hangerGlow: "rgba(217, 119, 6, 0.25)",
  },
  cafe: {
    bg: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
    img: "/images/cafe-ambiance.jpg",
    iconTag: "ARTISAN CAFE & BREW BAR",
    hangerColor: "#0284C7", // Vibrant Ocean Cyan
    hangerGlow: "rgba(2, 132, 199, 0.25)",
  },
  fine_dining: {
    bg: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)",
    img: "/images/fine-dining.jpg",
    iconTag: "FINE DINING & RESTOBAR",
    hangerColor: "#7C3AED", // Royal Violet Purple
    hangerGlow: "rgba(124, 58, 237, 0.25)",
  },
  qsr: {
    bg: "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
    img: "/images/hero-restaurant.jpg",
    iconTag: "EXPRESS QSR & FOOD COURT",
    hangerColor: "#DC2626", // Vivid Crimson Scarlet
    hangerGlow: "rgba(220, 38, 38, 0.25)",
  },
  cloud: {
    bg: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
    img: "/images/kitchen-team.jpg",
    iconTag: "CLOUD KITCHEN DISPATCH",
    hangerColor: "#059669", // Emerald Mint
    hangerGlow: "rgba(5, 150, 105, 0.25)",
  },
  chain: {
    bg: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
    img: "/images/fine-dining.jpg",
    iconTag: "MULTI-OUTLET RESTAURANT CHAIN",
    hangerColor: "#2563EB", // Electric Royal Blue
    hangerGlow: "rgba(37, 99, 235, 0.25)",
  },
  foodcourt: {
    bg: "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
    img: "/images/cafe-ambiance.jpg",
    iconTag: "MULTI-VENDOR FOOD COURT",
    hangerColor: "#DB2777", // Rose Pink
    hangerGlow: "rgba(219, 39, 119, 0.25)",
  },
};

export default function SolutionsGrid() {
  return (
    <section className="solutions-grid section" id="solutions" aria-labelledby="solutions-heading">
      <div className="container">
        <div className="solutions-grid__header">
          <div className="section-label">
            <Sparkles size={14} className="icon-pulse" />
            Specialized Hospitality Verticals
          </div>
          <h2 id="solutions-heading" className="solutions-grid__title">
            Tailored operating architectures <br className="hidden-mobile" />
            for how you serve.
          </h2>
          <p className="solutions-grid__sub">
            From wood-fire Donne Biryani rushes to quiet artisanal pour-over bars, UrQR adapts its seat map, station routing, and billing mechanics to your operational reality.
          </p>
        </div>

        <div className="solutions-grid__cards">
          {SOLUTIONS.map((sol, index) => {
            const visual = SOLUTION_VISUALS[sol.id] || {
              bg: "linear-gradient(135deg, #FAF9F6 0%, #F0EFE9 100%)",
              img: "/images/hero-restaurant.jpg",
              iconTag: "RESTAURANT OS",
              hangerColor: "#059669",
              hangerGlow: "rgba(5, 150, 105, 0.25)",
            };

            const isLower = index % 2 === 1;

            return (
              <Link
                to={"/solutions/" + sol.id}
                key={sol.id}
                className={`sol-hanging-unit ${isLower ? "sol-hanging-unit--lower" : "sol-hanging-unit--upper"}`}
                style={{
                  "--hanger-color": visual.hangerColor,
                  "--hanger-glow": visual.hangerGlow,
                } as React.CSSProperties}
                aria-label={sol.name + " vertical blueprint"}
              >
                {/* Hanger Apparatus */}
                <div className="sol-hanger-mount" aria-hidden="true">
                  {/* Subtle mounting peg */}
                  <div className="sol-hanger-peg" />

                  {/* Question Mark Clothes Hanger SVG */}
                  <div className="sol-hanger-graphic">
                    <svg
                      viewBox="0 0 160 90"
                      className="sol-hanger-svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      {/* Top Question Mark Hook Curve */}
                      <path
                        d="M 70 19 C 69 11 74 7 81 7 C 88 7 93 11 92 18 C 91 23 81 24 81 29"
                        stroke="var(--hanger-color)"
                        strokeWidth="4.2"
                        strokeLinecap="round"
                        fill="none"
                        className="sol-hanger-hook-stem"
                      />
                      {/* Question Mark Hook Dot */}
                      <circle
                        cx="81"
                        cy="35.5"
                        r="2.5"
                        fill="var(--hanger-color)"
                        className="sol-hanger-hook-dot"
                      />
                      {/* Triangular Clothes Hanger Wireframe Frame */}
                      <path
                        d="M 80 43 L 22 72 C 15 76 15 84 21 86 C 25 87 30 87 36 87 L 124 87 C 130 87 135 87 139 86 C 145 84 145 76 138 72 L 80 43 Z"
                        stroke="var(--hanger-color)"
                        strokeWidth="4.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className="sol-hanger-frame"
                      />
                    </svg>

                    {/* Hanger metal clips holding top of card */}
                    <div className="sol-hanger-clips">
                      <span className="sol-hanger-clip" />
                      <span className="sol-hanger-clip" />
                    </div>
                  </div>
                </div>

                {/* Card Container — Clean White Theme */}
                <div className="sol-card">
                  {/* Visual header */}
                  <div className="sol-card__visual">
                    <img
                      src={visual.img}
                      alt={sol.name}
                      className="sol-card__visual-img"
                      loading="lazy"
                    />
                    <div className="sol-card__visual-overlay" />
                    <div className="sol-card__tag-pill">
                      <span>{visual.iconTag}</span>
                    </div>
                    <div className="sol-card__turnover-badge">
                      <Flame size={12} className="text-amber" />
                      <span>{sol.turnoverStat}</span>
                    </div>
                  </div>

                  {/* Card body — High Contrast Light Surface */}
                  <div className="sol-card__body">
                    <div className="sol-card__top">
                      <h3 className="sol-card__name">{sol.name}</h3>
                      <span className="chip chip--emerald">{sol.tag}</span>
                    </div>
                    <p className="sol-card__headline">{sol.headline}</p>

                    <div className="sol-card__highlights-preview">
                      {sol.howUrQRHelps.slice(0, 2).map((item, i) => (
                        <div key={i} className="sol-card__preview-item">
                          <span className="sol-card__bullet" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="sol-card__link">
                      <span>Explore Vertical Blueprint</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
