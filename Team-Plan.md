# 📦 WAD Homework — E-Commerce Project
**UMBB · L2 Computer Science · 2025/2026**
**Team of 3 — Work Distribution & Detailed Plan**

> ⚠️ No PHP in this project. Auth and order saving are handled fully client-side with JavaScript and localStorage.

---

## 🗂️ Project File Structure

```
E_Commerce_Project/
├── index.html            ← Authentication page
├── main.html             ← Main product catalog page
├── menclothing.html      ← MenClothing category page
├── kidsclothing.html         ← KidsClothing category page
├── womenclothing.html            ← WomenClothing category page
├── cart.html             ← Shopping cart page
├── style.css             ← External CSS (entire project)
├── script.js             ← External JavaScript (entire project)
└── images/               ← All product & UI images
    ├── logo.png
    ├── header-bg.jpg
    ├── menclothing/
    ├── kidsclothing/
    └── womenclothing/
```

---

## 👤 Member 1 — Rayan (HTML & CSS / Frontend Design)

**Responsible for:** All pages structure + all visual styling

---

### ✅ Task List

#### 1. `style.css` — Global Stylesheet

- [ ] Import a custom font using `@font-face` (e.g., from Google Fonts CDN or a local `.woff2` file)
- [ ] Define CSS variables for the color palette (primary, accent, text, background)
- [ ] Apply different colors for `h1`, `h2`, `h3` vs body text (required by spec)
- [ ] Style all shared components: `header`, `nav`, `footer`, `article`, `aside`
- [ ] Style form elements: inputs, buttons, error messages
- [ ] Style product cards: image, title, price, description, quantity input, button
- [ ] Implement `position: sticky` for both `<aside>` sections on category pages
- [ ] Add auto-scrolling animation to `aside 1` using CSS `@keyframes`
- [ ] Ensure the layout matches the diagrams in the homework spec (flexbox or grid)
- [ ] Make the cart summary in `aside 2` visually clear (item count + total price area)

---

#### 2. `index.html` — Authentication Page

```
Structure:
├── <header>  ← Store name + logo + background image
├── <main>
│   └── <form id="login-form">
│       ├── <input type="text" id="username">      ← Login
│       ├── <input type="password" id="password">  ← Password
│       ├── <button type="submit">                 ← Login button
│       └── <p id="error-msg">                     ← Error (hidden by default)
└── <footer>  ← Student info (name 👤, email 📧, group 🆔)
```

**Notes:**
- The IDs `login-form`, `username`, `password`, `error-msg` are used by Teammate 2 (JS)
- No `action` attribute needed on the form — JS intercepts submission

---

#### 3. `main.html` — Product Catalog Page

```
Structure:
├── <header>     ← Store name (centered) + logo (left) + background image
├── <nav>        ← Links: MenClothing | KidsClothing | WomenClothing | 🛒 Cart
├── <main>
│   ├── <article class="category-card">   ← MenClothing
│   ├── <article class="category-card">   ← KidsClothing
│   └── <article class="category-card">   ← WomenClothing
└── <footer>     ← Student info
```

---

#### 4. `menclothing.html` / `kidsclothing.html` / `womenclothing.html` — Category Pages

Each file follows the same structure:

```
Structure:
├── <header>
├── <nav>        ← Links to all categories + Cart
├── <div class="page-body">
│   ├── <div class="products-area">
│   │   ├── <div class="products-grid">
│   │   │   └── <article class="product-card"
│   │   │               data-id="..."
│   │   │               data-name="..."
│   │   │               data-price="...">
│   │   │         <img>
│   │   │         <h2>Product Name</h2>
│   │   │         <p class="price">
│   │   │         <p class="description">
│   │   │         <input type="number" class="qty-input" min="1" value="1">
│   │   │         <button class="add-to-cart-btn">Add to Cart</button>
│   │   │       </article>
│   │   │       ... (3 products minimum)
│   │   └── <button id="checkout-btn">Checkout</button>
│   └── <div class="aside-column">
│       ├── <aside id="aside-policy">   ← Auto-scroll text
│       └── <aside id="aside-cart">    ← Cart summary (filled by JS)
│             ├── <span id="cart-count">
│             └── <span id="cart-total">
└── <footer>
    └── <p id="final-total">   ← Shown after checkout click
```

**Naming conventions Teammate 2 depends on:**

