import CartEntity from "./entity/cart.entity";
export default class CartModel {
  setCart = (products) => {
    this.products = products.map((item) => new CartEntity(item));
  };

  getCart = () => {
    return this.products;
  };

  getProductById = (id) => {
    return this.products.find((item) => item.id === id);
  };

  checkProductIdExisting(id) {
     return this.getProductById(id);
  };
}
