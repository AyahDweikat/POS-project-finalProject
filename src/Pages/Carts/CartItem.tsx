/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button, IconButton, CardHeader, Card, Box } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Cart } from "../../Utils/Types";
// import styles from './carts.module.css';

interface CartItemProps {
  cart: Cart;
  handleOpenCart: (idx: string) => void;
  handleDeleteCart:(idx: string) => void;
}
const CartItem: React.FC<CartItemProps> = ({
  cart,
  handleOpenCart,
  handleDeleteCart,
}) => {
  
  
  return (
    <Box id={'cartItem'}>
      <Card key={cart._id} sx={{ width:"200px", my:"10px"}}>
        <CardHeader
          action={
            <IconButton
              aria-label="delete"
              sx={{ p: "2px" }}
              onClick={() => handleDeleteCart(cart._id)}
            >
              <DeleteForeverRoundedIcon sx={{ color: "error.light" }} />
            </IconButton>
          }
          subheader={cart.cartDesc}
        />
        <Button variant="contained" fullWidth onClick={() => handleOpenCart(cart._id)}>
          Open Cart 
        </Button>
      </Card>
    </Box>
  );
};

export default CartItem;
