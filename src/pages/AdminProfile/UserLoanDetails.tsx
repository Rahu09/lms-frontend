import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserServices, {
  LoanHistoryResponse,
  ReservationHistoryResponse,
} from "@/services/UserServices";

const UserLoanDetails = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [BorrowHistorydata, setBorrowHistorydata] =
    useState<LoanHistoryResponse>([]);

  const [ReservationHistorydata, setReservationHistorydata] =
    useState<ReservationHistoryResponse>([]);

  const [finedata, setFineData] = useState<number>();

  // if (status === "pending") return <div>Loading...</div>;
  // if (status === "error")
  //   return <div>An error has occoured {JSON.stringify(error)}</div>;
  // console.log(BorrowHistorydata);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const BorrowHistoryresult = await UserServices.getBorrowHistory(userId!);
    setBorrowHistorydata(BorrowHistoryresult);
    // BorrowHistorydata = BorrowHistorydatavar ? BorrowHistorydatavar : [];
    console.log(BorrowHistorydata);

    const ReservationHistoryresult = await UserServices.getReservationHistory(
      userId!
    );
    setReservationHistorydata(ReservationHistoryresult);
    console.log(ReservationHistorydata);

    const fineResult = await UserServices.getUserFine(userId!);
    // Calculate the sum of fineAmount where status is "LATE"
    const lateFineSum: number = fineResult
      .filter((item) => item.status === "LATE")
      .reduce((sum, item) => sum + item.fineAmount, 0);

    setFineData(lateFineSum);
    console.log(finedata);
  };

  return (
    <div>
      <h1>UserLoanDetails</h1>
      {/* input area */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="User Id"
          className="border-2"
          onChange={(e) => setUserId(e.target.valueAsNumber)}
        />
        <Button type="submit">Submit</Button>
      </form>
      {/* display total fine for user  */}
      <div>Current Fine: {finedata}</div>
      {/* borrow history table  */}
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
            {BorrowHistorydata &&
              BorrowHistorydata.map((item) => (
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
    </div>
  );
};

export default UserLoanDetails;
