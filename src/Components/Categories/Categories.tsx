/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Button, IconButton, Box, Typography } from "@mui/material";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchApiWithAuthAndBody,
  fetchApiWithAuthNoBody,
} from "../fetchApi.ts";
import { Category, CategoryObj } from "../Types.tsx";
import styles from "./category.module.css";
import SnackbarComponent from "../../SubComponents/Snackbar.tsx";
import CategoryForm from "./CategoryForm.tsx";

export default function Categories() {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<CategoryObj[]>([]);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [idToUpdate, setIdToUpdate] = useState<string>("");
  const [categoryToUpdate, setCategoryToUpdate] = useState<CategoryObj>();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const _token: string | null = localStorage.getItem("token") || "";

  const fetchData = async (_token: string) => {
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
    if (results.message == "successs") {
      fetchData(_token);
      setSnackBarMsg("Category deleted Successfully");
    } else {
      setSnackBarMsg(results.message);
    }
  };
  const addCategory = async (newCat: string) => {
    handleCloseForm();
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
        setSnackBarMsg("Category Added Successfully");
      } else {
        setSnackBarMsg(results.message);
      }
    }
  };
  const updateCategory = async (idx: string, updatedCatgory: string) => {
    handleCloseForm();
    const newCategory: Category = { category: updatedCatgory };
    const results = await fetchApiWithAuthAndBody(
      "PATCH",
      newCategory,
      `https://posapp.onrender.com/category/updateCategory/${idx}`,
      `black__${_token}`
    );
    navigate(location.pathname);
    if (results.message == "successs updated") {
      fetchData(_token);
      setSnackBarMsg("Category updated Successfully");
    } else {
      setSnackBarMsg(results.message);
    }
  };
  const handleCloseForm = () => {
    setIsAddModalOpen(false);
    setIdToUpdate("");
    setCategoryToUpdate({
      category: "",
      _id: "",
    });
  };

  return (
    <>
      <Button
        className={styles.openModalBtn}
        sx={{ my: "10px" }}
        variant="contained"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add New Category
      </Button>
      <Box sx={{ position: "relative" }}>
        {isAddModalOpen && (
          <CategoryForm
            handleAddCategory={addCategory}
            handleCloseForm={handleCloseForm}
            handleUpdateCategory={updateCategory}
            idToUpdate={idToUpdate}
            CategoryToUpdate={categoryToUpdate}
          />
        )}
      </Box>
      {categories.length ?
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
              <TableCell sx={{ color: "white" }}>Number</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Category
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
            {categories.map((category, idx) => (
              <TableRow
                key={category._id}
                sx={{ borderBottom: "1px solid grey" }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  id="unitOfMeasure"
                  className={styles.edittingUnits}
                >
                  {idx + 1}
                </TableCell>
                <TableCell
                  align="center"
                  id="baseUnit"
                  className={styles.edittingUnits}
                >
                  {category.category}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    sx={{ p: "2px" }}
                    onClick={() => deleteCategory(category._id)}
                  >
                    <DeleteForeverRoundedIcon sx={{ color: "error.light" }} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    sx={{ p: "2px" }}
                    onClick={() => {
                      setIdToUpdate(category._id);
                      setCategoryToUpdate(category);
                      setIsAddModalOpen(true);
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
      : 
      <Typography>No Categories Data</Typography>
      }
      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </>
  );
}
