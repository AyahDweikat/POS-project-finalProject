import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { IconButton, Typography } from "@mui/material";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import styles from "./category.module.css";
import { CategoryObj } from '../../Utils/Types';

interface CategoriesTableProps {
    handleDeleteCategory : (idx:string)=>void;
    handleChangeIdToUpdate : (idx:string)=>void;
    handleChangeCategoryToUpdate : (obj:CategoryObj)=>void; 
    setIsAddModalOpen : (state:boolean)=>void;
    categories:CategoryObj[] ;
}
const TableOfCategories : React.FC<CategoriesTableProps> = ({handleDeleteCategory, handleChangeIdToUpdate, categories, handleChangeCategoryToUpdate, setIsAddModalOpen}) => {
  return (
    <>
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
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    <DeleteForeverRoundedIcon sx={{ color: "error.light" }} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    sx={{ p: "2px" }}
                    onClick={() => {
                      handleChangeIdToUpdate(category._id);
                      handleChangeCategoryToUpdate(category);
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
    </>
  )
}

export default TableOfCategories;