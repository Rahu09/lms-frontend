import UserServices from "@/services/UserServices";
import { useQuery } from "@tanstack/react-query";
const UserDetails = () => {
  const email = "";
  const { data, status, error } = useQuery({
    queryKey: ["bookcategory", email],
    queryFn: () => UserServices.getUserByEmail(email),
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;

  console.log("category log: ", data);
  return (
    <>
      <p>
        First Name: <span className="font-normal">{}</span>
      </p>
      <p>
        Last Name: <span className="font-normal">{}</span>
      </p>
      <p>
        Email: <span className="font-normal">{}</span>
      </p>
      <p>
        Contact: <span className="font-normal">{}</span>
      </p>
      <p>
        Address: <span className="font-normal">{}</span>
      </p>
      <p>
        Gender: <span className="font-normal">{}</span>
      </p>
      <p>
        No of Books currently Borrowed: <span className="font-normal">{}</span>
      </p>
    </>
  );
};

export default UserDetails;
