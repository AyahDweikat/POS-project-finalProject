/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import { ListItemText, ListItem } from "@mui/material";
import { Cart, Products } from "../Types";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { fetchApiWithAuthAndBody } from "../fetchApi";
import styles from "./carts.module.css";
import SnackbarComponent from "../../SubComponents/Snackbar";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CloseIcon from "@mui/icons-material/Close";



interface CartScreenProps {
  setIsCartOpenWidely: (state: boolean) => void;
  cart: Cart;
  handleDeleteCart: (idx: string) => void;
  setCart: (cart: Cart) => void;
}
const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  setCart,
  setIsCartOpenWidely,
  handleDeleteCart,
}) => {
  const _token: string = localStorage.getItem("token") || "";
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");

  async function addCartToOrder(idx: string) {
    const { _id, ...newCart } = cart;
    const results = await fetchApiWithAuthAndBody(
      "POST",
      newCart,
      `https://posapp.onrender.com/cart/addCart`,
      `black__${_token}`
    );
    if (results.message == "successs") {
      setSnackBarMsg("Cart Added to Orders");
      handleDeleteCart(idx);
    } else {
      setSnackBarMsg(results.message);
    }
  }
  const calculatePrice = () => {
    let totalPrice = 0;
    cart?.products?.forEach((item) => {
      totalPrice += item.quantity * item.product.productPrice;
    });
    return Number(
      (totalPrice * (1 + cart?.cartTax) * (1 - cart?.cartDiscount)).toFixed(2)
    );
  };
  const updateQuantity = (idx: string, newQuantity: string) => {
    const _newQuantity = Number(newQuantity);
    const updatedProductsList: Products[] = cart?.products.map((product) => {
      if (product.productId == idx) {
        return { ...product, quantity: _newQuantity };
      } else {
        return product;
      }
    });
    const _cart = {
      ...cart,
      products: updatedProductsList,
    };
    setCart(_cart);
  };
  const updateCartData = async (newText: string, key: string) => {
    let _newText: string | number;
    if (key == "cartTax" || key == "cartDiscount") {
      _newText = Number(newText);
    } else {
      _newText = newText;
    }
    const _cart: Cart = {
      ...cart,
      [key]: _newText,
    };
    setCart(_cart);
  };
  const deleteProduct = async (idx: string) => {
    if (cart?.products.length) {
      const newProductsList: Products[] = cart?.products.filter((product) => {
        return product.productId != idx;
      });
      setCart({ ...cart, products: newProductsList });
    }
  };

  return (
    <>
      <Box className={styles.cartSideBar}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Typography
            className={styles.closeBtn}
            onClick={() => {
              setIsCartOpenWidely(false);
              setCart({
                _id: "",
                cartDesc: "",
                cartTax: 0,
                cartDiscount: 0,
                products: [],
              });
            }}
          >
            <CloseIcon sx={{color:"secondary.main"}} />
          </Typography>
          <TextField
            sx={{ my: "10px", width: "80%", ml: "45px" }}
            id="cartDesc"
            label="Description" 
            variant="outlined"
            onChange={(e) => updateCartData(e.target.value, e.target.id)}
            value={cart?.cartDesc || ""}
          />
        </Box>


        <Box sx={{ maxHeight: "300px", overflow: "hidden scroll" }}>
          {cart?.products?.map((product) => {
            return (
              <ListItem
                key={product?.productId}
                className={styles.productItem}
                sx={{ width: "300px" }}
              >
                <TextField
                  id="quantity"
                  label="quantity"
                  type="number"
                  sx={{ width: "50px", ml: "10px" }}
                  onChange={(e) =>
                    updateQuantity(product.productId, e.target.value)
                  }
                  value={product?.quantity}
                  variant="standard"
                />
                <ListItemText
                  className={styles.productData}
                  secondary={product?.product.productPrice + " $"}
                >
                  {product?.product?.productName}
                </ListItemText>
                <Typography
                  sx={{
                    p: "8px",
                  }}
                >
                  {product?.quantity * product?.product.productPrice}$
                </Typography>
                <Typography
                  className={styles.deleteBtn}
                  onClick={() => deleteProduct(product.productId)}
                >
                  <DeleteForeverRoundedIcon sx={{ color: "error.light" }} />
                </Typography>
              </ListItem>
            );
          })}
        </Box>
        <Box sx={{ justifySelf: "flex-end" }}>
            <TextField
              sx={{ my: "10px", mx: "auto", width:"95%" }}
              required
              id="cartDiscount"
              label="Discount" 
              variant="outlined"
              onChange={(e) => updateCartData(e.target.value, e.target.id)}
              value={cart?.cartDiscount || 0}
            />
            <TextField
              sx={{ my: "10px", mx: "auto", width:"95%" }}
              required
              id="cartTax"
              label="Tax" 
              variant="outlined"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => updateCartData(e.target.value, e.target.id)}
              value={cart?.cartTax}
            />
          <Typography className={styles.totalPrice} variant="body1">
            Total Price: {calculatePrice()} $
          </Typography>
          <Button sx={{color:"secondary.main", border:"1px solid #7E9578", mt:"5px"}} fullWidth onClick={() => addCartToOrder(cart?._id || "")}>
              Checkout 
          </Button>
        </Box>
      </Box>
      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </>
  );
};

export default CartScreen;
