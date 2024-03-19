class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.handleGetProduct();
  }

  handleGetProduct = async () => {
    const { data } = await this.model.getProducts();
    this.view.renderProduct(data);
  };
}
export { ProductController };
