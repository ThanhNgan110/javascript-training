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

  bindPlusQuantity = (handler) => {
    const inputList = document.querySelectorAll(".input-group.quantity");
    inputList.forEach((item) => {
      const plusBtn = item.querySelector(".btn-plus");
      plusBtn.addEventListener("click", () => {
        const inputQuantity = item.querySelector(".input-quantity");
        inputQuantity.value && inputQuantity.value++;
        console.log(inputQuantity.value, "value input");
        const productId = inputQuantity.getAttribute("data-id");
        console.log('test');
        console.log(productId, "id");
        handler(productId, inputQuantity.value);
      });
    });
  };

  bindMinusQuantity = (handler) => {
    const inputList = document.querySelectorAll(".input-group.quantity");
    inputList.forEach((item) => {
      const plusBtn = item.querySelector(".btn-minus");
      plusBtn.addEventListener("click", () => {
        const inputQuantity = item.querySelector(".input-quantity");
        inputQuantity.value <= 1 ? (inputQuantity.value = 1) : inputQuantity.value--;
        console.log(inputQuantity.value, "value input");
        const productId = inputQuantity.getAttribute("data-id");
        console.log(productId, "id");
        handler(productId, inputQuantity.value);
      });
    });
  };

  bindDeleteProduct = (handler) => {
    const btnDeletes = document.querySelectorAll(".btn-delete");
    btnDeletes.forEach((btnDelete) => {
      btnDelete.addEventListener("click", () => {
        const product_id = btnDelete.dataset.id;
        handler(product_id);
      });
    });
  };
}
