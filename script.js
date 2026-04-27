document.addEventListener("DOMContentLoaded", function () {
    // 1. Hardcoded accounts for authentication
    const ACCOUNTS = [
        { username: "admin", password: "1234" },
        { username: "rayan", password: "pass1" },
        { username: "student", password: "wad2026" }
    ];

    // 2. Login Handling
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
                if (errorMsg) {
                    errorMsg.style.display = "block";
                    errorMsg.textContent = "Incorrect username or password.";
                }
            }
        });
    }

    // 3. LocalStorage Helpers
    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cartArray) {
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }

    // 4. Cart Sidebar Updater
    function updateCartSidebar() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

        const cartCount = document.getElementById("cart-count");
        const cartTotal = document.getElementById("cart-total");
        const navCartCount = document.getElementById("nav-cart-count");

        if (cartCount) cartCount.textContent = totalItems;
        if (cartTotal) cartTotal.textContent = totalPrice.toLocaleString() + " DA";
        if (navCartCount) navCartCount.textContent = totalItems;
    }

    // Call on every page load
    updateCartSidebar();

    // 5. Add to Cart Logic
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
            const card = btn.closest(".product-card");
            if (!card) return;

            const id = btn.getAttribute("data-id");
            const name = btn.getAttribute("data-name");
            const price = parseFloat(btn.getAttribute("data-price"));
            const qtyInput = card.querySelector(".qty-input");
            const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

            addItem(id, name, price, qty);
        });
    });

    // 6. Checkout Logic
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
            } else {
                alert("Order placed! Total: " + grandTotal.toLocaleString() + " DA");
            }

            // Save order to history
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push({
                date: new Date().toLocaleString(),
                items: cart,
                total: grandTotal
            });
            localStorage.setItem("orders", JSON.stringify(orders));

            // Clear cart
            saveCart([]);
            updateCartSidebar();
            
            // If we are on the cart page, reload to reflect empty cart
            if (document.getElementById("cart-table-body")) {
                 location.reload();
            }
        });
    }

    // 7. Cart Page Rendering
    const cartTableBody = document.getElementById("cart-table-body");
    if (cartTableBody) {
        const cart = getCart();
        const emptyRow = document.getElementById("cart-empty-row");

        if (cart.length > 0) {
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
        }

        // Remove item logic
        cartTableBody.addEventListener("click", function (e) {
            if (e.target.classList.contains("remove-btn")) {
                const id = e.target.getAttribute("data-id");
                saveCart(getCart().filter((item) => item.id !== id));
                location.reload();
            }
        });
    }

    // 8. Logout logic
    const logoutLinks = document.querySelectorAll("#logout-link, .logout-link");
    logoutLinks.forEach(function (logoutLink) {
        logoutLink.addEventListener("click", function (e) {
            e.preventDefault();
            sessionStorage.removeItem("loggedUser");
            window.location.href = "index.html";
        });
    });
});
