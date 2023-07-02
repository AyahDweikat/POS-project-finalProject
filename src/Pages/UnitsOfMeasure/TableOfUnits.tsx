import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import styles from "./units.module.css";
import { UnitObj } from '../../Utils/Types';
interface UnitsTableProps{
    handleDeleteUnit : (idx:string)=>void;
    handleChangeIdToUpdate : (idx:string)=>void;
    handleChangeUnitToUpdate : (obj:UnitObj)=>void; 
    setIsAddModalOpen : (state:boolean)=>void;
    units:UnitObj[] ;
}

const TableOfUnits :React.FC<UnitsTableProps> = ({handleDeleteUnit, units, handleChangeUnitToUpdate, handleChangeIdToUpdate, setIsAddModalOpen})=> {
  return (
    <>
    {units.length ? 
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
              <TableCell sx={{ color: "white" }}>Unit of Measure</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Base Unit of Measure
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Conversion factor
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
            {units.map((row) => (
              <TableRow key={row._id} sx={{ borderBottom: 1 }}>
                <TableCell
                  component="th"
                  scope="row"
                  id="unitOfMeasure"
                  className={styles.edittingUnits}
                >
                  {row.unitOfMeasure}
                </TableCell>
                <TableCell
                  align="center"
                  id="baseUnit"
                  className={styles.edittingUnits}
                >
                  {row.baseUnit}
                </TableCell>
                <TableCell
                  align="center"
                  id="conversionFactor"
                  className={styles.edittingUnits}
                >
                  {row.conversionFactor}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    sx={{ p: "2px" }}
                    onClick={() => handleDeleteUnit(row._id)}
                  >
                    <DeleteForeverRoundedIcon sx={{ color: "error.light" }} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    sx={{ p: "2px" }}
                    onClick={() => {
                      handleChangeIdToUpdate(row._id);
                      handleChangeUnitToUpdate(row);
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
      <Typography sx={{ width:"20%", mb:"10px", textAlign:"center", m:"auto", color:"green"}}>No Units!</Typography>
      }
    </>
    
  )
}

export default TableOfUnits