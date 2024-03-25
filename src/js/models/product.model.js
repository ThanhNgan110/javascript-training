import ProductEntity from "./entity/product.entity";
import { page_limit } from "../constants/config";
export default class ProductModel {
  createList = (data) => {
    return (this.data = data.map((item) => new ProductEntity(item)));
  };

  searchProductByName = (keyword) => {
    const searchResults = this.data.filter((product) =>
      product.name.includes(keyword)
    );
    return searchResults;
  };

  getCountPage = () => {
    const totalProduct = this.data.length;
    const limit = page_limit;
    let endPage = totalProduct / limit;
    if (totalProduct % limit != 0) {
      endPage++;
    }
    return endPage;
  };

  findProductById = (productId) => {
    for (let product of this.data) {
      if (product.id === productId) {
        console.log("111", product);
        return product;
      }
    }
    return null;
  };
}
