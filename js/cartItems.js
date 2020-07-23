let itemsContainer = document.getElementById("items");
let totalItemsContainer = document.getElementById("total-items");
let costContainer = document.getElementById("cost");
const items = JSON.parse(localStorage.getItem("cartItems"));

let totalCost = 0;
function addItems() {
  for (const item of items) {
    const container = document.createElement("div");

    container.innerHTML = item.trim();
    itemsContainer.appendChild(container);
    let cost = container.childNodes[2].innerHTML.split("Rs")[1].trim();
    cost = parseInt(cost);
    totalCost += cost;
  }
}

function displayInfo() {
  totalItemsContainer.innerHTML = items.length;
  costContainer.innerHTML = totalCost;
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
function clearCart() {
  localStorage.setItem("cartItems", JSON.stringify([]));
  navigateUser("index.html");
}

addItems();
displayInfo();
