import { querySelector } from "../helpers/selector";
import { displayProduct } from "../templates/ProductTemplate";

export default class ProductView {
  constructor() {
    this.cardBlock = querySelector(".card-block");
    this.searchForm = querySelector(".search-form");
    this.inputSearch = querySelector(".input-search");
  }

  renderProduct(products) {
    return (this.cardBlock.innerHTML = displayProduct(products));
  }
}
