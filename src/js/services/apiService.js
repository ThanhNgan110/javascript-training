import { api } from "../constants/api";

export const handleRespone = async (endpoint, data, method) => {
  try {
    let requestBody = '';
    if(method!== 'GET') {
    }
    const res = await fetch(`${api.URL_API}/${endpoint}`, {
      method: method,
      headers: {
        apiKey: api.API_KEY,
      },
      body: null
    });
    if (res) {
      const result = await res.json();
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};
