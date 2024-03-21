import ProductEntity from "./entity/product.entity";
export default class ProductModel {
  createList = (data) => {
    return (this.data = data.map((item) => new ProductEntity(item)));
  };

  searchProductByName = (keyword) => {
    console.log(this.data);
    const searchResults = this.data.filter((product) => product.name.includes(keyword));
    console.log(searchResults);
    return searchResults;
  }
}
