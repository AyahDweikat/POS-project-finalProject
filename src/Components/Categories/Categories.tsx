/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from "react";
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
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid'

// export const categoryObj = [
//   "Bakery and Bread",
//   "meat",
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
interface categoryObj {
  _id:string;
  cat:string;
}
export default function Categories() {
  const navigate= useNavigate()
  const location = useLocation()
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [categories, setCategories] = useState<categoryObj[]>([
    {_id:nanoid(), cat:"bakery"},
    {_id:nanoid(), cat:"bread"},
    {_id:nanoid(), cat:"meat"},
    {_id:nanoid(), cat:"salad dressings"},
    {_id:nanoid(), cat:"Condiments"},
    {_id:nanoid(), cat:"breakfast foods"},
    {_id:nanoid(), cat:"soups"},
    {_id:nanoid(), cat: "sauces"},
    {_id:nanoid(), cat:"oils"},
    {_id:nanoid(), cat:"canned goods"},
    {_id:nanoid(), cat:"rice"},
    {_id:nanoid(), cat:"pasta"},
    {_id:nanoid(), cat:"seafood"},
    {_id:nanoid(), cat:"cereals"},
    {_id:nanoid(), cat:"frozen foods"},
    {_id:nanoid(), cat:"dairy"},
    {_id:nanoid(), cat:"cheese"},
    {_id:nanoid(), cat:"eggs"},
    {_id:nanoid(), cat:"snacks"},
    {_id:nanoid(), cat:"crackers"},
    {_id:nanoid(), cat:"fruits"},
    {_id:nanoid(), cat:"vegetables"},
    {_id:nanoid(), cat:"drinks"},
  ]);
  const deleteCategory = (idx:string) => {
    const newCategoryArray:categoryObj[] = categories.filter(item => {
      if(item._id !== idx){
        return item;
      }
    })
    setCategories(newCategoryArray);
  };
  const addCategory = (newCat: string) => {
    if(!newCat.length){
      return;
    }
    if (!categories.find(item=> item.cat === newCat)) {
      const newCategoryArr: categoryObj[] = [{_id:nanoid(), cat:newCat},...categories];
        setCategories(newCategoryArr);
        navigate(location.pathname);
    }
  };
  const updateCategory = (idx:string, newCat:string)=>{
    const updatedCat =categories.find(item=> item._id === idx)
    if (updatedCat && updatedCat.cat== newCat) {
      return;
    }
    if(categories.find(item=> item.cat === newCat)){
      return;
    }
    const newCategoryArr: categoryObj[] = categories.map(item => {
      if(item._id !== idx){
        return item;
      }
      else{
        return {...item, cat:newCat}
      }
    })
    setCategories(newCategoryArr);
  }
  return (
    <>
      <Box sx={{ mt: 10, border:"1px solid grey",borderRadius:"8px" , width:'60%', mx:"auto", py:"20px"  }}>
        <Typography variant="h6" component="h6" sx={{pb:"10px"}}>
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
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={(e) =>{
              e.preventDefault()
              handleSubmit()
              addCategory(values.category.toLocaleLowerCase())
              values.category=''
            }}
            >
              <TextField
                id="outlined-basic"
                label="Category Name"
                variant="outlined"
                type="category"
                name="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
              />
              <Typography variant="body1" component="p" sx={{pb:"10px", fontSize:"12px", color:"red"}}>
                {errors.category && touched.category && errors.category}
              </Typography>
              <Button type="submit" variant="outlined" disabled={!values.category.length}>Add</Button>
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
                sx={{backgroundColor:"#eee5e5", m:"10px"}}
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
                  onClick={()=>setIsEditting(true)}
                  onBlur={(e)=>{
                    updateCategory(category._id, e.target.innerText)
                    setIsEditting(false)
                  }}
                  sx={{textTransform:"capitalize", outline:"none", borderBottom:isEditting? "1px solid grey":"0px"}}
                >{category.cat}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
}
