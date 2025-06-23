// ✅ Cleaned JavaScript with all errors fixed and duplicates removed

document.addEventListener("DOMContentLoaded", function () {
  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".navbar")?.offsetHeight || 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // ===== Search Bar =====
  const searchInput = document.getElementById("productSearch");
  const allProducts = document.querySelectorAll("#productList .col-md-3");
  const productList = document.getElementById("productList");
  const searchForm = document.getElementById("searchForm");

  function filterProducts() {
    const query = searchInput.value.toLowerCase();
    let anyMatch = false;

    allProducts.forEach((product) => {
      const title = product.querySelector("h5")?.textContent.toLowerCase() || "";
      const category = product.querySelector("small")?.textContent.toLowerCase() || "";
      const isMatch = title.includes(query) || category.includes(query);
      product.style.display = isMatch ? "block" : "none";
      if (isMatch) anyMatch = true;
    });

    if (query.trim() === "") {
      allProducts.forEach((p) => (p.style.display = "block"));
      productList.style.backgroundColor = "";
    } else {
      productList.style.backgroundColor = anyMatch ? "#fff" : "#f8d7da";
      if (anyMatch) {
        const firstMatch = Array.from(allProducts).find((product) => {
          const title = product.querySelector("h5")?.textContent.toLowerCase() || "";
          const category = product.querySelector("small")?.textContent.toLowerCase() || "";
          return title.includes(query) || category.includes(query);
        });
        if (firstMatch) {
          firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }

  searchInput.addEventListener("input", filterProducts);
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    filterProducts();
  });

  // ===== Wishlist =====
  let wishlistCount = 0;
  const wishlistButtons = document.querySelectorAll(".wishlist-button");
  const wishlistCountDisplay = document.getElementById("wishlistCount");
  const wishlistItemsContainer = document.getElementById("wishlistItems");
  const wishlistBox = document.getElementById("wishlistItemsContainer");

  document.getElementById("wishlistCountBtn").addEventListener("click", function () {
    wishlistBox.style.display = wishlistBox.style.display === "none" ? "block" : "none";
  });

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = button.closest(".furniture-card");
      const title = card.querySelector("h5").textContent;
      const category = card.querySelector("small").textContent;
      const price = card.querySelector(".furniture-footer span").textContent;
      const image = card.querySelector("img").src;

      if (button.classList.contains("added")) {
        wishlistCount = Math.max(0, wishlistCount - 1);
        wishlistCountDisplay.textContent = wishlistCount;
        button.classList.remove("added");
        button.style.color = "";
        wishlistItemsContainer.querySelectorAll(".wishlist-item").forEach((item) => {
          if (item.dataset.title === title) item.remove();
        });
      } else {
        wishlistCount++;
        wishlistCountDisplay.textContent = wishlistCount;
        button.classList.add("added");
        button.style.color = "red";
        const wishlistHTML = `
          <div class="wishlist-item d-flex mb-2" data-title="${title}">
            <img src="${image}" width="40" height="40" style="object-fit: cover; border-radius: 5px; margin-right: 10px;">
            <div>
              <div><strong>${title}</strong></div>
              <div>${category}</div>
              <div>${price}</div>
            </div>
          </div>`;
        wishlistItemsContainer.insertAdjacentHTML("beforeend", wishlistHTML);
      }
    });
  });

  // ===== Quick View =====
  document.querySelectorAll(".quickview-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".pc-title").innerText = button.getAttribute("data-title");
      document.querySelector(".pc-price").innerText = button.getAttribute("data-price");
      document.querySelector(".pc-description").innerText = button.getAttribute("data-description");
      document.querySelector(".pc-category").innerText = `CATEGORY: ${button.getAttribute("data-category")}`;
      document.querySelector(".pc-image-section img").setAttribute("src", button.getAttribute("data-image"));
      document.getElementById("quickviewCard").style.display = "block";
    });
  });

  document.getElementById("closeQuickView").addEventListener("click", function () {
    document.getElementById("quickviewCard").style.display = "none";
  });

  // ===== Shop Now Scroll =====
  const shopNowBtn = document.getElementById("shopNowBtn");
  const productSection = document.getElementById("products");
  shopNowBtn?.addEventListener("click", function () {
    productSection?.scrollIntoView({ behavior: "smooth" });
  });

  // ===== JSON Loading =====
  fetch("products.json")
    .then((res) => res.json())
    .then((products) => {
      console.log("Loaded Products:", products);
    })
    .catch((err) => console.error("JSON loading error:", err));

  // ===== Login Modal =====
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const closeModal = document.getElementById("closeModal");
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  loginBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    loginModal?.classList.add("show");
  });
  closeModal?.addEventListener("click", function () {
    loginModal?.classList.remove("show");
  });
  window.addEventListener("click", function (e) {
    if (e.target === loginModal) loginModal?.classList.remove("show");
  });
  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;
    if (email.value.trim() === "") {
      emailError.style.display = "block";
      valid = false;
    } else emailError.style.display = "none";
    if (password.value.trim() === "") {
      passwordError.style.display = "block";
      valid = false;
    } else passwordError.style.display = "none";
    if (valid) {
      alert("Form submitted!");
      loginModal?.classList.remove("show");
      form.reset();
    }
  });
  window.togglePassword = function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };

  // ===== Navbar Shadow =====
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    navbar.style.boxShadow = window.scrollY > 50 ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none";
  });

  // ===== Cart System =====
  let cart = {};
  const cartButton = document.getElementById("cartButton");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartCountElement = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const shippingProgress = document.getElementById("shippingProgress");
  const freeShippingNote = document.getElementById("freeShippingNote");
  const FREE_SHIPPING_THRESHOLD = 2000;

  cartButton?.addEventListener("click", () => toggleCart(true));

  function toggleCart(show) {
    cartDrawer?.classList.toggle("open", show);
  }
  window.toggleCart = toggleCart;

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;
    let count = 0;
    for (let id in cart) {
      const item = cart[id];
      subtotal += item.price * item.quantity;
      count += item.quantity;
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <div class="quantity-control">
            <button onclick="changeQty('${id}', -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty('${id}', 1)">+</button>
          </div>
          <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
        <button onclick="removeItem('${id}')">🗑️</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    }
    cartCountElement.textContent = count;
    cartSubtotal.textContent = subtotal.toFixed(2);
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    shippingProgress.style.width = `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`;
    freeShippingNote.textContent =
      remaining > 0 ? `Add $${remaining.toFixed(2)} more to get free shipping!` : "You're eligible for free shipping!";
  }

  window.changeQty = function (id, delta) {
    if (cart[id]) {
      cart[id].quantity += delta;
      if (cart[id].quantity <= 0) delete cart[id];
      updateCartDisplay();
    }
  };

  window.removeItem = function (id) {
    delete cart[id];
    updateCartDisplay();
  };

  document.querySelectorAll(".furniture-card").forEach((card) => {
    const name = card.querySelector("h5")?.textContent;
    const price = parseFloat(card.querySelector(".furniture-footer span")?.textContent.replace("$", ""));
    const image = card.querySelector("img")?.src;
    const button = card.querySelector(".furniture-footer button");

    button?.addEventListener("click", () => {
      const id = name + price;
      if (cart[id]) {
        cart[id].quantity++;
      } else {
        cart[id] = { name, price, image, quantity: 1 };
      }
      updateCartDisplay();
      toggleCart(false);
    });
  });

  // ===== Bootstrap Tooltips =====
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map((el) => new bootstrap.Tooltip(el));
});
