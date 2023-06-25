/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchApiWithAuthNoBody } from "../fetchApi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CartScreen from "./CartScreen.tsx";
import AddProductModal from "./AddProductModal.tsx";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ProductItemDB, ProductObj, ProductToCart } from "../Types.tsx";

export interface Products {
  productId: string;
  product: ProductItemDB;
  quantity: number;
}


export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductObj[]>([]);
  const [productsToCart, setProductsToCart] = useState<Products[]>([])
  const _token: string | null = localStorage.getItem("token") || "";

  const isProductInCart = (idx:string) => {
    if(productsToCart.find(item => item.productId == idx)){
      return true;
    } else {
      return false;
    }
  }

  const [isOpenAddProductModal, setIsOpenAddProductModal] = useState<boolean>(false);
  

  const [queryStrings, ] = useSearchParams();
  const indexOfCart = queryStrings.get("indexOfCart");

  const fetchData = async (_token: string) => {
    const results = await fetchApiWithAuthNoBody(
      "GET",
      `https://posapp.onrender.com/product/getProducts`,
      `black__${_token}`
    );
    if (results.ProductList) {
      setProducts(results.ProductList);
    }
    return results;
  };
  useEffect(() => {
    fetchData(_token);
  }, [_token]);



  const updateProductData = (idx: string, newText: string, key: string) => {
    let _newText: number | string;
    if (key == "productPrice") {
      _newText = Number(newText.split(" ")[0]);
    } else {
      _newText = newText;
    }
    const newProductsArr: ProductObj[] = products.map((item) => {
      if (item._id !== idx) {
        return item;
      } else {
        return { ...item, [key]: _newText };
      }
    });
    setProducts(newProductsArr);
  };

  const addProductToCart=(product:ProductObj)=>{
    const {_id, productImg, productCode, ...toCart} = product;
    setProductsToCart([...productsToCart,{productId:_id, product:toCart,quantity:1 }])
  }

  const removeProductFromCart = (idx:string)=>{
    const _newProductToCart:Products[] = productsToCart.filter((product)=>{
      return product.productId != idx;
    })
    setProductsToCart(_newProductToCart)
  }


  const deleteProduct = async (idx: string) => {
    const results = await fetchApiWithAuthNoBody(
      "DELETE",
      `https://posapp.onrender.com/product/deleteProduct/${idx}`,
      `black__${_token}`
    );
    navigate(location.pathname);
    if (results.message == "successs") {
      fetchData(_token);
      alert("Product deleted Successfully");
    } else {
      alert(results.message);
    }
  };
  return (
    <Box sx={{minHeight:"89vh", height:"100%"}} onClick={()=>setIsOpenAddProductModal(false)}>
      <Button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpenAddProductModal(true);
        }}
      >
        Add Product
      </Button>
      {isOpenAddProductModal && <AddProductModal />}
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            py: "10px",
            width: indexOfCart ? "100%" : "100%",
          }}
        >
          {products.map((product) => {
            return (
              <Card key={product._id} sx={{ maxWidth: 230, m: "10px" }}>
                <CardHeader
                avatar={
                  indexOfCart && 
                  <Button onClick={isProductInCart(product._id)? ()=>removeProductFromCart(product._id) :()=>addProductToCart(product)}>
                    {isProductInCart(product._id) && productsToCart.find(item => item.productId == product._id) ? <ShoppingCartIcon/> :<ShoppingCartOutlinedIcon />}
                  </Button>
                }
                action={
                    <IconButton
                      aria-label="delete"
                      sx={{ p: "2px" }}
                      onClick={() => deleteProduct(product._id)}
                    >
                      <DeleteForeverRoundedIcon />
                    </IconButton>
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
                    }}
                    color="text.primary"
                    id="productCategory"
                    onClick={() => setIsEditting(true)}
                    contentEditable={isEditting}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      updateProductData(
                        product._id,
                        e.target.innerText,
                        e.target.id
                      );
                      setIsEditting(false);
                    }}
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
                      onClick={() => setIsEditting(true)}
                      contentEditable
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        updateProductData(
                          product._id,
                          e.target.innerText,
                          e.target.id
                        );
                        setIsEditting(false);
                      }}
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
                      onClick={() => setIsEditting(true)}
                      contentEditable
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        updateProductData(
                          product._id,
                          e.target.innerText,
                          e.target.id
                        );
                        setIsEditting(false);
                      }}
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
        {indexOfCart && <CartScreen indexOfCart={indexOfCart} productsToCart={productsToCart} />}
      </Box>
      {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      /> */}
    </Box>
  );
}
