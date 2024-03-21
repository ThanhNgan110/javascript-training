import ProductService from "../services/product.service";

export default class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init = () => {
    this.renderProducts();
    this.handleSearch();
  };

  renderProducts = async () => {
    const data = await ProductService.getAllProduct();
    const products = this.model.createList(data);
    this.view.renderProductGrid(products);
  };

  handleSearch = () => {
   this.view.bindSearchProduct((keyword) => {
  console.log(keyword);
   const resultSearch = this.model.searchProductByName(keyword);
   this.view.renderProductGrid(resultSearch);
   });
  };
}
