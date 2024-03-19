import { getElement } from "../helper/selector";

export class ProductView {
  constructor() {
    this.cardBlock = getElement("card-block");
  }

  renderProduct(products) {
    let contentProduct = '';
   contentProduct = products.forEach((item) => {
      `
      <article class="card-product">
      <img class="card-img" src="${products.product_img}">
      <div class="card-body">
        <div class="card-content">
          <h3 class="product-name">${products.product_name}</h3>
          <p class="product-price">${products.product_price}</p>
        </div>
        <span class="border-circle">
          <span class="icon icon-bag"></span>
        </span>
      </div>
    </article>`;
    });
    return this.cardBlock.innerHTML += contentProduct;
  }
}
