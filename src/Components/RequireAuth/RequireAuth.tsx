import { Navigate } from "react-router-dom";
import { _token } from "../Utils/Utils";

function RequireAuth({ children }:{children: React.ReactNode}) {
  return (
    <div>{_token ? children: <Navigate to={'/login'} /> }</div>
  );
}

export default RequireAuth;
