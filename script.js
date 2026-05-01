/**
 * Global Constants & Configurations
 */
const star = `<span class="mrq-star"><svg width="20" height="20" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 0L22.8454 6.33832C24.8711 11.8127 29.1873 16.1289 34.6617 18.1546L41 20.5L34.6617 22.8454C29.1873 24.8711 24.8711 29.1873 22.8454 34.6617L20.5 41L18.1546 34.6617C16.1289 29.1873 11.8127 24.8711 6.33831 22.8454L0 20.5L6.33832 18.1546C11.8127 16.1289 16.1289 11.8127 18.1546 6.33831L20.5 0Z" fill="white"/></svg></span>`;
const chunk = `<span class="mrq-item">REFLECT FASHION ${star}</span>`.repeat(8);

/**
 * Authentication Accounts
 */
const ACCOUNTS = [
    { username: "admin@gmail.com", password: "1234" },
    { username: "rayan@gmail.com", password: "pass1" },
    { username: "student@gmail.com", password: "wad2026" }
];

/**
 * Chatbot FAQ Data
 */
const faqAnswers = {
    "order": "Pour suivre votre commande, veuillez vous connecter et accéder à la section 'Mes Commandes', ou consulter le lien envoyé par email 📦.",
    "shipping": "Nos délais de livraison standard sont de 2 à 5 jours ouvrés à travers le pays. La livraison express est disponible en 24h 🚚.",
    "returns": "Vous avez 30 jours pour retourner vos articles gratuitement. Ils doivent être dans leur état d'origine avec les étiquettes 🔄.",
    "contact": "Notre service client est disponible du Lundi au Vendredi de 9h à 18h. Vous pouvez nous envoyer un email à support@nivaro.dz ✉️."
};

/**
 * Utility Functions
 */

/**
 * Displays a toast notification on the screen
 * @param {string} message - The text to display
 * @param {string} type - The type of toast (info, success, error)
 */
