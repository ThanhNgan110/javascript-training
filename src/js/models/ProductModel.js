import { ProductService } from "../services/ProductService";
class ProductModel {
  constructor() {
    this.productService = new ProductService();
  }

  async getProducts() {
    return await this.productService.getProduct();
  }
}
export { ProductModel };
