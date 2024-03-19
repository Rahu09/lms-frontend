import { useAuthorization } from "@/context/AuthorizationProvider";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import UserServices, {
  ReservationHistoryResponse,
  UserFineResponse,
} from "@/services/UserServices";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { ErrorPage } from "@/components/ErrorPage";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const BorrowHistory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [userID, setUserID] = useState<number | null>(null);

  const onSubmit = (loanId: number, amount: number) => {
    UserServices.submitBook(loanId, amount).then((res) => {
      queryClient.invalidateQueries({
        queryKey: ["user", "userFineHistory", userID],
      });
      toast({
        title: "Book Submited!.",
        description: `Your Book have beensubmited successfully.
        submitted amount: ${res.submittedAmount}
        Return amount: ${res.returnAmount}`,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    });
  };
  const [ReservationHistorydata, setReservationHistorydata] =
    useState<ReservationHistoryResponse>([]);
  const [FineHistorydata, setFineHistorydata] = useState<UserFineResponse>([]);

  const hanldeGetDetails = async () => {
    if (userID === null) return;
    UserServices.getReservationHistory(userID).then((res) => {
      setReservationHistorydata(res);
    });
    UserServices.getUserFine(userID).then((res) => {
      setFineHistorydata(res);
    });
    console.log("ReservationHistorydata", ReservationHistorydata);
    console.log("FineHistorydata", FineHistorydata);
  };

  return (
    <div className="h-full overflow-y-auto scroll-smooth py-14">
      <div>
        <input
          type="text"
          value={userID ? userID : ""}
          onChange={(e) => setUserID(parseInt(e.target.value))}
        />
        <Button onClick={hanldeGetDetails}>Get Details</Button>
      </div>
      {ReservationHistorydata.length > 0 && FineHistorydata.length > 0 && (
        <div>
          <div className="flex flex-col justify-center items-center pb-14">
            <h2 className=" font-bold text-4xl pb-10 text-gray-600">
              Reservation History
            </h2>
            <table className="table-auto  w-full">
              <thead>
                <tr className="text-xl text-gray-600">
                  <th>Book Image</th>
                  <th>Book</th>
                  <th>Reserve Date</th>
                </tr>
              </thead>
              <tbody className="">
                {ReservationHistorydata.map((item, index) => (
                  <tr key={index} className="">
                    <td className="py-2">
                      <img
                        src={"data:image/jpeg;base64," + item.imgUrl}
                        alt="bookImage"
                        className="h-20 w-20 object-cover rounded-lg hover:cursor-pointer"
                        onClick={() => navigate(`/bookinfo/${item.bookId}`)}
                      />
                    </td>
                    <td>{item.bookName}</td>
                    <td>{item.formattedIssueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2 className=" font-bold text-4xl pb-10 text-gray-600">
              Rent History
            </h2>
            <table className="table-auto  w-full text-md">
              <thead>
                <tr className="text-xl text-gray-600">
                  <th>Book img</th>
                  <th>Book</th>
                  <th>Status</th>
                  <th>Issue Date</th>
                  <th>Fine</th>
                  <th>Submit</th>
                </tr>
              </thead>
              <tbody className="">
                {FineHistorydata.map((item, index) => (
                  <tr key={index} className="">
                    <td className="py-2">
                      <img
                        src={"data:image/jpeg;base64," + item.imageUrl}
                        alt="bookImage"
                        className="h-20 w-20 object-cover rounded-lg hover:cursor-pointer"
                        onClick={() => navigate(`/bookinfo/${item.bookId}`)}
                      />
                    </td>
                    <td>{item.book}</td>
                    <td>{item.status}</td>
                    <td>{item.formattedIssueDate}</td>
                    <td>{item.fineAmount}</td>
                    <td>
                      {item.formattedReturnDate ? (
                        <div className="font-semibold">
                          <p>Returned on:</p>
                          {item.formattedReturnDate}
                        </div>
                      ) : (
                        <Button
                          className="bg-violet-950 hover:bg-violet-800"
                          onClick={() => {
                            onSubmit(item.id, item.fineAmount);
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowHistory;
