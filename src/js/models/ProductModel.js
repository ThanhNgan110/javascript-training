import { ProductService } from "../services/ProductService";
class ProductModel {
  constructor() {
    this.productService = new ProductService();
  }

  async getProducts() {
    return await this.productService.getProduct();
  }

  async searchProductByName(keyword) {
    console.log(keyword);
    const products = await this.getProducts();
    const searchResults = await products.filter(
      (product) => product.product.name === keyword
    );
    console.log(searchResults);
    return searchResults;
  }
}
export { ProductModel };
