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
    this.view.bindChangeQuantity();
    this.view.bindUpdateCart(this.handleUpdateCart);
  };

  handleDeleteProductFromCart = async (id) => {
    await this.service.deleteProductFromCart(id);
    const cart = await this.service.getAllProductsFromCart();
    this.view.renderCart(cart);
  };

  handleUpdateCart = async (quantitys) => {
    const products = this.model.getCart();
    const promises = [];
    for (let i = 0; i < products.length; i++) {
      const data = this.model.getProductById(products[i].id);
      const quantity = quantitys[i]; 
      const promise = this.service.updateCart({...data, amount:quantity});
      promises.push(promise);
    }
    await Promise.all(promises);
    this.handleRenderCart();
  };
  

}
