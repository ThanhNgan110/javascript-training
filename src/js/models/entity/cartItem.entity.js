export default class CartItemEntity {
 constructor(data) {
   this.id = data.id;
   this.productId = data.productId;
   this.cartId = data.cartId;
   this.name = data.name;
   this.price = data.price;
   this.amount = data.amount;
   this.imgURL = data.imgURL;
 }
}