| Element | ID / Class / Attribute |
|---|---|
| Product card wrapper | `class="product-card"` |
| Add to Cart button | `class="add-to-cart-btn"` |
| Product ID | `data-id="men-001"` |
| Product name | `data-name="Wireless Headphones"` |
| Product price (number only, no DA) | `data-price="4500"` |
| Quantity input | `class="qty-input"` |
| Cart item count in aside | `id="cart-count"` |
| Cart total in aside | `id="cart-total"` |
| Nav cart badge | `id="nav-cart-count"` |
| Final total display | `id="final-total"` |
| Checkout button | `id="checkout-btn"` |
| Logout link | `id="logout-link"` (no href needed) |

---

#### 5. `cart.html` — Cart Page

```
Structure:
├── <header>
├── <nav>
├── <main>
│   ├── <table id="cart-table">
│   │   ├── <thead>  ← Product | Price | Qty | Subtotal | Action
│   │   └── <tbody id="cart-table-body">   ← Filled by JS
│   └── <div class="cart-grand-total">
│         Grand Total: <span id="cart-grand-total">0 DA</span>
└── <footer>
```

---

#### 6. Images

- Collect images for:
  - `images/logo.png` — store logo
  - `images/header-bg.jpg` — header background
  - 3 product images per category → `images/menclothing/`, `images/kidsclothing/`, `images/womenclothing/`
- Use consistent sizing in CSS: `width: 100%; aspect-ratio: 4/3; object-fit: cover`

---

### 📋 Deliverables

- `index.html`, `main.html`, `menclothing.html`, `kidsclothing.html`, `womenclothing.html`, `cart.html`
- `style.css`
- `images/` folder (all images)

---

---

## 👤 Member 2 — JavaScript (Auth + Cart Core)

**Responsible for:** Login logic, Add to Cart, cart sidebar live updates

---

### ✅ Task List

#### 1. Setup

- [ ] All code goes in `script.js`, linked at the bottom of every HTML page
- [ ] Wrap everything inside `document.addEventListener("DOMContentLoaded", ...)`

---

#### 2. Hardcoded Accounts (replaces PHP auth)

Since there is no backend, valid accounts are defined directly in `script.js`:

```js
// Hardcoded accounts — no database needed
const ACCOUNTS = [
  { username: "admin",   password: "1234" },
  { username: "rayan",   password: "pass1" },
  { username: "student", password: "wad2026" }
];
```

- [ ] Define `ACCOUNTS` array at the top of `script.js`
- [ ] On login form submit: compare input values against this array
- [ ] Match found → save user to `sessionStorage` → redirect to `main.html`
- [ ] No match → show `#error-msg`

```js
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    const match = ACCOUNTS.find(
      (a) => a.username === username && a.password === password
    );

    if (match) {
      sessionStorage.setItem("loggedUser", username);
      window.location.href = "main.html";
    } else {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Incorrect username or password.";
    }
  });
}
```

---

#### 3. localStorage Cart Format

```js
// localStorage key: "cart"
// Value: JSON array — share this format with Teammate 3

[
  { id: "men-001", name: "Wireless Headphones", price: 4500, qty: 2 },
  { id: "womenclothing-001", name: "Clean Code",          price: 1200, qty: 1 }
]
```

Write these two helpers that all cart logic depends on:

```js
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cartArray) {
  localStorage.setItem("cart", JSON.stringify(cartArray));
}
```

---

#### 4. Add to Cart Logic (category pages)

- [ ] Select all `.add-to-cart-btn` buttons and attach click listeners
- [ ] On click: read `data-id`, `data-name`, `data-price` from the button
- [ ] Read qty from `.qty-input` inside the same `.product-card`
- [ ] If item already in cart → increase `qty`, else push new item
- [ ] Save updated cart, then call `updateCartSidebar()`

```js
function addItem(id, name, price, qty) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, name, price, qty });
  }
  saveCart(cart);
  updateCartSidebar();
}

document.querySelectorAll(".add-to-cart-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const card  = btn.closest(".product-card");
    const id    = btn.getAttribute("data-id");
    const name  = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));
    const qty   = parseInt(card.querySelector(".qty-input").value) || 1;
    addItem(id, name, price, qty);
  });
});
```

---

#### 5. Cart Sidebar — `aside 2` live updates

