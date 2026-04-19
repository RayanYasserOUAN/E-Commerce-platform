# 📦 WAD Homework — E-Commerce Project
**UMBB · L2 Computer Science · 2025/2026**
**Team of 3 — Work Distribution & Detailed Plan**

---

## 🗂️ Project File Structure (Full)

```
E_Commerce_Project/
├── index.html            ← Authentication page
├── main.html             ← Main product catalog page
├── electronics.html      ← Electronics category page
├── clothing.html         ← Clothing category page
├── books.html            ← Books category page
├── cart.html             ← Shopping cart page
├── style.css             ← External CSS (entire project)
├── script.js             ← External JavaScript (entire project)
├── images/               ← All product & UI images
│   ├── logo.png
│   ├── header-bg.jpg
│   ├── electronics/
│   ├── clothing/
│   └── books/
├── login.php             ← Login authentication logic
├── logout.php            ← Session termination
├── save_order.php        ← Save order to database
└── db.php                ← Database connection config
```

---

## 👤 Member 1 — Rayan (HTML & CSS / Frontend Design)

**Responsible for:** All pages structure + all visual styling

---

### ✅ Task List

#### 1. `style.css` — Global Stylesheet

- [ ] Import a custom font using `@font-face` (e.g., from Google Fonts CDN or a local `.woff2` file)
- [ ] Define CSS variables for the color palette (primary, accent, text, background)
- [ ] Apply different colors for `h1`, `h2`, `h3` vs body text (required)
- [ ] Style all shared components: `header`, `nav`, `footer`, `article`, `aside`
- [ ] Style form elements: inputs, buttons, error messages
- [ ] Style product cards: image, title, price, description, quantity input, button
- [ ] Implement `position: sticky` for both `<aside>` sections on category pages
- [ ] Add auto-scrolling animation to `aside 1` using CSS `@keyframes` or a `marquee`-style approach
- [ ] Ensure the layout matches the diagrams in the homework spec (flexbox or grid)
- [ ] Make the cart summary in `aside 2` visually clear (item count + total price area)

---

#### 2. `index.html` — Authentication Page

```
Structure:
├── <header>  ← Store name + logo + background image
├── <main>
│   └── <form>
│       ├── <input type="text">     ← Login / username
│       ├── <input type="password"> ← Password
│       ├── <button type="submit">  ← Login button
│       └── <p id="error-msg">      ← Error message placeholder (hidden by default)
└── <footer>  ← Student info (name, email, group) with icons
```

**Notes:**
- Give the form `id="login-form"`, inputs `id="username"` and `id="password"`, error paragraph `id="error-msg"`
- These IDs are used by Teammate 2 (JS) for validation

---

#### 3. `main.html` — Product Catalog Page

```
Structure:
├── <header>     ← Store name (centered) + logo (left) + background image
├── <nav>        ← Links: Electronics | Clothing | Books | 🛒 Cart
├── <main>
│   ├── <article>   ← Electronics: title + short description + image + link
│   ├── <article>   ← Clothing: title + short description + image + link
│   └── <article>   ← Books: title + short description + image + link
└── <footer>     ← Student info (name 👤, email 📧, group 🆔)
```

---

#### 4. `electronics.html` / `clothing.html` / `books.html` — Category Pages

Each file follows the same structure:

```
Structure:
├── <header>    ← Same as main page
├── <nav>       ← Links to all categories + Cart
├── <div class="page-body">
│   ├── <section class="products">
│   │   ├── <article class="product-card">   ← Product 1
│   │   │   ├── <h2>Product Name</h2>
│   │   │   ├── <img>
│   │   │   ├── <p class="price">
│   │   │   ├── <p class="description">
│   │   │   ├── <input type="number" min="1" value="1" class="qty-input">
│   │   │   └── <button class="add-to-cart-btn" data-id="..." data-name="..." data-price="...">
│   │   │       Add to Cart
│   │   │       </button>
│   │   ├── <article class="product-card">   ← Product 2
│   │   └── <article class="product-card">   ← Product 3
│   ├── <aside id="aside-policy">    ← Shopping guidelines / return policy (auto-scroll)
│   └── <aside id="aside-cart">     ← Cart summary (items + total — filled by JS)
└── <footer>
    ├── <p id="final-total">         ← Final total shown after checkout click
    └── <button id="checkout-btn">Checkout</button>
```

