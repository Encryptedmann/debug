
const loadProducts = () => {



  const url = `https://fakestoreapi.com/products`;

  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};



loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <div class="title" style="height:auto;">
      <h5 style="color:#00868B">${product.title}</h5>
      </div>
      <div style="margin-top:10px;color:00868B";>
      Category: ${product.category}
      </div>
      <div style="color:00868B";>
      Rating : ${product.rating.rate}

      

 
      </div>
      <div style="color:00868B";>
      Rating Count : ${product.rating.count}
      </div>

      <h4 style="color:00868B	;">Price: $ ${product.price}</h4>
      <div style="margin-top:30px";>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn" style="background-color:
      #00868B;color:white;">Add to Cart</button>
      <button id="details-btn" class="btn" style="background-color:
      
#CBF3F7";>Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);

  const total = convertedOldPrice + convertPrice;

  document.getElementById(id).innerText = total.toFixed(2);
};


const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);

};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted.toFixed(2) * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted.toFixed(2) * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted.toFixed(2) * 0.4);
  }

  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);

};




