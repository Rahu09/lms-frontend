import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserDetails from "./UserDetails";
import UserSetting from "./UserSetting";

const ProfileBase = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-row">
        <div>
          <UserSetting />
        </div>
        <div>
          <UserDetails />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfileBase;
