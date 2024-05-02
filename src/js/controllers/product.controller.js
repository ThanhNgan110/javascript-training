import { ALERT_MESSAGE } from "../constants/message";
import { displayLoading, hideLoading, toggleOverlay} from "../utils/loading";

import ProductModel from "../models/product.model";
import ProductView from "../views/product.view";
import ProductService from "../services/product.service";
import CartController from "../controllers/cart.controller";

export default class ProductController {
  constructor() {
    this.model = new ProductModel();
    this.view = new ProductView();
    this.productService = new ProductService();
    this.cartController = new CartController();

    this.view.bindSearchProducts(this.handleSearchProducts);
    this.handleRenderProductsGrid();
  }

  async handleRenderProductsGrid() {
    toggleOverlay(false);
    displayLoading();
    const res = await this.productService.getAllProducts();
    this.model.setProducts(res);
    this.view.renderProductGrid(this.model.getProducts());
    this.view.bindAddProducts(this.cartController.handleAddProduct);
    hideLoading();
  };

  handleSearchProducts = async (productName) => {
    const products = await this.productService.getAllProducts();
    this.model.setProducts(products);
    const result = this.model.searchProductByName(productName);
    if (result === null) {
      this.view.displayMessage(ALERT_MESSAGE.SEARCH_PRODUCT_LIST_EMPTY_HEADING);
    } else {
      this.view.displayMessage("");
    }
    await this.view.renderProductGrid(result);
  };
}
