import { Button, TextField, Box, Typography, MenuItem } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import SnackbarComponent from "../../SubComponents/Snackbar";
import React, { useEffect, ChangeEvent, useState } from "react";
import { CategoryObj, ProductInputObj, ProductObj } from "../../Utils/Types";
import { fetchApiWithAuthAndBody } from "../../Utils/fetchApi";
import { _token, getCategories, getProducts } from "../../Utils/Utils";
import styles from "./product.module.css";

interface addProductModalProps {
  handleCloseForm: () => void;
  setProducts:(arr:ProductObj[])=>void;
  idToUpdate: string;
  productToUpdate: ProductObj | undefined;
}

const AddProductModal: React.FC<addProductModalProps> = ({
  setProducts,
  handleCloseForm,
  idToUpdate,
  productToUpdate,
}) => {
  const [file, setFile] = useState<File>();
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [categories, setCategories] = useState<CategoryObj[]>([]);
  
  useEffect(() => {
    getCategories(_token, setCategories);
  }, []);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  
  

  const addProduct = async (values: ProductInputObj) => {
    const {
      productName,
      productCode,
      productCategory,
      productPrice,
      measureUnit,
    } = values;
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "svqzsfpy");
    axios
      .post(`https://api.cloudinary.com/v1_1/dujgkfw6w/image/upload`, formData)
      .then((response) => {
        return response.data.secure_url;
      })
      .then((resImg) => {
        return {
          productName,
          productCode,
          productCategory,
          productPrice,
          measureUnit,
          productImg: resImg,
        };
      })
      .then((newProduct) => {
        return fetchApiWithAuthAndBody(
          "POST",
          newProduct,
          `https://posapp.onrender.com/product/addProduct`,
          `black__${_token}`
        );
      })
      .then((results) => {
        if (results.message == "successs") {
          getProducts(_token, setProducts);
          handleCloseForm();
          setSnackBarMsg("Product Added Successfully");
        } else {
          handleCloseForm();
          setSnackBarMsg(results.message);
        }
      })
      .catch((error) => {
        return `${error}`;
      });
  };
  const updateProductData = async (
    idx: string,
    updatedProduct: ProductInputObj
  ) => {
    handleCloseForm();
    const {
      productName,
      productCode,
      productCategory,
      productPrice,
      measureUnit,
    } = updatedProduct;
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "svqzsfpy");
    axios
      .post(`https://api.cloudinary.com/v1_1/dujgkfw6w/image/upload`, formData)
      .then((response) => {
        return response.data.secure_url;
      })
      .then((resImg) => {
        return {
          productName,
          productCode,
          productCategory,
          productPrice,
          measureUnit,
          productImg: resImg,
        };
      }).then((updatedProduct)=>{
        return fetchApiWithAuthAndBody(
          "PATCH",
          updatedProduct,
          `https://posapp.onrender.com/product/updateProduct/${idx}`,
          `black__${_token}`
        );
      })
      .then((results) => {
        if (results.message == "successs updated") {
          getProducts(_token, setProducts);
          setSnackBarMsg("Product Updated Successfully");
          handleCloseForm();
        } else {
          handleCloseForm();
          setSnackBarMsg(results.message);
        }
      })
      .catch((error) => {
        return `${error}`;
      });
  };

  return (
    <>
      <Box
        onClick={(e) => e.stopPropagation()}
        className={styles.addModal}
        sx={{
          width: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
          backgroundColor: "primary.light",
          left: { xs: "0vw", sm: "12vw", md: "20vw", lg: "24vw" },
          position: "absolute",
          top: "50px",
        }}
      >
        <Typography variant="h6" component="h6" sx={{ pb: "10px" }}>
          Product Form
        </Typography>
        <Formik
          initialValues={{
            productName: productToUpdate?.productName || "",
            productCode: productToUpdate?.productCode || "",
            productImg: "",
            productCategory: productToUpdate?.productCategory || "",
            productPrice: productToUpdate?.productPrice || 0,
            measureUnit: productToUpdate?.measureUnit || "",
          }}
          validate={(values) => {
            const errors = {
              productName: "",
              productCode: "",
              productImg: "",
              productCategory: "",
              productPrice: "",
              measureUnit: "",
            };
            if (!values.productName) {
              errors.productName = "Required";
            }
            if (!values.productCode) {
              errors.productCode = "Required";
            }
            if (!values.productCategory) {
              errors.productCategory = "Required";
            }
            if (!values.productImg) {
              errors.productImg = "Required";
            }
            if (!values.productPrice) {
              errors.productPrice = "Required";
            }
            if (!values.measureUnit) {
              errors.measureUnit = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            // handleFileUpload,
          }) => (
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleSubmit();
                {
                  idToUpdate
                    ? updateProductData(idToUpdate, values)
                    : addProduct(values);
                }
                values.productName = "";
                values.productCode = "";
                values.productImg = "";
                values.productCategory = "";
                values.productPrice = 0;
                values.measureUnit = "";
              }}
            >
              <TextField
                id="productName"
                sx={{
                  width: { xs: "80%", sm: "70%", md: "60%", lg: "70%" },
                  maxWidth: "400px",
                }}
                size="small"
                label="Product Name"
                variant="outlined"
                type="name"
                name="productName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productName}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.productName &&
                  touched.productName &&
                  errors.productName}
              </Typography>
              <TextField
                id="productCode"
                sx={{
                  width: { xs: "80%", sm: "70%", md: "60%", lg: "70%" },
                  maxWidth: "400px",
                }}
                size="small"
                label="Product Code"
                variant="outlined"
                type="code"
                name="productCode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productCode}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.productCode &&
                  touched.productCode &&
                  errors.productCode}
              </Typography>

              <TextField
                id="productCategory"
                sx={{
                  width: { xs: "80%", sm: "70%", md: "60%", lg: "70%" },
                  maxWidth: "400px",
                }}
                size="small"
                variant="outlined"
                type="category"
                name="productCategory"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productCategory}
                select
                label="Select Category"
                defaultValue=""
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category.category}>
                    {category.category}
                  </MenuItem>
                ))}
              </TextField>
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.productCategory &&
                  touched.productCategory &&
                  errors.productCategory}
              </Typography>
              <TextField
                id="productImg"
                size="small"
                sx={{
                  width: { xs: "80%", sm: "70%", md: "60%", lg: "70%" },
                  maxWidth: "400px",
                  mb:"15px"
                }}
                type="file"
                onChange={handleFileChange}
                variant="outlined"
                name="productImg"
                placeholder="add image"
                onBlur={handleBlur}
              />
              <TextField
                id="productPrice"
                sx={{
                  width: { xs: "80%", sm: "70%", md: "60%", lg: "70%" },
                  maxWidth: "400px",
                }}
                size="small"
                label="Product Price"
                variant="outlined"
                type="price"
                name="productPrice"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productPrice}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.productPrice &&
                  touched.productPrice &&
                  errors.productPrice}
              </Typography>
              <TextField
                id="measureUnit"
                sx={{
                  width: { xs: "80%", sm: "70%", md: "60%", lg: "70%" },
                  maxWidth: "400px",
                }}
                size="small"
                label="Unit Of Measure"
                variant="outlined"
                type="measureUnit"
                name="measureUnit"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.measureUnit}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.measureUnit &&
                  touched.measureUnit &&
                  errors.measureUnit}
              </Typography>

              <Button
                type="submit"
                sx={{
                  width: "80%",
                  maxWidth: "140px",
                  my: "10px",
                  color: "white",
                  mr: "20px",
                }}
                variant="contained"
                disabled={
                  !values.productName.length ||
                  !values.productCode.length ||
                  !values.productCategory.length ||
                  !values.measureUnit.length ||
                  !values.productPrice
                }
              >
                {idToUpdate ? "Update" : "Add"}
              </Button>
              <Button
                sx={{ width: "80%", maxWidth: "140px" }}
                variant="outlined"
                onClick={() => handleCloseForm()}
              >
                Cancel
              </Button>
            </form>
          )}
        </Formik>
      </Box>
      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </>
  );
};

export default AddProductModal;
