import { qs } from "../helpers/selector";
import { displayProduct } from "../templates/ProductTemplate";

export class ProductView {
  constructor() {
    this.cardBlock = qs(".card-block");
  }

  renderProduct(products) {
    console.log('test',products);
    return (this.cardBlock.innerHTML = displayProduct(products));
  }
}
