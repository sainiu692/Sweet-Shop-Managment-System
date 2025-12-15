const API_BASE_URL = "https://sweet-shop-managment-system.onrender.com";

class ApiService {
  async request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Request failed" }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  async register(data) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async getSweets() {
    return this.request("/sweets", {
      method: "GET",
    });
  }

  async searchSweets(params) {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append("name", params.name);
    if (params.category) queryParams.append("category", params.category);
    if (params.minPrice)
      queryParams.append("minPrice", params.minPrice.toString());
    if (params.maxPrice)
      queryParams.append("maxPrice", params.maxPrice.toString());

    return this.request(`/sweets/search?${queryParams.toString()}`, {
      method: "GET",
    });
  }

  async createSweet(data) {
    return this.request("/sweets", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateSweet(id, data) {
    return this.request(`/sweets/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteSweet(id) {
    return this.request(`/sweets/${id}`, {
      method: "DELETE",
    });
  }

  async purchaseSweet(id, quantity) {
    return this.request(`/inventory/sweets/${id}/purchase`, {
      method: "POST",
      body: JSON.stringify({ quantity }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async restockSweet(id, quantity) {
    return this.request(`/inventory/sweets/${id}/restock`, {
      method: "POST",
      body: JSON.stringify({ quantity }),
    });
  }
}

export const api = new ApiService();
