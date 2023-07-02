import { Navigate, useLocation } from "react-router-dom";
import { _token } from "../../Utils/Utils.tsx";


function IsAuth({ children }:{children: React.ReactNode}) {
    const locate = useLocation().pathname;
    return (
      <div>
        {_token ?
        <Navigate to={locate}/>:
        children}
      </div>
    )
  }


  export default IsAuth;