function showToast(message, type = 'info') {
    const existing = document.getElementById('app-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = `app-toast app-toast--${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('app-toast--visible'));

    setTimeout(() => {
        toast.classList.remove('app-toast--visible');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

/**
 * Retrieves the cart from localStorage
 * @returns {Array} - Array of cart items
 */
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/**
 * Saves the cart array to localStorage
 * @param {Array} cartArray - The cart data to persist
 */
function saveCart(cartArray) {
    localStorage.setItem("cart", JSON.stringify(cartArray));
}

/**
 * Updates all cart-related UI elements across the page
 */
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

/**
 * Adds an item to the cart or increments its quantity if it exists
 * @param {string} id - Product ID
 * @param {string} name - Product Name
 * @param {number} price - Product Price
 * @param {number} qty - Quantity to add
 */
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

/**
 * Chatbot Functions
 */

/**
 * Opens the chatbot window
 */
function openChat() {
    const chatbotWindow = document.getElementById("chatbot-window");
    if (chatbotWindow) chatbotWindow.classList.add("active");
}

/**
 * Closes the chatbot window
 */
function closeChat() {
    const chatbotWindow = document.getElementById("chatbot-window");
    if (chatbotWindow) chatbotWindow.classList.remove("active");
}

/**
 * Adds a message bubble to the chatbot
 * @param {string} text - Message content (HTML allowed)
 * @param {string} sender - 'user' or 'bot'
 */
function addMessage(text, sender) {
    const chatbotMessages = document.getElementById("chatbot-messages");
    if (!chatbotMessages) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

/**
 * Sidebar Functions
 */

/**
 * Opens the mobile sidebar navigation
 */
function openSidebar() {
    const appHeader = document.querySelector('.app-header');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (appHeader && sidebarOverlay) {
        appHeader.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Closes the mobile sidebar navigation
 */
function closeSidebar() {
    const appHeader = document.querySelector('.app-header');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (appHeader && sidebarOverlay) {
        appHeader.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Main Initialization
 */
document.addEventListener("DOMContentLoaded", function () {
    // 1. Marquee Initialization
    const t = document.getElementById('mrq');
    if (t) {
        t.innerHTML = chunk + chunk;
    }

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
                    errorMsg.textContent = "Incorrect Email or Password.";
                }
            }
        });
    }

    // 3. Initial UI Updates
    updateCartSidebar();

    // 4. Quantity Selector Logic
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("qty-btn")) {
            const container = e.target.closest(".qty-selector");
            const input = container.querySelector(".qty-input");
            let val = parseInt(input.value) || 1;

            if (e.target.classList.contains("plus")) {
                val++;
            } else if (e.target.classList.contains("minus")) {
                if (val > 1) val--;
            }
            input.value = val;
        }
    });

    // 5. Add to Cart Button Logic
    document.querySelectorAll(".add-to-cart-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const card = btn.closest(".product-card");
            if (!card) return;

            const id = card.getAttribute("data-id");
            const name = card.getAttribute("data-name");
            const price = parseFloat(card.getAttribute("data-price"));
            const qtyInput = card.querySelector(".qty-input");
            const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

            addItem(id, name, price, qty);

            btn.textContent = '✓ Added!';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = 'Add to card';
                btn.disabled = false;
            }, 1000);
        });
    });

    // 6. Checkout Logic
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            const cart = getCart();

            if (cart.length === 0) {
                showToast('🛒 Your cart is empty!', 'error');
                return;
            }

            const grandTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push({
                date: new Date().toLocaleString(),
                items: cart,
                total: grandTotal
            });
            localStorage.setItem("orders", JSON.stringify(orders));

            showToast('✅ Order placed! Total: ' + grandTotal.toLocaleString() + ' DA', 'success');
            saveCart([]);
            updateCartSidebar();

            if (document.getElementById("cart-table-body")) {
                setTimeout(() => location.reload(), 1500);
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

    // 9. Chatbot Logic & HTML Injection
    const chatbotHTML = `
      <div id="chatbot-container">
        <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open Chatbot">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3C14.7538 3.00397 16.914 3.89999 18.5076 5.49238C20.1013 7.08477 20.9973 9.24505 21 11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div id="chatbot-window" class="chatbot-window">
          <div class="chatbot-header">
            <h3>Support Nivaro</h3>
            <button id="chatbot-close" class="chatbot-close" aria-label="Close Chat">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div id="chatbot-messages" class="chatbot-messages">
            <div class="chat-message bot">
              Bonjour ! 👋 Je suis l'assistant ShopHub de Nivaro. Comment puis-je vous aider aujourd'hui ?
              <div class="chatbot-options">
                <button class="chatbot-option-btn" data-faq="order">Suivre ma commande</button>
                <button class="chatbot-option-btn" data-faq="shipping">Délais de livraison</button>
                <button class="chatbot-option-btn" data-faq="returns">Politique de retour</button>
                <button class="chatbot-option-btn" data-faq="contact">Contacter un humain</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotMessages = document.getElementById("chatbot-messages");

    if (chatbotToggle) chatbotToggle.addEventListener("click", openChat);
    if (chatbotClose) chatbotClose.addEventListener("click", closeChat);

    if (chatbotMessages) {
        chatbotMessages.addEventListener("click", function (e) {
            if (e.target.classList.contains("chatbot-option-btn")) {
                const topic = e.target.getAttribute("data-faq");
                const questionText = e.target.textContent;
                e.target.parentElement.style.display = 'none';
                addMessage(questionText, 'user');

                setTimeout(() => {
                    const answer = faqAnswers[topic];
                    const followUpHTML = `
                        ${answer}
                        <div class="chatbot-options" style="margin-top: 10px;">
                            <button class="chatbot-option-btn" data-faq="order">Suivre ma commande</button>
                            <button class="chatbot-option-btn" data-faq="shipping">Délais de livraison</button>
                            <button class="chatbot-option-btn" data-faq="returns">Politique de retour</button>
                            <button class="chatbot-option-btn" data-faq="contact">Contacter un humain</button>
                        </div>
                    `;
                    addMessage(followUpHTML, 'bot');
                }, 600);
            }
        });
    }

    // 10. Sidebar & Navigation Logic
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            const appHeader = document.querySelector('.app-header');
            if (appHeader) {
                appHeader.classList.contains('open') ? closeSidebar() : openSidebar();
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link, .cart-icon-wrapper, .btn-logout-sidebar')
        .forEach(link => link.addEventListener('click', closeSidebar));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidebar();
    });

    // 11. Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'main.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPath);
    });

    // 12. Scroll Triggered Animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    });

    document.querySelectorAll('[class*="animate-"]').forEach(el => {
        revealObserver.observe(el);
    });
});
