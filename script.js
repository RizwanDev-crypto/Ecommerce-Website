document.addEventListener("DOMContentLoaded", function () {

  // Smooth scrolling for anchor links

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight =
          document.querySelector(".navbar")?.offsetHeight || 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });





  // Search bar

  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("productSearch");
    const allProducts = document.querySelectorAll("#productList .col-md-3");
    const productList = document.getElementById("productList");
    const searchForm = document.getElementById("searchForm");

    function filterProducts() {
      const query = searchInput.value.toLowerCase();
      let anyMatch = false;

      allProducts.forEach((product) => {
        const title =
          product.querySelector("h5")?.textContent.toLowerCase() || "";
        const category =
          product.querySelector("small")?.textContent.toLowerCase() || "";

        const isMatch = title.includes(query) || category.includes(query);
        product.style.display = isMatch ? "block" : "none";
        if (isMatch) anyMatch = true;
      });

      if (query.trim() === "") {
        allProducts.forEach((p) => (p.style.display = "block"));
        productList.style.backgroundColor = "";
      } else {
        productList.style.backgroundColor = anyMatch ? "#fff" : "#f8d7da";
      }
    }

    searchInput.addEventListener("input", filterProducts);

    // 👇 Handle Enter key press
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent page reload
      filterProducts();
    });
  });

  // ----------------------------------------------------------------------------------------------------------------------------------------

  // Select all wishlist buttons
  let wishlistCount = 0;
  const wishlistButtons = document.querySelectorAll(".wishlist-button");
  const wishlistCountDisplay = document.getElementById("wishlistCount");
  const wishlistItemsContainer = document.getElementById("wishlistItems");
  const wishlistBox = document.getElementById("wishlistItemsContainer");

  document
    .getElementById("wishlistCountBtn")
    .addEventListener("click", function () {
      wishlistBox.style.display =
        wishlistBox.style.display === "none" ? "block" : "none";
    });

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = button.closest(".furniture-card");
      const title = card.querySelector("h5").textContent;
      const category = card.querySelector("small").textContent;
      const price = card.querySelector(".furniture-footer span").textContent;
      const image = card.querySelector("img").src;

      if (button.classList.contains("added")) {
        // Remove
        wishlistCount = Math.max(0, wishlistCount - 1);
        wishlistCountDisplay.textContent = wishlistCount;
        button.classList.remove("added");
        button.style.color = "";

        const items = wishlistItemsContainer.querySelectorAll(".wishlist-item");
        items.forEach((item) => {
          if (item.dataset.title === title) {
            item.remove();
          }
        });
      } else {
        // Add
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

  // ------------------------------------------------------------------------------------------------------------------------------------

  // Quick view button

  // Function to open and populate Quick View
  document.querySelectorAll(".quickview-btn").forEach((button) => {
    button.addEventListener("click", () => {
      // Get data attributes from the clicked button
      const title = button.getAttribute("data-title");
      const price = button.getAttribute("data-price");
      const description = button.getAttribute("data-description");
      const category = button.getAttribute("data-category");
      const image = button.getAttribute("data-image");

      // Update the content inside the quickviewCard
      document.querySelector(".pc-title").innerText = title;
      document.querySelector(".pc-price").innerText = price;
      document.querySelector(".pc-description").innerText = description;
      document.querySelector(
        ".pc-category"
      ).innerText = `CATEGORY: ${category}`;
      document
        .querySelector(".pc-image-section img")
        .setAttribute("src", image);

      // Show the quick view card
      document.getElementById("quickviewCard").style.display = "block";
    });
  });

  // Close Quick View
  document
    .getElementById("closeQuickView")
    .addEventListener("click", function () {
      document.getElementById("quickviewCard").style.display = "none";
    });

  // Optional: reusable hide function
  function hidequickviewCard() {
    document.getElementById("quickviewCard").style.display = "none";
  }

  // --------------------------------------------------------------------------------------------------------------

  // "Shop Now" button scroll
  const shopNowBtn = document.getElementById("shopNowBtn");
  const productSection = document.getElementById("products");

  shopNowBtn?.addEventListener("click", function () {
    productSection?.scrollIntoView({ behavior: "smooth" });
  });

  // ✅ JSON se products load karo
  fetch("products.json")
    .then((res) => res.json())
    .then((products) => {
      console.log("Loaded Products:", products);
      products.forEach((product) => {
        console.log(product.title, "-", product.category, "-", product.price);
      });
    })
    .catch((err) => console.error("JSON loading error:", err));

  // Login modal logic
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
    if (e.target === loginModal) {
      loginModal?.classList.remove("show");
    }
  });

  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    if (email.value.trim() === "") {
      emailError.style.display = "block";
      valid = false;
    } else {
      emailError.style.display = "none";
    }

    if (password.value.trim() === "") {
      passwordError.style.display = "block";
      valid = false;
    } else {
      passwordError.style.display = "none";
    }

    if (valid) {
      alert("Form submitted!");
      loginModal?.classList.remove("show");
      form.reset();
    }
  });

  // Toggle password visibility (make sure you attach this to a button in HTML)
  window.togglePassword = function () {
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };

  // Navbar shadow on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

  // CART SYSTEM
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
  window.toggleCart = toggleCart; // <-- This makes it work with onclick

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
    shippingProgress.style.width = `${Math.min(
      100,
      (subtotal / FREE_SHIPPING_THRESHOLD) * 100
    )}%`;
    freeShippingNote.textContent =
      remaining > 0
        ? `Add $${remaining.toFixed(2)} more to get free shipping!`
        : "You're eligible for free shipping!";
  }

  // Attach functions to global scope for inline HTML use
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

  // Add to cart logic
  document.querySelectorAll(".furniture-card").forEach((card) => {
    const name = card.querySelector("h5")?.textContent;
    const price = parseFloat(
      card.querySelector(".furniture-footer span")?.textContent.replace("$", "")
    );
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

  function toggleCart(open) {
    const drawer = document.getElementById("cartDrawer");
    if (open) {
      drawer.classList.add("open");
    } else {
      drawer.classList.remove("open");
    }
  }

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map((el) => new bootstrap.Tooltip(el));
});

