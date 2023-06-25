import { Box, Typography, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ListItemText, ListItem, Badge, IconButton } from "@mui/material";
import { fetchApiWithAuthAndBody, fetchApiWithAuthNoBody } from "../fetchApi";
import CloseIcon from "@mui/icons-material/Close";
import {
  Cart,
  CartInDB,
  ProductToCart,
  Products,
  ProductsInDB,
  fetchCartData,
} from "../Types";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface CartScreenProps {
  productsToCart: Products[];
  indexOfCart: string;
}
const CartScreen: React.FC<CartScreenProps> = ({
  indexOfCart,
  productsToCart,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const _token: string | null = localStorage.getItem("token") || "";
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [cart, setCart] = useState<CartInDB>();

  // const updateProductsCart = async(cart)=>{
  //   const newCart:CartInDB = cart.products.map()
  // };

  useEffect(() => {
    if (indexOfCart.length) {
      getCart(_token, indexOfCart);
    }
  }, [_token, indexOfCart]);

  const getCart = (_token: string, indexOfCart: string) => {
    fetchCartData(_token)
      .then((res: CartInDB[]) => res.find((cart) => cart._id == indexOfCart))
      .then((response: CartInDB | undefined) => {
        if (response) setCart(response);
      });
  };

  const updateCartToDB = async (idx: string) => {
    if (typeof cart != "undefined") {
      const newCart: Cart = turnCartType(cart);
      const results = await fetchApiWithAuthAndBody(
        "PATCH",
        newCart,
        `https://posapp.onrender.com/cart/updateCart/${idx}`,
        `black__${_token}`
      );
      navigate(`${location.pathname}${location.search}`);
      if (results.message == "successs updated") {
        fetchCartData(_token).then((res) => console.log(res));
        handleShowSnackBar();
        setSnackBarMsg("Cart updated Successfully");
      } else {
        handleShowSnackBar();
        // console.log(results);
        setSnackBarMsg(results.message);
      }
    }
  };
  const updateQuantity = (idx: string, newQuantity: string) => {
    const _newQuantity = Number(newQuantity);
    if (typeof cart != "undefined") {
      const deletedProductsList: ProductsInDB[] = cart?.products.map(
        (product) => {
          if (product.productId == idx) {
            return { ...product, quantity: _newQuantity };
          } else {
            return product;
          }
        }
      );
      setCart({
        ...cart,
        _id: cart._id || "",
        cartDesc: cart.cartDesc || "",
        cartDiscount: cart.cartDiscount || 0,
        cartTax: cart.cartTax || 0,
        products: deletedProductsList,
      });
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
      const _cart: CartInDB = {
        ...cart,
        cartDesc: cart.cartDesc || "",
        cartDiscount: cart.cartDiscount || 0,
        cartTax: cart.cartTax || 0,
        [key]: _newText,
      };
      setCart(_cart);
    }
  };
  const turnCartType = (cart: CartInDB) => {
    const updatedProductsList: Products[] | undefined = cart?.products.map(
      (product) => {
        const { _id, ...obj } = product;
        return obj;
      }
    );
    const _updatedCart = {
      ...cart,
      products: updatedProductsList || [],
    };
    const { _id, ...obj } = _updatedCart;
    return obj;
  };
  const handleShowSnackBar = () => {
    setOpen(true);
  }; //
  const deleteProduct = async (idx: string) => {
    if (typeof cart != "undefined") {
      const deletedProductsList: ProductsInDB[] = cart?.products.filter(
        (product) => {
          return product.productId != idx;
        }
      );
      setCart({
        ...cart,
        _id: cart._id || "",
        cartDesc: cart.cartDesc || "",
        cartDiscount: cart.cartDiscount || 0,
        cartTax: cart.cartTax || 0,
        products: deletedProductsList,
      });
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
          height: "92vh",
          backgroundColor: "white",
          width: "45%",
          borderRadius: "8px",
          mt: "-60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ pt: "22px", px: "10px" }} variant="body1">
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
                // <Badge
                //   badgeContent={"X"}
                //   key={product?.productId}
                //   color="primary"
                //   sx={{ width: "90%", cursor: "pointer" }}
                //   onClick={() => deleteProduct(product.productId)}
                // >
                  <ListItem
                  key={product?.productId}
                    sx={{
                      backgroundColor: "#eee5e5",
                      m: "0px",
                      p: "0",
                      mb: "15px",
                    }}
                    secondaryAction={
                      <Typography
                        sx={{
                          border: "1px solid grey",
                          borderRadius: "50%",
                          p: "8px",
                        }}
                      >
                        {product?.quantity* product?.product.productPrice}$
                      </Typography>
                    }
                  >
                    <TextField
                      id="quantity"
                      label="quantity"
                      type="number"
                      sx={{ width: "50px", ml: "10px" }}
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      onChange={(e) =>
                        updateQuantity(product.productId, e.target.value)
                      }
                      value={product?.quantity || 1}
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
                // </Badge>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateCartData(e.target.value, e.target.id)}
              value={cart?.cartTax || 0}
            />
          </Box>
          <Divider />
          <Button onClick={() => updateCartToDB(cart?._id || "")}>
            Update Cart
          </Button>
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
