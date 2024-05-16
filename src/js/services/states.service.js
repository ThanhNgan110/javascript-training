import { API } from "../constants/config";
import ApiService from "./apiService";
export default class StatesService {
  constructor() {
    this.apiService = new ApiService(API.URL_API, API.END_POINT_STATES);
  }

  getStates = async () => {
    return await this.apiService.get();
  };
}
