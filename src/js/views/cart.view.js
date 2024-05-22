import {
  querySelector,
  querySelectorAll,
  getElementById,
} from "../helpers/selector";
import {
  displayCart,
  cartNumberBadge,
  cartSum,
} from "../templates/CartTemplate";
import { orderSummery } from "../templates/CheckoutTemplate";
import { showSuccess } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";

export default class CartView {
  constructor() {
    this.wrapperCart = querySelector(".wrapper-cart");
    this.blockCart = querySelector(".block-cart");
    this.btnOpenModal = querySelector(".show-modal");
    this.modalCart = getElementById("modal-cart");
    this.modalCheckout = getElementById("modal-checkout");
    this.formCheckout = querySelector(".wrapper-checkout");
  }

  renderCart = (products) => {
    cartSum(products);
    this.wrapperCart.innerHTML = displayCart(products);
    this.blockCart.innerHTML = cartNumberBadge(products);
  };

  renderFormCheckout = (products) => {
    this.formCheckout.innerHTML = orderSummery(products);
  };

  bindChangeQuantity = () => {
    const inputList = querySelectorAll(".input-group.quantity");
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
      case "plus":
        inputQuantity.value && inputQuantity.value++;
        break;

      case "minus":
        inputQuantity.value <= 1
          ? (inputQuantity.value = 1)
          : inputQuantity.value--;
        break;
    }
  };

  bindDeleteProduct = () => {
    const btnDeletes = querySelectorAll(".btn-delete");
    btnDeletes.forEach((btnDelete) => {
      btnDelete.addEventListener("click", () => {
        const productId = btnDelete.dataset.id;
        this.bindHiddenProduct(productId);
      });
    });
  };

  bindHiddenProduct = (productId) => {
    const productRows = querySelectorAll(".col-tbody");
    productRows.forEach((productRow) => {
      if (productRow.getAttribute("data-id") === productId) {
        productRow.classList.add("marked-deleted");
        productRow.setAttribute("marked-deleted", "true");
        showSuccess({ text: ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS_MSG });
      }
    });
  };

  bindUpdateCart = (handler) => {
    const btnUpdate = querySelector(".btn-update-cart");
    if (btnUpdate) {
      btnUpdate.addEventListener("click", () => {
        const productRows = document.querySelectorAll(
          ".col-tbody[marked-deleted=true]"
        );
        const deletedIds = Array.from(productRows).map((productRow) =>
          productRow.getAttribute("data-id")
        );

        const inputQuantity = querySelectorAll(
          ".col-tbody:not([marked-deleted=true]) .input-quantity"
        );
        const updateItems = [];
        inputQuantity.forEach((input) =>
          updateItems.push({
            id: input.dataset.id,
            quantity: parseInt(input.value),
          })
        );
        handler(updateItems, deletedIds);
      });
    }
  };

  bindShowModal = (products, handler, handleCheckout) => {
    this.btnOpenModal.addEventListener("click", () => {
      this.modalCart.style.display = "block";
      this.renderCart(products);
      this.bindChangeQuantity();
      this.bindDeleteProduct();
      this.bindUpdateCart(handler);
      this.bindCloseModalCart();
      this.bindCheckoutCart(handleCheckout);
    });
  };

  bindCloseModal = (btnReturn, modal) => {
    const closeModal = getElementById(btnReturn);
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  };

  bindCloseModalCheckout = () => {
    this.bindCloseModal("btn-close-checkout", this.modalCheckout);
  };

  bindCloseModalCart = () => {
    this.bindCloseModal("btn-close-cart", this.modalCart);
  };

  bindCheckoutCart = (handler) => {
    const btnCheckout = querySelector(".btn-checkout");
    btnCheckout.addEventListener("click", () => {
      this.modalCart.style.display = "none";
      this.modalCheckout.style.display = "block";
      handler();
    });
  };
}
