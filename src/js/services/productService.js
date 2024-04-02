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
  findProductById = async (productId) => {
    try {
      const res = await fetch(`${api.URL_API}/${api.END_POINT_PRODUCT}`);
      if (res.ok) {
        const products = await res.json();
        let dataProduct = "";
        for (const product of products) {
          if (product.productId === productId) dataProduct = product;
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
  addProductFromCart = async (productId) => {
    console.log(productId);
    const getProductCart = await cartService.getAllProductsFromCart();
    // Check getProductCart is array and get check getProductCart contain data
    if (Array.isArray(getProductCart.data)) {
      const existingProduct = getProductCart.data.find((product) => {
        return product.productId === productId;
      });
      if (existingProduct !== undefined) {
        existingProduct.amount += 1;
        getProductCart.data.push({ amount: existingProduct.amount });
        const res = await fetch(
          `${api.URL_API}/${api.END_POINT_CART}/${existingProduct.id}`,
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
        const product = await this.findProductById(productId);
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
