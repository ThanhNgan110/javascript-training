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
   * Call api for delete product from cart.
   *
   * @async
   * @function deleteProductFromCart
   * @return {Promise<string>} The data product .
   */
  deleteProductFromCart = async (id) => {
    try {
      const res = await fetch(`${api.URL_API}/${api.END_POINT_CART}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
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

  /**
   * Call api for update quantity for product.
   *
   * @async
   * @function deleteProductFromCart
   * @return {Promise<string>} The data product from cart.
   */
  updateQuantityProduct = async (productId, amount) => {
    try {
      const dataProduct = await this.getAllProductsFromCart();
      const { data } = dataProduct;
      const product = data.find((product) => {
        return product.productId === productId;
      });
      const res = await fetch(`${api.URL_API}/${api.END_POINT_CART}/${product.id}`,{
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        return { data, err: null };
      }
    } catch (error) {
      return {
        data: null,
        err: error.message
      }
    }
  };
}
