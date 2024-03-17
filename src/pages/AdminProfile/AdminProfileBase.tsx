import React, { useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProfileDetails from "./ProfileDetails";
import UpdateProfile from "./UpdateProfile";
import UserLoanDetails from "./UserLoanDetails";
import AddCategory from "./AddCategory";

import ReturnRequest from "./ReturnRequest";
import ProfileSetting from "./ProfileSetting";

const AdminProfileBase = () => {
  const [selectedComponent, setSelectedComponent] = useState(
    <ProfileDetails />
  );

  const handleButtonClick = (componentName: string) => {
    switch (componentName) {
      case "ProfileDetails":
        setSelectedComponent(<ProfileDetails />);
        break;
      case "UpdateProfile":
        setSelectedComponent(<UpdateProfile />);
        break;
      case "UserLoanDetails":
        setSelectedComponent(<UserLoanDetails />);
        break;
      case "AddCategory":
        setSelectedComponent(<AddCategory />);
        break;
      case "ReturnRequest":
        setSelectedComponent(<ReturnRequest />);
        break;
      default:
        setSelectedComponent(<ProfileDetails />);
    }
  };
  return (
    <MaxWidthWrapper>
      <div className="flex flex-row">
        <div className="flex-grow-2 align-top justify-start">
          <ProfileSetting onButtonClick={handleButtonClick} />
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

export default AdminProfileBase;
