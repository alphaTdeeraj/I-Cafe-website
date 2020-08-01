import { getDifference, makeRequest, getProductByID } from "./utils.js";

const productsContainer = $("#products-container");
const cart = document.getElementById("cart-container");
const numCartItems = $("#num-items");
let cartItems = [];
//this function creates the template for the product
function productTemplate(id, name, cost, imageURL) {
  const productHTML = `<div class="product-container" draggable="true" data-id="${id}">
          <figure>
            <img draggable="false" src="./images/products/${imageURL}" alt="${name} image"/>
            <figcaption>${name}</figcaption>
          </figure>
          <p><bold>Cost</bold> : Rs ${cost}</p>
          <button class="button">Know More</button>
        </div>`;
  return productHTML;
}

//this function will add create the html for the all the products from the response
function addProducts(items) {
  let productContainerHTML = "";
  for (const product of items) {
    const { id, name, cost, imageUrl } = product;
    productContainerHTML += productTemplate(id, name, cost, imageUrl);
  }
  return productContainerHTML;
}

//this function will GET the products from the server
async function loadProducts() {
  const productsURL = `${app.baseURL}/products`;
  try {
    const data = await makeRequest("GET", productsURL);
    const products = data["products"];
    window.app.products = products;
    const productsSection = addProducts(products);
    productsContainer.html(productsSection);
    addDragEvent();
  } catch (err) {
    console.log(err);
  }
}

function dragOver(e) {
  e.preventDefault();
  this.classList.add("drag-over");
}

function drop(e) {
  e.preventDefault();
  const draggedElement = $("#draggedElement");
  const productID = parseInt(draggedElement.attr("data-id"));
  const product = getProductByID(productID, window.app.products);
  cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.push(product);
  numCartItems.text(cartItems.length);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  localStorage.setItem("numItems", cartItems.length);
}

function dragStart(e) {
  this.setAttribute("id", "draggedElement");
}

function dragEnd(e) {
  this.removeAttribute("id");
}

function addDragEvent() {
  const productContainer = document.querySelectorAll(".product-container");
  productContainer.forEach((element) => {
    element.addEventListener("dragstart", dragStart);
    element.addEventListener("dragend", dragEnd);
  });
}

loadProducts();

cart.addEventListener("dragover", dragOver);
cart.addEventListener("drop", drop);

numCartItems.text(0 || JSON.parse(localStorage.getItem("numItems")));
