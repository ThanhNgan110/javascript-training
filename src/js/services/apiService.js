export default class ApiService {
  constructor(baseURL, endPoint) {
    this.baseURL = baseURL;
    this.endPoint = endPoint;
  }

  async get() {
    try {
      const res = await fetch(`${this.baseURL}/${this.endPoint}`, {
        method: "GET",
        headers: { "content-type": "application/json" },
        cache: 'no-store'
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      throw new Error(`Get data fail ${error.message}`);
    }
  }

  async post(data) {
    try {
      const res = await fetch(`${this.baseURL}/${this.endPoint}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        cache: 'no-store',
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return res.json();
      }
    } catch (error) {
      throw new Error(`Post data fail ${error.message}`);
    }
  }

  async put(payload) {
    try {
      const res = await fetch(
        `${this.baseURL}/${this.endPoint}/${payload.id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          cache: 'no-store',
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        return res.json();
      }
    } catch (error) {
      throw new Error(`Put data fail ${error.message}`);
    }
  }

  async patch(payload) {
    try {
      const res = await fetch(
        `${this.baseURL}/${this.endPoint}/${payload.id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          cache: 'no-store',
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        return res.json();
      }
    } catch (error) {
      throw new Error(`Patch data fail ${error.message}`);
    }
  }

  async delete(payload) {
    try {
      const res = await fetch(`${this.baseURL}/${this.endPoint}/${payload}`, {
        method: "DELETE",
        cache: 'no-store'
      });
      if (res.ok) {
        return {
          isError: false,
        };
      }
    } catch (error) {
      return {
        isError: true,
      };
    }
  }
}
