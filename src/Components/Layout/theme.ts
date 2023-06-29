import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7E9578",//green
      light:"#fff",
      dark:"#000",
    },
    secondary: {
      main: "#40533c",//green dark
      light:'#f7e2d6',//beige light
      dark:"#8c6c5f",//beige dark
    },
    // info:{
    //   main:"#8e8182",
    //   light:"#c4bebe",
    //   dark:"#e3d1c6",
    // },

  },
});
export default theme;