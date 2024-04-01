import { querySelector } from "../helpers/selector";
import { displayCart } from "../templates/CartTemplate";
export default class CartView {
  constructor() {
    this.wrapperCart = querySelector(".wrapper-cart");
    this.btnMinus = querySelector(".btn-minus");
    this.inputQuantity = querySelector(".input-quantity");
    // this.btnDelete = querySelector(".btn-delete");
  }

  renderCart = (products) => {
    this.wrapperCart.innerHTML = displayCart(products);
  };

  // bindPlusQuantity = () => {
  //   const btnPlus = querySelector(".btn-plus");
  //   btnPlus.addEventListener("click", () => {
  //     const inputQuantity = querySelector(".input-quantity");
  //     console.log(inputQuantity.value, "value input");
  //   });
  // };

  // bindMinusQuantity = () => {
  //   const btnMinus = querySelector(".btn-minus");
  //   btnMinus.addEventListener("click", () => {
  //     const inputQuantity = querySelector(".input-quantity");
  //     console.log('test');
  //     console.log(inputQuantity.value, "value input");
  //   });
  // };

  // bindMinusQuantity = () => {
  //   this.btnMinus.addEventListener("click", () => {});
  // };

  bindModifyQuantity = (handler) => {
    const btnPlus = querySelector(".btn-plus");
    const btnMinus = querySelector("btn-minus");

    //  let actions = 'increase';
    let actions = dataset.action;
    switch (actions) {
      case "increase":
        break;
      case "decrease":
        break;

      default:
        break;
    }
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
