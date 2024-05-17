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
      // attach event
      this.bindChangeQuantity();
      this.bindDeleteProduct();
      this.bindUpdateCart(handler);
      this.bindHiddenModal();
      this.bindCheckoutCart(handleCheckout);
    });
  };

  bindHiddenModal = () => {
    const closeModal = document.querySelector(".btn-return");
    closeModal.addEventListener("click", () => {
      this.modalCart.style.display = "none";
    });
  };

  bindCheckoutCart = (handler) => {
    const closeCart = querySelector(".btn-checkout");
    closeCart.addEventListener("click", () => {
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

  hanldeDataDropdown = (data, selectId) => {
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
    this.hanldeDataDropdown(countries, "country");
  };

  handleRenderStates = (states) => {
    this.hanldeDataDropdown(states, "states");
  };

  bindSubmitForm = () => {
    const form = document.getElementById("form-checkout");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let formData = {};
      for (let input of form.elements) {
        formData[input.name] = input.value;
      }
      const formMess = validateForm(formData);
      if (!(Object.keys(formMess).length === 0)) {
        for (const [key, value] of Object.entries(formMess)) {
          const inputElement = form.querySelector(`[name="${key}"]`);
          // get content of the next sibling in list item
          if (inputElement) {
            const errorElement = inputElement.nextElementSibling;
            if (errorElement && errorElement.classList.contains("mess-error")) {
              errorElement.textContent = value;
            }
          }
        }
        // btnOrder.disabled = true;
      }
      form.submit();
    });
  };
}
