/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
              <Card key={product._id} sx={{ maxWidth: 230, m: "10px" }}>
                <CardHeader
                  avatar={
                    cart ? (
                      <Button
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
                      </Button>
                    ):
                    null
                  }
                  title={product.productName}
                  subheader={product.productCode}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={product.productImg}
                  alt={product.productName}
                />
                <CardContent sx={{ p: 0, mx: 1, pt: "10px" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "left",
                      fontSize: "18px",
                      p: 0,
                      m: 0,
                      textTransform: "capitalize",
                      outline: "none",
                    }}
                    color="text.primary"
                    id="productCategory"
                  >
                    {product.productCategory}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 0,
                      mx: 0,
                      pt: "5px",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      id="productPrice"
                      sx={{
                        textTransform: "capitalize",
                        outline: "none",
                      }}
                    >
                      {product.productPrice} $
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      id="measureUnit"
                      sx={{
                        textTransform: "capitalize",
                        outline: "none",
                      }}
                    >
                      {product.measureUnit}
                    </Typography>
                  </Box>
                </CardContent>
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