**Important naming conventions (coordinate with Teammate 2):**
| Element | ID / Class |
|---|---|
| Each product card | `class="product-card"` |
| Add to Cart button | `class="add-to-cart-btn"` |
| Product data attributes | `data-id`, `data-name`, `data-price` |
| Quantity input | `class="qty-input"` |
| Cart item count (aside 2) | `id="cart-count"` |
| Cart total (aside 2) | `id="cart-total"` |
| Final total display | `id="final-total"` |
| Checkout button | `id="checkout-btn"` |

---

#### 5. `cart.html` — Cart Page

```
Structure:
├── <header>
├── <nav>
├── <main>
│   ├── <table id="cart-table">   ← Cart items listed here (filled by JS)
│   └── <p id="cart-grand-total"> ← Grand total
└── <footer>
```

---

#### 6. Images

- Collect/download images for:
  - Store logo (`images/logo.png`)
  - Header background (`images/header-bg.jpg`)
  - At least 3 product images per category (9 total minimum)
- Use consistent image sizes in CSS (e.g., `width: 100%; aspect-ratio: 4/3; object-fit: cover`)

---

### 📋 Deliverables

- `index.html`
- `main.html`
- `electronics.html`
- `clothing.html`
- `books.html`
- `cart.html`
- `style.css`
- `images/` folder (all images)

---

---

## 👤 Member 2 — JavaScript Developer

**Responsible for:** All interactivity, cart logic, localStorage persistence

---

### ✅ Task List

#### 1. Setup

- [ ] Create `script.js` — link it at the bottom of every HTML page using `<script src="script.js"></script>`
- [ ] Use `DOMContentLoaded` event listener as your entry point

---

#### 2. Authentication Logic (`index.html`)

```js
// On form submit:
// 1. Prevent default form submission
// 2. Read username and password values
// 3. Make a fetch() POST request to login.php
// 4. If response is success → redirect to main.html
// 5. If response is error → show error message in #error-msg
```

- [ ] Grab `#login-form` and listen for `submit` event
- [ ] `fetch('login.php', { method: 'POST', body: formData })`
- [ ] On success: `window.location.href = 'main.html'`
- [ ] On failure: set `#error-msg` text and make it visible

---

#### 3. localStorage Cart Data Format

**Agree on this structure with Teammate 3 before starting:**

```js
// localStorage key: "cart"
// Value: JSON array of objects

[
  {
    id: "elec-001",
    name: "Wireless Headphones",
    price: 4500,       // price in DZD or chosen currency
    qty: 2,
    category: "electronics"
  },
  {
    id: "book-002",
    name: "Clean Code",
    price: 1200,
    qty: 1,
    category: "books"
  }
]
```

---

#### 4. Add to Cart Logic (category pages)

```js
// For each .add-to-cart-btn:
// 1. Read data-id, data-name, data-price from the button
// 2. Read quantity from the nearest .qty-input
// 3. Load current cart from localStorage (or empty array)
// 4. Check if item already exists → update qty, else push new item
// 5. Save updated cart back to localStorage
// 6. Call updateCartSidebar()
```

- [ ] Attach click listeners to all `.add-to-cart-btn` elements
- [ ] Helper function: `getCart()` → returns parsed array from localStorage
- [ ] Helper function: `saveCart(cartArray)` → JSON.stringify and save
- [ ] Helper function: `addItem(id, name, price, qty)` → handles add/update logic

---

#### 5. Cart Sidebar — aside 2 (category pages)

