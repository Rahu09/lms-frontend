import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/v1/admin";
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

class AdminServices {
  async getCategory() {
    try {
      const response = await axios.get(
        `${BASE_REST_API_URL}/getCategory`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async addCategory(category: { category: string }) {
    try {
      const response = await axios.post(
        `${BASE_REST_API_URL}/addCategory`,
        { category: category },
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async deleteCategory(id: number) {
    try {
      const response = await axios.delete(
        `${BASE_REST_API_URL}/deleteCategory/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async returnRequest(UserId: number) {
    try {
      const response = await axios.post(
        `${BASE_REST_API_URL}/returnRequest${UserId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async getBookLoanHistory(bookId: number) {
    try {
      const response = await axios.get(
        `${BASE_REST_API_URL}/bookLoanHistory/${bookId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async getBookReservationHistory(bookId: number) {
    try {
      const response = await axios.get(
        `${BASE_REST_API_URL}/bookReservationHistory/${bookId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async getUserLoanHistory(userId: number) {
    try {
      const response = await axios.post(
        `${BASE_REST_API_URL}/userLoanHistory${userId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async getTotalFine() {
    try {
      const response = await axios.get(
        `${BASE_REST_API_URL}/totalFine`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

export default new AdminServices();
