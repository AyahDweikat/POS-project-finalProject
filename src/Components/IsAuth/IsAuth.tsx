import { Navigate, useLocation } from "react-router-dom";
// import { GlobalContext } from '../../Context/context.tsx';
// import { useContext } from "react";

function IsAuth({ children }:{children: React.ReactNode}) {
    const locate = useLocation().pathname;
    const _token:(string|null) = localStorage.getItem("token");
    return (
      <div>
        {_token ?
        <Navigate to={locate}/>:
        children}
      </div>
    )
  }


  export default IsAuth;