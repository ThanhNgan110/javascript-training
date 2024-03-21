class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.handleGetProduct();
    this.handleSearch();
  }

  handleGetProduct = async () => {
    const data = await this.model.getProducts();
    this.view.renderProduct(data);
  };

  handleSearch = () => {
    this.view.bindSearchProduct((keyword) => {
      this.model.searchProductByName(keyword);
    });
  };
}
export { ProductController };
