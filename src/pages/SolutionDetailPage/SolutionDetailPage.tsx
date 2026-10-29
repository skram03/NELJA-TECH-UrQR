import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Flame,
  Sparkles, MapPin, Wifi, Battery
} from "lucide-react";
import { SOLUTIONS } from "../../data/appData";
import FinalCTA from "../../sections/FinalCTA/FinalCTA";
import "./SolutionDetailPage.css";

interface VenueCockpitStep {
  id: number;
  label: string;
  island: string;
  topBadge: string;
  title: string;
  subtitle: string;
  cardContent: {
    itemTitle: string;
    itemDesc: string;
    itemPrice?: string;
    tag?: string;
    actionLabel: string;
  };
}

interface VenueDetails {
  img: string;
  badge: string;
  venueName: string;
  tagline: string;
  heroMetrics: { label: string; value: string; sub: string }[];
  cockpitTitle: string;
  cockpitSub: string;
  cockpitSteps: VenueCockpitStep[];
  steps: { num: string; title: string; desc: string }[];
}

const SOLUTION_DETAILS_MAP: Record<string, VenueDetails> = {
  military_hotel: {
    img: "/images/food-spread.jpg",
    badge: "MILITARY HOTEL & DONNE BIRYANI BLUEPRINT",
    venueName: "Thoogudeepa Donne Biryani Hub",
    tagline: "Built for ferocious 12:30–3:30 PM lunch rushes with 10-seat waiter grids, wood-fire dum KOT routing, and 15-second table turnover.",
    heroMetrics: [
      { label: "Turnover Gain", value: "+42%", sub: "Extra table seatings per lunch peak" },
      { label: "Order Fire Latency", value: "1.2s", sub: "From table camera scan to station pass" },
      { label: "Checkout Duration", value: "15s", sub: "Table dynamic UPI vs 18 min cash queue" },
    ],
    cockpitTitle: "Live Military Hotel Floor Simulator",
    cockpitSub: "Experience the exact Table 04 Donne Biryani flow: from wood-fire handi KOT fire to 15s UPI settlement.",
    cockpitSteps: [
      {
        id: 0,
        label: "1. Scan & Order",
        island: "📸 Table T-04 · Seeraga Samba",
        topBadge: "TABLE T-04 · 82°C DUM",
        title: "Table 04 Donne Biryani Menu",
        subtitle: "Scanned in 1.2s with smartphone camera",
        cardContent: {
          itemTitle: "Mutton Donne Biryani (Handi Dum)",
          itemDesc: "Wood-fire seeraga samba rice with sherva & boiled egg.",
          itemPrice: "₹320.00",
          tag: "🔥 9 Left in Handi",
          actionLabel: "Fire Order to Handi Pass →",
        },
      },
      {
        id: 1,
        label: "2. Handi KDS",
        island: "🔥 Wood-Fire KDS · Ticket #1042",
        topBadge: "STATION KDS · DUM HANDI",
        title: "Kitchen Handi Chronological Queue",
        subtitle: "Direct routing to master firewood chef",
        cardContent: {
          itemTitle: "TICKET #1042 · TABLE 04",
          itemDesc: "2× Mutton Donne Biryani · Extra Sherva · Timer: 03:14",
          tag: "⏱️ Cooking: 03:14",
          actionLabel: "Bump to Service Pass ✓",
        },
      },
      {
        id: 2,
        label: "3. Waiter Cockpit",
        island: "👨‍🍳 Seat 04 turns Amber · Chime Alert",
        topBadge: "WAITER MOBILE COCKPIT",
        title: "10-Seat Floor Stewards Cockpit",
        subtitle: "Real-time table map vibrates on waiter phone",
        cardContent: {
          itemTitle: "Seat 04 (Zone A - Steward Ramesh)",
          itemDesc: "Dining active · Duration 08m · Balance ₹588.00",
          tag: "🟢 Steward Notified",
          actionLabel: "Request Table UPI Bill →",
        },
      },
      {
        id: 3,
        label: "4. 15s Table UPI",
        island: "✓ Bill Settled · Table 04 Cleared",
        topBadge: "TABLE DYNAMIC UPI SETTLE",
        title: "15-Second Table Settle",
        subtitle: "Instant settlement frees table immediately",
        cardContent: {
          itemTitle: "Total Payable: ₹588.00",
          itemDesc: "PhonePe • Google Pay • Paytm • Cred verified",
          tag: "✓ Paid & Vacant in 15s",
          actionLabel: "↺ Re-run Military Hotel Flow",
        },
      },
    ],
    steps: [
      { num: "01", title: "Seat QR Scan", desc: "Guest sits at Seat 04, scans the stand, and views live 82°C Donne Biryani dum batch availability." },
      { num: "02", title: "Direct Dum Fire", desc: "Order fires with spice preferences ('Extra Sherva') directly to the wood-fire Handi KDS." },
      { num: "03", title: "Waiter Mobile Map", desc: "Floor server's smartphone vibrates with a chime; Seat 04 turns Amber with a 14-min timer." },
      { num: "04", title: "15s Dynamic UPI", desc: "Guest scans table QR, pays via PhonePe/GPay, and vacates seat with zero billing counter crowd." },
    ],
  },

  cafe: {
    img: "/images/cafe-ambiance.jpg",
    badge: "SPECIALTY CAFE & BREW BAR BLUEPRINT",
    venueName: "Roast & Bloom Coffee Craft",
    tagline: "Designed for seamless pour-overs, milk customizations, silent digital pickup buzzers, and tranquil coffee-shop vibes.",
    heroMetrics: [
      { label: "Barista Speed", value: "2.4x", sub: "Faster ticket intake with recipe modifiers" },
      { label: "Order Size", value: "+31%", sub: "Bakery cross-sell prompts during coffee order" },
      { label: "Zero Noise", value: "100%", sub: "Silent mobile buzzers replace shouting names" },
    ],
    cockpitTitle: "Live Specialty Cafe & Brew Bar Simulator",
    cockpitSub: "Experience the silent digital buzzer flow: artisan brew customizations, barista KDS pass, and quiet pickup.",
    cockpitSteps: [
      {
        id: 0,
        label: "1. Brew Bar Menu",
        island: "☕ Table 09 · Single Origin V60",
        topBadge: "TABLE 09 · SPECIALTY BAR",
        title: "Pour-Over & Espresso Bar",
        subtitle: "Origin notes, roast profiles & milk choices",
        cardContent: {
          itemTitle: "Ethiopian Yirgacheffe V60 + Oat Milk",
          itemDesc: "Floral jasmine notes, light roast, oat milk steam.",
          itemPrice: "₹240.00",
          tag: "☕ Custom Brew",
          actionLabel: "Send to Barista Bar →",
        },
      },
      {
        id: 1,
        label: "2. Barista KDS",
        island: "⏱️ Barista Queue · 2 Drinks in Line",
        topBadge: "ESPRESSO & BREW BAR KDS",
        title: "Exact Recipe Modifiers on Tablet",
        subtitle: "Milk temperature, syrup shots & cup size",
        cardContent: {
          itemTitle: "TICKET #208 · V60 POUR-OVER",
          itemDesc: "Grind: Medium-Fine · Ratio 1:15 · Temp 92°C",
          tag: "⏱️ Prep: 02:10",
          actionLabel: "Mark Brew Ready at Counter ✓",
        },
      },
      {
        id: 2,
        label: "3. Silent Buzzer",
        island: "🔔 Smartphone Vibration Alert",
        topBadge: "SILENT DIGITAL BUZZER",
        title: "Guest Phone Vibrates & Chimes",
        subtitle: "Zero acoustic shouting in the cafe lounge",
        cardContent: {
          itemTitle: "Your Coffee is Ready at Counter!",
          itemDesc: "Order #208 · Please pick up at the artisan brew station.",
          tag: "☕ Ready for Pickup",
          actionLabel: "Proceed to Split Bill →",
        },
      },
      {
        id: 3,
        label: "4. Split Table Settle",
        island: "✓ Bill Settled · Digital Receipt Sent",
        topBadge: "1-TAP CO-WORKING SPLIT",
        title: "Seamless Table Bill Settle",
        subtitle: "No card machine passing or split calculations",
        cardContent: {
          itemTitle: "Table 09 Paid: ₹380.00",
          itemDesc: "Split cleanly across 2 diners · Receipt via WhatsApp",
          tag: "✓ Paid & Relaxed",
          actionLabel: "↺ Re-run Specialty Cafe Flow",
        },
      },
    ],
    steps: [
      { num: "01", title: "Table QR Discovery", desc: "Guests discover origin notes, roast profiles, and milk choices (Oat, Almond, Whole)." },
      { num: "02", title: "Barista Station KDS", desc: "Orders route cleanly to the espresso bar with exact syrup shots and milk temperature cues." },
      { num: "03", title: "Silent Digital Buzzer", desc: "Guest smartphone vibrates with 'Order Ready at Counter' when the barista bumps the ticket." },
      { num: "04", title: "Split Bill & Repeat", desc: "Co-working guests split table bills cleanly without awkward card machine swaps." },
    ],
  },

  fine_dining: {
    img: "/images/fine-dining.jpg",
    badge: "FINE DINING & RESTOBAR BLUEPRINT",
    venueName: "The Amber Room Restobar",
    tagline: "Discrete table concierge, sommelier pairing suggestions, multi-course sequencing, and elegant white-glove floor coordination.",
    heroMetrics: [
      { label: "Wine Attach Rate", value: "+38%", sub: "Pairing notes featured alongside main courses" },
      { label: "Concierge Response", value: "< 45s", sub: "Water, plates, and sommelier calls routed" },
      { label: "Discreet Billing", value: "100%", sub: "Zero noisy payment terminals at table side" },
    ],
    cockpitTitle: "Live Fine Dining Concierge & Pacing Simulator",
    cockpitSub: "Experience multi-course pacing, sommelier pairing prompts, and discreet table concierge calling.",
    cockpitSteps: [
      {
        id: 0,
        label: "1. Curated Tasting",
        island: "🍷 Table 12 · 5-Course Pairing",
        topBadge: "TABLE 12 · CHEF'S RESERVE",
        title: "Tasting Menu & Sommelier Pairing",
        subtitle: "Vintage wine notes & multi-course selections",
        cardContent: {
          itemTitle: "Pan-Seared Duck Breast + Pinot Noir",
          itemDesc: "Cherry glaze, smoked root vegetable purée.",
          itemPrice: "₹1,450.00",
          tag: "⭐ Course 2",
          actionLabel: "Send to Chef's Line →",
        },
      },
      {
        id: 1,
        label: "2. Course Pacing",
        island: "⏱️ Course 1 Cleared · Fire Entrees",
        topBadge: "KITCHEN EXPEDITER PASS",
        title: "Multi-Course Pacing Control",
        subtitle: "Captain fires Starters, Entrees, and Desserts on cue",
        cardContent: {
          itemTitle: "COURSE 2 PACING TRIGGER",
          itemDesc: "Table 12 Starters finished · Fire Entrees now.",
          tag: "🔥 Fire Course 2",
          actionLabel: "Table Concierge Call Test →",
        },
      },
      {
        id: 2,
        label: "3. Concierge Call",
        island: "🛎️ Sparkling Water Call · Table 12",
        topBadge: "TABLE CONCIERGE DISPATCH",
        title: "Discreet Service Without Waving Arms",
        subtitle: "Fresh cutlery, sparkling water, or sommelier call",
        cardContent: {
          itemTitle: "Guest Request: Chilled Sparkling Water",
          itemDesc: "Captain phone receives haptic notification in 3s.",
          tag: "🛎️ Attending: < 45s",
          actionLabel: "Proceed to Digital Folio →",
        },
      },
      {
        id: 3,
        label: "4. Digital Folio",
        island: "✓ Folio Settle · Discreet Confirmation",
        topBadge: "HOST DIGITAL FOLIO",
        title: "White-Glove Digital Settlement",
        subtitle: "Itemized folio sent privately to the host's phone",
        cardContent: {
          itemTitle: "Total Folio: ₹4,850.00",
          itemDesc: "Zero noisy swipe machines at table side.",
          tag: "✓ Discreetly Settled",
          actionLabel: "↺ Re-run Fine Dining Flow",
        },
      },
    ],
    steps: [
      { num: "01", title: "Curated Tablet / QR", desc: "Guests explore chef tastings, vintage lists, and dietary indicators with high-res photos." },
      { num: "02", title: "Course Sequencing", desc: "Captains pace Starters, Entrees, and Desserts with 1-tap 'Fire Next Course' controls." },
      { num: "03", title: "Table Concierge Call", desc: "Guests request fresh cutlery, still/sparkling water, or the sommelier without raising arms." },
      { num: "04", title: "Discreet Settlement", desc: "Itemized digital folios presented to the host's phone with luxury split-pay options." },
    ],
  },

  qsr: {
    img: "/images/hero-restaurant.jpg",
    badge: "EXPRESS QSR & FAST CASUAL BLUEPRINT",
    venueName: "Spice Route Fast Casual",
    tagline: "Instant counter bypass, live order token status, rapid kitchen line dispatch, and frictionless high-volume turnaround.",
    heroMetrics: [
      { label: "Queue Reduction", value: "-65%", sub: "Guests bypass counter queue directly to tables" },
      { label: "Order Throughput", value: "3.5x", sub: "More orders processed per cashier station" },
      { label: "Prep Accuracy", value: "99.8%", sub: "Digital KDS eliminates verbal order mix-ups" },
    ],
    cockpitTitle: "Live Express QSR Token Simulator",
    cockpitSub: "Experience counter queue bypass: self-scan ordering, instant token generation, and rapid kitchen line dispatch.",
    cockpitSteps: [
      {
        id: 0,
        label: "1. Counter Bypass",
        island: "⚡ Token #104 · Self-Scan Kiosk",
        topBadge: "EXPRESS COUNTER BYPASS",
        title: "Guest Self-Ordering in 1.2s",
        subtitle: "Bypass 15-person counter queue straight to seat",
        cardContent: {
          itemTitle: "Paneer Butter Burger Meal + Mango Cooler",
          itemDesc: "Crisp potato fries, peri-peri seasoning, chilled cooler.",
          itemPrice: "₹260.00",
          tag: "⚡ Token #104",
          actionLabel: "Fire to Fry Line KDS →",
        },
      },
      {
        id: 1,
        label: "2. Fast Line KDS",
        island: "⏱️ Prep Timer · Target: 03m 30s",
        topBadge: "BURGER & FRY LINE KDS",
        title: "Chronological Fast Food Assembly",
        subtitle: "Clear station routing: Grill, Fry, Beverage",
        cardContent: {
          itemTitle: "TOKEN #104 · 3 ITEMS",
          itemDesc: "1× Burger · 1× Peri Fries · 1× Cooler",
          tag: "⏱️ Elapsed: 01:45",
          actionLabel: "Bump to Pickup Counter ✓",
        },
      },
      {
        id: 2,
        label: "3. Token Pickup",
        island: "🔔 Token #104 Ready at Counter",
        topBadge: "PICKUP DISPLAY & PHONE ALERT",
        title: "Token Number Ready on TV & Phone",
        subtitle: "Guest phone chimes; big screen displays #104",
        cardContent: {
          itemTitle: "TOKEN #104 IS READY!",
          itemDesc: "Pick up at counter station 02.",
          tag: "✓ Pickup Ready",
          actionLabel: "View Receipt & Settle →",
        },
      },
      {
        id: 3,
        label: "4. Auto Settle",
        island: "✓ UPI Settle · Receipt Generated",
        topBadge: "PRE-PAID UPI CHECKOUT",
        title: "Zero Queue Settlement",
        subtitle: "Paid via UPI in 15 seconds during scan",
        cardContent: {
          itemTitle: "Total Paid: ₹260.00",
          itemDesc: "Pre-paid token verified · Table freed in 18 minutes.",
          tag: "✓ High Velocity",
          actionLabel: "↺ Re-run Express QSR Flow",
        },
      },
    ],
    steps: [
      { num: "01", title: "Counter Bypass", desc: "Guests scan QR stand at tables or pickup bay, avoiding the 15-person ordering line." },
      { num: "02", title: "Token Generation", desc: "Orders punch automatically with a live token number (e.g. #104) sent to guest phone." },
      { num: "03", title: "Assembly KDS Line", desc: "Fast-casual line cooks assemble items on split screens (Burgers, Fryer, Cold Drinks)." },
      { num: "04", title: "Token Ready Broadcast", desc: "Pickup screen and guest phone vibrate together: 'Token #104 Ready at Counter'." },
    ],
  },

  foodcourt: {
    img: "/images/restaurant-bg.jpg",
    badge: "FOOD COURT & MULTI-BRAND HUB BLUEPRINT",
    venueName: "Nexus Food Atrium",
    tagline: "One master QR stand per table to order from 8 different brand stalls on a single combined bill with individual KDS routing.",
    heroMetrics: [
      { label: "Basket Cross-Sell", value: "+34%", sub: "Diners mix starters & desserts across brands" },
      { label: "Pickup Clutter", value: "-70%", sub: "Silent mobile buzzers prevent kiosk crowds" },
      { label: "Unified Settle", value: "1 Bill", sub: "Single payment split automatically to vendors" },
    ],
    cockpitTitle: "Live Multi-Vendor Food Court Simulator",
    cockpitSub: "Order from multiple stalls in one cart, route tickets to individual kitchens, and track independent pickup tokens.",
    cockpitSteps: [
      {
        id: 0,
        label: "1. Multi-Stall Cart",
        island: "🛍️ 2 Stalls in 1 Cart · Table F-08",
        topBadge: "MULTI-BRAND ORDERING",
        title: "Order Across 8 Stalls Simultaneously",
        subtitle: "Biryani Hub + Artisan Juice Bar in one cart",
        cardContent: {
          itemTitle: "Donne Biryani (Stall 02) + Cold Brew (Stall 05)",
          itemDesc: "Unified cart checkout with split vendor routing.",
          itemPrice: "₹450.00",
          tag: "🛍️ Multi-Stall",
          actionLabel: "Route Tickets to Both Kitchens →",
        },
      },
      {
        id: 1,
        label: "2. Dual KDS Route",
        island: "🔥 Stall 02 & Stall 05 Syncing",
        topBadge: "AUTOMATED VENDOR ROUTING",
        title: "Independent Kitchen KDS Pass",
        subtitle: "Each stall receives only their specific items",
        cardContent: {
          itemTitle: "SPLIT DISPATCH CONFIRMED",
          itemDesc: "Stall 02 prep: Biryani (04m) · Stall 05 prep: Brew (02m)",
          tag: "⏱️ Dual KDS",
          actionLabel: "Simulate Independent Buzzers →",
        },
      },
      {
        id: 2,
        label: "3. Dual Buzzers",
        island: "🔔 Stall 05 Ready First · Stall 02 In Prep",
        topBadge: "INDEPENDENT MOBILE BUZZERS",
        title: "Separate Ready Notifications",
        subtitle: "Drink ready first; biryani buzzes when hot",
        cardContent: {
          itemTitle: "Stall 05: Cold Brew Ready at Counter!",
          itemDesc: "Pick up beverage while biryani finishes dum.",
          tag: "☕ Drink Ready",
          actionLabel: "Proceed to Unified UPI Settle →",
        },
      },
      {
        id: 3,
        label: "4. 1-Tap Settle",
        island: "✓ 1 Bill Paid · Split to Vendors",
        topBadge: "UNIFIED MULTI-VENDOR UPI",
        title: "Single Payment Settlement",
        subtitle: "Platform automatically splits payouts to vendor accounts",
        cardContent: {
          itemTitle: "Total Paid: ₹450.00",
          itemDesc: "₹290 to Stall 02 · ₹160 to Stall 05 · Zero kiosk lines.",
          tag: "✓ Unified Settle",
          actionLabel: "↺ Re-run Food Court Flow",
        },
      },
    ],
    steps: [
      { num: "01", title: "Universal Table QR", desc: "Guests sit anywhere in the atrium and scan to view all food stalls in one unified menu." },
      { num: "02", title: "Multi-Stall Cart", desc: "Diners mix items from Biryani Hub, Juice Bar, and Waffle Counter on one running cart." },
      { num: "03", title: "Split KDS Routing", desc: "Orders split automatically to individual stall tablets with separate prep timers." },
      { num: "04", title: "Independent Buzzers", desc: "Guest smartphone buzzes separately when each stall's counter prepares their item." },
    ],
  },

  cloud: {
    img: "/images/kitchen-team.jpg",
    badge: "CLOUD KITCHEN & DISPATCH LINE BLUEPRINT",
    venueName: "Ghost Craft Culinary Hub",
    tagline: "Centralized aggregator ingestion, multi-brand handi station dispatch, rider bay coordination, and zero order drop.",
    heroMetrics: [
      { label: "Dispatch Velocity", value: "-8 Min", sub: "Faster handover to delivery riders" },
      { label: "Order Accuracy", value: "99.9%", sub: "Barcode bag verification eliminates wrong packs" },
      { label: "Rider Idle Time", value: "< 2 Min", sub: "Riders arrive exactly when food is bagged" },
    ],
    cockpitTitle: "Live Cloud Kitchen Dispatch Simulator",
    cockpitSub: "Experience multi-brand aggregator ingestion, station line dispatch, and zero-error rider handovers.",
    cockpitSteps: [
      {
        id: 0,
        label: "1. Ingestion",
        island: "📦 Aggregator Ingestion · 3 Brands",
        topBadge: "MULTI-BRAND ORDER STREAM",
        title: "Zomato, Swiggy & Direct Orders",
        subtitle: "Single unified dispatch queue for all brands",
        cardContent: {
          itemTitle: "Order #9842 (Brand: Royal Biryani)",
          itemDesc: "1× Mutton Biryani · 1× Kebabs · Dispatch in 12m",
          tag: "📦 Ingested",
          actionLabel: "Route to Line Stations →",
        },
      },
      {
        id: 1,
        label: "2. Station Split",
        island: "🔥 Handi 02 + Tandoor Station 01",
        topBadge: "MULTI-STATION KDS ROUTING",
        title: "Split to Master Cook Tablets",
        subtitle: "Biryani routes to handi; starters route to tandoor",
        cardContent: {
          itemTitle: "HANDI 02 · TICKET #9842",
          itemDesc: "Timer: 04:30 · Synced with packaging expediter",
          tag: "⏱️ Prep: 04:30",
          actionLabel: "Bump to Packaging Bay →",
        },
      },
      {
        id: 2,
        label: "3. Packaging Scan",
        island: "🏷️ Bag Barcode Verified · Tag Sealed",
        topBadge: "EXPEDITER PACKAGING BAY",
        title: "Barcode Bag Verification",
        subtitle: "100% packing accuracy prevents wrong deliveries",
        cardContent: {
          itemTitle: "Bag #9842 Sealed & Tagged",
          itemDesc: "All 2 items verified by scanner.",
          tag: "✓ Bag Ready",
          actionLabel: "Notify Rider Bay →",
        },
      },
      {
        id: 3,
        label: "4. Rider Handover",
        island: "🛵 Rider Handover in < 60s",
        topBadge: "RIDER BAY DISPATCH",
        title: "Instant Rider Bay Handover",
        subtitle: "Rider scans bag barcode and departs immediately",
        cardContent: {
          itemTitle: "Rider Handover Confirmed",
          itemDesc: "Rider wait time: 1 min 15 sec. Order dispatched.",
          tag: "✓ Dispatched",
          actionLabel: "↺ Re-run Cloud Kitchen Flow",
        },
      },
    ],
    steps: [
      { num: "01", title: "Unified Ingestion", desc: "Zomato, Swiggy, and direct orders stream onto one centralized kitchen console." },
      { num: "02", title: "Station Split KDS", desc: "Handi, Tandoor, and Gravy stations receive chronological prep instructions automatically." },
      { num: "03", title: "Expediter Bag Scan", desc: "Packers scan container barcodes against digital orders to ensure 100% item accuracy." },
      { num: "04", title: "Rider Bay Chime", desc: "Rider display chimes when bag is sealed, keeping rider parking bay turnaround under 2 minutes." },
    ],
  },

  chain: {
    img: "/images/fine-dining.jpg",
    badge: "MULTI-OUTLET RESTAURANT CHAIN BLUEPRINT",
    venueName: "Heritage Kitchens Group (14 Outlets)",
    tagline: "Enterprise headquarters console, 1-tap global menu pushes, regional turnover telemetry, and franchise compliance.",
    heroMetrics: [
      { label: "Menu Push Time", value: "100ms", sub: "Global price & item updates to all 14 outlets" },
      { label: "Revenue Audit", value: "Real-Time", sub: "Instant roll-up across all city branches" },
      { label: "Out of Stock 86", value: "1-Tap", sub: "Regional 86 toggler prevents false orders" },
    ],
    cockpitTitle: "Live Multi-Outlet HQ Telemetry Simulator",
    cockpitSub: "Experience enterprise chain control: 1-tap menu pushes, regional RevPASH telemetry, and branch sync.",
    cockpitSteps: [
      {
        id: 0,
        label: "1. HQ Console",
        island: "🏢 14 Outlets Active · Bengaluru & Mysuru",
        topBadge: "CENTRALIZED HQ TELEMETRY",
        title: "Enterprise Brand Control Center",
        subtitle: "Real-time telemetry across all 14 branches",
        cardContent: {
          itemTitle: "Network Revenue: ₹8,42,000 Today",
          itemDesc: "1,240 table seatings across all city outlets.",
          tag: "🏢 14 Branches",
          actionLabel: "Push Global Price Update →",
        },
      },
      {
        id: 1,
        label: "2. Global Push",
        island: "⚡ Menu Pushed to 14 Outlets in 100ms",
        topBadge: "100ms GLOBAL MENU BROADCAST",
        title: "Synchronize Menus in Real Time",
        subtitle: "Push weekend biryani specials to all outlets simultaneously",
        cardContent: {
          itemTitle: "Global Menu Push: +10% Festive Combo",
          itemDesc: "Broadcast confirmed across all 14 branch servers.",
          tag: "⚡ 100ms Push",
          actionLabel: "Simulate Branch 86 Toggler →",
        },
      },
      {
        id: 2,
        label: "3. Branch 86 Sync",
        island: "🚫 Outlet 04 (Indiranagar) Mutton 86'd",
        topBadge: "INDIVIDUAL BRANCH ITEM 86",
        title: "Local Out-of-Stock Override",
        subtitle: "Indiranagar sold out; other 13 outlets keep selling",
        cardContent: {
          itemTitle: "Indiranagar Branch Override: Mutton 86",
          itemDesc: "Disabled on 38 tables in Indiranagar in 100ms.",
          tag: "🚫 Local 86 Active",
          actionLabel: "View Regional Audit Report →",
        },
      },
      {
        id: 3,
        label: "4. Regional Audit",
        island: "📊 Real-Time GST & Franchise Roll-up",
        topBadge: "FRANCHISE & GST AUDIT",
        title: "Automated Daily Tally & Audit",
        subtitle: "Complete sales, taxation, and turnover roll-up",
        cardContent: {
          itemTitle: "Consolidated Daily Audit Complete",
          itemDesc: "Exportable to Tally, SAP, and GST tax engines.",
          tag: "✓ Audit Complete",
          actionLabel: "↺ Re-run Enterprise Chain Flow",
        },
      },
    ],
    steps: [
      { num: "01", title: "Centralized Menu Push", desc: "Corporate chefs update pricing, seasonal specials, or dish photos across all branches in 1 tap." },
      { num: "02", title: "Regional Telemetry", desc: "View branch-by-branch RevPASH, turnaround minutes, and top-selling dishes in real time." },
      { num: "03", title: "Franchise 86 Control", desc: "Local managers 86 sold-out items independently without affecting sister outlets." },
      { num: "04", title: "Consolidated P&L", desc: "Automated daily settlement roll-up eliminates manual spreadsheet reconciliation." },
    ],
  },
};

