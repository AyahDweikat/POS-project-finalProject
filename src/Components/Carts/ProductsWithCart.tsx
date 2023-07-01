/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Cart, Products, ProductObj } from "../Types.tsx";
import { getProducts } from "../Utils.tsx";

export interface ProductsProps {
  cart: Cart | undefined;
  setCart: (cart: Cart) => void;
}
const ProductswithCart: React.FC<ProductsProps> = ({
  cart,
  setCart,
}) => {
  const [products, setProducts] = useState<ProductObj[]>([]);
  const _token: string | null = localStorage.getItem("token") || "";
  const isProductInCart = (idx: string) => {
    if (cart?.products.find((item: Products) => item.productId == idx)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getProducts(_token, setProducts);
  }, [_token]);
  const addProductToCart = (product: ProductObj) => {
    const { _id, productImg, productCode, ...toCart } = product;
    if (typeof cart != "undefined") {
      const newProductsList = cart?.products || [];
      newProductsList.unshift({ productId: _id, product: toCart, quantity: 1 });
      setCart({ ...cart, products: newProductsList });
    }
  };
  const removeProductFromCart = (idx: string) => {
    if (typeof cart != "undefined" && cart?.products.length) {
      const newProductsList: Products[] = cart?.products.filter(
        (product: Products) => {
          return product.productId != idx;
        }
      );
      setCart({ ...cart, products: newProductsList });
    }
  };

  return (
    <>
    <Box
      sx={{ minHeight: "89vh", height: "100%" }}
    >
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            py: "10px",
            width: "100%",
          }}
        >
          {products.map((product) => {
            return (
              <Card key={product._id} 
              sx={{
                maxWidth: 230, 
                m: "10px", 
                p:"5px", 
                backgroundColor:isProductInCart(product._id) ? "primary.main":"primary.light",
              }}
              onClick={
                isProductInCart(product._id)
                  ? () => removeProductFromCart(product._id)
                  : () => addProductToCart(product)
              }
              >
                <Typography 
                sx={{color:"primary.dark",
                  fontWeight:"400",
                  fontSize:"18px",
                  textTransform: "capitalize"
                  }}
                  >
                    {product.productName}
                </Typography>
                <img src={product.productImg} alt={product.productName} height='90px' width='120px' />
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                  <Typography
                    variant="body1"
                    id="productPrice"
                    sx={{
                      color:"primary.dark",
                      fontWeight:"400",
                      fontSize:"18px",
                    }}
                    >
                    {product.productPrice} $
                  </Typography>
                {/* {cart ? (
                    <Typography
                    sx={{color:"primary.main"}}
                      onClick={
                        isProductInCart(product._id)
                          ? () => removeProductFromCart(product._id)
                          : () => addProductToCart(product)
                      }
                    >
                      {isProductInCart(product._id) ? (
                        <ShoppingCartIcon />
                      ) : (
                        <ShoppingCartOutlinedIcon />
                      )}
                    </Typography>
                  ):
                  null
                } */}

                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
    </>
  );
};
export default ProductswithCart;
