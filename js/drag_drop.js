import { getDifference } from "./utils.js";

let cartItems = [];

const productsContainer = document.getElementById("products-container");
const cart = document.getElementById("cart-container");
const numItems = document.getElementById("num-items");
//position of cart container
const cartXPosition = cart.getBoundingClientRect()["x"];

//FUNCTIONS FOR THE DRAG AND DROP
function dragStart(e) {
  e.target.classList.add("drag-start");
}

function onDrag(e) {
  const elementXPosition = e.target.getBoundingClientRect()["x"];
  const xDifference = getDifference(elementXPosition, cartXPosition);
  e.target.style.width = parseInt(xDifference * 0.1);
}

function dragEnd(e) {
  e.preventDefault();
  e.target.classList.remove("drag-start");
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

function productTemplate(name, cost, imageName) {
  const productHTML = ` <div class="product-container" draggable="true">
          <figure>
            <img draggable="false" src="./images/products/${imageName}" />
            <figcaption>${name}</figcaption>
          </figure>
          <p><bold>Cost</bold> : Rs ${cost}</p>
          <button class="button">Know More</button>
        </div>`;
  return productHTML;
}

function addProducts(items) {
  let productContainerHTML = "";
  for (const product of items) {
    const { name, cost, imageName } = product;
    productContainerHTML += productTemplate(name, cost, imageName);
  }
  return productContainerHTML;
}

const items = [
  {
    name: "Cold Coffee",
    cost: 200,
    imageName: "p_1.jpeg",
  },
  {
    name: "Cold Coffee",
    cost: 200,
    imageName: "p_1.jpeg",
  },
  {
    name: "Cold Coffee",
    cost: 200,
    imageName: "p_1.jpeg",
  },
  {
    name: "Cold Coffee",
    cost: 200,
    imageName: "p_1.jpeg",
  },
  {
    name: "Cold Coffee",
    cost: 200,
    imageName: "p_1.jpeg",
  },
  {
    name: "Cold Coffee",
    cost: 200,
    imageName: "p_1.jpeg",
  },
  {
    name: "Cold Coffee",
    cost: 200,
    imageName: "p_1.jpeg",
  },
  {
    name: "Cold Coffee",
    cost: 200,
    imageName: "p_1.jpeg",
  },
];
productsContainer.innerHTML = addProducts(items);

//add the event listener for products
const products = document.querySelectorAll(".product-container");
//EVENT LISTENERS FOR DRAG AND DROP
cart.addEventListener("dragover", dragOver);
cart.addEventListener("drop", drop);

for (const product of products) {
  product.addEventListener("dragstart", dragStart);
  product.addEventListener("drag", onDrag);
  product.addEventListener("dragend", dragEnd);
}
addCartDetails();
