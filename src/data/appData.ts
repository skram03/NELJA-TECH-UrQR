// UrQR — Centralized Application Data & Restaurant Architecture
// Designed & Engineered by Nelja Tech (Bengaluru, India)

export interface MenuItem {
  id: string;
  name: string;
  kannadaName?: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  isPopular?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3;
  emoji: string;
  prepTimeMinutes: number;
  available: boolean;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
}

export interface RestaurantVertical {
  id: "military_hotel" | "cafe" | "fine_dining" | "qsr";
  name: string;
  kannadaTitle?: string;
  subtitle: string;
  badge: string;
  tableLabel: string;
  tableNumber: string;
  address: string;
  image: string;
  turnoverBoost: string;
  heroQuote: string;
  categories: MenuCategory[];
  items: MenuItem[];
  operationalWorkflow: {
    title: string;
    description: string;
    guestAction: string;
    staffAction: string;
    kitchenAction: string;
  }[];
}

export const RESTAURANT_VERTICALS: Record<string, RestaurantVertical> = {
  military_hotel: {
    id: "military_hotel",
    name: "Thoogudeepa Donne Biryani Hub",
    kannadaTitle: "ತೂಗುದೀಪ ದೊನ್ನೆ ಬಿರಿಯಾನಿ",
    subtitle: "Authentic Military Hotel • High-Velocity Lunch Rush",
    badge: "Fast-Paced Seat Dining",
    tableLabel: "Seat",
    tableNumber: "Seat 04 (Zone 1)",
    address: "24, Gandhi Bazaar Main Road, Basavanagudi, Bengaluru",
    image: "/images/food-spread.jpg",
    turnoverBoost: "+42% Faster Seat Turnover",
    heroQuote: "In lunch rush from 12:30 to 3:30 PM, seconds count. UrQR lets guests sit, scan, and fire biryani KOTs in under 60 seconds with zero waiter bottleneck.",
    categories: [
      { id: "all", name: "All Specials", icon: "🔥" },
      { id: "biryani", name: "Donne Biryani", icon: "🍲" },
      { id: "starters", name: "Military Starters", icon: "🍗" },
      { id: "gravies", name: "Rich Gravies", icon: "🥘" },
      { id: "drinks", name: "Coolers & Sherbets", icon: "🥤" },
    ],
    items: [
      {
        id: "tb-1",
        name: "Thoogudeepa Mutton Donne Biryani",
        kannadaName: "ಮಟನ್ ದೊನ್ನೆ ಬಿರಿಯಾನಿ",
        description: "Slow wood-fired dum cooked in authentic jeera samba rice with tender hill mutton, mint, green chilli, and house spices.",
        price: 310,
        category: "biryani",
        isVeg: false,
        isPopular: true,
        spiceLevel: 2,
        emoji: "🍲",
        prepTimeMinutes: 4,
        available: true,
      },
      {
        id: "tb-2",
        name: "Donne Chicken Biryani",
        kannadaName: "ಚಿಕನ್ ದೊನ್ನೆ ಬಿರಿಯಾನಿ",
        description: "Iconic military style donne biryani served with spicy onion-curd raita and rich aromatic gravy.",
        price: 240,
        category: "biryani",
        isVeg: false,
        isPopular: true,
        spiceLevel: 2,
        emoji: "🍗",
        prepTimeMinutes: 3,
        available: true,
      },
      {
        id: "tb-3",
        name: "Nati Style Chicken Sukka",
        kannadaName: "ನಾಟಿ ಕೋಳಿ ಸುಕ್ಕ",
        description: "Dry roasted country chicken tossed with fresh grated coconut, curry leaves, and hand-crushed black peppercorns.",
        price: 210,
        category: "starters",
        isVeg: false,
        isPopular: true,
        spiceLevel: 3,
        emoji: "🌶️",
        prepTimeMinutes: 8,
        available: true,
      },
      {
        id: "tb-4",
        name: "Mutton Chops Pepper Fry",
        kannadaName: "ಮಟನ್ ಚಾಪ್ಸ್ ಫ್ರೈ",
        description: "Succulent mutton ribs slow roasted in freshly roasted cumin-pepper spice paste with crispy curry leaves.",
        price: 290,
        category: "starters",
        isVeg: false,
        isPopular: true,
        spiceLevel: 3,
        emoji: "🍖",
        prepTimeMinutes: 10,
        available: true,
      },
      {
        id: "tb-5",
        name: "Mutton Boti Masala",
        kannadaName: "ಮಟನ್ ಬೋಟಿ ಮಸಾಲ",
        description: "Traditional military preparation with roasted onion gravy, garlic, and coriander.",
        price: 230,
        category: "gravies",
        isVeg: false,
        spiceLevel: 2,
        emoji: "🥘",
        prepTimeMinutes: 6,
        available: true,
      },
      {
        id: "tb-6",
        name: "Fresh Nannari Herbal Sherbet",
        kannadaName: "ನನ್ನಾರಿ ಶರಬತ್",
        description: "Chilled traditional cooling sarsaparilla root drink infused with lemon and basil seeds.",
        price: 60,
        category: "drinks",
        isVeg: true,
        isPopular: true,
        spiceLevel: 0,
        emoji: "🍋",
        prepTimeMinutes: 2,
        available: true,
      },
    ],
    operationalWorkflow: [
      {
        title: "1. Seat Pairing & Instant QR Scan",
        description: "Guest sits at Seat 04 and scans the acrylic seat stand using any phone camera.",
        guestAction: "Opens bilingual Kannada/English menu instantly without downloading any app.",
        staffAction: "Waiter Mobile Cockpit marks Seat 04 active on the floor grid.",
        kitchenAction: "Kitchen pass stands on alert for incoming seat ticket."
      },
      {
        title: "2. Zero-Friction KOT Punch",
        description: "Guest picks Donne Mutton Biryani + Chicken Sukka with 'extra pepper' note and taps Order.",
        guestAction: "Receives instant live order token #TH-402 on phone screen.",
        staffAction: "Assigned waiter receives haptic alert and seat card turns Amber (Dining).",
        kitchenAction: "Wood-fire Biryani station tablet rings and prints thermal KOT ticket."
      },
      {
        title: "3. Live Multi-Stage Cooking Stream",
        description: "Chef pushes 'Preparing' and 'Ready' buttons right on the stainless steel KDS screen.",
        guestAction: "Guest phone tracks status: Placed → In Pot → Ready to Serve with live timer.",
        staffAction: "Waiter mobile vibrates with 'Seat 04 Biryani Ready on Pass' alert.",
        kitchenAction: "Pass is cleared in under 4 minutes with zero lost tickets."
      },
      {
        title: "4. Rapid Table UPI Checkout",
        description: "Customer clicks 'Pay via UPI' right at the seat, scans dynamic QR via PhonePe/GPay.",
        guestAction: "Paid in 10 seconds, receives WhatsApp tax receipt, and vacates seat immediately.",
        staffAction: "Seat turns Rose (Bill Paid) and resets to Emerald (Vacant) automatically.",
        kitchenAction: "System updates daily sales and inventory in real-time."
      }
    ]
  },

  cafe: {
    id: "cafe",
    name: "Roast & Bloom Coffee Craft",
    subtitle: "Artisanal Specialty Coffee & European Bakery",
    badge: "Modern Gen-Z Cafe",
    tableLabel: "Table",
    tableNumber: "Table C-02",
    address: "80 Feet Road, Indiranagar, Bengaluru",
    image: "/images/cafe-ambiance.jpg",
    turnoverBoost: "+35% Faster Order Pacing",
    heroQuote: "No more shouting customer names over noisy espresso grinders. Guests relax at their table, customize oat milk, and get a discreet buzz when their latte is poured.",
    categories: [
      { id: "all", name: "All Craft", icon: "☕" },
      { id: "cold_brews", name: "Cold Brews", icon: "🧊" },
      { id: "espresso", name: "Hot Coffee", icon: "☕" },
      { id: "bakery", name: "Artisan Pastry", icon: "🥐" },
      { id: "brunch", name: "All-Day Toast", icon: "🥑" },
    ],
    items: [
      {
        id: "cf-1",
        name: "Single-Origin Nitro Cold Brew",
        description: "18-hour slow steeped Ethiopian Yirgacheffe bean infused with nitrogen for a velvety stout-like foam.",
        price: 210,
        category: "cold_brews",
        isVeg: true,
        isPopular: true,
        spiceLevel: 0,
        emoji: "🧊",
        prepTimeMinutes: 2,
        available: true,
      },
      {
        id: "cf-2",
        name: "Iced Ceremonial Matcha Latte",
        description: "First-harvest organic Uji matcha whisked with Madagascar vanilla and creamy barista oat milk.",
        price: 240,
        category: "cold_brews",
        isVeg: true,
        isPopular: true,
        spiceLevel: 0,
        emoji: "🍵",
        prepTimeMinutes: 3,
        available: true,
      },
      {
        id: "cf-3",
        name: "Double Ristretto Flat White",
        description: "Sweet concentrated espresso shot combined with velvety textured microfoam milk.",
        price: 180,
        category: "espresso",
        isVeg: true,
        emoji: "☕",
        prepTimeMinutes: 3,
        available: true,
      },
      {
        id: "cf-4",
        name: "Pistachio Rose Cruffin",
        description: "Flaky 48-hour laminated croissant muffin stuffed with Sicilian pistachio praline and rose cream.",
        price: 195,
        category: "bakery",
        isVeg: true,
        isPopular: true,
        emoji: "🥐",
        prepTimeMinutes: 1,
        available: true,
      },
      {
        id: "cf-5",
        name: "Truffle Avocado Sourdough",
        description: "Wild fermented sourdough toast topped with sliced Hass avocado, feta crumble, microgreens, and white truffle oil.",
        price: 290,
        category: "brunch",
        isVeg: true,
        emoji: "🥑",
        prepTimeMinutes: 7,
        available: true,
      },
    ],
    operationalWorkflow: [
      {
        title: "1. Table QR Scan & Mood Browsing",
        description: "Guests scan the subtle wooden table stand with iPhone or Android camera.",
        guestAction: "Selects oat milk, sweetness level (0%, 50%, 100%), and extra espresso shot.",
        staffAction: "Counter registers order without barista stepping away from the steam wand.",
        kitchenAction: "Coffee bar KDS displays drink modifiers in crisp high-contrast cards."
      },
      {
        title: "2. Live Barista Queue",
        description: "The order pops up in order of arrival with exact brewing specifications.",
        guestAction: "Guest works on laptop or chats without standing in a crowded line.",
        staffAction: "Zero misheard dairy allergies or sweetness mistakes.",
        kitchenAction: "Barista taps 'Poured' on tablet screen when steam cycle completes."
      },
      {
        title: "3. Silent Smartphone Pickup Buzz",
        description: "Customer receives a gentle haptic vibration on their phone: 'Your Matcha is ready at the bar!'",
        guestAction: "Walks up cleanly, picks up tray, and returns to work.",
        staffAction: "Noise level remains tranquil, preserving premium cafe ambiance.",
        kitchenAction: "Pastry inventory syncs live so sold-out cruffins disappear automatically."
      }
    ]
  },

  fine_dining: {
    id: "fine_dining",
    name: "The Amber Room Restobar",
    subtitle: "Progressive Indian Gastronomy & Wine Lounge",
    badge: "Luxury Multi-Course",
    tableLabel: "Table",
    tableNumber: "Table T-12",
    address: "UB City, Vittal Mallya Road, Bengaluru",
    image: "/images/fine-dining.jpg",
    turnoverBoost: "+28% Higher Average Order Value",
    heroQuote: "Fine dining demands elegance. UrQR preserves table intimacy with digital menus featuring sommelier wine pairings, staggered course pacing, and split bills.",
    categories: [
      { id: "all", name: "Full Carte", icon: "✨" },
      { id: "appetizers", name: "Amuse & Small Plates", icon: "🥗" },
      { id: "entrees", name: "Signatures", icon: "🥩" },
      { id: "cocktails", name: "Mixology & Cellar", icon: "🍸" },
      { id: "desserts", name: "Sweet Finish", icon: "🍮" },
    ],
    items: [
      {
        id: "fd-1",
        name: "Wild Mushroom & Truffle Risotto",
        description: "Slow-stirred Carnaroli rice with porcini dust, black winter truffle carpaccio, and 24-month aged Parmigiano.",
        price: 540,
        category: "entrees",
        isVeg: true,
        isPopular: true,
        emoji: "🍄",
        prepTimeMinutes: 16,
        available: true,
      },
      {
        id: "fd-2",
        name: "Smoked Rosemary Lamb Shanks",
        description: "New Zealand lamb braised for 7 hours in pinot noir reduction, roasted garlic mash, and baby carrots.",
        price: 760,
        category: "entrees",
        isVeg: false,
        isPopular: true,
        emoji: "🥩",
        prepTimeMinutes: 20,
        available: true,
      },
      {
        id: "fd-3",
        name: "Heirloom Tomato & Burrata Salad",
        description: "Creamy artisanal burrata with compressed peaches, basil chlorophyll oil, and aged Modena balsamic pearls.",
        price: 430,
        category: "appetizers",
        isVeg: true,
        emoji: "🥗",
        prepTimeMinutes: 8,
        available: true,
      },
      {
        id: "fd-4",
        name: "Smoked Oak Old Fashioned",
        description: "Bourbon whisky infused with charred orange zest, aromatic bitters, and presented under cloche smoke.",
        price: 490,
        category: "cocktails",
        isVeg: true,
        isPopular: true,
        emoji: "🥃",
        prepTimeMinutes: 5,
        available: true,
      },
    ],
    operationalWorkflow: [
      {
        title: "1. Sommelier & Course Pacing",
        description: "Guests view high-resolution photography, tasting notes, and recommended wine pairings.",
        guestAction: "Can stagger order: Appetizers fired immediately, Entrees held until signaled.",
        staffAction: "Captain tablet oversees table pacing with elapsed dining timers.",
        kitchenAction: "Main kitchen prepares sauces and proteins in synchronized coordination."
      },
      {
        title: "2. Table Concierge (Call Waiter)",
        description: "Discrete digital call button: 'Refill Wine', 'Extra Silverware', 'Speak to Captain'.",
        guestAction: "Zero awkward hand waving or eye contact chasing across the dining room.",
        staffAction: "Assigned steward's watch or mobile vibrates with exact table request.",
        kitchenAction: "Chef alerted before second course is fired."
      },
      {
        title: "3. Seat-Level Split Payment",
        description: "Guests split bill equally or select exact items consumed right on their individual phones.",
        guestAction: "Pay via Apple Pay, Google Pay, Credit Card or UPI simultaneously.",
        staffAction: "No running back and forth with card machines or paper folders.",
        kitchenAction: "Table marked clean and ready for the next guest reservation."
      }
    ]
  },

  qsr: {
    id: "qsr",
    name: "Spice Route Fast Casual",
    subtitle: "Rapid Food Court & Quick Service Bites",
    badge: "Zero-Queue Fast Casual",
    tableLabel: "Token",
    tableNumber: "Order #Q-88",
    address: "Food Court, Phoenix Marketcity, Bengaluru",
    image: "/images/hero-restaurant.jpg",
    turnoverBoost: "3x More Orders During Rush Hours",
    heroQuote: "Eliminate 20-person counter queues. Guests grab a table, scan, pay on UPI, and watch their token ready on the digital pickup screen.",
    categories: [
      { id: "all", name: "Quick Picks", icon: "⚡" },
      { id: "rolls", name: "Kathi Rolls", icon: "🌯" },
      { id: "bowls", name: "Rice Bowls", icon: "🍚" },
      { id: "sides", name: "Sides & Chai", icon: "🍟" },
    ],
    items: [
      {
        id: "qsr-1",
        name: "Smoked Paneer Tikka Roll",
        description: "Crispy layered paratha wrapped around tandoor-roasted paneer, mint mayo, and tangy pickled onions.",
        price: 145,
        category: "rolls",
        isVeg: true,
        isPopular: true,
        emoji: "🌯",
        prepTimeMinutes: 3,
        available: true,
      },
      {
        id: "qsr-2",
        name: "Classic Butter Chicken Rice Bowl",
        description: "Steaming basmati jeera rice drenched in velvety tomato-butter makhani sauce with chicken tikka chunks.",
        price: 219,
        category: "bowls",
        isVeg: false,
        isPopular: true,
        emoji: "🍚",
        prepTimeMinutes: 4,
        available: true,
      },
      {
        id: "qsr-3",
        name: "Peri Peri Gunpowder Fries",
        description: "Crisp potato fries dusted with authentic South Indian spiced podi and fiery peri peri seasoning.",
        price: 99,
        category: "sides",
        isVeg: true,
        emoji: "🍟",
        prepTimeMinutes: 3,
        available: true,
      },
    ],
    operationalWorkflow: [
      {
        title: "1. Food Court Seat Scan",
        description: "Customer finds any vacant bench, scans the QR sticker, and opens the fast menu.",
        guestAction: "Selects combo, pays on UPI in 15 seconds, and receives Digital Token #88.",
        staffAction: "Counter crew doesn't need to punch cash registers or take orders manually.",
        kitchenAction: "Assembly line starts assembling rolls and bowls immediately."
      },
      {
        title: "2. Digital Bay Notification",
        description: "Large counter monitor and guest phone flash: 'Token #88 Ready at Bay 2'.",
        guestAction: "Walks up, displays phone screen token, grabs tray, and enjoys meal.",
        staffAction: "Zero bottleneck at the counter, processing 180+ guests per hour seamlessly.",
        kitchenAction: "Automated stock tracking prevents overselling during rush hours."
      }
    ]
  }
};

