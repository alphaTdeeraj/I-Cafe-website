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

addItems();
displayInfo();
