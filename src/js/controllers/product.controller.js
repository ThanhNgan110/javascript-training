import ProductService from "../services/product.service";

export default class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.renderProducts();
    this.handleSearch();
  }

  renderProducts = async () => {
    const data = await ProductService.getAllProduct();
    const products = this.model.createList(data);
    this.view.renderProductGrid(products);
    this.handlePagination();
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

  handlePagination = () => {
   const countPage =  this.model.getCountPage(); 
   this.view.renderPagination(countPage);
  }

}
