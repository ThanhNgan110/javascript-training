export const displayProduct = (products) => {
  let contentProduct = "";
  if (products.length > 0) {
    products.forEach((item) => {
      contentProduct += productTemplate(item);
    });
  }
  return contentProduct;
};

export const productTemplate = (product) => {
  const { product_img, product_name, product_price } = product;
  return `
  <article class="card-product">
  <img class="card-img" src="${product_img}">
  <div class="card-body">
      <div class="card-content">
          <h3 class="product-name">${product_name}</h3>
          <p class="product-price">${product_price}</p>
      </div>
      <button class="btn-card"> 
      <span class="border-circle"><span class="icon icon-bag"></span></span>
      </button>
     
  </div>
  </article>
  `;
};
