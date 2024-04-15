import { api } from "../constants/config";
import ApiService from "./apiService";
export default class ProductService {
  constructor() {
    this.apiService = new ApiService(api.URL_API, api.END_POINT_PRODUCT);
  }

  getAllProducts = async () => {
    return await this.apiService.get();
  };

  

}
