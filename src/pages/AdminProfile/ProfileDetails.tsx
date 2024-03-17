import { useAuthorization } from "@/context/AuthorizationProvider";

const ProfileDetails = () => {
  const auth = useAuthorization();
  const userdata = auth.getAuthData;
  console.log("userdata log: ", userdata);
  return (
    <>
      <p className="font-bold">
        First Name: <span className="font-normal">{userdata?.firstName}</span>
      </p>
      <p className="font-bold">
        Last Name: <span className="font-normal">{userdata?.lastName}</span>
      </p>
      <p className="font-bold">
        Email: <span className="font-normal">{userdata?.email}</span>
      </p>
      <p className="font-bold">
        Contact: <span className="font-normal">{userdata?.contactNo}</span>
      </p>
      <p className="font-bold">
        Address: <span className="font-normal">{userdata?.address}</span>
      </p>
      <p className="font-bold">
        Gender: <span className="font-normal">{userdata?.gender}</span>
      </p>
    </>
  );
};

export default ProfileDetails;