```js
// updateCartSidebar():
// 1. Load cart from localStorage
// 2. Calculate total items (sum of all qty)
// 3. Calculate total price (sum of price * qty)
// 4. Update #cart-count innerText
// 5. Update #cart-total innerText
```

- [ ] Call `updateCartSidebar()` on page load AND after every add
- [ ] Make sure it runs on all 3 category pages

---

#### 6. Checkout Button (category pages)

```js
// On #checkout-btn click:
// 1. Load cart from localStorage
// 2. Calculate grand total
// 3. Display total in #final-total
// 4. Send cart data to save_order.php via fetch() POST
// 5. Optionally clear localStorage after saving
```

- [ ] `fetch('save_order.php', { method: 'POST', body: JSON.stringify(cart), headers: { 'Content-Type': 'application/json' } })`
- [ ] On success: show confirmation message, clear cart
- [ ] On failure: show error message

---

#### 7. Cart Page (`cart.html`)

```js
// On page load:
// 1. Load cart array from localStorage
// 2. For each item, create a <tr> row and insert into #cart-table
// 3. Calculate and display grand total in #cart-grand-total
// 4. Optional: add a "Remove" button per row that updates localStorage and re-renders
```

---

### 📋 Deliverables

- `script.js` (fully commented, all logic in one file)

---

---

## 👤 Member 3 — PHP & Database

**Responsible for:** Server-side logic, session management, database schema and data

---

### ✅ Task List

#### 1. Database Schema

Create a MySQL database named `ecommerce_wad` with these 4 tables:

```sql
-- Table 1: account
CREATE TABLE account (
    login VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL  -- store hashed with password_hash()
);

-- Table 2: customer
CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Table 3: product
CREATE TABLE product (
    product_id VARCHAR(20) PRIMARY KEY,   -- e.g. "elec-001"
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,        -- "electronics", "clothing", "books"
    image VARCHAR(255),                   -- relative image path
    description TEXT
);

-- Table 4: orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);
```

---

#### 2. Seed Data

Insert test data so the team can test the site locally:

```sql
-- Test account
INSERT INTO account VALUES ('testuser', '$2y$10$...'); -- use password_hash('password123', PASSWORD_BCRYPT)

-- Test customer
INSERT INTO customer (name, address, phone, email)
VALUES ('Test User', '12 Rue Didouche, Alger', '0551000000', 'test@example.com');

-- Sample products (3 per category = 9 total)
INSERT INTO product VALUES
('elec-001', 'Wireless Headphones', 4500.00, 'electronics', 'images/electronics/headphones.jpg', 'High quality sound with noise cancellation.'),
('elec-002', 'USB-C Hub', 1800.00, 'electronics', 'images/electronics/hub.jpg', '7-in-1 multiport hub for laptops.'),
('elec-003', 'LED Desk Lamp', 950.00, 'electronics', 'images/electronics/lamp.jpg', 'Adjustable brightness and color temperature.'),

('cloth-001', 'Cotton T-Shirt', 600.00, 'clothing', 'images/clothing/tshirt.jpg', 'Comfortable everyday wear.'),
('cloth-002', 'Denim Jacket', 2800.00, 'clothing', 'images/clothing/jacket.jpg', 'Classic fit, durable denim.'),
('cloth-003', 'Running Shoes', 3200.00, 'clothing', 'images/clothing/shoes.jpg', 'Lightweight and breathable.'),

('book-001', 'Clean Code', 1200.00, 'books', 'images/books/cleancode.jpg', 'Best practices for writing readable code.'),
('book-002', 'The Pragmatic Programmer', 1500.00, 'books', 'images/books/pragmatic.jpg', 'Tips for effective software development.'),
('book-003', 'Eloquent JavaScript', 1100.00, 'books', 'images/books/javascript.jpg', 'A modern introduction to JavaScript.');
```

---

#### 3. `db.php` — Database Connection

```php
<?php
// db.php — Shared database connection
$host = 'localhost';
$dbname = 'ecommerce_wad';
$username = 'root';
$password = '';  // change to your local MySQL password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'DB connection failed']));
}
?>
```

