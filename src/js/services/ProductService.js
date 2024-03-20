import { api } from "../constants/api";
import { handleRespone } from "./apiService";
class ProductService {
  constructor() {}

  // function get product
  getProduct = () => {
    return handleRespone(api.END_POINT_PRODUCT, "GET");
  };

}
export { ProductService };
