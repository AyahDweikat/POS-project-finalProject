/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { ListItemText, ListItem, IconButton } from "@mui/material";
// import { fetchApiWithAuthAndBody } from "../fetchApi";
import CloseIcon from "@mui/icons-material/Close";
import { Cart, Products } from "../Types";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { fetchApiWithAuthAndBody } from "../fetchApi";
// import { useLocation, useNavigate } from "react-router-dom";

interface CartScreenProps {
  setIsCartOpenWidely: (state: boolean) => void;
  cart: Cart | undefined;
  setCart: (cart: Cart) => void;
}
const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  setIsCartOpenWidely,
  setCart,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const _token: string = localStorage.getItem("token") || "";
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");

  async function updateCartToDB(_cart: Cart | undefined = cart, idx: string) {
    if (typeof cart != "undefined") {
      const { _id, ...newCart } = cart;
      console.log(newCart);
      const results = await fetchApiWithAuthAndBody(
        "POST",
        newCart,
        `https://posapp.onrender.com/cart/addCart`,
        `black__${_token}`
      );
      if (results.message == "successs updated") {
        handleShowSnackBar();
        setSnackBarMsg("Cart updated Successfully");
      } else {
        handleShowSnackBar();
        console.log(results);
        setSnackBarMsg(results.message);
      }
    }
  }
  const calculatePrice = () => {
    let totalPrice = 0;
    if (typeof cart != "undefined") {
      cart?.products?.forEach((item) => {
        totalPrice += item.quantity * item.product.productPrice;
      });
      return Number(
        (totalPrice * (1 + cart?.cartTax) * (1 - cart?.cartDiscount)).toFixed(2)
      );
    }
    return 0;
  };
  const updateQuantity = (idx: string, newQuantity: string) => {
    const _newQuantity = Number(newQuantity);
    if (typeof cart != "undefined") {
      const updatedProductsList: Products[] = cart?.products.map((product) => {
        if (product.productId == idx) {
          return { ...product, quantity: _newQuantity };
        } else {
          return product;
        }
      });
      const _cart = {
        ...cart,
        _id: cart._id || "",
        cartDesc: cart.cartDesc || "",
        cartDiscount: cart.cartDiscount || 0,
        cartTax: cart.cartTax || 0,
        products: updatedProductsList,
      };
      setCart(_cart);
    }
  };

  const updateCartData = async (newText: string, key: string) => {
    let _newText: string | number;
    if (key == "cartTax" || key == "cartDiscount") {
      _newText = Number(newText);
    } else {
      _newText = newText;
    }
    if (typeof cart !== "undefined") {
      const _cart: Cart = {
        ...cart,
        cartDesc: cart.cartDesc || "",
        cartDiscount: cart.cartDiscount || 0,
        cartTax: cart.cartTax || 0,
        [key]: _newText,
      };
      setCart(_cart);
    }
  };
  const handleShowSnackBar = () => {
    setOpen(true);
  };
  const deleteProduct = async (idx: string) => {
    if (typeof cart != "undefined" && cart?.products.length) {
      const newProductsList: Products[] = cart?.products.filter((product) => {
        return product.productId != idx;
      });
      setCart({ ...cart, products: newProductsList });
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Box
        sx={{
          height: "90vh",
          backgroundColor: "white",
          width: "25%",
          borderRadius: "8px",
          mt: "-20px",
          px: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                border: "1px solid black",
                backgroundColor: "white",
                color: "black",
                px: "4px",
                py: "1px",
                position: "absolute",
                top: "10px",
                left: "-10px",
                fontSize: "15px",
                cursor: "pointer",
              }}
              onClick={() =>{
                setIsCartOpenWidely(false)
                setCart({_id:"", cartDesc:"", cartTax:0, cartDiscount:0,products:[]})
              }}
            >
              X
            </Typography>
            <Typography
              sx={{ pt: "15px", pl: "30px", pr: "10px" }}
              variant="body1"
            >
              Description
            </Typography>
            <TextField
              sx={{ my: "10px", width: "70%", mr: "10px" }}
              required
              id="cartDesc"
              variant="standard"
              onChange={(e) => updateCartData(e.target.value, e.target.id)}
              value={cart?.cartDesc || ""}
            />
          </Box>

          <Box>
            {cart?.products?.map((product) => {
              return (
                <ListItem
                  key={product?.productId}
                  sx={{
                    backgroundColor: "#eee5e5",
                    m: "0px",
                    p: "0",
                    mb: "15px",
                    position: "relative",
                  }}
                  secondaryAction={
                    <Typography
                      sx={{
                        border: "1px solid grey",
                        borderRadius: "50%",
                        p: "8px",
                      }}
                    >
                      {product?.quantity * product?.product.productPrice}$
                    </Typography>
                  }
                >
                  <Box>
                    <Typography
                      sx={{
                        border: "1px solid black",
                        backgroundColor: "black",
                        color: "white",
                        px: "4px",
                        py: "1px",
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        borderRadius: "50%",
                        fontSize: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteProduct(product.productId)}
                    >
                      X
                    </Typography>
                  </Box>
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
                    sx={{
                      ml: "20px",
                      mr: "8px",
                      textTransform: "capitalize",
                      outline: "none",
                    }}
                    secondary={product?.product.productPrice + " $"}
                  >
                    {product?.product?.productName}
                  </ListItemText>
                </ListItem>
              );
            })}
          </Box>
        </Box>

        <Box sx={{ justifySelf: "flex-end" }}>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ pt: "22px", pl: "10px" }} variant="body1">
              Discount
            </Typography>
            <TextField
              sx={{ my: "10px", width: "20%", mr: "10px" }}
              required
              id="cartDiscount"
              variant="standard"
              onChange={(e) => updateCartData(e.target.value, e.target.id)}
              value={cart?.cartDiscount || 0}
            />
          </Box>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ pt: "22px", pl: "10px" }} variant="body1">
              Tax
            </Typography>
            <TextField
              sx={{ my: "10px", width: "20%", mr: "10px" }}
              required
              id="cartTax"
              variant="standard"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => updateCartData(e.target.value, e.target.id)}
              value={cart?.cartTax || 0}
            />
          </Box>
          <Divider />
          <Button onClick={() => updateCartToDB(cart, cart?._id || "")}>
            Checkout
          </Button>
          <Divider />
          <Typography
            sx={{
              py: "10px",
              pl: "10px",
              backgroundColor: "red",
              color: "white",
              fontWeight: "600",
            }}
            variant="body1"
          >
            Total {calculatePrice()} $
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={snackBarMsg}
        action={action}
      />
    </>
  );
};

export default CartScreen;
