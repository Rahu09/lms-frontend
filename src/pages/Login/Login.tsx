import React from "react";
import AuthenticationService from "@/services/AuthenticationService";
import { useAuthorization } from "@/context/AuthorizationProvider";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const auth = useAuthorization();

  const handlesubmit = () => {
    console.log(email, password);
    const requestData = {
      email: email,
      password: password,
    };
    AuthenticationService.login(requestData).then((response) => {
      console.log(response);
      window.location.reload();
    });
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div>
          <h5>Email:</h5>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "30vw" }}
          />
        </div>
        <div>
          <h5>Password:</h5>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "30vw" }}
          />
        </div>
        <button onClick={handlesubmit}>Log In</button>
      </div>
    </div>
  );
};
