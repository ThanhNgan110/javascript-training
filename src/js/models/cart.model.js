import CartEntity from "./entity/cart.entity";
export default class CartModel {
  setCart = (products) => {
    this.products = products.map((item) => new CartEntity(item));
  };

  getCart = () => {
    return this.products;
  };
}
