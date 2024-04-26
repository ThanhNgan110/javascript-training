import { API } from "../constants/config";
import ApiService from "./apiService";
export default class ProductService {
  constructor() {
    this.apiService = new ApiService(API.URL_API, API.END_POINT_PRODUCT);
  }

  getAllProducts = async () => {
    return await this.apiService.get();
  };
}
