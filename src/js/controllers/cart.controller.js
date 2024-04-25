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
    // this.view.bindShowModal();
    this.view.bindHiddenModal();
    this.handleRenderCart();
  }

  handleRenderCart = async () => {
    const products = await this.service.getAllProductsFromCart();
    this.model.setCart(products);
    this.view.bindShowModal(this.model.getCart(), this.handleUpdateCart);
    // this.view.bindShowModal(this.handleShowModal);
    this.view.renderCart(this.model.getCart());
    this.view.bindDeleteProduct(this.handleHiddenProduct);
    this.view.bindChangeQuantity();
    this.view.bindUpdateCart(this.handleUpdateCart);
  }

  handleHiddenProduct = (id) => {
    if (id) {
      this.view.bindHiddenProduct(id);
      showSuccess({ text: ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS_MSG });
      this.handleShowModal();
    }
    showError({ text: ALERT_MESSAGE.DELETE_PRODUCT_FAILED_MSG });
  }

  handleDeleteProduct = async (deletedIds) => {
    try {
      const promises = [];
      for (let i = 0; i < deletedIds.length; i++) {
        const id = deletedIds[i];
        const promise = this.service.deleteProductFromCart(id);
        promises.push(promise);
      }
      await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  }

  handleUpdateProduct = async (quantitys) => {
    try {
      const products = await this.service.getAllProductsFromCart();
      const promises = [];
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        const quantity = quantitys[i];
        const promise = this.service.updateCart({...product, amount: quantity});
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
    try {
      await this.handleDeleteProduct(deletedIds);
      await this.handleUpdateProduct(quantitys);
    } catch (error) {
      console.error(error);
    }
  }
  
}
