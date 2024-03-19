import axios from "axios";
import { bookRequest } from "./BookServices";

const BASE_REST_API_URL = "http://localhost:8080/api/v1/admin";
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
export type bookUpdateRequest = {
  title: string;
  isbn: string;
  authorName: string;
  publisherName: string;
  edition: string;
  description: string;
  language: string;
  pages: number;
  cost: number;
  bookCount: number;
  link: string;
};

type CategoryResponseitem = {
  id: number;
  category: string;
  bookList: null;
};
export type CategoryResponse = CategoryResponseitem[];

class AdminServices {
  async getCategory() {
    const response = await axios.get(
      `${BASE_REST_API_URL}/getCategory`,
      config
    );
    return response.data;
  }
  async addCategory(category: { category: string }) {
    const response = await axios.post(
      `${BASE_REST_API_URL}/addCategory`,
      { category: category },
      config
    );
    return response.data;
  }
  async deleteCategory(id: number) {
    const response = await axios.delete(
      `${BASE_REST_API_URL}/deleteCategory/${id}`,
      config
    );
    return response.data;
  }
  async returnRequest(UserId: number) {
    const response = await axios.post(
      `${BASE_REST_API_URL}/returnRequest${UserId}`,
      config
    );
    return response.data;
  }
  async getBookLoanHistory(bookId: number) {
    const response = await axios.get(
      `${BASE_REST_API_URL}/bookLoanHistory/${bookId}`,
      config
    );
    return response.data;
  }
  async getBookReservationHistory(bookId: number) {
    const response = await axios.get(
      `${BASE_REST_API_URL}/bookReservationHistory/${bookId}`,
      config
    );
    return response.data;
  }
  async getUserLoanHistory(userId: number) {
    const response = await axios.post(
      `${BASE_REST_API_URL}/userLoanHistory${userId}`,
      config
    );
    return response.data;
  }
  async getTotalFine() {
    const response = await axios.get(`${BASE_REST_API_URL}/totalFine`, config);
    return response.data;
  }
  updateBook: (book: bookUpdateRequest, id: number) => Promise<bookRequest> =
    async (book, id) => {
      const response = await axios.patch(
        `${BASE_REST_API_URL}/updateBook/${id}`,
        book,
        config
      );
      return response.data;
    };

  deleteBook: (id: number) => Promise<unknown> = async (id) => {
    const response = await axios.delete(
      `${BASE_REST_API_URL}/deleteBook/${id}`,
      config
    );
    return response.data;
  };
}

export default new AdminServices();
