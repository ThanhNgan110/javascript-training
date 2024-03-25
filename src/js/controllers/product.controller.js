import { ProductService } from "../services/product.service";
import { CartService } from "../services/cart.service";

export default class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.renderProducts();
    this.handleSearch();
  }

  renderProducts = async () => {
    const data = await ProductService.getAllProductByPage(1);
    const products = this.model.createList(data);
    this.view.renderProductGrid(products);
    this.handlePagination();
    this.handleAddProductCard();
  };

  handleSearch = () => {
    this.view.bindSearchProduct((keyword) => {
      const resultSearch = this.model.searchProductByName(keyword);
      if (resultSearch.length === 0) {
        this.view.showContentMessage();
      }
      this.view.renderProductGrid(resultSearch);
    });
  };

  // handlePagination = () => {
  //  const numberPage =  this.model.getCountPage();
  //  console.log('test',numberPage);
  //  this.view.renderPagination(numberPage);
  // }

  handlePagination = async () => {
    const data = await ProductService.getAllProduct();
    const products = this.model.createList(data);
    const numberPage = this.model.getCountPage();
    this.view.renderPagination(numberPage);
  };

  handleAddProductCard = () => {
    this.view.bindAddProductFromCart((productId) => {
      const product = this.model.findProductById(productId);
      if (product) CartService.addProductFromCart(product);

      // case id same -> update quantity
    });
  };
}
