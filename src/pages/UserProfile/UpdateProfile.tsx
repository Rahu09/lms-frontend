import { useAuthorization } from "@/context/AuthorizationProvider";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import UserServices from "@/services/UserServices";
import { Button } from "@/components/ui/button";

type formDataProps = {
  firstName: string;
  lastName: string;
  contactNo: string;
  address: string;
  gender: string;
};

const UpdateProfile = () => {
  const auth = useAuthorization();
  const userdata = auth.getAuthData;
  console.log("userdata log: ", userdata);

  const [formData, setFormData] = useState<formDataProps>({
    firstName: userdata ? userdata?.firstName : "",
    lastName: userdata ? userdata?.lastName : "",
    contactNo: userdata ? userdata?.contactNo : "",
    address: userdata ? userdata?.address : "",
    gender: userdata ? userdata?.gender : "",
  });

  const userId = userdata ? userdata.id : 1;

  const mutation = useMutation({
    mutationFn: (formData: formDataProps) =>
      UserServices.updateUser({ id: userId, requestData: formData }),
    onSuccess: () => console.log("Update success"),
    onError: () => console.log("Update Error"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData); // Call mutate with formData
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-3xl content-center">Update Profile</div>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contactNo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="TRANSGENDER">Transgender</option>
          <option value="NON_BINARY">Non-binary</option>
          <option value="PREFER_NOT_TO_RESPOND">Prefer not to respond</option>
        </select>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default UpdateProfile;
