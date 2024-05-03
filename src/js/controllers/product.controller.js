import { ALERT_MESSAGE } from "../constants/message";
import { displayLoading, hideLoading, toggleOverlay} from "../utils/loading";

export default class ProductController {
  constructor(model, view, productService, cartController) {
    this.model = model;
    this.view = view;
    this.productService = productService;
    this.cartController = cartController;

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
