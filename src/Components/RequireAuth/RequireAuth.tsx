import { Navigate } from "react-router-dom";

function RequireAuth({ children }:{children: React.ReactNode}) {
  const _token:(string|null) = localStorage.getItem("token");
  return (
    <div>{_token ? children: <Navigate to={'/login'} /> }</div>
  );
}

export default RequireAuth;
