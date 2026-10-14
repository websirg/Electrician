# Sagar Electranics - Professional Electrician Service Website

A modern, high-conversion, responsive website for **Sagar Electranics**, built with HTML5, CSS3, Bootstrap 5.3, Lucide Icons, and JavaScript.

---

## ⚡ Key Features

- **Brand Design:** Dark Navy (`#0B1220`), Electric Yellow (`#FFD43B`), and crisp White typography with subtle electrical glow accents.
- **Hero Section:** High-impact headline, trust indicators, quick call/booking CTAs, and professional imagery.
- **8 Core Electrical Services:**
  1. Home Electrical Repairs
  2. Wiring and Rewiring
  3. Fan and Light Installation
  4. Switchboard & Socket Repair
  5. MCB, Fuse & Short-Circuit Troubleshooting
  6. Inverter & Battery Setup
  7. Commercial Electrical Maintenance
  8. Electrical Inspection & Safety Audit
- **Interactive Service Pre-selection:** Clicking "Book This Service" automatically scrolls down to the booking form and preselects the chosen service.
- **Fully Validated Booking Form:**
  - Full Name validation (min 3 chars)
  - 10-digit mobile number validation
  - Service selection dropdown
  - Full address / landmark
  - Preferred date (auto-blocks past dates)
  - Preferred time slot
  - Issue description notes
  - Unique Booking Reference ID generator (e.g., `SE-202610-8472`)
  - Duplicate submission prevention
- **Instant WhatsApp Booking Flow:**
  - Prepares a clean, formatted multi-line WhatsApp message with all customer details.
  - Automatically launches WhatsApp to forward booking details to the business owner.
  - Client-side storage (`localStorage`) backup of recent bookings.
- **Direct Calling Integration:** Working `tel:` links on desktop and mobile.
- **Floating WhatsApp Button:** With pulse ring animation and hover greeting.
- **Mobile Sticky Bottom Action Bar:** 1-tap Call, WhatsApp, and Booking buttons.
- **Why Choose Us & How It Works:** 3-step timeline and trust cards without fabricated guarantees.
- **FAQ Accordion & Customer Reviews:** Structured for local SEO and client peace of mind.
- **Central Configuration File:** All business information is in `js/config.js`.

---

## 🚀 How to Run the Website

### Option 1: Direct Double Click
Simply double click `index.html` on your computer to open it in Google Chrome, Microsoft Edge, Firefox, or any modern web browser.

### Option 2: Using VS Code Live Server
1. Open the folder `Desktop/electrician/sagar` in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Python Local Server (Optional)
Run in PowerShell:
```powershell
python -m http.server 8080
```
Then visit `http://localhost:8080`.

---

## ⚙️ How to Customize Business Details

All business details are centralized in one single file:
👉 **`js/config.js`**

Open `js/config.js` in Notepad or your code editor to edit:

| Field | Description | Example |
| :--- | :--- | :--- |
| `phoneDisplay` | Display telephone number | `"+91 98765 43210"` |
| `phoneRaw` | Raw telephone for calling (`tel:`) | `"+919876543210"` |
| `whatsappNumber` | WhatsApp with country code (no `+` or spaces) | `"919876543210"` |
| `email` | Business email | `"contact@sagarelectranics.com"` |
| `serviceArea` | Your city/radius coverage | `"All areas within 25 km of City Center"` |
| `businessHours` | Opening hours | `"Mon - Sat: 8:00 AM – 9:00 PM"` |
| `googleReviewUrl` | Google Business reviews link | `"https://g.page/r/your-review-id"` |

---

## 📡 Connecting to an Automated Backend / Email System

The website currently uses the **WhatsApp Booking Flow** (zero backend needed, high conversion rate in India and worldwide).

If you want automated database storage or email notifications:
1. **EmailJS:** Free client-side email delivery. Add your `service_id` and `template_id` in `js/app.js`.
2. **Formspree / Webhook:** Point the form action to `https://formspree.io/f/YOUR_FORM_ID` or a Zapier/Make webhook URL.
3. **Node.js / Express or PHP Backend:** Set `SAGAR_CONFIG.backend.webhookUrl` and submit the JSON payload.

---

## 📁 Project Structure

```
Desktop/electrician/sagar/
│
├── index.html            # Main semantic webpage with all sections
├── README.md             # Setup, documentation, and customization guide
│
├── css/
│   └── style.css         # Dark navy & electric yellow custom styling & animations
│
├── js/
│   ├── config.js         # Central business configuration (phone, whatsapp, hours)
│   └── app.js            # Form validation, WhatsApp message generator, UI logic
│
└── assets/               # Placeholder for custom logos/images
```

---

© 2026 Sagar Electranics. Crafted for reliable electrical service and customer conversions.
