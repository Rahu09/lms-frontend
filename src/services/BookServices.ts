import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/v1/book";
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

type bookRequest = {
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
  imageURL: string;
};

export type bookResponse = {
  id: number;
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
  imageURL: string;
};

class BookServices {
  async getAllBooks(id: number): Promise<bookResponse[]> {
    const response = await axios.get(
      "http://localhost:8080/api/v1/book/books",
      config
    );
    console.log(id);

    console.log("book data", response.data);

    return response.data;
  }

  async deleteBook(id: number) {
    const response = await axios.delete(
      `${BASE_REST_API_URL}/deletebook/${id}`,
      config
    );
    return response.data;
  }

  async addBook(requestData: bookRequest) {
    const response = await axios.post(
      `${BASE_REST_API_URL}/addbook`,
      requestData,
      config
    );
    return response.data;
  }

  async updateBook(id: number, requestData: bookRequest) {
    const response = await axios.put(
      `${BASE_REST_API_URL}/books/${id}`,
      requestData,
      config
    );
    return response.data;
  }

  getBookById: (id: number) => Promise<bookResponse> = async (id) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/books/${id}`,
      config
    );
    return response.data;
  };

  getCategoryByBookId: (id: number) => Promise<string[]> = async (id) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/bookcategory/${id}`,
      config
    );
    return response.data;
  };

  getLoanCount: (id: number) => Promise<number> = async (id) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/bookloancount/${id}`,
      config
    );
    return response.data;
  };

  getReservationCount: (id: number) => Promise<number> = async (id) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/bookreservationcount/${id}`,
      config
    );
    return response.data;
  };

  getUserBookLoanCount: (userEmail: string) => Promise<number> = async (
    userEmail
  ) => {
    const response = await axios.post(
      `${BASE_REST_API_URL}/bookreservationcount`,
      { email: userEmail },
      config
    );
    return response.data;
  };
}

export default new BookServices();