export default function SolutionDetailPage() {
  const { solutionId } = useParams<{ solutionId: string }>();
  const [activeVerticalKey, setActiveVerticalKey] = useState<string>(solutionId || "military_hotel");
  const [activeCockpitStep, setActiveCockpitStep] = useState<number>(0);
  const [cockpitAutoPlay, setCockpitAutoPlay] = useState<boolean>(false); // Allow manual exploration by default
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize route param with activeVerticalKey
  useEffect(() => {
    if (solutionId && SOLUTION_DETAILS_MAP[solutionId]) {
      setActiveVerticalKey(solutionId);
    }
  }, [solutionId]);

  const solution = SOLUTIONS.find((s) => s.id === activeVerticalKey) || SOLUTIONS[0];
  const details = SOLUTION_DETAILS_MAP[activeVerticalKey] || SOLUTION_DETAILS_MAP.military_hotel;

  // Station simulation states for the expanded desktop terminal
  const [kotTimer, setKotTimer] = useState<number>(194);
  const [kotBumped, setKotBumped] = useState<boolean>(false);
  const [selectedSeat, setSelectedSeat] = useState<string>("T-04");
  const [chimeAcked, setChimeAcked] = useState<boolean>(false);
  const [upiSplit, setUpiSplit] = useState<number>(1);
  const [isUpiPaid, setIsUpiPaid] = useState<boolean>(false);
  const [spiceSelection, setSpiceSelection] = useState<"mild" | "medium" | "fiery">("medium");
  const [stationLang, setStationLang] = useState<"en" | "kn">("en");

  // Timer countdown for kitchen ticket
  useEffect(() => {
    const timer = setInterval(() => {
      setKotTimer((prev) => (prev > 0 ? prev - 1 : 194));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-progress through the venue-specific cockpit simulation if autoplay enabled
  useEffect(() => {
    if (!cockpitAutoPlay || !details) return;
    const interval = setInterval(() => {
      setActiveCockpitStep((prev) => (prev + 1) % details.cockpitSteps.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [cockpitAutoPlay, details]);

  if (!solution || !details) {
    return <Navigate to="/solutions" replace />;
  }

  const currentStep = details.cockpitSteps[activeCockpitStep] || details.cockpitSteps[0];

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }

  function handleSelectCockpitStep(stepId: number) {
    setActiveCockpitStep(stepId);
    setCockpitAutoPlay(false);
  }

  const formatKotTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `0${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="solution-detail">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="venue-terminal-toast" role="status">
          <Sparkles size={14} className="text-emerald" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="solution-detail__hero" aria-labelledby="solution-title">
        <div className="container">
          <Link to="/solutions" className="solution-detail__back">
            <ArrowLeft size={16} /> Back to Restaurant Blueprints
          </Link>

          <div className="solution-detail__hero-grid">
            {/* Copy Content */}
            <div className="solution-detail__copy">
              <div className="solution-detail__tag">
                <Sparkles size={13} className="text-emerald" />
                <span>{details.badge}</span>
              </div>

              <h1 id="solution-title" className="solution-detail__title">
                {solution.name}: <span className="type-serif-em">{solution.headline}</span>
              </h1>

              <p className="solution-detail__intro">
                {details.tagline}
              </p>

              {/* 3 Metric Cards */}
              <div className="solution-detail__metrics-grid">
                {details.heroMetrics.map((m, idx) => (
                  <div key={idx} className="solution-m-card">
                    <span className="solution-m-val">{m.value}</span>
                    <strong className="solution-m-lbl">{m.label}</strong>
                    <span className="solution-m-sub">{m.sub}</span>
                  </div>
                ))}
              </div>

              <div className="solution-detail__actions">
                <Link to="/contact" className="btn btn--primary btn--lg">
                  Deploy at Your Restaurant <ArrowRight size={16} />
                </Link>
                <a href="#venue-live-cockpit" className="btn btn--secondary btn--lg">
                  ⚡ Test {solution.name} Cockpit
                </a>
              </div>
            </div>

            {/* Visual Media with Badges */}
            <div className="solution-detail__image-wrap">
              <img src={details.img} alt={solution.name} className="solution-detail__image" />
              <div className="solution-detail__image-overlay" />
              <div className="solution-detail__venue-chip">
                <MapPin size={13} className="text-emerald" />
                <span>Reference: {details.venueName}</span>
              </div>
              <div className="solution-detail__turnover-pill">
                <Flame size={14} className="text-amber" />
                <span>{solution.turnoverStat}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED LIVE INTERACTIVE COCKPIT SPECIFIC TO THIS VENUE — FULL SCREEN DESKTOP VISUALIZATION */}
      <section className="venue-cockpit-section section" id="venue-live-cockpit">
        {/* Full-bleed background filling the entire screen with selected vertical's ambiance */}
        <div className="venue-cockpit__bg-wrap" aria-hidden="true">
          <img
            src={details.img}
            alt={`${solution.name} Ambiance Background`}
            className="venue-cockpit__bg-img"
            key={activeVerticalKey}
          />
          <div className="venue-cockpit__bg-scrim" />
        </div>

        <div className="container venue-cockpit__container">
          <div className="venue-cockpit__header text-center">
            <div className="section-label">
              <Sparkles size={13} className="text-emerald" />
              <span>DEDICATED VENUE SIMULATOR</span>
            </div>
            <h2 className="venue-cockpit__title">
              {details.cockpitTitle}
            </h2>
            <p className="venue-cockpit__sub">
              {details.cockpitSub}
            </p>

            {/* Dedicated Venue Blueprint Indicator — ONLY for this respective venue format */}
            <div className="venue-blueprint-header-meta">
              <div className="venue-current-blueprint-badge">
                <span className="venue-current-blueprint-dot" />
                <span className="venue-current-blueprint-tag">ACTIVE BLUEPRINT:</span>
                <strong className="venue-current-blueprint-name">{solution.name}</strong>
                <span className="venue-current-blueprint-sep">·</span>
                <span className="venue-current-blueprint-ref">{details.venueName}</span>
              </div>
              <Link to="/solutions" className="venue-blueprint-explore-all">
                Browse All Blueprints <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* DESKTOP-GRADE WIDESCREEN DEDICATED VENUE TERMINAL */}
          <div className="venue-cockpit__desktop-terminal">
            {/* Console Header Bar */}
            <div className="terminal-top-bar">
              <div className="terminal-venue-id">
                <span className="terminal-pulse-dot" />
                <strong>{details.venueName}</strong>
                <span className="terminal-badge-mini">{details.badge.split(" ")[0]}</span>
              </div>

              {/* 4-Step Interactive Stepper Bar */}
              <div className="cockpit-stepper-bar" role="tablist">
                {details.cockpitSteps.map((st) => {
                  const isActive = activeCockpitStep === st.id;
                  return (
                    <button
                      key={st.id}
                      role="tab"
                      aria-selected={isActive}
                      className={`cockpit-pill ${isActive ? "cockpit-pill--active" : ""}`}
                      onClick={() => handleSelectCockpitStep(st.id)}
                    >
                      <span className="cockpit-dot" />
                      <span>{st.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="terminal-sync-status">
                <span className="sync-text">🟢 99.98% Cloud Floor Sync</span>
              </div>
            </div>

            {/* Widescreen Dual-Screen Layout: Left Device Preview + Right Station Console */}
            <div className="terminal-stage-grid">
              {/* Left Pane: Smartphone / Handheld Order View */}
              <div className="cockpit-phone-frame">
                <div className="cockpit-phone-screen">
                  {/* Phone Status Bar with Dynamic Island */}
                  <div className="cockpit-status-bar">
                    <span className="cockpit-time">12:45</span>
                    <div className="cockpit-dynamic-island">
                      <span>{currentStep.island}</span>
                    </div>
                    <div className="cockpit-icons">
                      <Wifi size={11} />
                      <Battery size={11} />
                    </div>
                  </div>

                  {/* Screen Viewport */}
                  <div className="cockpit-viewport">
                    <div className="cockpit-view-header">
                      <span className="cockpit-badge-top">{currentStep.topBadge}</span>
                      <strong className="cockpit-brand-name">{details.venueName}</strong>
                    </div>

                    <div className="cockpit-inner-content">
                      <h3 className="cockpit-step-heading">{currentStep.title}</h3>
                      <p className="cockpit-step-sub">{currentStep.subtitle}</p>

                      <div className="cockpit-action-box">
                        <div className="action-box-head">
                          <strong>{currentStep.cardContent.itemTitle}</strong>
                          {currentStep.cardContent.itemPrice && (
                            <span className="action-box-price">{currentStep.cardContent.itemPrice}</span>
                          )}
                        </div>
                        <p className="action-box-desc">{currentStep.cardContent.itemDesc}</p>
                        {currentStep.cardContent.tag && (
                          <div className="action-box-tag">
                            <span className="pulse-dot-green" />
                            <span>{currentStep.cardContent.tag}</span>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        className="cockpit-next-btn"
                        onClick={() => {
                          const nextStep = (activeCockpitStep + 1) % details.cockpitSteps.length;
                          handleSelectCockpitStep(nextStep);
                          showToast(`Advanced to: ${details.cockpitSteps[nextStep].label}`);
                        }}
                      >
                        <span>{currentStep.cardContent.actionLabel}</span>
                      </button>
                    </div>

                    <div className="cockpit-home-pill" />
                  </div>
                </div>
              </div>

              {/* Right Pane: Desktop Live Floor Station Screen (~860px width) */}
              <div className="terminal-station-console">
                {/* STEP 0: TABLETOP DISCOVERY & MENU CUSTOMIZER */}
                {activeCockpitStep === 0 && (
                  <div className="station-view station-view--order">
                    <div className="station-view-head">
                      <div>
                        <span className="station-badge">TABLETOP STAND SCREEN</span>
                        <h3>Table T-04 Dynamic Acrylic Stand</h3>
                      </div>
                      <div className="station-bilingual-toggle">
                        <button
                          type="button"
                          className={stationLang === "en" ? "active" : ""}
                          onClick={() => setStationLang("en")}
                        >
                          EN
                        </button>
                        <span>/</span>
                        <button
                          type="button"
                          className={stationLang === "kn" ? "active" : ""}
                          onClick={() => setStationLang("kn")}
                        >
                          ಕನ್ನಡ
                        </button>
                      </div>
                    </div>

                    <div className="station-hero-card">
                      <div className="station-dish-meta">
                        <span className="station-dum-pill">🔥 82°C DUM · 9 LEFT IN HANDI</span>
                        <h4>
                          {stationLang === "en"
                            ? currentStep.cardContent.itemTitle
                            : "ಮಟನ್ ದೊನ್ನೆ ಬಿರಿಯಾನಿ (ಹಂಡಿ ದಮ್)"}
                        </h4>
                        <p>
                          {stationLang === "en"
                            ? currentStep.cardContent.itemDesc
                            : "ಸೀರಿಗೆ ಸಾಂಬಾ ಅಕ್ಕಿ ಮತ್ತು ಮಿಲಿಟರಿ ಶೇರ್ವಾ ಜೊತೆ ಮಟನ್ ಬಿರಿಯಾನಿ."}
                        </p>
                        <div className="station-spice-options">
                          <label>Spice Profile:</label>
                          <div className="spice-btn-group">
                            <button
                              type="button"
                              className={spiceSelection === "mild" ? "active" : ""}
                              onClick={() => setSpiceSelection("mild")}
                            >
                              Mild
                            </button>
                            <button
                              type="button"
                              className={spiceSelection === "medium" ? "active" : ""}
                              onClick={() => setSpiceSelection("medium")}
                            >
                              Medium Sherva
                            </button>
                            <button
                              type="button"
                              className={spiceSelection === "fiery" ? "active" : ""}
                              onClick={() => setSpiceSelection("fiery")}
                            >
                              Military Fiery
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="station-qr-box">
                        <div className="qr-box-inner">
                          <span className="qr-scan-line" />
                          <div className="qr-dummy-code">SCAN ME</div>
                          <span className="qr-box-table">T-04</span>
                        </div>
                        <small>1.2s Instant Scan</small>
                      </div>
                    </div>

                    <div className="station-action-bar">
                      <div className="action-bar-text">
                        <span>Table Status:</span>
                        <strong>ACTIVE GUEST SELECTION · 2× ORDER READY</strong>
                      </div>
                      <button
                        type="button"
                        className="station-fire-btn"
                        onClick={() => {
                          handleSelectCockpitStep(1);
                          showToast("⚡ Order fired directly to Station KDS in 0ms!");
                        }}
                      >
                        Fire Directly to Station KDS ➔
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 1: DIRECT KITCHEN PASS KDS */}
                {activeCockpitStep === 1 && (
                  <div className="station-view station-view--kds">
                    <div className="station-view-head">
                      <div>
                        <span className="station-badge station-badge--kds">KITCHEN KDS PASS</span>
                        <h3>Station 01 Handi & Tandoor Expediter Display</h3>
                      </div>
                      <div className="station-timer-clock">
                        <span>LIVE TIMER:</span>
                        <strong>{formatKotTime(kotTimer)}</strong>
                      </div>
                    </div>

                    <div className={`station-ticket-box ${kotBumped ? "station-ticket-box--bumped" : ""}`}>
                      <div className="ticket-header-row">
                        <div>
                          <strong>TICKET #1042 · TABLE T-04</strong>
                          <small>Floor Waitstaff: Ramesh K. (Zone A)</small>
                        </div>
                        <span className="ticket-time-chip">⏱️ {formatKotTime(kotTimer)}</span>
                      </div>
                      <div className="ticket-body-items">
                        <div className="ticket-item-line">
                          <span>2× Mutton Donne Biryani (Handi Dum)</span>
                          <span className="ticket-mod-tag">🔥 Handi Dum</span>
                        </div>
                        <div className="ticket-item-line">
                          <span>1× Extra Military Sherva (Spicy)</span>
                          <span className="ticket-mod-tag">⚡ Immediate</span>
                        </div>
                        <div className="ticket-item-line">
                          <span>1× Fresh Nannari Sherbet</span>
                          <span className="ticket-mod-tag">🥤 Chilled</span>
                        </div>
                      </div>
                      <div className="ticket-action-row">
                        <button
                          type="button"
                          className="station-bump-btn"
                          onClick={() => {
                            setKotBumped(true);
                            showToast("🔔 Ticket #1042 Plated! Waiter tablet vibrated.");
                            setTimeout(() => {
                              handleSelectCockpitStep(2);
                            }, 1200);
                          }}
                        >
                          {kotBumped ? "✓ BUMPED TO PASS (DISPATCHED)" : "✓ BUMP TICKET TO PASS (ALERT WAITER)"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: FLOOR STEWARD MOBILE COCKPIT */}
                {activeCockpitStep === 2 && (
                  <div className="station-view station-view--waiter">
                    <div className="station-view-head">
                      <div className="waiter-steward-meta">
                        <img
                          src="/images/waiter-uniform.jpg"
                          alt="Properly dressed steward in formal uniform"
                          className="steward-avatar-img"
                        />
                        <div>
                          <strong>Ramesh K. (#TH-08)</strong>
                          <small>Lead Floor Steward · Zone A (Tables T1–T6)</small>
                        </div>
                      </div>
                      <span className="steward-duty-pill">🟢 ON DUTY · SMARTPHONE COCKPIT</span>
                    </div>

                    {/* Live Chime Summons Banner */}
                    <div className={`steward-chime-bar ${chimeAcked ? "steward-chime-bar--acked" : ""}`}>
                      <span>
                        {chimeAcked
                          ? "✓ Table T-02 Acknowledged — Steward Ramesh en route!"
                          : "⚡ Table T-02 requested Bill & Water! (Steward Alert)"}
                      </span>
                      {!chimeAcked && (
                        <button
                          type="button"
                          className="steward-ack-btn"
                          onClick={() => {
                            setChimeAcked(true);
                            showToast("✓ Chime acknowledged on steward phone!");
                          }}
                        >
                          ✓ ACKNOWLEDGE
                        </button>
                      )}
                    </div>

                    {/* 6-Table Seating Floor Grid */}
                    <div className="steward-floor-grid">
                      {[
                        { id: "T-01", status: "VACANT", type: "vacant", time: "Ready" },
                        { id: "T-02", status: "BILL REQ", type: "bill", time: "₹1,120" },
                        { id: "T-03", status: "VACANT", type: "vacant", time: "Ready" },
                        { id: "T-04", status: "DINING", type: "dining", time: "18m" },
                        { id: "T-05", status: "VACANT", type: "vacant", time: "Ready" },
                        { id: "T-06", status: "KDS PREP", type: "kds", time: "03:14" },
                      ].map((seat) => (
                        <button
                          key={seat.id}
                          type="button"
                          className={`steward-seat-tile steward-seat-tile--${seat.type} ${selectedSeat === seat.id ? "selected" : ""}`}
                          onClick={() => {
                            setSelectedSeat(seat.id);
                            showToast(`Seat ${seat.id} active · Status: ${seat.status}`);
                          }}
                        >
                          <div className="seat-tile-top">
                            <strong>{seat.id}</strong>
                            <span className="seat-status-chip">{seat.status}</span>
                          </div>
                          <span className="seat-time-info">{seat.time}</span>
                        </button>
                      ))}
                    </div>

                    <div className="steward-bottom-controls">
                      <span>Selected: <strong>{selectedSeat}</strong></span>
                      <button
                        type="button"
                        className="steward-advance-btn"
                        onClick={() => {
                          handleSelectCockpitStep(3);
                          showToast("Proceeded to 15s Table UPI settlement");
                        }}
                      >
                        Request Table UPI Payment ➔
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: 15s TABLE DYNAMIC UPI SETTLEMENT */}
                {activeCockpitStep === 3 && (
                  <div className="station-view station-view--upi">
                    <div className="station-view-head">
                      <div>
                        <span className="station-badge station-badge--upi">DYNAMIC UPI STAND</span>
                        <h3>Table T-04 15-Second Settlement Stand</h3>
                      </div>
                      <span className="upi-mdr-tag">0% MDR · Direct Bank Settle</span>
                    </div>

                    <div className="upi-terminal-content">
                      <div className="upi-split-row">
                        <label>Bill Settlement Mode:</label>
                        <div className="upi-split-buttons">
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
                      </div>

                      <div className="upi-qr-stage">
                        <div className="upi-qr-display-box">
                          <div className="upi-qr-sim-art">
                            <span className="qr-scan-glint" />
                            <strong>UPI QR</strong>
                          </div>
                          <div className="upi-qr-meta">
                            <span className="upi-payable-lbl">Total Settle:</span>
                            <strong className="upi-payable-val">
                              ₹{upiSplit === 1 ? "588.00" : upiSplit === 2 ? "294.00" : "147.00"}
                            </strong>
                            <div className="upi-accepted-apps">
                              <span>PhonePe</span>
                              <span>Google Pay</span>
                              <span>Paytm</span>
                              <span>Cred</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`upi-verify-action-btn ${isUpiPaid ? "verified" : ""}`}
                          onClick={() => {
                            setIsUpiPaid(true);
                            showToast("✓ Payment ₹588 verified! Table T-04 auto-flipped to Vacant in 15s.");
                            setTimeout(() => {
                              handleSelectCockpitStep(0);
                            }, 2400);
                          }}
                        >
                          {isUpiPaid ? "✓ PAID & TABLE AUTO-VACATED (15s)" : "⚡ Simulate 15s Instant Guest Settle"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Flow Diagram Section */}
      <section className="solution-flow section">
        <div className="container">
          <div className="solution-flow__header text-center">
            <div className="section-label">Operational Workflow</div>
            <h2 className="solution-flow__title">
              How the UrQR engine runs inside your dining room
            </h2>
            <p className="solution-flow__sub">
              A synchronized 4-stage loop designed for high velocity, zero dropped orders, and instant table vacate.
            </p>
          </div>

          <div className="solution-flow__grid">
            {details.steps.map((st, sIdx) => {
              const RESTO_STEP_THEMES = [
                { color: "#D97706", glow: "rgba(217, 119, 6, 0.28)", label: "GUEST SCAN" },
                { color: "#DC2626", glow: "rgba(220, 38, 38, 0.28)", label: "KITCHEN FIRE" },
                { color: "#0284C7", glow: "rgba(2, 132, 199, 0.28)", label: "STEWARD MAP" },
                { color: "#10B981", glow: "rgba(16, 185, 129, 0.28)", label: "15s SETTLE" },
              ];
              const theme = RESTO_STEP_THEMES[sIdx % RESTO_STEP_THEMES.length];
              const isEven = sIdx % 2 === 0;

              return (
                <div
                  key={st.num}
                  className={`solution-flow__step-unit ${isEven ? "step-unit--sway-a" : "step-unit--sway-b"}`}
                >
                  {/* Executive Restaurant Retractable Badge Reel & Bulldog Clamp Handler */}
                  <div className="resto-card-handler" aria-hidden="true">
                    {/* Overhead Suspension Peg / Wall Mount */}
                    <div className="resto-handler__mount">
                      <span className="resto-handler__mount-peg" />
                      <span className="resto-handler__mount-ring" />
                    </div>

                    {/* Circular Satin-Chrome Badge Reel Housing */}
                    <div
                      className="resto-handler__reel"
                      style={{
                        borderColor: theme.color,
                        boxShadow: `0 4px 14px ${theme.glow}`,
                      }}
                    >
                      <div className="resto-handler__reel-face">
                        <span
                          className="resto-handler__reel-core"
                          style={{ background: theme.color }}
                        >
                          {st.num}
                        </span>
                      </div>
                    </div>

                    {/* High-Tensile Retractable Steel Cord */}
                    <div className="resto-handler__cord-wrap">
                      <div className="resto-handler__cord" />
                    </div>

                    {/* Chrome Bulldog Clamp with Gripping Jaws */}
                    <div className="resto-handler__clamp-assembly">
                      <svg
                        width="46"
                        height="30"
                        viewBox="0 0 46 30"
                        fill="none"
                        className="resto-handler__clamp-svg"
                      >
                        <defs>
                          <linearGradient
                            id={`restoChrome-${st.num}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="30%" stopColor="#E2E8F0" />
                            <stop offset="65%" stopColor="#94A3B8" />
                            <stop offset="100%" stopColor="#475569" />
                          </linearGradient>
                        </defs>

                        {/* Top Suspension Loop */}
                        <rect
                          x="20"
                          y="1"
                          width="6"
                          height="5"
                          rx="2"
                          fill={`url(#restoChrome-${st.num})`}
                          stroke="#334155"
                          strokeWidth="0.8"
                        />

                        {/* Metallic Clamp Body */}
                        <path
                          d="M13 6 C13 6, 23 5, 33 6 C35.5 6, 36.5 8, 35 10 L33 17 C32.5 18.5, 30.5 19, 28 19 L18 19 C15.5 19, 13.5 18.5, 13 17 L11 10 C9.5 8, 10.5 6, 13 6 Z"
                          fill={`url(#restoChrome-${st.num})`}
                          stroke="#334155"
                          strokeWidth="1.2"
                        />

                        {/* Heavy-Duty Spring Pivot Bar */}
                        <rect
                          x="19"
                          y="9"
                          width="8"
                          height="6"
                          rx="2"
                          fill="#1E293B"
                          stroke="#64748B"
                          strokeWidth="0.8"
                        />
                        <line x1="21.5" y1="10" x2="21.5" y2="14" stroke="#94A3B8" strokeWidth="1.2" />
                        <line x1="24.5" y1="10" x2="24.5" y2="14" stroke="#94A3B8" strokeWidth="1.2" />

                        {/* Dual Clamping Jaws Overlapping the Card Top */}
                        <path
                          d="M9 20 L37 20 L35 28 L11 28 Z"
                          fill="#475569"
                          stroke="#1E293B"
                          strokeWidth="1.2"
                        />
                        <line x1="9" y1="23" x2="37" y2="23" stroke="#CBD5E1" strokeWidth="1.2" />

                        {/* Colored Rubber Friction Grip Pad */}
                        <rect
                          x="13"
                          y="22"
                          width="20"
                          height="3.5"
                          rx="1"
                          fill={theme.color}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Card Surface with White Theme and Step Accent */}
                  <div
                    className="solution-flow__step-card"
                    style={{
                      borderTop: `3px solid ${theme.color}`,
                    }}
                  >
                    <div className="solution-flow__step-card-head">
                      <span
                        className="solution-flow__step-num"
                        style={{ color: theme.color }}
                      >
                        {st.num}
                      </span>
                      <span
                        className="solution-flow__step-tag"
                        style={{
                          color: theme.color,
                          background: `${theme.color}15`,
                          borderColor: `${theme.color}35`,
                        }}
                      >
                        {theme.label}
                      </span>
                    </div>

                    <h3 className="solution-flow__step-title">{st.title}</h3>
                    <p className="solution-flow__step-desc">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problem vs UrQR Approach */}
      <section className="solution-detail__content section" aria-labelledby="solution-detail-content-heading">
        <div className="container">
          <div className="solution-detail__content-header text-center">
            <div className="section-label">Field Contrast</div>
            <h2 id="solution-detail-content-heading" className="field-contrast-title">
              Why generic POS systems fail in your dining environment
            </h2>
            <p className="field-contrast-sub">
              Traditional restaurant software assumes a relaxed diner with lots of waiters. UrQR was engineered for high turnaround velocity.
            </p>
          </div>

          <div className="solution-detail__columns">
            {/* Traditional Bottlenecks Panel */}
            <div className="solution-detail__panel-unit">
              <div className="resto-card-handler resto-card-handler--panel" aria-hidden="true">
                <div className="resto-handler__mount">
                  <span className="resto-handler__mount-peg" />
                </div>
                <div
                  className="resto-handler__reel resto-handler__reel--sm"
                  style={{ borderColor: "#DC2626", boxShadow: "0 3px 10px rgba(220, 38, 38, 0.25)" }}
                >
                  <span className="resto-handler__reel-core resto-handler__reel-core--sm" style={{ background: "#DC2626" }}>
                    ×
                  </span>
                </div>
                <div className="resto-handler__cord resto-handler__cord--sm" />
                <div className="resto-handler__panel-clip" style={{ borderColor: "#DC2626" }}>
                  <span className="panel-clip-jaw" />
                </div>
              </div>

              <div className="solution-detail__panel solution-detail__panel--challenge">
                <div className="panel-badge-challenge">TRADITIONAL BOTTLENECKS</div>
                <h3>Where standard operations lose money</h3>
                <ul>
                  {solution.painPoints.map((point) => (
                    <li key={point}>
                      <span className="cross-mark" aria-hidden="true">×</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The UrQR Solution Panel */}
            <div className="solution-detail__panel-unit">
              <div className="resto-card-handler resto-card-handler--panel" aria-hidden="true">
                <div className="resto-handler__mount">
                  <span className="resto-handler__mount-peg" />
                </div>
                <div
                  className="resto-handler__reel resto-handler__reel--sm"
                  style={{ borderColor: "#10B981", boxShadow: "0 3px 10px rgba(16, 185, 129, 0.25)" }}
                >
                  <span className="resto-handler__reel-core resto-handler__reel-core--sm" style={{ background: "#10B981" }}>
                    ✓
                  </span>
                </div>
                <div className="resto-handler__cord resto-handler__cord--sm" />
                <div className="resto-handler__panel-clip" style={{ borderColor: "#10B981" }}>
                  <span className="panel-clip-jaw" />
                </div>
              </div>

              <div className="solution-detail__panel solution-detail__panel--solution">
                <div className="panel-badge-solution">THE UrQR SOLUTION</div>
                <h3>How our operating system delivers velocity</h3>
                <ul>
                  {solution.howUrQRHelps.map((benefit) => (
                    <li key={benefit}>
                      <CheckCircle2 size={18} className="text-emerald flex-shrink-0" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="solution-detail__bottom-cta">
            <div>
              <strong>Ready to transform your {solution.name.toLowerCase()}?</strong>
              <p>Book an interactive demo with our engineers. We'll simulate your exact menu and seating layout.</p>
            </div>
            <Link to="/contact" className="btn btn--primary btn--md">
              Book Outlet Demo <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