export const DEMO_RESTAURANT = {
  name: RESTAURANT_VERTICALS.military_hotel.name,
  tagline: RESTAURANT_VERTICALS.military_hotel.subtitle,
  address: RESTAURANT_VERTICALS.military_hotel.address,
  tableNumber: RESTAURANT_VERTICALS.military_hotel.tableNumber,
};

export const DEMO_CATEGORIES = RESTAURANT_VERTICALS.military_hotel.categories;
export const DEMO_MENU_ITEMS = RESTAURANT_VERTICALS.military_hotel.items;

export interface ProductModule {
  id: string;
  role: "guest" | "waiter" | "kitchen" | "manager";
  title: string;
  badge: string;
  badgeClass: string;
  headline: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  metrics: string;
}

export const PRODUCT_MODULES: ProductModule[] = [
  {
    id: "guest-qr-order",
    role: "guest",
    title: "Guest Mobile Ordering Suite",
    badge: "Customer Experience",
    badgeClass: "chip--emerald",
    headline: "Zero-app QR dining that feels like a native mobile app",
    description: "When guests sit down, they scan a table QR code with any smartphone camera. Your full menu opens in their browser in under 1.2 seconds. Guests can browse rich photos, switch between English and Kannada, customize spice levels, and punch orders directly to the kitchen.",
    highlights: [
      "No app download or account registration required",
      "Bilingual typography (English & Kannada script toggle)",
      "Dietary badges: Veg, Non-Veg, Chef Specials & Spice Levels (🌶️)",
      "Item drawer with cooking notes (e.g. 'less oil', 'extra spicy')",
      "Live order status tracker (Placed → In Kitchen → Ready to Serve)",
      "Digital Table Concierge: Call Waiter, Request Water, Clean Table",
      "Dynamic on-table UPI QR checkout (PhonePe, GPay, Paytm)"
    ],
    image: "/images/qr-scan.jpg",
    imageAlt: "Customer scanning QR code at dining table",
    metrics: "1.2s Load Speed • 0 App Downloads • 100% Mobile Compatible"
  },
  {
    id: "waiter-cockpit",
    role: "waiter",
    title: "Waiter Mobile & Tablet Cockpit",
    badge: "Floor Velocity",
    badgeClass: "chip--amber",
    headline: "Real-time seat floor plan with instant buzzer notifications",
    description: "Equip your floor stewards with a high-velocity mobile companion. Waiters log in with a 4-digit shift PIN, see their assigned seats (e.g. Seats 01 to 10), receive instant alerts when customers need assistance or kitchen food is ready, and take orders on the fly.",
    highlights: [
      "Color-coded seat tokens: Emerald (Vacant), Amber (Dining), Rose (Bill Req)",
      "Vibration & audio chime on customer service calls and kitchen alerts",
      "Quick touch order pad for manual guest order taking",
      "Instant seat transfer, bill splitting, and discount management",
      "One-tap bill collection (Cash, Card, UPI) and thermal KOT reprint",
      "Shift telemetry: sales summary, tips jar, and active tables served"
    ],
    image: "/images/hero-restaurant.jpg",
    imageAlt: "Waiter managing floor tables on mobile device",
    metrics: "+40% More Tables Served per Waiter • Zero Order Confusion"
  },
  {
    id: "kitchen-kds",
    role: "kitchen",
    title: "Kitchen Display System (KDS)",
    badge: "Kitchen Pass Stream",
    badgeClass: "chip--cyan",
    headline: "Eliminate paper chaos with live digital cooking tickets",
    description: "Replace lost, greasy paper tickets with high-contrast, durable touchscreen displays at each cooking station. Orders appear chronologically with color-coded elapsed time alerts, dish modifiers, and one-tap status updates that automatically inform floor waiters and guests.",
    highlights: [
      "Live order stream sorted by elapsed cooking time",
      "Red alert countdown indicators for delayed dishes",
      "Station routing: Biryani Dum, Tandoor & Grill, Starters, Barista",
      "Special cooking notes highlighted in bright amber",
      "One-tap 'Mark Preparing' and 'Mark Ready' actions",
      "Instant sound chime notifying assigned waiter on pass dispatch"
    ],
    image: "/images/kitchen-team.jpg",
    imageAlt: "Chef handling orders on kitchen display screen",
    metrics: "-6 Min Average Preparation Time • Zero Lost Tickets"
  },
  {
    id: "manager-pos-telemetry",
    role: "manager",
    title: "Manager POS & Real-Time Telemetry",
    badge: "Executive Operations",
    badgeClass: "chip--purple",
    headline: "Live sales telemetry, dish velocity, and floor analytics",
    description: "Give restaurant owners and captains total operational transparency. Watch real-time revenue climb, monitor table turnover velocity, see which dishes are trending, and toggle out-of-stock items in a single tap across all table QR codes simultaneously.",
    highlights: [
      "Live daily sales ticker and average ticket size tracking",
      "Table turnover velocity metrics and peak hour analysis",
      "One-tap 86 / Sold-Out dish toggler across all digital menus",
      "Cash drawer balance, waiter tip logs, and shift Z-reports",
      "Multi-outlet remote dashboard for restaurant chain owners",
      "Customer feedback analytics and item popularity ranking"
    ],
    image: "/images/fine-dining.jpg",
    imageAlt: "Manager reviewing restaurant floor analytics",
    metrics: "100% Real-Time Floor Telemetry • Remote Multi-Outlet Control"
  }
];

