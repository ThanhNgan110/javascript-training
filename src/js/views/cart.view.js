import { querySelector } from "../helpers/selector";
import { displayCart } from "../templates/CartTemplate";
export default class CartView {
  constructor() {
    this.wrapperCart = querySelector(".wrapper-cart");
  }

  renderCart = (products) => {
    this.wrapperCart.innerHTML = displayCart(products)

  }



  
}
