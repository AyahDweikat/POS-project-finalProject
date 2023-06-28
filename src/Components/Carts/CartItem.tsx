/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchApiWithAuthNoBody } from "../fetchApi";
import { Divider, Button } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Cart } from "../Types";
import { useState } from "react";
import styles from './carts.module.css';
import SnackbarComponent from "../../SubComponents/Snackbar";
interface CartItemProps {
  cart: Cart;
  _token: string;
  fetchData: (id: string) => void;
  openCart: (idx: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  cart,
  _token,
  fetchData,
  openCart,
}) => {
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const deleteCart = async (idx: string) => {
    const results = await fetchApiWithAuthNoBody(
      "DELETE",
      `https://posapp.onrender.com/cart/deleteCart/${idx}`,
      `black__${_token}`
    );
    navigate(location.pathname);
    if (results.message == "successs") {
      fetchData(_token);
      setSnackBarMsg("Cart deleted Successfully");
    } else {
      setSnackBarMsg(results.message);
    }
  };
  return (
    <>
      <Card key={cart._id} sx={{ maxWidth: "260px", m: "10px" }}>
        <CardHeader
          action={
            <IconButton
              aria-label="delete"
              sx={{ p: "2px" }}
              onClick={() => deleteCart(cart._id)}
            >
              <DeleteForeverRoundedIcon />
            </IconButton>
          }
          subheader={cart.cartDesc}
        />
        <CardContent sx={{ p: 0, mx: 1, pt: "10px" }}>
          <Typography
            variant="body1"
            color="text.secondary"
            id="cartDiscount"
            className={styles.cartData}
          >
            Discount: {cart.cartDiscount}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            id="cartTax"
            className={styles.cartData}
          >
            Tax: {cart.cartTax}
          </Typography>
        </CardContent>
        <Divider />
        <Button onClick={() => openCart(cart._id)}>
          View More & Edit Cart
        </Button>
      </Card>
      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </>
  );
};

export default CartItem;
