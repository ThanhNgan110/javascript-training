import { showSuccess, showError } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";
import { displayLoading, hideLoading, toggleOverlay } from "../utils/loading";

export default class CartController {
  constructor(cartModel,cartItemModel,productModel, cartView, productView, cartService, cartItemService) {
    this.cartModel = cartModel;
    this.cartItemModel = cartItemModel;
    this.productModel = productModel;
    this.cartView = cartView;
    this.productView = productView;
    this.cartService = cartService;
    this.cartItemService = cartItemService;

    this.handleRenderCart();
  }

  handleRenderCart = async () => {
    const products = await this.cartItemService.getAllProductsFromCart();
    this.cartItemModel.setCartItem(products);
    this.view.bindShowModal(this.cartItemModel.getCartItem(),this.handleUpdateCart);
    this.view.renderCart(this.cartItemModel.getCartItem());
    this.view.bindDeleteProduct(this.handleHiddenProduct);
    this.view.bindChangeQuantity();
    this.view.bindUpdateCart(this.handleUpdateCart);
    this.view.bindHiddenModal();
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
        const promise = this.cartItemService.deleteProductFromCart(deletedIds[i]);
        promises.push(promise);
      }
      await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  };

  handleUpdateProduct = async (updateItems) => {
    try {
      displayLoading();
      const promises = [];
      for (let i = 0; i < updateItems.length; i++) {
        const promise = this.cartItemService.updateCart({
          id: updateItems[i].id,
          amount: updateItems[i].quantity,
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
      await Promise.all([this.handleUpdateProduct(quantitys), this.handleDeleteProduct(deletedIds)]);
    } catch (error) {
      console.error(error);
    }
  };

  handleAddProduct = async (productId) => {
    toggleOverlay(true);
    displayLoading();
    const products = this.cartItemModel.getCartItem();
    this.cartItemModel.setCartItem(products);
    // check product existing inside cart
    const existingProduct = this.cartItemModel.checkProductIdExisting(productId);
    console.log(existingProduct);
    const getProduct = await this.productService.getAllProducts();
    this.productModel.setProducts(getProduct);
    const product = this.productModel.getProductById(productId);
    if (existingProduct !== undefined) {
      await this.cartItemService.updateCart({
        ...existingProduct,
        amount: existingProduct.amount + 1,
      });
      hideLoading();
      toggleOverlay(false);
      showSuccess({ text: ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG });
    } else {
      displayLoading();
      await this.cartItemService.addProductToCart(product);
      showSuccess({ text: ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG });
      hideLoading();
    }
    await this.handleRenderCart();
  };
}
