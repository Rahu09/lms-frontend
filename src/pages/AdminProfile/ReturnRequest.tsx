import { Button } from "@/components/ui/button";

const ReturnRequest = () => {
  return (
    <div>
      ReturnRequest
      <br />
      <Button>Send Warning Request</Button>
      <Button>Send Return Request</Button>
      <p>Warning User Count: </p>
      {/* display count of people who have late warning ie dateofissue - today's date = 9 */}
      <p>Late User Count: </p>
      {/* display count loans in table with loan status as Late  */}
      <h1>Late Loan Table</h1>
      {/* display loans in table with loan status as Late  */}
      <h1>Late Loans</h1>
    </div>
  );
};

export default ReturnRequest;
