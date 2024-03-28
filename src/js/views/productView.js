import { querySelector } from "../helpers/selector";
import {
  displayProduct,
  displayPagination,
} from "../templates/ProductTemplate";

export default class ProductView {
  constructor() {
    this.cardBlock = querySelector(".card-block");
    this.searchForm = querySelector(".search-form");
    this.inputSearch = querySelector(".input-search");
    this.messageContent = querySelector(".message-empty");
  }

  renderProductGrid(products) {
    this.cardBlock.innerHTML = displayProduct(products);
  }

  bindSearchProducts = (handler) => {
    this.searchForm.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this.inputSearch.value);
    });
  };

  displayMessage = (message) => {
    return (this.messageContent.innerHTML = message);
  };

  bindAddProducts = (handler) => {
    const btnCards = document.querySelectorAll(".btn-card");
    console.log('btn-card',btnCards);
    btnCards.forEach((btnCard) => {
      const productId = btnCard.dataset.id;
      btnCard.addEventListener("click", () => {
        handler(productId);
      });
    });
  };

}
