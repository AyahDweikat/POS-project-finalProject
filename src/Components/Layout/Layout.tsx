import { useEffect, useState } from "react";
import { GlobalContext } from './../../Context/context.tsx';

// const cat = localStorage.getItem("myCat");
// localStorage.removeItem("myCat");
function Layout({ children }:{children: React.ReactNode}) {
  const [user, setUser] = useState<string>("");
  const [token, setToken] = useState<string>("");
  useEffect(()=>{
    const _token:(string|null) = localStorage.getItem("token");
    setToken(_token||"")
  },[])
  const auth = {
    user,
    token,
    setToken,
    setUser,
    signout: () => {
      setUser("");
      setToken("");
    },
  };

  const neededObj = {cart:{}}

  return (
    <div>
      <GlobalContext.Provider value={{ auth, neededObj }}>
        {children}
      </GlobalContext.Provider>
    </div>
  );
}

export default Layout;
