import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { fetchApiWithAuthNoBody } from "../fetchApi";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/context";
import { CartInDB, fetchCartData } from "../Types";

function Carts() {
  const [carts, setCarts] = useState<CartInDB[]>([]);
  const _token: string | null = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const { neededObj } = useContext(GlobalContext);

  const addNewCart = () => {
    neededObj.cart = {};
    navigate("/products?isCartOpen=true");
  };
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
    fetchCartData(_token).then(response => setCarts(response));
  }, [_token]);
  return (
    <>
      <Box>
        <Button onClick={() => addNewCart()}>Add New Cart</Button>
      </Box>
      <Box>
        {carts.map((cart) => {
          return (
            <CartItem
              key={cart._id}
              _token={_token}
              cart={cart}
              fetchData={fetchData}
            />
          );
        })}
      </Box>
    </>
  );
}

export default Carts;
