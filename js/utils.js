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

export { getDifference, makeRequest, getProductByID };
