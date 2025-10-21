// -------------------------------
// 🦴 THE FOSSIL HUNT - scripts.js
// -------------------------------

// Carrito
let cart = [];
const cartList = document.getElementById("cart-items");
const totalDisplay = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count"); // número en el icono del carrito

// Función para agregar un producto
function addToCart(name, price) {
  const item = { name, price };
  cart.push(item);
  updateCart();
}

// Función para actualizar la lista y el total
function updateCart() {
  if (cartList) {
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price}`;
      cartList.appendChild(li);
      total += item.price;
    });
    totalDisplay.textContent = total.toFixed(2);
  }

  // Actualiza el número del carrito en el ícono
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// -------------------------------
// 💳 INTEGRACIÓN PAYPAL
// -------------------------------
if (document.getElementById("paypal-button-container")) {
  paypal.Buttons({
    createOrder: function (data, actions) {
      const total = parseFloat(document.getElementById("cart-total").innerText);
      return actions.order.create({
        purchase_units: [
          {
            amount: { value: total.toFixed(2) },
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert("Payment completed by " + details.payer.name.given_name + "!");
        cart = [];
        updateCart();
      });
    },
  }).render("#paypal-button-container");
}
