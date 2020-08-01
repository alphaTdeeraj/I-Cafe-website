import { addProducts } from "./utils.js";

let itemsContainer = document.getElementById("items");
let totalItemsContainer = document.getElementById("total-items");
let costContainer = document.getElementById("cost");
let checkoutButton = document.getElementById("checkout-button");
const cartItems = JSON.parse(localStorage.getItem("cart"));

function displayCartItems() {
  const cartItemsHTML = addProducts(cartItems);
  itemsContainer.innerHTML = cartItemsHTML;
}

//this function will calculate the total cost of cart items
function calculateTotalCost() {
  let totalCost = 0;
  for (const cartItem of cartItems) {
    totalCost += cartItem["cost"];
  }
  return totalCost;
}

//this function will display the info to html document
function displayInfo() {
  totalItemsContainer.innerText = cartItems.length;
  costContainer.innerHTML = calculateTotalCost();
  displayCartItems();
}

//this function will take the suffix url and navigates the user
function navigateUser(suffixURL) {
  const origin = window.location.origin;
  const newURL = `${origin}/${suffixURL}`;
  try {
    window.location.replace(newURL);
  } catch (e) {
    console.error(`Invalid url , ${newURL}`);
  }
}

//this function will set the cartItems key to empty array in the localStorage
function clearCart(e) {
  e.preventDefault();
  console.log("button was clicked");
  localStorage.setItem("cart", JSON.stringify([]));
  localStorage.setItem("numItems", JSON.stringify(0));
  navigateUser("index.html");
}

displayInfo();
checkoutButton.addEventListener("click", clearCart);
