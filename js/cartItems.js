// import { addProducts, addSales, makeRequest, navigateUser } from "./utils.js";

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

//this function will set the cartItems key to empty array in the localStorage
async function clearCart(e) {
  e.preventDefault();
  checkoutButton.setAttribute("disabled", true);
  checkoutButton.innerText = "Checking Out ...";
  checkoutButton.style.opacity = 0.5;
  try {
    const checkOutURL = `${window.app.baseURL}/checkout`;
    console.log(checkOutURL);
    const currentSale = addSales(cartItems);
    const data = {
      salesData: currentSale,
    };
    await makeRequest("POST", checkOutURL, JSON.stringify(data));
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("numItems", JSON.stringify(0));
    navigateUser("index.html");
  } catch (err) {
    console.log(err);
    console.log("there was some error");
  }
  checkoutButton.setAttribute("disabled", false);
  checkoutButton.innerText = "Check Out";
  checkoutButton.style.opacity = 1;
}

displayInfo();
checkoutButton.addEventListener("click", clearCart);
