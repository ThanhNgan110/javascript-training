import { showSuccess } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";
import { displayLoading, hideLoading } from "../utils/loading";

import ProductModel from "../models/product.model";
import CartModel from "../models/cart.model";
import ProductView from "../views/product.view";
import CartView from "../views/cart.view";
import ProductService from "../services/product.service";
import CartService from "../services/cart.service";
import CartController from "../controllers/cart.controller";

export default class ProductController {
  constructor() {
    this.model = new ProductModel();
    this.cartModel = new CartModel();
    this.view = new ProductView();
    this.cartView = new CartView();
    this.productService = new ProductService();
    this.cartService = new CartService();
    this.cartController = new CartController();

    // Explicit this binding
    this.view.bindSearchProducts(this.handleSearchProducts);
    // this.view.bindShowModal();
    // this.view.bindHiddenModal();

    // Display initial products
    this.handleRenderProductsGrid();
  }

  async handleRenderProductsGrid() {
    displayLoading();
    const res = await this.productService.getAllProducts();
    this.model.setProducts(res);
    this.view.renderProductGrid(this.model.getProducts());
    this.view.bindAddProducts(this.handleAddProducts);
    hideLoading();
  }

  handleAddProducts = async (productId) => {
    const products = await this.cartService.getAllProductsFromCart();
    this.cartModel.setCart(products);
    const existingProduct = this.cartModel.checkProductIdExisting(productId);
    const product = this.model.getProductById(productId);
    if (existingProduct !== undefined) {
      displayLoading();
      await this.cartService.updateCart({...existingProduct,amount: existingProduct.amount + 1});
      hideLoading();
      showSuccess({ text: ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG });
    } else {
      displayLoading();
      await this.cartService.addProductToCart(product);
      showSuccess({ text: ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG });
      hideLoading();
    }
    const cart = await this.cartService.getAllProductsFromCart();
    this.cartModel.setCart(cart);
    this.cartView.renderCart(this.cartModel.getCart());
    this.cartView.bindChangeQuantity();
    this.cartView.bindDeleteProduct(this.cartController.handleDeleteProductFromCart);
    this.cartView.bindUpdateCart(this.cartController.handleUpdateCart);
  }

  handleSearchProducts = async (productName) => {
    const products = await this.productService.getAllProducts();
    this.model.setProducts(products);
    const result = this.model.searchProductByName(productName);
    if (result === null) {
      this.view.displayMessage(ALERT_MESSAGE.SEARCH_PRODUCT_LIST_EMPTY_HEADING);
    } else {
      this.view.displayMessage("");
    }
    await this.view.renderProductGrid(result);
  }
}

