import { api } from "../constants/config";
export class CartService {
  static addProductFromCart = async (product) => {
    const url = new URL(`${api.URL_API}/${api.END_POINT_CART}`);
    const respone = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify(product)
    });
    if (!respone.ok) {
      throw new Error("Fetch api fail");
    }
    const data = await respone.json();
    console.log(data,'aaaaa');
    return data;
  };
}
