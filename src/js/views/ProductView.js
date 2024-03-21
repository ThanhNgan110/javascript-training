import { querySelector } from "../helpers/selector";
import { displayProduct } from "../templates/ProductTemplate";

export class ProductView {
  constructor() {
    this.cardBlock = querySelector(".card-block");
    this.searchForm = querySelector(".search-form");
    this.inputSearch = querySelector(".input-search");
  }

  renderProduct(products) {
    return (this.cardBlock.innerHTML = displayProduct(products));
  }

  bindSearchProduct(handler) {
    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(this.inputSearch.value);
      handler(this.inputSearch.value);
    });
  }
}
