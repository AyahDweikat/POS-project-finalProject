
import Box from "@mui/material/Box";
import { Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { fetchApiWithAuthNoBody } from "../fetchApi";
import CartItem from "./CartItem";
import IconButton from "@mui/material/IconButton";

// import { Button, TextField } from "@mui/material";
// import { Formik } from "formik";

interface ProductInDB {
  _id: string;
  productId: string;
  quantity: number;
}

interface CartInDB {
  _id: string;
  cartDesc: string;
  cartTax: number;
  cartDiscount: number;
  products: Array<ProductInDB>;
}

function Carts() {
  const [open, setOpen] = useState<boolean>(false);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [carts, setCarts] = useState<CartInDB[]>([]);
  
  const _token: string | null = localStorage.getItem("token") || "";

  const fetchData = async (_token: string) => {
    const results = await fetchApiWithAuthNoBody(
      "GET",
      `https://posapp.onrender.com/cart/getCarts`,
      `black__${_token}`
    );
    if (results.CartList) {
      setCarts(results.CartList);
    }
    return results;
  };
  useEffect(() => {
    fetchData(_token);
  }, [_token]);

  // const addUnitRow = async(valuesFromInputs: InputsObj) => {
  //   const results = await fetchApiWithAuthAndBody(
  //     "POST",
  //     valuesFromInputs,
  //     `https://posapp.onrender.com/unit/addUnit`,
  //     `black__${_token}`
  //   );
  //   navigate(location.pathname);
  //   if (results.message == "successs") {
  //     fetchData(_token);
  //     handleShowSnackBar()
  //     setSnackBarMsg("Unit Added Successfully");
  //   } else {
  //     handleShowSnackBar()
  //     setSnackBarMsg(results.message);
  //   }
  // };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Box></Box>
      <Box>
        {carts.map((cart) => {
          return (
            <CartItem _token={_token} carts={carts} cart={cart} setSnackBarMsg={setSnackBarMsg} fetchData={fetchData} setOpen={setOpen} />
          );
        })}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackBarMsg}
        action={action}
      />
    </>
  );
}

export default Carts;
