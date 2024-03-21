export default class ProductEntity {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.imgURL = data.imgURL
  }
}
