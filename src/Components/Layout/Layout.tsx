import { useEffect, useState } from "react";
import { GlobalContext } from './../../Context/context.tsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Utils/theme.ts";
import { _token } from "../Utils/Utils.tsx";



function Layout({ children }:{children: React.ReactNode}) {
  const [user, setUser] = useState<string>("");
  const [token, setToken] = useState<string>("");
  useEffect(()=>{
    setToken(_token)
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
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
      </GlobalContext.Provider>
    </div>
  );
}

export default Layout;
