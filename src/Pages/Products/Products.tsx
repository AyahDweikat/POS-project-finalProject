import { Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SnackbarComponent from "../../SubComponents/Snackbar.tsx";
import AddProductModal from "./AddProductModal.tsx";
import { Cart, ProductObj } from "../../Utils/Types.tsx";
import { fetchApiWithAuthNoBody } from "../../Utils/fetchApi.ts";
import { _token, getProducts, sortByName } from "../../Utils/Utils.tsx";
import TableOfProducts from "./TableOfProducts.tsx";
import FilterComponent from "./FilterComponent.tsx";
import SearchForm from "./SearchForm.tsx";
import styles from "./product.module.css";

export interface ProductsProps {
  cart: Cart | undefined;
  setCart: (cart: Cart) => void;
}

const ProductsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<ProductObj[]>([]);
  const [isOpenAddProductModal, setIsOpenAddProductModal] =
    useState<boolean>(false);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [idToUpdate, setIdToUpdate] = useState<string>("");
  const [productToUpdate, setProductToUpdate] = useState<ProductObj>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [isSortByName, setIsSortByName] = useState<boolean>(false);
  
  const sorting = (isSortByName:boolean, products:ProductObj[])=>{
    if(isSortByName){
      const _products = [...products];
      return sortByName(_products)
    } else {
      return products;
    }
  }

  const displayedProducts = filterByCategory(
    filterValue,
    searchResults(searchValue,  sorting(isSortByName, products))
  );
  useEffect(() => {
    getProducts(_token, setProducts);
  }, []);

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
    if (!filterValue) {
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
      <Box className={styles.productPage}>
        <SearchForm handleChangeSearchValue={setSearchValue} />
        <FilterComponent filterValue={filterValue} handleChangeFilterValue={setFilterValue} />
        <Button
          className={styles.sortButton}
          sx={{ my: "10px", backgroundColor: isSortByName?"primary.dark":"primary.main" }}
          variant="contained"
          onClick={()=>setIsSortByName(!isSortByName)}
        >
          Sort By Name 
        </Button>
        <Button
          className={styles.openModalBtn}
          sx={{ my: "10px" }}
          variant="contained"
          onClick={()=>setIsOpenAddProductModal(true)}
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
      <TableOfProducts
        displayedProducts={displayedProducts}
        handleDeleteProduct={deleteProduct}
        handleChangeIdToUpdate={setIdToUpdate}
        setIsOpenAddProductModal={setIsOpenAddProductModal}
        handleChangeProductToUpdate={setProductToUpdate}
      />
      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </>
  );
};
export default ProductsComponent;