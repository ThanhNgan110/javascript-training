import CartItemEntity from "./entity/cartItem.entity";
export default class CartItemModel {
  setCartItem = (products) => {
    this.products = products.map((item) => new CartItemEntity(item));
  };

  getCartItem = () => {
    return this.products;
  };

  checkProductIdExisting(productId) {
    return this.products
      ? this.products.find((product) => product.productId === productId)
      : null;
  };

  getProductById = (id) => {
    return this.products.find((item) => item.id === id);
  };
}
