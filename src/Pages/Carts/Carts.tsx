import { Button, Typography, Box } from "@mui/material";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import CartScreen from "./CartScreen";
import ProductswithCart from "./ProductsWithCart";
import { Cart } from "../../Utils/Types";


function Carts() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [openedCart, setOpenedCart] = useState<Cart>();
  const [isCartOpenWidely, setIsCartOpenWidely] = useState<boolean>(false);
  const addNewCart = () => {
    const newCart:Cart = {_id:nanoid(), cartDesc:"NewCart", cartTax:0, cartDiscount:0, products:[]};
    setCarts([newCart, ...carts])
  };
  const handleOpenCart = (idx: string) => {
    const _cartToOpen: Cart | undefined = carts?.find(
      (cart) => cart._id == idx
    );
    setOpenedCart(_cartToOpen);
    setIsCartOpenWidely(false);
    setIsCartOpenWidely(true);
  }; 
  function saveChanges(openedCart:Cart|undefined){
    if(typeof openedCart !=='undefined'){
      const _cartToOpen: Cart[]= carts?.map((cart) => {
        if(cart._id == openedCart._id){
          return openedCart;
        } else {
          return cart;
        }
      });
      setCarts(_cartToOpen)
    }
  }
  const handleDeleteCart = async (idx: string) => {
    navigate(location.pathname);
    const newCart:Cart[] = carts.filter((cart)=>{
      return cart._id !== idx;
    })
    setCarts(newCart)
    setIsCartOpenWidely(false)
  };
  useEffect(()=>{
    saveChanges(openedCart)
  }, [openedCart])
  return (
    <>
    <Box sx={{display:"flex", justifyContent:"space-between", position:"relative"}}>
      <Box sx={{width:"100%" }}>
        <Button sx={{my:"10px"}} variant="contained" onClick={() => addNewCart()}>Add New Cart</Button>
        <Typography variant="body1">Carts List</Typography>
        <Box sx={{display:"flex", borderBottom: "1px solid grey", flexWrap:"wrap", m:"10px", gap:"10px"}}>
          {carts.length ? carts.map((cart) => {
            return (
              <CartItem
              handleOpenCart={handleOpenCart}
              handleDeleteCart={handleDeleteCart}
                key={cart._id}
                cart={cart}
              />
            );
          }):<Typography sx={{textAlign:"center", m:"auto"}}>No Carts</Typography>}
        </Box>
        <ProductswithCart cart={openedCart} setCart={setOpenedCart} />
      </Box>
      {isCartOpenWidely && openedCart && (
        <CartScreen
        handleDeleteCart={handleDeleteCart}
          cart={openedCart}
          setCart={setOpenedCart}
          setIsCartOpenWidely={setIsCartOpenWidely}
        />
      )}
    </Box>
    </>
  );
}

export default Carts;
