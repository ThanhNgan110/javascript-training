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
 ;

    // Display initial products
    this.handleRenderCart();
  }

  handleRenderCart = async () => {
    const res = await this.service.getAllProductsFromCart();
    const products = res.data;
    console.log(products);
    if (!res.err && products) {
      this.model.setCart(products);
    }
    this.view.renderCart(products);

  };

 
  
}
