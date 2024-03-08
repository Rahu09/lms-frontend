import { Button } from "@/components/ui/button";

const UserSetting = () => {
  return (
    <div className="flex flex-col justify-center align-middle">
      <div>
        Update Profile Details <br />
        Check Borrow History <br />
        Check Book Fine <br />
      </div>
      <div>
        {/* redirect the user to the landing page after clicking on logout button, and display a notification that the user has logout */}
        <Button>Logout</Button>
      </div>
    </div>
  );
};

export default UserSetting;
