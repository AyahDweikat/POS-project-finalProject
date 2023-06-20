import { useEffect, useState } from "react";
import { GlobalContext } from './../../Context/context.tsx';
import App from "../../App.tsx";

// const cat = localStorage.getItem("myCat");
// localStorage.removeItem("myCat");
function Layout() {
  const [user, setUser] = useState<string>("");
  const [token, setToken] = useState("");
  useEffect(()=>{
    const _token:(string|null) = localStorage.getItem("token");
    setToken(_token||"")
  })
  const auth = {
    user,
    token,
    setToken,
    setUser,
    // signout: () => {
    //   setUser("");
    //   setToken("");
    // },
  };

  return (
    <div>
      <GlobalContext.Provider value={{ auth }}>
        <App/>
      </GlobalContext.Provider>
    </div>
  );
}

export default Layout;
