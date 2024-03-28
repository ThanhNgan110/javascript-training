import ProductEntity from "./entity/product.entity";
export default class ProductModel {
  getProduct = () => {
    return this.products;
  }
  
  setProducts = (products) => {
    this.products = products.map((item) => new ProductEntity(item));
  }
  
}
