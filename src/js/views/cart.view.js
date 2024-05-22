import { querySelector } from "../helpers/selector";
import {
  displayCart,
  cartNumberBadge,
  cartSum,
} from "../templates/CartTemplate";
import { orderSummery } from "../templates/CheckoutTemplate";
import { showSuccess } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";
import { validateForm } from "../helpers/validateForm";

export default class CartView {
  constructor() {
    this.wrapperCart = querySelector(".wrapper-cart");
    this.blockCart = querySelector(".block-cart");
    this.btnOpenModal = querySelector(".show-modal");
    this.modalCart = document.getElementById("modal-cart");
    this.modalCheckout = document.getElementById("modal-checkout");
    this.formCheckout = querySelector(".wrapper-checkout");
    this.countrySelect = document.getElementById("country");
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
        productRow.setAttribute("marked-deleted", "true");
        showSuccess({ text: ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS_MSG });
      }
    });
  };

  bindUpdateCart = (handler) => {
    const btnUpdate = document.querySelector(".btn-update-cart");
    if (btnUpdate) {
      btnUpdate.addEventListener("click", () => {
        const productRows = document.querySelectorAll(
          ".col-tbody[marked-deleted=true]"
        );
        const deletedIds = Array.from(productRows).map((productRow) =>
          productRow.getAttribute("data-id")
        );

        const inputQuantity = document.querySelectorAll(
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
    const closeModal = document.getElementById(btnReturn);
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

  handleDefaultCountry = (handler, countries) => {
    const countrySelect = document.getElementById("country");
    if (!countrySelect.value) {
      countrySelect.value = countries[0].id;
    }

    handler(countrySelect.value);
  };

  bindEventChangeCountry = (handler) => {
    const countrySelect = document.getElementById("country");
    countrySelect.addEventListener("change", () => {
      const selectedCountryId = countrySelect.value;
      handler(selectedCountryId);
    });
  };

  handleDataDropdown = (data, selectId) => {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = "";
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.text = item.name;
      selectElement.appendChild(option);
    });
  };

  handleRenderCountry = (countries) => {
    this.handleDataDropdown(countries, "country");
  };

  handleRenderStates = (states) => {
    this.handleDataDropdown(states, "states");
  };

  handleDisplayMessageError = (inputElement, message) => {
    if (inputElement) {
      const errorElement = inputElement.nextElementSibling;
      if (errorElement && errorElement.classList.contains("mess-error")) {
        errorElement.textContent = message;
      }
    }
  };

  checkFormValid = (formErrorMess) => {
    for (const message of Object.values(formErrorMess)) {
      if (message !== "") {
        return false;
      }
    }

    return true;
  };

  updateFormUi = (formErrorMess) => {
    const form = document.getElementById("form-checkout");
    const btnOrder = document.getElementById("btn-order");

    for (const [fieldName, message] of Object.entries(formErrorMess)) {
      const inputElement = form.querySelector(`[name="${fieldName}"]`);
      this.handleDisplayMessageError(inputElement, message);
    }

    let allFieldsFilled = true;
    for (let input of form.elements) {
      if (
        input.type !== "submit" &&
        input.type !== "button" &&
        input.name !== "Note" &&
        input.value.trim() === ""
      ) {
        allFieldsFilled = false;
        break;
      }
    }

    btnOrder.disabled = !allFieldsFilled || !this.checkFormValid(formErrorMess);
  };

  bindSubmitForm = () => {
    const form = document.getElementById("form-checkout");
    let formData = {},
      fieldErrorMess = {};

    for (let input of form.elements) {
      input.addEventListener("input", () => {
        if (input.type !== "submit" && input.type !== "button") {
          let value = input.value;
          if (input.type === "number") {
            value = Number(value);
          }

          formData[input.name] = value;
          fieldErrorMess = validateForm({ [input.name]: value });
          this.updateFormUi(fieldErrorMess);
        }
      });
    }
  };
}
