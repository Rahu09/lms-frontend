import AuthenticationService from "@/services/AuthenticationService";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type AuthorizationProviderProps = {
  children: React.ReactNode;
};

type DataProps = {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  id: number;
  contactNo: string;
  address: string;
  noOfBooksLoan: number;
  gender: string;
};

interface IAuthorizationContext {
  getAuthData: DataProps;
}

const AuthorizationContext = createContext<IAuthorizationContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthorization = () => {
  const auth = useContext(AuthorizationContext);
  if (!auth)
    throw new Error(
      "useAuthorization must be used within a AuthorizationProvider"
    );
  return auth;
};

export const AuthorizationProvider: React.FC<AuthorizationProviderProps> = ({
  children,
}) => {
  const { data, status, error } = useQuery({
    queryKey: ["details"],
    queryFn: () => AuthenticationService.getDetails(),
  });
  if (status === "pending") console.log("fetching userdetails");
  if (status === "error") console.log("error in userDetails", error);

  const getAuthData: IAuthorizationContext["getAuthData"] = data;

  return (
    <AuthorizationContext.Provider value={{ getAuthData }}>
      {children}
    </AuthorizationContext.Provider>
  );
};
