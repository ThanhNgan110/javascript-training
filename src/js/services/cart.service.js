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

  /**
   * Call api for get product id from cart.
   *
   * @async
   * @function getProductIdFromCart
   * @return {Promise<string>} The product by id.
   */
  getProductIdFromCart = async (productId) => {
    try {
      const res = await fetch(`${api.URL_API}/${api.END_POINT_CART}`);
      if (res.ok) {
        const products = await res.json();
        let dataProduct = "";
        for (const product of products) {
          dataProduct = product.productId === productId? product : null;
          break;
        }
        return {
          data: dataProduct,
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

  /**
   * Call api for delete product from cart.
   *
   * @async
   * @function deleteProductFromCart
   * @return {Promise<string>} The data product.
   */
  deleteProductFromCart = async (id) => {
    try {
      const res = await fetch(
        `${api.URL_API}/${api.END_POINT_CART}/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        const data = await res.json();
        return { data, err: null };
      }
    } catch (error) {
      return {
        data: null,
        err: error.message,
      };
    }
  };
}
