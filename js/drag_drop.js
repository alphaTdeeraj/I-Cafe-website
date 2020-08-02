// import { makeRequest, getProductByID, addProducts } from "./utils.js";

const productsContainer = $("#products-container");
const cart = $("#cart-container");
const numCartItems = $("#num-items");
const { top: cartYPosition, left: cartXPosition } = cart.position();
let cartItems = [];

let initialX = 0,
  initialY = 0,
  leftOffset,
  topOffset,
  initialWidth = 0,
  initialHeight = 0,
  initialFontSize = 20,
  parentDiv;

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

function onMouseDown(e) {
  parentDiv = getParentDiv($(e.target));
  initialX = e.clientX;
  initialY = e.clientY;
  initialWidth = parentDiv.width();
  initialHeight = parentDiv.height();
  parentDiv.attr({ id: "draggedElement" }).css({ "z-index": 10 });
  parentDiv.mousemove(onMouseMove);
  parentDiv.mouseup(onMouseUp);
}

function onMouseMove(e) {
  e.preventDefault();

  leftOffset = e.clientX - initialX;
  topOffset = e.clientY - initialY;

  $("#draggedElement").css({ top: `${topOffset}px`, left: `${leftOffset}px` });
  changeStyle(getDiff(e));
}

function onMouseUp(e) {
  e.preventDefault();
  if (isOverCart(e)) {
    addItemToCart();
  }
  parentDiv.off();
  parentDiv.css({
    top: "0px",
    left: "0px",
    "z-index": 1,
    fontSize: `${initialFontSize}px`,
    width: `${initialWidth}px`,
    height: `${initialHeight}px`,
  });
  parentDiv.removeAttr("id");
  parentDiv = null;
  leftOffset = 0;
  topOffset = 0;
}
function getParentDiv(currentElement) {
  if (currentElement.hasClass("product-container")) {
    return currentElement;
  }
  return getParentDiv(currentElement.parent());
}

function addDragEvent() {
  const productContainer = document.querySelectorAll(".product-container");
  productContainer.forEach((element) => {
    element.onmousedown = onMouseDown;
  });
}

function addItemToCart() {
  const productID = parseInt(parentDiv.attr("data-id"));
  const product = getProductByID(productID, window.app.products);
  cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.push(product);
  numCartItems.text(cartItems.length);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  localStorage.setItem("numItems", cartItems.length);
}

function isOverCart(e) {
  const diff = getDiff(e);

  if (diff < -60) {
    return true;
  }
  return false;
}

function changeStyle(diff) {
  if (diff > 0) {
    let fontSize = parseInt(Math.max(10, diff / 10));
    fontSize = parseInt(Math.min(25, fontSize));
    const width = parseInt(Math.max(40, diff / 4.2));
    const height = parseInt(Math.max(60, diff / 4));
    parentDiv.css({
      "font-size": `${fontSize}px`,
    });
  }
}

function getDiff(e) {
  return cartXPosition - e.clientX;
}

loadProducts();

numCartItems.text(0 || JSON.parse(localStorage.getItem("numItems")));
