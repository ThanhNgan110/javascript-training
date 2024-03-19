import { getElement } from "../helper/selector";

export class ProductView {
  constructor() {
    this.cardBlock = getElement("card-block");
  }

  renderProduct(products) {
    // console.log(products);
    // console.log(this.cardBlock);
    let contentProduct = "";
    products.forEach((item) => {
      // console.log("abc", item.product_name);
      contentProduct += `
            <article class="card-product">
            <img class="card-img" src="${item.product_img}">
            <div class="card-body">
                <div class="card-content">
                    <h3 class="product-name">${item.product_name}</h3>
                    <p class="product-price">${item.product_price}</p>
                </div>
                <span class="border-circle">
                    <span class="icon icon-bag"></span>
                </span>
            </div>
            </article>`;
    });
    return (this.cardBlock.innerHTML = contentProduct);
  }
}
