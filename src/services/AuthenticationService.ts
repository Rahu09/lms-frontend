import axios from "axios";

class AuthenticationService {
  BASE_REST_API_URL = "http://localhost:8080/api/v1/auth";
  config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  async register(requestData: unknown) {
    const response = await axios.post(
      `${this.BASE_REST_API_URL}/register`,
      requestData
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  }

  async login(requestData: { email: string; password: string }) {
    const response = await axios.post(
      `${this.BASE_REST_API_URL}/authenticate`,
      requestData
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  }

  async logout() {
    const response = await axios.get(
      `${this.BASE_REST_API_URL}/logout`,
      this.config
    );
    return response.data;
  }
}

export default new AuthenticationService();
