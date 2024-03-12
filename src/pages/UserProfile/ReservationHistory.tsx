import { useAuthorization } from "@/context/AuthorizationProvider";
import { useQuery } from "@tanstack/react-query";
import UserServices from "@/services/UserServices";
import { useNavigate } from "react-router-dom";

const ReservationHistory = () => {
  const navigate = useNavigate();
  const auth = useAuthorization();
  const userID: number | undefined = auth.getAuthData
    ? auth.getAuthData.id!
    : 1;

  //getting reservation history from backend
  const {
    data: ReservationHistorydata,
    status,
    error,
  } = useQuery({
    queryKey: ["user", "userreservationhistory", userID],
    queryFn: () => UserServices.getReservationHistory(userID),
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;

  if (!userID) return <div></div>;

  console.log(ReservationHistorydata);
  return (
    <div>
      <h2>Reservation History</h2>
      <table className="table-auto bg-slate-200">
        <thead>
          <tr>
            <th>Book</th>
            <th>Reserve Date</th>
          </tr>
        </thead>
        <tbody>
          {ReservationHistorydata.map((item) => (
            <tr key={item.id}>
              <td>{item.bookName}</td>
              <td>{item.formattedIssueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationHistory;
