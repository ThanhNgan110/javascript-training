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
    this.blockPagination = querySelector(".block-pagination");
    // this.btnCard = querySelector(".btn-card");
  }

  renderProductGrid(products) {
    this.cardBlock.innerHTML = displayProduct(products);
  }

  bindSearchProduct(handler) {
    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(this.inputSearch.value);
    });
  }

  showContentMessage = () => {
    return (this.messageContent.style.display = "block");
  };

  renderPagination = (countPage) => {
    this.blockPagination.innerHTML = displayPagination(countPage);
  };

  bindAddProductFromCart = (handler) => {
    const btnCards = document.querySelectorAll(".btn-card");
    btnCards.forEach((btnCard) => {
      const productId = btnCard.dataset.id;
      btnCard.addEventListener("click", () => {
        handler(productId);
      });
    });
  };
}
