import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/v1/user";
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

type userRequest = {
  firstName: string;
  lastName: string;
  contactNo: string;
  address: string;
  gender: string;
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

type BorrowHistoryItem = {
  id: number;
  issueDate: string;
  returnDate: string | null;
  status: string;
  book: string;
  formattedIssueDate: string;
  formattedReturnDate: string | null;
};

type ReservationHistoryItem = {
  id: null;
  user: null;
  book: null;
  issueTimestamp: string;
  bookName: string;
  formattedIssueDate: string;
};

type UserFineItem = {
  id: number;
  book: string;
  status: string;
  issueDate: string;
  returnDate: string | null;
  fineAmount: number;
  user: string;
  formattedIssueDate: string;
  formattedReturnDate: string | null;
};
type UserFineResponse = UserFineItem[];
type ReservationHistoryResponse = ReservationHistoryItem[];
type LoanHistoryResponse = BorrowHistoryItem[];

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

  getUserFine: (id: number) => Promise<UserFineResponse> = async (id) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/userFine/${id}`,
      config
    );

    const fineHistory: UserFineItem[] = response.data.map(
      (item: UserFineItem) => ({
        ...item,
        formattedIssueDate: new Date(item.issueDate).toLocaleDateString(
          "en-GB"
        ),
        formattedReturnDate: item.returnDate
          ? new Date(item.returnDate).toLocaleDateString("en-GB")
          : null,
      })
    );
    return fineHistory;
  };

  getBorrowHistory: (id: number) => Promise<LoanHistoryResponse> = async (
    id
  ) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/userLoanHistory/${id}`,
      config
    );

    const loanHistory: BorrowHistoryItem[] = response.data.map(
      (item: BorrowHistoryItem) => ({
        ...item,
        formattedIssueDate: new Date(item.issueDate).toLocaleDateString(
          "en-GB"
        ),
        formattedReturnDate: item.returnDate
          ? new Date(item.returnDate).toLocaleDateString("en-GB")
          : null,
      })
    );
    return loanHistory;
  };

  async updateUser(userData: { id: number; requestData: userRequest }) {
    try {
      const { id, requestData } = userData;
      const response = await axios.put(
        `${BASE_REST_API_URL}/userdetails/${id}`,
        requestData,
        config
      );
      return response.data; // Return the data received from the server
    } catch (error) {
      throw new Error("Failed to update user"); // Throw an error if update fails
    }
  }
  getReservationHistory: (id: number) => Promise<ReservationHistoryResponse> =
    async (id) => {
      const response = await axios.get(
        `${BASE_REST_API_URL}/userReservationHistory/${id}`,
        config
      );

      const reservationHistory: ReservationHistoryItem[] = response.data.map(
        (item: ReservationHistoryItem) => ({
          ...item,
          formattedIssueDate: new Date(item.issueTimestamp).toLocaleDateString(
            "en-GB"
          ),
        })
      );
      return reservationHistory;
    };
}

export default new UserServices();
