import { showSuccess, showError } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";
import { displayLoading, hideLoading } from "../utils/loading";
import CartModel from "../models/cart.model";
import ProductModel from "../models/product.model";
import CartView from "../views/cart.view";
import ProductView from "../views/product.view";
import CartService from "../services/cart.service";
import ProductService from "../services/product.service";

export default class CartController {
  constructor() {
    this.cartModel = new CartModel();
    this.productModel = new ProductModel();
    this.view = new CartView();
    this.productView = new ProductView();
    this.service = new CartService();
    this.productService = new ProductService();

    // Display initial products
    this.view.bindHiddenModal();
    this.handleRenderCart();
  }

  handleRenderCart = async () => {
    const products = await this.service.getAllProductsFromCart();
    this.cartModel.setCart(products);
    this.view.bindShowModal(this.cartModel.getCart(), this.handleUpdateCart);
    this.view.renderCart(this.cartModel.getCart());
    this.view.bindDeleteProduct(this.handleHiddenProduct);
    this.view.bindChangeQuantity();
    this.view.bindUpdateCart(this.handleUpdateCart);
  };

  handleHiddenProduct = (id) => {
    this.view.bindHiddenProduct(id);
    showSuccess({ text: ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS_MSG });
    this.handleShowModal();
  };

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
  };

  handleUpdateProduct = async (quantitys) => {
    try {
      const products = await this.service.getAllProductsFromCart();
      const promises = [];
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        const quantity = quantitys[i];
        const promise = this.service.updateCart({
          ...product,
          amount: quantity,
        });
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
  };

  handleUpdateCart = async (quantitys, deletedIds) => {
    try {
      await this.handleDeleteProduct(deletedIds);
      await this.handleUpdateProduct(quantitys);
    } catch (error) {
      console.error(error);
    }
  };

  handleAddProduct = async (productId) => {
    const products = await this.service.getAllProductsFromCart();
    this.cartModel.setCart(products);
    // check product existing inside cart
    const existingProduct = this.cartModel.checkProductIdExisting(productId);
    const getProduct = await this.productService.getAllProducts();
    this.productModel.setProducts(getProduct);
    const product = this.productModel.getProductById(productId);
    if (existingProduct !== undefined) {
      displayLoading();
      await this.service.updateCart({
        ...existingProduct,
        amount: existingProduct.amount + 1,
      });
      hideLoading();
      showSuccess({ text: ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG });
    } else {
      displayLoading();
      await this.service.addProductToCart(product);
      showSuccess({ text: ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG });
      hideLoading();
    }
    await this.handleRenderCart();
  };
}
