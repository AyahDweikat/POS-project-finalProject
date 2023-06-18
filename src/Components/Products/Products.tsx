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
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";

export default interface IFile {
  url: string;
  name: string;
}
interface productObj {
  _id: string;
  name: string;
  code: string;
  category: string;
  image: string;
  price: number;
  unitOfMeasure: string;
}
interface productInputObj {
  name: string;
  code: string;
  category: string;
  image: string;
  price: number;
  unitOfMeasure: string;
}
export default function Proucts() {
  const [isEditting, setIsEditting] = useState<boolean>(false);
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

  const [file, setFile] = useState<string>();
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files as FileList;
    // setFile(URL.createObjectURL(selectedFiles?.[0]));
    console.log(selectedFiles)
  }

  const addProduct = (value: productInputObj) => {
    // let obj ={...value, image:file,}
    console.log({...value});
  };
  const updateUnitCells = (idx: string, newText: string, key: string) => {
    let _newText: number | string;
    if (key == "price") {
      _newText = Number(newText.split(" ")[0]);
    } else {
      _newText = newText;
    }
    const newProductsArr: productObj[] = products.map((item) => {
      if (item._id !== idx) {
        return item;
      } else {
        return { ...item, [key]: _newText };
      }
    });
    setProducts(newProductsArr);
  };
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
      <Box
        sx={{
          mt: 10,
          border: "1px solid grey",
          borderRadius: "8px",
          width: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
          maxWidth: "665px",
          mx: "auto",
          py: "20px",
        }}
      >
        <Typography variant="h6" component="h6" sx={{ pb: "10px" }}>
          Add Product
        </Typography>
        <Formik
          initialValues={{
            name: "",
            code: "",
            image:"",
            category: "",
            price: 0,
            unitOfMeasure: "",
          }}
          validate={(values) => {
            const errors = {
              name: "",
              code: "",
              category: "",
              image: "",
              price: "",
              unitOfMeasure: "",
            };
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.code) {
              errors.code = "Required";
            }
            if (!values.category) {
              errors.category = "Required";
            }
            if (!values.image) {
              errors.image = "Required";
            }
            if (!values.price) {
              errors.price = "Required";
            }
            if (!values.unitOfMeasure) {
              errors.unitOfMeasure = "Required";
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
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                addProduct(values);
                values.name = "";
                values.code = "";
                values.category = "";
                values.image = "";
                values.price = 0;
                values.unitOfMeasure = "";
              }}
            >
              <TextField
                id="name"
                sx={{
                  width: { xs: "85%", sm: "70%", md: "50%" },
                  maxWidth: "400px",
                }}
                label="Name"
                variant="outlined"
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.name && touched.name && errors.name}
              </Typography>
              <TextField
                id="code"
                sx={{
                  width: { xs: "85%", sm: "70%", md: "50%" },
                  maxWidth: "400px",
                }}
                label="Code"
                variant="outlined"
                type="code"
                name="code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.code}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.code && touched.code && errors.code}
              </Typography>
              <TextField
                id="category"
                sx={{
                  width: { xs: "85%", sm: "70%", md: "50%" },
                  maxWidth: "400px",
                }}
                label="Category"
                variant="outlined"
                type="category"
                name="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.category && touched.category && errors.category}
              </Typography>

              <TextField
                id="image"
                sx={{
                  width: { xs: "85%", sm: "70%", md: "50%" },
                  maxWidth: "400px",
                }}
                // label="Image"
                variant="outlined"
                type="file"
                name="image"
                placeholder="add image"
                onChange={handleFileUpload}
                onBlur={handleBlur}
                value={values.image}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {/* {errors.image &&
                  touched.image &&
                  errors.image} */}
              </Typography>

              <TextField
                id="price"
                sx={{
                  width: { xs: "85%", sm: "70%", md: "50%" },
                  maxWidth: "400px",
                }}
                label="Price"
                variant="outlined"
                type="price"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.price && touched.price && errors.price}
              </Typography>
              <TextField
                id="unitOfMeasure"
                sx={{
                  width: { xs: "85%", sm: "70%", md: "50%" },
                  maxWidth: "400px",
                }}
                label="Unit Of Measure"
                variant="outlined"
                type="unitOfMeasure"
                name="unitOfMeasure"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.unitOfMeasure}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.unitOfMeasure &&
                  touched.unitOfMeasure &&
                  errors.unitOfMeasure}
              </Typography>

              <Button
                type="submit"
                sx={{ width: "80%", maxWidth: "140px" }}
                variant="outlined"
                disabled={
                  !values.name.length ||
                  !values.code.length ||
                  !values.category.length ||
                  // !values.image.length ||
                  !values.unitOfMeasure.length ||
                  !values.price
                }
              >
                Add
              </Button>
            </form>
          )}
        </Formik>
      </Box>

      <Box sx={{ display: "flex", py: "10px" }}>
        {products.map((product) => {
          return (
            <Card key={product._id} sx={{ maxWidth: 230, m: "10px" }}>
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
                    // borderBottom: isEditting ? "1px solid grey" : "0px",
                  }}
                  color="text.primary"
                  id="category"
                  onClick={() => setIsEditting(true)}
                  contentEditable={isEditting}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    updateUnitCells(
                      product._id,
                      e.target.innerText,
                      e.target.id
                    );
                    setIsEditting(false);
                  }}
                >
                  {product.category}
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
                    id="price"
                    onClick={() => setIsEditting(true)}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      updateUnitCells(
                        product._id,
                        e.target.innerText,
                        e.target.id
                      );
                      setIsEditting(false);
                    }}
                    sx={{
                      textTransform: "capitalize",
                      outline: "none",
                      // borderBottom: isEditting ? "1px solid grey" : "0px",
                    }}
                  >
                    {product.price} $
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    id="unitOfMeasure"
                    onClick={() => setIsEditting(true)}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      updateUnitCells(
                        product._id,
                        e.target.innerText,
                        e.target.id
                      );
                      setIsEditting(false);
                    }}
                    sx={{
                      textTransform: "capitalize",
                      outline: "none",
                      // borderBottom: isEditting ? "1px solid grey" : "0px",
                    }}
                  >
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
