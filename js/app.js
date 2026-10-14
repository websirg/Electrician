/**
 * =========================================================================
 * SAGAR ELECTRANICS - MODERN APPLICATION JAVASCRIPT
 * =========================================================================
 * Manages dynamic config, filterable service cards, hero quick selector,
 * rate cards, booking validation, WhatsApp payload generator, and live ticker.
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize configuration and business details
  initBusinessConfig();

  // 2. Render service cards & category tabs
  renderServices("all");

  // 3. Render Rate Card Table
  renderRateCards();

  // 4. Initialize Hero Quick Selector
  initHeroSelector();

  // 5. Initialize Booking Form handlers & date limits
  initBookingForm();

  // 6. Initialize UI interactions (navbar scroll, mobile menu, toast)
  initUiInteractions();

  // 7. Start live social proof booking ticker
  startLiveBookingTicker();

  // 8. Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * Injects SAGAR_CONFIG details across the website
 */
function initBusinessConfig() {
  const cfg = window.SAGAR_CONFIG;
  if (!cfg) return;

  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    switch (key) {
      case "businessName":
        el.textContent = cfg.businessName;
        break;
      case "tagline":
        el.textContent = cfg.tagline;
        break;
      case "phoneDisplay":
        el.textContent = cfg.phoneDisplay;
        break;
      case "email":
        el.textContent = cfg.email;
        if (el.tagName === "A") el.href = `mailto:${cfg.email}`;
        break;
      case "serviceArea":
        el.textContent = cfg.serviceArea;
        break;
      case "hoursWeekdays":
        el.textContent = cfg.businessHours.weekdays;
        break;
      case "hoursSunday":
        el.textContent = cfg.businessHours.sunday;
        break;
      case "emergencySupport":
        el.textContent = cfg.businessHours.emergencySupport;
        break;
      case "availableTechs":
        el.textContent = cfg.liveStatus.availableTechnicians;
        break;
      case "avgArrival":
        el.textContent = `${cfg.liveStatus.avgArrivalTimeMinutes} mins`;
        break;
      case "currentYear":
        el.textContent = new Date().getFullYear();
        break;
      default:
        break;
    }
  });

  // Update Call Links
  document.querySelectorAll(".call-link").forEach((link) => {
    link.href = `tel:${cfg.phoneRaw}`;
  });

  // Update WhatsApp Links
  const quickWaUrl = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(
    cfg.whatsappDefaultMsg
  )}`;
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    link.href = quickWaUrl;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  // Update Google Reviews Link
  document.querySelectorAll(".google-review-link").forEach((link) => {
    link.href = cfg.googleReviewUrl || "#";
    if (cfg.googleReviewUrl) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
}

/**
 * Renders Service Cards with category filtering support
 */
function renderServices(filterCategory = "all") {
  const container = document.getElementById("services-grid-container");
  const serviceSelect = document.getElementById("booking-service");
  const cfg = window.SAGAR_CONFIG;

  if (!cfg || !cfg.services) return;

  // Populate booking form dropdown once (pure service title, no price)
  if (serviceSelect && serviceSelect.options.length <= 1) {
    cfg.services.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s.title;
      opt.textContent = s.title;
      serviceSelect.appendChild(opt);
    });
  }

  if (!container) return;
  container.innerHTML = "";

  const filtered = filterCategory === "all"
    ? cfg.services
    : cfg.services.filter((s) => s.category === filterCategory);

  filtered.forEach((service) => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-6 col-sm-12 mb-4 service-col-item";

    const perksHtml = service.features
      .map(
        (f) =>
          `<li><i data-lucide="check-circle-2"></i> <span>${escapeHtml(f)}</span></li>`
      )
      .join("");

    col.innerHTML = `
      <div class="service-modern-card" data-service-id="${service.id}">
        <div class="service-top-row">
          <div class="service-icon-bubble">
            <i data-lucide="${service.icon}" style="width: 26px; height: 26px;"></i>
          </div>
          <span class="price-tag-badge">Starts ${service.startsAt}</span>
        </div>

        <h3 class="service-title">${escapeHtml(service.title)}</h3>

        <div class="service-meta-row">
          <span><i data-lucide="clock" style="width: 13px; height: 13px;" class="me-1"></i>${service.duration}</span>
          <span>•</span>
          <span><i data-lucide="star" style="width: 13px; height: 13px; fill: var(--yellow-main);" class="me-1 text-yellow-brand"></i>${service.rating}</span>
        </div>

        <p class="service-desc">${escapeHtml(service.description)}</p>

        <ul class="service-perk-list">
          ${perksHtml}
        </ul>

        <button type="button" class="btn-book-service-pill mt-auto select-service-trigger" data-service-name="${escapeHtml(
          service.title
        )}">
          <span>Book This Service</span>
          <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
        </button>
      </div>
    `;

    container.appendChild(col);
  });

  // Attach click listener to "Book This Service" buttons
  document.querySelectorAll(".select-service-trigger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const serviceName = this.getAttribute("data-service-name");
      selectServiceAndScroll(serviceName);
    });
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
window.renderServices = renderServices;

/**
 * Filter Tab Switcher
 */
function filterCategory(category, buttonEl) {
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
  if (buttonEl) buttonEl.classList.add("active");
  renderServices(category);
}
window.filterCategory = filterCategory;

/**
 * Renders the Transparent Rate Card Preview
 */
function renderRateCards() {
  const tableContainer = document.getElementById("rate-card-rows");
  const cfg = window.SAGAR_CONFIG;
  if (!tableContainer || !cfg || !cfg.services) return;

  tableContainer.innerHTML = "";
  cfg.services.slice(0, 6).forEach((s) => {
    const row = document.createElement("div");
    row.className = "rate-row";
    row.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <i data-lucide="${s.icon}" style="width: 20px; height: 20px; color: var(--yellow-main);"></i>
        <div>
          <strong class="text-white d-block" style="font-size: 0.95rem;">${escapeHtml(s.title)}</strong>
          <span class="text-muted small">Standard inspection & repair warranty</span>
        </div>
      </div>
      <div class="d-flex align-items-center gap-3">
        <span class="text-yellow-brand fw-bold" style="font-size: 1.1rem;">${s.startsAt}</span>
        <button type="button" class="btn btn-sm btn-outline-warning py-1 px-3 select-service-trigger" data-service-name="${escapeHtml(s.title)}">
          Book
        </button>
      </div>
    `;
    tableContainer.appendChild(row);
  });

  // Re-attach listeners
  tableContainer.querySelectorAll(".select-service-trigger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      selectServiceAndScroll(this.getAttribute("data-service-name"));
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

/**
 * Hero Quick Selector
 */
function initHeroSelector() {
  const select = document.getElementById("hero-service-picker");
  const btn = document.getElementById("hero-check-btn");
  const cfg = window.SAGAR_CONFIG;

  if (select && cfg && cfg.services) {
    cfg.services.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s.title;
      opt.textContent = s.title;
      select.appendChild(opt);
    });
  }

  if (btn && select) {
    btn.addEventListener("click", () => {
      const selected = select.value;
      if (selected) {
        selectServiceAndScroll(selected);
      } else {
        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

/**
 * Selects a service in the booking form and smoothly scrolls to it
 */
function selectServiceAndScroll(serviceName) {
  const serviceSelect = document.getElementById("booking-service");
  const bookingSection = document.getElementById("booking");

  if (serviceSelect) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value === serviceName || serviceSelect.options[i].text === serviceName) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
    serviceSelect.classList.remove("is-invalid-custom");
    serviceSelect.style.borderColor = "var(--yellow-main)";
    serviceSelect.style.boxShadow = "0 0 0 4px rgba(255, 212, 59, 0.35)";
    setTimeout(() => {
      serviceSelect.style.borderColor = "";
      serviceSelect.style.boxShadow = "";
    }, 2000);
  }

  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  setTimeout(() => {
    const nameInput = document.getElementById("booking-name");
    if (nameInput) nameInput.focus();
  }, 600);
}

/**
 * Initializes Booking Form validation and WhatsApp compile
 */
function initBookingForm() {
  const form = document.getElementById("service-booking-form");
  const dateInput = document.getElementById("booking-date");

  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormErrors(form);

    const name = form["booking-name"].value.trim();
    const phone = form["booking-phone"].value.trim();
    const service = form["booking-service"].value;
    const address = form["booking-address"].value.trim();
    const date = form["booking-date"].value;
    const timeSlot = form["booking-time"].value;
    const notes = form["booking-notes"].value.trim();

    let isValid = true;

    if (!name || name.length < 3) {
      setFieldError("booking-name", "Please enter your full name (minimum 3 letters).");
      isValid = false;
    }

    const phoneClean = phone.replace(/[\s\-\(\)]/g, "");
    const phoneRegex = /^(\+?\d{1,4})?[0-9]{10}$/;
    if (!phoneClean || !phoneRegex.test(phoneClean)) {
      setFieldError("booking-phone", "Please enter a valid 10-digit mobile number.");
      isValid = false;
    }

    if (!service) {
      setFieldError("booking-service", "Please select your required electrical service.");
      isValid = false;
    }

    if (!address || address.length < 5) {
      setFieldError("booking-address", "Please provide complete address / landmark.");
      isValid = false;
    }

    if (!date) {
      setFieldError("booking-date", "Please select preferred date.");
      isValid = false;
    }

    if (!timeSlot) {
      setFieldError("booking-time", "Please choose a time slot.");
      isValid = false;
    }

    if (!isValid) return;

    const submitBtn = document.getElementById("btn-submit-booking");
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      <span>Generating Booking Reference...</span>
    `;

    setTimeout(() => {
      const now = new Date();
      const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const bookingRef = `SE-${yearMonth}-${randomCode}`;

      const bookingData = {
        ref: bookingRef,
        name,
        phone,
        service,
        address,
        date,
        timeSlot,
        notes: notes || "None provided",
        createdAt: now.toISOString()
      };

      saveBookingToStorage(bookingData);
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showBookingConfirmation(bookingData);
    }, 600);
  });
}

function setFieldError(fieldId, errorMsg) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  field.classList.add("is-invalid-custom");
  const parent = field.parentElement;
  let feedback = parent.querySelector(".invalid-feedback-custom");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback-custom";
    parent.appendChild(feedback);
  }
  feedback.textContent = errorMsg;
}

function clearFormErrors(form) {
  form.querySelectorAll(".is-invalid-custom").forEach((el) => {
    el.classList.remove("is-invalid-custom");
  });
}

function saveBookingToStorage(booking) {
  try {
    const list = JSON.parse(localStorage.getItem("sagar_bookings_history") || "[]");
    list.unshift(booking);
    localStorage.setItem("sagar_bookings_history", JSON.stringify(list.slice(0, 10)));
  } catch (err) {
    console.warn("Storage warning:", err);
  }
}

/**
 * Builds the WhatsApp message and displays confirmation modal
 */
function showBookingConfirmation(b) {
  const cfg = window.SAGAR_CONFIG;

  const waMessageText = 
`⚡ *NEW SERVICE BOOKING - SAGAR ELECTRANICS*
━━━━━━━━━━━━━━━━━━━━━
📋 *Booking Ref:* ${b.ref}
👤 *Customer:* ${b.name}
📞 *Mobile:* ${b.phone}
🔧 *Service:* ${b.service}
📍 *Address:* ${b.address}
📅 *Preferred Date:* ${b.date}
⏰ *Time Slot:* ${b.timeSlot}
📝 *Issue Details:* ${b.notes}
━━━━━━━━━━━━━━━━━━━━━
_Please confirm technician availability and inspection time._`;

  const waUrl = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(
    waMessageText
  )}`;

  const modalEl = document.getElementById("bookingConfirmationModal");
  if (modalEl) {
    document.getElementById("conf-ref-text").textContent = b.ref;
    document.getElementById("conf-name").textContent = b.name;
    document.getElementById("conf-service").textContent = b.service;
    document.getElementById("conf-date-slot").textContent = `${b.date} (${b.timeSlot})`;
    document.getElementById("conf-phone").textContent = b.phone;
    document.getElementById("conf-address").textContent = b.address;

    const waBtn = document.getElementById("conf-whatsapp-btn");
    if (waBtn) waBtn.href = waUrl;

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }

  showToast(`Booking ${b.ref} prepared! Forward to WhatsApp.`);
}

function copyBookingRef() {
  const refText = document.getElementById("conf-ref-text")?.textContent;
  if (!refText) return;
  navigator.clipboard.writeText(refText).then(() => {
    showToast(`Copied ${refText} to clipboard!`);
  });
}
window.copyBookingRef = copyBookingRef;

function showToast(message) {
  let toast = document.getElementById("sagar-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "sagar-toast";
    toast.className = "live-social-toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <i data-lucide="zap" style="color: #D97706; width: 20px; height: 20px; flex-shrink: 0;"></i>
    <div>
      <strong class="small d-block" style="color: #0F172A; font-weight: 750;">Sagar Electranics</strong>
      <span class="small" style="color: #475569;">${escapeHtml(message)}</span>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  toast.classList.add("visible");
  setTimeout(() => {
    toast.classList.remove("visible");
  }, 4500);
}
window.showToast = showToast;

/**
 * Periodic Social Proof Ticker
 */
function startLiveBookingTicker() {
  const cfg = window.SAGAR_CONFIG;
  if (!cfg || !cfg.recentBookingsTicker || cfg.recentBookingsTicker.length === 0) return;

  let index = 0;
  setInterval(() => {
    const item = cfg.recentBookingsTicker[index];
    showToast(`⚡ ${item.name} (${item.area}) booked ${item.service} • ${item.time}`);
    index = (index + 1) % cfg.recentBookingsTicker.length;
  }, 14000);
}

function initUiInteractions() {
  const navbar = document.querySelector(".navbar-custom");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  const navLinks = document.querySelectorAll(".nav-link-modern");
  const menuCollapse = document.getElementById("navbarNav");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuCollapse && menuCollapse.classList.contains("show")) {
        const bs = bootstrap.Collapse.getInstance(menuCollapse);
        if (bs) bs.hide();
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
