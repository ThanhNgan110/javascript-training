import { showSuccess, showError } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";
import { displayLoading, hideLoading } from "../utils/loading";
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
    this.view.bindDeleteProduct(this.handleHiddenProduct);
    this.view.bindChangeQuantity();
    this.view.bindUpdateCart(this.handleUpdateCart);
  };

  handleHiddenProduct = (id) => {
    if(id) {
      this.view.bindHiddenProduct(id);
      showSuccess({ text: ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS_MSG });
    }
      showError({ text: ALERT_MESSAGE.DELETE_PRODUCT_FAILED_MSG });  
  };

  handleDeleteProduct = async (deletedIds) => {
    try {
      for (let i = 0; i < deletedIds.length; i++) {
        const id = deletedIds[i];
        const promise = this.service.deleteProductFromCart(id);
        promises.push(promise);
      }
      displayLoading();
      await Promise.all(promises);
      hideLoading();
      this.handleRenderCart();
    } catch (error) {
    }
  }

  handleUpdateProduct = async (quantitys) => {
    try {
      const products = await this.service.getAllProductsFromCart();
      let promises = [];
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        const quantity = quantitys[i];
        promise = this.service.updateCart({...product,amount: quantity});
        promises.push(promise);
      }
      displayLoading();
      await Promise.all(promises);
      hideLoading();
      showSuccess({ text: ALERT_MESSAGE.UPDATE_CART_SUCCESS_MSG });
      this.handleRenderCart();
    } catch (error) {
      showError({ text: ALERT_MESSAGE.UPDATE_CART_FAILED_MSG });
    }
  }

  handleUpdateCart = async (quantitys, deletedIds) => {
    this.handleDeleteProduct(deletedIds);
    this.handleUpdateProduct(quantitys);
  }
}