export interface SolutionType {
  id: string;
  icon: string;
  name: string;
  tag: string;
  headline: string;
  turnoverStat: string;
  painPoints: string[];
  howUrQRHelps: string[];
}

export const SOLUTIONS: SolutionType[] = [
  {
    id: "military_hotel",
    icon: "🍗",
    name: "Military Hotels & Biryani Hubs",
    tag: "High-Velocity Rush",
    headline: "Conquer peak lunch rushes with seat-level ordering and 15-second table turnover",
    turnoverStat: "+42% Table Turnover",
    painPoints: [
      "Intense lunch rush (12:30–3:30 PM) creates 20-minute waiting lines outside",
      "Waiters overwhelmed trying to balance taking orders, serving, and calculating bills",
      "Physical paper menus get stained with oil, torn, or misplaced",
      "Guests standing at cash counter bottlenecking the restaurant exit"
    ],
    howUrQRHelps: [
      "Seat-level QR code lets guests order Donne Biryani within 60 seconds of sitting down",
      "KOT fires instantly to firewood dum pass — zero waiter delay",
      "Waiter Mobile Cockpit shows exact seat status with Amber Dining and Rose Billing badges",
      "Dynamic table UPI QR payment allows guests to pay and vacate seat in 15 seconds flat"
    ],
  },
  {
    id: "cafe",
    icon: "☕",
    name: "Specialty Cafes & Bakeries",
    tag: "Modern Vibe",
    headline: "Aesthetic digital menus with custom modifiers and silent pickup buzzers",
    turnoverStat: "+35% Order Volume",
    painPoints: [
      "Loud baristas shouting customer names over noisy grinders disrupts chill cafe vibe",
      "Counter queues block entrance, discouraging takeaway guests",
      "Daily bakery batch specials sell out quickly without customers knowing",
      "Complex beverage customisations (oat milk, sugar %, extra shot) get misheard"
    ],
    howUrQRHelps: [
      "Guests sit comfortably and browse high-res photography of cruffins and pour-overs",
      "Custom modifier pills for dairy alternatives, ice, and roast profiles",
      "Order routes directly to Barista KDS tablet behind the coffee machine",
      "Guest smartphone silently vibrates when beverage is poured and ready at pickup bay"
    ],
  },
  {
    id: "fine_dining",
    icon: "🍷",
    name: "Fine Dining & Restobars",
    tag: "Luxury Multi-Course",
    headline: "Elevate dining intimacy with sommelier pairings and discrete table calls",
    turnoverStat: "+28% Higher Average Check",
    painPoints: [
      "Guests awkwardly waving hands to get waiter attention across large dining halls",
      "Difficulty pacing multi-course dining (appetizers arriving alongside main courses)",
      "Complex split bill calculations between groups of 6+ diners delays table reset",
      "Expensive leather physical menus require costly reprints whenever wine vintages change"
    ],
    howUrQRHelps: [
      "Interactive digital carte featuring wine pairing recommendations and ingredient provenance",
      "Discrete 'Call Waiter' button alerts steward's smartwatch or phone silently",
      "Staggered course firing allows guests to order starters first and hold entrees",
      "On-phone itemized split bill calculation with simultaneous card or UPI settlement"
    ],
  },
  {
    id: "qsr",
    icon: "⚡",
    name: "QSRs & Food Courts",
    tag: "Fast Casual",
    headline: "Eliminate cash counter queues with automated token pickup flow",
    turnoverStat: "3x Faster Order Throughput",
    painPoints: [
      "Long order queues make impatient customers walk away during rush hours",
      "Cashiers make manual punching errors while hurrying through queues",
      "Managing multiple counters and kitchen stations is chaotic",
      "No direct way to notify customer when their order is hot and ready"
    ],
    howUrQRHelps: [
      "Unified table or kiosk QR lets customers order from multiple brands on one phone",
      "Instant token number generated with live preparation status countdown",
      "Counter screens flash token ready status with automated notification chime",
      "Zero line bottlenecks, reducing cashier staffing costs by 50%"
    ],
  },
  {
    id: "cloud",
    icon: "📦",
    name: "Cloud Kitchens & Dark Brands",
    tag: "Direct Brand Experience",
    headline: "Showcase your brand independently with visual storytelling and zero aggregator fees",
    turnoverStat: "100% Margin Retention",
    painPoints: [
      "Trapped under high 25–30% aggregator commissions (Swiggy/Zomato)",
      "Zero customer data or direct brand relationship",
      "Limited ability to display brand identity or tell ingredient stories"
    ],
    howUrQRHelps: [
      "Direct digital menu link to share on Instagram, WhatsApp, and Google My Business",
      "Rich brand styling with custom brand colors, chef stories, and packaging previews",
      "Direct UPI payment without 30% aggregator cuts",
      "Customer re-order incentives and direct marketing data ownership"
    ],
  },
  {
    id: "chain",
    icon: "🏢",
    name: "Multi-Outlet Restaurant Chains",
    tag: "Enterprise Consistency",
    headline: "Synchronize menus, pricing, and operational telemetry across 50+ locations",
    turnoverStat: "Centralized Sync in 1s",
    painPoints: [
      "Menu and price discrepancies between different city branches",
      "Slow, error-prone rollout of seasonal dishes across multiple outlets",
      "Lack of centralized visibility into outlet-by-outlet sales and staff velocity"
    ],
    howUrQRHelps: [
      "Push menu changes, seasonal festivals, and price updates to all branches in 1 click",
      "Location-level override controls for regional dishes and localized taxes",
      "Master executive telemetry dashboard comparing outlet turnover rates",
      "Role-based access permissions for branch managers, captains, and head office"
    ],
  }
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "product" | "guest" | "hardware" | "business";
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq1",
    question: "Do guests need to download an application from the Play Store or App Store?",
    answer: "No! Guests simply open their phone's standard camera and scan the QR stand at their table. The UrQR experience is a lightning-fast Progressive Web Application that loads in any mobile browser (Safari, Chrome, Firefox) in under 1.2 seconds without any installation or account sign-up.",
    category: "guest",
  },
  {
    id: "faq2",
    question: "How does UrQR work in high-rush restaurants like Donne Biryani or Military Hotels?",
    answer: "UrQR was engineered specifically for high-velocity rush hours. Each seat or table has its own unique QR code. When a customer sits down and orders, the KOT fires straight to the kitchen firewood pass, and the assigned waiter's phone immediately marks the seat 'Dining' with running balance. When finished, guests pay via on-table UPI QR in 15 seconds, allowing immediate seat turnover.",
    category: "product",
  },
  {
    id: "faq3",
    question: "Can waiters still punch orders for elderly customers or walk-in guests manually?",
    answer: "Yes, 100%! The Waiter Mobile Cockpit and Table POS include a fast touch-order pad. Stewards can walk up to any table, select items, punch KOTs, and add them to the table's running bill seamlessly alongside customer digital orders.",
    category: "product",
  },
  {
    id: "faq4",
    question: "What hardware is required to run Nelja Tech UrQR?",
    answer: "UrQR runs on standard, affordable commercial hardware. For tables: durable acrylic or metal QR stands. For kitchen: any standard 10-inch Android or iOS tablet mounted in a splash-proof casing. For waiters: any standard smartphone running Android or iOS. For thermal billing: standard Bluetooth or ESC/POS USB network thermal receipt printers.",
    category: "hardware",
  },
  {
    id: "faq5",
    question: "What happens if a dish runs out of stock during lunch rush?",
    answer: "Managers or captains can toggle any dish to 'Sold Out / 86' in a single tap from their smartphone or POS console. That item instantly greys out across every table's QR menu in real time, preventing awkward cancellations and kitchen arguments.",
    category: "product",
  },
  {
    id: "faq6",
    question: "Does UrQR support bilingual menus like Kannada & English?",
    answer: "Yes! UrQR includes native bilingual support (such as English and Kannada). Dishes feature authentic local scripts (e.g. 'ಮಟನ್ ದೊನ್ನೆ ಬಿರಿಯಾನಿ', 'ನಾಟಿ ಕೋಳಿ ಸುಕ್ಕ') so guests can explore in their preferred language.",
    category: "product",
  },
  {
    id: "faq7",
    question: "How does the 'Call Waiter' or Table Concierge feature work?",
    answer: "Guests can tap one-click quick service buttons right on their mobile menu: 'Request Water Bottle', 'Extra Cutlery & Plates', 'Clean Table', or 'Call Captain'. The assigned floor waiter's smartphone immediately chimes with a vibration and table number notification.",
    category: "product",
  },
  {
    id: "faq8",
    question: "How does payment collection work at the table?",
    answer: "When guests tap 'Pay Bill', a dynamic UPI QR code appears with the exact GST-compliant total amount. Guests can pay using PhonePe, Google Pay, Paytm, or Cred. The waiter's mobile cockpit updates instantly with payment confirmation and prints a thermal receipt upon request.",
    category: "business",
  },
  {
    id: "faq9",
    question: "Can UrQR support multi-outlet restaurant chains with 10+ locations?",
    answer: "Yes! The Nelja Tech platform features multi-outlet architecture. You can manage multiple branches across Bengaluru, Mysuru, or any city from a centralized headquarters console with brand-wide menu pushes and individual branch telemetry.",
    category: "business",
  },
  {
    id: "faq10",
    question: "How quickly can Nelja Tech onboard our restaurant?",
    answer: "Our Bengaluru deployment team can digitize your existing menu, generate table QR stands, configure kitchen tablets, and train your floor staff within 24 to 48 hours for a live operational launch.",
    category: "business",
  }
];

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  badge: string;
  description: string;
  highlights: string[];
}

