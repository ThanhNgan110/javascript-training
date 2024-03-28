import { api } from "../constants/config";

export default class CartService {
    /**
   * Call api for get all product from cart.
   *
   * @async
   * @function getAllProductsFromCart
   * @return {Promise<string>} The data of product.
   */
    getAllProductsFromCart = async () => {
      try {
        const res = await fetch(`${api.URL_API}/${api.END_POINT_CART}`);
        if (res.ok) {
          const data = await res.json();
          return {
            data,
            err: null,
          };
        }
      } catch (error) {
        return {
          data: null,
          err: error.message,
        };
      }
    };
}
