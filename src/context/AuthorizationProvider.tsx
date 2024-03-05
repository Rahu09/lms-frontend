import { createContext, useContext, useEffect, useState } from "react";

type AuthorizationProviderProps = {
  children: React.ReactNode;
};

interface IAuthorizationContext {
  getAuthData: { token: string } | undefined;
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
  const [data, setData] = useState<{ token: string }>();

  const getAuthData: IAuthorizationContext["getAuthData"] = data;

  useEffect(() => {
    setData({ token: `${localStorage.getItem("token")}` });
  }, []);

  return (
    <AuthorizationContext.Provider value={{ getAuthData }}>
      {children}
    </AuthorizationContext.Provider>
  );
};
