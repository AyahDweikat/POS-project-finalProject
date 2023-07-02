import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import { IconButton, Typography } from "@mui/material";
import { ProductObj } from "../../Utils/Types.tsx";
import styles from "./product.module.css";

interface ProductsTableProps {
  displayedProducts: ProductObj[];
  handleDeleteProduct: (idx: string) => void;
  handleChangeIdToUpdate: (idx: string) => void;
  handleChangeProductToUpdate: (obj: ProductObj) => void;
  setIsOpenAddProductModal: (stata: boolean) => void;
}

const TableOfProducts: React.FC<ProductsTableProps> = ({
  displayedProducts,
  handleDeleteProduct,
  handleChangeIdToUpdate,
  handleChangeProductToUpdate,
  setIsOpenAddProductModal,
}) => {
  return (
    <>
      {displayedProducts.length ? (
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
              {displayedProducts.map((product: ProductObj) => (
                <TableRow key={product._id} sx={{ borderBottom: 1 }}>
                  <TableCell component="th" scope="row">
                    {product.productName}
                  </TableCell>
                  <TableCell align="center">{product.productCode}</TableCell>
                  <TableCell align="center">
                    <img
                      src={`${product.productImg}?w=164&h=164&fit=crop&auto=format`}
                      width={"100px"}
                      height={"70px"}
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
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <DeleteForeverRoundedIcon sx={{ color: "error.light" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      sx={{ p: "2px" }}
                      onClick={() => {
                        handleChangeIdToUpdate(product._id);
                        handleChangeProductToUpdate(product);
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
        <Typography sx={{ width:"20%", mb:"10px", textAlign:"center", m:"auto", color:"green"}}>No Products!</Typography>
      )}
    </>
  );
};

export default TableOfProducts;
