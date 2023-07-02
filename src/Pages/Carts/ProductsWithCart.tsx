import React, {useState}  from "react";
import Card from "@mui/material/Card";
import { Box ,Button,Typography } from "@mui/material";
import { Cart, Products, ProductObj } from "../../Utils/Types.tsx";
import useGetProducts from "../../useHooks/useGetProducts.tsx";
import { filterByCategory, searchResults, sortByPorductName } from "../../Utils/Utils.tsx";
import SearchForm from "../Products/SearchForm.tsx";
import FilterComponent from "../Products/FilterComponent.tsx";
import styles from "./carts.module.css";

export interface ProductsProps {
  cart: Cart | undefined;
  setCart: (cart: Cart) => void;
}
const ProductswithCart: React.FC<ProductsProps> = ({ cart, setCart }) => {
  const products = useGetProducts()
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [isSortByName, setIsSortByName] = useState<boolean>(false);
  
  const displayedProducts = filterByCategory(
    filterValue,
    searchResults(searchValue,  sortByPorductName(isSortByName, products))
  );
  const isProductInCart = (idx: string) => {
    if (cart?.products.find((item: Products) => item.productId == idx)) {
      return true;
    } else {
      return false;
    }
  };
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
    <Box
      sx={{
        py: "10px",
        width: "100%",
      }}
    >
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
      </Box>
      <Box sx={{display: "flex"}}>
      {displayedProducts.map((product) => {
        return (
          <Card
            key={product._id}
            sx={{
              maxWidth: 230,
              m: "10px",
              p: "5px",
              backgroundColor: isProductInCart(product._id)
                ? "#bde5b3"
                : "primary.light",
            }}
            onClick={
              isProductInCart(product._id)
                ? () => removeProductFromCart(product._id)
                : () => addProductToCart(product)
            }
          >
            <Typography
              sx={{
                color: "primary.dark",
                fontWeight: "400",
                fontSize: "18px",
                textTransform: "capitalize",
              }}
            >
              {product.productName}
            </Typography>
            <img
              src={product.productImg}
              alt={product.productName}
              height="90px"
              width="120px"
            />
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography
                variant="body1"
                id="productPrice"
                sx={{
                  color: "primary.dark",
                  fontWeight: "400",
                  fontSize: "18px",
                }}
              >
                {product.productPrice} $
              </Typography>
            </Box>
          </Card>
        );
      })}

      </Box>
    </Box>
  );
};
export default ProductswithCart;
