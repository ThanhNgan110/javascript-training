import { api } from "../constants/config";
import CartService from "./cart.service";
const cartService = new CartService();
export default class ProductService {
  /**
   * Call api for get all product.
   *
   * @async
   * @function getAllProduct
   * @return {Promise<string>} The data of product.
   */
  getAllProducts = async () => {
    try {
      const res = await fetch(`${api.URL_API}/${api.END_POINT_PRODUCT}`);
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
   * Call api for search product by name.
   *
   * @async
   * @function searchProductByName
   * @return {Promise<string>} The data of product after search.
   */
  searchProductByName = async (keyword) => {
    try {
      const res = await fetch(`${api.URL_API}/${api.END_POINT_PRODUCT}`);
      if (res.ok) {
        const product = await res.json();
        const filteredProducts = product.filter((product) =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        );
        if (filteredProducts.length === 0) {
          return {
            data: [],
            err: "There are no products in list",
          };
        } else {
          return {
            data: filteredProducts,
            err: null,
          };
        }
      }
    } catch (error) {
      return {
        data: null,
        err: error.message,
      };
    }
  };

  /**
   * Call api for find product by id.
   *
   * @async
   * @function findProductById
   * @return {Promise<string>} The data of product by id.
   */
  findProductById = async (product_id) => {
    try {
      const res = await fetch(`${api.URL_API}/${api.END_POINT_PRODUCT}`);
      console.log("product_id", product_id);
      if (res.ok) {
        const products = await res.json();
        let dataProduct = "";
        for (const product of products) {
          if (product.id === product_id) dataProduct = product;
        }
        console.log(dataProduct);
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
   * Call api for add product from cart.
   *
   * @async
   * @function addProductFromCart
   * @return {Promise<string>} The data of product.
   */
    addProductFromCart = async (product_id) => {
      const getProductCart = await cartService.getAllProductsFromCart();
      console.log(getProductCart.data, "data product");
      // Check getProductCart is array and get check getProductCart contain data
      if (Array.isArray(getProductCart.data)) {
        const existingProduct = getProductCart.data.find((product) => {
          return product.id === product_id;
        });
        if (existingProduct !== undefined) {
          existingProduct.amount += 1;
          getProductCart.data.push({ amount: existingProduct.amount });
          const res = await fetch(
            `${api.URL_API}/${api.END_POINT_CART}/${product_id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(existingProduct),
            }
          );
          if (res.ok) {
            const data = await res.json();
            return { data, err: null };
          }
        } else {
          const product = await this.findProductById(product_id);
          const res = await fetch(`${api.URL_API}/${api.END_POINT_CART}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product.data),
          });
          if (res.ok) {
            const data = await res.json();
            return { data, err: null };
          }
        }
      }
    };
}
