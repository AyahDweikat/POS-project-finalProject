/* eslint-disable @typescript-eslint/no-unused-vars */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button, IconButton, Typography, TextField, Box } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SnackbarComponent from "../../SubComponents/Snackbar.tsx";
import AddProductModal from "./AddProductModal.tsx";
import { Cart, CategoryObj, ProductObj } from "../../Utils/Types.tsx";
import { fetchApiWithAuthNoBody } from "../../Utils/fetchApi.ts";
import { _token, getCategories, getProducts } from "../../Utils/Utils.tsx";
import styles from "./product.module.css";

export interface ProductsProps {
  cart: Cart | undefined;
  setCart: (cart: Cart) => void;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const ProductsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<ProductObj[]>([]);
  const [isOpenAddProductModal, setIsOpenAddProductModal] =
    useState<boolean>(false);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [idToUpdate, setIdToUpdate] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [productToUpdate, setProductToUpdate] = useState<ProductObj>();
  const displayProducts = filterByCategory(filterValue,searchResults(searchValue, products));

  useEffect(() => {
    getProducts(_token, setProducts);
    getCategories(_token, setCategories);
  }, []);

  const [categories, setCategories] = useState<CategoryObj[]>([]);

  function searchResults(searchValue: string, products: ProductObj[]) {
    return products.filter((product: ProductObj) => {
      return (
        product.productName
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        String(product.productCode)
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        product.measureUnit
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        product.productCategory
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        String(product.productPrice)
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      );
    });
  }
  function filterByCategory(filterValue: string, products: ProductObj[]) {
    if(!filterValue){
      return products;
    }
    return products.filter((product) => {
      return product.productCategory == filterValue;
    });
  }
  const deleteProduct = async (idx: string) => {
    const results = await fetchApiWithAuthNoBody(
      "DELETE",
      `https://posapp.onrender.com/product/deleteProduct/${idx}`,
      `black__${_token}`
    );
    navigate(location.pathname);
    if (results.message == "successs") {
      getProducts(_token, setProducts);
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
      <Box sx={{ display: "flex", gap: "10px", mx: 'auto', width:"80%" }}>
        <Box
          sx={{
            width: 500,
            my: "10px",
            maxWidth: "100%",
          }}
        >
          <TextField
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ p: 0, m: 0, backgroundColor: "white" }}
            fullWidth
            label={
              <Box
                sx={{
                  display: "flex",
                  fontSize: "12px",
                  mt: "3px",
                  color: "primary.main",
                }}
              >
                <SearchRoundedIcon sx={{ fontSize: "22px" }} />
                <Typography sx={{ fontSize: "15px" }}>Search</Typography>
              </Box>
            }
            id="fullWidth"
          />
        </Box>
        <FormControl sx={{ m: '10px', width: 300, backgroundColor: "white" }}>
          <InputLabel id="demo-multiple-name-label">
            Filter By Category
          </InputLabel>
          <Select
            value={filterValue}
            onChange={(e: SelectChangeEvent) => setFilterValue(e.target.value)}
            input={<OutlinedInput label="Filter By Category" />}
            MenuProps={MenuProps}
          >
            <MenuItem key={"dasjldsdfdsfsd"} value={""}>
              ...
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.category}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
      </Box>
      {isOpenAddProductModal && (
        <AddProductModal
          idToUpdate={idToUpdate}
          setProducts={setProducts}
          productToUpdate={productToUpdate}
          handleCloseForm={handleCloseForm}
        />
      )}
      {displayProducts.length ? (
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
              {displayProducts.map((product: ProductObj) => (
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
                      onClick={() => deleteProduct(product._id)}
                    >
                      <DeleteForeverRoundedIcon sx={{ color: "error.light" }} />
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
