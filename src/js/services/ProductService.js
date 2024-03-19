import { api} from "../constants/api";
class ProductService {
  constructor() {}

  // function get product
  getProduct = async (res) => {
    try {
      const data = await fetch(`${api.URL_API}/Product?select=*`, {
        method: "GET",
        headers: {
          apiKey: api.API_KEY,
        },
      });
      if (res.ok) {
        const result = data.json();
        console.log(result);
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  };
}
export {ProductService}
