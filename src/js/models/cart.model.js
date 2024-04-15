import CartEntity from "./entity/cart.entity";
export default class CartModel {
  setCart = (products) => {
    this.products = products.map((item) => new CartEntity(item));
  };

  getCart = () => {
    return this.products;
  };

  checkProductIdExisting(productId) {
    return this.products ? this.products.find((product) => product.productId === productId)  : null;
  }

  getId = (productId) => {
    return this.products.find(product => product.productId === productId);
  }
  
  
}
