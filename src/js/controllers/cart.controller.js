import { showSuccess, showError } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";
import { displayLoading, hideLoading, toggleOverlay } from "../utils/loading";
import CartModel from "../models/cart.model";
import CartItemModel from "../models/cartItem.model";
import ProductModel from "../models/product.model";
import CartView from "../views/cart.view";
import ProductView from "../views/product.view";
import CartService from "../services/cart.service";
import CartItemService from "../services/cartItem.service";
import ProductService from "../services/product.service";

export default class CartController {
  constructor() {
    this.cartModel = new CartModel();
    this.cartItemModel = new CartItemModel();
    this.productModel = new ProductModel();
    this.view = new CartView();
    this.productView = new ProductView();
    this.service = new CartService();
    this.productService = new ProductService();
    this.cartItemService = new CartItemService();

    // Display initial products
    this.handleRenderCart();
  }

  handleRenderCart = async () => {
    // const products = await this.service.getAllProductsFromCart();
    const products = await this.cartItemService.getAllProductsFromCart();
    console.log(products, "products");
    // this.cartModel.setCart(products);
    this.cartItemModel.setCart(products);
    this.view.bindShowModal(this.cartModel.getCart(), this.handleUpdateCart);
    this.view.renderCart(this.cartModel.getCart());
    this.view.bindDeleteProduct(this.handleHiddenProduct);
    this.view.bindChangeQuantity();
    this.view.bindUpdateCart(this.handleUpdateCart);
    this.view.bindHiddenModal ();
  };

  handleHiddenProduct = (id) => {
    this.view.bindHiddenProduct(id);
    showSuccess({ text: ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS_MSG });
    this.handleShowModal();
  };

  handleDeleteProduct = async (deletedIds) => {
    try {
      const promises = [];
      for (const id of deletedIds) {
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
      displayLoading();
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
    toggleOverlay(true);
    displayLoading();
    const products = await this.service.getAllProductsFromCart();
    this.cartModel.setCart(products);
    // check product existing inside cart
    const existingProduct = this.cartModel.checkProductIdExisting(productId);
    const getProduct = await this.productService.getAllProducts();
    this.productModel.setProducts(getProduct);
    const product = this.productModel.getProductById(productId);

    if (existingProduct !== undefined) {
      await this.service.updateCart({
        ...existingProduct,
        amount: existingProduct.amount + 1,
      });
      hideLoading();
      toggleOverlay(false);
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
