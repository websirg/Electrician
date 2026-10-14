/**
 * =========================================================================
 * SAGAR ELECTRANICS - BUSINESS CONFIGURATION FILE
 * =========================================================================
 * Central configuration file for all business contact details, operational
 * settings, service categories, rate cards, and booking preferences.
 */

const SAGAR_CONFIG = {
  // Business Identity
  businessName: "Sagar Electranics",
  tagline: "Certified, Fast & Reliable Electrical Services at Your Doorstep",
  ownerName: "Sagar & Team",

  // Primary Calling Phone Number (Format with spaces/hyphens for display)
  phoneDisplay: "+91 98765 43210", // <-- REPLACE WITH YOUR REAL DISPLAY PHONE NUMBER
  phoneRaw: "+919876543210",       // <-- REPLACE WITH YOUR REAL CALLING NUMBER

  // WhatsApp Business Number (Digits only, include country code, e.g., 91XXXXXXXXXX)
  whatsappNumber: "919876543210",  // <-- REPLACE WITH YOUR REAL WHATSAPP NUMBER

  // Default WhatsApp Floating Message
  whatsappDefaultMsg: "Hello Sagar Electranics, I need an electrician service at my home/office. Please share technician availability and charges.",

  // Business Email Address
  email: "contact@sagarelectranics.com", // <-- REPLACE WITH YOUR REAL BUSINESS EMAIL

  // Service Coverage Area
  serviceArea: "All residential & commercial areas across City & suburbs within 25 km radius",

  // Business Operational Hours
  businessHours: {
    weekdays: "Monday – Saturday: 8:00 AM – 9:00 PM",
    sunday: "Sunday: 9:00 AM – 5:00 PM (Emergency calls 24/7)",
    emergencySupport: "24/7 Emergency Support Available"
  },

  // Physical Location / Shop Address
  address: {
    shopLocation: "Shop #14, Main Electrical Market, Near Metro Station",
    city: "City Center",
    pincode: "110001",
    state: "State",
    country: "India"
  },

  // Google Reviews URL
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",

  // Google Maps Embed URL
  googleMapsEmbedUrl: "",

  // Currency used in quotes or estimates
  currency: "₹",

  // Live Technician Status for Hero
  liveStatus: {
    availableTechnicians: 4,
    avgArrivalTimeMinutes: 35,
    satisfactionRate: "99.4%"
  },

  // Services List with Categories, Transparent Starting Rates, and Durations
  services: [
    {
      id: "home-repairs",
      category: "emergency",
      categoryName: "Emergency Repairs",
      title: "Home Electrical Repairs",
      icon: "wrench",
      badge: "Quick Fix",
      startsAt: "₹149",
      duration: "30 mins",
      rating: "4.9",
      description: "Fast doorstep diagnosis and repair for switch faults, power cuts, loose wires, and tripped circuits.",
      features: ["Switch & plug replacements", "Fluctuation troubleshooting", "Earthing fault diagnosis"]
    },
    {
      id: "wiring-rewiring",
      category: "wiring",
      categoryName: "Wiring & Safety",
      title: "Wiring and Rewiring",
      icon: "cable",
      badge: "Safety Grade",
      startsAt: "₹499",
      duration: "1-3 hours",
      rating: "4.95",
      description: "Concealed conduit wiring, fire-retardant cable installation, complete apartment wiring, and load balancing.",
      features: ["FR fire-resistant cables", "Concealed wall channeling", "Full load capacity testing"]
    },
    {
      id: "fan-light",
      category: "appliances",
      categoryName: "Lights & Fans",
      title: "Fan and Light Installation",
      icon: "lightbulb",
      badge: "Most Booked",
      startsAt: "₹199",
      duration: "45 mins",
      rating: "5.0",
      description: "Installation & repair of ceiling fans, LED panel cove lights, chandeliers, and aesthetic outdoor lighting.",
      features: ["Ceiling & exhaust fans", "False ceiling profile lights", "Heavy chandelier mounting"]
    },
    {
      id: "switchboard-socket",
      category: "appliances",
      categoryName: "Lights & Fans",
      title: "Switchboard & Socket Repair",
      icon: "toggle-right",
      badge: "Rapid Response",
      startsAt: "₹149",
      duration: "30 mins",
      rating: "4.85",
      description: "Replacement of burnt sockets, modular board fitting, 16A heavy appliance power points (AC, geysers, microwaves).",
      features: ["Modular switches replacement", "Heavy AC/Geyser 16A points", "Smart switch compatibility"]
    },
    {
      id: "mcb-fuse-shortcircuit",
      category: "emergency",
      categoryName: "Emergency Repairs",
      title: "MCB, Fuse & Short-Circuit",
      icon: "zap",
      badge: "24/7 SOS",
      startsAt: "₹299",
      duration: "45 mins",
      rating: "4.98",
      description: "Immediate isolation and repair of tripping MCBs, burning smells, sparks, blown fuses, and dangerous short circuits.",
      features: ["MCB & RCCB trip diagnosis", "Dangerous spark isolation", "Main distribution box repair"]
    },
    {
      id: "inverter-installation",
      category: "wiring",
      categoryName: "Wiring & Safety",
      title: "Inverter & Battery Setup",
      icon: "battery-charging",
      badge: "Power Backup",
      startsAt: "₹399",
      duration: "60 mins",
      rating: "4.9",
      description: "Complete inverter setup, dual battery wiring, changeover switch installation, and backup failure troubleshooting.",
      features: ["Inverter & battery wiring", "Changeover bypass switch", "Backup load calculation"]
    },
    {
      id: "commercial-maintenance",
      category: "commercial",
      categoryName: "Commercial",
      title: "Commercial Maintenance",
      icon: "building-2",
      badge: "B2B Grade",
      startsAt: "Custom Quote",
      duration: "Scheduled",
      rating: "4.92",
      description: "Dedicated maintenance for offices, retail stores, cafes, clinics, warehouses, and three-phase lines.",
      features: ["Three-phase system audits", "Monthly safety AMC", "Rapid breakdown priority"]
    },
    {
      id: "inspection-audit",
      category: "commercial",
      categoryName: "Commercial",
      title: "Electrical Safety Audit",
      icon: "shield-check",
      badge: "Complete Audit",
      startsAt: "₹349",
      duration: "60 mins",
      rating: "4.95",
      description: "Comprehensive home & shop safety inspection, earthing resistance testing, and load distribution reports.",
      features: ["Earthing resistance test", "Thermal overload inspection", "Detailed safety scorecard"]
    }
  ],

  // Recent simulated bookings for social proof ticker
  recentBookingsTicker: [
    { name: "Rahul S.", area: "Sector 14", service: "Inverter Setup", time: "4 mins ago" },
    { name: "Pooja M.", area: "Green Park", service: "Ceiling Fan Fitting", time: "9 mins ago" },
    { name: "Vikram K.", area: "Model Town", service: "MCB Tripping Fix", time: "16 mins ago" },
    { name: "Amit G.", area: "Civil Lines", service: "Modular Switchboard", time: "22 mins ago" }
  ],

  // Backend / Notification Integration
  backend: {
    mode: "whatsapp",
    webhookUrl: "",
    notes: "Default delivery forwards complete booking payload to WhatsApp and preserves a local backup in browser storage."
  }
};

window.SAGAR_CONFIG = SAGAR_CONFIG;
