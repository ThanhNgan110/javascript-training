import ProductModel from "../models/productModel";
import ProductView from "../views/productView";
import ProductService from "../services/productService";

export default class ProductController {
  constructor() {
    this.model = new ProductModel();
    this.view = new ProductView();
    this.service = new ProductService();

    // Explicit this binding
    //  this.view.bindDeleteProduct(this.handleDeleteProduct);
    this.view.bindSearchProducts(this.handleSearchProducts);

    // Display initial products
    this.handleRenderProductsGrid();
  }

  handleRenderProductsGrid = async () => {
    const res = await this.service.getAllProduct();
    const products = res.data;
    if (!res.err && products) {
      this.model.setProducts(products);
      this.view.renderProductGrid(products);
    }
    this.view.bindAddProducts(this.handleAddProducts);
  };

  handleSearchProducts = async (value) => {
    const res = await this.service.searchProductByName(value);
    if (products.length === 0) {
      this.view.displayMessage(res.err);
    }
    this.view.renderProductGrid(products);
    this.view.displayMessage(res.err);
  };

  handleAddProducts = async (product_id) => {
    const producId = await this.service.addProductFromCart(product_id);
  };
}
