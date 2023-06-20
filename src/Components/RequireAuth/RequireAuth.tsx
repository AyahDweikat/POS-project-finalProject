import { Navigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../Context/context.tsx";
import { useContext } from "react";

function RequireAuth({ children }) {
  const { auth } = useContext(GlobalContext);
  return (
    <div>{auth?.token.length ? children: <Navigate to={'/login'} /> }</div>
  );
}

export default RequireAuth;
