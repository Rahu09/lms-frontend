import { Button } from "@/components/ui/button";
interface ProfileSettingProps {
  onButtonClick: (componentName: string) => void;
}
const ProfileSetting = ({ onButtonClick }: ProfileSettingProps) => {
  return (
    <div className="flex flex-col justify-center align-middle py-3">
      <div className="flex flex-col justify-center align-middle">
        <Button className="m-1" onClick={() => onButtonClick("ProfileDetails")}>
          Profile
        </Button>
        <br />
        <Button className="m-1" onClick={() => onButtonClick("UpdateProfile")}>
          Update Profile
        </Button>
        <br />
        <Button
          className="m-1"
          onClick={() => onButtonClick("UserLoanDetails")}
        >
          UserLoanDetails
        </Button>
        <br />
        <br />
        <Button className="m-1" onClick={() => onButtonClick("AddCategory")}>
          AddCategory
        </Button>
        <br />
        <Button className="m-1" onClick={() => onButtonClick("UpdateBook")}>
          UpdateBook
        </Button>
        <br />
        <br />
        <Button className="m-1" onClick={() => onButtonClick("ReturnRequest")}>
          ReturnRequest
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

export default ProfileSetting;
