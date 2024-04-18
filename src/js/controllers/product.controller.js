import { showSuccess, showError } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";

import ProductModel from "../models/product.model";
import CartModel from "../models/cart.model";
import ProductView from "../views/product.view";
import CartView from "../views/cart.view";
import ProductService from "../services/product.service";
import CartService from "../services/cart.service";

export default class ProductController {
  constructor() {
    this.model = new ProductModel();
    this.cartModel = new CartModel();
    this.view = new ProductView();
    this.cartView = new CartView();
    this.productService = new ProductService();
    this.cartService = new CartService();

    // Explicit this binding
    this.view.bindSearchProducts(this.handleSearchProducts);
    this.view.bindShowModal();
    this.view.bindHiddenModal();

    // Display initial products
    this.handleRenderProductsGrid();
  }

  async handleRenderProductsGrid() {
    const res = await this.productService.getAllProducts();
    this.model.setProducts(res);
    this.view.renderProductGrid(this.model.getProducts());
    this.view.bindAddProducts(this.handleAddProducts);
  }

  handleAddProducts = async (productId) => {
    const products = await this.cartService.getAllProductsFromCart();
    this.cartModel.setCart(products);
    const existingProduct = this.cartModel.checkProductIdExisting(productId);
    const product = this.model.getProductById(productId);
    if (existingProduct !== undefined) {
      await this.cartService.updateCart({...existingProduct, amount: existingProduct.amount + 1});
      showSuccess({text:ALERT_MESSAGE.UPDATE_CART_SUCCESS_MSG});
    } else {
      await this.cartService.addProductToCart(product);
      showSuccess({text:ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG});

    }
    const cart = await this.cartService.getAllProductsFromCart();
    this.cartModel.setCart(cart);
    this.cartView.renderCart(this.cartModel.getCart());
  };

  handleSearchProducts = async (productName) => {
    const products = await this.productService.getAllProducts();
    this.model.setProducts(products);
    const result = this.model.searchProductByName(productName);
    this.view.renderProductGrid(result);
    // this.view.displayMessage(result);
  };
}
