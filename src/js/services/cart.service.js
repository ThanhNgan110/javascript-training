import { api } from "../constants/config";
import ApiService from "./apiService";
export default class CartService {
  constructor() {
    this.apiService = new ApiService(api.URL_API, api.END_POINT_CART);
  }

  getAllProductsFromCart = async () => {
   return await this.apiService.get();
  }

  addProductToCart = async (product) => {
   await this.apiService.post(product);
  };

  updateCart = async(product, amount) => {
    await this.apiService.put(product, {amount:amount});
  }

  deleteProductFromCart = async (id) => {
    await this.apiService.delete(id);
  }

  
}
