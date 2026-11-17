/* =====================================================
   FIKNORIA TREASURE - COMMON JAVASCRIPT (main.js)
   Har page mein yeh file load hoti hai.
   ===================================================== */

/* ---------- IMPORTANT: Google Apps Script URL yahan paste karein ----------
   README.md mein setup steps diye hain. Deploy karne ke baad jo "Web app URL" mile woh yahan lagayein. */
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. Mobile menu (hamburger) ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- 2. Footer mein current year ---------- */
  document.querySelectorAll(".year").forEach(el => (el.textContent = new Date().getFullYear()));

  /* ---------- 3. Scroll par smooth appear animation ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("show"));
  }

  /* ---------- 4. Stats counter (About page) ---------- */
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let n = 0;
      const step = Math.max(1, Math.ceil(target / 50));
      const timer = setInterval(() => {
        n += step;
        if (n >= target) { n = target; clearInterval(timer); }
        el.textContent = n + suffix;
      }, 30);
      io.disconnect();
    });
    io.observe(el);
  });

  /* ---------- 5. Filter buttons (Products + Gallery) ---------- */
  document.querySelectorAll(".filters").forEach(group => {
    const items = document.querySelectorAll(group.dataset.target);   // e.g. ".product"
    group.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        group.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        items.forEach(it => it.classList.toggle("hide", cat !== "all" && it.dataset.cat !== cat));
      });
    });
  });

  /* ---------- 6. Gallery lightbox ---------- */
  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const box = lightbox.querySelector(".lightbox-content");
    document.querySelectorAll(".gallery-item").forEach(item => {
      item.addEventListener("click", () => {
        box.innerHTML = item.innerHTML;                 // clicked item ki copy dikhao
        lightbox.classList.add("open");
      });
    });
    const close = () => lightbox.classList.remove("open");
    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  /* ---------- 7. FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");
      a.style.maxHeight = isOpen ? a.scrollHeight + "px" : "0";
    });
  });

  /* ---------- 8. Contact form -> Google Sheet ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    const msg = document.getElementById("formMsg");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      msg.className = "form-msg";

      // Spam check: honeypot field bhara ho to ignore karo
      if (form.website && form.website.value) return;

      if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
        msg.textContent = "Setup pending: main.js mein Google Script URL paste karein (README dekhein).";
        msg.classList.add("err");
        return;
      }

      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.textContent = "Sending...";

      try {
        // no-cors isliye ke Apps Script browser ko CORS reply nahi deta; data phir bhi Sheet mein save ho jata hai
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          body: new URLSearchParams(new FormData(form))
        });
        msg.textContent = "Thank you! Your message has been sent. We'll reply soon.";
        msg.classList.add("ok");
        form.reset();
      } catch (err) {
        msg.textContent = "Sorry, something went wrong. Please try again or WhatsApp us.";
        msg.classList.add("err");
      }
      btn.disabled = false; btn.textContent = "Send Message";
    });
  }
});
