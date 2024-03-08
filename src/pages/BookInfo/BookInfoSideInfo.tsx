import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import BookServices from "@/services/BookServices";
interface Props {
  cost: number;
  bookId: number;
  bookCount: number;
}
const BookInfoSideInfo = ({ cost, bookId, bookCount }: Props) => {
  // Get loan count for book
  const {
    data: loanCountData,
    status: loanCountStatus,
    error: loanCountError,
  } = useQuery({
    queryKey: ["loanCount", bookId],
    queryFn: () => BookServices.getLoanCount(bookId),
  });

  // Get reservation count for book
  const {
    data: reservationCountData,
    status: reservationCountStatus,
    error: reservationCountError,
  } = useQuery({
    queryKey: ["reservationCount", bookId],
    queryFn: () => BookServices.getReservationCount(bookId),
  });

  //get userEmail
  const userEmail = "";

  //get user book limit from useremail
  const {
    data: userbookloancount,
    status: userbookloancountStatus,
    error: userbookloancountError,
  } = useQuery({
    queryKey: ["reservationCount", userEmail],
    queryFn: () => BookServices.getUserBookLoanCount(userEmail),
  });
  if (loanCountStatus === "pending") return <div>Loading...</div>;
  if (loanCountStatus === "error")
    return <div>An error has occurred {JSON.stringify(loanCountError)}</div>;

  console.log("loanCountData log: ", loanCountData);

  if (reservationCountStatus === "pending") return <div>Loading...</div>;
  if (reservationCountStatus === "error")
    return (
      <div>An error has occurred {JSON.stringify(reservationCountError)}</div>
    );
  console.log("reservationCountData log: ", reservationCountData);

  if (userbookloancountStatus === "pending") return <div>Loading...</div>;
  if (userbookloancountStatus === "error")
    return (
      <div>An error has occurred {JSON.stringify(userbookloancountError)}</div>
    );
  console.log("reservationCountData log: ", userbookloancount);

  const availableBooks = bookCount - loanCountData;
  let buttonText = "Borrow";
  const bookLimit = userbookloancount; //get user book limit

  return (
    <>
      <div className="flex flex-col align-middle justify-center border-black rounded-xl border-4 px-16">
        <p className="font-bold">More Information</p>
        <p>Cost: {cost}</p>
        {availableBooks > 0 ? (
          <p>
            Availability: <span>{availableBooks}</span>
          </p>
        ) : (
          <>
            <p>
              Reservation: <span>{reservationCountData}</span>
            </p>
            {(buttonText = "Reserve")}
          </>
        )}
      </div>
      <div className="flex justify-center align-middle pt-2">
        {/* if all the books have been rented, ie books count is zero , then we display Reserve here and redirect to createReservation page */}
        {/* disable the button if the user limit has reached to borrow  get the user data*/}
        <Button disabled={bookLimit === 5}>{buttonText}</Button>
        {bookLimit === 5 ? (
          <p className="text-red-600">
            User borrow limit of 5 books is reached. Please return a book to
            borrow this.
          </p>
        ) : null}
      </div>
    </>
  );
};

export default BookInfoSideInfo;
