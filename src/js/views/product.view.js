import { querySelector } from "../helpers/selector";
import { displayProduct } from "../templates/ProductTemplate";
export default class ProductView {
  constructor() {
    this.cardBlock = querySelector(".card-block");
    this.searchForm = querySelector(".search-form");
    this.inputSearch = querySelector(".input-search");
    this.messageContent = querySelector(".message-empty");
    this.modal = querySelector(".modal");
    this.btnCloseModal = querySelector(".close-modal");
    this.btnOpenModal = querySelector(".show-modal");
    this.overlay = querySelector(".overlay");
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
    this.messageContent.innerHTML = message;
  };

  bindAddProducts = (handler) => {
    const btnCards = document.querySelectorAll(".btn-card");
    btnCards.forEach((btnCard) => {
      btnCard.addEventListener("click", () => {
        let productId = btnCard.dataset.id;
        handler(productId);
      });
    });
  };

  bindShowModal = () => {
    this.btnCloseModal.addEventListener("click", () => {
      return this.modal.classList.add("hidden");
    });
  };

  bindHiddenModal = () => {
    this.btnOpenModal.addEventListener("click", () => {
      return this.modal.classList.remove("hidden");
    });
  };
}
