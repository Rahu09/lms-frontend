import { Button } from "@/components/ui/button";

interface UserSettingProps {
  onButtonClick: (componentName: string) => void;
}
const UserSetting = ({ onButtonClick }: UserSettingProps) => {
  return (
    <div className="flex flex-col justify-center align-middle py-3">
      <div className="flex flex-col justify-center align-middle">
        <Button className="m-1" onClick={() => onButtonClick("UserDetails")}>
          Profile
        </Button>
        <br />
        <Button className="m-1" onClick={() => onButtonClick("UpdateProfile")}>
          Update Profile
        </Button>
        <br />
        <Button className="m-1" onClick={() => onButtonClick("BorrowHistory")}>
          Borrow History
        </Button>
        <br />
        <br />
        <Button
          className="m-1"
          onClick={() => onButtonClick("ReservationHistory")}
        >
          ReservationHistory
        </Button>
        <br />
        <Button className="m-1" onClick={() => onButtonClick("UserFine")}>
          Book Fine
        </Button>
        <br />
      </div>
      <br />
      <br />
      <br />
      <div className="mt-auto">
        {/* redirect the user to the landing page after clicking on logout button, and display a notification that the user has logout */}
        <Button className="m-2">Logout</Button>
      </div>
    </div>
  );
};

export default UserSetting;
