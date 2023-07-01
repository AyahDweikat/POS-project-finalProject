/* eslint-disable @typescript-eslint/no-unused-vars */
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import { Button, IconButton, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { fetchApiWithAuthNoBody } from "../fetchApi";
import { useLocation, useNavigate } from "react-router-dom";
import AddProductModal from "./AddProductModal.tsx";
import { Cart, ProductObj } from "../Types.tsx";
import SnackbarComponent from "../../SubComponents/Snackbar.tsx";
import styles from "./product.module.css";

export interface ProductsProps {
  cart: Cart | undefined;
  setCart: (cart: Cart) => void;
}
const ProductsComponent = () => {
  const navigate = useNavigate();
  const [productToUpdate, setProductToUpdate] = useState<ProductObj>();
  const [idToUpdate, setIdToUpdate] = useState<string>("");

  const location = useLocation();
  const [products, setProducts] = useState<ProductObj[]>([]);
  const [isOpenAddProductModal, setIsOpenAddProductModal] =
    useState<boolean>(false);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const _token: string | null = localStorage.getItem("token") || "";
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

  const deleteProduct = async (idx: string) => {
    const results = await fetchApiWithAuthNoBody(
      "DELETE",
      `https://posapp.onrender.com/product/deleteProduct/${idx}`,
      `black__${_token}`
    );
    navigate(location.pathname);
    if (results.message == "successs") {
      fetchData(_token);
      setSnackBarMsg("Product deleted Successfully");
    } else {
      alert(results.message);
      setSnackBarMsg(results.message);
    }
  };
  const handleCloseForm = () => {
    setIsOpenAddProductModal(false);
    setIdToUpdate("");
    setProductToUpdate({
      productName: "",
      productCode: "",
      productImg: "",
      productCategory: "",
      productPrice: 0,
      measureUnit: "",
      _id: "",
    });
  };
  return (
    <>
        <Button
          className={styles.openModalBtn}
          sx={{ my: "10px" }}
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenAddProductModal(true);
          }}
        >
          Add Product
        </Button>
        {isOpenAddProductModal && (
          <AddProductModal
            fetchProductsData={fetchData}
            idToUpdate={idToUpdate}
            productToUpdate={productToUpdate}
            handleCloseForm={handleCloseForm}
          />
        )}
        {products.length ? (
          <TableContainer
            component={Paper}
            className={styles.unitsTable}
            sx={{
              width: { xs: "90%", lg: "60%" },
              mx: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#424242" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Product</TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Code
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Image
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Category
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Price $
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Unit Measure
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    Delete
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id} sx={{ borderBottom: 1 }}>
                    <TableCell component="th" scope="row">
                      {product.productName}
                    </TableCell>
                    <TableCell align="center">{product.productCode}</TableCell>
                    <TableCell align="center">
                      <img
                        src={`${product.productImg}?w=164&h=164&fit=crop&auto=format`}
                        width={'100px'}
                        height={'70px'}
                        srcSet={`${product.productImg}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={product.productName}
                        loading="lazy"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {product.productCategory}
                    </TableCell>
                    <TableCell align="center">{product.productPrice}</TableCell>
                    <TableCell align="center">{product.measureUnit}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        sx={{ p: "2px" }}
                        onClick={() => deleteProduct(product._id)}
                      >
                        <DeleteForeverRoundedIcon
                          sx={{ color: "error.light" }}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="edit"
                        sx={{ p: "2px" }}
                        onClick={() => {
                          setIdToUpdate(product._id);
                          setProductToUpdate(product);
                          setIsOpenAddProductModal(true);
                        }}
                      >
                        <EditLocationAltOutlinedIcon
                          sx={{ color: "success.light" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No Products Data</Typography>
        )}

      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </>
  );
};
export default ProductsComponent;
