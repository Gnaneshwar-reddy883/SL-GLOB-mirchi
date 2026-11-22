// The five pages of the PHP project.

export const pageFiles = [
  {
    path: "index.php",
    note: "Home page. Includes the data, then prints the hero and three Chef's Special dishes with a foreach loop.",
    code: `<?php
// ==========================================================
//  index.php — the HOME page
//  include pulls in another PHP file as if its code were typed
//  here. First the data (so we have $menu_items), then the navbar.
// ==========================================================
$page_title = 'Home';
include 'includes/menu-data.php';
include 'includes/header.php';

// Collect the first three Chef's Special dishes for the home page.
$featured = [];
foreach ($menu_items as $item) {
    if ($item['special'] === true) {
        $featured[] = $item;
    }
    if (count($featured) === 3) {
        break;   // stop as soon as we have three
    }
}
?>

<section class="hero">
    <div class="hero-inner container">
        <p class="hero-kicker">Kolkata · Since 1998</p>
        <h1>Mirchi</h1>
        <p class="hero-tagline">Bold spices, slow-cooked memories.</p>
        <p class="hero-text">
            A small family kitchen serving tandoori starters, handi curries,
            Hyderabadi biryani and mithai made fresh every evening.
        </p>
        <a href="menu.php" class="btn btn-primary">View Menu →</a>
        <a href="reservation.php" class="btn btn-ghost">Book a Table</a>
    </div>
</section>

<section class="container section">
    <div class="highlight-grid">
        <article class="highlight-card fade-in">
            <span class="highlight-icon">🌿</span>
            <h3>Fresh Ingredients</h3>
            <p>Vegetables from the morning market, paneer made in our own kitchen, and whole spices ground every week.</p>
        </article>

        <article class="highlight-card fade-in">
            <span class="highlight-icon">🔥</span>
            <h3>Authentic Recipes</h3>
            <p>Family recipes from Kolkata and Hyderabad, cooked in clay tandoors and heavy handis on a slow flame.</p>
        </article>

        <article class="highlight-card fade-in">
            <span class="highlight-icon">🏠</span>
            <h3>Family Owned</h3>
            <p>The same family has run this kitchen since 1998. Most evenings, one of us is on the floor.</p>
        </article>
    </div>
</section>

<section class="section section-alt">
    <div class="container">
        <div class="section-head">
            <div>
                <p class="eyebrow">From the kitchen</p>
                <h2>This week's favourites</h2>
            </div>
            <a href="menu.php" class="link-arrow">See the full menu →</a>
        </div>

        <div class="dish-grid">
            <?php foreach ($featured as $item): ?>
                <article class="dish-card fade-in">
                    <div class="dish-top">
                        <h3><?= htmlspecialchars($item['name']) ?></h3>
                        <span class="veg-dot <?= $item['type'] ?>"></span>
                    </div>

                    <p class="dish-desc"><?= htmlspecialchars($item['description']) ?></p>

                    <div class="dish-bottom">
                        <span class="dish-price">₹<?= number_format($item['price']) ?></span>
                        <span class="spice">
                            <?php for ($i = 1; $i <= $item['spice']; $i++): ?>🌶️<?php endfor; ?>
                        </span>
                    </div>

                    <button class="btn btn-maroon add-btn"
                            data-name="<?= htmlspecialchars($item['name']) ?>"
                            data-price="<?= $item['price'] ?>">
                        Add to Order
                    </button>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>`,
  },
  {
    path: "menu.php",
    note: "The menu. PHP prints every dish from the array; JavaScript does the filtering, searching and sorting.",
    code: `<?php
// ==========================================================
//  menu.php — the full menu
//  PHP prints ALL the dishes once, using a foreach loop.
//  js/script.js then hides and re-orders those cards in the
//  browser, so filtering never reloads the page.
// ==========================================================
$page_title = 'Menu';
include 'includes/menu-data.php';
include 'includes/header.php';
?>

<section class="page-hero">
    <h1>Our Menu</h1>
    <p>Thirty dishes, cooked to order. Filter, search and sort however you like.</p>
</section>

<section class="container section">

    <!-- ---------- FILTERS (JavaScript only, no reload) ---------- -->
    <div class="menu-controls">

        <!-- Category buttons: one for "All", then one per category -->
        <div class="filter-row">
            <button class="filter-btn active" data-category="All">All</button>
            <?php foreach ($categories as $category): ?>
                <button class="filter-btn" data-category="<?= htmlspecialchars($category) ?>">
                    <?= htmlspecialchars($category) ?>
                </button>
            <?php endforeach; ?>
        </div>

        <div class="menu-tools">
            <label class="search-box">
                <span class="sr-only">Search dishes</span>
                <input type="search" id="searchInput" placeholder="Search dishes...">
            </label>

            <label class="veg-toggle">
                <input type="checkbox" id="vegToggle">
                <span>Veg only</span>
            </label>

            <label class="sort-box">
                <span class="sr-only">Sort dishes</span>
                <select id="sortSelect">
                    <option value="">Recommended</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="name-asc">Name: A to Z</option>
                </select>
            </label>
        </div>
    </div>

    <!-- ---------- THE DISH CARDS ---------- -->
    <div class="dish-grid" id="menuGrid">
        <?php foreach ($menu_items as $item): ?>
            <article class="dish-card"
                     data-name="<?= htmlspecialchars($item['name']) ?>"
                     data-category="<?= htmlspecialchars($item['category']) ?>"
                     data-type="<?= htmlspecialchars($item['type']) ?>"
                     data-price="<?= $item['price'] ?>">

                <div class="dish-top">
                    <h3><?= htmlspecialchars($item['name']) ?></h3>

                    <div class="dish-tags">
                        <!-- if condition: only Chef's Special dishes get a badge -->
                        <?php if ($item['special']): ?>
                            <span class="badge">Chef's Special</span>
                        <?php endif; ?>
                        <span class="veg-dot <?= $item['type'] ?>"></span>
                    </div>
                </div>

                <p class="dish-desc"><?= htmlspecialchars($item['description']) ?></p>

                <div class="dish-bottom">
                    <span class="dish-price">₹<?= number_format($item['price']) ?></span>
                    <span class="spice">
                        <?php for ($i = 1; $i <= $item['spice']; $i++): ?>🌶️<?php endfor; ?>
                    </span>
                </div>

                <button class="btn btn-maroon add-btn"
                        data-name="<?= htmlspecialchars($item['name']) ?>"
                        data-price="<?= $item['price'] ?>">
                    Add to Order
                </button>
            </article>
        <?php endforeach; ?>
    </div>

    <!-- Shown by JavaScript when no dish matches the filters -->
    <p class="no-results" id="noResults" hidden>No dishes found. Try a different filter.</p>
</section>

<?php include 'includes/footer.php'; ?>`,
  },
  {
    path: "about.php",
    note: "A short story page with a simple two-column layout.",
    code: `<?php
// ==========================================================
//  about.php — our story
//  No data needed here, so we only include the header.
// ==========================================================
$page_title = 'About';
include 'includes/header.php';
?>

<section class="page-hero">
    <h1>Our Story</h1>
    <p>Three generations, one kitchen.</p>
</section>

<section class="container section about-layout">
    <div>
        <h2>It started with one clay oven</h2>
        <p>
            In 1998 our grandmother rented a single room off Chowringhee Lane with enough
            space for one tandoor and two tables. She cooked what she knew: the food of a
            Bengali kitchen, and the food of the Hyderabad family she married into.
        </p>
        <p>
            Twenty-five years later the room has become a proper restaurant, but very little
            else has changed. We still grind our masalas every week. We still make paneer
            in the morning. We still finish the biryani on dum, sealed with dough, because
            that is the only way it tastes right.
        </p>
        <p>
            Our parents run the kitchen, we run the floor, and on Sunday evenings the
            grandchildren help carry plates. If you come often enough, you will learn all
            our names.
        </p>
    </div>

    <aside class="about-facts">
        <h3>Mirchi at a glance</h3>
        <ul>
            <li><strong>1998</strong> — the first tandoor is fired</li>
            <li><strong>30 dishes</strong> on the menu today</li>
            <li><strong>Two kitchens</strong> — tandoor and handi</li>
            <li><strong>Open daily</strong> — 12:00 pm to 11:00 pm</li>
        </ul>
        <a href="reservation.php" class="btn btn-maroon">Book a Table</a>
    </aside>
</section>

<?php include 'includes/footer.php'; ?>`,
  },
  {
    path: "contact.php",
    note: "Address, phone and opening hours in an HTML table, plus a map placeholder.",
    code: `<?php
// ==========================================================
//  contact.php — how to find us
// ==========================================================
$page_title = 'Contact';
include 'includes/header.php';
?>

<section class="page-hero">
    <h1>Visit Us</h1>
    <p>We are a short walk from Park Street metro.</p>
</section>

<section class="container section contact-layout">

    <div class="contact-card">
        <h2>Address</h2>
        <address>
            12 Chowringhee Lane<br>
            Kolkata 700016<br>
            West Bengal, India
        </address>

        <h2>Phone</h2>
        <p><a href="tel:+919830012345">+91 98300 12345</a></p>

        <h2>Email</h2>
        <p><a href="mailto:hello@mirchi.example">hello@mirchi.example</a></p>
    </div>

    <div class="contact-card">
        <h2>Opening hours</h2>

        <!-- A simple HTML table: thead holds the headings, tbody the rows -->
        <table class="hours-table">
            <thead>
                <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Hours</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Monday – Thursday</td><td>12:00 pm – 11:00 pm</td></tr>
                <tr><td>Friday – Saturday</td><td>12:00 pm – 12:00 am</td></tr>
                <tr><td>Sunday</td><td>12:00 pm – 10:30 pm</td></tr>
            </tbody>
        </table>
    </div>
</section>

<section class="container section">
    <!-- Replace this box with a real Google Maps iframe if you want one -->
    <div class="map-placeholder">
        <span>🗺️</span>
        <p>Map placeholder — replace this box with a Google Maps &lt;iframe&gt;.</p>
    </div>
</section>

<?php include 'includes/footer.php'; ?>`,
  },
  {
    path: "reservation.php",
    note: "The booking form. JavaScript checks it first, then PHP checks it again and saves a line to the text file.",
    code: `<?php
// ==========================================================
//  reservation.php — booking form
//  The form is validated TWICE:
//    1. in js/script.js, so the visitor gets instant feedback
//    2. here in PHP, because a browser can be bypassed
//  On success one line is appended to data/reservations.txt.
// ==========================================================

$page_title = 'Reservation';

// The form starts empty and with no errors.
$values = [
    'name'    => '',
    'phone'   => '',
    'email'   => '',
    'date'    => '',
    'time'    => '',
    'guests'  => '',
    'request' => '',
];
$errors  = [];
$success = false;

// $_SERVER['REQUEST_METHOD'] tells us how the page was requested.
// "POST" means the form was submitted.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // ---- 1. Read and sanitise every field ----
    // trim() removes spaces at both ends.
    // htmlspecialchars() turns < and > into safe entities, so any HTML a
    // visitor types can never run on our page.
    foreach ($values as $field => $old_value) {
        $raw = $_POST[$field] ?? '';
        $values[$field] = htmlspecialchars(trim($raw));
    }

    // ---- 2. Validate (same rules as the JavaScript) ----
    if ($values['name'] === '') {
        $errors['name'] = 'Please enter your name.';
    } elseif (strlen($values['name']) < 3) {
        $errors['name'] = 'Name must be at least 3 characters.';
    }

    // preg_match() tests the phone against a pattern: exactly 10 digits.
    if (!preg_match('/^[0-9]{10}$/', $values['phone'])) {
        $errors['phone'] = 'Phone number must be exactly 10 digits.';
    }

    // filter_var() with FILTER_VALIDATE_EMAIL is PHP's built-in email check.
    if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please enter a valid email address.';
    }

    // Dates in "YYYY-MM-DD" form can be compared as plain strings.
    $today = date('Y-m-d');
    if ($values['date'] === '') {
        $errors['date'] = 'Please choose a date.';
    } elseif ($values['date'] < $today) {
        $errors['date'] = 'The date cannot be in the past.';
    }

    if ($values['time'] === '') {
        $errors['time'] = 'Please choose a time.';
    }

    // (int) turns the text into a number before we compare it.
    if ($values['guests'] === '' || (int) $values['guests'] < 1 || (int) $values['guests'] > 20) {
        $errors['guests'] = 'Guests must be between 1 and 20.';
    }

    // ---- 3. Save the booking only if there are no errors ----
    if (empty($errors)) {

        // implode() joins an array into one string using " | " between items.
        $line = implode(' | ', [
            date('Y-m-d H:i:s'),
            $values['name'],
            $values['phone'],
            $values['email'],
            $values['date'],
            $values['time'],
            $values['guests'] . ' guests',
            $values['request'] === '' ? '-' : $values['request'],
        ]) . PHP_EOL;

        // __DIR__ is this file's folder, so the path works from anywhere.
        // FILE_APPEND adds to the end of the file instead of overwriting it.
        // LOCK_EX stops two visitors writing at the same moment.
        $saved = file_put_contents(
            __DIR__ . '/data/reservations.txt',
            $line,
            FILE_APPEND | LOCK_EX
        );

        if ($saved === false) {
            $errors['general'] = 'Sorry, we could not save your booking. Please try again.';
        } else {
            $success     = true;
            $booked_name = $values['name'];
            // Empty the form so it is ready for the next booking.
            $values = array_fill_keys(array_keys($values), '');
        }
    }
}

include 'includes/header.php';
?>

<section class="page-hero">
    <h1>Book a Table</h1>
    <p>Tell us when you are coming and we will keep a table warm.</p>
</section>

<section class="container section">

    <?php if ($success): ?>
        <div class="alert alert-success">
            <strong>Thank you, <?= htmlspecialchars($booked_name) ?>!</strong>
            Your table is requested. We will call you on the number you gave us to confirm.
        </div>
    <?php endif; ?>

    <?php if (!empty($errors['general'])): ?>
        <div class="alert alert-error"><?= $errors['general'] ?></div>
    <?php endif; ?>

    <!-- novalidate turns off the browser bubble so our own messages show instead -->
    <form class="form-card" id="reservationForm" method="POST" action="reservation.php" novalidate>
        <div class="form-grid">

            <div class="field">
                <label for="name">Full name</label>
                <input type="text" id="name" name="name" placeholder="Ananya Sen"
                       value="<?= $values['name'] ?>">
                <span class="error" id="error-name"><?= $errors['name'] ?? '' ?></span>
            </div>

            <div class="field">
                <label for="phone">Phone number</label>
                <input type="tel" id="phone" name="phone" placeholder="9830012345"
                       value="<?= $values['phone'] ?>">
                <span class="error" id="error-phone"><?= $errors['phone'] ?? '' ?></span>
            </div>

            <div class="field">
                <label for="email">Email address</label>
                <input type="email" id="email" name="email" placeholder="you@example.com"
                       value="<?= $values['email'] ?>">
                <span class="error" id="error-email"><?= $errors['email'] ?? '' ?></span>
            </div>

            <div class="field">
                <label for="date">Date</label>
                <input type="date" id="date" name="date" min="<?= date('Y-m-d') ?>"
                       value="<?= $values['date'] ?>">
                <span class="error" id="error-date"><?= $errors['date'] ?? '' ?></span>
            </div>

            <div class="field">
                <label for="time">Time</label>
                <input type="time" id="time" name="time" value="<?= $values['time'] ?>">
                <span class="error" id="error-time"><?= $errors['time'] ?? '' ?></span>
            </div>

            <div class="field">
                <label for="guests">Number of guests</label>
                <input type="number" id="guests" name="guests" min="1" max="20"
                       value="<?= $values['guests'] ?>">
                <span class="error" id="error-guests"><?= $errors['guests'] ?? '' ?></span>
            </div>
        </div>

        <div class="field">
            <label for="request">Special request (optional)</label>
            <textarea id="request" name="request" rows="3"
                      placeholder="Window seat, birthday cake, allergies..."><?= $values['request'] ?></textarea>
        </div>

        <button type="submit" class="btn btn-maroon">Confirm Reservation</button>
    </form>
</section>

<?php include 'includes/footer.php'; ?>`,
  },
];