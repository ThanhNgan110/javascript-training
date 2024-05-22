import { querySelector, getElementById } from "../helpers/selector";
import { orderSummery } from "../templates/CheckoutTemplate";
import { validateForm } from "../helpers/validateForm";
export default class CheckoutView {
  constructor() {
    this.formCheckout = querySelector(".wrapper-checkout");
  }

  renderFormCheckout = (products) => {
    this.formCheckout.innerHTML = orderSummery(products);
  };

  handleDefaultCountry = (handler, countries) => {
    const countrySelect = getElementById("country");
    if (!countrySelect.value) {
      countrySelect.value = countries[0].id;
    }

    handler(countrySelect.value);
  };

  bindEventChangeCountry = (handler) => {
    const countrySelect = getElementById("country");
    countrySelect.addEventListener("change", () => {
      const selectedCountryId = countrySelect.value;
      handler(selectedCountryId);
    });
  };

  handleDataDropdown = (data, selectId) => {
    const selectElement = getElementById(selectId);
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
    const form = getElementById("form-checkout");
    const btnOrder = getElementById("btn-order");

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
    const form = getElementById("form-checkout");
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
