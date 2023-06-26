import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchApiWithAuthNoBody } from "../fetchApi";
import CartItem from "./CartItem";
import { Button, Typography } from "@mui/material";
import { Cart } from "../Types";
import CartScreen from "./CartScreen";
import Products from '../Products/Products';
import { nanoid } from "nanoid";
function Carts() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [cartToOpen, setCartToOpen] = useState<Cart>();
  const _token: string | null = localStorage.getItem("token") || "";
  const [isCartOpenWidely, setIsCartOpenWidely] = useState<boolean>(false);

  const addNewCart = () => {
    const newCart:Cart = {_id:nanoid(), cartDesc:"", cartTax:0, cartDiscount:0, products:[]};
    setCarts([newCart, ...carts])
  };
  const openCart = (idx: string) => {
    const _cartToOpen: Cart | undefined = carts?.find(
      (cart) => cart._id == idx
    );
    setCartToOpen(_cartToOpen);
    setIsCartOpenWidely(false);
    setIsCartOpenWidely(true);
  }; //
  useEffect(()=>{
    if(typeof cartToOpen !=='undefined'){
      const _cartToOpen: Cart[]= carts?.map((cart) => {
        if(cart._id == cartToOpen._id){
          return cartToOpen;
        } else {
          return cart;
        }
      });
      setCarts(_cartToOpen)
    }
  }, [cartToOpen])

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
  return (
    <>
    <Box sx={{display:"flex", justifyContent:"space-between"}}>
      <Box sx={{ width: "280px", borderRight: "1px solid grey" }}>
        <Typography variant="body1">Carts List</Typography>
        <Button onClick={() => addNewCart()}>Add New Cart</Button>
        <Box>
          {carts.map((cart) => {
            return (
              <CartItem
                openCart={openCart}
                key={cart._id}
                _token={_token}
                cart={cart}
                fetchData={fetchData}
              />
            );
          })}
        </Box>
      </Box>
      <Box>
        <Products cart={cartToOpen} setCart={setCartToOpen} />
      </Box>
      {isCartOpenWidely && (
        <CartScreen
          cart={cartToOpen}
          setCart={setCartToOpen}
          setIsCartOpenWidely={setIsCartOpenWidely}
        />
      )}
    </Box>
    </>
  );
}

export default Carts;
