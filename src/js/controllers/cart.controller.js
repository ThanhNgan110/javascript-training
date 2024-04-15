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
    this.view.bindChangeQuantity(this.handleChangeAmount);
  };

  handleDeleteProductFromCart = async (id) => {
    await this.service.deleteProductFromCart(id);
    const cart = await this.service.getAllProductsFromCart();
    this.view.renderCart(cart);
  };

  handleChangeAmount = async (productId, amount) => {
    const data = this.model.getId(productId);
    await this.service.updateCart(data, amount);
    this.handleRenderCart();
  };
}
