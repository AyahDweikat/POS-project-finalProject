import { Button, Box } from "@mui/material";
import SnackbarComponent from "../../SubComponents/Snackbar.tsx";
import { useEffect, useState } from "react";
import {
  fetchApiWithAuthAndBody,
  fetchApiWithAuthNoBody,
} from "../../Utils/fetchApi.ts";
import { Category, CategoryObj } from "../../Utils/Types.tsx";
import CategoryForm from "./CategoryForm.tsx";
import { _token, getCategories } from "../../Utils/Utils.tsx";
import styles from "./category.module.css";
import TableOfCategories from "./TableOfCategories.tsx";

export default function Categories() {
  const [categories, setCategories] = useState<CategoryObj[]>([]);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [idToUpdate, setIdToUpdate] = useState<string>("");
  const [categoryToUpdate, setCategoryToUpdate] = useState<CategoryObj>();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);


  useEffect(() => {
    try{
      getCategories(_token, setCategories);
    } catch(error){
      console.error(error)
    }
  }, []);
  const deleteCategory = async (idx: string) => {
    const results = await fetchApiWithAuthNoBody(
      "DELETE",
      `https://posapp.onrender.com/category/deleteCategory/${idx}`,
      `black__${_token}`
    );
    if (results.message == "successs") {
      getCategories(_token, setCategories);
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
      if (results.message == "successs") {
        getCategories(_token, setCategories);
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
    if (results.message == "successs updated") {
      getCategories(_token, setCategories);
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
      <TableOfCategories 
        handleDeleteCategory={deleteCategory}
        categories={categories}
        handleChangeCategoryToUpdate={setCategoryToUpdate}
        handleChangeIdToUpdate={setIdToUpdate}
        setIsAddModalOpen={setIsAddModalOpen} 
        />
      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </>
  );
}
