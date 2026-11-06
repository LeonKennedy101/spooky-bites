const restaurantName = "Spooky Bites";
let isOpen = true;              // let, because the status can now be toggled
let customerName = "";
let mealPrice = 0;
let quantity = 1;
let total = 0;
const DISCOUNT_RATE = 0.10;     // Enhancement 2: 10% discount
const DISCOUNT_MINIMUM = 300;   // ...for orders of P300 or more
const prices = {
  "Spider Pizza": 150,
  "Pumpkin Pasta": 180,
  "Ghost Burger": 120
};

const statusEl = document.getElementById("status");
const result = document.getElementById("result");
const statusBtn = document.getElementById("statusBtn");

function displayStatus() {
  statusEl.textContent = isOpen ? "We are OPEN!" : "We are CLOSED!";
  statusEl.className = isOpen ? "open" : "closed";
}

function toggleStatus() {
  isOpen = !isOpen;
  displayStatus();
}

function getGreeting(name) {
  return "Happy Halloween, " + name + "! 🎃👻";
}

function getRecommendation(orderTotal) {
  if (orderTotal < 150) {
    return "Try our Spider Pizza next time for a hearty Halloween treat!";
  } else if (orderTotal < 300) {
    return "Why not add our Pumpkin Pasta to share with a friend?";
  } else {
    return "Big spender! Our Ghost Burger combo is a perfect pair for your feast.";
  }
}

function placeOrder() {
  customerName = document.getElementById("customer").value.trim();
  const selectedMeal = document.getElementById("meal").value;
  quantity = Number(document.getElementById("quantity").value);

  if (!isOpen) {
    result.textContent = "Sorry! The restaurant is closed.";
    return;
  }
  if (!customerName) {
    result.textContent = "Please enter your name first!";
    return;
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    result.textContent = "Please enter a valid quantity.";
    return;
  }

  mealPrice = prices[selectedMeal];
  const subtotal = mealPrice * quantity;

  // Enhancement 2: discount calculator
  let discount = 0;
  if (subtotal >= DISCOUNT_MINIMUM) {
    discount = subtotal * DISCOUNT_RATE;
  }
  total = subtotal - discount;

  // Enhancement 4: ask the customer to confirm or cancel
  const message =
    "Order: " + quantity + " x " + selectedMeal + "\n" +
    "Subtotal: ₱" + subtotal.toFixed(2) + "\n" +
    "Discount: ₱" + discount.toFixed(2) + "\n" +
    "Total: ₱" + total.toFixed(2) + "\n\nConfirm your order?";
  const confirmed = confirm(message);

  if (!confirmed) {
    result.textContent = "Order cancelled. Come back when you are ready, " + customerName + "!";
    return;
  }

  result.innerHTML =
    getGreeting(customerName) + "<br>" +
    "Your order: " + quantity + " " + selectedMeal + "(s).<br>" +
    "Subtotal: ₱" + subtotal.toFixed(2) +
    (discount > 0 ? " | 10% discount: -₱" + discount.toFixed(2) : " | No discount") +
    "<br><b>Total: ₱" + total.toFixed(2) + "</b><br>" +
    getRecommendation(total) + "<br>Enjoy your spooky meal!";
}

function showMenuMessage() {
  alert("Welcome to " + restaurantName + "! Choose your spooky meal.");
}

displayStatus();
document.getElementById("orderBtn").addEventListener("click", placeOrder);
statusBtn.addEventListener("click", toggleStatus);
document.querySelector('a[href="#menu"]').addEventListener("click", showMenuMessage);
