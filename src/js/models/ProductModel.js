import { ProductService } from "../services/ProductService";
class ProductModel {
  constructor() {
    this.productService = new ProductService();
  }

  async getProducts() {
    this.products = await this.productService.getProduct();
  }
}
export {ProductModel}
