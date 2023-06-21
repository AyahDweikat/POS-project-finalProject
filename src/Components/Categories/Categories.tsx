/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";
// import InboxIcon from "@mui/icons-material/Inbox";
// import DraftsIcon from '@mui/icons-material/Drafts';
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Button, IconButton, TextField } from "@mui/material";
import { Formik } from "formik";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchApiWithAuthAndBody,
  fetchApiWithAuthNoBody,
} from "../fetchApi.ts";
// import { useContext } from 'react';
// import { GlobalContext } from "../../Context/context.tsx";

interface CategoryObj {
  _id: string;
  category: string;
}
interface Category {
  category: string;
}
export default function Categories() {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<CategoryObj[]>([]);
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const _token: string | null = localStorage.getItem("token")||"";

  const fetchData = async (_token:string) => {
    const results = await fetchApiWithAuthNoBody(
      "GET",
      `https://posapp.onrender.com/category/getCategories`,
      `black__${_token}`
    );
    if (results.CategoryList) {
      setCategories(results.CategoryList);
    }
    return results;
  };
  useEffect(() => {
    fetchData(_token);
  }, [_token]);
  const deleteCategory = async (idx: string) => {
    const results = await fetchApiWithAuthNoBody(
      "DELETE",
      `https://posapp.onrender.com/category/deleteCategory/${idx}`,
      `black__${_token}`
    );
    navigate(location.pathname);
    console.log(results);
    if (results.message == "successs") {
      fetchData(_token);
      alert("Category deleted Successfully");
    } else {
      alert(results.message);
      console.log(results)
    }
  };
  const addCategory = async (newCat: string) => {
    if (!newCat.length) {
      return;
    }
    if (!categories.find((item) => item.category === newCat)) {
      const newCategory: Category = { category: newCat };
      const results = await fetchApiWithAuthAndBody(
        "POST",
        newCategory,
        `https://posapp.onrender.com/category/addCategory`,
        `black__${_token}`
      );
      navigate(location.pathname);
      if (results.message == "successs") {
        fetchData(_token);
        alert("Category Added Successfully");
      } else {
        alert(results.message);
      }
    }
  };
  const updateCategory = async (idx: string, newCat: string) => {
    const updatedCat = categories.find((item) => item._id === idx);
    if (updatedCat && updatedCat.category == newCat) {
      return;
    }
    if (categories.find((item) => item.category === newCat)) {
      return;
    }
    const newCategory: Category = { category: newCat };
    const results = await fetchApiWithAuthAndBody(
      "PATCH",
      newCategory,
      `https://posapp.onrender.com/category/updateCategory/${idx}`,
      `black__${_token}`
    );
    navigate(location.pathname);
    if (results.message == "successs updated") {
      fetchData(_token);
      alert("Category updated Successfully");
    } else {
      alert(results.message);
    }
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
          Add Category Form
        </Typography>
        <Formik
          initialValues={{ category: "" }}
          validate={(values) => {
            const errors = { category: "" };
            if (!values.category) {
              errors.category = "Required";
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
            // isSubmitting,
            /* and other goodies */
          }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                addCategory(values.category.toLocaleLowerCase());
                values.category = "";
              }}
            >
              <TextField
                id="outlined-basic"
                sx={{
                  width: { xs: "85%", sm: "70%", md: "50%" },
                  maxWidth: "400px",
                }}
                label="Category Name"
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
              <Button
                type="submit"
                sx={{ width: "80%", maxWidth: "140px" }}
                variant="outlined"
                disabled={!values.category.length}
              >
                Add
              </Button>
            </form>
          )}
        </Formik>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <List sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {categories.map((category) => {
            return (
              <ListItem
                key={category._id}
                sx={{ backgroundColor: "#eee5e5", m: "10px" }}
                secondaryAction={
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteCategory(category._id)}
                  >
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <CategoryRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  contentEditable
                  suppressContentEditableWarning={true}
                  onClick={() => setIsEditting(true)}
                  onBlur={(e) => {
                    updateCategory(category._id, e.target.innerText);
                    setIsEditting(false);
                  }}
                  sx={{
                    textTransform: "capitalize",
                    outline: "none",
                    borderBottom: isEditting ? "1px solid grey" : "0px",
                  }}
                >
                  {category.category}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
}