---

#### 4. `login.php` — Authentication

```php
<?php
// login.php
// Receives POST: username, password
// Returns JSON: { success: true } or { success: false, message: "..." }

session_start();
require 'db.php';

$data = $_POST;
$login = $data['username'] ?? '';
$password = $data['password'] ?? '';

$stmt = $pdo->prepare("SELECT password FROM account WHERE login = ?");
$stmt->execute([$login]);
$row = $stmt->fetch();

if ($row && password_verify($password, $row['password'])) {
    $_SESSION['user'] = $login;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid login or password.']);
}
?>
```

- [ ] Implement and test `login.php`
- [ ] Make sure session is started and `$_SESSION['user']` is set on success

---

#### 5. `logout.php` — Session Termination

```php
<?php
// logout.php
session_start();
session_destroy();
header('Location: index.html');
exit;
?>
```

- [ ] Add a logout link in the nav that points to `logout.php`
- [ ] Coordinate with Teammate 1 (Rayan) to add this link in the nav HTML

---

#### 6. `save_order.php` — Save Order to Database

```php
<?php
// save_order.php
// Receives POST body: JSON array of cart items
// Saves each item as a row in the orders table

session_start();
require 'db.php';

if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated.']);
    exit;
}

$body = file_get_contents('php://input');
$cart = json_decode($body, true);

if (!$cart || !is_array($cart)) {
    echo json_encode(['success' => false, 'message' => 'Invalid cart data.']);
    exit;
}

// Get customer_id from session username (assuming login = email or join on account table)
// Adjust query depending on how account links to customer
$login = $_SESSION['user'];
$stmt = $pdo->prepare("SELECT customer_id FROM customer WHERE email = ?");
$stmt->execute([$login]);
$customer = $stmt->fetch();

if (!$customer) {
    echo json_encode(['success' => false, 'message' => 'Customer not found.']);
    exit;
}

$customer_id = $customer['customer_id'];

$stmt = $pdo->prepare("
    INSERT INTO orders (customer_id, product_id, quantity, total_price)
    VALUES (?, ?, ?, ?)
");

foreach ($cart as $item) {
    $total = $item['price'] * $item['qty'];
    $stmt->execute([$customer_id, $item['id'], $item['qty'], $total]);
}

echo json_encode(['success' => true, 'message' => 'Order saved successfully.']);
?>
```

- [ ] Test with Postman or directly via the checkout button in the browser
- [ ] Confirm the `product_id` values in the DB match the `data-id` values in the HTML (coordinate with Rayan)

---

### 📋 Deliverables

- `db.php`
- `login.php`
- `logout.php`
- `save_order.php`
- SQL schema file (`schema.sql`) — exported from phpMyAdmin or written manually
- Seed data inserted and testable

---

---

## 🔗 Integration Checklist (All Members)

Before final submission, verify together:

- [ ] HTML `id`/`class` names match what JS expects (Rayan ↔ Teammate 2)
- [ ] `data-id` on product cards matches `product_id` in the database (Rayan ↔ Teammate 3)
- [ ] `localStorage` cart item format matches what `save_order.php` expects (Teammate 2 ↔ Teammate 3)
- [ ] Login form fields match what `login.php` reads from `$_POST` (Rayan ↔ Teammate 3)
- [ ] All pages link to same `style.css` and `script.js`
- [ ] All images load correctly (paths match)
- [ ] Code is commented throughout (required by homework spec)
- [ ] No plagiarism — everything is original team work

---

## 📅 Suggested Timeline

| Date | Milestone |
|---|---|
| April 19–21 | Each member sets up their part locally, agree on naming conventions |
| April 22–24 | Rayan finishes HTML structure + CSS base; JS member builds cart logic; DB member sets up schema |
| April 25–27 | Integration — connect JS to PHP, test login + checkout flow |
| April 28–29 | Bug fixes, comments, final cleanup |
| **April 30** | **Submission via Google Drive** ✅ |