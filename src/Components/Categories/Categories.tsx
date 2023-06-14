import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
// import DraftsIcon from '@mui/icons-material/Drafts';
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { IconButton } from "@mui/material";
import { Formik } from "formik";

// export const categoryObj = [
//   "Bakery and Bread",
//   "Meat",
//   "Seafood",
//   "Pasta",
//   "Rice",
//   "Oils",
//   "Sauces",
//   "Salad Dressings",
//   "Condiments",
//   "Cereals",
//   "Breakfast Foods",
//   "Soups",
//   "Canned Goods",
//   "Frozen Foods",
//   "Dairy",
//   "Cheese",
//   "Eggs",
//   "Snacks",
//   "Crackers",
//   "Fruits",
//   "Vegetables",
//   "Drinks",
// ];

export default function Categories() {
  const [categories, setCategories] = React.useState<string[]>([
    "Bakery and Bread",
    "Meat",
    "Seafood",
    "Pasta",
    "Rice",
    "Oils",
    "Sauces",
    "Salad Dressings",
    "Condiments",
    "Cereals",
    "Breakfast Foods",
    "Soups",
    "Canned Goods",
    "Frozen Foods",
    "Dairy",
    "Cheese",
    "Eggs",
    "Snacks",
    "Crackers",
    "Fruits",
    "Vegetables",
    "Drinks",
  ])
  const deleteCategory=(cat:string)=>{
    const _cateogries:string[] = categories.filter(item=>{
      return item !== cat
    })
    setCategories(_cateogries)
  }
  const addCategory = (cat:string)=>{
    if(!categories.includes(cat)){
      const newCat : string []= [...categories, cat];
      setCategories(newCat)
    }
  }


  return (
    <>
    <div>
     <Formik
       initialValues={{ category: ''}}
       validate={values => {
         const errors = {category:""};
         if (!values.category) {
           errors.category = 'Required';
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
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={()=>handleSubmit()}>
           <input
             type="category"
             name="category"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.category}
           />
           {errors.category && touched.category && errors.category}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
   </div>
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
      <List sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {categories.map((cat, idx) => {
          return (
            <ListItem
              key={idx}
              secondaryAction={
                <IconButton aria-label="delete" onClick={()=>deleteCategory(cat)}>
                  <DeleteForeverRoundedIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <CategoryRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary={cat}
                // contentEditable='true'
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
    </>
  );
}
