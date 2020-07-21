let cartItems = [];
const cart = document.getElementById("cart-container");
const products = document.querySelectorAll(".product-container");
const numItems = document.getElementById("num-items");
//EVENT LISTENERS FOR DRAG AND DROP
cart.addEventListener("dragover", dragOver);
cart.addEventListener("drop", drop);

for (const product of products) {
  product.addEventListener("dragstart", dragStart);
  product.addEventListener("dragend", dragEnd);
}
//FUNCTIONS FOR THE DRAG AND DROP

function dragStart(e) {
  this.classList.add("drag-start");
}

function dragEnd(e) {
  e.preventDefault();

  this.classList.remove("drag-start");
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const item = document.querySelector(".drag-start");
  cartItems.push(item.innerHTML);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  numItems.innerHTML = cartItems.length;
}

function addCartDetails() {
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
  cartItems = cartItems || [];

  numItems.innerHTML = cartItems.length;
}
addCartDetails();
