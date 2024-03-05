import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/v1/user";
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

class UserServices {
  async getUserLoanHistory(id: number) {
    try {
      const response = await axios.get(
        `${BASE_REST_API_URL}/userLoanHistory/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

export default new UserServices();
