import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children, ...rest }: any) => {
  const [isAdmin, setIsAdmin] = useState(-1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    setIsAdmin(token ? 1 : 0);
  }, []);

  if (isAdmin === 1) {
    return children;
  } else if (isAdmin === 0) {
    console.log("login");

    return <Navigate to="/login" replace={false} />;
  }
  return <></>;
};
