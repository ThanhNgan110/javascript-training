import { querySelector } from "../helpers/selector";
import { displayProduct } from "../templates/ProductTemplate";

export default class ProductView {
  constructor() {
    this.cardBlock = querySelector(".card-block");
    this.searchForm = querySelector(".search-form");
    this.inputSearch = querySelector(".input-search");
  }
  
  renderProductGrid(products) {
    this.cardBlock.innerHTML = displayProduct(products);
  }

  bindSearchProduct(handler) {
    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(this.inputSearch.value);
      console.log(typeof handler);
      handler(this.inputSearch.value);
    });
  }

  // bindSearchProduct() {
  //   this.searchForm.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     console.log(this.inputSearch.value);
  //     // console.log(handler);
  //     // handler(this.inputSearch.value);
  //     return this.inputSearch.value;
  //   });
  // }

}
