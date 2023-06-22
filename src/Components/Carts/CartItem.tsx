import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchApiWithAuthAndBody, fetchApiWithAuthNoBody } from "../fetchApi";

interface ProductInDB {
  _id: string;
  productId: string;
  quantity: number;
}

interface Product {
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
interface Cart {
  cartDesc: string;
  cartTax: number;
  cartDiscount: number;
  products: Array<Product>;
}
interface CartItem {
  cart: CartInDB;
  carts:CartInDB[];
  setSnackBarMsg: (id: string) => void;
  _token:string;
  fetchData:(id: string) => void;
  setOpen:(id: boolean) => void
}

const CartItem: React.FC<CartItem> = ({ cart, setSnackBarMsg, _token, fetchData, setOpen, carts }) => {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      const updatedProductsList: Product[] = updatedCart.products.map(
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
  const handleShowSnackBar = () => {
    setOpen(true);
  };
  return (
    <Card key={cart._id} sx={{ maxWidth: 400, m: "10px" }}>
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
        {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 0,
                    mx: 0,
                    pt: "5px",
                    alignItems: "flex-end",
                  }}
                > */}
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
            borderBottom: isEditting ? "1px solid grey" : "0px",
          }}
        >
          Tax: {cart.cartTax}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CartItem;
