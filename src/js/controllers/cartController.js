import CartModel from "../models/cart.model";
import CartView from "../views/cart.view";
import CartService from "../services/cart.service";

export default class CartController {
  constructor() {
    this.model = new CartModel();
    this.view = new CartView();
    this.service = new CartService();

    // Explicit this binding
    //  this.view.bindDeleteProduct(this.handleDeleteProduct);

    // Display initial products
    this.handleRenderCart();
  }

  handleRenderCart = async () => {
    const res = await this.service.getAllProductsFromCart();
    const products = res.data;
    if (!res.err && products) {
      this.model.setCart(products);
    }
    this.view.renderCart(products);

    this.view.bindDeleteProduct(this.handleDeleteProductFromCart);
    // this.view.bindPlusQuantity();
  };

  handleDeleteProductFromCart = async (id) => {
    await this.service.deleteProductFromCart(id);
    const cart = await this.service.getAllProductsFromCart();
    this.view.renderCart(cart.data);
  };
}
