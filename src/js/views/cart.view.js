import { querySelector } from "../helpers/selector";
import { displayCart } from "../templates/CartTemplate";
export default class CartView {
  constructor() {
    this.wrapperCart = querySelector(".wrapper-cart");
    this.btnMinus = querySelector(".btn-minus");
    this.inputQuantity = querySelector(".input-quantity");
  }

  renderCart = (products) => {
    this.wrapperCart.innerHTML = displayCart(products);
  };

  bindChangeQuantity = (handler) => {
    const inputList = document.querySelectorAll(".input-group.quantity");
    inputList.forEach((item) => {
      const plusBtn = item.querySelector(".btn-plus");
      plusBtn.addEventListener("click", () => {
        this.handleChangeQuantity("plus", handler, item);
      });
      const minusBtn = item.querySelector(".btn-minus");
      minusBtn.addEventListener("click", () => {
        this.handleChangeQuantity("minus", handler, item);
      });
    });
  };

  handleChangeQuantity = (options, handler, item) => {
    const inputQuantity = item.querySelector(".input-quantity");
    switch (options) {
      case "plus":
        inputQuantity.value && inputQuantity.value++;
        break;
      case "minus":
        inputQuantity.value <= 1 ? (inputQuantity.value = 1) : inputQuantity.value--;
        break;
    }
    const productId = inputQuantity.getAttribute("data-id");
    handler(productId, inputQuantity.value);
  };

  bindDeleteProduct = (handler) => {
    const btnDeletes = document.querySelectorAll(".btn-delete");
    btnDeletes.forEach((btnDelete) => {
      btnDelete.addEventListener("click", () => {
        const productId = btnDelete.dataset.id;
        handler(productId);
      });
    });
  };
}
