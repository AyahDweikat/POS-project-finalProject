// import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Box from "@mui/material/Box";
import { useState } from "react";

interface productObj {
  _id: string;
  name: string;
  code: string;
  category: string;
  image: string;
  // "https://www.detectiveconanworld.com/wiki/images/thumb/8/83/Shuichi_Akai_Profile.jpg/275px-Shuichi_Akai_Profile.jpg"
  price: number;
  unitOfMeasure: string;
}

export default function Proucts() {
  const [products, setProducts] = useState<productObj[]>([
    {
      _id: "nhggkkjkjj",
      name: "Akai Shuichi",
      code: "fifty/fifty",
      category: "love",
      image:
        "https://www.detectiveconanworld.com/wiki/images/thumb/8/83/Shuichi_Akai_Profile.jpg/275px-Shuichi_Akai_Profile.jpg",
      price: 1200,
      unitOfMeasure: "ton",
    },
    {
      _id: "bvnnbvv",
      name: "Akai Shuichi",
      code: "fifty/fifty",
      category: "love",
      image:
        "https://www.detectiveconanworld.com/wiki/images/thumb/8/83/Shuichi_Akai_Profile.jpg/275px-Shuichi_Akai_Profile.jpg",
      price: 1200,
      unitOfMeasure: "ton",
    },
  ]);
  const deleteProduct = (idx: string) => {
    const newProductsArray: productObj[] = products.filter((item) => {
      if (item._id !== idx) {
        return item;
      }
    });
    setProducts(newProductsArray);
  };
  return (
    <>
      <Box sx={{display:"flex", py:"10px", }}>
        {products.map((product) => {
          return (
            <Card key={product._id} sx={{ maxWidth: 230, m:"10px" }}>
              <CardHeader
                action={
                  <IconButton
                    aria-label="delete"
                    sx={{ p: "2px" }}
                    onClick={() => deleteProduct(product._id)}
                  >
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                }
                title={product.name}
                subheader={product.code}
              />
              <CardMedia
                component="img"
                height="194"
                image={product.image}
                alt={product.name}
              />

              <CardContent sx={{
                p: 0,
                mx: 1,
                pt:"10px",
              }}>
                <Typography variant="body1" sx={{textAlign:"left", fontSize:"18px", p:0, m:0}} color="text.primary">
                  {product.category}
                </Typography>
                <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 0,
                  mx: 0,
                  pt:"5px",
                  alignItems: "flex-end",
                }}
                >
                <Typography variant="body1" color="text.secondary">
                  {product.price} $
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.unitOfMeasure}
                </Typography>

                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </>
  );
}
