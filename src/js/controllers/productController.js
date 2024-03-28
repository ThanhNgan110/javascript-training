import { ProductService } from "../services/productService";

export default class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Explicit this binding
    //  this.view.bindDeleteProduct(this.handleDeleteProduct);
     this.view.bindSearchProducts(this.handleSearchProducts);

    // Display initial products
    this.getProducts();
  }

  getProducts = async () => {
    const res = await ProductService.getAllProduct();
    const products = res.data;
    if (!res.err && products) {
      this.model.setProducts(products);
      this.view.renderProductGrid(products);
    }
    this.view.bindAddProducts(this.handleAddProducts);
  };

  handleSearchProducts = async (value) => {
    const res = await ProductService.searchProductByName(value);
    const products = res.data;
    console.log(products.length);
    if(products.length === 0) {
      this.view.displayMessage(res.err);
    }
    this.view.renderProductGrid(products);
    this.view.displayMessage(res.err);
  }

  handleAddProducts =  async (product_id) => {
    const producId = await ProductService.addProductFromCart(product_id);
  }

  
}
