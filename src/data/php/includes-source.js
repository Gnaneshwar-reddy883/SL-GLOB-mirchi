// The three shared files of the PHP project: header, footer and the dish data.

export const includeFiles = [
  {
    path: "includes/header.php",
    note: "Navbar + the opening <html>, <head> and <body> tags. Included at the top of every page.",
    code: `<?php
// ==========================================================
//  includes/header.php
//  The navbar, included at the top of every page.
//  It also prints the opening <html>, <head> and <body> tags.
// ==========================================================

// basename($_SERVER['PHP_SELF']) gives the name of the page we are
// on, for example "menu.php". We compare it with each link so the
// current page can be highlighted in the navbar.
$current_page = basename($_SERVER['PHP_SELF']);

// Every page sets $page_title BEFORE including this file.
// The ?? operator means: use $page_title if it is set, otherwise 'Mirchi'.
$page_title = $page_title ?? 'Mirchi';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($page_title) ?> | Mirchi</title>

    <!-- Google Fonts: Playfair Display for headings, Poppins for body text -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

    <!-- Our single stylesheet -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <nav class="navbar">
        <!-- The logo is also a link back to the home page -->
        <a href="index.php" class="logo">🌶️ Mirchi</a>

        <!-- Hamburger button: only visible on small screens (see the media query) -->
        <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <!-- The list of links. PHP decides which one gets class="active". -->
        <ul class="nav-links" id="navLinks">
            <li><a href="index.php" class="<?= $current_page === 'index.php' ? 'active' : '' ?>">Home</a></li>
            <li><a href="menu.php" class="<?= $current_page === 'menu.php' ? 'active' : '' ?>">Menu</a></li>
            <li><a href="about.php" class="<?= $current_page === 'about.php' ? 'active' : '' ?>">About</a></li>
            <li><a href="reservation.php" class="<?= $current_page === 'reservation.php' ? 'active' : '' ?>">Reservation</a></li>
            <li><a href="contact.php" class="<?= $current_page === 'contact.php' ? 'active' : '' ?>">Contact</a></li>
            <li><button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode">🌙</button></li>
            <li>
                <button class="cart-btn" id="cartBtn" aria-label="Open your order">
                    🛒 Order <span class="cart-count" id="cartCount">0</span>
                </button>
            </li>
        </ul>
    </nav>
</header>

<!-- main starts here; includes/footer.php closes it -->
<main>`,
  },
  {
    path: "includes/footer.php",
    note: "Closes <main>, prints the footer, the sliding cart panel, and loads script.js.",
    code: `<?php
// ==========================================================
//  includes/footer.php
//  Closes <main>, prints the footer, the cart panel, and loads
//  js/script.js at the end of the body so the HTML already
//  exists when the script looks for it.
// ==========================================================
?>
</main>

<footer class="site-footer">
    <div class="footer-grid">
        <div>
            <h3 class="footer-logo">🌶️ Mirchi</h3>
            <p>
                A family-run Indian kitchen in Kolkata. Tandoori starters, handi curries,
                biryani and mithai, served the way we eat at home.
            </p>
        </div>

        <div>
            <h4>Explore</h4>
            <ul>
                <li><a href="menu.php">Menu</a></li>
                <li><a href="about.php">Our Story</a></li>
                <li><a href="reservation.php">Book a Table</a></li>
                <li><a href="contact.php">Contact</a></li>
            </ul>
        </div>

        <div>
            <h4>Visit</h4>
            <ul>
                <li>12 Chowringhee Lane, Kolkata 700016</li>
                <li><a href="tel:+919830012345">+91 98300 12345</a></li>
                <li>Open daily, 12:00 pm – 11:00 pm</li>
            </ul>
        </div>
    </div>

    <p class="copyright">
        &copy; <?= date('Y') ?> Mirchi Indian Kitchen. College scripting lab project.
    </p>
</footer>

<!-- ---------- THE CART PANEL ---------- -->
<!-- It sits off-screen (CSS) and slides in when the Order button is clicked. -->
<div class="cart-overlay" id="cartOverlay"></div>

<aside class="cart-panel" id="cartPanel" aria-label="Your order">
    <div class="cart-head">
        <h2>Your Order</h2>
        <button class="icon-btn" id="cartClose" aria-label="Close order panel">✕</button>
    </div>

    <!-- js/script.js fills this list from localStorage -->
    <ul class="cart-items" id="cartItems"></ul>

    <div class="cart-foot">
        <div class="cart-total">
            <span>Total</span>
            <strong id="cartTotal">₹0</strong>
        </div>
        <p class="cart-note">This is a demo order saved in your browser.</p>
        <button class="btn btn-outline" id="cartClear">Clear order</button>
    </div>
</aside>

<!-- Back-to-top button -->
<button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>

<!-- Our JavaScript file -->
<script src="js/script.js"></script>
</body>
</html>`,
  },
  {
    path: "includes/menu-data.php",
    note: "One PHP array holding all 30 dishes. No HTML here, only data.",
    code: `<?php
// ==========================================================
//  includes/menu-data.php
//  This file only STORES data. It defines one PHP array that
//  holds every dish on the menu. menu.php and index.php
//  "include" this file and then loop over the array.
//
//  Each dish is an associative array:
//    name, category, description, price, type (veg/non-veg),
//    spice (1 to 3), special (true or false)
// ==========================================================

$menu_items = [

    // ---------------- Starters ----------------
    [
        'name'        => 'Paneer Tikka',
        'category'    => 'Starters',
        'description' => 'Cubes of hand-made paneer marinated in yoghurt and kasundi, charred in the tandoor.',
        'price'       => 320,
        'type'        => 'veg',
        'spice'       => 2,
        'special'     => false,
    ],
    [
        'name'        => 'Chicken 65',
        'category'    => 'Starters',
        'description' => 'Crisp fried chicken tossed with curry leaves, dried red chilli and a squeeze of lime.',
        'price'       => 340,
        'type'        => 'non-veg',
        'spice'       => 3,
        'special'     => false,
    ],
    [
        'name'        => 'Vegetable Samosa',
        'category'    => 'Starters',
        'description' => 'Two flaky pastries filled with spiced potato and peas, served with tamarind chutney.',
        'price'       => 120,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Tandoori Chicken (Half)',
        'category'    => 'Starters',
        'description' => 'Overnight marinade of hung curd and Kashmiri chilli, finished over live coals.',
        'price'       => 420,
        'type'        => 'non-veg',
        'spice'       => 2,
        'special'     => true,
    ],
    [
        'name'        => 'Hara Bhara Kebab',
        'category'    => 'Starters',
        'description' => 'Pan-fried patties of spinach, green peas and cashew, light and herby.',
        'price'       => 260,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],

    // ---------------- Main Course ----------------
    [
        'name'        => 'Butter Chicken',
        'category'    => 'Main Course',
        'description' => 'Tandoori chicken simmered in a slow-cooked tomato and butter gravy with a hint of fenugreek.',
        'price'       => 420,
        'type'        => 'non-veg',
        'spice'       => 1,
        'special'     => true,
    ],
    [
        'name'        => 'Dal Makhani',
        'category'    => 'Main Course',
        'description' => 'Whole black lentils cooked overnight on low flame, finished with cream and butter.',
        'price'       => 290,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => true,
    ],
    [
        'name'        => 'Palak Paneer',
        'category'    => 'Main Course',
        'description' => 'Fresh spinach ground with green chilli and ginger, folded with soft paneer cubes.',
        'price'       => 310,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Rogan Josh',
        'category'    => 'Main Course',
        'description' => 'Kashmiri mutton curry with fennel, dry ginger and a deep red chilli oil.',
        'price'       => 460,
        'type'        => 'non-veg',
        'spice'       => 2,
        'special'     => false,
    ],
    [
        'name'        => 'Kadai Vegetable',
        'category'    => 'Main Course',
        'description' => 'Seasonal vegetables tossed with bell pepper and freshly pounded kadai masala.',
        'price'       => 280,
        'type'        => 'veg',
        'spice'       => 2,
        'special'     => false,
    ],

    // ---------------- Breads ----------------
    [
        'name'        => 'Garlic Naan',
        'category'    => 'Breads',
        'description' => 'Tandoor-baked leavened bread brushed with garlic butter and coriander.',
        'price'       => 70,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => true,
    ],
    [
        'name'        => 'Butter Roti',
        'category'    => 'Breads',
        'description' => 'Whole wheat roti straight from the tandoor, finished with a knob of white butter.',
        'price'       => 40,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Laccha Paratha',
        'category'    => 'Breads',
        'description' => 'Layered whole wheat paratha, crisp at the edges and soft in the middle.',
        'price'       => 60,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Tandoori Roti',
        'category'    => 'Breads',
        'description' => 'Plain whole wheat roti baked against the clay wall of the tandoor.',
        'price'       => 35,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Cheese Kulcha',
        'category'    => 'Breads',
        'description' => 'Stuffed kulcha with a molten cheese centre, served with mint chutney.',
        'price'       => 90,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],

    // ---------------- Rice & Biryani ----------------
    [
        'name'        => 'Hyderabadi Chicken Biryani',
        'category'    => 'Rice & Biryani',
        'description' => 'Long grain basmati layered with marinated chicken, saffron milk and fried onion, sealed and dum-cooked.',
        'price'       => 380,
        'type'        => 'non-veg',
        'spice'       => 2,
        'special'     => true,
    ],
    [
        'name'        => 'Vegetable Biryani',
        'category'    => 'Rice & Biryani',
        'description' => 'Basmati rice layered with seasonal vegetables, whole spices and a spoon of ghee.',
        'price'       => 300,
        'type'        => 'veg',
        'spice'       => 2,
        'special'     => false,
    ],
    [
        'name'        => 'Jeera Rice',
        'category'    => 'Rice & Biryani',
        'description' => 'Steamed basmati tossed with cumin seeds and ghee, the perfect partner to any curry.',
        'price'       => 180,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Mutton Biryani',
        'category'    => 'Rice & Biryani',
        'description' => 'Slow-cooked mutton on the bone with aged basmati, served with raita and salan.',
        'price'       => 480,
        'type'        => 'non-veg',
        'spice'       => 3,
        'special'     => false,
    ],
    [
        'name'        => 'Curd Rice',
        'category'    => 'Rice & Biryani',
        'description' => 'Cooling rice with fresh curd, tempered with mustard seeds and curry leaves.',
        'price'       => 160,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],

    // ---------------- Desserts ----------------
    [
        'name'        => 'Gulab Jamun',
        'category'    => 'Desserts',
        'description' => 'Two warm milk dumplings soaked in cardamom and rose syrup.',
        'price'       => 120,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => true,
    ],
    [
        'name'        => 'Rasmalai',
        'category'    => 'Desserts',
        'description' => 'Soft chenna discs resting in chilled saffron milk with pistachio.',
        'price'       => 150,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Gajar Ka Halwa',
        'category'    => 'Desserts',
        'description' => 'Grated carrot slow-cooked in milk and ghee, topped with almond flakes.',
        'price'       => 140,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Kulfi Falooda',
        'category'    => 'Desserts',
        'description' => 'Malai kulfi with rose syrup, vermicelli and basil seeds.',
        'price'       => 160,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Jalebi',
        'category'    => 'Desserts',
        'description' => 'Crisp saffron spirals fried to order and dipped in light sugar syrup.',
        'price'       => 110,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],

    // ---------------- Beverages ----------------
    [
        'name'        => 'Masala Chai',
        'category'    => 'Beverages',
        'description' => 'Strong Assam tea boiled with ginger, green cardamom and a little jaggery.',
        'price'       => 60,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => true,
    ],
    [
        'name'        => 'Sweet Lassi',
        'category'    => 'Beverages',
        'description' => 'Thick churned curd blended with sugar and a pinch of cardamom.',
        'price'       => 90,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Filter Coffee',
        'category'    => 'Beverages',
        'description' => 'South Indian decoction poured tall with hot frothy milk.',
        'price'       => 70,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Fresh Lime Soda',
        'category'    => 'Beverages',
        'description' => 'Lime juice and soda, sweet or salted, served over crushed ice.',
        'price'       => 80,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
    [
        'name'        => 'Mango Shake',
        'category'    => 'Beverages',
        'description' => 'Seasonal Alphonso pulp blended with chilled milk.',
        'price'       => 120,
        'type'        => 'veg',
        'spice'       => 1,
        'special'     => false,
    ],
];

// The category names, in the order we want the filter buttons to appear.
$categories = ['Starters', 'Main Course', 'Breads', 'Rice & Biryani', 'Desserts', 'Beverages'];`,
  },
];