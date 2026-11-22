// The stylesheet and the JavaScript for the PHP project, plus the data file.

export const assetFiles = [
  {
    path: "css/style.css",
    note: "Every style. Colours live in CSS variables so dark mode only swaps those values.",
    code: `/* =========================================================
   css/style.css — all the styling for the Mirchi website
   ========================================================= */

/* ---------- 1. COLOUR VARIABLES ---------- */
/* We name our colours once and reuse them with var().
   Changing a colour here changes it everywhere. */
:root {
    --maroon: #7B1E1E;
    --saffron: #F59E0B;
    --cream: #FFF8EC;
    --brown: #3A2318;
    --white: #FFFFFF;
    --muted: #6B5A4E;
    --border: #E7DCCB;
    --shadow: 0 2px 18px rgba(58, 35, 24, 0.08);
    --radius: 18px;
}

/* Dark mode only changes the values of the variables above,
   so every rule below automatically picks up the new colours. */
body.dark-mode {
    --cream: #1B1210;
    --brown: #F6EADB;
    --white: #241A15;
    --muted: #C0AC9B;
    --border: #3A2A22;
    --shadow: 0 2px 18px rgba(0, 0, 0, 0.45);
}

/* ---------- 2. RESET AND BASE ---------- */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background: var(--cream);
    color: var(--brown);
    line-height: 1.6;
    transition: background 0.3s ease, color 0.3s ease;
}

h1, h2, h3, h4 {
    font-family: 'Playfair Display', serif;
    line-height: 1.2;
    font-weight: 600;
}

a { color: inherit; text-decoration: none; }
ul { list-style: none; }
button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }

:focus-visible {
    outline: 2px solid var(--maroon);
    outline-offset: 3px;
}

.container {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Hides text from the screen but keeps it for screen readers */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
}

.hidden { display: none !important; }

/* ---------- 3. BUTTONS ---------- */
.btn {
    display: inline-block;
    padding: 12px 26px;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 500;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.btn-primary { background: var(--saffron); color: #3A2318; }
.btn-primary:hover { transform: translateY(-2px); }

.btn-maroon { background: var(--maroon); color: #FFF8EC; }
.btn-maroon:hover { transform: translateY(-2px); }

.btn-ghost { border: 1px solid rgba(255, 248, 236, 0.45); color: #FFF8EC; }
.btn-ghost:hover { background: rgba(255, 248, 236, 0.12); }

.btn-outline { border: 1px solid var(--border); color: var(--brown); }
.btn-outline:hover { background: var(--saffron); border-color: var(--saffron); color: #3A2318; }

.icon-btn { font-size: 1.1rem; padding: 6px 8px; border-radius: 50%; }

/* ---------- 4. NAVBAR ---------- */
.site-header {
    position: sticky;      /* stays at the top while scrolling */
    top: 0;
    z-index: 40;
    background: var(--cream);
    border-bottom: 1px solid var(--border);
}

.navbar {
    display: flex;             /* Flexbox puts the logo and links on one line */
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    max-width: 1140px;
    margin: 0 auto;
    padding: 14px 20px;
}

.logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--maroon);
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 6px;
}

.nav-links a {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 0.92rem;
    color: var(--muted);
    transition: color 0.2s ease, background 0.2s ease;
}

.nav-links a:hover { color: var(--brown); }
.nav-links a.active { color: var(--maroon); font-weight: 600; }

.cart-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--maroon);
    color: #FFF8EC;
    padding: 9px 16px;
    border-radius: 999px;
    font-size: 0.88rem;
    font-weight: 500;
}

.cart-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    border-radius: 999px;
    background: var(--saffron);
    color: #3A2318;
    font-size: 0.72rem;
    font-weight: 600;
}

/* The hamburger is hidden on wide screens */
.nav-toggle { display: none; }

/* ---------- 5. HERO ---------- */
.hero {
    background: var(--maroon);
    /* A gradient overlay over the maroon base */
    background-image: linear-gradient(135deg, rgba(123, 30, 30, 1) 0%, rgba(60, 15, 15, 1) 100%);
    color: #FFF8EC;
    text-align: center;
    padding: 90px 0;
}

.hero-kicker {
    font-size: 0.7rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--saffron);
}

.hero h1 {
    font-size: 4.5rem;
    margin: 14px 0 8px;
}

.hero-tagline {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.6rem;
    opacity: 0.9;
}

.hero-text {
    max-width: 520px;
    margin: 18px auto 32px;
    font-size: 0.95rem;
    opacity: 0.78;
}

.hero .btn { margin: 0 6px; }

/* ---------- 6. SECTIONS ---------- */
.section { padding: 64px 20px; }
.section-alt { background: rgba(123, 30, 30, 0.04); }

.section-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 32px;
}

.eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--maroon);
}

.link-arrow { color: var(--maroon); font-weight: 500; font-size: 0.9rem; }

.page-hero {
    background: var(--maroon);
    color: #FFF8EC;
    text-align: center;
    padding: 56px 20px;
}

.page-hero h1 { font-size: 2.8rem; }
.page-hero p { margin-top: 10px; opacity: 0.8; font-size: 0.95rem; }

/* ---------- 7. CARDS (Grid) ---------- */
.highlight-grid,
.dish-grid {
    display: grid;
    grid-template-columns: 1fr;    /* one column on mobile */
    gap: 22px;
}

.highlight-card,
.dish-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 26px;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.highlight-card:hover,
.dish-card:hover {
    transform: translateY(-6px);   /* the "hover lift" */
    box-shadow: 0 18px 34px rgba(58, 35, 24, 0.14);
    border-color: var(--saffron);
}

.highlight-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: rgba(245, 158, 11, 0.18);
    font-size: 1.5rem;
}

.highlight-card h3 { margin: 16px 0 6px; font-size: 1.2rem; }
.highlight-card p { font-size: 0.9rem; color: var(--muted); }

.dish-card { display: flex; flex-direction: column; }

.dish-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
}

.dish-top h3 { font-size: 1.15rem; }

.dish-tags {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
}

.badge {
    background: var(--saffron);
    color: #3A2318;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 9px;
    border-radius: 999px;
    white-space: nowrap;
}

/* The little veg / non-veg square */
.veg-dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    border: 1px solid currentColor;
    border-radius: 3px;
    flex-shrink: 0;
}

.veg-dot::after {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
}

.veg-dot.veg { color: #2F7D32; }
.veg-dot.non-veg { color: #B3261E; }

.dish-desc {
    font-size: 0.88rem;
    color: var(--muted);
    margin: 10px 0 18px;
    flex-grow: 1;      /* pushes the price row to the bottom */
}

.dish-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--border);
    padding-top: 14px;
    margin-bottom: 14px;
}

.dish-price {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--maroon);
}

.spice { font-size: 0.85rem; }

/* ---------- 8. MENU CONTROLS ---------- */
.menu-controls {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    margin-bottom: 30px;
}

.filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}

.filter-btn {
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 8px 16px;
    font-size: 0.85rem;
    color: var(--muted);
    transition: all 0.2s ease;
}

.filter-btn:hover { border-color: var(--saffron); color: var(--brown); }

.filter-btn.active {
    background: var(--maroon);
    border-color: var(--maroon);
    color: #FFF8EC;
}

.menu-tools {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
}

.search-box { flex: 1 1 220px; }

.search-box input,
.sort-box select {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--cream);
    color: var(--brown);
    font-family: inherit;
    font-size: 0.88rem;
}

.veg-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.88rem;
    color: var(--muted);
    cursor: pointer;
}

.veg-toggle input { width: 16px; height: 16px; accent-color: var(--maroon); }

.no-results {
    text-align: center;
    padding: 40px 0;
    color: var(--muted);
}

/* ---------- 9. CART PANEL ---------- */
.cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 50;
}

.cart-overlay.show { opacity: 1; pointer-events: auto; }

.cart-panel {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    max-width: 380px;
    background: var(--cream);
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);   /* parked off-screen */
    transition: transform 0.3s ease;
    z-index: 60;
}

.cart-panel.open { transform: translateX(0); }   /* slides in */

.cart-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
}

.cart-head h2 { font-size: 1.15rem; }

.cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;
}

.cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-bottom: 14px;
    margin-bottom: 14px;
    border-bottom: 1px solid var(--border);
}

.cart-item-info { display: flex; flex-direction: column; }
.cart-item-info strong { font-size: 0.88rem; }
.cart-item-info span { font-size: 0.75rem; color: var(--muted); }

.qty-controls { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; }

.qty-btn {
    width: 24px;
    height: 24px;
    border: 1px solid var(--border);
    border-radius: 50%;
    line-height: 1;
}

.qty-btn:hover { background: var(--saffron); }

.remove-btn { color: var(--muted); font-size: 0.8rem; }
.remove-btn:hover { color: var(--maroon); }

.cart-empty { font-size: 0.88rem; color: var(--muted); text-align: center; padding: 40px 0; }

.cart-foot {
    border-top: 1px solid var(--border);
    padding: 16px 20px;
}

.cart-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
}

.cart-total strong { color: var(--maroon); font-size: 1.4rem; }

.cart-note { font-size: 0.72rem; color: var(--muted); margin: 8px 0 12px; }

.cart-foot .btn { width: 100%; text-align: center; }

/* ---------- 10. FORMS ---------- */
.form-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 28px;
    max-width: 760px;
    margin: 0 auto;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
}

.field { display: flex; flex-direction: column; margin-bottom: 16px; }

.field label {
    font-size: 0.82rem;
    font-weight: 500;
    margin-bottom: 6px;
}

.field input,
.field textarea {
    padding: 11px 14px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--cream);
    color: var(--brown);
    font-family: inherit;
    font-size: 0.9rem;
}

.field input:focus,
.field textarea:focus {
    border-color: var(--maroon);
    outline: none;
}

.field input.invalid,
.field textarea.invalid { border-color: #B3261E; }

.error { color: #B3261E; font-size: 0.78rem; min-height: 16px; margin-top: 4px; }

.alert {
    padding: 14px 18px;
    border-radius: 12px;
    font-size: 0.9rem;
    margin-bottom: 20px;
}

.alert-success { background: #E7F4E8; color: #1F5B23; border: 1px solid #B7DEB9; }
.alert-error { background: #FBEAE9; color: #8C1D18; border: 1px solid #F1C3C0; }

/* ---------- 11. CONTACT + ABOUT ---------- */
.contact-layout,
.about-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 22px;
}

.contact-card,
.about-facts {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 26px;
}

.contact-card h2 { font-size: 1.1rem; margin: 18px 0 6px; }
.contact-card h2:first-child { margin-top: 0; }
.contact-card p, .contact-card address { font-size: 0.9rem; color: var(--muted); font-style: normal; }
.contact-card a:hover { color: var(--maroon); }

.hours-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88rem;
}

.hours-table th,
.hours-table td {
    text-align: left;
    padding: 10px 8px;
    border-bottom: 1px solid var(--border);
}

.hours-table th { font-weight: 600; }

.about-layout p { font-size: 0.92rem; color: var(--muted); margin-bottom: 14px; }

.about-facts ul { margin: 14px 0 20px; }
.about-facts li { font-size: 0.9rem; color: var(--muted); padding: 8px 0; border-bottom: 1px solid var(--border); }
.about-facts strong { color: var(--brown); }

.map-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 260px;
    border: 2px dashed var(--border);
    border-radius: var(--radius);
    color: var(--muted);
    font-size: 0.9rem;
}

.map-placeholder span { font-size: 2.5rem; }

/* ---------- 12. FOOTER ---------- */
.site-footer {
    margin-top: 60px;
    background: var(--white);
    border-top: 1px solid var(--border);
    padding: 44px 20px 24px;
}

.footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 26px;
    max-width: 1140px;
    margin: 0 auto;
}

.footer-logo { font-size: 1.4rem; color: var(--maroon); }
.footer-grid p { font-size: 0.88rem; color: var(--muted); margin-top: 8px; max-width: 320px; }
.footer-grid h4 { font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; }
.footer-grid ul { margin-top: 10px; }
.footer-grid li { font-size: 0.88rem; color: var(--muted); padding: 4px 0; }
.footer-grid a:hover { color: var(--maroon); }

.copyright {
    max-width: 1140px;
    margin: 30px auto 0;
    padding-top: 18px;
    border-top: 1px solid var(--border);
    font-size: 0.75rem;
    color: var(--muted);
}

/* ---------- 13. BACK TO TOP + FADE IN ---------- */
.back-to-top {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--maroon);
    color: #FFF8EC;
    font-size: 1.1rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 30;
}

.back-to-top.show { opacity: 1; pointer-events: auto; transform: translateY(0); }

.fade-in {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible { opacity: 1; transform: translateY(0); }

/* ---------- 14. MEDIA QUERIES ---------- */

/* Tablet and up: 600px */
@media (min-width: 600px) {
    .highlight-grid,
    .dish-grid,
    .form-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .footer-grid { grid-template-columns: repeat(2, 1fr); }
    .contact-layout,
    .about-layout { grid-template-columns: 1fr 1fr; }
}

/* Desktop and up: 992px */
@media (min-width: 992px) {
    .dish-grid { grid-template-columns: repeat(3, 1fr); }
    .highlight-grid { grid-template-columns: repeat(3, 1fr); }
    .footer-grid { grid-template-columns: 2fr 1fr 1fr; }
    .hero h1 { font-size: 5.5rem; }
}

/* Mobile only: below 600px we show the hamburger */
@media (max-width: 599px) {
    .nav-toggle {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;
    }

    .nav-toggle span {
        display: block;
        width: 22px;
        height: 2px;
        background: var(--brown);
        border-radius: 2px;
    }

    /* The links are hidden until .open is added by JavaScript */
    .nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        align-items: stretch;
        gap: 2px;
        padding: 12px 20px 18px;
        background: var(--cream);
        border-bottom: 1px solid var(--border);
    }

    .nav-links.open { display: flex; }
    .nav-links a { padding: 10px 12px; }
    .navbar { position: relative; flex-wrap: wrap; }
    .hero { padding: 64px 0; }
    .hero h1 { font-size: 3.4rem; }
    .hero-tagline { font-size: 1.25rem; }
}`,
  },
  {
    path: "js/script.js",
    note: "Hamburger, dark mode, back to top, fade-in, the menu filters, the cart and the form validation.",
    code: `/* =========================================================
   js/script.js — every bit of JavaScript on the Mirchi site
   The file is split into numbered sections. Each section first
   checks that its elements exist, because not every page has
   every element.
   ========================================================= */

/* ---------- 1. MOBILE HAMBURGER MENU ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
        // classList.toggle adds the class if missing, removes it if present
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });
}

/* ---------- 2. DARK MODE (saved in localStorage) ---------- */
const themeBtn = document.getElementById('themeBtn');

// localStorage keeps a value even after the page is reloaded.
if (localStorage.getItem('mirchi-theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeBtn) themeBtn.textContent = '☀️';
}

if (themeBtn) {
    themeBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('mirchi-theme', isDark ? 'dark' : 'light');
        themeBtn.textContent = isDark ? '☀️' : '🌙';
    });
}

/* ---------- 3. BACK TO TOP + SMOOTH SCROLL ---------- */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (backToTop) {
        backToTop.classList.toggle('show', window.scrollY > 400);
    }
});

if (backToTop) {
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth scrolling for any link pointing to a #section on this page
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ---------- 4. FADE IN ON SCROLL ---------- */
const fadeItems = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window && fadeItems.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeItems.forEach(function (item) {
        observer.observe(item);
    });
} else {
    // If the browser is old, just show everything
    fadeItems.forEach(function (item) {
        item.classList.add('visible');
    });
}

/* ---------- 5. THE ORDER / CART ---------- */
// The cart is a plain array of objects: { name, price, qty }
let cart = [];

try {
    cart = JSON.parse(localStorage.getItem('mirchi-cart')) || [];
} catch (e) {
    cart = [];
}

const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartBtn = document.getElementById('cartBtn');
const cartClose = document.getElementById('cartClose');
const cartClear = document.getElementById('cartClear');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

function saveCart() {
    // localStorage can only store text, so we turn the array into JSON
    localStorage.setItem('mirchi-cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    if (!cartItems) return;

    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(function (item) {
        total += item.price * item.qty;
        count += item.qty;

        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML =
            '<div class="cart-item-info">' +
                '<strong>' + item.name + '</strong>' +
                '<span>₹' + item.price + ' each</span>' +
            '</div>' +
            '<div class="qty-controls">' +
                '<button class="qty-btn" data-action="minus" data-name="' + item.name + '">-</button>' +
                '<span>' + item.qty + '</span>' +
                '<button class="qty-btn" data-action="plus" data-name="' + item.name + '">+</button>' +
            '</div>' +
            '<button class="remove-btn" data-action="remove" data-name="' + item.name + '" aria-label="Remove item">✕</button>';

        cartItems.appendChild(li);
    });

    if (cart.length === 0) {
        cartItems.innerHTML = '<li class="cart-empty">Your order is empty. Add a dish from the menu.</li>';
    }

    if (cartCount) cartCount.textContent = count;
    if (cartTotal) cartTotal.textContent = '₹' + total;
}

function addToCart(name, price) {
    const existing = cart.find(function (item) {
        return item.name === name;
    });

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }

    saveCart();
}

function openCart() {
    if (!cartPanel) return;
    cartPanel.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('show');
}

function closeCart() {
    if (!cartPanel) return;
    cartPanel.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('show');
}

// Every "Add to Order" button on the page
document.querySelectorAll('.add-btn').forEach(function (button) {
    button.addEventListener('click', function () {
        // dataset.name reads the data-name attribute from the HTML
        addToCart(button.dataset.name, Number(button.dataset.price));
        openCart();
    });
});

if (cartBtn) cartBtn.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

if (cartClear) {
    cartClear.addEventListener('click', function () {
        cart = [];
        saveCart();
    });
}

// One listener handles every +, - and remove button inside the panel
if (cartItems) {
    cartItems.addEventListener('click', function (event) {
        const button = event.target.closest('button');
        if (!button) return;

        const name = button.dataset.name;
        const action = button.dataset.action;

        if (action === 'plus') {
            cart.forEach(function (item) {
                if (item.name === name) item.qty += 1;
            });
        } else if (action === 'minus') {
            cart.forEach(function (item) {
                if (item.name === name) item.qty -= 1;
            });
            cart = cart.filter(function (item) {
                return item.qty > 0;
            });
        } else if (action === 'remove') {
            cart = cart.filter(function (item) {
                return item.name !== name;
            });
        }

        saveCart();
    });
}

// Draw the saved order as soon as the page loads
renderCart();

/* ---------- 6. MENU FILTERS, SEARCH AND SORT ---------- */
const grid = document.getElementById('menuGrid');

if (grid) {
    const cards = Array.prototype.slice.call(grid.querySelectorAll('.dish-card'));
    const filterButtons = document.querySelectorAll('.filter-btn');
    const vegToggle = document.getElementById('vegToggle');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const noResults = document.getElementById('noResults');

    let activeCategory = 'All';
    let vegOnly = false;
    let searchTerm = '';

    function applyFilters() {
        let visibleCount = 0;

        cards.forEach(function (card) {
            // All three conditions must be true for a card to stay visible
            const matchCategory = activeCategory === 'All' || card.dataset.category === activeCategory;
            const matchVeg = !vegOnly || card.dataset.type === 'veg';
            const matchSearch = card.dataset.name.toLowerCase().indexOf(searchTerm) !== -1;
            const visible = matchCategory && matchVeg && matchSearch;

            card.classList.toggle('hidden', !visible);
            if (visible) visibleCount += 1;
        });

        if (noResults) noResults.hidden = visibleCount > 0;
    }

    function sortCards() {
        const mode = sortSelect ? sortSelect.value : '';

        // slice() copies the array so we do not lose the original order
        const sorted = cards.slice().sort(function (a, b) {
            if (mode === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
            if (mode === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
            if (mode === 'name-asc') return a.dataset.name.localeCompare(b.dataset.name);
            return 0;
        });

        // appendChild moves each card to the end, in the new order
        sorted.forEach(function (card) {
            grid.appendChild(card);
        });
    }

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            filterButtons.forEach(function (other) {
                other.classList.remove('active');
            });
            button.classList.add('active');
            activeCategory = button.dataset.category;
            applyFilters();
        });
    });

    if (vegToggle) {
        vegToggle.addEventListener('change', function () {
            vegOnly = vegToggle.checked;
            applyFilters();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            searchTerm = searchInput.value.trim().toLowerCase();
            applyFilters();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', sortCards);
    }

    applyFilters();
}

/* ---------- 7. RESERVATION FORM VALIDATION ---------- */
const form = document.getElementById('reservationForm');

if (form) {
    // Puts a message in the span under a field and marks the input red.
    function showError(field, message) {
        const box = document.getElementById('error-' + field);
        const input = document.getElementById(field);

        if (box) box.textContent = message;
        if (input) input.classList.toggle('invalid', message !== '');

        return message === '';   // true means "this field is fine"
    }

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = Number(document.getElementById('guests').value);

        let ok = true;

        ok = showError('name', name.length < 3 ? 'Please enter your full name (at least 3 characters).' : '') && ok;
        ok = showError('phone', /^[0-9]{10}$/.test(phone) ? '' : 'Phone number must be exactly 10 digits.') && ok;
        ok = showError('email', /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email) ? '' : 'Please enter a valid email address.') && ok;

        // Today as YYYY-MM-DD, so it can be compared with the input value
        const today = new Date().toISOString().split('T')[0];
        let dateMessage = '';
        if (!date) {
            dateMessage = 'Please choose a date.';
        } else if (date < today) {
            dateMessage = 'The date cannot be in the past.';
        }
        ok = showError('date', dateMessage) && ok;

        ok = showError('time', time ? '' : 'Please choose a time.') && ok;
        ok = showError('guests', guests >= 1 && guests <= 20 ? '' : 'Guests must be between 1 and 20.') && ok;

        return ok;
    }

    // Re-check a field when the visitor leaves it
    form.querySelectorAll('input, textarea').forEach(function (input) {
        input.addEventListener('blur', validateForm);
    });

    // Check again on submit, and stop the form if anything is wrong
    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });
}`,
  },
  {
    path: "data/reservations.txt",
    note: "One booking per line. reservation.php appends to this file with file_put_contents().",
    code: `# One booking per line, newest at the bottom.
# Written by reservation.php: date | name | phone | email | date | time | guests | request
2026-11-20 19:42:10 | Ananya Sen | 9830012345 | ananya@example.com | 2026-11-24 | 20:00 | 4 guests | Window seat`,
  },
];