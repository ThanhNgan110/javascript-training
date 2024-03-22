import ProductEntity from "./entity/product.entity";
export default class ProductModel {
  createList = (data) => {
    return (this.data = data.map((item) => new ProductEntity(item)));
  };

  searchProductByName = (keyword) => {
    const searchResults = this.data.filter((product) => product.name.includes(keyword));
    return searchResults;
  }

  getCountPage = () => {
    const totalProduct = this.data.length;
    const page_limit = 15;
    let endPage = totalProduct / page_limit;
    if(totalProduct % page_limit != 0) {
      endPage ++;
    }
    return endPage;
  }


}
