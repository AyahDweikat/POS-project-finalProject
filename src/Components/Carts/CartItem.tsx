import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchApiWithAuthAndBody, fetchApiWithAuthNoBody } from "../fetchApi";
import { Box, Checkbox, Divider } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";



interface ProductItemDB {
  productName: string;
  productCategory: string;
  productPrice: number;
  measureUnit: string;
}
interface ProductsInDB {
  _id: string;
  productId:string;
  product: ProductItemDB;
  quantity: number;
}
interface Products {
  productId:string;
  product: ProductItemDB;
  quantity: number;
}
interface CartInDB {
  _id: string;
  cartDesc: string;
  cartTax: number;
  cartDiscount: number;
  products: Array<ProductsInDB>;
}
interface Cart {
  cartDesc: string;
  cartTax: number;
  cartDiscount: number;
  products: Array<Products>;
}
interface CartItem {
  cart: CartInDB;
  carts: CartInDB[];
  setSnackBarMsg: (id: string) => void;
  _token: string;
  fetchData: (id: string) => void;
  setOpen: (id: boolean) => void;
}

const CartItem: React.FC<CartItem> = ({
  cart,
  setSnackBarMsg,
  _token,
  fetchData,
  setOpen,
  carts,
}) => {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(cart)
  const updateCartData = async (idx: string, newText: string, key: string) => {
    let _newText: string | number;
    if (key == "cartTax" || key == "cartDiscount") {
      _newText = Number(newText.split(":")[1]);
    } else {
      _newText = newText.split(":")[1];
    }
    const updatedCart: CartInDB | undefined = carts.find(
      (item) => item._id === idx
    );
    if (!updatedCart) {
      throw new Error("Cart is not found");
    }
    if (updatedCart[key as keyof CartInDB] == newText) {
      throw new Error("Changes are the same");
    } else {
      const updatedProductsList: Products[] = updatedCart.products.map(
        (product) => {
          const { _id, ...obj } = product;
          return obj;
        }
      );
      const _updatedCart = {
        ...updatedCart,
        products: updatedProductsList,
      };
      const { _id, ...obj } = _updatedCart;
      const newCart: Cart = { ...obj, [key]: _newText };
      const results = await fetchApiWithAuthAndBody(
        "PATCH",
        newCart,
        `https://posapp.onrender.com/cart/updateCart/${idx}`,
        `black__${_token}`
      );
      navigate(location.pathname);
      if (results.message == "successs updated") {
        fetchData(_token);
        handleShowSnackBar();
        setSnackBarMsg("Unit updated Successfully");
      } else {
        handleShowSnackBar();
        console.log(results);
        setSnackBarMsg(results.message);
      }
    }
  };
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
  };





  const deleteProduct = async(idx:string)=>{
    const deletedProductsList: (ProductsInDB)[] = cart.products.filter(
      (product) => {
          return product.productId != idx;
      }
    );
    const updatedProductsList: (Products| undefined)[] = deletedProductsList.map(
      (product) => {
          const { _id, ...obj } = product;
          return obj;
      }
    );
    console.log(updatedProductsList)
    const _updatedCart = {
      ...cart,
      products: updatedProductsList,
    };
    const { _id, ...newCart } = _updatedCart;
    const results = await fetchApiWithAuthAndBody(
      "PATCH",
      newCart,
      `https://posapp.onrender.com/cart/updateCart/${_id}`,
      `black__${_token}`
    );
    navigate(location.pathname);
    if (results.message == "successs updated") {
      fetchData(_token);
      handleShowSnackBar();
      setSnackBarMsg("Cart updated Successfully");
    } else {
      handleShowSnackBar();
      console.log(results);
      setSnackBarMsg(results.message);
    }
  }
  const handleShowSnackBar = () => {
    setOpen(true);
  };
  return (
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
            outline: "none",
            borderBottom: isEditting ? "1px solid grey" : "0px",
          }}
          color="text.primary"
          id="cartDesc"
          onClick={() => setIsEditting(true)}
          contentEditable={isEditting}
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            updateCartData(cart._id, e.target.innerText, e.target.id);
            setIsEditting(false);
          }}
        >
          Description: {cart.cartDesc}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          id="cartDiscount"
          onClick={() => setIsEditting(true)}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            updateCartData(cart._id, e.target.innerText, e.target.id);
            setIsEditting(false);
          }}
          sx={{
            textTransform: "capitalize",
            outline: "none",
            textAlign: "left",
            borderBottom: isEditting ? "1px solid grey" : "0px",
          }}
        >
          Discount: {cart.cartDiscount}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          id="cartTax"
          onClick={() => setIsEditting(true)}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            updateCartData(cart._id, e.target.innerText, e.target.id);
            setIsEditting(false);
          }}
          sx={{
            textTransform: "capitalize",
            outline: "none",
            textAlign: "left",
            borderBottom: isEditting ? "1px solid grey" : "0px",
          }}
        >
          Tax: {cart.cartTax}
        </Typography>
      </CardContent>
      <Divider />
      <Box>
        {cart?.products.map((product) => {
          return (
            <ListItem
              key={product?.productId}
              sx={{ backgroundColor: "#eee5e5", m: "10px" }}
              secondaryAction={
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteProduct(product.productId)}
                >
                  <DeleteForeverRoundedIcon />
                </IconButton>
              }
            >
              <ListItemText
                sx={{
                  textTransform: "capitalize",
                  outline: "none",
                }}
              >
                {product?.product?.productName}
              </ListItemText>
            </ListItem>
          );
        })}
      </Box>
    </Card>
  );
};

export default CartItem;
