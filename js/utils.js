const makeRequest = (method, url) =>
  $.ajax({
    method: method,
    url: url,
    contentType: "application/json",
    dataType: "json",
  });

//this function will return the integer of distance between two point
const getDifference = (pt1, pt2) => {
  return parseInt(Math.abs(pt1 - pt2));
};

const getProductByID = (id, productsList) => {
  for (const product of productsList) {
    if (product["id"] == id) {
      return product;
    }
  }
};

const addSales = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const categorySales = {
    cold_coffee: 0,
    hot_coffee: 0,
    coffee_powder: 0,
    coffee_shake: 0,
  };
  for (const cartItem of cartItems) {
    const category = cartItem["category"];
    categorySales[category]++;
  }
  console.log(categorySales);
  return categorySales;
};

//this function will create an html of product the element
const productTemplate = (id, name, cost, imageURL) => {
  const productHTML = `<div class="product-container" draggable="true" data-id="${id}">
          <figure>
            <img draggable="false" src="./images/products/${imageURL}" alt="${name} image"/>
            <figcaption>${name}</figcaption>
          </figure>
          <p><bold>Cost</bold> : Rs ${cost}</p>
          <button class="button">Know More</button>
        </div>`;
  return productHTML;
};


//this function will add create the html for the all the products from the response
const  addProducts = (items)=> {
  let productContainerHTML = "";
  for (const product of items) {
    const { id, name, cost, imageUrl } = product;
    productContainerHTML += productTemplate(id, name, cost, imageUrl);
  }
  return productContainerHTML;
}
export {
  getDifference,
  makeRequest,
  getProductByID,
  addSales,
  productTemplate,
  addProducts,
};
