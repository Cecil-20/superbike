let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const productList = document.getElementById("product-list");
const loader = document.getElementById("loader");

// 🔹 Load products dynamically
async function loadProducts() {
  try {
    const response = await fetch("products.json");
    const products = await response.json();

    // Fade out loader smoothly
    loader.classList.add("fade-out");

    // Wait for animation, then display products
    setTimeout(() => displayProducts(products), 400);
  } catch (error) {
    console.error("Error loading products:", error);
    productList.innerHTML = "<p>⚠️ Failed to load products. Please refresh.</p>";
  }
}

// 🔹 Display products in HTML
function displayProducts(products) {
  productList.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toLocaleString()}</p>
      <button class="add-btn" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// 🔹 Cart Functions
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  saveCart();
  renderCart();
}

function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) removeItem(index);
  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    cart = [];
    saveCart();
    renderCart();
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Proceeding to checkout...");
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span>${item.name} - $${item.price} × ${item.quantity}</span>
      <div class="cart-actions">
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Initialize
loadProducts();
renderCart();
/* 🔹 Loading Spinner */