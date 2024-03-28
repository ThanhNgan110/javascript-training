export default class CartEntity {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.amount = data.amount;
    this.imgURL = data.imgURL;
  }
}

