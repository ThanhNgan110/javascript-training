import { showSuccess, showError } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";
import CartModel from "../models/cart.model";
import CartView from "../views/cart.view";
import CartService from "../services/cart.service";

export default class CartController {
  constructor() {
    this.model = new CartModel();
    this.view = new CartView();
    this.service = new CartService();

    // Display initial products
    this.handleRenderCart();
  }

  handleRenderCart = async () => {
    const products = await this.service.getAllProductsFromCart();
    this.model.setCart(products);
    this.view.renderCart(this.model.getCart());
    this.view.bindDeleteProduct(this.handleDeleteProductFromCart);
    this.view.bindChangeQuantity();
    this.view.bindUpdateCart(this.handleUpdateCart);
  };

  handleDeleteProductFromCart = async (id) => {
    const { isError } = await this.service.deleteProductFromCart(id);
    if (!isError) {
      showSuccess({ text: ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS_MSG });
      this.handleRenderCart();
    } else {
      showError({ text: ALERT_MESSAGE.DELETE_PRODUCT_FAILED_MSG });
    }
  };

  handleUpdateCart = async (quantitys) => {
    try {
      const products = this.model.getCart();
      const promises = [];
      for (let i = 0; i < products.length; i++) {
        const data = this.model.getProductById(products[i].id);
        const quantity = quantitys[i];
        const promise = this.service.updateCart({ ...data, amount: quantity });
        promises.push(promise);
      }
      await Promise.all(promises);
      showSuccess({ text: ALERT_MESSAGE.UPDATE_CART_SUCCESS_MSG });
      this.handleRenderCart();
    } catch (error) {
      showError({text:ALERT_MESSAGE.UPDATE_CART_FAILED_MSG});
    }
  };
}
