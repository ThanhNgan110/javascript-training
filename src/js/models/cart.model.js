import CartEntity from "./entity/cart.entity";
export default class CartModel {
  getCart = () => {
    return this.products;
  }
  
  setCart = (products) => {
    this.products = products.map((item) => new CartEntity(item));
  }
}
