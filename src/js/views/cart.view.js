import { querySelector } from "../helpers/selector";
import {
  displayCart,
  cartNumberBadge,
  cartSum,
} from "../templates/CartTemplate";
import { showSuccess } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";

export default class CartView {
  constructor() {
    this.wrapperCart = querySelector(".wrapper-cart");
    this.btnMinus = querySelector(".btn-minus");
    this.inputQuantity = querySelector(".input-quantity");
    this.blockCart = querySelector(".block-cart");
    // this.btnCloseModal = querySelector(".close-modal");
    this.btnOpenModal = querySelector(".show-modal");
    this.modal = querySelector(".modal");
    // this.overlay = querySelector(".overlay");
  }

  renderCart = (products) => {
    cartSum(products);
    this.wrapperCart.innerHTML = displayCart(products);
    this.blockCart.innerHTML = cartNumberBadge(products);
  };

  bindChangeQuantity = () => {
    const inputList = document.querySelectorAll(".input-group.quantity");
    inputList.forEach((item) => {
      const plusBtn = item.querySelector(".btn-plus");
      plusBtn.addEventListener("click", () => {
        this.handleChangeQuantity("plus", item);
      });
      const minusBtn = item.querySelector(".btn-minus");
      minusBtn.addEventListener("click", () => {
        this.handleChangeQuantity("minus", item);
      });
    });
  };

  handleChangeQuantity = (options, item) => {
    const inputQuantity = item.querySelector(".input-quantity");
    switch (options) {
      case "plus": {
        inputQuantity.value && inputQuantity.value++;
        break;
      }
      case "minus": {
        inputQuantity.value <= 1
          ? (inputQuantity.value = 1)
          : inputQuantity.value--;
        break;
      }
    }
  };

  bindDeleteProduct = () => {
    const btnDeletes = document.querySelectorAll(".btn-delete");
    btnDeletes.forEach((btnDelete) => {
      btnDelete.addEventListener("click", () => {
        const productId = btnDelete.dataset.id;
        this.bindHiddenProduct(productId);
      });
    });
  };

  bindHiddenProduct = (productId) => {
    const productRows = document.querySelectorAll(".col-tbody");
    productRows.forEach((productRow) => {
      if (productRow.getAttribute("data-id") === productId) {
        productRow.classList.add("marked-deleted");
        // marked deleted item
        productRow.setAttribute("marked-deleted", "true");
        showSuccess({ text: ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS_MSG });
      }
    });
  };

  bindUpdateCart = (handler) => {
    const btnUpdate = document.querySelector(".btn-update-cart");
    if (btnUpdate) {
      btnUpdate.addEventListener("click", () => {
        // get all item deleted marked
        const productRows = document.querySelectorAll(
          ".col-tbody[marked-deleted=true]"
        );
        const deletedIds = Array.from(productRows).map((productRow) =>
          productRow.getAttribute("data-id")
        );
        // get value input quantity
        const inputQuantity = document.querySelectorAll(
          ".col-tbody:not([marked-deleted=true]) .input-quantity"
        );
        const quantityArr = Array.from(inputQuantity).map((input) =>
          parseInt(input.value)
        );
        handler(quantityArr, deletedIds);
      });
    }
  };

  bindShowModal = (product, handler) => {
    this.btnOpenModal.addEventListener("click", () => {
      this.modal.style.display = "block";
      this.renderCart(product);
      // attach event
      this.bindChangeQuantity();
      this.bindDeleteProduct();
      this.bindUpdateCart(handler);
      this.bindHiddenModal();
    });
  };

  bindHiddenModal = () => {
    const closeModal = document.querySelector(".btn-return");
    closeModal.addEventListener("click", () => {
      this.modal.style.display = "none";
    });
  };
}
