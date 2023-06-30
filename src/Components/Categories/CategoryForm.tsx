import React from "react";
import { Button, TextField, Box } from "@mui/material";
import { Formik } from "formik";
import Typography from "@mui/material/Typography";
import { CategoryObj } from "../Types.tsx";
import styles from "./category.module.css";

interface CategpryModalProps {
  handleCloseForm: () => void;
  idToUpdate: string;
  CategoryToUpdate: CategoryObj | undefined;
  handleAddCategory: (Category: string) => void;
  handleUpdateCategory: (idx: string, Category: string) => void;
}

const CategoryForm: React.FC<CategpryModalProps> = ({
  handleCloseForm,
  idToUpdate,
  CategoryToUpdate,
  handleAddCategory,
  handleUpdateCategory,
}) => {
  return (
    <Box
      className={styles.addCategoryForm}
      sx={{
        left: { xs: "0%", sm: "10%", md: "30%" },
        backgroundColor: "primary.light",
        width: { xs: "100%", sm: "80%", md: "60%", lg: "60%" },
      }}
    >
      <Typography variant="h6" component="h6" sx={{ pb: "10px" }}>
        Category Form
      </Typography>
      <Formik
        initialValues={{ category: CategoryToUpdate?.category || "" }}
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
        }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              {
                idToUpdate
                  ? handleUpdateCategory(
                      idToUpdate,
                      values.category.toLocaleLowerCase()
                    )
                  : handleAddCategory(values.category.toLocaleLowerCase());
              }
              values.category = "";
            }}
          >
            <TextField
              id="outlined-basic"
              sx={{
                width: { xs: "80%", sm: "70%", md: "60%", lg:"70%" },
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
              sx={{
                width: "80%",
                maxWidth: "140px",
                my: "10px",
                color: "white",
                mr: "20px",
              }}
              variant="contained"
              disabled={!values.category.length}
            >
              {idToUpdate ? "Update Cat" : "Add"}
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
  );
};

export default CategoryForm;