// ,,,,,,,,,,,,,,,,,,................................

let cart = {}; // productId => quantity
const cartDrawer = document.getElementById("cartDrawer");
const cartCountElement = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartSubtotalElement = document.getElementById("cartSubtotal");
const shippingProgress = document.getElementById("shippingProgress");
const freeShippingNote = document.getElementById("freeShippingNote");
const FREE_SHIPPING_THRESHOLD = 2000;

// Open cart drawer
document.getElementById("cartButton").addEventListener("click", () => {
  toggleCart(false);
});

// Toggle cart drawer
function toggleCart(show) {
  cartDrawer.style.right = show ? "0" : "-400px";
}

// Add click event to all "Add to cart" buttons
document.querySelectorAll(".furniture-footer button").forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".furniture-card");
    const title = card.querySelector("h5").textContent;
    const price = parseFloat(
      card.querySelector(".furniture-footer span").textContent.replace("$", "")
    );
    const productId = title.toLowerCase().replace(/\s+/g, "-");

    // If already in cart, go to cart page
    if (this.textContent === "View cart") {
      window.location.href = "cart.html"; // Change this to your cart page
      return;
    }

    // Add to cart
    if (!cart[productId]) {
      cart[productId] = { title, price, quantity: 1 };
    } else {
      cart[productId].quantity++;
    }

    //card button real view

    // Add to cart functionality

    const cartButtons = document.querySelectorAll(".add-to-cart-btn");

    cartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const title = button.getAttribute("data-title");
        const category = button.getAttribute("data-category");
        const price = button.getAttribute("data-price");
        const image = button.getAttribute("data-image");

        const product = {
          title,
          category,
          price,
          image,
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Removed alert here
        // alert(`${title} added to cart!`);
      });
    });

    
    //search filter

    document.addEventListener("DOMContentLoaded", function () {
      const searchInput = document.getElementById("productSearch");
      const productContainers = document.querySelectorAll(".product-container");

      searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();

        productContainers.forEach((container) => {
          const title =
            container.querySelector("h5")?.textContent.toLowerCase() || "";
          const category =
            container.querySelector("small")?.textContent.toLowerCase() || "";

          const matches = title.includes(query) || category.includes(query);
          container.style.display = matches ? "block" : "none";
        });
      });
    });

    // --------------------------------------------------------------------------------------------------

    // Update UI
    this.textContent = "View cart";
    this.classList.add("btn-dark");
    this.classList.remove("btn-outline-dark");

    updateCartDisplay();
    toggleCart(false); // hide the drawer
  });
});

function updateCartDisplay() {
  // Count items
  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  cartCountElement.textContent = totalItems;

  // Show items in drawer
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;
  for (const id in cart) {
    const item = cart[id];
    subtotal += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className =
      "d-flex justify-content-between align-items-center mb-2";
    itemDiv.innerHTML = `
        <div>
          <strong>${item.title}</strong><br>
          $${item.price.toFixed(2)} x ${item.quantity}
        </div>
        <div>
          <button onclick="changeQty('${id}', -1)">−</button>
          <button onclick="changeQty('${id}', 1)">+</button>
          <button onclick="removeItem('${id}')">×</button>
        </div>
      `;
    cartItemsContainer.appendChild(itemDiv);
  }

  // Update subtotal
  cartSubtotalElement.textContent = subtotal.toFixed(2);

  // Update shipping progress
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  shippingProgress.style.width = `${progress}%`;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  freeShippingNote.textContent =
    remaining > 0
      ? `Add $${remaining.toFixed(2)} more to get free shipping!`
      : `You're eligible for free shipping!`;
}

// Increase/Decrease quantity
function changeQty(productId, change) {
  if (!cart[productId]) return;
  cart[productId].quantity += change;
  if (cart[productId].quantity <= 0) delete cart[productId];
  updateCartDisplay();
}

// Remove item
function removeItem(productId) {
  delete cart[productId];
  updateCartDisplay();
}