```js
function updateCartSidebar() {
  const cart       = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const cartCount    = document.getElementById("cart-count");
  const cartTotal    = document.getElementById("cart-total");
  const navCartCount = document.getElementById("nav-cart-count");

  if (cartCount)    cartCount.textContent    = totalItems;
  if (cartTotal)    cartTotal.textContent    = totalPrice.toLocaleString() + " DA";
  if (navCartCount) navCartCount.textContent = totalItems;
}

// Call on every page load
updateCartSidebar();
```

---

### 📋 Deliverables

- `script.js` — sections 1–5 above, fully implemented and commented

---

---

## 👤 Member 3 — JavaScript (Checkout + Cart Page)

**Responsible for:** Checkout flow, cart page rendering, order history in localStorage

---

### ✅ Task List

#### 1. Checkout Logic (category pages — `#checkout-btn`)

When the user clicks Checkout:

1. Load cart from `localStorage`
2. Calculate grand total
3. Display total in `#final-total` in the footer
4. Save completed order to `localStorage` under key `"orders"`
5. Clear the active cart
6. Call `updateCartSidebar()` to reset sidebar to 0

```js
const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", function () {
    const cart = getCart();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const grandTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Show in footer
    const finalTotal = document.getElementById("final-total");
    if (finalTotal) {
      finalTotal.textContent =
        "✅ Order placed! Total: " + grandTotal.toLocaleString() + " DA";
    }

    // Save order to history
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({
      date:  new Date().toLocaleString(),
      items: cart,
      total: grandTotal
    });
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    saveCart([]);
    updateCartSidebar();
  });
}
```

---

#### 2. Cart Page Render — `cart.html`

On page load, populate `#cart-table-body` from `localStorage`:

```js
const cartTableBody = document.getElementById("cart-table-body");

if (cartTableBody) {
  const cart     = getCart();
  const emptyRow = document.getElementById("cart-empty-row");

  if (cart.length === 0) {
    return; // keep empty state visible
  }

  if (emptyRow) emptyRow.style.display = "none";

  let grandTotal = 0;

  cart.forEach(function (item) {
    const subtotal = item.price * item.qty;
    grandTotal += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toLocaleString()} DA</td>
      <td>${item.qty}</td>
      <td>${subtotal.toLocaleString()} DA</td>
      <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
    `;
    cartTableBody.appendChild(row);
  });

  const grandTotalEl = document.getElementById("cart-grand-total");
  if (grandTotalEl) grandTotalEl.textContent = grandTotal.toLocaleString() + " DA";

  // Remove item logic
  cartTableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const id = e.target.getAttribute("data-id");
      saveCart(getCart().filter((item) => item.id !== id));
      location.reload();
    }
  });
}
```

---

#### 3. Logout (no PHP — JS only)

Add to `script.js`. Since there's no server session, logout clears `sessionStorage` and redirects:

```js
const logoutLink = document.getElementById("logout-link");
if (logoutLink) {
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
  });
}
```

> Tell Rayan: all Logout links in the nav should be `<a href="#" id="logout-link">Logout</a>`

---

### 📋 Deliverables

- `script.js` — checkout + cart page + logout sections (added to Teammate 2's base file)

---

---

## 🔗 Integration Checklist (All Members)

Before final submission, verify together:

- [ ] HTML `id`/`class` names match what `script.js` expects (Rayan ↔ Teammates 2 & 3)
- [ ] `getCart()` and `saveCart()` helpers are defined **once** at the top of `script.js`
- [ ] `updateCartSidebar()` is also defined **once** and called everywhere needed
- [ ] Logout link on all pages uses `id="logout-link"` (not `href="logout.php"`)
- [ ] All pages link to the same `style.css` and `script.js`
- [ ] All images load correctly (paths match `images/` folder)
- [ ] Code is fully commented throughout (required by spec)
- [ ] No plagiarism — all work is original

---

## 📅 Suggested Timeline

| Date | Milestone |
|---|---|
| April 20–21 | Share wireframe, agree on all ID/class names and `localStorage` format |
| April 22–24 | Rayan: branding CSS · Teammate 2: auth + add-to-cart · Teammate 3: checkout + cart page |
| April 25–27 | Merge `script.js`, full end-to-end test (login → browse → cart → checkout) |
| April 28–29 | Bug fixes, comment pass, final file check |
| **April 30** | **Submission via Google Drive** ✅ |