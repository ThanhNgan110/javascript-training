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

  bindPlusQuantity = () => {
    console.log("11111111");
    const btnPlusList = document.querySelectorAll(".btn-plus");
    console.log(btnPlusList);
    btnPlusList.forEach((btn) => {
      btn.addEventListener("click", () => {
        const inputQuantity = querySelector(".input-quantity");
        inputQuantity.value && inputQuantity.value++;
        console.log(inputQuantity.value, "value input");
      });
    });
  };

  bindMinusQuantity = () => {
    console.log("2222");
    const btnMinusList = document.querySelectorAll(".btn-minus");
    console.log(btnMinusList);
    btnMinusList.forEach((btn) => {
      btn.addEventListener("click", () => {
        const inputQuantity = btn.closest(".input-quantity");
        console.log(btn);
        inputQuantity.value <= 1
          ? (inputQuantity.value = 1)
          : inputQuantity.value--;
        console.log(inputQuantity.value, "value input");
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
