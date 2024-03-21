import ProductEntity from "./entity/product.entity";
export default class ProductModel {
  createList = (data) => {
   return data.map(item => new ProductEntity(item));
  }
}
