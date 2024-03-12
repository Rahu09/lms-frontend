import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserDetails from "./UserDetails";
import UserSetting from "./UserSetting";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import BorrowHistory from "./BorrowHistory";
import UserFine from "./UserFine";
import ReservationHistory from "./ReservationHistory";

const ProfileBase = () => {
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>(
    <UserDetails />
  );

  const handleButtonClick = (componentName: string) => {
    switch (componentName) {
      case "UserDetails":
        setSelectedComponent(<UserDetails />);
        break;
      case "UpdateProfile":
        setSelectedComponent(<UpdateProfile />);
        break;
      case "BorrowHistory":
        setSelectedComponent(<BorrowHistory />);
        break;
      case "UserFine":
        setSelectedComponent(<UserFine />);
        break;
      case "ReservationHistory":
        setSelectedComponent(<ReservationHistory />);
        break;
      default:
        setSelectedComponent(<UserDetails />);
    }
  };
  return (
    <MaxWidthWrapper>
      <div className="flex flex-row">
        <div className="flex-grow-2 align-top justify-start">
          <UserSetting onButtonClick={handleButtonClick} />
        </div>
        <div className="flex-grow-2">
          {selectedComponent && (
            <div className="flex-grow-2">{selectedComponent}</div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfileBase;
