/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchApiWithAuthNoBody } from "../fetchApi";
import { Checkbox, Divider, Button, Snackbar } from "@mui/material";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { GlobalContext } from "../../Context/context";
import { CartInDB } from "../Types";
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';




interface CartItemProps {
  cart: CartInDB;
  _token: string;
  fetchData: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  cart,
  _token,
  fetchData,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const {neededObj} = useContext(GlobalContext)


  

  const deleteCart = async (idx: string) => {
    const results = await fetchApiWithAuthNoBody(
      "DELETE",
      `https://posapp.onrender.com/cart/deleteCart/${idx}`,
      `black__${_token}`
    );
    navigate(location.pathname);
    if (results.message == "successs") {
      fetchData(_token);
      handleShowSnackBar();
      setSnackBarMsg("Cart deleted Successfully");
    } else {
      handleShowSnackBar();
      setSnackBarMsg(results.message);
    }
  };//

  const openCart =(cart:CartInDB)=>{
    neededObj.cart = cart;
    navigate(`/products?indexOfCart=${cart._id}`)
  }//
  
  const handleShowSnackBar = () => {
    setOpen(true);
  };//
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
    <Card key={cart._id} sx={{ maxWidth: 400, m: "10px" }}>
      <CardHeader
        avatar={<Checkbox sx={{ color: "black" }} checked={true} />}
        action={
          <IconButton
            aria-label="delete"
            sx={{ p: "2px" }}
            onClick={() => deleteCart(cart._id)}
          >
            <DeleteForeverRoundedIcon />
          </IconButton>
        }
        title={"Code:"}
        subheader={cart._id}
      />
      <CardContent
        sx={{
          p: 0,
          mx: 1,
          pt: "10px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            fontSize: "18px",
            p: 0,
            m: 0,
            textTransform: "capitalize",
          }}
          color="text.primary"
          id="cartDesc"
        >
          Description: {cart.cartDesc}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          id="cartDiscount"
          sx={{
            textTransform: "capitalize",
            textAlign: "left",
          }}
        >
          Discount: {cart.cartDiscount}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          id="cartTax"
          sx={{
            textTransform: "capitalize",
            textAlign: "left",
          }}
        >
          Tax: {cart.cartTax}
        </Typography>
      </CardContent>
      <Divider />
      <Button onClick={()=>openCart(cart)}>View More & Edit Cart</Button>
    </Card>
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={()=>setOpen(false)}
        message={snackBarMsg}
        action={action}
      />
    </>
  );
};

export default CartItem;
