import { showSuccess, showError } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";
import { displayLoading, hideLoading } from "../utils/loading";
import CartModel from "../models/cart.model";
import ProductModel from "../models/product.model";
import CartView from "../views/cart.view";
import ProductView from "../views/product.view";
import ProductService from "../services/product.service";
import CartItemService from "../services/cartItem.service";

export default class CartController {
  constructor() {
    this.cartModel = new CartModel();  
    this.productModel = new ProductModel();
    this.view = new CartView();
    this.productView = new ProductView();
    this.productService = new ProductService();
    this.cartItemService = new CartItemService();

    this.handleRenderCart();
  }

  handleRenderCart = async () => {
    const products = await this.cartItemService.getAllProductsFromCart();
    this.cartModel.setCart(products);
    this.view.bindShowModal(this.cartModel.getCart(),this.handleUpdateCart);
    this.view.renderCart(this.cartModel.getCart());
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
      await Promise.all([this.handleUpdateProduct(quantitys), this.handleDeleteProduct(deletedIds)]);
  };

  handleAddProduct = async (productId) => {
    displayLoading();
    const products = this.cartModel.getCart();
    this.cartModel.setCart(products);
    // check product existing inside cart
    const existingProduct = this.cartModel.checkProductIdExisting(productId);
    // get product by product id
    const getProduct = await this.productService.getAllProducts();
    this.productModel.setProducts(getProduct);
    const product = this.productModel.getProductById(productId);
    if (existingProduct !== undefined) {
      await this.cartItemService.updateCart({...existingProduct,amount: existingProduct.amount + 1});
      hideLoading();
      showSuccess({ text: ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG })
    } else {
      displayLoading();
      await this.cartItemService.addProductToCart(product);
      showSuccess({ text: ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG });
      hideLoading();
    }
    await this.handleRenderCart();
  };
}
