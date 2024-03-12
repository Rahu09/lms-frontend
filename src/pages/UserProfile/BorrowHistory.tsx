import { useAuthorization } from "@/context/AuthorizationProvider";
import { useQuery } from "@tanstack/react-query";
import UserServices from "@/services/UserServices";
import { useNavigate } from "react-router-dom";

const BorrowHistory = () => {
  const navigate = useNavigate();
  const auth = useAuthorization();
  const userID: number | undefined = auth.getAuthData
    ? auth.getAuthData.id!
    : 1;

  //getting borrow history from backend
  const {
    data: BorrowHistorydata,
    status,
    error,
  } = useQuery({
    queryKey: ["user", "userloanhistory", userID],
    queryFn: () => UserServices.getBorrowHistory(userID),
  });

  if (status === "pending") return <div>Loading...</div>;

  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;

  if (!userID) return <div></div>;
  console.log(BorrowHistorydata);

  return (
    <div>
      <h2>Borrow History</h2>
      <table className="table-auto bg-slate-200">
        <thead>
          <tr>
            <th>Book</th>
            <th>Status</th>
            <th>Issue Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {BorrowHistorydata.map((item) => (
            <tr key={item.id}>
              <td>{item.book}</td>
              <td>{item.status}</td>
              <td>{item.formattedIssueDate}</td>
              <td>
                {item.formattedReturnDate
                  ? item.formattedReturnDate
                  : "Not Returned"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowHistory;
