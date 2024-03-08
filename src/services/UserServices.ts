import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/v1/user";
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

type userRequest = {
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

export type userResponse = {
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

  getUserByEmail: (userEmail: string) => Promise<userResponse> = async (
    userEmail
  ) => {
    const response = await axios.post(
      `${BASE_REST_API_URL}/userDet`,
      { email: userEmail },
      config
    );
    return response.data;
  };
}

export default new UserServices();
