import { Navigate, useLocation } from "react-router-dom";
import { GlobalContext } from '../../Context/context.tsx';
import { useContext } from "react";

function IsAuth(props:any) {
    const locate = useLocation().pathname;
    const { auth } = useContext(GlobalContext)
    return (
      <div>
        {auth?.token.length ?
        <Navigate to={locate}/>:
        props.children}
      </div>
    )
  }


  export default IsAuth;