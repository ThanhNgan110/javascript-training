/** Class representing a Cart. */
export default class CartEntity {
   /**
   * Create a cart.
   * @param {number} data - The data contains of object cart.
   */
  constructor(data) {
    this.cartId = data.cartId;
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.amount = data.amount;
    this.imgURL = data.imgURL;
  }
}

