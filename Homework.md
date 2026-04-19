# WAD Homework — L2 2025/2026
**UMBB · Faculty of Science · Department of Computer Science**

> **Submission deadline:** April 30, 2026
> *(via Google Drive — links will be shared by the lab instructors)*

> ⚠️ Any code plagiarism will be severely penalized.

---

## Project Overview

Develop a web-based **E-Commerce platform** that includes:

- An authentication page
- A main product catalog page
- Product detail pages with "Add to Cart" functionality

You will create **3 product categories** (e.g., Electronics, Clothing, Books).

---

## I. Authentication Page

The customer enters their login and password.

- ✅ If credentials are **correct** → the main product catalog page is displayed
- ❌ If credentials are **incorrect** → an error message appears

---

## II. Main Page Structure (Product Catalog)

### 1. Main Section — 3 Articles

Each `<article>` should:

- Describe a product category (e.g., Electronics, Clothing, Books)
- Provide a short description and a preview image
- Include a link to the corresponding product category page

### 2. Header Section

- Store name as a title (center-aligned)
- A logo (shopping cart icon or store logo) on the left
- A background image related to online shopping

### 3. Footer Section

Student information, each on a separate line with a corresponding icon:

| Icon | Field |
|------|-------|
| 👤 | Full name |
| 📧 | Email |
| 🆔 | Group / Section |

### 4. Navigation (`<nav>`) Section

- Links to each product category page
- Link to the shopping cart page

### 5. Page Layout

```
┌─────────────────────────────┐
│           Header            │
├─────────────────────────────┤
│             nav             │
├─────────────────────────────┤
│         Main Section        │
│  ┌─────────┐                │
│  │ Article │                │
│  ├─────────┤                │
│  │ Article │                │
│  ├─────────┤                │
│  │ Article │                │
│  └─────────┘                │
├─────────────────────────────┤
│           Footer            │
└─────────────────────────────┘
```

---

## III. Product Category Pages

Each category page (e.g., Electronics) must include:

### 1. Header

Same as the main page and authentication page.

### 2. Product Section

At least **3 products**, each inside an `<article>` with:

- Product name (bold title)
- Product image
- Price
- Short description
- Quantity selector: `<input type="number" min="1" value="1">`
- "Add to Cart" button

### 3. Navigation (`<nav>`) Section

- Quick-access links to other categories
- Link to view cart

### 4. Two Persistent `<aside>` Sections *(visible while scrolling)*

| Aside | Content |
|-------|---------|
| **First** | Shopping guidelines / return policy (auto-scrolling text) |
| **Second** | Cart summary — number of items & total price, updated dynamically as items are added |

### 5. Footer Section

Displays the **final total price** when:

- The "Checkout" button is clicked, **or**
- The cart is submitted

The final order is then saved in the database.

### 6. Category Page Layout

```
┌────────────────────────────────────────┐
│                 Header                 │
├────────────────────────────────────────┤
│                  nav                   │
├──────────────────────────┬─────────────┤
│        Section 1         │             │
│  ┌───────┐ ┌───────┐     │   aside 1   │
│  │Article│ │Article│     │             │
│  └───────┘ └───────┘     ├─────────────┤
│        Section 2         │             │
│  ┌───────┐ ┌───────┐     │   aside 2   │
│  │Article│ │Article│     │             │
│  └───────┘ └───────┘     │             │
├──────────────────────────┴─────────────┤
│                 Footer                 │
└────────────────────────────────────────┘
```

---

## IV. Technical Requirements

### HTML & CSS

- Use appropriate semantic HTML tags (headings, paragraphs, lists, etc.)
- Apply different colors for titles and body text
- Use custom fonts via `@font-face` (online font embedding)
- Use an **external CSS file**

### JavaScript

- Use an **external JavaScript file**
- Cart logic must be implemented **client-side** using `localStorage` to persist cart data between page reloads

### Database — 4 Required Tables

| Table | Fields |
|-------|--------|
| `account` | login, password |
| `customer` | customer_id, name, address, phone number, email |
| `product` | product_id, name, price, category, image, description |
| `orders` | customer_id, product_id, quantity, order_date, total_price |

### Code Quality

- Clean, well-structured, and **fully commented** code

---

## V. File Structure

```
E_Commerce_Project/
├── index.html          ← Authentication page
├── main.html           ← Main product catalog page
├── electronics.html    ← Electronics category page
├── clothing.html       ← Clothing category page
├── books.html          ← Books category page
├── style.css           ← External CSS (entire project)
├── script.js           ← External JavaScript (entire project)
├── images/             ← Product images
├── login.php           ← Identify which customer is shopping
├── logout.php          ← End session, protect customer account
├── save_order.php      ← Save order (linked to correct customer in orders table)
└── ...
```