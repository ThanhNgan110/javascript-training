import ProductService from "../services/product.service";
export default class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.handleGetProduct();
  }

  handleGetProduct = async () => {
    const data = await ProductService.getAllProduct();
    const products = this.model.createList(data);
    this.view.renderProduct(products);
  };

  // handleSearch = () => {
  //   this.view.bindSearchProduct((keyword) => {
  //     this.model.searchProductByName(keyword);
  //   });
  // };
}