export const FEATURES: FeatureItem[] = [
  {
    id: "instant-qr",
    icon: "QrCode",
    title: "1.2s Fast QR Menu",
    badge: "0 App Friction",
    description: "Camera scan opens an interactive web app with high-res food photos, Kannada/English toggle, and live spice levels.",
    highlights: ["Works on any phone", "Zero app downloads", "Bilingual typography", "Category quick jump"]
  },
  {
    id: "kot-fire",
    icon: "Flame",
    title: "Direct Wood-Fire KOT",
    badge: "Live Kitchen Sync",
    description: "Orders fire in real time directly to station kitchen tablets. Elapsed time counters prevent delayed orders.",
    highlights: ["Station ticket routing", "Cooking timer countdown", "Zero lost tickets", "Special notes field"]
  },
  {
    id: "waiter-grid",
    icon: "Smartphone",
    title: "Waiter Mobile Cockpit",
    badge: "10-Seat Floor Map",
    description: "Stewards track floor status via color-coded seat tokens: Emerald (Vacant), Amber (Dining), and Rose (Billing).",
    highlights: ["Vibration alert chime", "Customer call notification", "Seat re-assignment", "PIN shift authentication"]
  },
  {
    id: "table-upi",
    icon: "Zap",
    title: "On-Table Dynamic UPI QR",
    badge: "15s Checkout",
    description: "Generate table-specific UPI QR codes for instant payments through PhonePe, GPay, Paytm, and Cred.",
    highlights: ["Instant payment verification", "5% GST tax invoice", "Split-bill math", "Digital WhatsApp receipt"]
  },
  {
    id: "stock-control",
    icon: "ToggleRight",
    title: "Real-Time 86 Toggler",
    badge: "Zero Stockouts",
    description: "Sold out of Mutton Chops? Tap once in the dashboard and the dish disappears across all table menus immediately.",
    highlights: ["Instant multi-table sync", "Batch inventory count", "Prevent awkward apologies", "Auto-schedule specials"]
  },
  {
    id: "analytics",
    icon: "BarChart3",
    title: "Live Rush Telemetry",
    badge: "Data-Driven Profit",
    description: "Track hourly order velocity, seat turnover rates, top-selling dishes, and staff table servicing metrics.",
    highlights: ["Seat turnover velocity", "Peak hour analytics", "Daily Z-reports", "Multi-branch comparison"]
  }
];

