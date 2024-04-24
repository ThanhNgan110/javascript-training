export const displayProduct = (products) => {
  let contentProduct = "";
  if (products) {
    products.forEach((item) => {
      contentProduct += productTemplate(item);
    });
  } else {
    contentProduct = "";
  }
  return contentProduct;
}

export const productTemplate = (product) => {
  const { productId, imgURL, name, price } = product;
  return `
  <article class="card-product">
  <img class="card-img" src="${imgURL}">
  <div class="card-body">
      <div class="card-content">
          <h3 class="product-name">${name}</h3>
          <p class="product-price">$${price}</p>
      </div>
      <button data-id=${productId} class="btn-card"> 
        <span class="border-circle"><span class="icon icon-bag"></span></span>
      </button>
  </div>
  </article>
  `;
}


