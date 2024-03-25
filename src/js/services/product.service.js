import { api } from "../constants/config";
export class ProductService {
  static getAllProductByPage = async () => {
    const url = new URL(`${api.URL_API}/${api.END_POINT_PRODUCT}?p=1&l=15`);
    const respone = await fetch(url, {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    });
    if (!respone.ok) {
      throw new Error("Fetch api fail");
    }
    const data = await respone.json();
    return data;
  };

  static getAllProduct = async () => {
    const url = new URL(`${api.URL_API}/${api.END_POINT_PRODUCT}`);
    const respone = await fetch(url, {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    });
    if (!respone.ok) {
      throw new Error("Fetch api fail");
    }
    const data = await respone.json();
    return data;
  };
}
