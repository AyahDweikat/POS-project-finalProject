import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Formik } from "formik";
import styles from './product.module.css'
import { ProductInputObj } from "../Types";


function AddProductModal() {
  const addProduct = (value: ProductInputObj) => {
    console.log({ ...value });
  };
  // const [currentFile, setCurrentFile] = useState<File>();

  // const [uploadFile, setUploadFile] = useState<string>("");
  // const [cloudinaryImage, setCloudinaryImage] = useState<string>("");
  // console.log("currentFile", currentFile);
  // console.log("cloudinaryImage", cloudinaryImage);

  // const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", uploadFile);
  //   formData.append("upload_preset", "your upload preset name");

  // };
  return (
    <Box 
    onClick={(e)=>e.stopPropagation()}
    sx={{
        width: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
        left:{ xs: "0vw", sm: "12vw", md: "20vw", lg: "24vw" },
        position:"absolute",
        top:"20px",
    }}
    className={styles.addModal}
    >
      <Typography variant="h6" component="h6" sx={{ pb: "10px" }}>
        Add Product
      </Typography>
      <Formik
        initialValues={{
          productName: "",
          productCode: "",
          productImg: "",
          productCategory: "",
          productPrice: 0,
          measureUnit: "",
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
          // isSubmitting,
          /* and other goodies */
        }) => (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              // handleUpload(e);
              handleSubmit();

              addProduct(values);
              values.productName = "";
              values.productCode = "";
              values.productCategory = "";
              values.productImg = "";
              values.productPrice = 0;
              values.measureUnit = "";
            }}
          >
            <TextField
              id="productName"
              sx={{
                width: { xs: "85%", sm: "70%", md: "50%" },
                maxWidth: "400px",
              }}
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
              {errors.productName && touched.productName && errors.productName}
            </Typography>
            <TextField
              id="productCode"
              sx={{
                width: { xs: "85%", sm: "70%", md: "50%" },
                maxWidth: "400px",
              }}
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
              {errors.productCode && touched.productCode && errors.productCode}
            </Typography>
            <TextField
              id="productCategory"
              sx={{
                width: { xs: "85%", sm: "70%", md: "50%" },
                maxWidth: "400px",
              }}
              label="Product Category"
              variant="outlined"
              type="category"
              name="productCategory"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.productCategory}
            />
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
              sx={{
                width: { xs: "85%", sm: "70%", md: "50%" },
                maxWidth: "400px",
              }}
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const { files } = event.target;
                const selectedFiles = files as FileList;
                console.log(selectedFiles?.[0]);
                // setCurrentFile(selectedFiles?.[0]);
              }}
              // label="Product Img"
              variant="outlined"
              name="productImg"
              placeholder="add image"
              onBlur={handleBlur}
              value={values.productImg}
            />
            <Typography
              variant="body1"
              component="p"
              sx={{ pb: "10px", fontSize: "12px", color: "red" }}
            >
              {/* {errors.productImg &&
                  touched.productImg &&
                  errors.productImg} */}
            </Typography>

            <TextField
              id="productPrice"
              sx={{
                width: { xs: "85%", sm: "70%", md: "50%" },
                maxWidth: "400px",
              }}
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
                width: { xs: "85%", sm: "70%", md: "50%" },
                maxWidth: "400px",
              }}
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
              {errors.measureUnit && touched.measureUnit && errors.measureUnit}
            </Typography>

            <Button
              type="submit"
              sx={{ width: "80%", maxWidth: "140px" }}
              variant="outlined"
              disabled={
                !values.productName.length ||
                !values.productCode.length ||
                !values.productCategory.length ||
                // !values.productImg.length ||
                !values.measureUnit.length ||
                !values.productPrice
              }
            >
              Add
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default AddProductModal;
