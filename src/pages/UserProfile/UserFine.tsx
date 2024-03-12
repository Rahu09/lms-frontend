import { useAuthorization } from "@/context/AuthorizationProvider";
import { useQuery } from "@tanstack/react-query";
import UserServices from "@/services/UserServices";

const UserFine = () => {
  const auth = useAuthorization();
  const userID: number | undefined = auth.getAuthData
    ? auth.getAuthData.id!
    : 1;

  //getting fine history from backend
  const {
    data: FineHistorydata,
    status,
    error,
  } = useQuery({
    queryKey: ["user", "userloanhistory", userID],
    queryFn: () => UserServices.getUserFine(userID),
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;

  if (!userID) return <div></div>;
  console.log(FineHistorydata);
  return (
    <div>
      <h2>Fine History</h2>
      <table className="table-auto bg-slate-200">
        <thead>
          <tr>
            <th>Book</th>
            <th>Status</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Fine Amount</th>
          </tr>
        </thead>
        <tbody>
          {FineHistorydata.map((item, index) => (
            <tr key={index}>
              <td>{item.book}</td>
              <td>{item.status}</td>
              <td>{item.formattedIssueDate}</td>
              <td>
                {item.formattedReturnDate
                  ? item.formattedReturnDate
                  : "Not Returned"}
              </td>
              <td>{item.fineAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserFine;