export interface WorkflowStep {
  id: string;
  number: string;
  actor: "Guest at Table" | "Floor Waiter" | "Kitchen Chef" | "Manager & Register";
  actorBadge: string;
  title: string;
  description: string;
  details: string[];
}

export const HOW_IT_WORKS_STEPS: WorkflowStep[] = [
  {
    id: "step-1",
    number: "01",
    actor: "Guest at Table",
    actorBadge: "At The Table",
    title: "Sit, Scan & Explore Menu in 1.2 Seconds",
    description: "Guest sits at their table or seat, points their smartphone camera at the custom acrylic QR stand, and immediately views the interactive digital menu without installing any app.",
    details: [
      "Selects preferred language (Kannada or English)",
      "Browses high-resolution dish photography and spice ratings",
      "Adds Donne Biryani, Starters, or Iced Brews with custom notes",
      "Reviews cart and taps 'Punch Order'"
    ]
  },
  {
    id: "step-2",
    number: "02",
    actor: "Floor Waiter",
    actorBadge: "Floor Cockpit",
    title: "Instant Waiter Alert & Floor Map Sync",
    description: "The assigned steward's smartphone chimes with a gentle vibration. On their 10-seat floor grid, the seat badge switches from Emerald (Vacant) to Amber (Dining) with live bill tracking.",
    details: [
      "Waiter verifies table pairing on mobile screen",
      "Receives customer service chimes ('Water refill', 'Extra plates')",
      "Can add manual add-ons or special chef requests at the table",
      "Full oversight of table elapsed dining time"
    ]
  },
  {
    id: "step-3",
    number: "03",
    actor: "Kitchen Chef",
    actorBadge: "Kitchen Pass",
    title: "Live Ticket Dispatch to Cooking Stations",
    description: "The order tickets appear in real time on rugged kitchen display tablets. Chefs see items grouped by station with exact cooking notes and color-coded timers.",
    details: [
      "Dum Biryani, Tandoor, and Starters routed to specific stations",
      "Chefs tap 'Preparing' when dishes hit the pan",
      "Chef taps 'Ready' when plated — ringing the waiter mobile for pickup",
      "Guest's phone updates simultaneously with live dish tracking"
    ]
  },
  {
    id: "step-4",
    number: "04",
    actor: "Manager & Register",
    actorBadge: "Checkout & Close",
    title: "15-Second Table UPI Settlement & Auto Reset",
    description: "Guest taps 'Pay via UPI' right on their phone screen. A dynamic GST invoice QR code is scanned via PhonePe or GPay. Payment confirms instantly, resetting the table for the next customer.",
    details: [
      "Zero line waiting at the cash register",
      "Digital tax invoice sent to customer WhatsApp/SMS",
      "Seat resets to Emerald (Vacant) automatically on waiter floor map",
      "Day-end Z-report records revenue, tax, and sales telemetry"
    ]
  }
];
